# LIFTX V1 AI Visualizer Worker

The production V1 site remains asset-first. Only `/api/visualizer/*` runs through `worker/index.js`; every existing page and asset is served by the `ASSETS` binding.

## Release gates

Do not merge this branch until all of the following are confirmed on the existing `liftx-site-v1` Worker:

1. The Cloudflare account is on Workers Paid. `wrangler.jsonc` requests 30 seconds of CPU time.
2. The rate-limit namespace IDs `220260918` and `220260919` are not used by another Worker binding in the account.
3. A managed Turnstile widget allows both `www.liftxdoor.com` and `liftxdoor.com`.
4. These Worker secrets exist:
   - `OPENAI_API_KEY`
   - `TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
   - `VISUALIZER_ENABLED` (set to `false` for the first deployment)

Use a dedicated OpenAI project key limited to the APIs this feature needs. Never commit or paste secret values into the repository, browser code, logs, or chat.

## Safe rollout

1. Merge only after `npm test` and `npx wrangler deploy --dry-run` pass.
2. Deploy with `VISUALIZER_ENABLED=false`.
3. Verify existing URLs, navigation, mobile layout, SEO metadata, and static assets.
4. Verify `GET /api/visualizer/config` reports disabled.
5. Change only `VISUALIZER_ENABLED` to `true`.
6. Run one real desktop and one real mobile generation, then a small concurrent near-limit smoke test.
7. Monitor Worker errors/429s and OpenAI usage. Set `VISUALIZER_ENABLED=false` first if anything is abnormal.

Cloudflare rate-limit bindings are location-based and eventually consistent. The aggregate binding is a useful abuse/cost guardrail, not a guaranteed global spend ceiling. OpenAI project budgets and alerts should also be configured.

Do not use the existing preview workflow for this feature; it intentionally deploys the older V1 commit to the separate V2 preview Worker.
