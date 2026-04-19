# CLAUDE.md — Handoff Note for Claude Agents
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 19 April 2026 · v15.12.3  
**Owner:** Nugget (non-programmer, Indonesian speaker, product owner + content expert)

---

## WHAT IS THIS PROJECT

A vanilla JS **hybrid** PWA for learning Japanese, targeting Indonesian speakers. No framework (React/Vue/etc.) — pure HTML/CSS/JS with script tags. Primary storage is localStorage + IndexedDB; Supabase is the cloud sync layer. Service worker provides offline capability for all study features.

**Live:** https://nugget-nihongo.pages.dev  
**Repo:** https://github.com/nuggetenak/nugget-nihongo  
**Branch strategy:** `develop` → `main` (Cloudflare Pages auto-deploys from main, ~60s)

**Tech stack:**
- HTML + Vanilla JS (ES2020+) + CSS (single file, 5046 lines)
- Service Worker (cache-first static, network-first API)
- FSRS via ts-fsrs CDN (spaced repetition)
- Supabase (auth, cloud SRS sync, progress)
- Cloudflare Pages (hosting) + Cloudflare Workers (AI proxy)
- Fonts: DM Sans (Latin) + BIZ UDGothic (Japanese)

---

## CURRENT STATE (v15.12.3)

### What works
- **Grammar DB:** N5 (94), N4 (92), N3 (103), N2 (80 est), N1 (60 est) entries
- **Vocab DB:** N5 (725), N4 (692), N3 (405), N2 (140), N1 (70) entries
- **Grammar lenses:** Soumatome N3 (132), N4 (102); Irodori A1 (61), A2-1 (65), A2-2 (62)
- **Browse tab:** Peel cards with accordion reveal, hold=peek, tap=reveal; ⋯ detail modal; ☆ bookmark; filter/search/super-cats
- **Detail modal:** Bottom-sheet modal with full grammar info, examples, breakdown toggle (CSS §31)
- **Hub navigation:** JLPT door, Buku (book) door, 語 Jelajah Bebas door; book accordion; chapter pills when in book view
- **FSRS engine:** Full SRS with ts-fsrs, migration from SM-2 complete. Data shape: `srsData[id].card.{due(ISO), reps, scheduled_days, stability, lapses, state}`
- **9 quiz modes:** Flip, Fill-in, Rearrange, Konjugasi, Terjemahan, Cari Kesalahan, Pilihan Ganda, Vocab (Flash/MC/Fill), Mixed
- **Gamification:** XP, streaks, achievements, heatmap — all wired
- **Analytics tab:** JLPT rings, SRS health bars, 52-week heatmap, Perlu Perhatian (→ launches quiz), quiz accuracy chart
- **Sensei (AI Tutor):** 3 modes (Jelaskan/Tantang/Ngobrol), quota bar, conversation history, DNA context
- **Backup/restore:** Export JSON, import JSON, all user keys covered
- **PWA:** Installable, full offline via SW cache
- **URL hash routing:** Refresh stays on current tab (#browse, #quiz, #stats, etc.)
- **Kebun Mastery:** DRAFT at `public/js/kebun-mastery.js` — not yet wired

### What still needs doing (priority order)

#### IMMEDIATE — Wire Kebun Mastery
Draft complete at `public/js/kebun-mastery.js`. Wire-up checklist:
```
[ ] Add <script src="./js/kebun-mastery.js"></script> to index.html (after detail.js)
[ ] Add './js/kebun-mastery.js' to SW ASSETS in sw.js
[ ] Paste docs/kebun-mastery/kebun-snippet.html into #statsPage (before #weakPointsSection)
[ ] Append docs/kebun-mastery/kebun-styles.css to app.css
[ ] Call window.initKebunMastery() from _analyticsOnTabShow in analytics.js
```

#### FRONTEND — Quiz empty states
7 quiz modes show `<div class="fill-coming-soon">` (blank screen) when no questions found.
Files: `fillin.js` (×2), `conjugation.js`, `translation.js`, `errorfind.js`, `multichoice.js`, `quiz-vocab.js`
Fix: proper empty state UI with helpful message + action button.

#### BACKEND — Supabase sync broken (3 critical bugs)
All marked with `// ⚠️ BACKEND BUG` in `supabase-client.js`:

1. **`sb.auth.getUser()` called synchronously** in 6 places — returns Promise, not resolved.
   Result: `user_id` always `undefined` → all Supabase writes silently fail RLS.
   Fix: make those functions `async`, add `await sb.auth.getUser()`.

2. **`bulkSync()` receives object, calls `.map()`** → TypeError.
   `nn_fsrs_cards` is `{id: entry}`, not array.
   Fix: `Object.entries(cards).map(([id, entry]) => ({ user_id, item_id: id, ...entry.card }))`.

3. **`sbClient.supabaseKey` doesn't exist in Supabase v2** — always `''`.
   Fix: export constants directly from the IIFE.

#### INFRASTRUCTURE (human tasks — Nugget must do)
- **Cloudflare Worker:** `cd workers && npx wrangler secret put GROQ_API_KEY` + `GEMINI_API_KEY` → `npx wrangler deploy`. See `SETUP.md §2`.
- **Google OAuth:** Supabase Dashboard → Authentication → Providers → Google. See `SETUP.md §3`.
- **Minna no Nihongo lenses:** `book-minna-1.js` + `book-minna-2.js` empty. Blocked — needs PDF.

---

## IMPORTANT CONVENTIONS

### IDs (LOCKED — do not change format)
```
Grammar: gn{level}-{5digit}     e.g. gn5-00001
Vocab:   vg-{level}-{5digit}    e.g. vg-n5-00001
```

### FSRS data structure (CRITICAL — wrong access = silent bugs)
```js
// srsData[id] shape:
{
  card: {
    due: '2026-04-25T00:00:00.000Z',  // ISO string — NOT integer
    stability: 12.5,
    difficulty: 4.2,
    elapsed_days: 3,
    scheduled_days: 12,               // NOT .interval
    reps: 5,
    lapses: 1,
    state: 2,   // 0=New 1=Learning 2=Review 3=Relearning
    last_review: '2026-04-13T00:00:00.000Z',
  },
  history: [{ date: '...', rating: 3 }, ...],
  source: 'grammar' | 'vocab',
}
```

### Mobile event handling (CRITICAL — wrong approach = page freeze)
```js
// ❌ NEVER: inline onclick= in generated HTML, touchstart/touchend listeners
// ✅ ALWAYS: addEventListener('click') for buttons
//            pointerdown/pointerup for hold detection
//            touch-action: manipulation in CSS for all interactive elements
```

### Version bump (REQUIRED on every user-facing commit)
```
public/js/core/version.js  →  window.APP_VERSION = 'vX.X.X'
public/sw.js               →  const CACHE = 'nihongo-vX.X.X'
```

### SW ASSETS
Every new JS file → add to `ASSETS` array in `public/sw.js`.

### Grammar `cat` values
34 canonical English values (Taxonomy v2 B.1). Listed in `public/data/_schema.md §3.2`.  
Old Bahasa Indonesia labels (`sebab-akibat`, `pasif`, etc.) are **retired**.

### Content generation
Generate grammar/vocab entries in **claude.ai chat**, NOT in Claude Code (timeout).

### No bundler
All JS loaded via `<script>` in `index.html`. Load order matters. 63 script tags.

---

## REPO STRUCTURE

```
public/                    ← Cloudflare Pages deploy root
  index.html               ← SPA, 5 tabs, 1700+ lines
  sw.js                    ← Service Worker (nihongo-v15.12.3)
  styles/app.css           ← All styles (5046 lines, §1–§31)
  js/
    core/                  ← version.js, state.js, router.js, theme.js, install.js
    pages/                 ← materi-hub.js, settings.js, onboarding.js, about.js
    fsrs-engine.js         ← FSRS SRS engine (ts-fsrs CDN)
    gamification.js        ← XP, streak, achievements, heatmap
    browse.js              ← Peel cards, filter, super-cats, accordion
    analytics.js           ← Progress tab rendering
    detail.js              ← Grammar detail bottom-sheet modal
    vocab-detail.js        ← Vocab detail modal
    quiz.js + quiz-*.js    ← 9 quiz modes
    ai-tutor.js            ← Sensei Nugget chat
    supabase-client.js     ← Auth + SRS sync (has ⚠️ BACKEND BUG markers)
    kebun-mastery.js       ← DRAFT — not wired yet
    app.js                 ← DOMContentLoaded orchestrator — ALWAYS LAST
  data/
    grammar/grammar-n*.js  ← Grammar DB (5-digit IDs, 34 canonical cat values)
    vocab/vocab-n*.js      ← Vocab DB
    books/                 ← Book lens files (Irodori, Soumatome, Minna)
    fallback/              ← Offline AI drills JSON
workers/
  ai-proxy.js              ← Cloudflare Worker (Groq + Gemini + OpenRouter fallback)
supabase/
  schema.sql               ← 7 tables + RLS + triggers (idempotent, run once)
docs/
  AGENT_HANDOFF_NUGGET_NIHONGO.md  ← Full handoff for new agents
  TECHNICAL_LEAD_CHARTER.md        ← Senior dev operating principles
  project/VISION.md                ← Product vision (read when uncertain about priorities)
  project/ROADMAP.md               ← 6-phase roadmap
  project/_MAP.md                  ← Task registry
  kebun-mastery/                   ← Kebun Mastery wire-up files
  supabase/references/             ← 30+ Postgres best practices docs
CLAUDE.md                ← THIS FILE — always start here
ARCHITECTURE.md          ← Full architecture overview
SETUP.md                 ← Deployment guide (Cloudflare Worker + Supabase)
CHANGELOG.md             ← Version history
MASTER-AUDIT.md          ← Historical task list (pre-v15.9)
public/data/_schema.md   ← Canonical data architecture v3 — AUTHORITATIVE
```

---

## WORKFLOW

```bash
# Development
git checkout develop
# make changes
node tests/run.js        # must be 0 FAIL before push
git add -A && git commit -m "feat/fix: description vX.X.X"
git push origin develop

# Deploy to production
git checkout main && git merge develop --no-ff -m "release: vX.X.X"
git push origin main     # Cloudflare Pages deploys automatically (~60s)
git checkout develop

# Verify live
curl -s https://nugget-nihongo.pages.dev/js/core/version.js
```

**NEVER:**
- Push directly to main without tests
- Merge `corpus/v17-pass15` into any branch
- Generate content in Claude Code (timeout — use claude.ai chat)

---

## TESTING

```bash
node tests/run.js
# Target: 10,550+ PASS, 0 FAIL
```
Covers: data schema, ID format, cat values, version consistency, persona drift, conjugation.

---

## KEY localStorage KEYS

```
nn_fsrs_cards        — srsData (FSRS card state)
nn_streak            — { current, longest, freezes, comebacks, lastDate }
nn_xp                — { xp: number, history: [] }
nn_achievements      — array of earned badge IDs
nn_heatmap           — { 'YYYY-MM-DD': { reviews, xp } }
nn_quiz_stats        — { flip: { correct, total }, fill: {...}, ... }
bunpou_progress      — { [cardId]: 'know'|'unsure'|'forgot' }
bunpou-theme         — 'dark' | 'light'  (NOT nn_theme — that was a bug, now fixed)
nn_accent            — 'amber' | 'sakura' | 'matcha' | 'indigo'
nn_last_activity     — { type: 'book'|'jlpt', ... } for ContinueCard
nn_ai_quota          — { date, used }  (daily Sensei limit)
```

---

## ATTRIBUTION (LEGAL REQUIREMENT)

If JMdict data is used, the About/Attribution page MUST display:
> This application uses the JMdict dictionary file, the property of the
> Electronic Dictionary Research and Development Group (EDRDG), and is
> used in conformance with the EDRDG's licence provisions.
> https://www.edrdg.org/edrdg/licence.html

---

*Last edited: Crunchy 🧂 (QA + dev session) — 19 April 2026 · v15.12.3*
