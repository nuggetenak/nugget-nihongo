// ══════════════════════════════════════════════════════════════════
//  kanjiManager.ts — Master Kanji Database & Stroke Order Loader
//  Nugget Nihongo · 2,383 Kanji across JLPT N5–N1, SVG Strokes & Book Lenses
// ══════════════════════════════════════════════════════════════════

export interface MasterKanjiItem {
  id: string;
  character: string;
  unicode: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  strokes: number;
  grade: number;
  freq_rank: number | null;
  radical: {
    character: string;
    number: number;
    strokes: number;
    name_ja: string;
    name_id: string;
  };
  readings: {
    onyomi: string[];
    kunyomi: string[];
    nanori?: string[];
  };
  meanings: {
    id: string[];
    en: string[];
  };
  mnemonic?: {
    components: string[];
    hint_id: string;
  };
  compounds?: {
    word: string;
    reading: string;
    meaning_id: string;
  }[];
}

export interface KanjiStrokePaths {
  character: string;
  unicode: string;
  strokes: number;
  paths: string[];
}

// Memory caches
const kanjiLevelCache: Record<string, MasterKanjiItem[]> = {};
const strokeCache: Record<string, Record<string, KanjiStrokePaths>> = {};
let masterIndexCache: Record<string, any> | null = null;

/**
 * Dynamically load master search index
 */
export async function loadMasterKanjiIndex(): Promise<Record<string, any>> {
  if (masterIndexCache) return masterIndexCache;
  if (typeof window !== 'undefined' && (window as any).nuggetKanjiIndex) {
    masterIndexCache = (window as any).nuggetKanjiIndex;
    return masterIndexCache!;
  }

  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve({});
      return;
    }
    const script = document.createElement('script');
    script.src = '/data/staged-expansion/kanji/kanji-index.js';
    script.async = true;
    script.onload = () => {
      masterIndexCache = (window as any).nuggetKanjiIndex || {};
      resolve(masterIndexCache!);
    };
    script.onerror = () => {
      console.warn('[kanjiManager] Failed to load kanji-index.js');
      resolve({});
    };
    document.head.appendChild(script);
  });
}

/**
 * Load full enriched kanji for a given level (n5, n4, n3, n2, n1)
 */
export async function loadKanjiByLevel(
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1'
): Promise<MasterKanjiItem[]> {
  const normalizedLevel = level.toLowerCase();
  if (kanjiLevelCache[normalizedLevel]) {
    return kanjiLevelCache[normalizedLevel];
  }

  const globalVarName = `nuggetKanji${normalizedLevel.toUpperCase()}`;
  if (typeof window !== 'undefined' && (window as any)[globalVarName]) {
    kanjiLevelCache[normalizedLevel] = (window as any)[globalVarName];
    return kanjiLevelCache[normalizedLevel];
  }

  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve([]);
      return;
    }
    const script = document.createElement('script');
    script.src = `/data/staged-expansion/kanji/kanji-${normalizedLevel}.js`;
    script.async = true;
    script.onload = () => {
      const data = (window as any)[globalVarName] || [];
      kanjiLevelCache[normalizedLevel] = data;
      resolve(data);
    };
    script.onerror = () => {
      console.warn(`[kanjiManager] Failed to load kanji-${normalizedLevel}.js`);
      resolve([]);
    };
    document.head.appendChild(script);
  });
}

/**
 * Load vector SVG stroke paths for a level
 */
export async function loadKanjiStrokes(
  level: 'n5' | 'n4' | 'n3' | 'n2' | 'n1'
): Promise<Record<string, KanjiStrokePaths>> {
  const normalizedLevel = level.toLowerCase();
  if (strokeCache[normalizedLevel]) {
    return strokeCache[normalizedLevel];
  }

  const globalVarName = `nuggetKanjiStrokes${normalizedLevel.toUpperCase()}`;
  if (typeof window !== 'undefined' && (window as any)[globalVarName]) {
    strokeCache[normalizedLevel] = (window as any)[globalVarName];
    return strokeCache[normalizedLevel];
  }

  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve({});
      return;
    }
    const script = document.createElement('script');
    script.src = `/data/staged-expansion/kanji/strokes/kanji-strokes-${normalizedLevel}.js`;
    script.async = true;
    script.onload = () => {
      const data = (window as any)[globalVarName] || {};
      strokeCache[normalizedLevel] = data;
      resolve(data);
    };
    script.onerror = () => {
      console.warn(`[kanjiManager] Failed to load kanji-strokes-${normalizedLevel}.js`);
      resolve({});
    };
    document.head.appendChild(script);
  });
}

/**
 * Load textbook progression lens (genki, minna, soumatome)
 */
const bookLensCache: Record<string, any> = {};

export async function loadKanjiBookLens(
  bookId: 'genki' | 'minna' | 'soumatome'
): Promise<any | null> {
  if (bookLensCache[bookId]) return bookLensCache[bookId];

  const globalVarMap: Record<string, string> = {
    genki: 'kanjiLensGenki',
    minna: 'kanjiLensMinna',
    soumatome: 'kanjiLensSoumatome'
  };
  const globalVarName = globalVarMap[bookId];

  if (typeof window !== 'undefined' && (window as any)[globalVarName]) {
    bookLensCache[bookId] = (window as any)[globalVarName];
    return bookLensCache[bookId];
  }

  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(null);
      return;
    }
    const script = document.createElement('script');
    script.src = `/data/staged-expansion/kanji/books/kanji-lens-${bookId}.js`;
    script.async = true;
    script.onload = () => {
      const data = (window as any)[globalVarName] || null;
      bookLensCache[bookId] = data;
      resolve(data);
    };
    script.onerror = () => {
      console.warn(`[kanjiManager] Failed to load kanji-lens-${bookId}.js`);
      resolve(null);
    };
    document.head.appendChild(script);
  });
}

/**
 * Single kanji lookup by character (O(1) from master index)
 */
export async function lookupKanjiCharacter(char: string): Promise<any | null> {
  const index = await loadMasterKanjiIndex();
  return index[char] || null;
}

/**
 * Fetch stroke order path data for a specific character
 */
export async function getKanjiStrokeData(char: string): Promise<KanjiStrokePaths | null> {
  const meta = await lookupKanjiCharacter(char);
  if (!meta || !meta.level) return null;
  const levelKey = meta.level.toLowerCase() as 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  const strokes = await loadKanjiStrokes(levelKey);
  return strokes[char] || null;
}
