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

#### 1. Supabase Credentials (HIGH — unlocks auth + AI)
Edit `public/js/supabase-client.js`: replace `YOUR_PROJECT` and `YOUR_ANON_KEY_HERE` with real values.
Project ref: `oxeuwkpgrtojjzhcboqz` (see `.mcp.json`).

#### 2. Cloudflare Worker Secrets (HIGH — unlocks AI Sensei)
```bash
wrangler secret put GROQ_API_KEY --config workers/wrangler.toml
wrangler secret put GEMINI_API_KEY --config workers/wrangler.toml
```
See `SETUP.md` for full deployment instructions.

#### 3. JMdict Pipeline (MEDIUM — unlocks massive vocab content)
Script ready at `tools/jmdict-pipeline.py`. Outputs to `tools/jmdict-output/`.
After running: entries need Indonesian translation + ID remapping from `jm-*` to `vg-*`.
Reconcile with existing N5 (711) and N4 (692) entries by word+reading match.

#### 4. Indonesian Translation Pipeline
N2/N1 vocab seed data: already complete (filled in prior session). N3 vocab (70 entries): already has bilingual examples. ✅ DONE

#### 5. Irodori Grammar Lenses (HIGH — unlocks book track for SSW-relevant textbook)

**Status as of 2026-04-11:**
- `public/data/books/irodori/grammar-lens-ir-a1.js` ✅ COMPLETE — 61 entries, L3-L18, sourced from official PDF
- `public/data/books/irodori/grammar-lens-ir-a2-1.js` ⚠️ STUB — 0 entries, lesson map only
- `public/data/books/irodori/grammar-lens-ir-a2-2.js` ⚠️ STUB — 0 entries, lesson map only

**§IRODORI — Instructions for next Claude Code agent:**

1. **Source:** Official Irodori Grammar Notes PDF (CC BY 4.0, free)
   - URL: `https://www.irodori.jpf.go.jp/assets/data/Grammar_all.pdf`
   - Fetch with `web_fetch` — text extraction works fine
   - Each grammar point in PDF is marked ➊➋➌ per lesson

2. **Fill Elementary 1 (`grammar-lens-ir-a2-1.js`):**
   - 18 lessons, target ~80-100 entries total
   - Grammar IDs: `ir-a2-1-001` through `ir-a2-1-NNN`
   - Window var: `window.grammarLensIrodoriA21`
   - Link to `global_grammar_id` from `grammar-n5.js` + `grammar-n4.js`
   - Key grammar expected: て-form rules, ている (progressive), たことがある, potential verbs, なければならない, てもいいですか, てあげる/くれる/もらう, 〜と思っています, ほうがいい, ために

3. **Fill Elementary 2 (`grammar-lens-ir-a2-2.js`):**
   - 18 lessons, target ~80-100 entries total
   - Grammar IDs: `ir-a2-2-001` through `ir-a2-2-NNN`
   - Window var: `window.grammarLensIrodoriA22`
   - Link to `global_grammar_id` from `grammar-n4.js` + `grammar-n3.js`
   - Key grammar expected: passive (られる), causative (させる), ば conditional, ～のに, ～ようにする, ～ために, keigo intro, relative clauses

4. **Schema:** Follow exact same structure as `grammar-lens-ir-a1.js`:
   ```js
   {
     id: 'ir-a2-1-001', global_grammar_id: 'gn5-00NNN', // or null
     lesson: 1, seq: 1,
     pattern: '〜ている',
     raw: 'V-ている',
     desc: '...(Bahasa Indonesia)...',
     examples: [{ jp: '...', id: '...' }],
   }
   ```

5. **After filling:** Update `book-irodori-a2-1.js` and `book-irodori-a2-2.js`
   `grammar_ids` arrays to reference the new lens IDs (`ir-a2-1-001` etc.)

6. **Verify:** Run `node tests/run.js` — should still be 10396 PASS, 0 FAIL

7. **Push:** `git add -A && git commit -m "feat: fill Irodori A2-1 + A2-2 grammar lenses" && git push`

**Also pending from prior session:**
- Wire `grammar-lens-ir-a1.js` into `book-irodori-a1.js` `grammar_ids` arrays (currently `[]`)
- Verify all `global_grammar_id` values in A1 lens against actual `grammar-n5.js` IDs
  (Currently uses placeholder IDs `gn5-00001` etc. — need exact match check)

#### 6. UI Work (FE Agent domain — see corpus/v17-pass15 branch)
- Track selection page
- Book browsing (Soumatome weekly view)
- Methodology/About page + Daftar Pustaka (legally required if using JMdict)

#### 6. Vocab ID Migration (low priority — old files still work)
`book-irodori-a1.js` etc. use old IDs (`v-n5-s0001`). New DB uses `vg-n5-00001`.

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

*Last edited: Claude (web session — Irodori A1 grammar lens complete, A2-1/A2-2 stubs) — 11 April 2026*
*Next session: Fill grammar-lens-ir-a2-1.js + grammar-lens-ir-a2-2.js per §IRODORI instructions above*
