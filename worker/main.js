import visualizerWorker from './index.js';
import { handleGoogleReviews } from './google-reviews.js';

const API_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);

    if (url.pathname === '/api/google-reviews') {
      if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
          status: 405,
          headers: { ...API_HEADERS, Allow: 'GET' },
        });
      }
      return handleGoogleReviews(request, env, context);
    }

    return visualizerWorker.fetch(request, env, context);
  },
};
