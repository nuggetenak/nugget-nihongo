// ══════════════════════════════════════════════════════════════════
//  budouxSegmenter.ts — Japanese Semantic Line Breaker & Bunsetsu Segmenter
//  Research Basis: Google BudouX (google/budoux)
//  Eliminates awkward kanji compound mid-word line breaks on mobile viewports
// ══════════════════════════════════════════════════════════════════

import { loadDefaultJapaneseParser } from 'budoux';

let cachedParser: ReturnType<typeof loadDefaultJapaneseParser> | null = null;

function getParser() {
  if (!cachedParser) {
    try {
      cachedParser = loadDefaultJapaneseParser();
    } catch (err) {
      console.warn('[BudouX] Failed to initialize default Japanese parser:', err);
    }
  }
  return cachedParser;
}

// Common particle boundaries that form natural bunsetsu breakpoints
const BUNSETSU_BREAK_PARTICLES = [
  'は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'より',
  'も', 'ね', 'よ', 'か', 'の', 'ので', 'から', 'けれど', 'けど', 'のに'
];

// Punctuation characters that force phrase breaks
const PUNCTUATION_BREAKS = ['、', '。', '！', '？', '…', '「', '」', '（', '）', ' '];

/**
 * Segments a Japanese sentence into natural bunsetsu phrase units.
 * Powered by Google BudouX machine learning model with fallback.
 */
export function segmentBunsetsu(sentence: string): string[] {
  if (!sentence || typeof sentence !== 'string') return [];
  const text = sentence.trim();
  if (text.length <= 1) return [text];

  const parser = getParser();
  if (parser) {
    try {
      const tokens = parser.parse(text);
      if (tokens && tokens.length > 0) {
        return tokens.filter(t => t.trim().length > 0);
      }
    } catch {
      // Fall through to fallback
    }
  }

  return fallbackSegment(text);
}

function fallbackSegment(sentence: string): string[] {
  const text = sentence.trim();
  const chunks: string[] = [];
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1] || '';
    const twoChars = char + nextChar;
    current += char;

    // Check multi-char particle breaks
    if (twoChars === 'ので' || twoChars === 'から' || twoChars === 'けど' || twoChars === 'のに') {
      current += nextChar;
      i++; // skip next
      chunks.push(current);
      current = '';
      continue;
    }

    // Check punctuation breaks
    if (PUNCTUATION_BREAKS.includes(char)) {
      chunks.push(current);
      current = '';
      continue;
    }

    // Check single particle breaks if followed by kanji, kana beginning a new word, or quote
    if (BUNSETSU_BREAK_PARTICLES.includes(char) && nextChar && !BUNSETSU_BREAK_PARTICLES.includes(nextChar)) {
      // Don't break if current chunk is too short (e.g. 1 char)
      if (current.length >= 2) {
        chunks.push(current);
        current = '';
      }
    }
  }

  if (current.trim()) {
    chunks.push(current);
  }

  return chunks.filter(c => c.trim().length > 0);
}

/**
 * Formats Japanese text with semantic <wbr> tags for clean mobile wrapping.
 */
export function formatSemanticLineBreaks(sentence: string): string {
  const chunks = segmentBunsetsu(sentence);
  return chunks.join('<wbr>');
}

/**
 * Standard BudouX compatibility method for semantic HTML string conversion
 */
export function translateHTMLString(sentence: string): string {
  return formatSemanticLineBreaks(sentence);
}

/**
 * Generates natural word-scramble chips for interactive quiz construction.
 */
export function generateScrambleChunks(sentence: string): string[] {
  const chunks = segmentBunsetsu(sentence);
  if (chunks.length <= 1) {
    // Fallback splitting into 3-4 character morpheme chunks
    const fallback: string[] = [];
    for (let i = 0; i < sentence.length; i += 3) {
      fallback.push(sentence.substring(i, i + 3));
    }
    return fallback;
  }
  return chunks;
}

/**
 * Generates natural phrase tiles for word-rearrangement quizzes
 */
export function generateScrambleTiles(sentence: string): string[] {
  return generateScrambleChunks(sentence);
}

