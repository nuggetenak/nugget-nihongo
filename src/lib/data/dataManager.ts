// ══════════════════════════════════════════════════════════════════
//  dataManager.ts — High-Performance Data Loader & Indexer
//  Loads vocab & grammar on demand from public/data/
//  Caches in memory for instant O(1) retrieval and sub-millisecond search
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { TrackId } from '../curriculum/curriculumStore';

export interface NormalizedVocab {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  level: JLPTLevel;
  pos: string;
  nuance?: string;
  examples: Array<{ jp: string; id: string }>;
}

export interface NormalizedGrammar {
  id: string;
  pattern: string;
  reading: string;
  meaning: string;
  level: JLPTLevel;
  cat?: string;
  connection?: string;
  desc?: string;
  nuance?: string;
  examples: Array<{ jp: string; id: string }>;
}

declare global {
  interface Window {
    vocabN5?: any[];
    vocabN4?: any[];
    vocabN3?: any[];
    vocabN2?: any[];
    vocabN1?: any[];
    vocabSSW_Construction?: any[];
    vocabSSW_Food?: any[];
    vocabSSW_Kaigo?: any[];
    grammarN5?: any[];
    grammarN4?: any[];
    grammarN3?: any[];
    grammarN2?: any[];
    grammarN1?: any[];
    bookMinna1?: any;
    bookMinna2?: any;
    bookIrodoriA1?: any;
    bookIrodoriA2_1?: any;
    bookIrodoriA2_2?: any;
    curriculumN5?: any;
    curriculumN4?: any;
    curriculumN3?: any;
    curriculumN2?: any;
    curriculumN1?: any;
    curriculumSSWKaigo?: any;
    curriculumSSWFood?: any;
    curriculumSSWConstruction?: any;
  }
}

export interface BookUnit {
  topic: string;
  vocab_ids: string[];
  grammar_ids: string[];
}

export interface BookData {
  meta: {
    book: string;
    title: string;
    publisher: string;
    chapters?: number;
    units?: number;
    jlpt_range: string[];
  };
  units: Record<number, BookUnit>;
}

// Memory cache
const vocabCache: Partial<Record<string, NormalizedVocab[]>> = {};
const grammarCache: Partial<Record<JLPTLevel, NormalizedGrammar[]>> = {};

// In-flight script loads to prevent duplicate loads & concurrent race conditions (F-04)
const inFlightLoads = new Map<string, Promise<void>>();

// Script load helper
function loadScript(src: string): Promise<void> {
  if (inFlightLoads.has(src)) {
    return inFlightLoads.get(src)!;
  }

  const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
  if (existing && existing.dataset.loaded === 'true') {
    return Promise.resolve();
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (existing) {
      existing.addEventListener('load', () => {
        existing.dataset.loaded = 'true';
        resolve();
      });
      existing.addEventListener('error', () => {
        reject(new Error(`Failed to load ${src}`));
      });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(script);
  }).finally(() => {
    inFlightLoads.delete(src);
  });

  inFlightLoads.set(src, promise);
  return promise;
}

/**
 * Load and normalize vocabulary for a specific JLPT level or SSW specialist track
 */
export async function loadVocab(level: string): Promise<NormalizedVocab[]> {
  if (vocabCache[level] && vocabCache[level]!.length > 0) {
    return vocabCache[level]!;
  }

  let src = `/data/vocab/vocab-${level}.js`;
  let varName: keyof Window = `vocab${level.toUpperCase()}` as keyof Window;

  if (level === 'ssw-construction' || level === 'curriculum-ssw-construction') {
    src = '/data/vocab/ssw/construction.js';
    varName = 'vocabSSW_Construction' as keyof Window;
  } else if (level === 'ssw-food' || level === 'curriculum-ssw-food') {
    src = '/data/vocab/ssw/food.js';
    varName = 'vocabSSW_Food' as keyof Window;
  } else if (level === 'ssw-kaigo' || level === 'curriculum-ssw-kaigo') {
    src = '/data/vocab/ssw/kaigo.js';
    varName = 'vocabSSW_Kaigo' as keyof Window;
  }

  if (!window[varName] || (window[varName] as any[]).length === 0) {
    try {
      await loadScript(src);
    } catch (err) {
      console.warn(`[dataManager] Could not load ${src}, fallback to empty array.`, err);
    }
  }

  // Also load staged vocabulary expansion for N5–N1 if available
  const isJLPT = ['n5', 'n4', 'n3', 'n2', 'n1'].includes(level.toLowerCase());
  const stagedVarName = `stagedVocab${level.toUpperCase()}` as keyof Window;
  if (isJLPT && !window[stagedVarName]) {
    try {
      await loadScript(`/data/staged-expansion/vocab/${level.toLowerCase()}-staged.js`);
    } catch {}
  }

  const rawList: any[] = (window[varName] as any[]) || [];
  const stagedList: any[] = isJLPT ? ((window[stagedVarName] as any[]) || []) : [];

  if (rawList.length === 0 && stagedList.length === 0) {
    // Do not cache transient empty array so future retries can succeed
    return [];
  }

  // Combine and deduplicate by unique word and id
  const seenIds = new Set<string>();
  const seenWords = new Set<string>();
  const combined: any[] = [];

  for (const item of rawList) {
    const id = item.id || `vocab-${level}-${item.word}`;
    if (!seenIds.has(id)) {
      seenIds.add(id);
      if (item.word) seenWords.add(item.word);
      combined.push(item);
    }
  }

  for (const item of stagedList) {
    const id = item.id || `vocab-${level}-${item.word}`;
    if (!seenIds.has(id) && item.word && !seenWords.has(item.word)) {
      seenIds.add(id);
      seenWords.add(item.word);
      combined.push(item);
    }
  }

  const normalized: NormalizedVocab[] = combined.map((item) => ({
    id: item.id || `vocab-${level}-${item.word}`,
    word: item.word || item.reading || '',
    reading: item.reading || item.word || '',
    romaji: item.romaji || '',
    meaning: item.meaning_id || item.meaning || item.meaning_en || '',
    level: (['n5', 'n4', 'n3', 'n2', 'n1'].includes(level) ? level : 'n4') as JLPTLevel,
    pos: item.pos || item.type || 'vocab',
    nuance: item.nuance || undefined,
    examples: Array.isArray(item.examples) ? item.examples : [],
  }));

  vocabCache[level] = normalized;
  return normalized;
}

/**
 * Load and normalize grammar for a specific JLPT level
 */
export async function loadGrammar(level: JLPTLevel): Promise<NormalizedGrammar[]> {
  if (grammarCache[level] && grammarCache[level]!.length > 0) {
    return grammarCache[level]!;
  }

  const varName = `grammar${level.toUpperCase()}` as keyof Window;
  if (!window[varName] || (window[varName] as any[]).length === 0) {
    try {
      await loadScript(`/data/grammar/grammar-${level}.js`);
    } catch (err) {
      console.warn(`[dataManager] Could not load /data/grammar/grammar-${level}.js, fallback to empty array.`, err);
    }
  }

  const rawList: any[] = (window[varName] as any[]) || [];
  if (rawList.length === 0) {
    // Do not cache transient empty array
    return [];
  }

  const normalized: NormalizedGrammar[] = rawList.map((item) => ({
    id: item.id || `grammar-${level}-${item.pattern}`,
    pattern: item.pattern || item.title || item.grammar || '',
    reading: item.reading || '',
    meaning: item.meaning || item.desc || '',
    level: level,
    cat: item.cat || item.category || undefined,
    connection: item.connection || item.formation || undefined,
    desc: item.desc || item.explanation || undefined,
    nuance: item.nuance || undefined,
    examples: Array.isArray(item.examples) ? item.examples : [],
  }));

  grammarCache[level] = normalized;
  return normalized;
}

/**
 * Preload all common levels in background
 */
export function preloadLevels(levels: JLPTLevel[] = ['n5', 'n4']) {
  levels.forEach((lvl) => {
    loadVocab(lvl).catch(() => {});
    loadGrammar(lvl).catch(() => {});
  });
}

const bookCache: Record<string, BookData> = {};

/**
 * Load textbook metadata and units
 */
export async function loadBook(bookKey: 'minna1' | 'minna2' | 'irodori-a1' | 'irodori-a2-1'): Promise<BookData | null> {
  if (bookCache[bookKey]) return bookCache[bookKey];

  const fileMap: Record<string, { src: string; varKey: keyof Window }> = {
    minna1: { src: '/data/books/book-minna-1.js', varKey: 'bookMinna1' },
    minna2: { src: '/data/books/book-minna-2.js', varKey: 'bookMinna2' },
    'irodori-a1': { src: '/data/books/book-irodori-a1.js', varKey: 'bookIrodoriA1' },
    'irodori-a2-1': { src: '/data/books/book-irodori-a2-1.js', varKey: 'bookIrodoriA2_1' },
  };

  const target = fileMap[bookKey];
  if (!target) return null;

  if (!window[target.varKey]) {
    try {
      await loadScript(target.src);
    } catch (e) {
      console.warn(`[dataManager] Failed to load book: ${target.src}`, e);
      return null;
    }
  }

  const raw = window[target.varKey] as BookData;
  if (raw) {
    bookCache[bookKey] = raw;
  }
  return raw || null;
}

export const FREEWAY_TRACK_IDS = [
  'gn5-00059', // sumimasen (permisi/maaf)
  'gn5-00001', // wa desu (X adalah Y)
  'gn5-00002', // wa janai desu (X bukan Y)
  'gn5-00004', // wa desu ka (apakah X adalah Y?)
  'gn5-00005', // kore/sore/are (ini/itu/itu jauh)
  'gn5-00006', // kono/sono/ano (benda ini/itu)
  'gn5-00007', // ga arimasu (ada benda mati)
  'gn5-00008', // ga imasu (ada makhluk hidup)
  'gn5-00010', // ni (tempat keberadaan)
  'gn5-00011', // de (tempat aktivitas)
  'gn5-00013', // ni (waktu)
  'gn5-00016', // masu (bentuk sopan sekarang)
  'gn5-00017', // mashita (bentuk sopan lampau)
  'gn5-00018', // masen (bentuk sopan negatif)
  'gn5-00019', // masen deshita (bentuk sopan negatif lampau)
  'gn5-00025', // te kudasai (tolong lakukan)
  'gn5-00027', // tai desu (ingin melakukan)
  'gn5-00030', // i-adjective (kata sifat i)
  'gn5-00031', // na-adjective (kata sifat na)
  'gn5-00040', // counter tsu (berhitung benda)
  'gn5-00051', // wo kudasai (minta tolong berikan)
];

/**
 * Load Freeway Survival Track grammar items
 */
export async function loadFreewayTrack(): Promise<NormalizedGrammar[]> {
  const n5Grammar = await loadGrammar('n5');
  return FREEWAY_TRACK_IDS.map((id) => n5Grammar.find((g) => g.id === id)).filter(Boolean) as NormalizedGrammar[];
}

export interface CurriculumLesson {
  id: string;
  unit_id?: string;
  lesson_number: number;
  title_id: string;
  title_jp: string;
  desc_id: string;
  can_do_statement: string;
  grammar_ids: string[];
  vocab_ids?: string[];
  l2d_contrastive_tags?: string[];
  estimated_minutes?: number;
}

export interface CurriculumUnit {
  unit_number: number;
  id: string;
  level: string;
  pt_stage: number;
  title_id: string;
  title_jp: string;
  theme: string;
  icon: string;
  can_do_summary: string;
  l2d_focus_notes?: string;
  grammar_ids: string[];
  vocab_ids: string[];
  lessons: CurriculumLesson[];
}

export interface CurriculumTrackData {
  meta: {
    track_id: string;
    level?: string;
    title?: string;
    sector?: string;
    version: string;
    total_units: number;
    authoritative: boolean;
  };
  units: CurriculumUnit[];
}

const curriculumCache: Record<string, CurriculumTrackData> = {};

function normalizeTrackData(raw: any, trackKey: string): CurriculumTrackData {
  if (!raw) return raw;
  const meta = raw.meta || {
    track_id: raw.id || `curriculum-${trackKey}`,
    level: raw.level || trackKey,
    title: raw.name || raw.name_id || `Kurikulum ${trackKey.toUpperCase()}`,
    version: '1.0.0',
    total_units: raw.units ? raw.units.length : 0,
    authoritative: true,
  };
  return {
    ...raw,
    meta,
    units: raw.units || [],
  };
}

/**
 * Load any curriculum track (JLPT N5–N1, 19 SSW Sectors, JFT-A1/A2, Seikatsu, or Book tracks)
 */
export async function loadCurriculumTrack(
  trackKey: TrackId | string
): Promise<CurriculumTrackData | null> {
  if (curriculumCache[trackKey]) return curriculumCache[trackKey];

  const fileMap: Record<string, { src: string; varKey: string }> = {
    n5: { src: '/data/curriculum/curriculum-n5.js', varKey: 'curriculumN5' },
    n4: { src: '/data/curriculum/curriculum-n4.js', varKey: 'curriculumN4' },
    n3: { src: '/data/curriculum/curriculum-n3.js', varKey: 'curriculumN3' },
    n2: { src: '/data/curriculum/curriculum-n2.js', varKey: 'curriculumN2' },
    n1: { src: '/data/curriculum/curriculum-n1.js', varKey: 'curriculumN1' },
    'ssw-kaigo': { src: '/data/curriculum/curriculum-ssw-kaigo.js', varKey: 'curriculumSSWKaigo' },
    'ssw-food': { src: '/data/curriculum/curriculum-ssw-food.js', varKey: 'curriculumSSWFood' },
    'ssw-construction': { src: '/data/curriculum/curriculum-ssw-construction.js', varKey: 'curriculumSSWConstruction' },
  };

  const target = fileMap[trackKey] || {
    src: `/data/curriculum/curriculum-${trackKey}.js`,
    varKey: `curriculum_${trackKey.replace(/[^a-zA-Z0-9]/g, '_')}`,
  };

  const hasWindow = typeof window !== 'undefined';
  let raw: any = hasWindow ? (window as any)[target.varKey] : null;

  if (!raw && hasWindow) {
    try {
      await loadScript(target.src);
      raw = (window as any)[target.varKey];
    } catch {
      // Fallback to fetch JSON
    }
  }

  if (!raw) {
    try {
      const jsonRes = await fetch(`/data/curriculum/curriculum-${trackKey}.json`);
      if (jsonRes.ok) {
        raw = await jsonRes.json();
      }
    } catch (err2) {
      console.warn(`[dataManager] Failed to load curriculum: ${trackKey}`, err2);
      return null;
    }
  }

  if (raw) {
    const normalized = normalizeTrackData(raw, trackKey);
    curriculumCache[trackKey] = normalized;
    return normalized;
  }
  return null;
}

// Re-export diagnostic, vocational panic, and macro-discourse data modules
export * from './diagnosticManager';
export * from './panicScenarioManager';
export * from './discourseManager';

/**
 * Find vocabulary entries with authentic example sentences featuring a given Kanji character
 */
export async function findVocabWithExamplesForKanji(
  kanjiChar: string,
  preferredLevel?: JLPTLevel
): Promise<NormalizedVocab[]> {
  const levelsToTry: JLPTLevel[] = preferredLevel
    ? [preferredLevel, 'n5', 'n4', 'n3', 'n2', 'n1'].filter((v, i, a) => a.indexOf(v) === i)
    : ['n5', 'n4', 'n3', 'n2', 'n1'];

  const results: NormalizedVocab[] = [];
  const seenWords = new Set<string>();

  for (const lvl of levelsToTry) {
    try {
      const vocabs = await loadVocab(lvl);
      for (const v of vocabs) {
        if (v.word.includes(kanjiChar) && !seenWords.has(v.word)) {
          seenWords.add(v.word);
          results.push(v);
          if (results.length >= 8) break;
        }
      }
      if (results.length >= 8) break;
    } catch (_) {}
  }

  return results;
}


