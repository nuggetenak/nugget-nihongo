// ══════════════════════════════════════════════════════════════════
//  tokenizer.ts — Client-Side Japanese Morphological Tokenizer & Furigana
//  Extracts morphemes, resolves ruby furigana, and normalizes kana
// ══════════════════════════════════════════════════════════════════

export interface JapaneseToken {
  surface: string;
  reading?: string;
  isKanji: boolean;
  pos?: 'kanji_compound' | 'inflected_verb_adj' | 'particle' | 'katakana_loanword' | 'punctuation' | 'other';
}

const KANJI_REGEX = /[\u4E00-\u9FAF]/;
const HIRAGANA_REGEX = /^[\u3040-\u309F]+$/;
const KATAKANA_REGEX = /^[\u30A0-\u30FF]+$/;
const PUNCTUATION_REGEX = /^[、。！？…「」（）\s,.!?]+$/;

const PARTICLES = new Set([
  'は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'より',
  'も', 'ね', 'よ', 'か', 'の', 'ので', 'けど', 'のに'
]);

/**
 * Checks if a string contains at least one Kanji character
 */
export function containsKanji(str: string): boolean {
  return KANJI_REGEX.test(str);
}

/**
 * Converts Katakana characters to equivalent Hiragana
 */
export function katakanaToHiragana(str: string): string {
  if (!str) return '';
  return str.replace(/[\u30A0-\u30FF]/g, (ch) => {
    const code = ch.charCodeAt(0);
    // Only transpose standard Katakana letters (exclude middle dots, prolonged marks, etc.)
    if (code >= 0x30A1 && code <= 0x30F6) {
      return String.fromCharCode(code - 0x60);
    }
    return ch;
  });
}

/**
 * Converts bracketed furigana annotations into standard HTML5 <ruby> elements
 * Supports: 私[わたし], 食{た}べる, 漢字(かんじ)
 */
export function toRubyHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let html = text;

  // Bracket format: 漢字[かんじ]
  html = html.replace(/([\u4E00-\u9FAF]+)\[([^\s\]]+)\]/g, '<ruby>$1<rt>$2</rt></ruby>');

  // Curly format: 漢字{かんじ}
  html = html.replace(/([\u4E00-\u9FAF]+)\{([^\s\}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>');

  // Parentheses format: 漢字(かんじ)
  html = html.replace(/([\u4E00-\u9FAF]+)\(([\u3040-\u309F]+)\)/g, '<ruby>$1<rt>$2</rt></ruby>');

  return html;
}

/**
 * Tokenizes a Japanese sentence into discrete morpheme tokens
 */
export function tokenizeJapanese(sentence: string): JapaneseToken[] {
  if (!sentence || typeof sentence !== 'string') return [];
  const text = sentence.trim();
  const tokens: JapaneseToken[] = [];

  let i = 0;
  while (i < text.length) {
    const char = text[i];

    // 1. Punctuation
    if (PUNCTUATION_REGEX.test(char)) {
      tokens.push({
        surface: char,
        isKanji: false,
        pos: 'punctuation',
      });
      i++;
      continue;
    }

    // 2. Katakana loanword run
    if (/[\u30A0-\u30FFー]/.test(char)) {
      let kataRun = '';
      while (i < text.length && /[\u30A0-\u30FFー]/.test(text[i])) {
        kataRun += text[i];
        i++;
      }
      tokens.push({
        surface: kataRun,
        reading: katakanaToHiragana(kataRun),
        isKanji: false,
        pos: 'katakana_loanword',
      });
      continue;
    }

    // 3. Kanji compounds (with attached okurigana if inflected)
    if (KANJI_REGEX.test(char)) {
      let kanjiRun = '';
      while (i < text.length && KANJI_REGEX.test(text[i])) {
        kanjiRun += text[i];
        i++;
      }

      // Collect trailing hiragana (okurigana, e.g. 食 + べる -> 食べる)
      let okurigana = '';
      while (i < text.length && /[\u3040-\u309F]/.test(text[i])) {
        // Stop if we hit a recognized particle attached to the end of a noun
        const potentialParticle = text.slice(i, i + 2);
        if (okurigana.length > 0 && (PARTICLES.has(text[i]) || PARTICLES.has(potentialParticle))) {
          break;
        }
        okurigana += text[i];
        i++;
        // Limit okurigana run length to reasonable verb inflection bounds (max 6 chars)
        if (okurigana.length >= 6) break;
      }

      const fullSurface = kanjiRun + okurigana;
      tokens.push({
        surface: fullSurface,
        isKanji: true,
        pos: okurigana.length > 0 ? 'inflected_verb_adj' : 'kanji_compound',
      });
      continue;
    }

    // 4. Hiragana run or Particle
    if (/[\u3040-\u309F]/.test(char)) {
      // Check for multi-char particle first
      const twoChar = text.slice(i, i + 2);
      if (PARTICLES.has(twoChar)) {
        tokens.push({
          surface: twoChar,
          isKanji: false,
          pos: 'particle',
        });
        i += 2;
        continue;
      }

      // Check single particle
      if (PARTICLES.has(char)) {
        tokens.push({
          surface: char,
          isKanji: false,
          pos: 'particle',
        });
        i++;
        continue;
      }

      // Hiragana word run
      let hiraRun = '';
      while (i < text.length && /[\u3040-\u309F]/.test(text[i]) && !PARTICLES.has(text[i])) {
        hiraRun += text[i];
        i++;
      }
      tokens.push({
        surface: hiraRun || char,
        isKanji: false,
        pos: 'other',
      });
      if (!hiraRun) i++;
      continue;
    }

    // 5. Fallback for alphanumeric or other characters
    tokens.push({
      surface: char,
      isKanji: false,
      pos: 'other',
    });
    i++;
  }

  return tokens;
}
