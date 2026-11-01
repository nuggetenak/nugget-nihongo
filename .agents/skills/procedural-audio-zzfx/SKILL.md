---
name: procedural-audio-zzfx
description: Zero-asset procedural WebAudio SFX synthesizer for Nugget Nihongo gamification, combo audio feedback, correct/incorrect dings, and milestone fanfares.
---

# Procedural Audio ZzFX Skill

## Overview
`procedural-audio-zzfx` provides ultra-lightweight, mathematical sound effect synthesis for Nugget Nihongo using the Web Audio API. By generating audio waveforms in memory, it eliminates the need to download `.mp3` or `.wav` sound files, saving mobile bandwidth and removing audio playback latency on budget mobile devices.

## Core Capabilities
- **Zero Asset Overhead:** <1KB minified library code; 0 bytes of static audio assets.
- **Instant Auditory Feedback:** 0ms network latency; sounds trigger immediately on button tap.
- **Algorithmic Tuning:** 20 sound synthesis parameters (frequency, sustain, pitch jump, tremolo, noise).
- **Offline Resilient:** 100% functional without an active internet connection.

## Installation & Setup
In project environment:
```bash
npm install zzfx
```

## Sound Presets for Nugget Nihongo

```typescript
import { zzfx, ZZFX } from 'zzfx';

export const NuggetSFX = {
  /**
   * Correct Answer Chime: Cheerful rising bell sound.
   */
  correct: () => {
    zzfx(...[,,480,.03,.09,.17,1,1.8,7.9,,,,,.1,,.1,,.7,.04]);
  },

  /**
   * Incorrect Answer Tone: Soft low double-thud, non-punitive.
   */
  wrong: () => {
    zzfx(...[,,160,.05,.12,.22,2,.4,-3.9,,,,,.6,,.3,.1,.5,.08]);
  },

  /**
   * Card Flip (FSRS Review): Crisp tactile micro-click.
   */
  cardFlip: () => {
    zzfx(...[,,1200,.01,.02,,1,2,,,,,,,,,,.6,.01]);
  },

  /**
   * Streak Bonus / Level Up: Japanese arcade-style 4-tone ascending fanfare.
   */
  levelUp: () => {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        zzfx(...[,,freq,.02,.12,.25,,1.6,,,,,,.15,,,,]);
      }, idx * 75);
    });
  }
};
```

## Best Practices
1. **User Audio Mute Preference:** Always check user audio settings (`localStorage.getItem('nugget_sfx_muted')`) before calling `zzfx()`.
2. **Web Audio Unlock:** Ensure the first audio trigger occurs following a user gesture (tap/click) to comply with browser autoplay policies.
3. **Volume Scaling:** Set `ZZFX.volume = 0.25` for comfortable mobile earphone listening.
