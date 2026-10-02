const PROFILE_NAME = 'LiftX Door Systems';
const PROFILE_NAME_NORMALIZED = normalizeName(PROFILE_NAME);
const PROFILE_PHONE = '12089954321';
const PROFILE_HOSTS = new Set(['liftxdoor.com', 'www.liftxdoor.com']);
const FALLBACK_MAPS_URL = 'https://maps.app.goo.gl/9c6jKwTTh9rvFSHY9';
const CACHE_TTL_SECONDS = 15 * 60;
const CACHE_VERSION = '2026-10-01-v1';

const PLACE_FIELDS = [
  'id',
  'displayName',
  'websiteUri',
  'nationalPhoneNumber',
  'internationalPhoneNumber',
  'rating',
  'userRatingCount',
  'googleMapsLinks',
  'googleMapsUri',
  'reviews',
];

const API_RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

function normalizeName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 ? `1${digits}` : digits;
}

function websiteHost(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...API_RESPONSE_HEADERS, ...extraHeaders },
  });
}

function expectedPlaceId(placeId) {
  return String(placeId || '').trim();
}

export function isExactLiftxPlace(place, configuredPlaceId = '') {
  if (!place || normalizeName(place.displayName?.text) !== PROFILE_NAME_NORMALIZED) {
    return false;
  }

  const expectedId = expectedPlaceId(configuredPlaceId);
  const placeIdMatches = Boolean(expectedId && place.id === expectedId);
  const host = websiteHost(place.websiteUri);
  const websiteMatches = PROFILE_HOSTS.has(host);
  const phoneMatches = [place.nationalPhoneNumber, place.internationalPhoneNumber]
    .some((phone) => normalizePhone(phone) === PROFILE_PHONE);

  const hasWebsite = Boolean(host);
  const hasPhone = Boolean(place.nationalPhoneNumber || place.internationalPhoneNumber);
  if ((hasWebsite || hasPhone) && !websiteMatches && !phoneMatches) {
    return false;
  }

  return placeIdMatches || websiteMatches || phoneMatches;
}

function mapReview(review, placeReviewsUrl) {
  const text = review?.text?.text?.trim();
  if (!text) return null;

  return {
    author: review.authorAttribution?.displayName || 'Google reviewer',
    authorUri: review.authorAttribution?.uri || null,
    authorPhotoUri: review.authorAttribution?.photoUri || null,
    rating: Number(review.rating) || 5,
    text,
    relativeTime: review.relativePublishTimeDescription || review.publishTime || '',
    publishTime: review.publishTime || null,
    googleMapsUri: review.googleMapsUri || placeReviewsUrl,
  };
}

function placeToPayload(place, source) {
  const placeUrl = place.googleMapsLinks?.placeUri || place.googleMapsUri || FALLBACK_MAPS_URL;
  const reviewsUrl = place.googleMapsLinks?.reviewsUri || placeUrl;
  const reviews = (Array.isArray(place.reviews) ? place.reviews : [])
    .map((review) => mapReview(review, reviewsUrl))
    .filter(Boolean)
    .slice(0, 5);

  return {
    configured: true,
    profileVerified: true,
    source,
    placeId: place.id,
    name: place.displayName?.text || PROFILE_NAME,
    rating: Number(place.rating) || null,
    userRatingCount: Number.isFinite(Number(place.userRatingCount))
      ? Number(place.userRatingCount)
      : null,
    availableReviewCount: reviews.length,
    googleMapsUri: reviewsUrl,
    placeUri: placeUrl,
    reviews,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchPlaceDetails(apiKey, placeId) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': PLACE_FIELDS.join(','),
      },
      signal: AbortSignal.timeout(12000),
    },
  );

  if (!response.ok) {
    throw new Error(`place_details_${response.status}`);
  }

  return response.json();
}

async function searchExactPlace(apiKey) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': PLACE_FIELDS.map((field) => `places.${field}`).join(','),
    },
    body: JSON.stringify({
      textQuery: 'LiftX Door Systems Eagle Idaho',
      pageSize: 5,
      regionCode: 'US',
      languageCode: 'en',
      includePureServiceAreaBusinesses: true,
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    throw new Error(`place_search_${response.status}`);
  }

  const data = await response.json();
  return (Array.isArray(data.places) ? data.places : []).find((place) =>
    isExactLiftxPlace(place),
  );
}

function cacheRequestFor(request) {
  const url = new URL(request.url);
  url.pathname = `/__liftx-cache/google-reviews/${CACHE_VERSION}`;
  url.search = '';
  return new Request(url.toString(), { method: 'GET' });
}

async function readCachedPayload(request) {
  const cache = globalThis.caches?.default;
  if (!cache) return null;

  const response = await cache.match(cacheRequestFor(request));
  if (!response) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function storeCachedPayload(request, payload, context) {
  const cache = globalThis.caches?.default;
  if (!cache) return;

  const response = new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
    },
  });
  const write = cache.put(cacheRequestFor(request), response);
  if (context?.waitUntil) context.waitUntil(write);
}

export async function handleGoogleReviews(request, env, context) {
  const cached = await readCachedPayload(request);
  if (cached) {
    return jsonResponse(cached, 200, { 'X-LIFTX-Reviews-Cache': 'HIT' });
  }

  const apiKey = String(
    env?.GOOGLE_PLACES_API_KEY || env?.GOOGLE_MAPS_API_KEY || '',
  ).trim();
  const placeId = expectedPlaceId(env?.GOOGLE_PLACE_ID);

  if (!apiKey) {
    return jsonResponse(
      {
        configured: false,
        profileVerified: false,
        error: 'google_places_api_key_missing',
        googleMapsUri: FALLBACK_MAPS_URL,
        reviews: [],
      },
      503,
      { 'X-LIFTX-Reviews-Cache': 'BYPASS' },
    );
  }

  try {
    const place = placeId
      ? await fetchPlaceDetails(apiKey, placeId)
      : await searchExactPlace(apiKey);

    if (!place || !isExactLiftxPlace(place, placeId)) {
      return jsonResponse(
        {
          configured: true,
          profileVerified: false,
          error: 'liftx_profile_mismatch',
          googleMapsUri: FALLBACK_MAPS_URL,
          reviews: [],
        },
        502,
        { 'X-LIFTX-Reviews-Cache': 'BYPASS' },
      );
    }

    const payload = placeToPayload(place, placeId ? 'place-details' : 'text-search');
    storeCachedPayload(request, payload, context);
    return jsonResponse(payload, 200, { 'X-LIFTX-Reviews-Cache': 'MISS' });
  } catch (error) {
    console.error(JSON.stringify({
      stage: 'google-reviews',
      code: error instanceof Error ? error.message : 'unknown_error',
    }));

    return jsonResponse(
      {
        configured: true,
        profileVerified: false,
        error: 'google_places_unavailable',
        googleMapsUri: FALLBACK_MAPS_URL,
        reviews: [],
      },
      502,
      { 'X-LIFTX-Reviews-Cache': 'BYPASS' },
    );
  }
}

export { FALLBACK_MAPS_URL };
