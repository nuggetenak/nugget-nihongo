# CLAUDE.md — Handoff Note for Claude Agents
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 19 April 2026 · v15.13.0  
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

## CURRENT STATE (v15.13.0)

### What works
- **Grammar DB:** N5 (94), N4 (92), N3 (46+), N2 (250), N1 (140) entries
- **Vocab DB:** N5 (725), N4 (692), N3 (615), N2 (260), N1 (130) entries
- **Grammar lenses:** Soumatome N3 (132), N4 (102); Irodori A1 (61), A2-1 (65), A2-2 (62) — all with grammar_ids; Minna 1 & 2 (25 lessons each)
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

#### ✅ Already fixed (v15.12.x–v15.13.x)
- Kebun Mastery garden — live v15.12.4
- Quiz empty states (7 modes) — fixed v15.12.5
- Supabase 3 critical bugs — fixed v15.12.6
- Settings bindings (clearData, resetConvo) — fixed v15.12.7
- Minna no Nihongo 1 & 2 lens — live v15.12.8
- Onboarding level pre-selection — fixed v15.12.7
- vocabDB now includes N2 + N1 — v15.13.2

#### CONTENT — Ongoing population (agent batches)
- vocab N3: 615/3,750 entries
- vocab N2: 260/6,000 entries
- vocab N1: 130/10,000 entries
- grammar N3: 46/180 entries
- grammar N2: 250 entries ✅ (target met, can expand)
- grammar N1: 140/250 entries

#### INFRASTRUCTURE (manual — Nugget must do)
- **Supabase Auth URL:** Dashboard → Auth → URL Config → Site URL = `https://nugget-nihongo.pages.dev`
- **Cloudflare Worker:** `cd workers && npx wrangler secret put GROQ_API_KEY` + deploy. See `SETUP.md §2`.
- **Google OAuth:** Supabase Dashboard → Auth → Providers → Google. See `SETUP.md §3`.
- **GitHub PAT:** Rotate `ghp_tnQKox...` — appeared in chat multiple times.

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
  sw.js                    ← Service Worker (nihongo-v15.13.0)
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
    supabase-client.js     ← Auth + SRS sync (3 critical bugs fixed v15.12.6)
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
# Structural validator — run before every commit (must be 0 FAIL)
node tests/run.js

# Content quality checker — run before merging new content
node tests/quality.js                  # full report
node tests/quality.js --new-only       # only v15 entries (CI uses this)
node tests/quality.js --errors-only    # hide warnings
node tests/quality.js --level n3       # single JLPT level
node tests/quality.js --fix            # auto-correct scriptable issues in-place
node tests/quality.js --json           # machine-readable output
# Target: run.js 0 FAIL | quality.js 0 CRIT/ERROR (--new-only)
```

Both run automatically on every push to `develop` via GitHub Actions (`.github/workflows/validate.yml`).

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

*Last edited: Crunchy 🧂 (QA + dev session) — 19 April 2026 · v15.13.0*
