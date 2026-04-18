# Nugget Nihongo — Architecture (v15.6.0)

## Overview

Hybrid vanilla JavaScript PWA for Japanese language learning (JLPT N5–N1), targeting Indonesian speakers.
- **Not offline-first** — Supabase is the primary data store; IndexedDB + SW are the offline fallback
- **No build step, no framework, no bundler** — pure HTML/CSS/JS loaded via `<script>` tags
- **AI-enabled** — Cloudflare Worker proxies Groq (fast) + Gemini (complex) with rate limiting

## Deployment Architecture

```
GitHub repo (nuggetenak/nugget-nihongo)
│
├── Cloudflare Pages (wrangler.jsonc)
│   └── serves public/ as static assets
│   └── npm run deploy  (wrangler pages deploy public)
│
├── Cloudflare Worker (workers/wrangler.toml)
│   ├── workers/ai-proxy.js — tiered AI routing
│   ├── Groq API (fast: llama-3.1-8b-instant)
│   ├── Gemini API (complex: gemini-1.5-flash)
│   └── KV namespace RATE_LIMITS — per-user rate limiting
│
├── Supabase (project: oxeuwkpgrtojjzhcboqz)
│   ├── supabase/schema.sql — 7 tables + RLS + triggers
│   ├── supabase/functions/ai-router/ — Edge Function (backup AI route)
│   └── Supabase Auth — Google OAuth
│
└── GitHub Actions (.github/workflows/)
    └── deploy.yml — Cloudflare Pages deployment
```

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Vanilla JS (ES2020+) — no React, Vue, or build tools |
| Styling | Single CSS file (3144 lines, §1–§20) |
| Data | JS files exporting to `window.*` globals |
| Spaced Repetition | ts-fsrs CDN + custom Indonesian-learner calibration |
| Offline | Service Worker (cache-first static / network-first API) + IndexedDB |
| Backend | Supabase — auth, SRS sync, progress, `learning_dna` JSONB |
| AI Proxy | Cloudflare Worker — tiered routing with KV rate limits |
| Fonts | DM Sans (Latin) + BIZ UDGothic (JP, subsetted) |
| Testing | Custom Node.js test runner (no framework) |
| CI/CD | GitHub Actions → Cloudflare Pages |

## Directory Structure

```
nugget-nihongo/
├── public/                          # DEPLOY ROOT — Cloudflare Pages serves this
│   ├── index.html                   # SPA entry point, 4 tabs (Browse/Quiz/Sensei/Stats)
│   ├── sw.js                        # Service worker (nihongo-v15.6.0)
│   ├── manifest.webmanifest         # PWA manifest
│   ├── icons/                       # PWA icons (192, 512)
│   ├── fonts/                       # Subsetted woff2 (DM Sans + BIZ UDGothic)
│   ├── styles/
│   │   └── app.css                  # All styles (3144 lines, §1–§20)
│   ├── js/
│   │   ├── core/                    # version.js, state.js, router.js, theme.js, install.js
│   │   ├── lang/                    # lang-core.js (sentence generator)
│   │   ├── local-state.js           # IndexedDB wrapper + Supabase sync queue
│   │   ├── fsrs-math.js             # FSRS math utilities + Indonesian calibration
│   │   ├── fsrs-engine.js           # FSRS scheduler (ts-fsrs) + IndexedDB sync hook
│   │   ├── gamification.js          # Streak, XP, achievements (window.streakState)
│   │   ├── streak.js                # Streak display (delegates to gamification.js)
│   │   ├── analytics.js             # Stats dashboard (JLPT rings, SRS health, heatmap)
│   │   ├── ai-tutor.js              # AI Sensei (3 modes, quota, DNA context)
│   │   ├── supabase-client.js       # Auth, SRS sync, Learning DNA API
│   │   ├── dna-summarizer.js        # Extracts learning patterns for AI context
│   │   ├── ai-proxy.js              # Cloudflare Worker API client
│   │   ├── sync-hook.js             # Supabase sync orchestration
│   │   ├── app.js                   # Thin orchestrator — DOMContentLoaded, always last
│   │   └── *.js                     # Feature modules: browse, quiz, conjugation…
│   └── data/
│       ├── vocab/
│       │   ├── vocab-n5.js (725)    # window.vocabN5
│       │   ├── vocab-n4.js (692)    # window.vocabN4
│       │   ├── vocab-n3.js (285)     # window.vocabN3
│       │   ├── vocab-n2.js (130)     # window.vocabN2
│       │   ├── vocab-n1.js (60)     # window.vocabN1 — seed data
│       │   └── vocab-index.js       # Merges all → window.vocabDB
│       ├── grammar/
│       │   ├── grammar-n5.js (94)   # window.grammarN5
│       │   ├── grammar-n4.js (92)   # window.grammarN4
│       │   ├── grammar-n3.js (119)  # window.grammarN3
│       │   ├── grammar-n2.js (90)   # window.grammarN2 — seed data
│       │   ├── grammar-n1.js (60)   # window.grammarN1
│       │   └── grammar-index.js     # Merges all → window.grammarDB + query API
│       ├── books/
│       │   ├── sources.js           # Book metadata registry
│       │   ├── book-minna-1/2.js    # Minna no Nihongo chapter→ID lens
│       │   ├── book-irodori-*.js    # Irodori chapter→ID lens
│       │   └── soumatome/           # Soumatome grammar lenses (N3: 132, N4: 102)
│       ├── tracks/
│       │   └── tracks.js            # Track definitions (runtime-populated)
│       └── fallback/
│           ├── grammar-drills.json  # Offline AI fallback grammar drills
│           └── vocab-drills.json    # Offline AI fallback vocab drills
│
├── workers/
│   ├── ai-proxy.js                  # Cloudflare Worker — AI routing + rate limiting
│   └── wrangler.toml                # Worker config (name: nugget-ai-proxy)
│
├── supabase/
│   ├── schema.sql                   # Idempotent schema (DROP POLICY IF EXISTS, etc.)
│   └── functions/
│       └── ai-router/
│           └── index.ts             # Edge Function — Groq+Gemini, Indonesian persona
│
├── wrangler.jsonc                   # Cloudflare Pages config
├── package.json                     # npm scripts: test, deploy, preview
├── .mcp.json                        # Supabase MCP server config
├── docs/                            # Project documentation collection
├── tests/
│   └── run.js                       # Test runner (node tests/run.js)
└── tools/                           # Build/migration scripts (gitignored)
```

## Data Architecture (v3)

### Three-tier system

**Tier 1 — Global DB** (single source of truth)
- `vocab-n5.js` … `vocab-n1.js` → merged by `vocab-index.js` → `window.vocabDB`
- `grammar-n5.js` … `grammar-n1.js` → merged by `grammar-index.js` → `window.grammarDB`
- `grammar-index.js` also provides: `window.getGrammar(id)`, `window.queryGrammar(filter)`, `window.sampleGrammar(filter, n)`

**Tier 2 — Book Lenses** (chapter→ID mappings)
- Book files contain chapter arrays of `{ id: 'vg-n5-00001' }` references into Tier 1
- No data duplication — lenses point into the global DB

**Tier 3 — Study Tracks**
- Runtime-populated arrays of IDs (from Tier 1 or Tier 2)
- Auto-generated for JLPT levels, Soumatome chapters, or hand-curated (Freeway)

### ID Format
- Vocab: `vg-{level}-{5digit}` → `vg-n5-00001`
- Grammar: `gn{level}-{5digit}` → `gn5-00001`

## Key Globals

| Global | Set by | Description |
|--------|--------|-------------|
| `window.APP_VERSION` | `core/version.js` | Single source of truth for version |
| `window.vocabDB` | `vocab-index.js` | Merged vocab array (1473+ entries) |
| `window.grammarDB` | `grammar-index.js` | Merged grammar array (273+ entries) |
| `window.grammarData` | `grammar-index.js` | Alias for grammarDB (backwards compat) |
| `window.grammarIdx` | `grammar-index.js` | Indexes: `{ byId, byLevel, byCat }` |
| `window.streakState` | `gamification.js` | `{ current, longest, lastDate }` |
| `window.sbClient` | `supabase-client.js` | Supabase JS client |
| `window.localState` | `local-state.js` | IndexedDB wrapper + sync queue |

## Script Load Order (index.html)

```
local-state.js           ← IndexedDB must be ready first
core/version.js
core/state.js
core/router.js
core/theme.js
core/install.js
[ts-fsrs CDN]
fsrs-math.js
fsrs-engine.js
gamification.js
streak.js                ← must load AFTER gamification.js
backup-restore.js
[Supabase CDN]
supabase-client.js       ← must load AFTER Supabase CDN
dna-summarizer.js
ai-proxy.js
ai-tutor.js
sync-hook.js
[feature modules: browse, quiz, conjugation, etc.]
analytics.js
app.js                   ← always last
```

## Service Worker Strategy

`sw.js` uses a **hybrid cache strategy**:
- **Cache-first** for all static assets (JS, CSS, HTML, fonts, data files)
- **Network-first** for API endpoints: `supabase.co`, `workers.dev`, `googleapis.com`, `groq.com`

Cache name: `nihongo-v15.6.0` (bump this on every deploy to force SW update)

## AI Architecture

```
Client (browser)
  └─ ai-tutor.js → ai-proxy.js (client) → Cloudflare Worker (workers/ai-proxy.js)
                                              ├─ Simple queries → Groq (llama-3.1-8b-instant, fast)
                                              └─ Complex queries → Gemini (gemini-1.5-flash)

Supabase Edge Function (supabase/functions/ai-router/)
  └─ Backup route (same dual-model logic, Indonesian tutor persona)
```

Learning DNA: `supabase-client.js` reads `window.localState.getDNA()` → injects mistake patterns into AI system prompt via `dna-summarizer.js`.

## Offline Capability

| Feature | Online | Offline |
|---------|--------|---------|
| Browse grammar/vocab | ✅ | ✅ (SW cache) |
| Quiz / FSRS review | ✅ | ✅ (SW cache + IndexedDB) |
| Conjugation | ✅ | ✅ (SW cache) |
| AI Sensei | ✅ | ⚠️ Fallback drills only |
| Stats dashboard | ✅ | ✅ (local IndexedDB) |
| SRS sync | ✅ | ⏳ Queued in IndexedDB |
| Auth | ✅ | ❌ Requires network |
