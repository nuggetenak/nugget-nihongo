// ══════════════════════════════════════════════════════════════════
//  budouxParser.ts — Google BudouX Semantic Japanese Bunsetsu Parser
//  Research Basis: Google BudouX (google/budoux)
//  Lightweight machine-learning model (~15 KB) for semantic line breaking
//  and non-destructive word-rearrangement phrase tokenization.
// ══════════════════════════════════════════════════════════════════

import { loadDefaultJapaneseParser } from 'budoux';

let cachedParser: ReturnType<typeof loadDefaultJapaneseParser> | null = null;

/**
 * Returns the singleton Google BudouX Japanese parser instance.
 */
export function getBudouxParser() {
  if (!cachedParser) {
    try {
      cachedParser = loadDefaultJapaneseParser();
    } catch (err) {
      console.warn('[BudouX] Failed to initialize default Japanese parser:', err);
    }
  }
  return cachedParser;
}

// Fallback phrase particles for robust zero-dependency offline safety
const FALLBACK_BREAK_PARTICLES = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'より', 'も', 'ね', 'よ'];
const PUNCTUATION = ['、', '。', '！', '？', '…', '「', '」', '（', '）', ' '];

function fallbackSegment(text: string): string[] {
  const chunks: string[] = [];
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1] || '';
    cur += ch;
    if (PUNCTUATION.includes(ch)) {
      chunks.push(cur);
      cur = '';
    } else if (FALLBACK_BREAK_PARTICLES.includes(ch) && next && !FALLBACK_BREAK_PARTICLES.includes(next)) {
      if (cur.length >= 2) {
        chunks.push(cur);
        cur = '';
      }
    }
  }
  if (cur.trim()) chunks.push(cur);
  return chunks.filter(c => c.trim().length > 0);
}

/**
 * Parses Japanese text into discrete bunsetsu phrase tokens.
 * Accurately preserves polite copulas (です, でした, ます, ました),
 * compound nouns (ごはん), and discourse markers (ところで).
 */
export function parseBunsetsu(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const clean = text.trim();
  if (clean.length === 0) return [];

  const parser = getBudouxParser();
  if (parser) {
    try {
      const tokens = parser.parse(clean);
      if (tokens && tokens.length > 0) {
        return tokens.filter(t => t.trim().length > 0);
      }
    } catch {
      // Fall through to fallback
    }
  }

  return fallbackSegment(clean);
}

/**
 * Formats a Japanese sentence with semantic <wbr> tags for clean responsive line breaking.
 */
export function formatSemanticLineBreaks(text: string): string {
  const tokens = parseBunsetsu(text);
  if (tokens.length <= 1) return text;
  return tokens.join('<wbr>');
}

/**
 * Translates Japanese HTML or text into <wbr>-interleaved markup.
 */
export function translateHTMLString(text: string): string {
  if (!text) return '';
  const parser = getBudouxParser();
  if (parser && typeof parser.translateHTMLString === 'function') {
    try {
      return parser.translateHTMLString(text);
    } catch {
      // Fall through
    }
  }
  return formatSemanticLineBreaks(text);
}

/**
 * Generates natural cohesive scramble chunks for sentence rearrange quizzes.
 * Clamps output to a balanced number of tokens (3 to 6) suitable for mobile UI.
 */
export function generateWordScrambleChunks(sentence: string, maxChunks: number = 6): string[] {
  if (!sentence) return [];
  const clean = sentence.replace(/[。！？\s]+$/, '').trim();
  if (!clean) return [];

  const rawTokens = parseBunsetsu(clean);
  if (rawTokens.length <= maxChunks) {
    // If fewer than 3 tokens and sentence is long enough, split longer tokens
    if (rawTokens.length < 3 && clean.length >= 6) {
      // Attempt finer particle splitting or sub-tokenization
      const fine: string[] = [];
      for (const tok of rawTokens) {
        if (tok.length > 5) {
          const sub = fallbackSegment(tok);
          if (sub.length > 1) {
            fine.push(...sub);
            continue;
          }
        }
        fine.push(tok);
      }
      if (fine.length >= 3 && fine.length <= maxChunks) {
        return fine;
      }
    }
    return rawTokens.length > 0 ? rawTokens : [clean];
  }

  // Merge adjacent short tokens if count exceeds maxChunks
  const merged: string[] = [...rawTokens];
  while (merged.length > maxChunks) {
    // Find shortest adjacent pair to merge
    let minLen = Infinity;
    let mergeIdx = 0;
    for (let i = 0; i < merged.length - 1; i++) {
      const combinedLen = merged[i].length + merged[i + 1].length;
      if (combinedLen < minLen) {
        minLen = combinedLen;
        mergeIdx = i;
      }
    }
    merged.splice(mergeIdx, 2, merged[mergeIdx] + merged[mergeIdx + 1]);
  }

  return merged;
}
