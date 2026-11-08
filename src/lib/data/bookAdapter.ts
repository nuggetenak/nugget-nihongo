// ══════════════════════════════════════════════════════════════════
//  bookAdapter.ts — Unified Textbook Track & Curricular Bridge
//  Klaster 5: Jalur 9 Buku Teks Pendamping (Latent Module)
//  Connects Minna no Nihongo I & II (Chapters 1–50) with Nugget Nihongo's
//  canonical N5/N4 Lexical, Grammatical, Pedagogical, and FSRS engines.
// ══════════════════════════════════════════════════════════════════

import type { NormalizedVocab, NormalizedGrammar, BookData, BookUnit } from './dataManager.ts';
import { loadVocab, loadGrammar } from './dataManager.ts';
import { BOOK_PEDAGOGY_REGISTRY } from './bookPedagogyMatrix.ts';

export interface MinnaChapter {
  chapter: number;
  volume: 1 | 2;
  topic: string;
  vocab_ids: string[];
  grammar_ids: string[];
  pedagogy?: {
    focus: string;
    whyNow: string;
    contrastInsight: string;
  };
}

export interface MinnaStudyStage {
  stage: 'intro' | 'drill' | 'fsrs';
  title: string;
  count: number;
  description: string;
}

export interface MinnaStats {
  totalChapters: number;
  volume1Chapters: number;
  volume2Chapters: number;
  totalVocabReferences: number;
  totalGrammarReferences: number;
  uniqueVocabIds: number;
  uniqueGrammarIds: number;
  n5VocabCount: number;
  n4VocabCount: number;
  n5GrammarCount: number;
  n4GrammarCount: number;
}

let cachedMinna1: BookData | null = null;
let cachedMinna2: BookData | null = null;

/**
 * Load script helper supporting browser window
 */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      resolve();
      return;
    }
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Dual-runtime loader for Minna no Nihongo volumes (1 or 2)
 */
export async function loadMinnaBook(volume: 1 | 2): Promise<BookData> {
  if (volume === 1 && cachedMinna1) return cachedMinna1;
  if (volume === 2 && cachedMinna2) return cachedMinna2;

  // 1. Browser runtime check
  if (typeof window !== 'undefined') {
    const varKey = volume === 1 ? 'bookMinna1' : 'bookMinna2';
    const raw = (window as any)[varKey];
    if (raw && raw.units) {
      if (volume === 1) cachedMinna1 = raw;
      else cachedMinna2 = raw;
      return raw;
    }

    try {
      await loadScript(`/data/books/book-minna-${volume}.js`);
      const loaded = (window as any)[varKey];
      if (loaded && loaded.units) {
        if (volume === 1) cachedMinna1 = loaded;
        else cachedMinna2 = loaded;
        return loaded;
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load /data/books/book-minna-${volume}.js in browser:`, err);
    }
  }

  // 2. Node.js testing/SSR runtime: direct filesystem read
  if (typeof window === 'undefined') {
    try {
      const fsMod = await import('fs');
      const pathMod = await import('path');
      const vmMod = await import('vm');

      const candidatePaths = [
        pathMod.resolve(process.cwd(), `public/data/books/book-minna-${volume}.js`),
        pathMod.resolve(process.cwd(), `../public/data/books/book-minna-${volume}.js`),
      ];

      for (const cp of candidatePaths) {
        if (fsMod.existsSync(cp)) {
          const content = fsMod.readFileSync(cp, 'utf8');
          const sandbox: any = { window: {} };
          vmMod.runInNewContext(content, sandbox);
          const varKey = volume === 1 ? 'bookMinna1' : 'bookMinna2';
          const loaded = sandbox.window[varKey] || sandbox[varKey];
          if (loaded && loaded.units) {
            if (volume === 1) cachedMinna1 = loaded;
            else cachedMinna2 = loaded;
            return loaded;
          }
        }
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Minna volume ${volume} via fs/vm:`, err);
    }
  }

  // Fallback empty structure
  const fallback: BookData = {
    meta: {
      book: `minna-no-nihongo-${volume}`,
      title: `Minna no Nihongo Shokyuu ${volume === 1 ? 'I' : 'II'}`,
      publisher: '3A Corporation',
      chapters: 25,
      jlpt_range: ['n5', 'n4'],
    },
    units: {},
  };
  return fallback;
}

/**
 * Get all 50 Minna no Nihongo chapters unified in sequential order (1 to 50)
 */
export async function getAllMinnaChapters(): Promise<MinnaChapter[]> {
  const [b1, b2] = await Promise.all([loadMinnaBook(1), loadMinnaBook(2)]);
  const chapters: MinnaChapter[] = [];
  const minnaPedagogy = BOOK_PEDAGOGY_REGISTRY['minna'];

  // Volume 1: Chapters 1 to 25
  for (let ch = 1; ch <= 25; ch++) {
    const u: BookUnit = b1.units[ch];
    if (u) {
      chapters.push({
        chapter: ch,
        volume: 1,
        topic: u.topic,
        vocab_ids: u.vocab_ids || [],
        grammar_ids: u.grammar_ids || [],
        pedagogy: minnaPedagogy?.chapterRationales?.[ch],
      });
    }
  }

  // Volume 2: Chapters 26 to 50
  for (let ch = 26; ch <= 50; ch++) {
    const u: BookUnit = b2.units[ch];
    if (u) {
      chapters.push({
        chapter: ch,
        volume: 2,
        topic: u.topic,
        vocab_ids: u.vocab_ids || [],
        grammar_ids: u.grammar_ids || [],
        pedagogy: minnaPedagogy?.chapterRationales?.[ch],
      });
    }
  }

  return chapters;
}

/**
 * Get a specific chapter by number (1 to 50)
 */
export async function getMinnaChapter(chapterNumber: number): Promise<MinnaChapter | null> {
  if (chapterNumber < 1 || chapterNumber > 50) return null;
  const volume: 1 | 2 = chapterNumber <= 25 ? 1 : 2;
  const book = await loadMinnaBook(volume);
  const u: BookUnit = book.units[chapterNumber];
  if (!u) return null;

  const minnaPedagogy = BOOK_PEDAGOGY_REGISTRY['minna'];
  return {
    chapter: chapterNumber,
    volume,
    topic: u.topic,
    vocab_ids: u.vocab_ids || [],
    grammar_ids: u.grammar_ids || [],
    pedagogy: minnaPedagogy?.chapterRationales?.[chapterNumber],
  };
}

/**
 * Cross-reference vocabulary IDs for a chapter against canonical N5/N4 vocabulary
 */
export async function resolveMinnaChapterVocab(chapterNumber: number): Promise<{
  chapter: number;
  totalVocabIds: number;
  resolvedVocab: NormalizedVocab[];
  coverageRate: number;
}> {
  const ch = await getMinnaChapter(chapterNumber);
  if (!ch) {
    return { chapter: chapterNumber, totalVocabIds: 0, resolvedVocab: [], coverageRate: 0 };
  }

  const [n5Vocab, n4Vocab] = await Promise.all([loadVocab('n5'), loadVocab('n4')]);
  const vocabMap = new Map<string, NormalizedVocab>();
  n5Vocab.forEach((v) => vocabMap.set(v.id, v));
  n4Vocab.forEach((v) => vocabMap.set(v.id, v));

  const resolved: NormalizedVocab[] = [];
  ch.vocab_ids.forEach((id) => {
    const entry = vocabMap.get(id);
    if (entry) resolved.push(entry);
  });

  const coverageRate = ch.vocab_ids.length > 0 ? (resolved.length / ch.vocab_ids.length) * 100 : 0;
  return {
    chapter: chapterNumber,
    totalVocabIds: ch.vocab_ids.length,
    resolvedVocab: resolved,
    coverageRate: Math.round(coverageRate * 10) / 10,
  };
}

/**
 * Cross-reference grammar IDs for a chapter against canonical N5/N4 grammar points
 */
export async function resolveMinnaChapterGrammar(chapterNumber: number): Promise<{
  chapter: number;
  totalGrammarIds: number;
  resolvedGrammar: NormalizedGrammar[];
  coverageRate: number;
}> {
  const ch = await getMinnaChapter(chapterNumber);
  if (!ch) {
    return { chapter: chapterNumber, totalGrammarIds: 0, resolvedGrammar: [], coverageRate: 0 };
  }

  const [n5Grammar, n4Grammar] = await Promise.all([loadGrammar('n5'), loadGrammar('n4')]);
  const grammarMap = new Map<string, NormalizedGrammar>();
  n5Grammar.forEach((g) => grammarMap.set(g.id, g));
  n4Grammar.forEach((g) => grammarMap.set(g.id, g));

  const resolved: NormalizedGrammar[] = [];
  ch.grammar_ids.forEach((id) => {
    const entry = grammarMap.get(id);
    if (entry) resolved.push(entry);
  });

  const coverageRate = ch.grammar_ids.length > 0 ? (resolved.length / ch.grammar_ids.length) * 100 : 0;
  return {
    chapter: chapterNumber,
    totalGrammarIds: ch.grammar_ids.length,
    resolvedGrammar: resolved,
    coverageRate: Math.round(coverageRate * 10) / 10,
  };
}

/**
 * Map textbook lessons into Nugget Nihongo's 3-stage study loop:
 * 1. Introduction (Bunkei & Reibun)
 * 2. Drill (Renshuu B/C pattern substitution)
 * 3. FSRS Flashcards (Spaced Repetition retention)
 */
export function getMinnaStudyStages(
  chapterNumber: number,
  vocabCount: number,
  grammarCount: number
): { chapter: number; stages: MinnaStudyStage[] } {
  return {
    chapter: chapterNumber,
    stages: [
      {
        stage: 'intro',
        title: 'Pengenalan & Bunkei (文型・例文)',
        count: grammarCount,
        description: 'Pemahaman pola kalimat utama, partikel penanda, dan contoh autentik percakapan.',
      },
      {
        stage: 'drill',
        title: 'Drill Substitusi Renshuu B/C (練習B・C)',
        count: vocabCount + grammarCount,
        description: 'Latihan interaktif substitusi kata ganti untuk melatih refleks otomatisasi bicara.',
      },
      {
        stage: 'fsrs',
        title: 'Penguatan Memori FSRS v4.5',
        count: vocabCount,
        description: 'Penjadwalan retensi jangka panjang dengan interval memori adaptif FSRS.',
      },
    ],
  };
}

/**
 * Compute exhaustive cross-reference statistics across all 50 chapters
 */
export async function getMinnaTotalCoverageStats(): Promise<MinnaStats> {
  const chapters = await getAllMinnaChapters();
  let totalVocabReferences = 0;
  let totalGrammarReferences = 0;
  const uniqueVocabSet = new Set<string>();
  const uniqueGrammarSet = new Set<string>();

  let n5VocabCount = 0;
  let n4VocabCount = 0;
  let n5GrammarCount = 0;
  let n4GrammarCount = 0;

  chapters.forEach((ch) => {
    totalVocabReferences += ch.vocab_ids.length;
    totalGrammarReferences += ch.grammar_ids.length;

    ch.vocab_ids.forEach((id) => {
      uniqueVocabSet.add(id);
      if (id.startsWith('vg-n5-')) n5VocabCount++;
      else if (id.startsWith('vg-n4-')) n4VocabCount++;
    });

    ch.grammar_ids.forEach((id) => {
      uniqueGrammarSet.add(id);
      if (id.startsWith('gn5-')) n5GrammarCount++;
      else if (id.startsWith('gn4-')) n4GrammarCount++;
    });
  });

  return {
    totalChapters: chapters.length,
    volume1Chapters: chapters.filter((c) => c.volume === 1).length,
    volume2Chapters: chapters.filter((c) => c.volume === 2).length,
    totalVocabReferences,
    totalGrammarReferences,
    uniqueVocabIds: uniqueVocabSet.size,
    uniqueGrammarIds: uniqueGrammarSet.size,
    n5VocabCount,
    n4VocabCount,
    n5GrammarCount,
    n4GrammarCount,
  };
}

/**
 * Search Minna no Nihongo curriculum by topic, grammar pattern, vocab word/meaning, or keyword
 */
export async function searchMinnaCurriculum(query: string): Promise<
  Array<{
    chapter: number;
    volume: 1 | 2;
    topic: string;
    matchedVocab: string[];
    matchedGrammar: string[];
  }>
> {
  if (!query || typeof query !== 'string') return [];
  const q = query.toLowerCase().trim();
  const chapters = await getAllMinnaChapters();

  const [n5Vocab, n4Vocab, n5Grammar, n4Grammar] = await Promise.all([
    loadVocab('n5'),
    loadVocab('n4'),
    loadGrammar('n5'),
    loadGrammar('n4'),
  ]);

  const vocabMap = new Map<string, NormalizedVocab>();
  n5Vocab.forEach((v) => vocabMap.set(v.id, v));
  n4Vocab.forEach((v) => vocabMap.set(v.id, v));

  const grammarMap = new Map<string, NormalizedGrammar>();
  n5Grammar.forEach((g) => grammarMap.set(g.id, g));
  n4Grammar.forEach((g) => grammarMap.set(g.id, g));

  const results: Array<{
    chapter: number;
    volume: 1 | 2;
    topic: string;
    matchedVocab: string[];
    matchedGrammar: string[];
  }> = [];

  for (const ch of chapters) {
    const topicMatch = ch.topic.toLowerCase().includes(q);
    const matchedVocab: string[] = [];
    const matchedGrammar: string[] = [];

    ch.vocab_ids.forEach((id) => {
      if (id.toLowerCase().includes(q)) {
        matchedVocab.push(id);
        return;
      }
      const entry = vocabMap.get(id);
      if (
        entry &&
        (entry.meaning.toLowerCase().includes(q) ||
          entry.word.toLowerCase().includes(q) ||
          entry.reading.toLowerCase().includes(q) ||
          entry.romaji.toLowerCase().includes(q))
      ) {
        matchedVocab.push(`${entry.word} (${entry.meaning})`);
      }
    });

    ch.grammar_ids.forEach((id) => {
      if (id.toLowerCase().includes(q)) {
        matchedGrammar.push(id);
        return;
      }
      const entry = grammarMap.get(id);
      if (
        entry &&
        (entry.meaning.toLowerCase().includes(q) ||
          entry.pattern.toLowerCase().includes(q) ||
          entry.reading.toLowerCase().includes(q))
      ) {
        matchedGrammar.push(`${entry.pattern} (${entry.meaning})`);
      }
    });

    if (topicMatch || matchedVocab.length > 0 || matchedGrammar.length > 0) {
      results.push({
        chapter: ch.chapter,
        volume: ch.volume,
        topic: ch.topic,
        matchedVocab,
        matchedGrammar,
      });
    }
  }

  return results;
}

// ══════════════════════════════════════════════════════════════════
//  Irodori & Sou Matome Grammar Lens & Curricular Integrations
// ══════════════════════════════════════════════════════════════════

export type IrodoriVolume = 'a1' | 'a2-1' | 'a2-2';
export type SoumatomeLevel = 'n4' | 'n3';

export interface IrodoriLesson {
  lesson: number;
  volume: IrodoriVolume;
  topic: string;
  topic_id?: number;
  vocab_ids: string[];
  grammar_ids: string[];
  grammar_entries?: IrodoriGrammarEntry[];
}

export interface IrodoriGrammarEntry {
  id: string;
  global_grammar_id?: string;
  lesson: number;
  seq: number;
  pattern: string;
  raw: string;
  desc: string;
  examples: Array<{ jp: string; id: string }>;
  notes?: string;
}

export interface ResolvedIrodoriGrammar {
  id: string;
  globalId?: string;
  lesson: number;
  pattern: string;
  meaning: string;
  desc?: string;
  examples: Array<{ jp: string; id: string }>;
  jlptLevel?: string;
  isCanonicalLinked: boolean;
}

export interface SoumatomeGrammarEntry {
  id: string;
  global_grammar_id: string | null;
  week: number;
  day: number;
  seq: number;
  pattern: string;
  meaning: string;
  desc?: string;
  raw?: string;
  examples: Array<{ jp: string; id: string }>;
  notes?: string;
}

export interface SoumatomeWeekSchedule {
  week: number;
  title: string;
  days: Record<number, { day: number; entries: SoumatomeGrammarEntry[] }>;
}

export interface ResolvedSoumatomeGrammar {
  id: string;
  globalId: string | null;
  week: number;
  day: number;
  pattern: string;
  meaning: string;
  desc?: string;
  examples: Array<{ jp: string; id: string }>;
  jlptLevel: string;
  isCanonicalLinked: boolean;
}

export interface BookFsrsCard {
  id: string;
  front: string;
  back: string;
  reading?: string;
  sourceBook: string;
  unitLabel: string;
  tags: string[];
  initialStability: number;
  initialDifficulty: number;
}

// Caches for Irodori and Sou Matome
const cachedIrodoriBooks: Partial<Record<IrodoriVolume, BookData>> = {};
const cachedIrodoriLenses: Partial<Record<IrodoriVolume, { meta: any; entries: IrodoriGrammarEntry[] }>> = {};
const cachedSoumatomeLenses: Partial<Record<SoumatomeLevel, { meta: any; entries: SoumatomeGrammarEntry[] }>> = {};

/**
 * Load Irodori Book Data (Units & Vocabulary)
 */
export async function loadIrodoriBook(volume: IrodoriVolume): Promise<BookData> {
  if (cachedIrodoriBooks[volume]) return cachedIrodoriBooks[volume]!;

  const varCandidateKeys: Record<IrodoriVolume, string[]> = {
    'a1': ['bookIrodoriA1'],
    'a2-1': ['bookIrodoriA21', 'bookIrodoriA2_1'],
    'a2-2': ['bookIrodoriA22', 'bookIrodoriA2_2'],
  };
  const keys = varCandidateKeys[volume];

  if (typeof window !== 'undefined') {
    for (const k of keys) {
      const raw = (window as any)[k];
      if (raw && raw.units) {
        cachedIrodoriBooks[volume] = raw;
        return raw;
      }
    }
    try {
      await loadScript(`/data/books/book-irodori-${volume}.js`);
      for (const k of keys) {
        const loaded = (window as any)[k];
        if (loaded && loaded.units) {
          cachedIrodoriBooks[volume] = loaded;
          return loaded;
        }
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Irodori book in browser:`, err);
    }
  } else {
    try {
      const fsMod = await import('fs');
      const pathMod = await import('path');
      const vmMod = await import('vm');
      const candidatePaths = [
        pathMod.resolve(process.cwd(), `public/data/books/book-irodori-${volume}.js`),
        pathMod.resolve(process.cwd(), `../public/data/books/book-irodori-${volume}.js`),
      ];
      for (const cp of candidatePaths) {
        if (fsMod.existsSync(cp)) {
          const content = fsMod.readFileSync(cp, 'utf8');
          const sandbox: any = { window: {} };
          vmMod.runInNewContext(content, sandbox);
          for (const k of keys) {
            const loaded = sandbox.window[k] || sandbox[k];
            if (loaded && loaded.units) {
              cachedIrodoriBooks[volume] = loaded;
              return loaded;
            }
          }
        }
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Irodori book via fs/vm:`, err);
    }
  }

  const fallback: BookData = {
    meta: {
      book: `irodori-${volume}`,
      title: `Irodori: Japanese for Life in Japan — ${volume.toUpperCase()}`,
      publisher: 'Japan Foundation',
      chapters: 18,
      jlpt_range: volume === 'a1' ? ['n5'] : ['n5', 'n4'],
    },
    units: {},
  };
  return fallback;
}

/**
 * Load Irodori Grammar Lens (Lessons 1-18 Can-Do grammar points)
 */
export async function loadIrodoriGrammarLens(
  volume: IrodoriVolume
): Promise<{ meta: any; entries: IrodoriGrammarEntry[] }> {
  if (cachedIrodoriLenses[volume]) return cachedIrodoriLenses[volume]!;

  const varMap: Record<IrodoriVolume, string> = {
    'a1': 'grammarLensIrodoriA1',
    'a2-1': 'grammarLensIrodoriA21',
    'a2-2': 'grammarLensIrodoriA22',
  };
  const varKey = varMap[volume];

  if (typeof window !== 'undefined') {
    const raw = (window as any)[varKey];
    if (raw && raw.entries) {
      cachedIrodoriLenses[volume] = raw;
      return raw;
    }
    try {
      await loadScript(`/data/books/irodori/grammar-lens-ir-${volume}.js`);
      const loaded = (window as any)[varKey];
      if (loaded && loaded.entries) {
        cachedIrodoriLenses[volume] = loaded;
        return loaded;
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Irodori lens in browser:`, err);
    }
  } else {
    try {
      const fsMod = await import('fs');
      const pathMod = await import('path');
      const vmMod = await import('vm');
      const candidatePaths = [
        pathMod.resolve(process.cwd(), `public/data/books/irodori/grammar-lens-ir-${volume}.js`),
        pathMod.resolve(process.cwd(), `../public/data/books/irodori/grammar-lens-ir-${volume}.js`),
      ];
      for (const cp of candidatePaths) {
        if (fsMod.existsSync(cp)) {
          const content = fsMod.readFileSync(cp, 'utf8');
          const sandbox: any = { window: {} };
          vmMod.runInNewContext(content, sandbox);
          const loaded = sandbox.window[varKey] || sandbox[varKey];
          if (loaded && loaded.entries) {
            cachedIrodoriLenses[volume] = loaded;
            return loaded;
          }
        }
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Irodori lens via fs/vm:`, err);
    }
  }

  const fallback = { meta: { book: `irodori-${volume}` }, entries: [] };
  return fallback;
}

/**
 * Get all Irodori lessons across one or all volumes
 */
export async function getAllIrodoriLessons(volume?: IrodoriVolume): Promise<IrodoriLesson[]> {
  const volumes: IrodoriVolume[] = volume ? [volume] : ['a1', 'a2-1', 'a2-2'];
  const lessons: IrodoriLesson[] = [];

  for (const vol of volumes) {
    const [bookData, lensData] = await Promise.all([loadIrodoriBook(vol), loadIrodoriGrammarLens(vol)]);
    const entriesByLesson = new Map<number, IrodoriGrammarEntry[]>();
    lensData.entries.forEach((e) => {
      const list = entriesByLesson.get(e.lesson) || [];
      list.push(e);
      entriesByLesson.set(e.lesson, list);
    });

    for (let l = 1; l <= 18; l++) {
      const u = bookData.units[l];
      lessons.push({
        lesson: l,
        volume: vol,
        topic: u?.topic || `Irodori ${vol.toUpperCase()} Lesson ${l}`,
        topic_id: (u as any)?.topic_id,
        vocab_ids: u?.vocab_ids || [],
        grammar_ids: u?.grammar_ids || [],
        grammar_entries: entriesByLesson.get(l) || [],
      });
    }
  }

  return lessons;
}

/**
 * Resolve Irodori Grammar Entries against canonical grammar repository
 */
export async function resolveIrodoriGrammarEntries(
  volume: IrodoriVolume,
  lessonNumber?: number
): Promise<ResolvedIrodoriGrammar[]> {
  const lens = await loadIrodoriGrammarLens(volume);
  const [n5Grammar, n4Grammar] = await Promise.all([loadGrammar('n5'), loadGrammar('n4')]);
  const canonicalMap = new Map<string, NormalizedGrammar>();
  n5Grammar.forEach((g) => canonicalMap.set(g.id, g));
  n4Grammar.forEach((g) => canonicalMap.set(g.id, g));

  let entries = lens.entries;
  if (lessonNumber) {
    entries = entries.filter((e) => e.lesson === lessonNumber);
  }

  return entries.map((e) => {
    const canonical = e.global_grammar_id ? canonicalMap.get(e.global_grammar_id) : undefined;
    return {
      id: e.id,
      globalId: e.global_grammar_id,
      lesson: e.lesson,
      pattern: e.pattern,
      meaning: canonical?.meaning || e.desc || e.raw,
      desc: e.desc,
      examples: e.examples || (canonical ? canonical.examples : []),
      jlptLevel: canonical?.level || (volume === 'a1' ? 'n5' : 'n4'),
      isCanonicalLinked: !!canonical,
    };
  });
}

/**
 * Compute Irodori Can-Do Framework metrics
 */
export async function getIrodoriCanDoMetrics(): Promise<{
  totalEntries: number;
  a1Entries: number;
  a21Entries: number;
  a22Entries: number;
  resolvedCount: number;
  resolutionRate: number;
}> {
  const [a1Lens, a21Lens, a22Lens] = await Promise.all([
    loadIrodoriGrammarLens('a1'),
    loadIrodoriGrammarLens('a2-1'),
    loadIrodoriGrammarLens('a2-2'),
  ]);

  const [a1Res, a21Res, a22Res] = await Promise.all([
    resolveIrodoriGrammarEntries('a1'),
    resolveIrodoriGrammarEntries('a2-1'),
    resolveIrodoriGrammarEntries('a2-2'),
  ]);

  const totalEntries = a1Lens.entries.length + a21Lens.entries.length + a22Lens.entries.length;
  const resolvedCount =
    a1Res.filter((r) => r.isCanonicalLinked).length +
    a21Res.filter((r) => r.isCanonicalLinked).length +
    a22Res.filter((r) => r.isCanonicalLinked).length;

  return {
    totalEntries,
    a1Entries: a1Lens.entries.length,
    a21Entries: a21Lens.entries.length,
    a22Entries: a22Lens.entries.length,
    resolvedCount,
    resolutionRate: totalEntries > 0 ? Math.round((resolvedCount / totalEntries) * 1000) / 10 : 0,
  };
}

/**
 * Load Sou Matome Grammar Lens (N4 or N3)
 */
export async function loadSoumatomeGrammarLens(
  level: SoumatomeLevel
): Promise<{ meta: any; entries: SoumatomeGrammarEntry[] }> {
  if (cachedSoumatomeLenses[level]) return cachedSoumatomeLenses[level]!;

  const varMap: Record<SoumatomeLevel, string> = {
    n4: 'grammarLensSoumatomeN4',
    n3: 'grammarLensSoumatomeN3',
  };
  const varKey = varMap[level];

  if (typeof window !== 'undefined') {
    const raw = (window as any)[varKey];
    if (raw && raw.entries) {
      cachedSoumatomeLenses[level] = raw;
      return raw;
    }
    try {
      await loadScript(`/data/books/soumatome/grammar-lens-sm-${level}.js`);
      const loaded = (window as any)[varKey];
      if (loaded && loaded.entries) {
        cachedSoumatomeLenses[level] = loaded;
        return loaded;
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Soumatome lens in browser:`, err);
    }
  } else {
    try {
      const fsMod = await import('fs');
      const pathMod = await import('path');
      const vmMod = await import('vm');
      const candidatePaths = [
        pathMod.resolve(process.cwd(), `public/data/books/soumatome/grammar-lens-sm-${level}.js`),
        pathMod.resolve(process.cwd(), `../public/data/books/soumatome/grammar-lens-sm-${level}.js`),
      ];
      for (const cp of candidatePaths) {
        if (fsMod.existsSync(cp)) {
          const content = fsMod.readFileSync(cp, 'utf8');
          const sandbox: any = { window: {} };
          vmMod.runInNewContext(content, sandbox);
          const loaded = sandbox.window[varKey] || sandbox[varKey];
          if (loaded && loaded.entries) {
            cachedSoumatomeLenses[level] = loaded;
            return loaded;
          }
        }
      }
    } catch (err) {
      console.warn(`[bookAdapter] Failed to load Soumatome lens via fs/vm:`, err);
    }
  }

  const fallback = { meta: { book: `soumatome-${level}` }, entries: [] };
  return fallback;
}

/**
 * Get Sou Matome Weekly 6-Week Cramming Schedule
 */
export async function getSoumatomeWeeklySchedule(level: SoumatomeLevel): Promise<SoumatomeWeekSchedule[]> {
  const lens = await loadSoumatomeGrammarLens(level);
  const weekMap = new Map<number, SoumatomeWeekSchedule>();

  for (let w = 1; w <= 6; w++) {
    weekMap.set(w, {
      week: w,
      title: `Minggu ${w} — Sou Matome ${level.toUpperCase()}`,
      days: {},
    });
  }

  lens.entries.forEach((e) => {
    const sched = weekMap.get(e.week);
    if (sched) {
      if (!sched.days[e.day]) {
        sched.days[e.day] = { day: e.day, entries: [] };
      }
      sched.days[e.day].entries.push(e);
    }
  });

  return Array.from(weekMap.values());
}

/**
 * Resolve Sou Matome Grammar Entries against canonical repository
 */
export async function resolveSoumatomeGrammarEntries(
  level: SoumatomeLevel,
  week?: number,
  day?: number
): Promise<ResolvedSoumatomeGrammar[]> {
  const lens = await loadSoumatomeGrammarLens(level);
  const canonicalList = await loadGrammar(level);
  const canonicalMap = new Map<string, NormalizedGrammar>();
  canonicalList.forEach((g) => canonicalMap.set(g.id, g));

  let entries = lens.entries;
  if (week) {
    entries = entries.filter((e) => e.week === week);
  }
  if (day) {
    entries = entries.filter((e) => e.day === day);
  }

  return entries.map((e) => {
    const canonical = e.global_grammar_id ? canonicalMap.get(e.global_grammar_id) : undefined;
    return {
      id: e.id,
      globalId: e.global_grammar_id,
      week: e.week,
      day: e.day,
      pattern: e.pattern,
      meaning: canonical?.meaning || e.meaning,
      desc: e.desc || canonical?.desc,
      examples: e.examples || (canonical ? canonical.examples : []),
      jlptLevel: level,
      isCanonicalLinked: !!canonical,
    };
  });
}

/**
 * Get Sou Matome Coverage Statistics
 */
export async function getSoumatomeCoverageStats(): Promise<{
  totalEntries: number;
  n4Entries: number;
  n3Entries: number;
  linkedGlobalCount: number;
  selfContainedCount: number;
  totalWeeks: number;
}> {
  const [n4Lens, n3Lens] = await Promise.all([loadSoumatomeGrammarLens('n4'), loadSoumatomeGrammarLens('n3')]);
  const [n4Res, n3Res] = await Promise.all([
    resolveSoumatomeGrammarEntries('n4'),
    resolveSoumatomeGrammarEntries('n3'),
  ]);

  const totalEntries = n4Lens.entries.length + n3Lens.entries.length;
  const linkedGlobalCount =
    n4Res.filter((r) => r.isCanonicalLinked).length + n3Res.filter((r) => r.isCanonicalLinked).length;

  return {
    totalEntries,
    n4Entries: n4Lens.entries.length,
    n3Entries: n3Lens.entries.length,
    linkedGlobalCount,
    selfContainedCount: totalEntries - linkedGlobalCount,
    totalWeeks: 12, // 6 weeks for N4 + 6 weeks for N3
  };
}

/**
 * Generate FSRS-ready study cards from any textbook track
 */
export async function generateBookFsrsCards(
  bookType: 'minna' | 'irodori' | 'soumatome',
  options?: {
    chapterOrLesson?: number;
    week?: number;
    day?: number;
    volume?: string;
    level?: 'n4' | 'n3';
  }
): Promise<BookFsrsCard[]> {
  const cards: BookFsrsCard[] = [];

  if (bookType === 'minna') {
    const chNum = options?.chapterOrLesson || 1;
    const vocabRes = await resolveMinnaChapterVocab(chNum);
    vocabRes.resolvedVocab.forEach((v) => {
      cards.push({
        id: `card-minna-v-${v.id}`,
        front: v.word,
        back: v.meaning,
        reading: v.reading,
        sourceBook: 'Minna no Nihongo',
        unitLabel: `Bab ${chNum}`,
        tags: ['minna', `minna-ch-${chNum}`, v.level],
        initialStability: 2.5,
        initialDifficulty: 4.0,
      });
    });

    const grammarRes = await resolveMinnaChapterGrammar(chNum);
    grammarRes.resolvedGrammar.forEach((g) => {
      cards.push({
        id: `card-minna-g-${g.id}`,
        front: g.pattern,
        back: g.meaning,
        reading: g.reading,
        sourceBook: 'Minna no Nihongo',
        unitLabel: `Bab ${chNum}`,
        tags: ['minna', `minna-ch-${chNum}`, g.level, 'grammar'],
        initialStability: 2.0,
        initialDifficulty: 5.5,
      });
    });
  } else if (bookType === 'irodori') {
    const vol: IrodoriVolume = (options?.volume as IrodoriVolume) || 'a1';
    const entries = await resolveIrodoriGrammarEntries(vol, options?.chapterOrLesson);
    entries.forEach((e) => {
      cards.push({
        id: `card-irodori-${e.id}`,
        front: e.pattern,
        back: e.meaning,
        sourceBook: `Irodori ${vol.toUpperCase()}`,
        unitLabel: `Lesson ${e.lesson}`,
        tags: ['irodori', `irodori-${vol}`, e.jlptLevel || 'n5', 'can-do'],
        initialStability: 2.8,
        initialDifficulty: 3.8,
      });
    });
  } else if (bookType === 'soumatome') {
    const lvl: SoumatomeLevel = options?.level || 'n4';
    const entries = await resolveSoumatomeGrammarEntries(lvl, options?.week, options?.day);
    entries.forEach((e) => {
      cards.push({
        id: `card-soumatome-${e.id}`,
        front: e.pattern,
        back: e.meaning,
        sourceBook: `Nihongo Sou Matome ${lvl.toUpperCase()}`,
        unitLabel: `W${e.week}D${e.day}`,
        tags: ['soumatome', `sm-${lvl}`, `sm-w${e.week}`, lvl, 'exam-prep'],
        initialStability: 2.2,
        initialDifficulty: 5.0,
      });
    });
  }

  return cards;
}
