# Nugget Nihongo — Project Map
> Read this first every session. Single source of truth for project structure.
> Last updated: v15.6.0 — 15 April 2026 (rewritten by TASK 3 audit)
> **Selalu baca MASTER-AUDIT.md di root repo untuk task list terbaru.**

---

## Status Legend

| Status | Arti |
|---|---|
| ✅ | Complete & active |
| ⚠️ | Partial / needs work |
| 🌱 | Seed data only |
| ❌ | Empty / not started |
| 🔒 | Locked / do not touch |

---

## Repo Root

```
public/              ← Deploy root (Cloudflare Pages serves this)
workers/             ← Cloudflare Worker source (AI proxy)
supabase/            ← schema.sql + Edge Function ai-router
tests/               ← Test runner: node tests/run.js
docs/                ← Project documentation
  project/           ← _MAP.md, MASTER-FLOW-v5.md, archive/
  agent-system/      ← Old multi-agent docs (stale, ignore)
tools/               ← Local-only scripts (gitignored)
CLAUDE.md            ← Tech stack, conventions, handoff note
MASTER-AUDIT.md      ← Current state, task list, priorities (START HERE)
SPEC-GRAMMAR-IRODORI-A2.md ← Spec for TASK 4 & 5
```

---

## public/ — Deploy Root

```
public/
  index.html                ← SPA entry point (63 <script> tags)
  styles/app.css            ← All styles (3144 lines)
  sw.js                     ← Service worker (nihongo-v15.6.0)
  manifest.webmanifest      ← PWA manifest
  icons/                    ← PWA icons
```

---

## public/js/ — JavaScript Modules

All loaded via `<script>` in index.html. No bundler. Load order matters.

### Data (loaded first, before JS modules)
```
data/vocab/vocab-n5.js          window.vocabN5           ✅ 711 entries
data/vocab/vocab-n4.js          window.vocabN4           ✅ 692 entries
data/vocab/vocab-n3.js          window.vocabN3           ⚠️ 70 entries (target 3,750)
data/vocab/vocab-n2.js          window.vocabN2           🌱 50 entries (seed)
data/vocab/vocab-n1.js          window.vocabN1           🌱 20 entries (seed)
data/grammar/grammar-n5.js      window.grammarN5         ✅ 80 entries
data/grammar/grammar-n4.js      window.grammarN4         ✅ 90 entries
data/grammar/grammar-n3.js      window.grammarN3         ✅ 103 entries
data/grammar/grammar-n2.js      window.grammarN2         🌱 30 entries (seed)
data/grammar/grammar-n1.js      window.grammarN1         🌱 8 entries (seed)
data/books/book-irodori-a1.js   window.bookIrodoriA1     ⚠️ vocab_ids ✅ grammar_ids ❌
data/books/book-irodori-a2-1.js window.bookIrodoriA21    ⚠️ vocab_ids ✅ grammar_ids ❌
data/books/book-irodori-a2-2.js window.bookIrodoriA22    ⚠️ vocab_ids ✅ grammar_ids ❌
data/books/book-minna-1.js      window.bookMinna1        ❌ all empty
data/books/book-minna-2.js      window.bookMinna2        ❌ all empty
data/books/soumatome/
  grammar-lens-sm-n3.js         window.grammarLensSoumatomeN3  ✅ 132 entries
  grammar-lens-sm-n4.js         window.grammarLensSoumatomeN4  ✅ 102 entries
data/books/irodori/
  grammar-lens-ir-a1.js         window.grammarLensIrodoriA1    ✅ 61 entries (verify pending)
  grammar-lens-ir-a2-1.js       window.grammarLensIrodoriA21   ❌ stub
  grammar-lens-ir-a2-2.js       window.grammarLensIrodoriA22   ❌ stub
data/books/sources.js           window.nuggetSources     ✅ book metadata + credits
data/vocab/vocab-index.js       window.vocabDB           ✅ merged N5+N4 = 1,403 active
data/grammar/grammar-index.js   window.grammarDB         ✅ merged all levels, query API
data/tracks/tracks.js           window.studyTracks       ✅ JLPT + Soumatome + Freeway
data/_schema.md                 Data architecture v3 — canonical ID formats & schemas
data/_schema-vocab.md           Vocab entry field docs
data/_taxonomy.md               Domain taxonomy
data/fallback/
  grammar-drills.json           Offline AI fallback drills
  vocab-drills.json             Offline AI fallback drills
```

### Script Load Order (v15.6.0 — from index.html)

```
[data files above, in order listed]
↓
js/local-state.js         IndexedDB wrapper + Supabase sync queue
js/core/version.js        window.APP_VERSION — single source of truth
js/error-boundary.js      Global error handler (load 2nd after version)
js/core/state.js          LS keys, window.progress, window.bookmarks
js/core/router.js         switchTab()
js/core/theme.js          toggleTheme(), loadTheme()
js/core/install.js        PWA install modal, registerSW()
js/fsrs-math.js           FSRS calibration (Indonesian learners)
js/fsrs-engine.js         FSRS scheduler (ts-fsrs CDN) + IndexedDB hook
js/gamification.js        XP, streaks, badges
js/streak.js              loadStreak(), showStreakBroken()
js/backup-restore.js      Export/import user data
js/dna-summarizer.js      Learning DNA context builder
js/ai-proxy.js            AI proxy client
js/ai-tutor.js            AI Sensei UI (3 modes: explain/practice/test)
js/sync-hook.js           Supabase sync trigger
js/swipe.js               Touch gesture handler
js/browse.js              Browse tab: grammar cards, filter, search
js/conjugation-engine.js  Layer 0-3 conjugation service
js/quiz.js                Flashcard quiz: flip, assess(), progress panel
js/quiz-feedback.js       Feedback renderer — MUST load before fillin
js/fillin.js              Fill-in + Rearrange quiz mode
js/conjugation.js         Conjugation quiz mode
js/translation.js         Translation quiz mode
js/errorfind.js           Error-find quiz mode
js/multichoice.js         Multiple choice quiz mode
js/lang/lang-core.js      langGenerate(), VOCAB, TEMPLATES
js/quiz-typetr.js         Ketik Terjemahan mode
js/detail.js              openDetail(), buildBreakdownSafe()
js/quiz-generator.js      generateVocabQuiz(), generateGrammarQuiz()
js/quiz-engine-v2.js      FSRS-backed quiz engine v2
js/quiz-vocab.js          Vocab Quiz Mode
js/quiz-mixed.js          Mixed Quiz Mode (load after quiz-vocab)
js/daily-word.js          Daily Word banner
js/browse-vocab.js        Browse Vocab sub-tab
js/vocab-detail.js        Vocab detail panel
js/global-search.js       Cross-tab search
js/analytics.js           Stats dashboard (JLPT rings, SRS health, heatmap)
js/app.js                 Thin orchestrator — ALWAYS LAST
```

---

## Key Global Variables (v15.6.0)

| Variable | Defined in | Notes |
|---|---|---|
| `window.vocabDB` | vocab/vocab-index.js | VocabEntry[] — N5+N4 active (1,403) |
| `window.grammarDB` | grammar/grammar-index.js | GrammarEntry[] — all levels merged |
| `window.grammarData` | grammar/grammar-index.js | backwards compat alias |
| `window.grammarN5..N1` | grammar/grammar-n*.js | individual level arrays |
| `window.vocabN5..N1` | vocab/vocab-n*.js | individual level arrays |
| `window.bookIrodoriA1` | books/book-irodori-a1.js | vocab+grammar index per unit |
| `window.grammarLensIrodoriA1` | books/irodori/grammar-lens-ir-a1.js | 61 lesson entries |
| `window.grammarLensSoumatomeN3` | books/soumatome/grammar-lens-sm-n3.js | 132 entries |
| `window.grammarLensSoumatomeN4` | books/soumatome/grammar-lens-sm-n4.js | 102 entries |
| `window.studyTracks` | tracks/tracks.js | Study track definitions |
| `window.APP_VERSION` | js/core/version.js | e.g. 'v15.6.0' |
| `window.progress` | js/core/state.js | { [cardId]: 'know'\|'unsure'\|'forgot' } |
| `window.bookmarks` | js/core/state.js | Set\<cardId\> |

---

## Known Gotchas (v15.6.0)

- `quiz-feedback.js` MUST load BEFORE fillin, conjugation, translation, errorfind, multichoice, quiz-typetr
- `error-boundary.js` loads 2nd after version.js
- `quiz-mixed.js` loads AFTER quiz-vocab.js
- `vocab-index.js` only activates N5+N4 by default — enable N3+ when data is sufficient
- `grammar-index.js` merges all levels; N2/N1 are seed-only (30/8 entries)
- `sw.js` cache name = `nihongo-v15.6.0` — must match version.js on every release
- Book lens files in `data/books/irodori/` are NOT yet loaded in index.html (stubs only)
- `book-irodori-*.js` vocab_ids use new `vg-n5-*` format; grammar_ids still empty
- Supabase credentials are placeholders — see MASTER-AUDIT.md P2-B

---

## ID Conventions

```
Vocab:            vg-{level}-{5digit}     e.g. vg-n5-00001
Grammar:          gn{level}-{5digit}      e.g. gn5-00001
Lens (Irodori):   ir-a1-{3digit}          e.g. ir-a1-001
Lens (Soumatome): sm-n3-{3digit}          e.g. sm-n3-001
```

---

## Task List — Current Priorities

See **MASTER-AUDIT.md** for full task specs. Summary:

| Task | Description | Status |
|---|---|---|
| TASK 1 | Cherry-pick Irodori grammar lenses + branch cleanup | ✅ Done |
| TASK 2 | Remove duplicate Soumatome grammar files | ✅ Done |
| TASK 3 | Update _MAP.md + CLAUDE.md | ✅ Done (this file) |
| TASK 4 | Fill grammar_ids in Irodori A2-1 & A2-2 book lenses | ⬜ Next |
| TASK 5 | Fill grammar lens content: Irodori A2-1 & A2-2 | ⬜ Depends on TASK 4 |
| TASK 6 | Verify A1 grammar lens global_grammar_id links | ⬜ Depends on TASK 1 |
| TASK 7 | Fill grammar_ids in Irodori A1 book lens | ⬜ Depends on TASK 6 |
| TASK 8 | N3 vocab expansion (70 → 300+ entries) | ⬜ Independent |

---

*Last updated: 15 April 2026 — TASK 3 audit session*
