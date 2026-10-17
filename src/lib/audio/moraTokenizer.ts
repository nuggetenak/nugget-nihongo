// ══════════════════════════════════════════════════════════════════
//  moraTokenizer.ts — Canonical Japanese Phonological Mora Tokenizer
//  Research Basis: Port et al. (1987), Vance (2008), Kubozono (1999)
//  Consolidates mora extraction for pitch accent, pacing metronomes,
//  and HVPT syllable-timed vs mora-timed discrimination.
// ══════════════════════════════════════════════════════════════════

export const SUTEGANA = new Set([
  'ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
  'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'
]);

/**
 * Splits Japanese text (kana/kanji reading) into phonetically accurate mora units.
 * - Digraphs (きゃ, しゅ, ちょ, etc.) are fused with their consonant base into 1 mora.
 * - Geminate stops (っ / ッ) count as 1 full mora (silent occlusion pause).
 * - Moraic nasal (ん / ン) counts as 1 full mora.
 * - Long vowel marks (ー) count as 1 full mora.
 */
export function splitIntoMora(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const clean = text.trim();
  if (clean.length === 0) return [];

  const moras: string[] = [];
  const chars = Array.from(clean);

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const next = chars[i + 1];

    if (next && SUTEGANA.has(next)) {
      moras.push(char + next);
      i++; // Skip digraph suffix
    } else {
      moras.push(char);
    }
  }

  return moras.filter((m) => m.length > 0);
}

/**
 * Alias for splitIntoMora for compatibility with PitchAccentBadge
 */
export const extractMoras = splitIntoMora;

/**
 * Converts hiragana reading to katakana reading for phonological and pitch display.
 */
export function hiraganaToKatakana(hiragana: string): string {
  return hiragana.replace(/[\u3041-\u3096]/g, (match) => {
    const code = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(code);
  });
}

/**
 * Generates realistic phonological distractors for mora pacing drills,
 * simulating common Indonesian L1 syllable-timed compressions:
 * e.g. collapsing 'きょ・う・と' into 'きょう・と' or erroneously splitting digraph 'き・ょ・う・と'.
 */
export function generatePhonologicalDistractors(reading: string): string[] {
  const correctMorae = splitIntoMora(reading);
  const correctOption = correctMorae.join(' • ');
  const distractors = new Set<string>();

  // Distractor 1: Syllable compression (fuse long vowel or nasal with preceding mora)
  if (correctMorae.length >= 3) {
    const compressed: string[] = [];
    for (let i = 0; i < correctMorae.length; i++) {
      const cur = correctMorae[i];
      const next = correctMorae[i + 1];
      if (next && (next === 'う' || next === 'い' || next === 'ん' || next === 'ー' || next === 'っ')) {
        compressed.push(cur + next);
        i++;
      } else {
        compressed.push(cur);
      }
    }
    const cand = compressed.join(' • ');
    if (cand !== correctOption && compressed.length > 1) {
      distractors.add(cand);
    }
  }

  // Distractor 2: Erroneous character-by-character naive slicing (splitting digraphs)
  const naiveChars = Array.from(reading.trim());
  if (naiveChars.length > correctMorae.length) {
    const cand = naiveChars.join(' • ');
    if (cand !== correctOption) {
      distractors.add(cand);
    }
  }

  // Distractor 3: Missing trailing mora or fused tail
  if (correctMorae.length >= 2) {
    const fusedTail = [...correctMorae.slice(0, -2), correctMorae.slice(-2).join('')].join(' • ');
    if (fusedTail !== correctOption) {
      distractors.add(fusedTail);
    }
  }

  // Fallback distractors if needed
  if (distractors.size < 3) {
    if (correctMorae.length > 1) {
      distractors.add(correctMorae.slice(0, -1).join(' • '));
    }
    distractors.add([...correctMorae].reverse().join(' • '));
  }

  return Array.from(distractors).filter((d) => d !== correctOption).slice(0, 3);
}
