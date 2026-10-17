// ══════════════════════════════════════════════════════════════════
//  pitchAccentManager.ts — Tokyo Pitch Accent Lexicon & Contour Resolver
//  Research Basis: OJAD (Online Japanese Accent Dictionary) & Wadoku
//  Provides authentic Tokyo pitch patterns, downstep positions,
//  and contour annotations across the Nugget Nihongo ecosystem.
// ══════════════════════════════════════════════════════════════════

import { splitIntoMora, hiraganaToKatakana } from '../audio/moraTokenizer';

export interface PitchAccentEntry {
  pattern: number; // 0: Heiban, 1: Atamadaka, 2: Nakadaka, etc.
  category: 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';
  mora_count: number;
  downstep_mora: number; // 0 if none
  contour: string; // e.g. "ア＼メ"
}

// In-memory cache for loaded pitch index
let pitchIndexCache: Record<string, PitchAccentEntry> | null = null;
let loadPromise: Promise<Record<string, PitchAccentEntry>> | null = null;

// High-frequency seed entries for zero-latency synchronous rendering
const SEED_PITCH_ENTRIES: Record<string, PitchAccentEntry> = {
  '雨:あめ': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ア＼メ' },
  '雨': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ア＼メ' },
  '飴:あめ': { pattern: 0, category: 'heiban', mora_count: 2, downstep_mora: 0, contour: 'アメ￣' },
  '飴': { pattern: 0, category: 'heiban', mora_count: 2, downstep_mora: 0, contour: 'アメ￣' },
  '箸:はし': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ハ＼シ' },
  '箸': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ハ＼シ' },
  '橋:はし': { pattern: 2, category: 'odaka', mora_count: 2, downstep_mora: 2, contour: 'ハシ＼' },
  '橋': { pattern: 2, category: 'odaka', mora_count: 2, downstep_mora: 2, contour: 'ハシ＼' },
  '端:はし': { pattern: 0, category: 'heiban', mora_count: 2, downstep_mora: 0, contour: 'ハシ￣' },
  '端': { pattern: 0, category: 'heiban', mora_count: 2, downstep_mora: 0, contour: 'ハシ￣' },
  '本:ほん': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ホ＼ン' },
  '本': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ホ＼ン' },
  '猫:ねこ': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ネ＼コ' },
  '猫': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ネ＼コ' },
  '犬:いぬ': { pattern: 2, category: 'odaka', mora_count: 2, downstep_mora: 2, contour: 'イヌ＼' },
  '犬': { pattern: 2, category: 'odaka', mora_count: 2, downstep_mora: 2, contour: 'イヌ＼' },
  '食べる:たべる': { pattern: 2, category: 'nakadaka', mora_count: 3, downstep_mora: 2, contour: 'タベ＼ル' },
  '食べる': { pattern: 2, category: 'nakadaka', mora_count: 3, downstep_mora: 2, contour: 'タベ＼ル' },
  '飲む:のむ': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ノ＼ム' },
  '飲む': { pattern: 1, category: 'atamadaka', mora_count: 2, downstep_mora: 1, contour: 'ノ＼ム' },
  '学校:がっこう': { pattern: 0, category: 'heiban', mora_count: 4, downstep_mora: 0, contour: 'ガッコウ￣' },
  '学校': { pattern: 0, category: 'heiban', mora_count: 4, downstep_mora: 0, contour: 'ガッコウ￣' },
  '先生:せんせい': { pattern: 3, category: 'nakadaka', mora_count: 4, downstep_mora: 3, contour: 'センセ＼イ' },
  '先生': { pattern: 3, category: 'nakadaka', mora_count: 4, downstep_mora: 3, contour: 'センセ＼イ' },
  '日本語:にほんご': { pattern: 0, category: 'heiban', mora_count: 4, downstep_mora: 0, contour: 'ニホンゴ￣' },
  '日本語': { pattern: 0, category: 'heiban', mora_count: 4, downstep_mora: 0, contour: 'ニホンゴ￣' },
};

/**
 * Loads the full compiled pitch accent index from public/data/pitch/pitch-accent-index.json
 */
export async function loadPitchAccentIndex(): Promise<Record<string, PitchAccentEntry>> {
  if (pitchIndexCache) return pitchIndexCache;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      if (typeof fetch !== 'undefined') {
        const res = await fetch('/data/pitch/pitch-accent-index.json');
        if (res.ok) {
          pitchIndexCache = await res.json();
          return pitchIndexCache!;
        }
      }
    } catch (err) {
      console.warn('[pitchAccentManager] Could not load remote pitch index:', err);
    }

    pitchIndexCache = SEED_PITCH_ENTRIES;
    return pitchIndexCache;
  })();

  return loadPromise;
}

/**
 * Synchronous lookup for Tokyo pitch accent with fallback.
 * Checks:
 * 1. Word + reading composite key ("雨:あめ")
 * 2. Word key ("雨")
 * 3. Reading key ("あめ")
 * Returns undefined if unindexed (NEVER defaults to false Heiban 0).
 */
export function lookupPitch(word: string, reading?: string): PitchAccentEntry | undefined {
  if (!word) return undefined;
  const cleanWord = word.trim();
  const cleanReading = reading ? reading.trim() : undefined;

  const dict = pitchIndexCache || SEED_PITCH_ENTRIES;

  if (cleanReading && dict[`${cleanWord}:${cleanReading}`]) {
    return dict[`${cleanWord}:${cleanReading}`];
  }
  if (dict[cleanWord]) {
    return dict[cleanWord];
  }
  if (cleanReading && dict[cleanReading]) {
    return dict[cleanReading];
  }

  return undefined;
}

/**
 * Determines pitch category from pattern number and mora count
 */
export function getPitchCategory(
  pattern: number,
  moraCount: number
): 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka' {
  if (pattern === 0) return 'heiban';
  if (pattern === 1) return 'atamadaka';
  if (pattern === moraCount) return 'odaka';
  return 'nakadaka';
}

/**
 * Returns formatted Indonesian display name for a pitch pattern
 */
export function getPitchPatternName(pattern: number, moraCount?: number): string {
  if (pattern === 0) return '[0] Heiban (Datar)';
  if (pattern === 1) return '[1] Atamadaka (Awal Tinggi)';
  if (moraCount && pattern === moraCount) return `[${pattern}] Odaka (Akhir Tinggi / Partikel Turun)`;
  return `[${pattern}] Nakadaka (Tengah Tinggi)`;
}

/**
 * Formats Tokyo pitch contour string (e.g. "ア＼メ" or "ハシ＼")
 */
export function formatTokyoContour(reading: string, pattern: number): string {
  const morae = splitIntoMora(reading);
  const kataMorae = morae.map(hiraganaToKatakana);
  if (pattern === 0) {
    return kataMorae.join('') + '￣';
  }
  const dropIdx = Math.min(pattern, morae.length);
  return kataMorae.slice(0, dropIdx).join('') + '＼' + kataMorae.slice(dropIdx).join('');
}
