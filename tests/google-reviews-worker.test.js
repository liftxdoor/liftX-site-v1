import assert from 'node:assert/strict';
import test from 'node:test';
import { handleGoogleReviews, isExactLiftxPlace } from '../worker/google-reviews.js';

const exactPlace = {
  id: 'ChIJExactLiftX',
  displayName: { text: 'LiftX Door Systems' },
  websiteUri: 'https://www.liftxdoor.com/',
  nationalPhoneNumber: '(208) 995-4321',
  rating: 5,
  userRatingCount: 33,
  googleMapsLinks: {
    placeUri: 'https://www.google.com/maps/place/LiftX+Door+Systems',
    reviewsUri: 'https://www.google.com/maps/place/LiftX+Door+Systems/reviews',
  },
  reviews: [
    {
      authorAttribution: {
        displayName: 'Barry',
        uri: 'https://www.google.com/maps/contrib/1',
        photoUri: 'https://lh3.googleusercontent.com/a',
      },
      rating: 5,
      text: { text: 'Knowledgeable and responsive.' },
      relativePublishTimeDescription: '2 weeks ago',
      publishTime: '2026-09-15T00:00:00Z',
      googleMapsUri: 'https://www.google.com/maps/reviews/data=1',
    },
  ],
};

function request() {
  return new Request('https://www.liftxdoor.com/api/google-reviews');
}

test('recognizes only the exact LIFTX profile identity', () => {
  assert.equal(isExactLiftxPlace(exactPlace, exactPlace.id), true);
  assert.equal(
    isExactLiftxPlace(
      { ...exactPlace, displayName: { text: 'Another Door Company' } },
      exactPlace.id,
    ),
    false,
  );
  assert.equal(
    isExactLiftxPlace({
      ...exactPlace,
      id: 'wrong',
      websiteUri: 'https://example.com',
      nationalPhoneNumber: '208-555-0100',
    }),
    false,
  );
});

test('returns current rating, total count, direct review URL, and Google-selected reviews', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  globalThis.fetch = async (url, options) => {
    assert.match(String(url), /places\/ChIJExactLiftX$/);
    assert.equal(options.headers['X-Goog-Api-Key'], 'test-key');
    assert.match(options.headers['X-Goog-FieldMask'], /userRatingCount/);
    assert.match(options.headers['X-Goog-FieldMask'], /reviews/);
    return new Response(JSON.stringify(exactPlace), { status: 200 });
  };

  const response = await handleGoogleReviews(
    request(),
    { GOOGLE_PLACES_API_KEY: 'test-key', GOOGLE_PLACE_ID: exactPlace.id },
    {},
  );
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store, max-age=0');
  assert.equal(payload.profileVerified, true);
  assert.equal(payload.name, 'LiftX Door Systems');
  assert.equal(payload.rating, 5);
  assert.equal(payload.userRatingCount, 33);
  assert.equal(payload.availableReviewCount, 1);
  assert.equal(payload.googleMapsUri, exactPlace.googleMapsLinks.reviewsUri);
  assert.equal(payload.reviews[0].author, 'Barry');
  assert.equal(payload.reviews[0].text, 'Knowledgeable and responsive.');
});

test('can discover the exact service-area profile when GOOGLE_PLACE_ID is absent', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), 'https://places.googleapis.com/v1/places:searchText');
    assert.equal(options.method, 'POST');
    const body = JSON.parse(options.body);
    assert.equal(body.textQuery, 'LiftX Door Systems Eagle Idaho');
    assert.equal(body.includePureServiceAreaBusinesses, true);
    return new Response(JSON.stringify({ places: [exactPlace] }), { status: 200 });
  };

  const response = await handleGoogleReviews(
    request(),
    { GOOGLE_PLACES_API_KEY: 'test-key' },
    {},
  );
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.source, 'text-search');
  assert.equal(payload.placeId, exactPlace.id);
  assert.equal(payload.profileVerified, true);
});

test('rejects a configured Place ID that resolves to another profile', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });

  globalThis.fetch = async () => new Response(JSON.stringify({
    ...exactPlace,
    displayName: { text: 'Another Door Company' },
  }), { status: 200 });

  const response = await handleGoogleReviews(
    request(),
    { GOOGLE_PLACES_API_KEY: 'test-key', GOOGLE_PLACE_ID: exactPlace.id },
    {},
  );
  const payload = await response.json();

  assert.equal(response.status, 502);
  assert.equal(payload.profileVerified, false);
  assert.equal(payload.error, 'liftx_profile_mismatch');
});

test('fails safely when the server-side Places API key is missing', async () => {
  const response = await handleGoogleReviews(request(), {}, {});
  const payload = await response.json();

  assert.equal(response.status, 503);
  assert.equal(payload.configured, false);
  assert.equal(payload.error, 'google_places_api_key_missing');
  assert.deepEqual(payload.reviews, []);
});
