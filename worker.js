const BUSINESS_QUERY = 'LIFTX Door Systems Idaho';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
});

const getGoogleReviews = async (env) => {
  if (!env.GOOGLE_PLACES_API_KEY) {
    return json({ error: 'Google reviews are not connected yet.' }, 503);
  }

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.rating',
        'places.userRatingCount',
        'places.reviews',
        'places.googleMapsUri'
      ].join(',')
    },
    body: JSON.stringify({
      textQuery: BUSINESS_QUERY,
      pageSize: 1,
      languageCode: 'en',
      regionCode: 'US'
    })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('Google Places request failed:', response.status, details);
    return json({ error: 'Google reviews are temporarily unavailable.' }, 502);
  }

  const payload = await response.json();
  const place = payload.places?.[0];
  if (!place) return json({ error: 'LIFTX Google profile was not found.' }, 404);

  const reviews = (place.reviews || [])
    .filter((review) => review.text?.text)
    .map((review) => ({
      rating: review.rating,
      text: review.text.text,
      relativeTime: review.relativePublishTimeDescription || '',
      publishTime: review.publishTime || '',
      googleMapsUri: review.googleMapsUri || place.googleMapsUri || '',
      flagContentUri: review.flagContentUri || '',
      author: review.authorAttribution?.displayName || 'Google reviewer',
      authorUri: review.authorAttribution?.uri || '',
      authorPhotoUri: review.authorAttribution?.photoUri || ''
    }));

  return json({
    placeId: place.id,
    businessName: place.displayName?.text || 'LIFTX',
    rating: place.rating || 0,
    userRatingCount: place.userRatingCount || 0,
    googleMapsUri: place.googleMapsUri || '',
    reviewOrder: 'Google relevance order',
    reviews
  });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/google-reviews') {
      if (request.method !== 'GET') {
        return json({ error: 'Method not allowed.' }, 405);
      }
      return getGoogleReviews(env);
    }

    return env.ASSETS.fetch(request);
  }
};
