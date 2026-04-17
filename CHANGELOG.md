# Changelog — Nugget Nihongo

## v15.7.0 (18 April 2026)
- Content Population Batch A: +375 entries via 10-agent pipeline
  - vocab-n3: 150→285 entries (+135: movement verbs, adjectives, society nouns)
  - vocab-n2: 50→130 entries (+80: formal verbs, abstract nouns)
  - vocab-n1: 20→60 entries (+40: advanced abstract nouns)
  - grammar-n2: 30→90 entries (+60: connective patterns, modality)
  - grammar-n1: 0→60 entries (+60: core N1 & keigo patterns — file was empty placeholder)
- QA fixes: 9 confusion_pairs bidirectionality issues resolved before push
- Docs audit: stale counts fixed across MASTER-AUDIT, ARCHITECTURE, CLAUDE, _MAP, CLAUDE-CODE-TASKS, README
- README: fixed wrong GitHub org URL (nugget-nihongo → nuggetenak), live URL, vocab/grammar counts, SRS algo label

## v15.6.1 (16–17 April 2026)
- TASK-CC-1: Deleted stale claude/frontend-overhaul branch
- TASK-CC-2: Fixed level pill order in index.html (N5→N4→N3→N2→N1)
- TASK-CC-3: Fixed header branding (日本語総まとめ → Nugget Nihongo)
- TASK-CC-6: Fixed auth button visibility (display:none → JS-controlled)
- Tasks 4 (TASK 4–7 from 15 Apr audit): grammar_ids filled for Irodori A1/A2-1/A2-2
- Tasks 5: grammar lens content filled for Irodori A2-1 (65 entries) and A2-2 (62 entries)
- grammar-n5: 80→94 entries (14 added via Tasks 4+6)
- grammar-n4: 90→92 entries (2 added via Task 4)
- vocab-n3: 70→100→150 entries (seed batches A+B)
- Supabase: 7 tables deployed, RLS enabled, CDN uncommented in index.html
- Cloudflare Pages: deployed and serving live

## v15.6.0 (10 April 2026) — Enterprise Restructure + AI Infrastructure + Full Codebase Audit

### Bug Fixes (Critical — app crashed on startup)
- **BUG-001**: Removed `srsLoad()` call in `app.js` — `srs.js` was never loaded, caused ReferenceError that aborted entire DOMContentLoaded handler
- **BUG-002**: Added `streak.js` to index.html load order; rewrote it to be display-only (delegates to `gamification.js`) — fixes `loadStreak()` ReferenceError
- **BUG-003**: Activated Supabase CDN `<script>` tag in index.html — `window.supabase` was undefined, breaking all auth/sync/AI
- **Fix**: Resolved `LS_STREAK` key conflict (`'bunpou_streak'` vs `'nn_streak'`) — streak.js now reads from `window.streakState` (gamification.js export)
- **Fix**: Added null guards to `grammar-index.js` compat shim — prevented crash in Node.js test runner

### New Features
- **AI Sensei tab**: Full AI tutor (`ai-tutor.js` 364L) — 3 modes (explain/practice/test), quota bar, conversation history, Learning DNA context injection
- **Stats tab**: Analytics dashboard (`analytics.js` 393L) — JLPT readiness rings, SRS health chart, review heatmap, weak-point tracker
- **FSRS calibration**: `fsrs-math.js` (84L) — math utilities + `window.fsrsIndonesianPrior` hook for Indonesian-learner calibration
- **Offline AI fallback**: `data/fallback/grammar-drills.json` + `vocab-drills.json` — 10+ drill items each, used when AI is unavailable

### AI Infrastructure
- **Cloudflare Worker** (`workers/ai-proxy.js`, 324L): tiered AI routing — Groq (llama-3.1-8b-instant, fast) + Gemini (gemini-1.5-flash, complex) with KV rate limiting per user
- **Supabase Edge Function** (`supabase/functions/ai-router/index.ts`, 278L): backup AI route with Indonesian tutor persona
- **Learning DNA**: `dna-summarizer.js` extracts mistake patterns; `supabase-client.js` injects into AI system prompt via Supabase `learning_dna` JSONB column

### Supabase Upgrades
- `supabase-client.js`: Added Learning DNA API, auth state listener, sync loop
- `supabase/schema.sql`: Full idempotency (DROP POLICY IF EXISTS, CREATE INDEX IF NOT EXISTS, IF NOT EXISTS on all objects); `learning_dna JSONB DEFAULT '{}'` column on profiles
- `fsrs-engine.js`: Added IndexedDB sync queue hook (saves to localState + queues Supabase sync)

### Deployment
- `wrangler.jsonc`: Cloudflare Pages config (serves `public/`, node_compat, observability)
- `workers/wrangler.toml`: Cloudflare Worker config with KV namespace RATE_LIMITS
- `package.json`: Added `deploy`/`preview` scripts + `wrangler@^4.81.0` devDependency; bumped version to 15.6.0; fixed repo URL to `nuggetenak/nugget-nihongo`

### Service Worker (nihongo-v15.6.0)
- Hybrid cache strategy: cache-first static, network-first for `supabase.co`, `workers.dev`, `googleapis.com`, `groq.com`
- Added to cache: `streak.js`, `supabase-client.js`, `analytics.js`, `fsrs-math.js`, `local-state.js`, fallback drills
- Removed from cache: `grammar-query.js` (legacy), empty N1/N2 placeholder stubs

### Data
- **Grammar N2**: 30 real seed entries (gn2-00001 → gn2-00030) — replaces empty stub
- **Vocab N2**: 50 real seed entries (vg-n2-00001 → vg-n2-00050) — replaces empty stub
- **Vocab N1**: 20 real seed entries (vg-n1-00001 → vg-n1-00020) — replaces empty stub

### Dead Code Removal
- Deleted `public/js/srs.js` — old SM-2 algorithm, fully superseded by `fsrs-engine.js` (FSRS)
- Removed `grammar-query.js` from SW cache (superseded by `grammar-index.js`)

### Test Suite
- Removed 16 stale `loadData` calls (week cards n3-w1…n4-w6, dummy.js, bank-soal files, old grammar/index.js)
- Added Architecture v3 tests: `grammarDB` count (≥273), `vocabDB` merged count (≥1400)
- Added fallback drills validation (structure, item count, required fields)
- Result: **10307 PASS, 0 FAIL** (was: 1 FAIL + 17 SKIPs)

### Documentation
- `ARCHITECTURE.md`: Complete rewrite for enterprise hybrid architecture
- `CLAUDE.md`: Updated current state, tech stack, todo list for v15.6.0
- `DESIGN_SYSTEM.md`: Component library documentation (new)
- `SETUP.md`: Step-by-step install + Cloudflare Worker deployment guide (new)
- `docs/`: Collected all project documents from all branches
  - `docs/project/`: VISION, ROADMAP, _MAP, session recaps, directive logs, merge summary
  - `docs/agent-system/`: AGENT-CORE, A1-A9 agents, common modules, reference guides
  - `docs/supabase/`: 28 Postgres best practices reference guides

### Tooling
- `.mcp.json`: Supabase MCP server config (project ref oxeuwkpgrtojjzhcboqz)
- `skills-lock.json`: Supabase Postgres best practices skill lock

---

## v15.4.0 (2 April 2026) — JMdict Pipeline + Supabase + Claude Code Handoff
- **Pipeline**: `tools/jmdict-pipeline.py` — downloads JMdict XML, transforms to Nugget Nihongo format
- **Supabase**: `supabase/schema.sql` — 7 tables with RLS (profiles, srs_cards, course_progress, achievements, review_history, error_reports, user_settings)
- **Supabase**: `public/js/supabase-client.js` — client integration (auth, SRS sync, progress, error reports)
- **Docs**: `CLAUDE.md` — Claude Code handoff note with full project context and task list
- **Docs**: `PROJECT-STATUS-v15.3.2.md` — comprehensive project inventory

## v15.3.2 (2 April 2026) — Study Tracks + Cleanup
- **Tracks**: Runtime auto-population for JLPT tracks (N5-N1) from global DB
- **Tracks**: Runtime auto-population for Soumatome N3/N4 tracks from lens files
- **Tracks**: Freeway track curated with 21 survival grammar patterns (hand-verified)
- **Cleanup**: Removed 5 duplicate vocab lens files (were identical copies of old book files)
- **Docs**: RESUME updated with accurate phase status

## v15.3.1 (2 April 2026) — Soumatome Lens Migration + Cleanup
- **Migration**: Soumatome N3 grammar lens — 132/132 entries populated (desc, examples, connection from old w-files)
- **Migration**: Soumatome N4 grammar lens — 102/102 entries populated
- **Cleanup**: Removed 18 orphan files (old w-files, bank-soal, dummy.js, index.js, qa-tests.js)
- **Tool**: `tools/migrate-soumatome-lens.py` migration script added
- **Docs**: RESUME-v15.3.0.md added for session continuity

## v15.3.0 (2 April 2026) — Architecture v3 + FSRS + Quiz Engine v2 + Gamification
- **Architecture**: Data Architecture v3 — one global DB, book lenses, study tracks
- **Migration**: All IDs migrated to 5-digit format (grammar + vocab)
- **New**: grammar-index.js (merged grammar query API)
- **New**: Soumatome grammar lens structures (N3 + N4)
- **New**: Vocab book lens shells (Irodori A1/A2-1/A2-2, Minna 1/2)
- **New**: tracks.js study track definitions
- **New**: fsrs-engine.js, quiz-engine-v2.js, gamification.js, backup-restore.js
- **New**: `_taxonomy.md` (Taxonomy Master document)
- **Updated**: `_schema.md` rewritten for Architecture v3

## v15.0.0 (1 April 2026) — Project Restructure
**BREAKING: All app file paths changed. SW cache busted.**

### Directory Restructure
- All deployable files moved into `public/` deploy root
- `data/` reorganized: `data/vocab/`, `data/grammar/`, `data/books/`
- `css/style.css` → `public/styles/app.css`
- `manifest.json` → `public/manifest.webmanifest`
- Icons moved to `public/icons/`
- 64 script tags in index.html updated
- ~80 SW ASSETS entries updated
- 34 tool scripts path-fixed

### Infrastructure
- `deploy.yml` simplified: 43 lines → 24 lines (just deploy `public/`)
- `validate.yml` updated for new paths + uses `.nvmrc`
- `pre-deploy-checks.yml` added (structure + security validation)
- `tests/run.js` rewritten with new paths + resilient eval
- Added: `LICENSE` (MIT), `.nvmrc` (Node 22), `.prettierrc`
- `package.json` v15.0.0 with `engines`, `scripts` (test, start, serve, check:version)
- `jsconfig.json` updated with `@public/`, `@data/`, `@js/` path aliases
- `.gitignore` cleaned and simplified
- `.editorconfig` updated
- All `HAS_NEW_STRUCTURE` / GOV-018-D compat code removed from 34 scripts
- Termux scripts updated to new paths

### Documentation
- `ARCHITECTURE.md` rewritten for v15 structure
- `_MAP.md` file structure section updated

### Data (unchanged)
- Vocab: 1,519 entries (N5: 789, N4: 720, N3: 110 [70 active])
- Grammar: N5 248, N4 272, N3 329 (120 global + 132 week cards)
- Tools: 133 scripts (26 spicy + 107 utils)

## v14.27.7 (1 April 2026)
- **Content**: 70 N3 vocab entries (vocab-n3.js activated)
- **Content**: 16 new N3 grammar entries (gn3-0105 to gn3-0120)
- **Fix**: INC-027 — 78 broken xrefs in vocab-n5.js
- **Fix**: INC-018/INC-022 verified resolved
- **Infra**: Root cleanup — 18 governance files moved to docs/
- **Merge**: CRUNCHY-AUDIT (10 AGENT-CORE files, DB fixes, _MAP.md)
- **Merge**: TASK-SPICY-8 (5 validation scripts)
- Total vocab: 1,473 (N5: 711, N4: 692, N3: 70)
- Total grammar N3: 120

## v14.27.4 (31 March 2026)
- TASK-INFRA-1 & TASK-INFRA-2 merged
- TASK-DEPLOY-FIX (P0): pk-nugget-nihongo/ removed from public repo
- GitHub repo synced to main branch

## v14.23.1 (23 March 2026)
- GOV-017 merged (Taxonomy v5, MASTER-DIRECTIVE-LOG)
- TASK-SPICY-F-002 (AUTO-TRIGGER 5 agents)
- GRM-6 confirmed ✅

## v14.22.3 (22 March 2026)
- Batch merge: TASK-SPICY-7, TASK-SPICY-DIAG, TASK-INTEL-P0B,
  TASK-UI-10, TASK-INC015-FIX, TASK-INC014-FIX,
  TASK-BATTER-CATS-REVIEW, TASK-8

## v14.14.0 (18 March 2026)
- TASK-SPICY-1: 19 scripts (tools/scripts/spicy/)

## v14.13.0 (18 March 2026)
- GOV-011: Team expansion (A7 Spicy, A8 Fluffy, A9 Savory)

## v14.11.0 (17 March 2026)
- TASK-UI-BUNDLE-1: daily-word filter, CSS consolidation, INC-001

## v14.9.0 (17 March 2026)
- RESTRUKTURISASI-B: Unified vocab (N5 711, N4 692) + grammar global
