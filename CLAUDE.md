# CLAUDE.md — Handoff Note for Claude Code
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 10 April 2026 · v15.6.0  
**Owner:** Nugget (non-programmer, Indonesian speaker)

---

## WHAT IS THIS PROJECT

A vanilla JS **hybrid** PWA for learning Japanese, targeting Indonesian speakers. No framework (React/Vue/etc.) — pure HTML/CSS/JS with script tags. Primary storage is Supabase; IndexedDB is the offline fallback. Service worker provides offline capability for core study features.

**Tech stack:** HTML + vanilla JS + CSS · Service Worker · FSRS (ts-fsrs CDN) · Supabase (auth, SRS sync, progress) · Cloudflare Pages (hosting) · Cloudflare Workers (AI proxy)

**Repo structure:**
```
public/              ← deploy root (Cloudflare Pages serves this)
  index.html         ← single-page app, 4 tabs: Browse / Quiz / Sensei / Stats
  styles/app.css     ← all styles (3144 lines)
  sw.js              ← service worker (nihongo-v15.6.0, hybrid cache strategy)
  js/                ← JS modules (no bundler, loaded via script tags)
    core/            ← version.js, state.js, router.js, theme.js, install.js
    local-state.js   ← IndexedDB wrapper + Supabase sync queue
    fsrs-math.js     ← FSRS calibration for Indonesian learners
    fsrs-engine.js   ← FSRS scheduler (ts-fsrs CDN) + IndexedDB sync hook
    analytics.js     ← Stats dashboard (JLPT rings, SRS health, heatmap)
    ai-tutor.js      ← AI Sensei UI (3 modes: explain/practice/test)
    supabase-client.js ← Auth, SRS sync, Learning DNA API
    [+ 25 other feature modules]
  data/              ← content database as JS files
    vocab/           ← vocab-n5.js (711) · n4 (692) · n3 (70) · n2 seed (50) · n1 seed (20)
    grammar/         ← grammar-n5 (80) · n4 (90) · n3 (103) · n2 seed (30) + grammar-index.js
    books/           ← book index files + Soumatome grammar lenses (N3: 132, N4: 102)
    tracks/          ← study track definitions (runtime-populated)
    fallback/        ← grammar-drills.json + vocab-drills.json (offline AI fallback)
  icons/             ← PWA icons
  manifest.webmanifest
workers/             ← Cloudflare Worker source
  ai-proxy.js        ← tiered AI routing (Groq fast / Gemini complex) + KV rate limits
  wrangler.toml      ← Worker config (KV namespace: RATE_LIMITS)
supabase/
  schema.sql         ← 7 tables + RLS + triggers + learning_dna JSONB (idempotent)
  functions/
    ai-router/       ← Edge Function: Groq+Gemini routing, Indonesian tutor persona
wrangler.jsonc       ← Cloudflare Pages config (serves public/)
docs/                ← collected project documentation (project/, agent-system/, supabase/)
tests/               ← test runner (node tests/run.js → 10307 PASS, 0 FAIL)
tools/               ← build/migration scripts (gitignored)
```

## CURRENT STATE (v15.6.0)

### What works
- Grammar DB: N5 (80), N4 (90), N3 (103) — all with 5-digit IDs, examples, descriptions
- Vocab DB: N5 (711), N4 (692), N3 (70) — 5-digit IDs, bilingual examples
- Seed data: N2 grammar (30 entries), N2 vocab (50 entries), N1 vocab (20 entries)
- Soumatome grammar lenses: N3 (132 entries), N4 (102) — fully populated
- Study tracks: JLPT N5-N1 auto-populate at runtime, Soumatome tracks from lens, Freeway hand-curated
- Engines: conjugation, FSRS (ts-fsrs), quiz engine v2, gamification, backup/restore
- AI Sensei tab: 3 modes (explain/practice/test), quota bar, conversation history, Learning DNA context
- Stats tab: JLPT readiness rings, SRS health chart, review heatmap, weak-point tracker
- Auth UI: Supabase Google OAuth (wiring in supabase-client.js, awaiting credentials)
- Offline AI fallback drills: grammar-drills.json + vocab-drills.json
- PWA: installable, offline-capable via service worker (cache-first static, network-first API)
- App startup: no ReferenceErrors — all critical bugs fixed

### What still needs doing (priority order)

See **MASTER-AUDIT.md** for full task specs and execution order. Summary:

#### TASK 4 — Fill grammar_ids: Irodori A2-1 & A2-2 [P0]
Files: `book-irodori-a2-1.js`, `book-irodori-a2-2.js`, `grammar-n5.js`, `grammar-n4.js`
Read `SPEC-GRAMMAR-IRODORI-A2.md` first. Add 6 new global grammar entries + fill all grammar_ids arrays.

#### TASK 5 — Fill grammar lens content: Irodori A2-1 & A2-2 [P0]
Files: `public/data/books/irodori/grammar-lens-ir-a2-1.js`, `grammar-lens-ir-a2-2.js`
Currently stubs. Fill using SPEC-GRAMMAR-IRODORI-A2.md. Use grammar-lens-ir-a1.js as format reference.

#### TASK 6 — Verify Irodori A1 grammar lens links [P2]
File: `public/data/books/irodori/grammar-lens-ir-a1.js`
Verify all `global_grammar_id` values exist in grammar-n5.js. Patch nulls.

#### TASK 7 — Fill grammar_ids: Irodori A1 [P2]
File: `public/data/books/book-irodori-a1.js`
Extract grammar IDs from verified A1 lens → fill grammar_ids per unit.

#### TASK 8 — N3 vocab expansion [P3]
File: `public/data/vocab/vocab-n3.js`
Grow from 70 → 300+ entries. 50 entries per sub-session.

#### Infrastructure (human tasks — Nugget provides keys)
- **Supabase credentials:** Edit `public/js/supabase-client.js`, replace `YOUR_PROJECT` / `YOUR_ANON_KEY_HERE`. Project ref: `oxeuwkpgrtojjzhcboqz`.
- **Cloudflare Worker secrets:** `wrangler secret put GROQ_API_KEY` + `GEMINI_API_KEY` (see `SETUP.md`).

#### Lower priority
- JMdict pipeline: `tools/jmdict-pipeline.py` ready, needs Indonesian translation + ID remapping
- N2/N1 seed data: `meaning_id` fields need filling
- UI: track selection page, book browsing, Methodology/About page + Daftar Pustaka
- Minna no Nihongo book lenses: empty, low priority unless Nugget has PDFs

---

## IMPORTANT CONVENTIONS

- **IDs:** Vocab = `vg-{level}-{5digit}` (e.g., `vg-n5-00001`). Grammar = `gn{level}-{5digit}` (e.g., `gn5-00001`).
- **No bundler.** All JS loaded via `<script>` tags in index.html. Load order matters.
- **Hybrid (not offline-first).** Supabase is primary. IndexedDB + SW = fallback. AI requires network.
- **Indonesian is primary UI language.** Code comments mix Indonesian and English.
- **`version.js`** is the single source of truth for version. Must match `nihongo-{version}` in `sw.js`.
- **`_schema.md`** in `public/data/` is the canonical data architecture doc.
- **`tools/` is gitignored.** Scripts there are for local use only.
- **`corpus/v17-pass15`** branch is reserved for the senior FE architect agent — do NOT touch.

## ATTRIBUTION REQUIREMENTS

If JMdict data is used, the app MUST display (e.g., on an About/Attribution page):
> This application uses the JMdict dictionary file, the property of the
> Electronic Dictionary Research and Development Group (EDRDG), and is
> used in conformance with the EDRDG's licence provisions.
> https://www.edrdg.org/edrdg/licence.html

---

*Last edited: Claude Code (TASK 3 audit) — 15 April 2026*
