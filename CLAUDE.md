# CLAUDE.md — Handoff Note for Claude Code
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 18 April 2026 · v15.7.0  
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
    vocab/           ← vocab-n5 (725) · n4 (692) · n3 (285) · n2 (130) · n1 (60)
    grammar/         ← grammar-n5 (94) · n4 (92) · n3 (103) · n2 (90) · n1 (60) + grammar-index.js
    books/           ← book index files + Soumatome grammar lenses (N3: 132, N4: 102)
                        + Irodori grammar lenses (A1: 61, A2-1: 65, A2-2: 62)
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
tests/               ← test runner (node tests/run.js → 10,550 PASS, 0 FAIL)
tools/               ← build/migration scripts (gitignored)
```

## CURRENT STATE (v15.7.0)

### What works
- Grammar DB: N5 (94), N4 (92), N3 (103) — full coverage, 5-digit IDs, examples, descriptions
- Grammar DB: N2 (90), N1 (60) — partial, good working coverage for common patterns
- Vocab DB: N5 (725), N4 (692), N3 (285) — 5-digit IDs, bilingual examples
- Vocab DB: N2 (130), N1 (60) — partial seed, usable for basic coverage
- Soumatome grammar lenses: N3 (132 entries), N4 (102) — fully populated
- Irodori grammar lenses: A1 (61), A2-1 (65), A2-2 (62) — fully populated
- Study tracks: JLPT N5-N1 auto-populate at runtime, Soumatome tracks from lens, Freeway hand-curated
- Engines: conjugation, FSRS (ts-fsrs), quiz engine v2, gamification, backup/restore
- AI Sensei tab: 3 modes (explain/practice/test), quota bar, conversation history, Learning DNA context
- Stats tab: JLPT readiness rings, SRS health chart, review heatmap, weak-point tracker
- Auth UI: Supabase Google OAuth (wiring in supabase-client.js, awaiting credentials)
- Offline AI fallback drills: grammar-drills.json + vocab-drills.json
- PWA: installable, offline-capable via service worker (cache-first static, network-first API)
- App startup: no ReferenceErrors — all critical bugs fixed

### What still needs doing (priority order)

See **MASTER-AUDIT.md** for full task specs and execution order. Current active tasks are TASK 12–17. Tasks 1–11 are complete.

#### TASK 12 — Deploy AI Proxy Worker [BLOCKED]
Needs `GROQ_API_KEY` + `GEMINI_API_KEY` from Nugget first.
See `SETUP.md` and `CLAUDE-CODE-TASKS.md § TASK-CC-4`.

#### TASK 13 — Setup Google OAuth [Human task]
Supabase Dashboard → Authentication → Providers → Google → Enable.
Redirect URL: `https://oxeuwkpgrtojjzhcboqz.supabase.co/auth/v1/callback`

#### TASK 14 — Category panel accordion UX [Post-launch]
Group 40+ categories into 8 super-categories, collapsed by default.
See `CLAUDE-CODE-TASKS.md § TASK-CC-5`.

#### TASK 15 — N3 vocab expansion [Next content batch]
File: `public/data/vocab/vocab-n3.js`
Currently 285 entries. Continue from `vg-n3-00286`. Target: 300+ minimum, 3,750 ideal.

#### TASK 16 — N2/N1 grammar & vocab enrichment [Next content batch]
N2 grammar (90 entries) and N1 grammar (60 entries) cover common patterns but not complete.
N2 vocab (130 entries) and N1 vocab (60 entries) are partial — expand when bandwidth allows.

#### TASK 17 — Minna no Nihongo lenses [BLOCKED]
`book-minna-1.js` + `book-minna-2.js` empty. Needs PDF.

#### Infrastructure (human tasks — Nugget provides)
- **Cloudflare Worker secrets:** `wrangler secret put GROQ_API_KEY` + `GEMINI_API_KEY` (see `SETUP.md`).
- **Google OAuth credentials:** Google Cloud Console → new OAuth client → paste into Supabase.

#### Lower priority
- JMdict pipeline: `tools/jmdict-pipeline.py` ready, needs Indonesian translation + ID remapping
- Irodori A1 book lens: `grammar_ids` arrays still empty (TASK 4/6/7 from old audit — still pending)
- UI: track selection page, book browsing, Methodology/About page + Daftar Pustaka

---

## IMPORTANT CONVENTIONS

- **IDs:** Vocab = `vg-{level}-{5digit}` (e.g., `vg-n5-00001`). Grammar = `gn{level}-{5digit}` (e.g., `gn5-00001`).
- **No bundler.** All JS loaded via `<script>` tags in index.html. Load order matters.
- **Hybrid (not offline-first).** Supabase is primary. IndexedDB + SW = fallback. AI requires network.
- **Indonesian is primary UI language.** Code comments mix Indonesian and English.
- **`version.js`** is the single source of truth for version. Must match `nihongo-{version}` in `sw.js`.
- **`_schema.md`** in `public/data/` is the canonical data architecture doc.
- **`tools/` is gitignored.** Scripts there are for local use only.
- **`corpus/v17-pass15`** branch is reserved for research reference — do NOT touch.
- **Content generation** belongs in claude.ai chat, NOT Claude Code (Claude Code times out on large generation tasks).

## ATTRIBUTION REQUIREMENTS

If JMdict data is used, the app MUST display (e.g., on an About/Attribution page):
> This application uses the JMdict dictionary file, the property of the
> Electronic Dictionary Research and Development Group (EDRDG), and is
> used in conformance with the EDRDG's licence provisions.
> https://www.edrdg.org/edrdg/licence.html

---

*Last edited: Crunchy 🧂 (post content-population batch A) — 18 April 2026*
