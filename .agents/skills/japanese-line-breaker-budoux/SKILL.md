---
name: japanese-line-breaker-budoux
description: "Client-side Japanese semantic line break organizer and bunsetsu phrase segmenter using Google BudouX (google/budoux) for flawless mobile typography and automated quiz word-scramble chunking."
---

# Japanese Line Breaker & Phrase Chunking Skill (Google BudouX)

This skill provides guides and implementation patterns for **Google BudouX** (`google/budoux`), a machine-learning-based Japanese sentence and phrase segmenter designed specifically for web and mobile typography.

## 1. Why BudouX is Essential for Nugget Nihongo

Japanese does not use whitespace between words. On narrow mobile viewports (e.g. iPhone SE 320px–375px and Android 390px), default browser line-breaking (`word-break: break-all`) often breaks kanji compounds awkwardly across lines (e.g. breaking `日本語` into `日本` and `語` on the next line).

BudouX:
- Is **ultra-lightweight**: ~15 KB total bundle footprint (model + JS runtime).
- Runs **100% offline client-side** with zero external dictionary files, zero cloud APIs, and zero MeCab/WASM dependencies.
- Inserts `<wbr>` (word break opportunity) tags or segments phrases into discrete *bunsetsu* tokens.

---

## 2. In-Browser / React Usage

### Installation in Tooling / Next.js
```bash
npm install budoux
```

### Automatic Semantic Line Break Formatter
```tsx
import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

export function JapaneseText({ text, className = '' }: { text: string; className?: string }) {
  // Translate text into <wbr>-delimited HTML
  const parsedHtml = parser.translateHTMLString(text);

  return (
    <span
      className={`inline-block [word-break:keep-all] [overflow-wrap:anywhere] ${className}`}
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
}
```

---

## 3. Automated Quiz Scramble Chunk Generator

BudouX can automatically slice authentic sample sentences into natural phrase tiles for word-rearrangement and slot-filling drills:

```ts
import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

export function generateScrambleTiles(sentence: string): string[] {
  // e.g. "明日は友達と映画を見に行きます。" -> ["明日は", "友達と", "映画を", "見に", "行きます。"]
  return parser.parse(sentence);
}
```
