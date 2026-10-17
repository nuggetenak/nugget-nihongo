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

  const isSSW = level.startsWith('ssw-') || level.startsWith('curriculum-ssw-');
  if (isSSW) {
    const sector = level.replace(/^curriculum-/, '').replace(/^ssw-/, '');
    src = `/data/vocab/ssw/${sector}.js`;
    const pascalSector = sector.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    varName = `vocabSSW_${pascalSector}` as keyof Window;
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
export type BookTrackKey =
  | 'minna1' | 'minna2'
  | 'irodori-a1' | 'irodori-a2-1' | 'irodori-a2-2'
  | 'genki1' | 'genki2'
  | 'quartet1' | 'quartet2'
  | 'skm-n1' | 'skm-n2' | 'skm-n3'
  | 'sm-n1' | 'sm-n2' | 'sm-n3' | 'sm-n4' | 'sm-n5'
  | 'tobira'
  | 'try-n1' | 'try-n2' | 'try-n3' | 'try-n4' | 'try-n5'
  | 'marugoto-a1' | 'marugoto-a2-1' | 'marugoto-a2-2'
  | string;

/**
 * Load textbook metadata and units across all 9 book series
 */
export async function loadBook(bookKey: BookTrackKey): Promise<BookData | null> {
  if (bookCache[bookKey]) return bookCache[bookKey];

  const fileMap: Record<string, { src: string; varKey: keyof Window | string }> = {
    minna1: { src: '/data/books/book-minna-1.js', varKey: 'bookMinna1' },
    minna2: { src: '/data/books/book-minna-2.js', varKey: 'bookMinna2' },
    'irodori-a1': { src: '/data/books/book-irodori-a1.js', varKey: 'bookIrodoriA1' },
    'irodori-a2-1': { src: '/data/books/book-irodori-a2-1.js', varKey: 'bookIrodoriA2_1' },
    'irodori-a2-2': { src: '/data/books/book-irodori-a2-2.js', varKey: 'bookIrodoriA2_2' },
  };

  const target = fileMap[bookKey];
  if (target) {
    if (!window[target.varKey as keyof Window]) {
      try {
        await loadScript(target.src);
      } catch (e) {
        console.warn(`[dataManager] Failed to load book: ${target.src}`, e);
      }
    }
    const raw = window[target.varKey as keyof Window] as BookData;
    if (raw) {
      bookCache[bookKey] = raw;
      return raw;
    }
  }

  // Fallback to staged expansion curriculum book track
  const cleanKey = bookKey.replace(/\d+$/, '').replace(/-a\d+.*$/, '');
  const curriculumTrack = await loadCurriculumTrack(`book-${cleanKey}`);
  if (curriculumTrack) {
    const unitsMap: Record<number, BookUnit> = {};
    curriculumTrack.units.forEach((u, idx) => {
      const chNum = u.unit_number || parseInt(u.id.replace(/\D/g, '')) || (idx + 1);
      unitsMap[chNum] = {
        topic: u.title_id || u.title_jp || `Chapter ${chNum}`,
        vocab_ids: u.vocab_ids || [],
        grammar_ids: u.grammar_ids || [],
      };
    });

    const syntheticBook: BookData = {
      meta: {
        book: bookKey,
        title: curriculumTrack.meta?.title || bookKey,
        publisher: 'Staged Curriculum',
        chapters: curriculumTrack.units.length,
        jlpt_range: [curriculumTrack.meta?.level || 'N5-N1'],
      },
      units: unitsMap,
    };
    bookCache[bookKey] = syntheticBook;
    return syntheticBook;
  }

  return null;
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

  const CANONICAL_TRACK_MAP: Record<string, { src: string; varKeys: string[] }> = {
    // JLPT
    n5: { src: '/data/curriculum/curriculum-n5.js', varKeys: ['curriculumN5'] },
    n4: { src: '/data/curriculum/curriculum-n4.js', varKeys: ['curriculumN4'] },
    n3: { src: '/data/curriculum/curriculum-n3.js', varKeys: ['curriculumN3'] },
    n2: { src: '/data/curriculum/curriculum-n2.js', varKeys: ['curriculumN2'] },
    n1: { src: '/data/curriculum/curriculum-n1.js', varKeys: ['curriculumN1'] },

    // Books (9 series)
    'book-genki': { src: '/data/curriculum/curriculum-book-genki.js', varKeys: ['curriculumBook_genki', 'curriculum_book_genki'] },
    'book-irodori': { src: '/data/curriculum/curriculum-book-irodori.js', varKeys: ['curriculumBook_irodori', 'curriculum_book_irodori'] },
    'book-marugoto': { src: '/data/curriculum/curriculum-book-marugoto.js', varKeys: ['curriculumBook_marugoto', 'curriculum_book_marugoto'] },
    'book-minna': { src: '/data/curriculum/curriculum-book-minna.js', varKeys: ['curriculumBook_minna', 'curriculum_book_minna'] },
    'book-quartet': { src: '/data/curriculum/curriculum-book-quartet.js', varKeys: ['curriculumBook_quartet', 'curriculum_book_quartet'] },
    'book-shin-kanzen-master': { src: '/data/curriculum/curriculum-book-shin-kanzen-master.js', varKeys: ['curriculumBook_shin_kanzen_master', 'curriculum_book_shin_kanzen_master'] },
    'book-soumatome': { src: '/data/curriculum/curriculum-book-soumatome.js', varKeys: ['curriculumBook_soumatome', 'curriculum_book_soumatome'] },
    'book-tobira': { src: '/data/curriculum/curriculum-book-tobira.js', varKeys: ['curriculumBook_tobira', 'curriculum_book_tobira'] },
    'book-try': { src: '/data/curriculum/curriculum-book-try.js', varKeys: ['curriculumBook_try', 'curriculum_book_try'] },

    // JFT & Seikatsu
    'jft-a1': { src: '/data/curriculum/curriculum-jft-a1.js', varKeys: ['curriculumJFT_A1', 'curriculumJFT_a1'] },
    'jft-a2': { src: '/data/curriculum/curriculum-jft-a2.js', varKeys: ['curriculumJFT_A2', 'curriculumJFT_a2'] },
    seikatsu: { src: '/data/curriculum/curriculum-seikatsu.js', varKeys: ['curriculumSeikatsu'] },

    // SSW Tracks (19 sectors & Canonical Aliases)
    'ssw-accommodation': { src: '/data/curriculum/curriculum-ssw-accommodation.js', varKeys: ['curriculumSSW_accommodation', 'curriculumSSWAccommodation'] },
    'ssw-hospitality': { src: '/data/curriculum/curriculum-ssw-accommodation.js', varKeys: ['curriculumSSW_accommodation', 'curriculumSSWAccommodation'] },
    'ssw-agriculture': { src: '/data/curriculum/curriculum-ssw-agriculture.js', varKeys: ['curriculumSSW_agriculture', 'curriculumSSWAgriculture'] },
    'ssw-crop-farming': { src: '/data/curriculum/curriculum-ssw-agriculture.js', varKeys: ['curriculumSSW_agriculture', 'curriculumSSWAgriculture'] },
    'ssw-livestock': { src: '/data/curriculum/curriculum-ssw-agriculture.js', varKeys: ['curriculumSSW_agriculture', 'curriculumSSWAgriculture'] },
    'ssw-automobile': { src: '/data/curriculum/curriculum-ssw-automobile.js', varKeys: ['curriculumSSW_automobile', 'curriculumSSWAutomobile'] },
    'ssw-aviation': { src: '/data/curriculum/curriculum-ssw-aviation.js', varKeys: ['curriculumSSW_aviation', 'curriculumSSWAviation'] },
    'ssw-building-cleaning': { src: '/data/curriculum/curriculum-ssw-building-cleaning.js', varKeys: ['curriculumSSW_building_cleaning', 'curriculumSSWBuildingCleaning'] },
    'ssw-construction': { src: '/data/curriculum/curriculum-ssw-construction.js', varKeys: ['curriculumSSWConstruction', 'curriculumSSW_construction'] },
    'ssw-electric-electronic': { src: '/data/curriculum/curriculum-ssw-electric-electronic.js', varKeys: ['curriculumSSW_electric_electronic', 'curriculumSSWElectricElectronic'] },
    'ssw-electrical-electronics': { src: '/data/curriculum/curriculum-ssw-electric-electronic.js', varKeys: ['curriculumSSW_electric_electronic', 'curriculumSSWElectricElectronic'] },
    'ssw-fishery': { src: '/data/curriculum/curriculum-ssw-fishery.js', varKeys: ['curriculumSSW_fishery', 'curriculumSSWFishery'] },
    'ssw-food-service': { src: '/data/curriculum/curriculum-ssw-food-service.js', varKeys: ['curriculumSSW_food_service', 'curriculumSSWFood', 'curriculumSSWFoodService'] },
    'ssw-restaurant': { src: '/data/curriculum/curriculum-ssw-food-service.js', varKeys: ['curriculumSSW_food_service', 'curriculumSSWFoodService'] },
    'ssw-food': { src: '/data/curriculum/curriculum-ssw-food.js', varKeys: ['curriculumSSWFood', 'curriculumSSW_food', 'curriculumSSW_food_service'] },
    'ssw-food-manufacturing': { src: '/data/curriculum/curriculum-ssw-food.js', varKeys: ['curriculumSSWFood', 'curriculumSSW_food'] },
    'ssw-forestry': { src: '/data/curriculum/curriculum-ssw-forestry.js', varKeys: ['curriculumSSW_forestry', 'curriculumSSWForestry'] },
    'ssw-industrial-machinery': { src: '/data/curriculum/curriculum-ssw-industrial-machinery.js', varKeys: ['curriculumSSW_industrial_machinery', 'curriculumSSWIndustrialMachinery'] },
    'ssw-kaigo': { src: '/data/curriculum/curriculum-ssw-kaigo.js', varKeys: ['curriculumSSWKaigo', 'curriculumSSW_kaigo'] },
    'ssw-logistics': { src: '/data/curriculum/curriculum-ssw-logistics.js', varKeys: ['curriculumSSW_logistics', 'curriculumSSWLogistics'] },
    'ssw-automobile-transport': { src: '/data/curriculum/curriculum-ssw-logistics.js', varKeys: ['curriculumSSW_logistics', 'curriculumSSWLogistics'] },
    'ssw-manufacturing': { src: '/data/curriculum/curriculum-ssw-manufacturing.js', varKeys: ['curriculumSSW_manufacturing', 'curriculumSSWManufacturing'] },
    'ssw-sokeizai': { src: '/data/curriculum/curriculum-ssw-manufacturing.js', varKeys: ['curriculumSSW_manufacturing', 'curriculumSSWManufacturing'] },
    'ssw-railway': { src: '/data/curriculum/curriculum-ssw-railway.js', varKeys: ['curriculumSSW_railway', 'curriculumSSWRailway'] },
    'ssw-shipbuilding': { src: '/data/curriculum/curriculum-ssw-shipbuilding.js', varKeys: ['curriculumSSW_shipbuilding', 'curriculumSSWShipbuilding'] },
    'ssw-textile': { src: '/data/curriculum/curriculum-ssw-textile.js', varKeys: ['curriculumSSW_textile', 'curriculumSSWTextile'] },
    'ssw-timber': { src: '/data/curriculum/curriculum-ssw-timber.js', varKeys: ['curriculumSSW_timber', 'curriculumSSWTimber'] },
  };

  const cleanKey = trackKey.toLowerCase().replace(/^curriculum-/, '');
  let entry = CANONICAL_TRACK_MAP[cleanKey] || CANONICAL_TRACK_MAP[trackKey];

  if (!entry) {
    const sector = cleanKey.replace(/^ssw-/, '');
    const snakeSector = sector.replace(/-/g, '_');
    entry = {
      src: `/data/curriculum/curriculum-${cleanKey}.js`,
      varKeys: [
        `curriculum_${cleanKey.replace(/-/g, '_')}`,
        `curriculumSSW_${snakeSector}`,
        `curriculumBook_${snakeSector}`,
      ],
    };
  }

  const hasWindow = typeof window !== 'undefined';
  let raw: any = null;

  if (hasWindow) {
    for (const vk of entry.varKeys) {
      if ((window as any)[vk]) {
        raw = (window as any)[vk];
        break;
      }
    }
  }

  if (!raw && hasWindow) {
    try {
      await loadScript(entry.src);
      for (const vk of entry.varKeys) {
        if ((window as any)[vk]) {
          raw = (window as any)[vk];
          break;
        }
      }
    } catch {
      // Fallback to fetch JSON
    }
  }

  if (!raw) {
    const isSSW = trackKey.startsWith('ssw-') || trackKey.startsWith('curriculum-ssw-');
    const sector = trackKey.replace(/^curriculum-/, '').replace(/^ssw-/, '');
    const jsonPaths = [
      `/data/curriculum/curriculum-${trackKey}.json`,
      isSSW ? `/data/curriculum/curriculum-ssw-${sector}.json` : null,
    ].filter(Boolean) as string[];

    for (const jsonPath of jsonPaths) {
      try {
        const jsonRes = await fetch(jsonPath);
        if (jsonRes.ok) {
          raw = await jsonRes.json();
          break;
        }
      } catch {}
    }
  }

  if (raw) {
    const normalized = normalizeTrackData(raw, trackKey);
    curriculumCache[trackKey] = normalized;
    return normalized;
  }

  console.warn(`[dataManager] Failed to load curriculum: ${trackKey}`);
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
  const rawLevels: JLPTLevel[] = preferredLevel
    ? [preferredLevel, 'n5', 'n4', 'n3', 'n2', 'n1']
    : ['n5', 'n4', 'n3', 'n2', 'n1'];
  const levelsToTry: JLPTLevel[] = Array.from(new Set(rawLevels));

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


