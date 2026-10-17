// ══════════════════════════════════════════════════════════════════
//  searchIndex.ts — Centralized In-Memory Search Pool & Debounced Index
//  Ticket T-234: Pre-indexed lowercase search pool & non-blocking execution (INP < 50ms)
// ══════════════════════════════════════════════════════════════════

import { loadVocab, loadGrammar, NormalizedVocab, NormalizedGrammar } from '../data/dataManager';
import { JLPTLevel } from '../../types/vocab';
import { deinflectWord } from '../grammar/deinflector';

interface IndexedVocab {
  item: NormalizedVocab;
  searchKey: string;
  wordLower: string;
  readingLower: string;
  romajiLower: string;
}

interface IndexedGrammar {
  item: NormalizedGrammar;
  searchKey: string;
  patternLower: string;
  readingLower: string;
}

let isInitialized = false;
let isLoadingPool = false;
let cachedVocab: NormalizedVocab[] = [];
let cachedGrammar: NormalizedGrammar[] = [];
let indexedVocabs: IndexedVocab[] = [];
let indexedGrammars: IndexedGrammar[] = [];
const listeners: Array<() => void> = [];

/**
 * Initializes the search pool lazily on first palette open or idle time.
 */
export async function initSearchPool(): Promise<{ vocab: NormalizedVocab[]; grammar: NormalizedGrammar[] }> {
  if (isInitialized) {
    return { vocab: cachedVocab, grammar: cachedGrammar };
  }

  if (isLoadingPool) {
    return new Promise((resolve) => {
      listeners.push(() => resolve({ vocab: cachedVocab, grammar: cachedGrammar }));
    });
  }

  isLoadingPool = true;
  const levels: JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const sswTracks = ['ssw-kaigo', 'ssw-food', 'ssw-construction'];

  try {
    const [vocabsByLevel, sswVocabs, grammarsByLevel] = await Promise.all([
      Promise.all(levels.map((lvl) => loadVocab(lvl).catch(() => []))),
      Promise.all(sswTracks.map((trk) => loadVocab(trk).catch(() => []))),
      Promise.all(levels.map((lvl) => loadGrammar(lvl).catch(() => []))),
    ]);

    cachedVocab = [...vocabsByLevel.flat(), ...sswVocabs.flat()];
    cachedGrammar = grammarsByLevel.flat();

    // Pre-index lowercase search strings to eliminate redundant allocations during live typing (Ticket T-234)
    indexedVocabs = cachedVocab.map((v) => {
      const wLower = (v.word || '').toLowerCase();
      const rLower = (v.reading || '').toLowerCase();
      const romLower = (v.romaji || '').toLowerCase();
      const mLower = (v.meaning || '').toLowerCase();
      return {
        item: v,
        searchKey: `${wLower} ${rLower} ${romLower} ${mLower}`,
        wordLower: wLower,
        readingLower: rLower,
        romajiLower: romLower,
      };
    });

    indexedGrammars = cachedGrammar.map((g) => {
      const pLower = (g.pattern || '').toLowerCase();
      const rLower = (g.reading || '').toLowerCase();
      const mLower = (g.meaning || '').toLowerCase();
      return {
        item: g,
        searchKey: `${pLower} ${rLower} ${mLower}`,
        patternLower: pLower,
        readingLower: rLower,
      };
    });

    isInitialized = true;
  } catch (err) {
    console.warn('[searchIndex] Error initializing search pool:', err);
  } finally {
    isLoadingPool = false;
    listeners.forEach((cb) => cb());
    listeners.length = 0;
  }

  return { vocab: cachedVocab, grammar: cachedGrammar };
}

export interface SearchMatchResults {
  vocabResults: NormalizedVocab[];
  grammarResults: NormalizedGrammar[];
}

/**
 * Performs fast indexed matching with prefix score prioritization using pre-indexed keys.
 */
export function querySearchPool(query: string, maxResults = 12): SearchMatchResults {
  const q = query.trim().toLowerCase();
  if (!q || !isInitialized) {
    return { vocabResults: [], grammarResults: [] };
  }

  // Deinflect Japanese query to discover base dictionary forms
  const lemmas = deinflectWord(q).map((c) => c.lemma.toLowerCase());

  // Vocab matching with ranking
  const matchedVocab = indexedVocabs
    .filter((iv) => {
      const wLower = iv.wordLower;
      const rLower = iv.readingLower;
      return (
        iv.searchKey.includes(q) ||
        lemmas.includes(wLower) ||
        lemmas.includes(rLower)
      );
    })
    .sort((a, b) => {
      const aStarts = a.wordLower.startsWith(q) || a.readingLower.startsWith(q) || a.romajiLower.startsWith(q);
      const bStarts = b.wordLower.startsWith(q) || b.readingLower.startsWith(q) || b.romajiLower.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.item.word.length - b.item.word.length;
    })
    .slice(0, maxResults)
    .map((iv) => iv.item);

  // Grammar matching with ranking
  const matchedGrammar = indexedGrammars
    .filter((ig) => ig.searchKey.includes(q))
    .sort((a, b) => {
      const aStarts = a.patternLower.startsWith(q) || a.readingLower.startsWith(q);
      const bStarts = b.patternLower.startsWith(q) || b.readingLower.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.item.pattern.length - b.item.pattern.length;
    })
    .slice(0, maxResults)
    .map((ig) => ig.item);

  return {
    vocabResults: matchedVocab,
    grammarResults: matchedGrammar,
  };
}

/**
 * Non-blocking asynchronous query scheduled on a microtask queue (Ticket T-234).
 */
export async function querySearchPoolAsync(query: string, maxResults = 12): Promise<SearchMatchResults> {
  return new Promise((resolve) => {
    if (typeof queueMicrotask !== 'undefined') {
      queueMicrotask(() => resolve(querySearchPool(query, maxResults)));
    } else {
      setTimeout(() => resolve(querySearchPool(query, maxResults)), 0);
    }
  });
}

export function isSearchPoolReady(): boolean {
  return isInitialized;
}
