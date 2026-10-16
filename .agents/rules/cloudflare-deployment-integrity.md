# Cloudflare Dual-Engine Deployment & Worker Invariant Rule

Nugget Nihongo relies on dual deployment channels via Cloudflare's GitHub App:
1. **Cloudflare Pages** (Static site hosting for `nugget-nihongo.pages.dev`)
2. **Cloudflare Workers Builds** (Automated Worker deployment for `nugget-nihongo` Worker service via `wrangler deploy`)

Every agent modifying build configs, scripts, or deployment pipelines MUST uphold these invariants to prevent recurrent Worker build failures.

## 1. Root Configuration Invariant (`wrangler.jsonc`)
The root `wrangler.jsonc` must ALWAYS maintain unified dual-compatibility for both Cloudflare Pages and Cloudflare Workers with Static Assets.

**NEVER delete these critical blocks:**
- `"main": "worker.js"`: Required by Cloudflare Workers CI to locate the Worker script entrypoint.
- `"assets"` block:
  ```jsonc
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  }
  ```
- `"build"` block:
  ```jsonc
  "build": {
    "command": "npm run build"
  }
  ```

## 2. Worker Bridge Entrypoint Invariant (`worker.js`)
The root `worker.js` is the universal asset fetch proxy for Cloudflare Workers Builds.
**NEVER delete `worker.js` from the repository root.**
It must contain:
```javascript
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
```

## 3. Pre-Flight Verification Invariant
Before committing any changes to `wrangler.jsonc`, `package.json`, or deployment workflows, agents MUST run:
```bash
npx wrangler deploy --dry-run
```
Verification passes only if Wrangler validates the Worker script entrypoint and assets directory without throwing `[ERROR] Missing entry-point to Worker script or to assets directory`.

## 4. Post-Push Check-Runs Verification Invariant
After running `git push origin main`, agents MUST query GitHub's Check Runs API:
- Verify `Cloudflare Pages`: conclusion `success`.
- Verify `Workers Builds: nugget-nihongo`: conclusion `success`.
Never declare a deployment complete until BOTH checks report success.
