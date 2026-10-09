// ══════════════════════════════════════════════════════════════════
//  dataManager.ts — High-Performance Data Loader & Indexer
//  Loads vocab & grammar on demand from public/data/
//  Caches in memory for instant O(1) retrieval and sub-millisecond search
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';

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
    grammarN5?: any[];
    grammarN4?: any[];
    grammarN3?: any[];
    grammarN2?: any[];
    grammarN1?: any[];
  }
}

// Memory cache
const vocabCache: Partial<Record<JLPTLevel, NormalizedVocab[]>> = {};
const grammarCache: Partial<Record<JLPTLevel, NormalizedGrammar[]>> = {};

// Script load helper
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded or present
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
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
 * Load and normalize vocabulary for a specific JLPT level
 */
export async function loadVocab(level: JLPTLevel): Promise<NormalizedVocab[]> {
  if (vocabCache[level]) {
    return vocabCache[level]!;
  }

  const varName = `vocab${level.toUpperCase()}` as keyof Window;
  if (!window[varName]) {
    try {
      await loadScript(`/data/vocab/vocab-${level}.js`);
    } catch (err) {
      console.warn(`[dataManager] Could not load /data/vocab/vocab-${level}.js, fallback to empty array.`, err);
    }
  }

  const rawList: any[] = (window[varName] as any[]) || [];
  const normalized: NormalizedVocab[] = rawList.map((item) => ({
    id: item.id || `vocab-${level}-${item.word}`,
    word: item.word || item.reading || '',
    reading: item.reading || item.word || '',
    romaji: item.romaji || '',
    meaning: item.meaning_id || item.meaning || item.meaning_en || '',
    level: level,
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
  if (grammarCache[level]) {
    return grammarCache[level]!;
  }

  const varName = `grammar${level.toUpperCase()}` as keyof Window;
  if (!window[varName]) {
    try {
      await loadScript(`/data/grammar/grammar-${level}.js`);
    } catch (err) {
      console.warn(`[dataManager] Could not load /data/grammar/grammar-${level}.js, fallback to empty array.`, err);
    }
  }

  const rawList: any[] = (window[varName] as any[]) || [];
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
