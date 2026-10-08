import { VocabItem, GrammarItem, StudyTrack, JLPTLevel } from '@/types';

// In-memory cache
const vocabCache: Partial<Record<JLPTLevel, VocabItem[]>> = {};
const grammarCache: Partial<Record<JLPTLevel, GrammarItem[]>> = {};
let tracksCache: Record<string, StudyTrack> | null = null;

export async function fetchVocabByLevel(level: JLPTLevel): Promise<VocabItem[]> {
  if (vocabCache[level]) return vocabCache[level]!;

  try {
    const res = await fetch(`/data/json/vocab-${level}.json`);
    if (!res.ok) throw new Error(`Failed to load vocab-${level}`);
    const data: VocabItem[] = await res.json();
    vocabCache[level] = data;
    return data;
  } catch (err) {
    console.error(`Error loading vocab-${level}:`, err);
    return [];
  }
}

export async function fetchGrammarByLevel(level: JLPTLevel): Promise<GrammarItem[]> {
  if (grammarCache[level]) return grammarCache[level]!;

  try {
    const res = await fetch(`/data/json/grammar-${level}.json`);
    if (!res.ok) throw new Error(`Failed to load grammar-${level}`);
    const data: GrammarItem[] = await res.json();
    grammarCache[level] = data;
    return data;
  } catch (err) {
    console.error(`Error loading grammar-${level}:`, err);
    return [];
  }
}

export async function fetchStudyTracks(): Promise<Record<string, StudyTrack>> {
  if (tracksCache) return tracksCache;

  try {
    const res = await fetch(`/data/json/tracks.json`);
    if (!res.ok) throw new Error('Failed to load tracks');
    const data: Record<string, StudyTrack> = await res.json();
    tracksCache = data;
    return data;
  } catch (err) {
    console.error('Error loading tracks:', err);
    return {};
  }
}

export async function searchAll(query: string): Promise<{ vocab: VocabItem[]; grammar: GrammarItem[] }> {
  if (!query || query.trim().length < 2) return { vocab: [], grammar: [] };

  const q = query.trim().toLowerCase();
  const levels: JLPTLevel[] = ['n5', 'n4', 'n3'];

  // Load N5-N3 for search
  const vocabLists = await Promise.all(levels.map(fetchVocabByLevel));
  const grammarLists = await Promise.all(levels.map(fetchGrammarByLevel));

  const allVocab = vocabLists.flat();
  const allGrammar = grammarLists.flat();

  const matchingVocab = allVocab
    .filter(
      (v) =>
        v.word?.toLowerCase().includes(q) ||
        v.reading?.toLowerCase().includes(q) ||
        v.romaji?.toLowerCase().includes(q) ||
        v.meaning_id?.toLowerCase().includes(q)
    )
    .slice(0, 15);

  const matchingGrammar = allGrammar
    .filter(
      (g) =>
        g.pattern?.toLowerCase().includes(q) ||
        g.reading?.toLowerCase().includes(q) ||
        g.meaning?.toLowerCase().includes(q)
    )
    .slice(0, 15);

  return { vocab: matchingVocab, grammar: matchingGrammar };
}
