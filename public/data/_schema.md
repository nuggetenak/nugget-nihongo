# NUGGET NIHONGO — DATA ARCHITECTURE v3
**Version:** v3.0
**Date:** 1 April 2026
**Author:** A1 Crispy 🥐 (acting as Curriculum Authority per Nugget-san directive)
**Status:** APPROVED by Nugget-san — supersedes all prior schemas and proposals
**Supersedes:** `_schema.md` (Batter), `_schema-vocab.md` (Juicy), `CURRICULUM-PROPOSAL-TASK-FLUFFY-1-v2.md`, `NUGGET-NIHONGO-TAXONOMY-MASTER-v2.md` (taxonomy retained, architecture replaced)

---

## GUIDING PRINCIPLE

**One exhaustive database. Many tracks. Book lenses point into the database, never away from it.**

Inspired by Bunpro's model: the database IS the platform. Books are curated pathways through it. Study tracks are ordered selections from it. The database doesn't change based on how you navigate it.

---

# PART 1 — ARCHITECTURE OVERVIEW

## 1.1 — Core Model

```
┌─────────────────────────────────────────────────────────┐
│              GLOBAL DATABASE (source of truth)           │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Vocab Global │  │Grammar Global│  │  Kanji Global │  │
│  │  vocab-n*.js  │  │grammar-n*.js │  │  (future)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │
│         │                 │                              │
│    ┌────┴─────────────────┴────┐                        │
│    │        INDEX LAYER        │                        │
│    │  vocab-index.js           │                        │
│    │  grammar-index.js         │                        │
│    └────┬─────────────────┬────┘                        │
│         │                 │                              │
│  ┌──────┴───────┐  ┌─────┴────────┐                    │
│  │  BOOK LENSES  │  │ STUDY TRACKS │                    │
│  │  (per buku)   │  │ (per jalur)  │                    │
│  └──────────────┘  └──────────────┘                    │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           COMPUTATION ENGINES                     │  │
│  │  conjugation-engine.js · quiz-engine (future)     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 1.2 — What Each Layer Does

| Layer | Purpose | Owns Content? | Example |
|-------|---------|---------------|---------|
| **Global Database** | Exhaustive, canonical record of every grammar/vocab/kanji point | YES — all content lives here | `gn3-00001`: ～おかげで |
| **Index Layer** | Merges all levels, builds lookup indexes, exposes query API | NO — reads from Global | `getGrammar('gn3-00001')` |
| **Book Lenses** | Book-faithful mapping: chapter → global IDs + book's own pedagogy | PARTIAL — owns `raw`, `desc`, `examples` per book | Soumatome N3 Week 1 Day 1 teaches `gn3-00001` |
| **Study Tracks** | Ordered sequences for learner navigation | NO — curates from Global | Freeway Track: item 1 = `gn5-00001`, item 2 = `vg-n5-00001` |
| **Engines** | Computation: conjugation, quiz generation, example generation | NO — operates on Global | conjugate('食べる', 'te-form') → '食べて' |

## 1.3 — What Replaces What

| Old Concept | New Concept | Change |
|-------------|-------------|--------|
| Tier 1 Grammar Global | **Grammar Global** (unchanged name, updated schema) | 5-digit IDs, `cat` mapped to Taxonomy v2 L1 values |
| Tier 2 Grammar per Buku (independent) | **Grammar Book Lens** (linked to Global) | Now MUST reference `global_grammar_id` |
| Freeway (content layer) | **Freeway Track** (navigation layer) | No separate content — curated path through Global |
| Highway (content layer) | **JLPT Track** (navigation layer) | Default N5→N1 progression through Global |
| Global Content (layer) | Absorbed into **Global Database** | Everything IS global; no separate layer needed |
| 4-digit IDs | **5-digit IDs** | All new entries; existing entries migrated |
| 82 `cat` values (bahasa Indonesia labels) | **Taxonomy v2 L1 `cat` values** (English) | Mapping table provided in Part 5 |

---

# PART 2 — ID FORMAT SPECIFICATION

**Effective immediately. All entries use 5-digit zero-padded IDs.**

## 2.1 — ID Formats

```
VOCAB GLOBAL:       vg-{level}-{5digit}         vg-n5-00001
GRAMMAR GLOBAL:     gn{level}-{5digit}          gn5-00001
GRAMMAR BOOK LENS:  {book}-{level}-{seq3}       sm-n3-001, ir-a1-001, mn-1-001
VOCAB BOOK LENS:    (no own IDs — references global vocab IDs)
BANK SOAL:          bs-{level}-{type}-{5digit}  bs-n3-fi-00001
STUDY TRACK:        trk-{name}                  trk-freeway, trk-jlpt-n3
TRACK ITEM:         (no own IDs — ordered array of global IDs)
KANJI (future):     kj-{level}-{5digit}         kj-n5-00001
```

## 2.2 — Book Abbreviations

| Abbreviation | Book | Levels/Volumes |
|---|---|---|
| `ir` | Irodori (Japan Foundation) | `a1`, `a2-1`, `a2-2` |
| `sm` | Nihongo Sou Matome (ASK) | `n5`, `n4`, `n3`, `n2`, `n1` |
| `mn` | Minna no Nihongo (3A Corp) | `1`, `2` (Shokyu), `3`, `4` (Chukyu, future) |
| `gk` | Genki (Japan Times) | `1`, `2` (future) |
| `tb` | Tobira (Kurosio) | `1`, `2`, `gw` (Gateway, future) |
| `skm` | Shin Kanzen Master (3A Corp) | `n4`, `n3`, `n2`, `n1` (future) |
| `try` | Try! JLPT (ABK) | `n5`–`n1` (future) |

## 2.3 — Migration Rules

- All NEW entries: 5-digit from day one
- Existing `gn3-0001` → `gn3-00001` (prepend zero)
- Existing `vg-n5-0001` → `vg-n5-00001` (prepend zero)
- Old `n3-w1d1-01` IDs → retired (content migrates to book lens with new IDs)
- Old `bs-n3-w1-01` IDs → retired (bank soal rebuilt from scratch later)
- All cross-references (`see_also_grammar`, `synonyms`, etc.) updated in same migration batch
- Migration is ONE atomic task per level — no incremental touch-triggered migration

---

# PART 3 — GLOBAL DATABASE SCHEMAS

## 3.1 — VocabGlobal (unchanged concept, updated IDs)

**Files:** `vocab-n5.js`, `vocab-n4.js`, `vocab-n3.js`, `vocab-n2.js`, `vocab-n1.js`
**Window vars:** `window.vocabN5` ... `window.vocabN1`

```js
{
  // ── IDENTITY ───────────────────────────────────────────
  id          : 'vg-n3-00001',        // 5-digit. IMMUTABLE after publish.
  word        : '諦める',
  reading     : 'あきらめる',
  romaji      : 'akirameru',
  meaning_id  : 'menyerah',           // Bahasa Indonesia
  meaning_en  : 'to give up',         // English (optional)

  // ── CLASSIFICATION ─────────────────────────────────────
  jlpt        : 'n3',                 // 'n5'|'n4'|'n3'|'n2'|'n1'|'beyond'
  pos         : 'verb-ru',            // Taxonomy v2 L1 values ONLY
  common      : true,

  // ── GRAMMAR LINK ───────────────────────────────────────
  related_grammar : ['gn3-00005'],     // global grammar IDs (5-digit)

  // ── CONTEXT ────────────────────────────────────────────
  formalitas  : 2,                     // 0–5
  domain      : ['emosi', 'keputusan'], // Taxonomy v2 L1 domain values
  register    : 'neutral',            // 'formal'|'neutral'|'casual'|'written'|'spoken'|'literary'
  nuance      : 'Konotasi negatif.',

  // ── CONJUGATION ────────────────────────────────────────
  conj_type   : 'ichidan',            // engine hint

  // ── EXAMPLES ───────────────────────────────────────────
  examples    : [
    { jp: '夢を諦めたくない。', id: 'Aku tidak mau menyerah pada impianku.', level: 'n3', tags: ['emosi'] },
  ],

  // ── RELATIONS ──────────────────────────────────────────
  synonyms        : ['vg-n3-00088'],
  antonyms        : ['vg-n3-00041'],
  see_also        : [],
  confusion_pairs : [],                // REQUIRED from N3+. Bidirectional.

  // ── PROVENANCE ─────────────────────────────────────────
  provenance  : 'jlpt-corpus',        // 'jlpt-corpus'|'soumatome'|'irodori'|'minna'|'original'
  added_v     : 'v15',
}
```

**POS values:** Full list in Taxonomy Master v2, Part A.1. All `[L1]` values are valid. Scripts reject `[L2]`/`[L3]`.

**Domain values:** Full list in Taxonomy Master v2, Part C.1. All `[L1]` values are valid.

## 3.2 — GrammarGlobal (major update)

**Files:** `grammar-n5.js`, `grammar-n4.js`, `grammar-n3.js`, `grammar-n2.js`, `grammar-n1.js`
**Window vars:** `window.grammarN5` ... `window.grammarN1`

```js
{
  // ── IDENTITY ───────────────────────────────────────────
  id         : 'gn3-00001',           // 5-digit. IMMUTABLE after publish.
  level      : 'n3',                  // 'n5'|'n4'|'n3'|'n2'|'n1'|'beyond'

  // ── PATTERN ────────────────────────────────────────────
  pattern    : '〜おかげで',
  reading    : '〜okage de',
  meaning    : 'berkat ... (hal positif)',  // Bahasa Indonesia, 1 line
  connection : 'V/Adj plain / N + の + おかげで',

  // ── CLASSIFICATION (3 axes) ────────────────────────────
  cat        : 'reason-cause',         // Taxonomy v2 Part B.1 L1 values ONLY
  form_class : 'particle-compound',    // Taxonomy v2 Part A.1 (grammatical form axis)
                                       // null if not applicable
  jlpt_sub   : 3,                     // 1–10 sub-ordering within JLPT level
                                       // (Bunpro-inspired fine progression)

  // ── EXPLANATION ────────────────────────────────────────
  desc       : '...',                  // Bahasa Indonesia explanation, may use <b>
  nuance     : '...',                  // Usage context, when to use

  // ── EXAMPLES ───────────────────────────────────────────
  examples   : [
    {
      jp   : '先生のご指導の<b>おかげで</b>、試験に合格しました。',
      id   : 'Berkat bimbingan guru, saya lulus ujian.',
      level: 'n3',
      tags : ['formal', 'sekolah'],
    }
  ],

  // ── RELATIONS ──────────────────────────────────────────
  see_also_grammar : ['gn3-00002'],    // 5-digit global IDs
  see_also_vocab   : [],               // 5-digit global vocab IDs
  confusion_pairs  : ['gn3-00002'],    // REQUIRED from N3+. Bidirectional. Hard-fail.

  // ── ADVANCED ───────────────────────────────────────────
  register   : null,                   // 'formal'|'written'|'spoken'|'literary'|null
  exceptions : null,
  notes      : null,

  // ── PROVENANCE ─────────────────────────────────────────
  provenance : 'jlpt-corpus',          // 'jlpt-corpus'|'original'
  added_v    : 'v15',
}
```

### `cat` Values — Canonical List (Taxonomy v2 B.1 L1 mapped)

These are the ONLY valid `cat` values. The old bahasa Indonesia labels (`sebab-akibat`, `pasif`, `kausatif`, etc.) are retired.

**Predicates:** `copula`, `existence`, `predicate-adjective`
**Verb inflection:** `te-form-use`, `negative`, `past-tense`, `progressive-state`, `potential`, `passive`, `causative`, `volitional-intention`
**Modality:** `permission-prohibition`, `obligation-necessity`, `desire-want`, `conjecture-possibility`, `hearsay-report`
**Conditionals:** `conditional-to`, `conditional-ba`, `conditional-tara`, `conditional-nara`
**Connectives:** `reason-cause`, `contrast-concession`, `purpose`, `sequential-temporal`, `listing-addition`
**Scope/Focus:** `limitation-only`, `extent-degree`, `comparison`
**Nominalization:** `nominalization`, `quotation-thought`, `relative-clause`
**Aspect:** `completion-regret`, `inception-continuation`, `directional-aspect`
**Keigo:** `sonkeigo-pattern`, `kenjougo-pattern`, `teineigo-pattern`
**Sentence-final:** `sentence-final-modality`, `sentence-final-request`

**Total: 34 canonical values.** Scripts hard-reject anything else.

### Old `cat` → New `cat` Migration Table

| Old (bahasa Indonesia) | New (Taxonomy v2 L1) |
|---|---|
| `sebab-akibat` | `reason-cause` |
| `pasif` | `passive` |
| `kausatif` | `causative` |
| `keharusan` | `obligation-necessity` |
| `kondisional` | `conditional-ba` / `conditional-tara` / `conditional-nara` / `conditional-to` (disambiguate per entry) |
| `konsesi` | `contrast-concession` |
| `partikel` | (disambiguate: `limitation-only`, `extent-degree`, etc.) |
| `perbandingan` | `comparison` |
| `temporal` | `sequential-temporal` |
| `frekuensi` | `sequential-temporal` (or specific per entry) |
| `batas-waktu` | `sequential-temporal` |
| `hampir` | `extent-degree` |
| `kesempatan` | `sequential-temporal` |
| `penemuan` | `sentence-final-modality` |
| `penjelasan` | `sentence-final-modality` |
| `peristiwa` | `sequential-temporal` |
| `kopula` | `copula` |
| `dummy` | DELETED — no dummy entries in new system |

**Note:** Some old values map ambiguously. Per-entry review required during migration.

---

# PART 4 — BOOK LENS SCHEMAS

## 4.1 — GrammarBookLens (NEW — links to Global)

**Key change from old Tier 2:** every entry MUST reference a `global_grammar_id`.

**Files:** `grammar-lens-{book}-{level}.js`
**Example:** `grammar-lens-sm-n3.js`, `grammar-lens-ir-a1.js`, `grammar-lens-mn-1.js`
**Window vars:** `window.grammarLensSoumatomeN3`, `window.grammarLensIrodoriA1`, etc.

```js
{
  // ── IDENTITY ───────────────────────────────────────────
  id                : 'sm-n3-001',     // local to this file
  global_grammar_id : 'gn3-00015',     // REQUIRED link to Global. null ONLY for
                                        // truly book-unique content with no global equivalent.
  global_grammar_ids: null,            // array if book combines multiple global points in one lesson
                                        // mutually exclusive with global_grammar_id

  // ── BOOK LOCATION ──────────────────────────────────────
  week       : 1,                      // Soumatome: 1–6 (N3) or 1–8 (N2/N1)
  day        : 1,                      // Soumatome: 1–7 (7 = review)
  chapter    : null,                   // Minna/Genki/Tobira: chapter number
  unit       : null,                   // Irodori: unit number
  page       : null,                   // page number in physical book (verification)
  seq        : 1,                      // order within the chapter/week/day

  // ── BOOK-FAITHFUL CONTENT ──────────────────────────────
  pattern    : '〜られている',         // pattern as presented in THIS book
  raw        : '',                     // VERBATIM from book. IMMUTABLE after fill.
  desc       : '',                     // UI-adapted explanation in Bahasa Indonesia
  examples   : [
    { jp: '...', id: '...' }          // book's own examples
  ],

  // ── METADATA ───────────────────────────────────────────
  notes      : null,                   // translator/agent notes
}
```

### Rules
- `global_grammar_id` is REQUIRED. Set to `null` only with `notes` explaining why.
- `raw` is IMMUTABLE — source of truth from the physical book. Fill first, then write `desc`.
- `desc` is the UI-friendly adaptation. May differ from `raw`. May be revised.
- No `cat` field — classification lives in Global only.
- Book lens NEVER duplicates what Global already provides (meaning, category, relations).

## 4.2 — VocabBookLens (mostly unchanged)

**Files:** `vocab-lens-{book}-{level}.js`
**Example:** `vocab-lens-ir-a1.js`, `vocab-lens-sm-n5.js`, `vocab-lens-mn-1.js`
**Window vars:** `window.vocabLensIrodoriA1`, `window.vocabLensMinna1`, etc.

```js
// Example: vocab-lens-ir-a1.js
window.vocabLensIrodoriA1 = {
  meta: {
    book       : 'irodori-a1',
    title      : 'Irodori: Japanese for Life in Japan — A1',
    publisher  : 'Japan Foundation',
    jlpt_range : ['n5'],
    structure  : 'unit',              // 'unit'|'chapter'|'week'
    total_units: 18,
  },
  chapters: [
    {
      unit     : 1,
      title    : 'はじめまして',
      topic    : 'Perkenalan',
      vocab_ids: ['vg-n5-00001', 'vg-n5-00042'],     // 5-digit global IDs
      grammar_lens_ids: ['ir-a1-001', 'ir-a1-002'],   // links to GrammarBookLens entries
    },
    // ...
  ],
}
```

### Book Display Order (UI)

Per Nugget-san directive, book menu order:
1. **Irodori** (free, beginner-friendly)
2. **Nihongo Sou Matome** (JLPT-focused, core platform book)
3. **Minna no Nihongo** (classroom standard)
4. (others as added — Genki, Tobira, SKM, Try!)

Configured in `sources.js` → `display_order` field.

---

# PART 5 — STUDY TRACKS

## 5.1 — Track Schema

**File:** `tracks.js`
**Window var:** `window.studyTracks`

```js
window.studyTracks = {

  // ── FREEWAY ────────────────────────────────────────────
  'trk-freeway': {
    id          : 'trk-freeway',
    name        : 'Freeway',
    name_id     : 'Jalur Cepat',
    desc        : 'Survival Japanese — hal pertama yang kamu butuhkan.',
    target      : 'absolute-beginner',
    icon        : '🛣️',
    items       : [
      // Ordered array of mixed global IDs
      // Grammar + Vocab interleaved for natural learning flow
      { type: 'grammar', id: 'gn5-00001', label: 'です/じゃない' },
      { type: 'vocab',   id: 'vg-n5-00001', label: '会う' },
      // ... curated survival-first order
    ],
    curation    : {
      strategy  : 'survival-utility',  // not JLPT order, not textbook order
      max_items : 200,                 // small, focused
      criteria  : 'high-frequency, immediate-utility, low-cognitive-load',
    },
  },

  // ── JLPT TRACKS ────────────────────────────────────────
  'trk-jlpt-n5': {
    id          : 'trk-jlpt-n5',
    name        : 'JLPT N5',
    name_id     : 'JLPT N5',
    desc        : 'Semua grammar dan vocab N5 — urutan standar.',
    target      : 'n5',
    icon        : '🏷️',
    items       : [
      // All N5 grammar + vocab, ordered by jlpt_sub then topic
      { type: 'grammar', id: 'gn5-00001' },
      // ...
    ],
    curation    : {
      strategy  : 'jlpt-systematic',
      criteria  : 'complete JLPT coverage, progressive difficulty',
    },
  },
  // trk-jlpt-n4, trk-jlpt-n3, trk-jlpt-n2, trk-jlpt-n1 follow same pattern

  // ── BOOK TRACKS (auto-generated from book lenses) ──────
  'trk-book-irodori-a1': {
    id          : 'trk-book-irodori-a1',
    name        : 'Irodori A1 Path',
    name_id     : 'Jalur Irodori A1',
    desc        : 'Ikuti urutan Irodori A1 — unit 1 sampai 18.',
    target      : 'n5',
    icon        : '📗',
    book_source : 'irodori-a1',        // auto-generated from vocab-lens + grammar-lens
    items       : [],                  // populated at build time from lens files
  },

  // ── BEYOND TRACK ───────────────────────────────────────
  'trk-beyond': {
    id          : 'trk-beyond',
    name        : 'Beyond JLPT',
    name_id     : 'Di Luar JLPT',
    desc        : 'Classical Japanese, advanced keigo, morphological patterns.',
    target      : 'beyond',
    icon        : '🎓',
    items       : [],                  // entries with jlpt: 'beyond'
  },
};
```

## 5.2 — Track Rules

- Tracks contain NO content — only ordered references to Global IDs.
- A learner can be on multiple tracks simultaneously.
- Adding a new book = adding a new track (+ lens files). Zero new Global content needed if grammar/vocab already exists.
- Track items can be `grammar` or `vocab` — interleaved for natural learning.
- Book tracks auto-generated from lens files at build time.

---

# PART 6 — FILE STRUCTURE

## 6.1 — Target Directory Layout

```
public/data/
├── _schema.md                          # THIS DOCUMENT (architecture v3)
├── _taxonomy.md                        # Taxonomy Master v2 (retained, referenced)
│
├── vocab/
│   ├── vocab-n5.js                     # VocabGlobal N5 (~800 entries)
│   ├── vocab-n4.js                     # VocabGlobal N4 (~1500 entries)
│   ├── vocab-n3.js                     # VocabGlobal N3 (placeholder → populate)
│   ├── vocab-n2.js                     # VocabGlobal N2 (placeholder)
│   ├── vocab-n1.js                     # VocabGlobal N1 (placeholder)
│   └── vocab-index.js                  # Merger + query API
│
├── grammar/
│   ├── grammar-n5.js                   # GrammarGlobal N5
│   ├── grammar-n4.js                   # GrammarGlobal N4
│   ├── grammar-n3.js                   # GrammarGlobal N3
│   ├── grammar-n2.js                   # GrammarGlobal N2 (placeholder)
│   ├── grammar-n1.js                   # GrammarGlobal N1 (placeholder)
│   └── grammar-index.js               # Merger + query API (NEW)
│
├── books/
│   ├── sources.js                      # Book metadata + display order
│   │
│   ├── irodori/
│   │   ├── vocab-lens-ir-a1.js
│   │   ├── vocab-lens-ir-a2-1.js
│   │   ├── vocab-lens-ir-a2-2.js
│   │   ├── grammar-lens-ir-a1.js       # NEW
│   │   ├── grammar-lens-ir-a2-1.js     # NEW
│   │   └── grammar-lens-ir-a2-2.js     # NEW
│   │
│   ├── soumatome/
│   │   ├── vocab-lens-sm-n5.js
│   │   ├── vocab-lens-sm-n4.js
│   │   ├── vocab-lens-sm-n3.js
│   │   ├── vocab-lens-sm-n2.js         # future
│   │   ├── vocab-lens-sm-n1.js         # future
│   │   ├── grammar-lens-sm-n5.js       # NEW (from n5 portion of all-in-one)
│   │   ├── grammar-lens-sm-n4.js       # NEW (from n4-w*.js)
│   │   ├── grammar-lens-sm-n3.js       # NEW (from n3-w*.js)
│   │   ├── grammar-lens-sm-n2.js       # future
│   │   └── grammar-lens-sm-n1.js       # future
│   │
│   └── minna/
│       ├── vocab-lens-mn-1.js
│       ├── vocab-lens-mn-2.js
│       ├── grammar-lens-mn-1.js        # NEW
│       └── grammar-lens-mn-2.js        # NEW
│
├── tracks/
│   └── tracks.js                       # All study tracks (NEW)
│
└── quiz/                               # DEFERRED — rebuilt from scratch later
    └── .gitkeep
```

## 6.2 — Files to RETIRE (delete after migration)

```
RETIRE IMMEDIATELY (content migrated to new structure):
  grammar/n3-w1.js through n3-w6.js     → grammar-lens-sm-n3.js
  grammar/n4-w1.js through n4-w6.js     → grammar-lens-sm-n4.js
  grammar/dummy.js                       → deleted (no more dummy entries)
  grammar/index.js                       → replaced by grammar-index.js
  grammar/bank-soal.js                   → deferred to quiz/ rebuild
  grammar/bank-soal-n4.js               → deferred to quiz/ rebuild
  grammar/bank-soal-quiz4.js            → deferred to quiz/ rebuild

RENAME (move to new paths):
  books/book-irodori-a1.js              → books/irodori/vocab-lens-ir-a1.js
  books/book-irodori-a2-1.js            → books/irodori/vocab-lens-ir-a2-1.js
  books/book-irodori-a2-2.js            → books/irodori/vocab-lens-ir-a2-2.js
  books/book-minna-1.js                 → books/minna/vocab-lens-mn-1.js
  books/book-minna-2.js                 → books/minna/vocab-lens-mn-2.js
```

## 6.3 — Window Variable Convention

| File | Window Variable |
|---|---|
| `vocab-n5.js` | `window.vocabN5` |
| `grammar-n5.js` | `window.grammarN5` |
| `grammar-index.js` | `window.grammarDB`, `window.grammarIdx` |
| `vocab-lens-ir-a1.js` | `window.vocabLensIrodoriA1` |
| `grammar-lens-sm-n3.js` | `window.grammarLensSoumatomeN3` |
| `grammar-lens-ir-a1.js` | `window.grammarLensIrodoriA1` |
| `grammar-lens-mn-1.js` | `window.grammarLensMinna1` |
| `tracks.js` | `window.studyTracks` |
| `sources.js` | `window.nuggetSources` |

---

# PART 7 — GRAMMAR INDEX API (NEW)

**File:** `grammar-index.js`

```js
(function () {

  // Merge all levels
  window.grammarDB = [
    ...(window.grammarN5 || []),
    ...(window.grammarN4 || []),
    ...(window.grammarN3 || []),
    ...(window.grammarN2 || []),
    ...(window.grammarN1 || []),
  ];

  // Build indexes
  const byId    = {};
  const byLevel = {};
  const byCat   = {};

  for (const g of window.grammarDB) {
    byId[g.id] = g;
    if (!byLevel[g.level]) byLevel[g.level] = [];
    byLevel[g.level].push(g);
    if (!byCat[g.cat]) byCat[g.cat] = [];
    byCat[g.cat].push(g);
  }

  window.grammarIdx = { byId, byLevel, byCat };

  // Query API
  window.getGrammar       = (id) => byId[id] || null;
  window.queryGrammar     = (filter) => {
    let results = window.grammarDB;
    if (filter.level) results = results.filter(g => g.level === filter.level);
    if (filter.cat)   results = results.filter(g => g.cat === filter.cat);
    if (filter.register) results = results.filter(g => g.register === filter.register);
    return results;
  };
  window.sampleGrammar    = (filter, n) => {
    const pool = window.queryGrammar(filter);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };

})();
```

---

# PART 8 — SOUMATOME BOOK STRUCTURE REFERENCE

For agents building grammar-lens-sm-*.js files.

## 8.1 — Structure per Level

| Level | Weeks | Days/Week | Study Days | Review Days | Book Type |
|---|---|---|---|---|---|
| N5 | 6 | 7 (6+1 review) | 36 | 6 | All-in-one |
| N4 | 6 | 7 | 36 | 6 | 2 combined books |
| N3 | 6 | 7 | 36 | 6 | 5 separate (Grammar, Vocab, Kanji, Reading, Listening) |
| N2 | 8 | 7 | 48 | 8 | 5 separate |
| N1 | 8 | 7 | 48 | 8 | 5 separate |

## 8.2 — Mapping Current n3-w*.js to grammar-lens-sm-n3.js

| Old file | Content | Maps to |
|---|---|---|
| `n3-w1.js` (66 entries) | Soumatome N3 Bunpou Week 1, Day 1–6 | `grammar-lens-sm-n3.js` week 1 |
| `n3-w2.js` (88 entries) | Week 2 | week 2 |
| `n3-w3.js` (71 entries) | Week 3 | week 3 |
| `n3-w4.js` (74 entries) | Week 4 | week 4 |
| `n3-w5.js` (72 entries) | Week 5 | week 5 |
| `n3-w6.js` (66 entries) | Week 6 | week 6 |
| `n4-w1.js` (96 entries) | Soumatome N4 Bunpou Week 1 | `grammar-lens-sm-n4.js` week 1 |
| ... | ... | ... |

Each old entry (`n3-w1d1-01`) becomes a lens entry (`sm-n3-001`) with `global_grammar_id` pointing to the matching GrammarGlobal entry.

---

# PART 9 — MIGRATION PLAN

## 9.1 — Execution Phases

### Phase 0: Architecture Lock (THIS DOCUMENT)
- [x] Architecture v3 approved by Nugget-san
- [ ] Document placed in `docs/curriculum/` and `public/data/_schema.md`
- [ ] Taxonomy Master v2 retained as `public/data/_taxonomy.md`

### Phase 1: ID Migration (Tier L — multi-session, Batter + Juicy)
- Migrate all `gn{level}-{4digit}` → `gn{level}-{5digit}` in grammar-n*.js
- Migrate all `vg-{level}-{4digit}` → `vg-{level}-{5digit}` in vocab-n*.js
- Update ALL cross-references (see_also, synonyms, antonyms, related_grammar)
- Update vocab-index.js, all book lens files
- Validation script: reject any 4-digit ID

### Phase 2: Grammar `cat` Migration (Tier L — Batter)
- Map all old bahasa Indonesia `cat` values → Taxonomy v2 L1 English values
- Per-entry review for ambiguous mappings (e.g., `kondisional` → which conditional?)
- Add `form_class` and `jlpt_sub` fields to all entries
- Add `provenance` and `confusion_pairs` fields
- Validation script: reject any non-L1 cat value

### Phase 3: File Restructure (Tier M — Crispy)
- Create `public/data/books/irodori/`, `soumatome/`, `minna/` directories
- Move existing vocab lens files to new paths
- Create `grammar-index.js`
- Create `tracks.js` (initially with empty track items — curation later)
- Update `index.html` script load order
- Update `sources.js` with `display_order`

### Phase 4: Soumatome Grammar Lens Build (Tier XL — multi-session, Batter)
- For each n3-w*.js and n4-w*.js entry:
  - Find matching GrammarGlobal entry
  - Create lens entry with `global_grammar_id`, `raw`, `desc`, `examples`
  - Preserve `week`, `day` location data
- Output: `grammar-lens-sm-n3.js`, `grammar-lens-sm-n4.js`
- Retire old w files

### Phase 5: Grammar Lens Build — Irodori + Minna (Tier L per book)
- Create grammar lens files for existing book content
- Link each grammar teaching moment to Global IDs

### Phase 6: Track Curation (Tier M — Fluffy collaboration)
- Curate Freeway Track items (survival-first ordering)
- Auto-generate JLPT Track items from Global (ordered by `jlpt_sub`)
- Auto-generate Book Track items from lens files

### Phase 7: Bank Soal Rebuild (DEFERRED)
- Rebuilt from scratch using new architecture
- Engines generate questions from Global data
- Separate discussion per Nugget-san

## 9.2 — What Stays vs What's Rebuilt

| Component | Status |
|---|---|
| `vocab-n5.js` content | STAYS — ID format updated only |
| `vocab-n4.js` content | STAYS — ID format updated only |
| `grammar-n5.js` content | STAYS — ID format + `cat` values updated |
| `grammar-n4.js` content | STAYS — ID format + `cat` values updated |
| `grammar-n3.js` content | STAYS — ID format + `cat` values updated |
| `n3-w*.js` / `n4-w*.js` content | MIGRATED to grammar lens, then retired |
| `bank-soal*.js` | DEFERRED — deleted now, rebuilt later |
| `vocab-index.js` | UPDATED for new paths + 5-digit IDs |
| `grammar/index.js` + `dummy.js` | REPLACED by `grammar-index.js` |
| `book-irodori-*.js` / `book-minna-*.js` | MOVED to new paths + renamed |
| `conjugation_engine_consolidated_v1.json` | STAYS — separate concern |
| Taxonomy Master v2 | RETAINED — L1 values are canonical |
| Curriculum Proposal v2 | SUPERSEDED by this document |

---

# PART 10 — LOCKED DECISIONS

| Decision | Status |
|---|---|
| One exhaustive database + N study tracks (replaces 3-layer system) | 🔒 LOCKED |
| 5-digit zero-padded IDs everywhere | 🔒 LOCKED |
| Grammar Book Lens MUST reference `global_grammar_id` | 🔒 LOCKED |
| Taxonomy v2 L1 values as canonical `cat`/`pos`/`domain` | 🔒 LOCKED |
| 34 canonical grammar `cat` values (Taxonomy v2 B.1) | 🔒 LOCKED |
| File structure: `books/{publisher}/` subdirectories | 🔒 LOCKED |
| Book display order: Irodori → Soumatome → Minna → others | 🔒 LOCKED |
| Bank soal rebuilt from scratch (DEFERRED) | 🔒 LOCKED |
| Engines (conjugation, quiz) are computation layer, not content | 🔒 LOCKED |
| `confusion_pairs` bidirectional hard-fail validation | 🔒 LOCKED |
| `jlpt: 'beyond'` accepted for above-N1 content | 🔒 LOCKED |
| `register: 'literary'` accepted for classical Japanese | 🔒 LOCKED |
| Dual-Axis Architecture (JLPT level × register) retained | 🔒 LOCKED |
| Clean Slate Doctrine + atomic migration per level | 🔒 LOCKED |
| `provenance` field required on all entries | 🔒 LOCKED |

---

# APPENDIX A — CAPACITY PLANNING

Based on research findings, maximum scope per level:

| Level | Vocab (target) | Grammar (target) | Kanji (future) |
|---|---|---|---|
| N5 | ~800 | ~80 | ~100 |
| N4 | ~1,500 | ~130 | ~300 |
| N3 | ~3,750 | ~180 | ~650 |
| N2 | ~6,000 | ~200 | ~1,000 |
| N1 | ~10,000 | ~250 | ~2,136 |
| Beyond | open | open | — |
| **Total** | **~22,050** | **~840** | **~4,186** |

5-digit IDs accommodate up to 99,999 entries per level — future-proof.

---

# APPENDIX B — AGENT RESPONSIBILITY MATRIX (updated)

| Agent | Architecture v3 Role |
|---|---|
| **A1 Crispy** | Merge controller, track curation, grammar-index.js, file restructure |
| **A2 Juicy** | VocabGlobal schema compliance, ID migration, provenance + confusion_pairs |
| **A3 Saucy** | Vocab Book Lens + Grammar Book Lens (book-faithful content) |
| **A4 Batter** | GrammarGlobal schema compliance, `cat` migration, ID migration |
| **A5 Golden** | UI updates for tracks, book menu order |
| **A6 Crunchy** | QA per standard flow |
| **A7 Spicy** | Validation scripts: ID format, `cat` values, confusion_pairs bidirectionality |
| **A8 Fluffy** | Track curation advisor (Freeway ordering), curriculum gap analysis |
| **A9 Savory** | Analytics on track usage, coverage gaps |

---

*NUGGET-NIHONGO-ARCHITECTURE-v3.md*
*Authored: A1 Crispy 🥐 — 1 April 2026*
*Approved: Nugget-san — 1 April 2026*
*Supersedes: _schema.md, _schema-vocab.md, CURRICULUM-PROPOSAL-TASK-FLUFFY-1-v2.md*
*Retains: NUGGET-NIHONGO-TAXONOMY-MASTER-v2.md (referenced, not replaced)*
