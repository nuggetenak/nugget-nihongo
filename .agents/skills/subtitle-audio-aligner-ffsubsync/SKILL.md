---
name: subtitle-audio-aligner-ffsubsync
description: Automatic speech-to-subtitle forced alignment and synchronization engine for Choukai listening exercises and video immersion clips.
---

# Subtitle Audio Aligner FFSubsync Skill

## Overview
`subtitle-audio-aligner-ffsubsync` provides automated, language-agnostic speech-to-subtitle synchronization using Voice Activity Detection (VAD) and acoustic alignment. In Nugget Nihongo's Choukai (listening) drills and video shadowing simulations, imported subtitle files often suffer from 500ms–2000ms drift. This engine synchronizes SRT/VTT timecodes directly to the spoken audio track.

## Core Capabilities
- **Sub-Second Precision:** Automatically corrects linear drift, framerate mismatches, and audio delays.
- **Reference-Free Alignment:** Extracts speech energy directly from audio/video files using FFmpeg and WebRTC VAD.
- **Dual Mode:** Syncs subtitles against raw audio (`.mp3`, `.wav`, `.opus`) or against an already-synchronized reference subtitle in another language.
- **Direct VTT/SRT Pipeline:** Outputs browser-ready WebVTT files with exact start/end timestamps for synchronized karaoke highlighting.

## Installation & Setup
In Python pipeline:
```bash
uv pip install ffsubsync
```
System requirements:
- Ensure `ffmpeg` is available on the system PATH.

## CLI & Script Usage

### Command Line
```bash
# Synchronize an out-of-sync subtitle file directly against audio/video
ffsubsync dialogue_audio.mp3 -i unsynced_transcript.srt -o synced_transcript.vtt

# Synchronize using an already-synced reference subtitle
ffsubsync japanese_synced.srt -i indonesian_raw.srt -o indonesian_synced.srt
```

### Python Integration
```python
import subprocess
from pathlib import Path

def align_choukai_audio(audio_path: str, subtitle_path: str, output_path: str):
    """
    Synchronizes subtitle timecodes to audio speech energy.
    """
    cmd = [
        "ffsubsync",
        audio_path,
        "-i", subtitle_path,
        "-o", output_path,
        "--max-offset-seconds", "30"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"Successfully aligned subtitles: {output_path}")
    else:
        print(f"Alignment error: {result.stderr}")

if __name__ == "__main__":
    align_choukai_audio("assets/choukai_n3_01.mp3", "assets/transcript_raw.srt", "assets/transcript_synced.vtt")
```

## Best Practices
1. **PWA Karaoke Highlighting:** Convert output `.vtt` into JSON cue arrays (`{ start: number, end: number, text: string }`) for zero-dependency highlighting in `<audio>` playback loops.
2. **Shadowing Loop Points:** Use the aligned cue boundaries to let students loop single sentences with one click without clipping the first or last syllable.
3. **Format Standard:** Prefer WebVTT (`.vtt`) over SubRip (`.srt`) for direct web compatibility in HTML5 `<track>` elements.
