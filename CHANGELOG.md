# Changelog — Nugget Nihongo

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
