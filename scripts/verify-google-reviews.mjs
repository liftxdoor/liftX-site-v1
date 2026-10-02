const endpoint = 'https://www.liftxdoor.com/api/google-reviews';
const deployment = process.env.GITHUB_SHA || String(Date.now());
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function normalizeName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function isGoogleMapsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      (url.hostname === 'google.com' || url.hostname.endsWith('.google.com')) &&
      url.pathname.startsWith('/maps');
  } catch {
    return false;
  }
}

function validate(payload) {
  if (!payload || payload.profileVerified !== true) return 'profile is not verified';
  if (normalizeName(payload.name) !== 'liftx door systems') return 'business name mismatch';
  if (typeof payload.placeId !== 'string' || !payload.placeId.trim()) return 'missing Place ID';
  if (typeof payload.rating !== 'number' || payload.rating < 1 || payload.rating > 5) return 'invalid rating';
  if (!Number.isInteger(payload.userRatingCount) || payload.userRatingCount < 1) return 'invalid review count';
  if (!isGoogleMapsUrl(payload.googleMapsUri)) return 'review destination is not a direct Google Maps URL';
  if (!Array.isArray(payload.reviews) || payload.reviews.length < 1 || payload.reviews.length > 5) return 'Google-selected reviews are missing';
  if (payload.availableReviewCount !== payload.reviews.length) return 'available review count mismatch';

  for (const review of payload.reviews) {
    if (!review || typeof review.text !== 'string' || !review.text.trim()) return 'review text is missing';
    if (typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) return 'review rating is invalid';
  }

  return null;
}

let lastFailure = 'no response';

for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const response = await fetch(`${endpoint}?verify=${encodeURIComponent(deployment)}-${attempt}`, {
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });
    const text = await response.text();
    let payload;

    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }

    const validationError = response.ok ? validate(payload) : `HTTP ${response.status}`;
    if (!validationError) {
      console.log([
        `Verified ${payload.name}`,
        `Place ID ${payload.placeId}`,
        `rating ${payload.rating.toFixed(1)}`,
        `${payload.userRatingCount} total reviews`,
        `${payload.reviews.length} Google-selected reviews returned`,
        `source ${payload.source}`,
        `cache ${response.headers.get('x-liftx-reviews-cache') || 'unknown'}`,
      ].join(' | '));
      process.exit(0);
    }

    lastFailure = `${validationError}; endpoint error=${payload?.error || 'none'}`;
    console.warn(`Google reviews verification attempt ${attempt} failed: ${lastFailure}`);
  } catch (error) {
    lastFailure = error instanceof Error ? error.message : String(error);
    console.warn(`Google reviews verification attempt ${attempt} failed: ${lastFailure}`);
  }

  if (attempt < 12) await delay(5000);
}

throw new Error(`Live Google reviews verification failed: ${lastFailure}`);
