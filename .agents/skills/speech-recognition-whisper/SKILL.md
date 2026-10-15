---
name: speech-recognition-whisper
description: "Speech-to-Text and pronunciation grading skill using Whisper (Transformers.js client-side in-browser WASM and faster-whisper Python CLI) for Japanese pronunciation scoring, speech drills, and Choukai listening transcription."
---

# Speech Recognition & Pronunciation Skill (Whisper)

This skill provides implementation patterns and workflows for:
1. **Client-side In-Browser Pronunciation Drills**: Capturing student speech via browser Web Audio API and transcribing it locally via `@xenova/transformers` (Whisper ONNX).
2. **Pronunciation Accuracy Scoring**: Matching student spoken output with expected Japanese text (Hiragana/Katakana/Kanji) to score accuracy.
3. **Batch Audio Transcription**: Using Python `faster-whisper` to auto-generate transcripts, furigana readings, and timed subtitles from listening test audio.

---

## 1. Client-Side Whisper (Transformers.js / WebAssembly)

Running Whisper entirely in the browser allows offline, private, and zero-cost speech grading without sending audio bytes to a remote server.

### Installation
In `nugget-nihongo-next`:
```bash
npm install @xenova/transformers
```

### In-Browser Pipeline Singleton
```ts
// src/lib/audio/whisper-client.ts
import { pipeline } from '@xenova/transformers';

let transcriber: any = null;

export async function getWhisperTranscriber(onProgress?: (progress: number) => void) {
  if (!transcriber) {
    transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
      progress_callback: (info: any) => {
        if (info.status === 'progress' && onProgress) {
          onProgress(Math.round(info.progress || 0));
        }
      },
    });
  }
  return transcriber;
}

export async function transcribeStudentAudio(audioBlob: Blob): Promise<string> {
  const transcriber = await getWhisperTranscriber();
  const audioBuffer = await audioBlob.arrayBuffer();
  const audioContext = new AudioContext({ sampleRate: 16000 });
  const decoded = await audioContext.decodeAudioData(audioBuffer);
  const channelData = decoded.getChannelData(0);

  const output = await transcriber(channelData, {
    language: 'japanese',
    task: 'transcribe',
  });

  return output.text.trim();
}
```

---

## 2. Pronunciation Scoring Algorithm

Convert both expected text and student transcription to normalized Hiragana using `wanakana` before calculating similarity:

```ts
import * as wanakana from 'wanakana';

export function calculatePronunciationScore(expected: string, transcribed: string): {
  score: number;
  match: boolean;
  expectedKana: string;
  spokenKana: string;
} {
  const expectedKana = wanakana.toHiragana(expected.replace(/\s+/g, ''));
  const spokenKana = wanakana.toHiragana(transcribed.replace(/\s+/g, ''));

  if (expectedKana === spokenKana) {
    return { score: 100, match: true, expectedKana, spokenKana };
  }

  // Levenshtein similarity distance
  const distance = levenshteinDistance(expectedKana, spokenKana);
  const maxLen = Math.max(expectedKana.length, spokenKana.length);
  const score = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

  return {
    score,
    match: score >= 80,
    expectedKana,
    spokenKana,
  };
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}
```

---

## 3. Local Batch Audio Transcription (`faster-whisper`)

For transcribing long Choukai exam audio or dialogue recordings:

```bash
# Run faster-whisper via uv/python
uv run python -c "
from faster_whisper import WhisperModel

model = WhisperModel('small', device='cpu', compute_type='int8')
segments, info = model.transcribe('public/audio/choukai/soal_1.mp3', language='ja')

for segment in segments:
    print(f'[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}')
"
```
