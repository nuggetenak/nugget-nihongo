# CLAUDE.md — Handoff Note for Claude Code
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 2 April 2026 · v15.3.2  
**Owner:** Nugget (non-programmer, Indonesian speaker)

---

## WHAT IS THIS PROJECT

A vanilla JS offline-first PWA for learning Japanese, targeting Indonesian speakers. No framework (React/Vue/etc.) — pure HTML/CSS/JS with script tags. Uses localStorage for state, service worker for offline caching.

**Tech stack:** HTML + vanilla JS + CSS · Service Worker · FSRS (spaced repetition) · Supabase (planned backend)

**Repo structure:**
```
public/              ← deploy root (everything served from here)
  index.html         ← single-page app, 1140 lines, 53 script tags
  styles/app.css     ← all styles
  sw.js              ← service worker
  js/                ← 34 JS modules (no bundler, loaded via script tags)
  data/              ← content database as JS files
    vocab/           ← vocab-n1.js through vocab-n5.js
    grammar/         ← grammar-n1.js through grammar-n5.js + grammar-index.js
    books/           ← book index files + Soumatome grammar lenses
    tracks/          ← study track definitions (runtime-populated)
  icons/             ← PWA icons
  manifest.webmanifest
supabase/            ← schema.sql (run in Supabase SQL Editor)
tools/               ← build/migration scripts (gitignored)
tests/               ← basic test runner
```

## CURRENT STATE (v15.3.2)

### What works
- Grammar DB: N5 (80), N4 (90), N3 (103) — all with 5-digit IDs, examples, descriptions
- Vocab DB: N5 (711), N4 (692), N3 (70) — 5-digit IDs, bilingual examples
- Soumatome grammar lenses: N3 (132 entries), N4 (102) — fully populated with content
- Study tracks: JLPT N5-N1 auto-populate at runtime, Soumatome tracks auto-populate from lens, Freeway track hand-curated
- Engines: conjugation (776 lines), FSRS, quiz engine v2, gamification, backup/restore
- Old book index files (Irodori A1/A2, Minna 1/2) still work with old ID format
- PWA: installable, offline-capable via service worker

### What needs doing (priority order)

#### 1. JMdict Pipeline (HIGH — unlocks massive content)
Script ready at `tools/jmdict-pipeline.py`. Run it:
```bash
python3 tools/jmdict-pipeline.py
```
This downloads JMdict XML (~50MB), parses it, and outputs to `tools/jmdict-output/`:
- `jmdict-n5.js` through `jmdict-n1.js` (JLPT-tagged entries)
- `jmdict-common.js` (common but non-JLPT words)
- `jmdict-stats.json`

**After running the pipeline:**
1. Output files have `meaning_id: ''` (empty) — needs Indonesian translation
2. IDs are temporary `jm-*` format — need remapping to `vg-*` before merging
3. Must reconcile with existing vocab-n5.js (711 entries) and vocab-n4.js (692 entries)
4. Reconciliation strategy: match by `word` + `reading`, keep existing entries (they have better data), add new ones with next available ID

#### 2. Supabase Setup (HIGH — unlocks user features)
Schema is at `supabase/schema.sql`. Client JS at `public/js/supabase-client.js`.

**Steps:**
1. In Supabase Dashboard: SQL Editor → paste `supabase/schema.sql` → Run
2. In Supabase Dashboard: Settings → API → copy URL and anon key
3. Edit `public/js/supabase-client.js`: replace `YOUR_PROJECT` and `YOUR_ANON_KEY_HERE`
4. In `public/index.html`, add before closing `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="./js/supabase-client.js"></script>
   ```
5. Enable Google OAuth in Supabase Dashboard: Authentication → Providers → Google
6. Wire up auth UI (login/signup form in index.html)

**Tables:** profiles, srs_cards, course_progress, achievements, review_history, error_reports, user_settings. All have RLS. Profile + settings auto-created on signup via trigger.

#### 3. Indonesian Translation Pipeline
~1,400 N3 vocab entries need population, plus all JMdict entries need `meaning_id`.
Strategy: batch translate using Claude API or manual sessions, cross-validate against English meanings.

#### 4. Vocab ID Migration (book files)
Old book files (`book-irodori-a1.js` etc.) use old IDs (`v-n5-s0001`, `v-n5-0092`).
New vocab DB uses `vg-n5-00001`. Need a mapping script that matches by word/reading.
Low priority — old files still work.

#### 5. UI Work
- Track selection page (show all tracks, let user pick)
- Book browsing (Soumatome weekly view using lens data)
- Auth UI (login/signup forms)
- Methodology/About page (research citations exist in chat history)
- Daftar Pustaka (bibliography/attribution page — legally required if using JMdict)

#### 6. Deploy
Currently GitHub Pages via `.github/workflows/deploy.yml`. Just deploys `public/`.
When Supabase is wired up, need to set env vars for Supabase URL/key.

---

## IMPORTANT CONVENTIONS

- **IDs:** Vocab = `vg-{level}-{5digit}` (e.g., `vg-n5-00001`). Grammar = `gn{level}-{5digit}` (e.g., `gn5-00001`).
- **No bundler.** All JS loaded via `<script>` tags in index.html. Load order matters.
- **Offline-first.** Everything must work without network. Supabase sync is optional enhancement.
- **Indonesian is primary UI language.** Code comments mix Indonesian and English.
- **`version.js`** is the single source of truth for version. `sw.js` reads `window.APP_VERSION`.
- **`_schema.md`** in `public/data/` is the canonical data architecture doc.
- **`tools/` is gitignored.** Scripts there are for local use only.

## ATTRIBUTION REQUIREMENTS

If JMdict data is used, the app MUST display (e.g., on an About/Attribution page):
> This application uses the JMdict dictionary file, the property of the
> Electronic Dictionary Research and Development Group (EDRDG), and is
> used in conformance with the EDRDG's licence provisions.
> https://www.edrdg.org/edrdg/licence.html

---

*Last edited: A1 Crispy 🥐 — 2 April 2026*
