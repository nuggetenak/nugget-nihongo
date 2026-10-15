---
name: audio-voice-pipeline
description: "Batch audio generation and voice cloning pipeline using Pocket TTS (kyutai-labs/pocket-tts) and VoiceStudio for Nugget Nihongo Japanese learning content, vocab pronunciation, and Choukai listening drills."
---

# Audio & Voice Pipeline (Pocket TTS + VoiceStudio)

This skill guides generating Japanese speech audio assets, cloning character voices (specifically "Sensei Nugget"), and maintaining audio asset catalogs across Nugget Nihongo's vocabulary, grammar examples, and JFT/JLPT Choukai listening simulations.

## Ecosystem Overview

1. **Kyutai Pocket TTS (`kyutai-labs/pocket-tts`)**:
   - Ultra-fast ~100M parameter model designed for real-time speech generation entirely on CPU.
   - Built-in zero-shot voice cloning from short audio reference snippets.
   - Executable with zero setup using `uv` / `uvx`.
2. **VoiceStudio (`debpalash/VoiceStudio`)**:
   - Local desktop studio interface for multi-model voice cloning, speaker design, prosody adjustment, and audio mastering.
   - Ideal for auditioning and perfecting the signature "Sensei Nugget" voice character.

---

## Directory & Asset Conventions

All generated audio files must be stored under consistent directories:

```
public/
└── audio/
    ├── vocab/          # Format: {id}.mp3 (e.g., vg-n5-00001.mp3)
    ├── grammar/        # Format: {id}-{exIndex}.mp3 (e.g., gn5-00001-0.mp3)
    ├── choukai/        # Listening dialogue sets (e.g., jft-set1-q01.mp3)
    └── sensei/         # Pre-rendered Sensei persona clips (greetings, praise, reminders)
```

Audio specs:
- **Format:** MP3 or OGG (Opus)
- **Sample rate:** 24,000 Hz or 44,100 Hz mono
- **Loudness:** Normalized to -16 LUFS with 0.5s silence padding.

---

## Running Pocket TTS with `uv`

### 1. Test Single Phrase Generation (CLI)
```bash
# Generate single phrase with default Japanese voice
uvx pocket-tts generate --text "こんにちは、ナゲット先生です！" --output output.wav
```

### 2. Voice Cloning with a Reference Audio
When a reference voice clip (e.g., 5–10s WAV of the target Sensei voice) is available:
```bash
uvx pocket-tts generate \
  --text "今日の文法レッスンを始めましょう。" \
  --voice-reference references/sensei_nugget_sample.wav \
  --output public/audio/sensei/lesson_start.mp3
```

### 3. Launch Local Server for Dynamic Generation
```bash
# Starts local web UI and OpenAI-compatible TTS HTTP server
uvx pocket-tts serve --port 8000
```
Then query the local API via POST:
```bash
curl -X POST http://localhost:8000/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{"input": "おはようございます", "voice": "sensei"}' \
  --output greeting.mp3
```

---

## Automated Batch Generation Script

Use the Python automation script at `scripts/generate_audio.py` to batch process datasets:
```bash
# Batch generate audio for N5 vocabulary list
python scripts/generate_audio.py --dataset vocab --level n5 --limit 50

# Batch generate Choukai listening prompts
python scripts/generate_audio.py --dataset choukai --set 1
```

---

## VoiceStudio Persona Workflow

1. **Launch VoiceStudio**: Open VoiceStudio desktop app.
2. **Record / Load Anchor Audio**: Import 3 clean 10-second reference samples of warm, friendly Japanese speech suitable for "Sensei Nugget".
3. **Tune Pitch & Speed**:
   - Speed: `1.0x` standard, `0.85x` for N5/N4 beginner explanations.
   - Clarity: Enhance consonant articulation for mora distinction.
4. **Export Profile**: Save the voice embedding/weights to `reference-audio/sensei_nugget.wav` for Pocket TTS CLI automation.
