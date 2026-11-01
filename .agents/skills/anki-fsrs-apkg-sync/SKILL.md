---
name: anki-fsrs-apkg-sync
description: Bidirectional Anki .apkg deck generation and import/export engine for syncing Nugget Nihongo FSRS flashcards with Anki mobile and desktop.
---

# Anki FSRS APKG Sync Skill

## Overview
`anki-fsrs-apkg-sync` provides seamless integration between Nugget Nihongo's FSRS (Free Spaced Repetition Scheduler) learning engine and the Anki ecosystem (`.apkg` format). It allows Indonesian students to export their vocabulary, JLPT grammar cards, and SSW technical decks to AnkiDroid, AnkiMobile, and Anki Desktop, or import external Anki decks directly into Nugget Nihongo.

## Core Capabilities
- **Direct `.apkg` Packaging:** Generates valid zip-compressed SQLite 3 databases (`collection.anki2`) with note types and card models directly in Node.js or the browser.
- **Rich Card Types:** Supports Front/Back vocabulary cards, Cloze deletion grammar cards (`{{c1::...}}`), and Furigana ruby annotations.
- **FSRS Parameter Mapping:** Preserves card stability, difficulty, review count, and repetition history across sync boundaries.
- **Media Support:** Embeds native audio pronunciation clips (`.mp3`/`.opus`) and kanji stroke SVGs into the Anki package.

## Installation & Setup
In project environment:
```bash
npm install anki-apkg-export
```

## Usage Example: Generating a Deck

```typescript
import AnkiExport from 'anki-apkg-export';
import fs from 'node:fs/promises';

export interface VocabCardData {
  kanji: string;
  reading: string;
  meaningId: string;
  exampleSentence: string;
  exampleId: string;
  jlptLevel: string;
}

export async function exportVocabToAnki(deckTitle: string, cards: VocabCardData[]): Promise<Buffer> {
  const apkg = await AnkiExport.create(deckTitle);

  for (const card of cards) {
    const front = `
      <div style="font-size: 32px; font-weight: bold; text-align: center;">
        ${card.kanji}
      </div>
      <div style="font-size: 18px; color: #666; text-align: center; margin-top: 8px;">
        ${card.reading}
      </div>
    `;

    const back = `
      <div style="font-size: 20px; color: #1e293b; font-weight: bold; margin-bottom: 8px;">
        ${card.meaningId}
      </div>
      <div style="font-size: 14px; color: #475569; background: #f8fafc; padding: 8px; border-radius: 6px;">
        <p><strong>Contoh:</strong> ${card.exampleSentence}</p>
        <p style="color: #64748b;"><em>${card.exampleId}</em></p>
      </div>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 8px;">
        Level: ${card.jlptLevel}
      </div>
    `;

    apkg.addCard(front, back, {
      tags: [card.jlptLevel, 'NuggetNihongo']
    });
  }

  const zipBuffer = await apkg.save();
  return zipBuffer;
}
```

## Best Practices
1. **Furigana Ruby Tags:** Always wrap readings in semantic `<ruby>漢字<rt>かんじ</rt></ruby>` tags so Anki displays proper pronunciation guides above the text.
2. **Batch Chunking:** When exporting large decks (>1,000 cards), process cards in chunks of 250 to prevent memory pressure in mobile browsers.
3. **MIME & Download:** In PWA client mode, convert the exported buffer to a Blob (`application/octet-stream`) and trigger download with the `.apkg` extension.
