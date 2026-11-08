# Nugget Nihongo — Exhaustive Website & GitHub Audit

**Audit date:** 2026-10-11  
**Website:** https://nugget-nihongo.pages.dev/  
**Repository:** https://github.com/nuggetenak/nugget-nihongo  
**Production branch reviewed:** `main`  
**Production commit reviewed:** `8f69f8245c77dbb0df66848edc66d32bd3e659c1` — `feat(curriculum): implement dedicated LessonStudyPage, 5W1H SLA framework, in-place embedded drills, and bump v18.0.0`  
**Default branch:** `develop`, commit `a5551b158c828720e7c06c53d2490cadf03637c2`  
**Assessment type:** Source-backed static audit plus repository/deployment metadata review. Not a penetration test.

## Executive summary

Nugget Nihongo has a substantial feature set and a working-looking delivery pipeline: the `main` branch contains a React/Vite application, vocabulary and grammar datasets, curriculum pages, PWA support, Supabase integration, and Cloudflare AI workers. GitHub Actions reported a successful production deployment for the reviewed `main` commit on 2026-10-10. One earlier deployment run on 2026-10-10 failed before a later run succeeded.

The most important risks are not just isolated bugs. They concern **branch governance**, **AI endpoint cost controls**, **concurrent data loading**, **cache correctness**, and **automated AI-content promotion**. Documentation also substantially lags the implementation, making it easier for maintainers or coding agents to work against the wrong architecture.

### Summary of priority findings

| ID | Severity | Finding | Confidence |
|---|---|---|---|
| F-01 | High | Public AI critique endpoint has no rate limit or authentication in its handler | Verified in source |
| F-02 | High | Client-supplied `userId` allows rate-limit identity rotation on chat/quiz endpoints | Verified in source |
| F-03 | High | Default branch `develop` is behind the production implementation | Verified in Git metadata |
| F-04 | High | Data-script loader can resolve before an existing script finishes loading and cache empty data | Verified in source; runtime reproduction pending |
| F-05 | Medium | AI cache key excludes learner level/goals/context | Verified in source |
| F-06 | Medium | Quiz generation is documented as costing two quota units but increments once | Verified in source |
| F-07 | Medium | Admin promotion uses `btoa()` on Unicode Japanese content, which can throw | Verified in source |
| F-08 | Medium | Admin promotion writes JavaScript-array syntax to `.md` nuance-note targets | Verified in source |
| F-09 | Medium | Supabase client configuration can be overridden by arbitrary URL query parameters | Verified in source |
| F-10 | Medium | Invalid lesson deep links silently fall back to the first lesson | Verified in source |
| F-11 | Medium | Service-worker precache contains a wrong path for confusion-pair data | Verified by comparing source tree and service worker |
| F-12 | Medium | README/package/architecture documentation describes a stale stack and deployment model | Verified in source |
| F-13 | Medium | README content-count table is stale relative to generated data headers | Verified in source |
| F-14 | Low–Medium | Rate-limit counter uses non-atomic read/modify/write in KV | Verified in source; practical bypass depends on concurrency/KV behavior |
| F-15 | Low–Medium | Service-worker precache errors are silently swallowed, obscuring missing offline assets | Verified in source |

Severity describes plausible impact, not evidence of a currently exploited production incident.

---

## Scope and limitations

Reviewed repository metadata and the `main` and `develop` trees; package manifests; deployment and validation workflows; the main application entry points; data loading; PWA registration and service worker; Supabase configuration/auth integration; AI proxy; admin API; selected tests; and existing project documentation.

**Live-browser limitation:** Direct retrieval of the deployed website was unavailable in this audit environment. I could not independently verify current page rendering, live HTTP headers, mobile layout, Lighthouse metrics, browser console errors, real user flows, deployed Worker bindings, Supabase dashboard configuration, or whether every production route works. The latest GitHub Actions deployment result is evidence that the pipeline completed, not proof that all runtime features are correct. Findings that require runtime confirmation are explicitly marked.

## Detailed findings

### F-01 — Public AI critique endpoint has no rate-limit check
**Severity: High · Confidence: Verified in source**

**Evidence:** `workers/ai-proxy.js`, `handleCritique()` and the main request router. The handler parses up to 20 questions and calls the multi-provider AI cascade, but unlike `handleChat()` and `handleGenerateQuiz()`, it does not call `checkRateLimit()` and does not require an authenticated user or administrative token.

**Impact:** If the deployed Worker exposes this route as the source indicates, an unauthenticated caller can trigger repeated provider calls. The questions array is capped by item count, but the handler does not impose a strict total request-body size or per-question content-size limit. This creates an avoidable provider-cost and availability risk.

**Reproduction / verification:**
1. Send a POST request to the deployed Worker’s `/critique` route with a valid JSON body containing a small `questions` array.
2. Repeat the request without authentication.
3. Inspect whether requests continue to reach providers and whether any quota is consumed.
4. Perform only controlled tests with provider billing and logs monitored.

**Recommended fix:** Require authentication or a signed server-side authorization token for internal critique workflows. Apply per-user and per-IP quotas, request-body size limits, schema validation, concurrency limits, and a hard provider-spend budget. Keep browser-facing public quiz/chat endpoints separate from internal generation/critic endpoints.

### F-02 — Caller can rotate `userId` to evade AI rate limits
**Severity: High · Confidence: Verified in source**

**Evidence:** `workers/ai-proxy.js`, `handleChat()` uses `const uid = userId || request.headers.get('CF-Connecting-IP') || 'anon'`; `handleGenerateQuiz()` similarly uses `body.userId || ...`. The `userId` is accepted from the JSON body and is used as the rate-limit key.

**Impact:** A caller can submit a different arbitrary user ID for each request, causing counters to be stored under different keys. CORS does not prevent non-browser clients from making requests, and CORS is not an authorization system.

**Reproduction / verification:**
1. Make repeated requests with different `userId` values.
2. Compare the `X-RateLimit-Remaining` response or the KV counter behavior.
3. Confirm whether each new ID receives a fresh budget.

**Recommended fix:** Derive the user identity from a verified Supabase JWT on the server, not a client-supplied string. For anonymous use, rate-limit by a trusted edge-observed IP plus abuse controls. Add an aggregate IP/global ceiling and concurrency protection. Never treat a user ID in a JSON body as authenticated identity.

### F-03 — `develop` is the default branch but is behind production
**Severity: High · Confidence: Verified in Git metadata**

**Evidence:** Repository metadata identifies `develop` as the default branch. `develop` is version `15.17.0`; `main` is version `18.0.0`. GitHub’s compare endpoint reports `main` is 43 commits ahead of `develop`, with 300 changed files. `main` contains the React/Vite app (`src/main.tsx`, `src/App.tsx`, `vite.config.ts`), while `develop`’s README/package scripts describe the older vanilla app.

**Impact:** New contributors and AI coding agents that clone the repository without explicitly checking out `main` may start from the old application. Fixes made against `develop` may not apply to the production architecture, and code/data changes may be lost or require difficult reconciliation. The default branch therefore does not provide a trustworthy representation of the deployed product.

**Recommended fix:** Decide on one canonical development strategy. Either bring `develop` forward to the current implementation and enforce PR-based promotion, or make `main` the default branch if it is the actual source of truth. Add branch protection, required CI checks, and a documented release flow. Update all AI-agent instructions to name the intended base branch and verify it before editing.

### F-04 — Concurrent data loads can cache an empty vocabulary/grammar list
**Severity: High · Confidence: Verified in source; runtime reproduction pending**

**Evidence:** `src/lib/data/dataManager.ts`, `loadScript()`: if a script element already exists, the function resolves immediately. It does not distinguish a script that has completed loading from one that is still in flight. `loadVocab()` and `loadGrammar()` then read the global array and cache the result.

**Impact:** If two components request the same level concurrently, the second call may see the existing but not-yet-loaded script, resolve immediately, observe `window.vocabN5` / `window.grammarN5` as undefined, and cache an empty array. Because the empty array is truthy, later calls may keep returning the empty cached result for the rest of that page session.

**Reproduction / verification:**
1. Clear site data and reload with a slow network or throttling enabled.
2. Trigger two requests for the same level close together (for example, opening views that both request N5).
3. Observe the data manager cache and UI for empty results.
4. Reload and compare.

**Recommended fix:** Maintain a `Map<string, Promise<void>>` for in-flight script loads. Return the same promise to every caller and resolve only on `load`; reject on `error`. Cache a dataset only after successful load and validate the global array. Do not permanently cache a transient empty result caused by a load failure.

### F-05 — AI cache key omits learner context
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `workers/ai-proxy.js`, `cacheKey(messages, mode)` hashes the last three messages, truncating each to 120 characters, plus the mode. It does not include the system context produced from the learner’s level, goals, current card, recent weaknesses, or learning DNA.

**Impact:** A cached explanation can be reused across users or sessions with different JLPT levels and learning goals. This can result in an explanation that is too advanced, too elementary, or inconsistent with the learner’s stated context. The risk is especially relevant because grammar explanations have a 30-day cache TTL.

**Recommended fix:** Include a normalized context fingerprint in the cache key: at minimum level, mode, relevant learning goal, and relevant current-card/weakness context. If the response is personalized, scope the cache by user or disable shared caching for that response type. Version the key when the prompt or model behavior changes.

### F-06 — Quiz generation consumes one quota unit despite a “two units” comment
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `handleGenerateQuiz()` says quiz generation “counts 2 against the daily budget,” but the handler calls `checkRateLimit()` once. `checkRateLimit()` increments the counter by one.

**Impact:** The effective quota for expensive batch generation is not what the comment and product logic claim. The discrepancy can double the intended number of batch calls available per day.

**Recommended fix:** Implement weighted quota consumption explicitly (e.g. `consumeQuota(identity, cost)`), or change the policy/comment to match the intended budget. Test the boundary case around the daily limit and ensure all AI routes share a consistent quota model.

### F-07 — Admin content promotion can fail on Japanese Unicode text
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `workers/admin-api.js`, `openPromotionPR()`: existing file contents are decoded using `atob()`, then a new entry is serialized with Japanese text and inserted. The updated content is passed to `btoa(updatedContent)`. Browser/Worker `btoa()` accepts a binary string, not arbitrary Unicode characters; Japanese characters can cause an `InvalidCharacterError`.

**Impact:** Promotion of quiz items or vocabulary containing Japanese characters can fail before the GitHub Contents API request. The function catches the error and returns `null`, so the UI may appear to complete the Supabase-side promotion while the expected GitHub PR is never created.

**Reproduction / verification:**
1. In a non-production test environment, promote a candidate whose payload contains Japanese kana/kanji.
2. Inspect Worker logs and whether a PR is created.
3. Compare with a payload containing only ASCII text.

**Recommended fix:** Use a proper UTF-8-safe base64 encoder/decoder or send UTF-8 text through a library/API that handles encoding correctly. Add an automated test with Japanese characters, emoji, and Indonesian diacritics. Check and handle HTTP responses from branch creation and file update steps rather than assuming they succeeded.

### F-08 — Admin promotion writes JavaScript-array syntax into Markdown note files
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `promotionTargetFile()` routes `nuance_note` items to `public/data/nuance-notes/${item.ai_item_id}.md`. But `openPromotionPR()` uses the same transformation for all target files: it tries to replace a trailing `];` with a comma plus JSON entry and a closing `];`.

**Impact:** A Markdown nuance note is not a JavaScript array. The transformation is incompatible with the target format and may produce invalid or nonsensical Markdown; if the note does not end in `];`, the replacement may not append the intended entry at all.

**Recommended fix:** Separate writers by target type. Use a Markdown template for `.md` files, a schema-aware array append for JS data files, and a JSON parser/serializer for JSON. Validate the final output before committing and add tests for every `item_type` → target-file mapping.

### F-09 — Supabase URL/key can be overridden via arbitrary query parameters
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `src/lib/supabase/client.ts`, `getStoredSupabaseConfig()`, reads `sb_url` / `supabase_url` and `sb_key` / `supabase_anon_key` from the URL and stores them in localStorage before creating the client. The URL is not restricted to a known Supabase project or validated against an explicit HTTPS/domain allowlist.

**Impact:** A specially crafted link can persist an unexpected backend configuration in the user’s browser. This is an unsafe trust boundary for authentication and data operations. It can cause confusing failures and may route future requests to an untrusted endpoint if the user follows the link and uses cloud features. The public anon key is not itself a secret; the issue is the arbitrary endpoint override and persistence.

**Recommended fix:** Remove URL-based configuration from production builds, or gate it behind a deliberate developer mode. Require HTTPS and validate the hostname/project against an allowlist. Strip setup parameters from the address bar after handling them. Display the active backend hostname clearly and provide a safe reset-to-default action.

### F-10 — Invalid lesson deep links silently display a different lesson
**Severity: Medium · Confidence: Verified in source**

**Evidence:** `src/pages/LessonStudyPage.tsx` resolves a requested lesson with `foundUnit?.lessons?.find(...) || foundUnit?.lessons?.[0]`. If a requested lesson ID does not exist, the first lesson is silently selected.

**Impact:** A stale or malformed lesson URL can open the wrong lesson without telling the learner. Completion/progress can then be recorded against the fallback lesson, creating confusing progress data.

**Recommended fix:** Distinguish “no unit found” and “no lesson found” from a legitimate request for the first lesson. Show a not-found state or redirect to the track/unit index with a message. Only select the first lesson when the user intentionally opens a unit without a lesson ID.

### F-11 — Service-worker precache references a wrong confusion-pair path
**Severity: Medium · Confidence: Verified by source comparison**

**Evidence:** `public/sw.js` lists `/data/diagnostics/confusion-pairs.js` among `CORE_ASSETS`. The `main` tree instead contains `public/data/confusion-pairs.js` (and a separate `public/data/diagnostic/diagnostic-inventory.js`). The precache URL therefore does not match the actual confusion-pair file path.

**Impact:** The intended confusion-pair file will not be precached under that URL. If the app needs it offline before it has been dynamically cached, the feature may fail offline. This is a specific mismatch; the actual user-visible effect depends on how and when the file is loaded.

**Recommended fix:** Correct the path and audit every `CORE_ASSETS` entry against the built `dist/` output. Add a CI test that checks every required precache path exists. Do not silently treat required content assets as optional.

### F-12 — Service-worker installation hides missing precache assets
**Severity: Low–Medium · Confidence: Verified in source**

**Evidence:** `public/sw.js` uses `Promise.allSettled()` and catches each `cache.add()` failure with an empty handler, including assets listed in `CORE_ASSETS`.

**Impact:** Installation succeeds even if an asset described as core is missing. This is useful for optional legacy files, but it also makes actual offline regressions hard to detect and gives no observable signal that a required dataset failed to cache.

**Recommended fix:** Split required and optional assets. Fail or report installation when required app-shell/data assets cannot be cached; log or telemetry-report optional failures. Test offline cold-start after a clean install, not just offline navigation after the site has already been used.

### F-13 — Project documentation describes the old architecture
**Severity: Medium · Confidence: Verified in source**

**Evidence:**
- `README.md` says Vanilla JavaScript, no framework, and no build step.
- `package.json` on `main` declares React, React DOM, Zustand, Vite, TypeScript, and a build pipeline.
- `ARCHITECTURE.md` describes v15.6.0 and a vanilla-JS architecture.
- `package.json` `homepage` points to `https://nuggetenak.github.io/nugget-nihongo/`, while the README identifies Cloudflare Pages as the live site.
- The repository default branch is the older `develop` implementation.

**Impact:** Contributors may follow incorrect setup instructions, assume a different deployment root, edit the wrong entry point, or make invalid assumptions about data loading and app state. AI agents may use the wrong branch or architecture as a source of truth.

**Recommended fix:** Update README, architecture, setup, agent instructions, and package metadata together. Document the current React/Vite entry point, `dist/` build output, Cloudflare Pages deployment, Supabase configuration, and the intended development branch. Add a CI check that flags stale version numbers and deployment URLs in canonical documentation.

### F-14 — README data counts do not match generated data headers
**Severity: Medium · Confidence: Verified in source**

**Evidence:** The README table lists grammar N3 = 119, N2 = 250, N1 = 140 and vocabulary N2 = 260, N1 = 130. Current generated file headers on `main` state grammar N3 = 163, N2 = 310, N1 = 200 and vocabulary N2 = 344, N1 = 190 (generated 2026-10-10).

**Impact:** The product’s public feature counts and internal progress estimates are inaccurate. Learners and maintainers cannot tell which numbers are current, and coverage claims can drift from the actual datasets.

**Recommended fix:** Generate the README count table from the canonical data files during CI. Avoid hand-maintained counts. Add a check that fails when documented counts differ from generated file headers or parsed entry counts.

### F-15 — KV rate limiting uses non-atomic read/modify/write
**Severity: Low–Medium · Confidence: Verified in source**

**Evidence:** `checkRateLimit()` reads the count from KV, checks the limit, then writes `count + 1`. Concurrent requests can read the same previous count before either write completes. KV is not a transactional atomic counter.

**Impact:** Bursts of concurrent requests may pass the limit and overwrite one another’s increments. This compounds the user-ID spoofing issue, although the practical extent depends on request concurrency and KV consistency.

**Recommended fix:** Use a rate-limiting primitive designed for atomic updates (e.g. Durable Objects or another transactional counter), or use a robust edge rate-limiting mechanism. Keep a global ceiling in addition to per-user quotas.

---

## Website/product review

### What is supported by source
- Indonesian-language learning product targeting JLPT N5–N1.
- React/Vite application on `main`, with feature modules for learning, quizzes, Sensei AI, study lessons, settings, and PWA functionality.
- Vocabulary/grammar data is stored as generated JavaScript files under `public/data/`.
- PWA service-worker registration is initiated from the app.
- Supabase auth/sync is present in the codebase, with local-first behavior and a message indicating cloud sync can be unavailable.
- A Cloudflare Worker handles AI chat, quiz generation, and critique.

### What remains unverified at runtime
- Whether the live homepage currently renders correctly on desktop and mobile.
- Whether the deployed site is serving the same commit as the latest successful workflow.
- Whether every curriculum track and deep link loads the correct lesson.
- Whether install prompts, service-worker updates, and offline cold starts work on Android Chrome and iOS Safari.
- Whether Google OAuth is configured correctly in the Supabase dashboard.
- Whether the AI Worker is deployed with all required secrets/bindings and whether provider fallback behaves correctly.
- Actual page speed, Core Web Vitals, accessibility conformance, keyboard navigation, and screen-reader behavior.
- Live response security headers, caching headers, CSP, and other HTTP-level configuration.

### Recommended manual smoke-test matrix
1. Open the site in a fresh browser profile and on a mobile viewport.
2. Navigate through Home → Materi → N5/N4 → lesson → quiz → progress.
3. Open a valid lesson deep link, then an invalid lesson/unit ID.
4. Load vocabulary/grammar while throttling the network and watch for empty lists.
5. Install the PWA, then cold-start it in airplane mode before visiting every section online.
6. Try AI chat, quiz generation, and critique separately with controlled request quotas.
7. Test sign-in with an unconfigured backend and a valid configured backend; verify errors are clear and no progress is lost.
8. Check keyboard shortcuts while focus is inside inputs, search, modals, and quiz controls.
9. Test browser back/forward, reload on each route/hash, and multiple tabs.
10. Run Lighthouse and accessibility checks on desktop and mobile, then manually inspect all serious findings.

## CI/CD and repository governance

### Positive evidence
- The `main` deployment workflow runs `npm ci`, `npm run build`, and then deploys `dist` to Cloudflare Pages.
- GitHub Actions reported a successful deployment for the reviewed `main` commit on 2026-10-10.
- A validation workflow runs data tests, a quality checker, and a service-worker/app version-sync check.
- A prior deployment attempt on 2026-10-10 failed, followed by successful deployments. The failure should be inspected if its cause is not already understood.

### Gaps and recommendations
- `develop` is the repository default but not the current production implementation.
- The validate workflow’s documented test scope is not equivalent to browser end-to-end testing. Unit/data validation does not prove the live app works.
- The AI worker smoke test in the worker deployment workflow treats a missing `"reply"` as a warning and exits successfully (`exit 0`), so the workflow can report success even when the smoke test detects a failure. Change this to a nonzero exit code for a failed required health check.
- Add a real production smoke test after deployment: request the homepage, check critical assets, validate the manifest/service worker, and exercise a non-destructive API health check.
- Protect the production branch and require passing build, data-quality, and smoke-test checks before deployment.
- Add explicit CI tests for the identified races, cache-key context, Unicode promotion, and path/file-format mappings.

## Prioritized remediation roadmap

### P0 — Do first
1. Add authentication and quota controls to `/critique`.
2. Stop trusting caller-supplied `userId`; derive identity from verified credentials.
3. Fix the data loader’s in-flight script race and prevent caching transient empty datasets.
4. Reconcile `develop` with production and set an intentional default branch.

### P1 — Next
5. Make AI cache keys context-aware.
6. Correct weighted quota consumption and replace non-atomic KV counters.
7. Fix Unicode-safe GitHub content writes and Markdown-vs-JS promotion writers.
8. Validate Supabase configuration inputs and remove unsafe production query-param overrides.
9. Correct the service-worker confusion-pair path and enforce required precache integrity.
10. Stop invalid lesson IDs from silently resolving to another lesson.

### P2 — Quality and maintainability
11. Bring README, architecture, setup docs, package metadata, and agent instructions into sync.
12. Generate data counts automatically.
13. Make Worker smoke-test failures fail the workflow.
14. Add end-to-end and offline cold-start tests, then run mobile accessibility/performance audits.

## Evidence links

- Repository: https://github.com/nuggetenak/nugget-nihongo
- Production commit: https://github.com/nuggetenak/nugget-nihongo/commit/8f69f8245c77dbb0df66848edc66d32bd3e659c1
- Branch comparison (`develop...main`): https://github.com/nuggetenak/nugget-nihongo/compare/develop...main
- Latest deployment run: https://github.com/nuggetenak/nugget-nihongo/actions/runs/38063872599
- AI proxy: https://github.com/nuggetenak/nugget-nihongo/blob/main/workers/ai-proxy.js
- Admin API: https://github.com/nuggetenak/nugget-nihongo/blob/main/workers/admin-api.js
- Data manager: https://github.com/nuggetenak/nugget-nihongo/blob/main/src/lib/data/dataManager.ts
- Supabase client config: https://github.com/nuggetenak/nugget-nihongo/blob/main/src/lib/supabase/client.ts
- Lesson study page: https://github.com/nuggetenak/nugget-nihongo/blob/main/src/pages/LessonStudyPage.tsx
- Service worker: https://github.com/nuggetenak/nugget-nihongo/blob/main/public/sw.js
- Deployment workflow: https://github.com/nuggetenak/nugget-nihongo/blob/main/.github/workflows/deploy.yml
- Worker deployment workflow: https://github.com/nuggetenak/nugget-nihongo/blob/main/.github/workflows/deploy-ai-worker.yml

## Final assessment

The project has a promising breadth of learning features and evidence of active development. The biggest risks are operational and correctness-related: the default branch is stale relative to production, AI endpoints need stronger abuse/cost controls, a concurrent data-loading race can poison the in-memory cache, and the AI-content promotion path contains encoding/format bugs.

Treat this report as a **source-backed audit with limited live-runtime verification**, not as a certification that the deployed website has passed all browser, security, or performance tests. Fix the P0 items, add targeted regression tests, and then complete the live mobile/offline/API smoke-test matrix.
