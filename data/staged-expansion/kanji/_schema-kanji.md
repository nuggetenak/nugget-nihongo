# Nugget Nihongo — Master Kanji Database & Stroke Schema Specification
**Version**: 2.0.0  
**Status**: Staged Expansion (`public/data/staged-expansion/kanji/`)  
**Legal Compliance**: 100% Idea-Expression Distinction & Open Attribution Compliant

---

## 1. Overview & Architecture

The Nugget Nihongo Kanji System provides a comprehensive, pedagogically structured Kanji learning engine from **JLPT N5 through N1** (2,383 total kanji). It combines:
1. **Master Kanji Database**: Enriched lexical and pedagogical records (Onyomi, Kunyomi, Indonesian & English meanings, 214 Kangxi Radicals, stroke counts, school grade, corpus frequency, mnemonics, and compound words/jukugo).
2. **Offline Vector Stroke Paths**: Full SVG path definitions (`d="..."`) extracted from KanjiVG, organized into separate per-level bundles so the PWA can render smooth stroke order animations and touch-tracing canvases without heavy network latency.
3. **Authentic Book Kanji Lenses**: Curricular mappings for major textbook series (GENKI I & II, Minna no Nihongo Shokyuu I & II, and Nihongo Soumatome N5–N1) allowing learners to study kanji in the exact progression of their physical books.

---

## 2. Directory Layout

All kanji assets reside in the staged expansion area to preserve main codebase stability:

```text
public/data/staged-expansion/kanji/
├── _schema-kanji.md                         # This specification
├── kanji-n5.json / .js                      # 84 N5 Kanji (Full Enriched Record)
├── kanji-n4.json / .js                      # 169 N4 Kanji
├── kanji-n3.json / .js                      # 387 N3 Kanji
├── kanji-n2.json / .js                      # 398 N2 Kanji
├── kanji-n1.json / .js                      # 1,345 N1 Kanji
├── kanji-index.js                           # Master lookup index (character -> id, level, strokes, meanings)
├── strokes/
│   ├── kanji-strokes-n5.json / .js          # Vector SVG stroke paths for N5
│   ├── kanji-strokes-n4.json / .js          # Vector SVG stroke paths for N4
│   ├── kanji-strokes-n3.json / .js          # Vector SVG stroke paths for N3
│   ├── kanji-strokes-n2.json / .js          # Vector SVG stroke paths for N2
│   └── kanji-strokes-n1.json / .js          # Vector SVG stroke paths for N1
└── books/
    ├── kanji-lens-genki.js                  # Genki I & II Kanji (Chapters 3–23, 317 kanji)
    ├── kanji-lens-minna.js                  # Minna no Nihongo Kanji I & II (Chapters 1–50)
    └── kanji-lens-soumatome.js              # Soumatome Kanji N5 to N1 (Weekly progressions)
```

---

## 3. Data Schema & TypeScript Interfaces

### 3.1. Enriched Kanji Record (`EnrichedKanji`)

Each kanji entry in `kanji-n{5..1}.json` and `kanji-n{5..1}.js` adheres to the following interface:

```typescript
export interface EnrichedKanji {
  /** Unique deterministic identifier, e.g. "kj-n5-001" */
  id: string;

  /** Kanji character in UTF-8 */
  character: string;

  /** 5-digit lowercase hex Unicode codepoint, e.g. "065e5" */
  unicode: string;

  /** JLPT level tag */
  level: "N5" | "N4" | "N3" | "N2" | "N1";

  /** Total stroke count */
  strokes: number;

  /** Elementary/secondary school grade (1–6 = Kyōiku, 8 = Secondary Jōyō, 9 = Jinmeiyō) */
  grade: number;

  /** Newspaper frequency ranking (1 = most common, null if unranked) */
  freq_rank: number | null;

  /** Primary Kangxi radical information */
  radical: {
    character: string;       // e.g. "日"
    number: number;          // 1 to 214 Kangxi radical number
    strokes: number;         // Radical stroke count
    name_ja: string;         // Japanese name, e.g. "ひ・にち"
    name_id: string;         // Indonesian descriptive name, e.g. "Matahari / Hari"
  };

  /** Authentic readings */
  readings: {
    onyomi: string[];        // Standard Katakana on-readings, e.g. ["ニチ", "ジツ"]
    kunyomi: string[];       // Standard Hiragana kun-readings, e.g. ["ひ", "-び", "-か"]
    nanori?: string[];       // Traditional name readings
  };

  /** Multilingual meanings */
  meanings: {
    id: string[];            // Primary Indonesian definitions, e.g. ["hari", "matahari", "Jepang"]
    en: string[];            // English glosses, e.g. ["day", "sun", "Japan"]
  };

  /** Pedagogical mnemonic association */
  mnemonic: {
    components: string[];    // Component names / radicals
    hint_id: string;         // Creative visual memory cue in Indonesian
  };

  /** Common compound words / Jukugo */
  jukugo: Array<{
    word: string;            // Japanese compound, e.g. "今日"
    reading: string;         // Kana reading, e.g. "きょう"
    meaning_id: string;      // Indonesian meaning, e.g. "hari ini"
  }>;
}
```

### 3.2. Stroke Vector Bundle (`KanjiStrokeBundle`)

Stroke order data in `strokes/kanji-strokes-n{5..1}.json` and `.js`:

```typescript
export interface KanjiStrokeEntry {
  character: string;
  unicode: string;
  strokes: number;
  paths: string[];           // Array of SVG path 'd' attribute strings, ordered 1..N
}

export type KanjiStrokeBundle = Record<string, KanjiStrokeEntry>;
```

### 3.3. Book Kanji Lens (`KanjiBookLens`)

Book-aligned study lenses in `books/kanji-lens-*.js`:

```typescript
export interface KanjiBookLens {
  meta: {
    book_id: string;         // e.g. "genki"
    title: string;           // "GENKI I & II: Kanji"
    title_ja: string;        // "初級日本語 げんき 漢字"
    total_kanji: number;     // 317
    license: string;
    description_id: string;
  };
  units: Record<string, {
    title: string;           // "Lesson 3: Everyday Life (日常の生活)"
    kanji_count: number;
    characters: string[];    // ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "円", "時"]
    ids: string[];           // ["kj-n5-001", "kj-n5-002", ...]
  }>;
}
```

---

## 4. Legal & Open Source Compliance

All data generation and enrichment strictly follows the **Idea-Expression Distinction** doctrine:
- Kanji glyphs, Kangxi radicals, stroke counts, stroke orders, and readings are objective factual linguistic realities and public domain.
- Vector stroke paths are sourced from the **KanjiVG project** under the Creative Commons Attribution-Share Alike 3.0 license.
- All Indonesian definitions, pedagogical mnemonics, and curated compound descriptions are 100% original expressions authored for Nugget Nihongo.
