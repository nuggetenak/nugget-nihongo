---
name: japanese-morphology-parser
description: "In-browser Japanese morphological analysis, tokenization, de-conjugation, and automatic furigana generation using kuromoji.js and wanakana."
---

# Japanese Morphology & Auto-Furigana Skill (Kuromoji.js)

This skill provides patterns for tokenizing raw Japanese text into morphemes, identifying parts of speech (POS), restoring conjugated verbs/adjectives to their base dictionary forms, and generating standard HTML `<ruby>` furigana tags entirely on the client side.

## 1. Setup & Initialization
```bash
npm install kuromoji wanakana
```

Dictionary files (`dict/*.dat.gz`) should be hosted in `public/dict/` so `kuromoji.js` can load them via browser `fetch`:

```ts
import kuromoji from 'kuromoji';

let tokenizerInstance: kuromoji.Tokenizer<kuromoji.IpadicFeatures> | null = null;

export async function getTokenizer(): Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>> {
  if (tokenizerInstance) return tokenizerInstance;

  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: '/dict/' }).build((err, tokenizer) => {
      if (err) reject(err);
      else {
        tokenizerInstance = tokenizer;
        resolve(tokenizer);
      }
    });
  });
}
```

## 2. Generating `<ruby>` Furigana HTML
```ts
import * as wanakana from 'wanakana';

export async function generateRubyFurigana(text: string): Promise<string> {
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(text);

  return tokens
    .map((token) => {
      // If token is punctuation, hiragana, or katakana, return as-is
      if (!wanakana.isKanji(token.surface_form) && !/[\u4e00-\u9faf]/.test(token.surface_form)) {
        return token.surface_form;
      }

      // Convert Katakana reading from kuromoji to Hiragana
      const reading = token.reading ? wanakana.toHiragana(token.reading) : '';
      if (!reading || reading === token.surface_form) {
        return token.surface_form;
      }

      return `<ruby>${token.surface_form}<rt>${reading}</rt></ruby>`;
    })
    .join('');
}
```

## 3. Verb & Adjective De-Conjugation Lookup
When a student taps on `食べさせられた`:
```ts
const tokens = tokenizer.tokenize('食べさせられた');
// tokens[0].surface_form = '食べさせ'
// tokens[0].basic_form = '食べる' (Dictionary form!)
// tokens[0].pos = '動詞' (Verb)
```
This enables one-tap lookup directly to JMDict entries without requiring complex regexes.
