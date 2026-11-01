// ══════════════════════════════════════════════════════════════════
//  counterEngine.ts — Japanese Counter Sound-Shift Engine & Quiz Evaluator
//  Calculates onbin sound changes, provides phonetic breakdowns,
//  and executes intelligent fuzzy searches across objects and categories.
// ══════════════════════════════════════════════════════════════════

import {
  JapaneseCounter,
  CounterCategory,
  MASTER_COUNTERS,
  COUNTER_QUIZ_BANK,
  CounterQuizQuestion,
} from './counterData';

/**
 * Searches the counter bank by kanji, kana, Indonesian description, or countable object name
 */
export function searchCounters(query: string): JapaneseCounter[] {
  const q = query.trim().toLowerCase();
  if (!q) return MASTER_COUNTERS;

  return MASTER_COUNTERS.filter((counter) => {
    return (
      counter.kanji.toLowerCase().includes(q) ||
      counter.kana.toLowerCase().includes(q) ||
      counter.romaji.toLowerCase().includes(q) ||
      counter.nameId.toLowerCase().includes(q) ||
      counter.targetObjects.some((obj) => obj.toLowerCase().includes(q)) ||
      counter.targetObjectsId.some((obj) => obj.toLowerCase().includes(q))
    );
  });
}

/**
 * Filters counters by category
 */
export function filterCountersByCategory(
  category: CounterCategory | 'all'
): JapaneseCounter[] {
  if (category === 'all') return MASTER_COUNTERS;
  return MASTER_COUNTERS.filter((c) => c.category === category);
}

/**
 * Finds a specific counter by ID or Kanji
 */
export function getCounterById(idOrKanji: string): JapaneseCounter | undefined {
  return MASTER_COUNTERS.find(
    (c) => c.id === idOrKanji || c.kanji === idOrKanji
  );
}

/**
 * Result of the dynamic sound-shift calculation
 */
export interface SoundShiftResult {
  number: number;
  kanji: string;
  kana: string;
  romaji: string;
  hasSoundChange: boolean;
  phoneticExplanation: string;
}

/**
 * Dynamically calculates the reading of any counter from 1 to 100 with phonetic explanation
 */
export function calculateCounterReading(
  counter: JapaneseCounter,
  num: number
): SoundShiftResult {
  const clampedNum = Math.max(1, Math.min(100, Math.floor(num)));

  // If number is between 1 and 10, pull directly from the verified table
  if (clampedNum <= 10) {
    const entry = counter.readings1to10.find((r) => r.number === clampedNum);
    if (entry) {
      let explanation = 'Pola pembacaan teratur tanpa pergeseran fonetis.';
      if (entry.changeType === 'sokuon') {
        explanation = `Terjadi pergeseran fonetis Sokuon (konsonan ganda / っ) pada angka ${clampedNum}.`;
      } else if (entry.changeType === 'rendaku') {
        explanation = `Terjadi fenomena Rendaku (penyuaraan vokal lunak, misal: h → b/p atau k → g) pada angka ${clampedNum}.`;
      } else if (entry.changeType === 'wago') {
        explanation = `Menggunakan sistem bilangan asli Jepang kuno (Wago) yang unik.`;
      } else if (entry.changeType === 'special') {
        explanation = `Pengecualian khusus dalam konvensi bahasa Jepang.`;
      }

      return {
        number: clampedNum,
        kanji: entry.kanji,
        kana: entry.kana,
        romaji: entry.romaji,
        hasSoundChange: entry.isIrregular,
        phoneticExplanation: explanation,
      };
    }
  }

  // Handling for 11 to 99:
  // In Japanese, the tens part is composed of (2-9) + juu + ones reading
  // The ones digit determines the sound shift of the counter!
  const tens = Math.floor(clampedNum / 10);
  const ones = clampedNum % 10;

  const TENS_KANA = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'];
  const TENS_ROMAJI = ['', 'juu', 'nijuu', 'sanjuu', 'yonjuu', 'gojuu', 'rokujuu', 'nanajuu', 'hachijuu', 'kyuujuu'];

  // Special case: 100
  if (clampedNum === 100) {
    if (counter.id === 'hon') {
      return {
        number: 100,
        kanji: '100本',
        kana: 'ひゃっぽん',
        romaji: 'hyappon',
        hasSoundChange: true,
        phoneticExplanation: 'Angka 100 (ひゃく) berpadu dengan 本 menghasilkan Sokuon "hyappon".',
      };
    }
    if (counter.id === 'hiki') {
      return {
        number: 100,
        kanji: '100匹',
        kana: 'ひゃっぴき',
        romaji: 'hyappiki',
        hasSoundChange: true,
        phoneticExplanation: 'Angka 100 (ひゃく) berpadu dengan 匹 menghasilkan Sokuon "hyappiki".',
      };
    }
    return {
      number: 100,
      kanji: `100${counter.kanji}`,
      kana: `ひゃく${counter.kana}`,
      romaji: `hyaku${counter.romaji}`,
      hasSoundChange: false,
      phoneticExplanation: 'Angka 100 (hyaku) diikuti kata bantu bilangan secara teratur.',
    };
  }

  // Exact tens (20, 30, 40...):
  if (ones === 0) {
    const tensPrefixKana = TENS_KANA[tens];
    const tensPrefixRomaji = TENS_ROMAJI[tens];

    // For counters with Sokuon at 10 (like 本 = じゅっぽん, 冊 = じゅっさつ, 個 = じゅっこ)
    const base10 = counter.readings1to10.find((r) => r.number === 10);
    if (base10 && base10.changeType === 'sokuon') {
      const baseSuffixKana = base10.kana.replace(/^じゅっ/, 'じゅっ');
      const baseSuffixRomaji = base10.romaji.replace(/^ju/, 'ju');

      return {
        number: clampedNum,
        kanji: `${clampedNum}${counter.kanji}`,
        kana: `${tensPrefixKana.slice(0, -3)}じゅっ${baseSuffixKana.slice(4)}`,
        romaji: `${tensPrefixRomaji.slice(0, -3)}ju${baseSuffixRomaji.slice(3)}`,
        hasSoundChange: true,
        phoneticExplanation: `Kelipatan sepuluh (${clampedNum}) mempertahankan akhiran sokuon "jupp..." dari angka 10.`,
      };
    }

    return {
      number: clampedNum,
      kanji: `${clampedNum}${counter.kanji}`,
      kana: `${tensPrefixKana}${counter.kana}`,
      romaji: `${tensPrefixRomaji}${counter.romaji}`,
      hasSoundChange: false,
      phoneticExplanation: `Kelipatan sepuluh (${clampedNum}) dibaca dengan menggabungkan puluhan + kata bantu secara teratur.`,
    };
  }

  // Compound numbers (e.g. 23, 45, 81):
  const tensPrefixKana = TENS_KANA[tens];
  const tensPrefixRomaji = TENS_ROMAJI[tens];
  const onesEntry = counter.readings1to10.find((r) => r.number === ones);

  if (onesEntry) {
    return {
      number: clampedNum,
      kanji: `${clampedNum}${counter.kanji}`,
      kana: `${tensPrefixKana}${onesEntry.kana}`,
      romaji: `${tensPrefixRomaji}${onesEntry.romaji}`,
      hasSoundChange: onesEntry.isIrregular,
      phoneticExplanation: onesEntry.isIrregular
        ? `Angka puluhan (${tensPrefixKana}) digabungkan dengan angka satuan ${ones} yang mengalami pergeseran fonetis (${onesEntry.kana}).`
        : `Angka puluhan (${tensPrefixKana}) digabungkan dengan satuan ${ones} secara teratur.`,
    };
  }

  return {
    number: clampedNum,
    kanji: `${clampedNum}${counter.kanji}`,
    kana: `${clampedNum}${counter.kana}`,
    romaji: `${clampedNum}${counter.romaji}`,
    hasSoundChange: false,
    phoneticExplanation: 'Pembacaan standar.',
  };
}

/**
 * Returns a randomized or sequential set of quiz questions
 */
export function getCounterQuestions(limit?: number): CounterQuizQuestion[] {
  if (!limit || limit >= COUNTER_QUIZ_BANK.length) return COUNTER_QUIZ_BANK;
  return COUNTER_QUIZ_BANK.slice(0, limit);
}
