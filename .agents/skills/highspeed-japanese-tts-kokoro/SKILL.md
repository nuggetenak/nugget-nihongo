---
name: highspeed-japanese-tts-kokoro
description: High-speed, natural pitch-accent Japanese TTS engine using Kokoro-82M (via kokoro-js WebGPU/WASM in browser and kokoro-onnx in Python).
---

# High-Speed Japanese TTS Kokoro Skill

## Overview
`highspeed-japanese-tts-kokoro` provides ultra-fast, natural Japanese Text-to-Speech synthesis using the **Kokoro-82M** architecture. Unlike the browser's default robotic `window.speechSynthesis`, Kokoro delivers studio-grade natural phoneme flow and accurate mora pitch accents (Heiban, Atamadaka, Nakadaka, Odaka). This helps Indonesian learners hear and emulate native pitch contours.

## Core Capabilities
- **Compact & High Quality:** 82M parameters delivering audio quality comparable to StyleTTS2 and ElevenLabs.
- **Fast Inference:** Runs under 100ms per sentence on modern CPUs using ONNX Runtime.
- **Dual Runtime Support:**
  - **In-Browser / WebGPU:** Powered by `kokoro-js` with quantized weights (`q8`/`q4`) for offline PWA speech drills.
  - **Server / CLI Pipeline:** Powered by `kokoro-onnx` in Python for batch audio pre-rendering.
- **Pitch Accent Fidelity:** Correctly renders pitch rises and falls across Japanese mora boundaries.

## Installation & Setup

### Python (Batch Generation / Edge Server):
```bash
uv pip install kokoro-onnx onnxruntime
```

### Browser / Node.js:
```bash
npm install kokoro-js
```

## Python Usage Example (Audio Asset Pre-Rendering)

```python
from kokoro_onnx import Kokoro
import soundfile as sf

def generate_japanese_drill_audio(text: str, output_path: str, voice: str = "jf_alpha"):
    """
    Generates natural Japanese audio with Kokoro-82M ONNX model.
    """
    # Load model and voices
    kokoro = Kokoro("kokoro-v0_19.onnx", "voices.json")
    
    # Generate audio samples (24kHz standard)
    samples, sample_rate = kokoro.create(
        text,
        voice=voice,
        speed=1.0,
        lang="ja"
    )
    
    # Save as compact WAV or OGG
    sf.write(output_path, samples, sample_rate)
    print(f"Generated: {output_path} ({len(samples)} samples @ {sample_rate}Hz)")

if __name__ == "__main__":
    generate_japanese_drill_audio(
        "介護の現場では、利用者の安全を最優先に考えます。",
        "kaigo_sample.wav"
    )
```

## Browser PWA Usage Example (`kokoro-js`)

```typescript
import { KokoroTTS } from 'kokoro-js';

let ttsInstance: KokoroTTS | null = null;

export async function playNativeSpeech(japaneseText: string) {
  if (!ttsInstance) {
    ttsInstance = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-ONNX', {
      dtype: 'q8',
      device: navigator.gpu ? 'webgpu' : 'wasm',
    });
  }

  const audio = await ttsInstance.generate(japaneseText, {
    voice: 'jf_alpha'
  });

  // Convert to object URL and play
  const audioBlob = await audio.toBlob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const player = new Audio(audioUrl);
  await player.play();
}
```

## Best Practices
1. **SSW & Vocational Dialogues:** Use Kokoro's polite tone voices (`jf_alpha`, `jm_kento`) for realistic service-industry roleplays (restaurants, hotels, hospitals).
2. **Speed Regulation:** Provide speed controls (0.8x for N5 beginners, 1.0x for standard, 1.2x for natural fast speech) to accommodate different learner proficiencies.
3. **PWA Storage Caching:** Store generated audio in IndexedDB or CacheStorage using content hashes so repeat reviews don't re-synthesize.
