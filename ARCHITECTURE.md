# Nugget Nihongo — Architecture

## Overview
Vanilla JavaScript PWA for Japanese language learning. Offline-first, no build step, no framework.

## Stack
- **Frontend**: Vanilla JS + CSS (single `style.css`)
- **Data**: JS files exporting to `window.*` globals
- **Offline**: Service Worker (`sw.js`) with static asset caching
- **Fonts**: DM Sans (Latin) + BIZ UDGothic (JP), both subsetted

## Directory Structure
```
├── index.html           # Entry point, script load order
├── sw.js                # Service worker, CACHE version
├── manifest.json        # PWA manifest
├── js/
│   ├── core/            # version, state, router, theme, install, grammar-query
│   ├── lang/            # lang-core.js (sentence generator)
│   └── *.js             # Feature modules (quiz, browse, srs, etc.)
├── data/
│   ├── vocab-n*.js      # Vocab entries per JLPT level
│   ├── grammar-n*.js    # Grammar entries per level (Tier 1 global)
│   ├── book-*.js        # Book index (chapter → vocab/grammar IDs)
│   ├── bank-soal*.js    # Quiz question banks
│   ├── vocab-index.js   # Merges all vocab → window.vocabDB
│   ├── index.js         # Merges grammar → window.grammarData
│   ├── sources.js       # Book metadata & credits
│   └── _schema*.md      # Schema documentation
├── css/style.css        # All styles, section index §1-§19
├── fonts/               # Subsetted woff2 files
├── agents/              # Agent prompt files (gitignored)
├── docs/                # Governance, operational, curriculum (gitignored)
└── tools/               # Scripts and utilities (gitignored)
```

## Data Architecture
Two-tier system (Plan A, v14.8.1):

**Tier 1 — Global**: Standalone entries independent of any textbook.
- Vocab: `vg-{level}-{4digit}` (e.g., `vg-n5-0001`)
- Grammar: `gn{level}-{4digit}` (e.g., `gn3-0001`)

**Tier 2 — Book Lens**: Chapter-to-ID mappings referencing Tier 1 entries.
- `book-*.js` files map chapters to vocab_ids and grammar_ids.

## Script Load Order
Defined in `index.html`. Critical dependencies:
1. `core/version.js` → `error-boundary.js` (must be 2nd)
2. Data files (all `data/*.js`)
3. Feature modules in dependency order
4. `app.js` always last

## Key Globals
| Variable | Source | Type |
|----------|--------|------|
| `window.vocabDB` | vocab-index.js | VocabEntry[] |
| `window.grammarData` | index.js | GrammarCard[] |
| `window.APP_VERSION` | core/version.js | string |
| `window.progress` | core/state.js | object |
| `window.srsData` | srs.js | object |

## Schemas
- Vocab: `data/_schema-vocab.md`
- Grammar: `data/_schema.md`
- Taxonomy: `docs/curriculum/NUGGET-NIHONGO-TAXONOMY-MASTER-v2.md`
