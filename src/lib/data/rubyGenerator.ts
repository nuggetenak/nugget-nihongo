// ══════════════════════════════════════════════════════════════════
//  rubyGenerator.ts — Client-Side Semantic HTML5 <ruby><rt> Furigana Generator
//  Compliant with W3C Ruby Annotation & WCAG A11y Standards
//  Transforms bracketed text and kanji tokens into accessible HTML markup
// ══════════════════════════════════════════════════════════════════

export interface RubySegment {
  kanji: string;
  rt?: string;
}

const KANJI_REGEX = /[\u4E00-\u9FAF]/;
const KANA_OR_PUNCT_REGEX = /^[\u3040-\u309F\u30A0-\u30FF\u3000-\u303F\uFF00-\uFFEF\s0-9a-zA-Z.,!?〜ー-]+$/;

/**
 * Checks if a string contains at least one Kanji character.
 */
export function containsKanji(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  return KANJI_REGEX.test(str);
}

/**
 * Checks if a string consists entirely of Kana (Hiragana/Katakana), punctuation, or whitespace.
 */
export function isPureKana(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  return KANA_OR_PUNCT_REGEX.test(str);
}

/**
 * Strips bracketed furigana from a string, restoring the clean Kanji/Kana surface text.
 * e.g., "私【わたし】は学生[がくせい]です" -> "私は学生です"
 */
export function stripFurigana(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    // Japanese brackets: 【わたし】
    .replace(/([\u4E00-\u9FAF]+)【([^】]+)】/g, '$1')
    // Square brackets: [わたし]
    .replace(/([\u4E00-\u9FAF]+)\[([^\]]+)\]/g, '$1')
    // Curly brackets: {わたし}
    .replace(/([\u4E00-\u9FAF]+)\{([^\}]+)\}/g, '$1')
    // Parentheses: (わたし) only if preceded by Kanji
    .replace(/([\u4E00-\u9FAF]+)\(([\u3040-\u309F]+)\)/g, '$1')
    .trim();
}

/**
 * Extracts reading-only representation from bracketed text.
 * e.g., "私【わたし】は学生[がくせい]です" -> "わたしはがくせいです"
 */
export function extractFuriganaOnly(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/[\u4E00-\u9FAF]+【([^】]+)】/g, '$1')
    .replace(/[\u4E00-\u9FAF]+\[([^\]]+)\]/g, '$1')
    .replace(/[\u4E00-\u9FAF]+\{([^\}]+)\}/g, '$1')
    .replace(/[\u4E00-\u9FAF]+\(([\u3040-\u309F]+)\)/g, '$1')
    .trim();
}

/**
 * Parses Japanese text into discrete segments with optional ruby furigana readings.
 * Supports:
 * - 私【わたし】
 * - 私[わたし]
 * - 食{た}べる
 * - 漢字(かんじ)
 * - Automatic stem/okurigana alignment when an explicit readingHint is provided
 */
export function parseRubySegments(text: string, readingHint?: string): RubySegment[] {
  if (!text || typeof text !== 'string') return [];
  const clean = text.trim();
  if (clean.length === 0) return [];

  // Pattern 1: Text contains explicit bracketed annotations
  const bracketRegex = /([\u4E00-\u9FAF]+)(?:【([^】]+)】|\[([^\]]+)\]|\{([^\}]+)\}|\(([\u3040-\u309F]+)\))/g;

  if (bracketRegex.test(clean)) {
    const segments: RubySegment[] = [];
    let lastIndex = 0;
    bracketRegex.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = bracketRegex.exec(clean)) !== null) {
      // Non-kanji prefix before this match
      if (match.index > lastIndex) {
        segments.push({ kanji: clean.slice(lastIndex, match.index) });
      }

      const kanji = match[1];
      const rt = match[2] || match[3] || match[4] || match[5];
      segments.push({ kanji, rt });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < clean.length) {
      segments.push({ kanji: clean.slice(lastIndex) });
    }

    return segments;
  }

  // Pattern 2: No brackets, but readingHint is provided and differs from text
  if (readingHint && readingHint !== clean && containsKanji(clean)) {
    const hint = readingHint.trim();

    // Heuristic 1: If clean is single kanji + okurigana (e.g. "食べる", reading "たべる")
    // Find common suffix between clean and hint
    let suffixLen = 0;
    while (
      suffixLen < clean.length &&
      suffixLen < hint.length &&
      clean[clean.length - 1 - suffixLen] === hint[hint.length - 1 - suffixLen]
    ) {
      suffixLen++;
    }

    if (suffixLen > 0) {
      const kanjiPart = clean.slice(0, clean.length - suffixLen);
      const okuriganaPart = clean.slice(clean.length - suffixLen);
      const rtPart = hint.slice(0, hint.length - suffixLen);

      return [
        { kanji: kanjiPart, rt: rtPart },
        { kanji: okuriganaPart },
      ];
    }

    // Heuristic 2: Entire word is Kanji compound (e.g. "東京", reading "とうきょう")
    return [{ kanji: clean, rt: hint }];
  }

  // Pattern 3: Plain text without readings
  return [{ kanji: clean }];
}

export interface GenerateRubyOptions {
  showFurigana?: boolean;
  rtClass?: string;
  rpStart?: string;
  rpEnd?: string;
}

/**
 * Generates semantic HTML5 <ruby><rp>(</rp><rt>...</rt><rp>)</rp></ruby> string.
 */
export function generateRubyHtml(
  text: string,
  readingHint?: string,
  options: GenerateRubyOptions = {}
): string {
  const {
    showFurigana = true,
    rtClass = 'text-[0.6em] text-accent/80 select-none font-normal [ruby-position:over]',
    rpStart = '(',
    rpEnd = ')',
  } = options;

  if (!text) return '';

  if (!showFurigana) {
    return stripFurigana(text);
  }

  const segments = parseRubySegments(text, readingHint);

  return segments
    .map((seg) => {
      if (seg.rt) {
        return `<ruby class="[ruby-position:over] font-jp">${seg.kanji}<rp class="text-[0em] opacity-0">${rpStart}</rp><rt class="${rtClass}">${seg.rt}</rt><rp class="text-[0em] opacity-0">${rpEnd}</rp></ruby>`;
      }
      return seg.kanji;
    })
    .join('');
}
