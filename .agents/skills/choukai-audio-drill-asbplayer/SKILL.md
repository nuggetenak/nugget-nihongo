---
name: choukai-audio-drill-asbplayer
description: "Sentence-aligned audio player, condensed listening playback, auto-pause drills, and client-side audio slicing using asbplayer immersion patterns (asbplayer/asbplayer) for Choukai and JFT-Basic simulation."
---

# Choukai Audio Drill & Immersion Skill (asbplayer Patterns)

This skill provides design and code patterns inspired by **asbplayer** (`asbplayer/asbplayer`) for interactive Japanese listening comprehension (聴解 - Choukai) and shadow training.

## 1. Core Language Acquisition Features

1. **Condensed Playback:** Automatically jumps past silence / background music between spoken lines, condensing a 5-minute listening track into 2 minutes of pure spoken Japanese input.
2. **Auto-Pause & Shadowing Loops:** Pauses automatically after each sentence so the student can repeat out loud, or repeats a tricky dialogue turn up to $N$ times.
3. **Client-Side Audio Slicing:** Uses browser-native Web Audio API / AudioBuffer to extract a 3-second audio snippet of a target phrase and attach it directly to an FSRS card.

---

## 2. Sentence-Aligned Audio Player Implementation

```ts
interface AudioSentenceSegment {
  id: string;
  startSec: number;
  endSec: number;
  textJapanese: string;
  textIndonesian: string;
}

export class ChoukaiDrillPlayer {
  private audio: HTMLAudioElement;
  private segments: AudioSentenceSegment[];
  private currentIndex: number = 0;
  private isAutoPauseEnabled: boolean = true;
  private isCondensedMode: boolean = false;

  constructor(audioSrc: string, segments: AudioSentenceSegment[]) {
    this.audio = new Audio(audioSrc);
    this.segments = segments;
    this.audio.addEventListener('timeupdate', () => this.handleTimeUpdate());
  }

  private handleTimeUpdate() {
    const current = this.audio.currentTime;
    const currentSegment = this.segments[this.currentIndex];

    if (!currentSegment) return;

    if (current >= currentSegment.endSec) {
      if (this.isAutoPauseEnabled) {
        this.audio.pause();
      } else if (this.isCondensedMode && this.segments[this.currentIndex + 1]) {
        // Skip dead-air and jump immediately to next dialogue start
        this.currentIndex++;
        this.audio.currentTime = this.segments[this.currentIndex].startSec;
      }
    }
  }

  public playSegment(index: number) {
    if (this.segments[index]) {
      this.currentIndex = index;
      this.audio.currentTime = this.segments[index].startSec;
      this.audio.play();
    }
  }

  public repeatCurrentSegment() {
    this.playSegment(this.currentIndex);
  }
}
```

---

## 3. Client-Side Sentence Audio Slicing (Web Audio API)

```ts
export async function sliceAudioSnippet(
  audioBlob: Blob,
  startSec: number,
  endSec: number
): Promise<Blob> {
  const audioContext = new AudioContext();
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const sampleRate = audioBuffer.sampleRate;
  const startOffset = Math.floor(startSec * sampleRate);
  const endOffset = Math.floor(endSec * sampleRate);
  const frameCount = endOffset - startOffset;

  const slicedBuffer = audioContext.createBuffer(
    audioBuffer.numberOfChannels,
    frameCount,
    sampleRate
  );

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    const slicedData = slicedBuffer.getChannelData(channel);
    slicedData.set(channelData.subarray(startOffset, endOffset));
  }

  // Convert to WAV/Blob
  return bufferToWave(slicedBuffer, frameCount);
}
```
