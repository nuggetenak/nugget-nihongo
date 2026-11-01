---
name: agent-reach-researcher
description: Multi-platform web, social, and audio intelligence router using Agent Reach for authentic Japanese language mining (colloquialisms, slang, workplace reality) and continuous AI self-improvement in /learn.
---

# Agent Reach Researcher Skill

## Overview
`agent-reach-researcher` equips Antigravity agents with social and multi-platform intelligence routing using **Agent Reach** (`Panniantong/agent-reach`). It enables agents to bypass expensive developer APIs to mine high-density insights across two primary domains:

1. **Authentic Native Japanese Language Mining:** Extract real-world conversational Japanese, colloquial contractions (e.g. 〜ちゃう, 〜とく, 〜なきゃ), internet slang (若者言葉 / ネットスラング), and informal workplace communication from social platforms (Twitter/X, Reddit, YouTube, Bilibili) that standard textbooks rarely teach.
2. **AI Community Intelligence & Agent Self-Improvement:** Monitor cutting-edge AI breakthroughs, agent engineering practices, MCP server updates, and prompt techniques discussed across AI practitioner communities.

---

## Environment & Setup
Agent Reach runs in an isolated virtual environment (`tooling-lab/.venv`) to ensure zero pollution of the main application bundle:

```bash
# Check platform availability & connected channels
.\tooling-lab\.venv\Scripts\agent-reach.exe doctor

# Run full setup or channel configuration
.\tooling-lab\.venv\Scripts\agent-reach.exe --help
```

---

## Domain 1: Authentic Japanese Language & Nuance Mining

### A. The "Textbook vs. Native Reality" Challenge
Standard textbooks (*Minna no Nihongo*, *Genki*) emphasize hyper-formal, polite constructions (`〜てください`, `〜なければなりません`). In real Japanese workplaces, convenience stores, and social life, native speakers frequently use colloquial shortcuts:
- `食べなければならない` $\to$ `食べなきゃ` / `食べないと`
- `買っておく` $\to$ `買っとく`
- `見てしまった` $\to$ `見ちゃった`
- Filler words & aizuchi: `っていうか`, `なんか`, `さすがに`, `ぶっちゃけ`

### B. Ingesting Real Japanese Web Content via Jina Reader
Convert any native Japanese discussion, blog, or web article directly into clean Markdown:
```bash
# NHK News Web Easy (Simplified for N4/N3 learners)
curl -s https://r.jina.ai/https://www3.nhk.or.jp/news/easy/

# Slang & Colloquial Japanese Dictionaries (e.g., Numazu slang, Weblio Jisho)
curl -s https://r.jina.ai/https://numan.tokyo/words/
```

### C. Extracting YouTube Audio for Choukai Drills
Download Japanese situational conversations or podcasts for listening practice:
```bash
# Extract clean MP3 audio from Japanese immersion clips
yt-dlp -x --audio-format mp3 -o "choukai_raw.%(ext)s" "<YOUTUBE_URL>"

# Download Japanese closed-caption subtitles
yt-dlp --write-sub --sub-lang ja --skip-download "<YOUTUBE_URL>"
```

### D. Audio Transcription
Transcribe native audio files directly into timestamped Japanese transcripts:
```bash
.\tooling-lab\.venv\Scripts\agent-reach.exe transcribe path/to/audio.mp3
```

---

## Domain 2: AI Community Intelligence & `/learn` Improvement

### A. Mining AI Engineering Best Practices
Discover emerging agent patterns, MCP integrations, and architectural blueprints across developer discussions:
- **Reddit (`r/LocalLLaMA`, `r/MachineLearning`, `r/ClaudeAI`):** Read community discussions on prompt distillation, context compression, and subagent orchestration.
- **GitHub Trending & Releases:** Check recent commits and release notes of open-source AI repos without rate limits.
- **V2EX & Tech Forums:** Extract developer feedback and benchmarks on new models and quantization formats.

---

## Integration with Nugget Nihongo Councils & Personas

| Agent | How to Leverage `agent-reach-researcher` |
| :--- | :--- |
| **`educational-council`** | Cross-references textbook grammar rules against real-world native frequency to add "Real World Usage Notes" (Catatan Bahasa Gaul & Percakapan Nyata) to JLPT grammar cards. |
| **`ssw-council`** | Mines actual Japanese factory, restaurant, and eldercare training materials and social forums to capture authentic informal commands and warnings used by senpai/bosses. |
| **`persona-tester`** | Ingests real Indonesian learner sentiment from Twitter and Reddit (`r/indonesia`) to refine persona profiles and test realistic student hurdles. |
| **Parent Agent (`/learn`)** | Automatically pulls fresh documentation and open-source releases to keep Antigravity skills continuously updated. |

---

## Best Practices & Safety Boundaries
1. **Isolated Execution:** Always run Agent Reach commands within `tooling-lab/` or using the isolated Python virtual environment (`.\tooling-lab\.venv\Scripts\agent-reach.exe`).
2. **Never Commit Scraping Artifacts to Main Repo:** Downloaded media, temporary `.mp3` files, or raw HTML must stay in `tooling-lab/` or `.agent-reach/tools/` and never be committed to `nugget-nihongo/src`.
3. **Data Verification Gate:** Always verify mined colloquialisms against authoritative dictionaries (Kojien, Daijisen) before adding them to official curriculum tracks to prevent teaching fleeting or inappropriate slang.
