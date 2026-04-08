# Nugget Nihongo — Architecture

## Overview
Vanilla JavaScript PWA for Japanese language learning (JLPT N5–N1).
Offline-first, zero build step, no framework, no bundler.

## Stack
- **Runtime**: Vanilla JS (ES2020) — no React, no Vue, no build tools
- **Styling**: Single CSS file with section index (§1–§19)
- **Data**: JS files exporting to `window.*` globals
- **Offline**: Service Worker with static asset caching
- **Fonts**: DM Sans (Latin, variable) + BIZ UDGothic (JP, subsetted)
- **CI/CD**: GitHub Actions → GitHub Pages
- **Testing**: Custom Node.js test runner (no framework)

## Directory Structure
```
nugget-nihongo/
├── public/                          # DEPLOY ROOT — everything here = production
│   ├── index.html                   # Entry point, script load order defined inline
│   ├── sw.js                        # Service worker, CACHE version string
│   ├── manifest.webmanifest         # PWA manifest
│   ├── icons/                       # PWA icons (192, 512)
│   ├── fonts/                       # Subsetted woff2 (DM Sans + BIZ UDGothic)
│   ├── styles/
│   │   └── app.css                  # All styles, section index §1–§19
│   ├── js/
│   │   ├── core/                    # version, state, router, theme, install, grammar-query
│   │   ├── lang/                    # lang-core.js (sentence generator)
│   │   ├── app.js                   # Thin orchestrator — DOMContentLoaded, always last
│   │   └── *.js                     # Feature modules (quiz, browse, srs, conjugation…)
│   └── data/
│       ├── vocab/                   # Vocabulary entries per JLPT level + merger
│       │   ├── vocab-n5.js … n1.js  # Per-level vocab (window.vocabN5 etc.)
│       │   └── vocab-index.js       # Merges all → window.vocabDB
│       ├── grammar/                 # Grammar entries per JLPT level + merger
│       │   ├── grammar-n5.js … n1.js # Global grammar entries (5-digit IDs)
│       │   └── grammar-index.js     # Merges all → window.grammarDB + query API
│       ├── books/                   # Book index (chapter → ID mappings)
│       │   ├── book-minna-*.js      # Minna no Nihongo I & II
│       │   ├── book-irodori-*.js    # Irodori A1, A2-1, A2-2
│       │   └── sources.js           # Book metadata & credits
│       ├── qa-tests.js              # Dev-only referential integrity tests
│       ├── _schema.md               # Grammar data schema
│       └── _schema-vocab.md         # Vocab data schema
│
├── tests/
│   └── run.js                       # Test runner — validates schemas, IDs, xrefs
├── tools/
│   ├── config/                      # dependency-graph.json
│   ├── scripts/
│   │   ├── utils/                   # 107 utility scripts (health, merge, version, etc.)
│   │   └── spicy/                   # 26 validation & audit scripts
│   └── subset-fonts.py              # Font subsetting tool
├── docs/                            # Governance, operational, curriculum, research DBs
├── agents/                          # Agent prompt files (9 agents)
├── .github/workflows/               # CI: deploy, validate, pre-deploy-checks
│
├── _MAP.md                          # Task registry — single source of truth
├── ARCHITECTURE.md                  # This file
├── CHANGELOG.md                     # Version history
├── README.md                        # Project overview
├── ROADMAP.md                       # Phase-based roadmap
├── package.json                     # Metadata, npm scripts
├── jsconfig.json                    # Editor support (path aliases)
├── .editorconfig                    # Code style
├── .prettierrc                      # Formatting rules
├── .nvmrc                           # Node version (22)
├── .gitignore                       # Excludes agents/, docs/, tools/ from deploy
└── LICENSE                          # MIT
```

## Deployment Model
`public/` is the deploy root. GitHub Actions uploads `public/` directly to GitHub Pages.
No build step, no bundling, no transformation. What's in `public/` is what the user gets.

Everything outside `public/` (agents, docs, tools, tests) is development-only and excluded
from production via `.gitignore` and the deploy workflow.

## Data Architecture
Two-tier system (established v14.8.1):

**Tier 1 — Global entries**: Standalone, textbook-independent.
- Vocab IDs: `vg-{level}-{5digit}` (e.g., `vg-n5-00001`)
- Grammar IDs: `gn{level}-{5digit}` (e.g., `gn3-00001`)

**Tier 2 — Book lens**: Chapter-to-ID mappings referencing Tier 1 entries.
- `book-*.js` files map chapters to `vocab_ids[]` and `grammar_ids[]`.

## Script Load Order
Defined in `public/index.html`. Critical dependency chain:
1. `core/version.js` → `error-boundary.js` (must be 2nd)
2. All `data/**/*.js` files
3. Feature modules in dependency order (srs → browse → quiz chain)
4. `app.js` — always last

## Key Globals
| Variable | Source | Type |
|----------|--------|------|
| `window.APP_VERSION` | core/version.js | string |
| `window.vocabDB` | data/vocab/vocab-index.js | VocabEntry[] |
| `window.grammarDB` | data/grammar/grammar-index.js | GrammarCard[] |
| `window.grammarData` | (compat alias for grammarDB) | GrammarCard[] |
| `window.progress` | core/state.js | object |
| `window.srsData` | fsrs-engine.js | object |

## npm Scripts
```bash
npm test          # Run test suite (9500+ assertions)
npm start         # Local dev server on :3000
npm run serve     # Dev server with push-state routing
npm run check:version  # Verify version.js ↔ sw.js sync
```

## Schemas
- Vocab: `public/data/_schema-vocab.md`
- Grammar: `public/data/_schema.md`
- Taxonomy: `public/data/_taxonomy.md`
