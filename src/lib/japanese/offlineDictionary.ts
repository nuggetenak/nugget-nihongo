// ══════════════════════════════════════════════════════════════════
//  offlineDictionary.ts — Offline Japanese-Indonesian Dictionary & De-Inflector
//  Integrates Yomitan de-inflection rules with local vocabulary corpus
// ══════════════════════════════════════════════════════════════════

import { deinflectWord, DeinflectionCandidate } from '../grammar/deinflector';
import { NormalizedVocab } from '../data/dataManager';

export interface DictionaryEntry {
  kanji: string;
  kana: string;
  romaji: string;
  arti: string;
  level: string;
  pos?: string;
  pitchAccent?: number;
}

export interface WordLookupResult {
  query: string;
  exactMatch: DictionaryEntry | null;
  deinflections: Array<{
    candidate: DeinflectionCandidate;
    matchedEntry: DictionaryEntry | null;
  }>;
  relatedMatches: DictionaryEntry[];
}

class OfflineDictionaryService {
  private customEntries: Map<string, DictionaryEntry> = new Map();
  private lruCache: Map<string, WordLookupResult> = new Map();
  private maxCacheSize: number = 60;

  constructor() {
    this.seedEssentialVocabulary();
  }

  /**
   * Seeds core high-frequency JLPT N5-N3 vocabulary into memory
   */
  private seedEssentialVocabulary(): void {
    const seeds: DictionaryEntry[] = [
      { kanji: '食べる', kana: 'たべる', romaji: 'taberu', arti: 'makan', level: 'N5', pos: 'verb_ichidan', pitchAccent: 2 },
      { kanji: '飲む', kana: 'のむ', romaji: 'nomu', arti: 'minum', level: 'N5', pos: 'verb_godan', pitchAccent: 1 },
      { kanji: '行く', kana: 'いく', romaji: 'iku', arti: 'pergi', level: 'N5', pos: 'verb_godan', pitchAccent: 0 },
      { kanji: '来る', kana: 'くる', romaji: 'kuru', arti: 'datang', level: 'N5', pos: 'verb_kuru', pitchAccent: 1 },
      { kanji: 'する', kana: 'する', romaji: 'suru', arti: 'melakukan', level: 'N5', pos: 'verb_suru', pitchAccent: 0 },
      { kanji: '見る', kana: 'みる', romaji: 'miru', arti: 'melihat / menonton', level: 'N5', pos: 'verb_ichidan', pitchAccent: 1 },
      { kanji: '聞く', kana: 'きく', romaji: 'kiku', arti: 'mendengar / bertanya', level: 'N5', pos: 'verb_godan', pitchAccent: 0 },
      { kanji: '話す', kana: 'はなす', romaji: 'hanasu', arti: 'berbicara', level: 'N5', pos: 'verb_godan', pitchAccent: 2 },
      { kanji: '読む', kana: 'よむ', romaji: 'yomu', arti: 'membaca', level: 'N5', pos: 'verb_godan', pitchAccent: 1 },
      { kanji: '書く', kana: 'かく', romaji: 'kaku', arti: 'menulis', level: 'N5', pos: 'verb_godan', pitchAccent: 1 },
      { kanji: '買う', kana: 'かう', romaji: 'kau', arti: 'membeli', level: 'N5', pos: 'verb_godan', pitchAccent: 0 },
      { kanji: '待つ', kana: 'まつ', romaji: 'matsu', arti: 'menunggu', level: 'N5', pos: 'verb_godan', pitchAccent: 1 },
      { kanji: '入る', kana: 'はいる', romaji: 'hairu', arti: 'masuk', level: 'N5', pos: 'verb_godan', pitchAccent: 1 },
      { kanji: '出る', kana: 'でる', romaji: 'deru', arti: 'keluar', level: 'N5', pos: 'verb_ichidan', pitchAccent: 1 },
      { kanji: '美しい', kana: 'うつくしい', romaji: 'utsukushii', arti: 'indah / cantik', level: 'N4', pos: 'adj_i', pitchAccent: 4 },
      { kanji: '大きい', kana: 'おおきい', romaji: 'ookii', arti: 'besar', level: 'N5', pos: 'adj_i', pitchAccent: 3 },
      { kanji: '小さい', kana: 'ちいさい', romaji: 'chiisai', arti: 'kecil', level: 'N5', pos: 'adj_i', pitchAccent: 3 },
      { kanji: '高い', kana: 'たかい', romaji: 'takai', arti: 'tinggi / mahal', level: 'N5', pos: 'adj_i', pitchAccent: 2 },
      { kanji: '新しい', kana: 'あたらしい', romaji: 'atarashii', arti: 'baru', level: 'N5', pos: 'adj_i', pitchAccent: 4 },
      { kanji: '静か', kana: 'しずか', romaji: 'shizuka', arti: 'tenang / sunyi', level: 'N5', pos: 'adj_na', pitchAccent: 1 },
    ];

    seeds.forEach((e) => {
      this.registerEntry(e);
    });
  }

  public registerEntry(entry: DictionaryEntry): void {
    if (!entry) return;
    if (entry.kanji) this.customEntries.set(entry.kanji, entry);
    if (entry.kana) this.customEntries.set(entry.kana, entry);
  }

  /**
   * Registers an array of normalized vocabulary items from dataManager
   */
  public registerVocabList(list: NormalizedVocab[]): void {
    if (!Array.isArray(list)) return;
    for (const v of list) {
      this.registerEntry({
        kanji: v.word,
        kana: v.reading,
        romaji: v.romaji,
        arti: v.meaning,
        level: v.level,
        pos: v.pos,
      });
    }
  }

  /**
   * Performs an offline dictionary lookup with Yomitan de-inflection fallbacks
   */
  public lookup(query: string): WordLookupResult {
    if (!query || typeof query !== 'string') {
      return { query: '', exactMatch: null, deinflections: [], relatedMatches: [] };
    }

    const clean = query.trim();
    if (this.lruCache.has(clean)) {
      return this.lruCache.get(clean)!;
    }

    // 1. Direct match check
    const exactMatch = this.customEntries.get(clean) || null;

    // 2. Yomitan de-inflection step
    const deinflectionsRaw = deinflectWord(clean);
    const deinflections = deinflectionsRaw.map((candidate) => ({
      candidate,
      matchedEntry: this.customEntries.get(candidate.lemma) || null,
    }));

    // 3. Related prefix / substring matches (max 5)
    const relatedMatches: DictionaryEntry[] = [];
    if (!exactMatch) {
      for (const [key, entry] of this.customEntries.entries()) {
        if (relatedMatches.length >= 5) break;
        if (key.includes(clean) || entry.arti.toLowerCase().includes(clean.toLowerCase())) {
          if (!relatedMatches.includes(entry)) {
            relatedMatches.push(entry);
          }
        }
      }
    }

    const result: WordLookupResult = {
      query: clean,
      exactMatch,
      deinflections,
      relatedMatches,
    };

    // Store in LRU cache
    if (this.lruCache.size >= this.maxCacheSize) {
      const oldest = this.lruCache.keys().next().value;
      if (oldest) this.lruCache.delete(oldest);
    }
    this.lruCache.set(clean, result);

    return result;
  }

  public clearCache(): void {
    this.lruCache.clear();
  }
}

export const offlineDictionary = new OfflineDictionaryService();
