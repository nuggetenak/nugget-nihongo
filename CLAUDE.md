# CLAUDE.md — Handoff Note for Claude Code
**Project:** Nugget Nihongo — Japanese language learning PWA  
**Last updated:** 7 April 2026 · v15.5.0  
**Owner:** Nugget (non-programmer, Indonesian speaker)  
**Active branch:** `claude/architecture-audit-cleanup-WKJ2n` → merge target: `main`

---

## WHAT IS THIS PROJECT

A vanilla JS offline-first PWA for learning Japanese, targeting Indonesian speakers. No framework (React/Vue/etc.) — pure HTML/CSS/JS with script tags. Uses localStorage for state, service worker for offline caching. Multi-model AI tutor backed by Cloudflare Worker.

**Tech stack:** HTML + vanilla JS + CSS · Service Worker · FSRS (spaced repetition) · Supabase (auth + cloud sync) · Cloudflare Workers (AI proxy) · Gemini/Groq APIs (AI tutor)

**Repo structure:**
```
public/              ← deploy root (everything served from here)
  index.html         ← single-page app, 4 tabs: Materi / Latihan / AI Sensei / Statistik
  styles/app.css     ← all styles
  sw.js              ← service worker
  js/                ← 36 JS modules (no bundler, loaded via script tags)
    core/            ← version.js, state.js, router.js, theme.js, install.js, grammar-query.js
    ai-tutor.js      ← AI Sensei chat UI (Gemini/Groq via Cloudflare Worker)
    analytics.js     ← Statistics dashboard (heatmap, SRS health, JLPT rings)
    supabase-client.js ← Auth + cloud sync (enable after adding credentials)
  data/              ← content database as JS files
    vocab/           ← vocab-n1.js through vocab-n5.js (all active)
    grammar/         ← grammar-n1.js through grammar-n5.js + grammar-index.js (all active)
    books/           ← book index files + Soumatome grammar lenses
    tracks/          ← study track definitions (runtime-populated)
  icons/             ← PWA icons
  manifest.webmanifest
workers/             ← Cloudflare Worker (AI proxy)
  ai-proxy.js        ← Multi-model AI router (Gemini primary, Groq fallback)
  wrangler.toml      ← Worker deploy config
supabase/            ← schema.sql (run in Supabase SQL Editor)
tools/               ← build/migration scripts (gitignored)
  generate-corpus.js ← Gemini-powered corpus generator for N2/N1 content
  jmdict-pipeline.py ← JMdict XML parser (vocab from EDRDG)
tests/               ← basic test runner
SETUP.md             ← Step-by-step deploy guide (credentials, Worker, Supabase)
```

---

## CURRENT STATE (v15.5.0)

### What works ✓
- **Grammar DB:** N5 (249), N4 (278), N3 (371) — all with 5-digit IDs, examples, descriptions
- **Grammar DB:** N2 (30 seeds), N1 (20 seeds) — functional stubs, expandable via generate-corpus.js
- **Vocab DB:** N5 (711), N4 (692), N3 (70), N2 (50 seeds), N1 (20 seeds) — 5-digit IDs
- **Soumatome grammar lenses:** N3 (132 entries), N4 (102) — 8 orphaned entries flagged with `orphan: true`
- **Study tracks:** JLPT N5-N1 auto-populate at runtime, Soumatome tracks, Freeway hand-curated
- **Engines:** conjugation, FSRS (ts-fsrs), quiz engine v2, gamification, backup/restore
- **Quiz modes:** 11 modes across 5 categories (Flashcard, Latihan, Challenge, Vocab, Mixed)
- **AI Sensei tab:** multi-model AI tutor chat UI — Cloudflare Worker → Gemini/Groq
- **Statistik tab:** progress dashboard — heatmap, JLPT rings, SRS health, weak points
- **Auth UI:** login/signup modal wired to Supabase (enable via CDN uncomment + credentials)
- **PWA:** installable, offline-capable via service worker (v15.5.0 cache)
- **Old book index files** (Irodori A1/A2, Minna 1/2): still work, legacy ID format (see §4 below)

### What needs doing (priority order)

#### 1. Deploy the Cloudflare Worker (HIGH — enables AI Sensei)
See `SETUP.md` for step-by-step. Summary:
1. Sign up at cloudflare.com → get free account
2. `cd workers && npm install -g wrangler && npx wrangler login`
3. `npx wrangler kv:namespace create "RATE_LIMITS"` → paste ID into wrangler.toml
4. `npx wrangler secret put GEMINI_API_KEY` (from aistudio.google.com — free)
5. `npx wrangler secret put GROQ_API_KEY` (from console.groq.com — free)
6. `npx wrangler deploy`

#### 2. Supabase Setup (HIGH — unlocks cloud sync + auth)
1. Create project at supabase.com (free tier: 50K MAU, 500MB)
2. SQL Editor → paste `supabase/schema.sql` → Run
3. Settings → API → copy URL and anon key
4. Edit `public/js/supabase-client.js` lines 14-15: replace placeholders
5. In `public/index.html`, uncomment the Supabase CDN + client block (search "TODO: Supabase")
6. Enable Google OAuth: Authentication → Providers → Google

#### 3. Expand N3 Vocab (HIGH — only 70/~3,750 entries)
```bash
GEMINI_API_KEY=xxx node tools/generate-corpus.js --level=n3 --type=vocab --start=71 --count=200
# Paste output into public/data/vocab/vocab-n3.js
# Run in batches of 200 to review quality
```

#### 4. Expand N4 Vocab (MEDIUM — 692/~1,500 entries)
```bash
GEMINI_API_KEY=xxx node tools/generate-corpus.js --level=n4 --type=vocab --start=693 --count=200
```

#### 5. Expand N2/N1 Grammar & Vocab (MEDIUM)
```bash
# N2 grammar (30 seeds → target 200):
GEMINI_API_KEY=xxx node tools/generate-corpus.js --level=n2 --type=grammar --start=31 --count=50

# N2 vocab (50 seeds → target 6000):
GEMINI_API_KEY=xxx node tools/generate-corpus.js --level=n2 --type=vocab --start=51 --count=200
```

#### 6. CSS for New Components (MEDIUM)
`public/styles/app.css` needs styles for:
- `.ai-tutor-wrap`, `.ai-chat-messages`, `.ai-msg`, `.ai-input-area` (AI Sensei tab)
- `.stats-wrap`, `.jlpt-ring-card`, `.srs-health-grid`, `.heatmap-canvas` (Statistik tab)
- `.auth-modal`, `.auth-form`, `.auth-google-btn` (auth modal)
- `.sync-indicator`, `.auth-header-btn` (header additions)

#### 7. Vocab ID Migration (book files) — LOW
Old book files (`book-irodori-a1.js` etc.) use old IDs (`v-n5-s0001`).
New vocab DB uses `vg-n5-00001`. Files have legacy warning headers.
`tools/generate-corpus.js` approach won't help here — needs mapping script.

#### 8. JMdict Pipeline (for future vocab expansion)
```bash
python3 tools/jmdict-pipeline.py
# Then use generate-corpus.js to add meaning_id to output
```

---

## IMPORTANT CONVENTIONS

- **IDs:** Vocab = `vg-{level}-{5digit}` (e.g., `vg-n5-00001`). Grammar = `gn{level[1]}-{5digit}` (e.g., `gn5-00001`).
- **No bundler.** All JS loaded via `<script>` tags in index.html. Load order matters.
- **Offline-first.** Everything must work without network. Supabase sync is optional.
- **Indonesian is primary UI language.** Code comments mix Indonesian and English.
- **`version.js`** is the single source of truth for version. `sw.js` reads `window.APP_VERSION`.
- **`_schema.md`** in `public/data/` is the canonical data architecture doc.
- **`tools/` is gitignored.** Scripts there are for local use only.
- **AI Worker URL** is set in `public/js/ai-tutor.js` top constant `AI_WORKER_URL`. Update after deploying Worker.

## AI ARCHITECTURE

```
Browser PWA (GitHub Pages)
  └─ AI Sensei tab → ai-tutor.js
       └─ POST /chat → Cloudflare Worker (workers/ai-proxy.js)
            ├─ Primary:  Gemini 2.0 Flash (GEMINI_API_KEY secret)
            └─ Fallback: Groq Gemma (GROQ_API_KEY secret)
```

Rate limit: 15 requests/user/day (tracked in Cloudflare KV).
Daily combined capacity: ~60K requests (Gemini 21.6K + Groq 40K).

## ATTRIBUTION REQUIREMENTS

If JMdict data is used, the app MUST display:
> This application uses the JMdict dictionary file, the property of the
> Electronic Dictionary Research and Development Group (EDRDG), and is
> used in conformance with the EDRDG's licence provisions.
> https://www.edrdg.org/edrdg/licence.html

---

*Last edited: v15.5.0 architecture audit — 7 April 2026*
