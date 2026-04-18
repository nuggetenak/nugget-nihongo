# Nugget Nihongo 🍙

> Referensi & Quiz Tata Bahasa Jepang JLPT — Gratis, Offline, Tanpa Akun

[![Deploy](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml)
[![Validate](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml)

## What is this?

A Progressive Web App for learning Japanese, built for JLPT N5–N1 preparation.
Works completely offline after first load. No account needed. No ads. Free forever.

**Live**: [nuggetenak.github.io/nugget-nihongo](https://nuggetenak.github.io/nugget-nihongo/)

## Features

- 📚 **1,800+ vocabulary entries** across JLPT N5–N1
- 📝 **450+ grammar points** with examples and explanations
- 🎯 **7 quiz modes** — flashcard, fill-in, rearrange, conjugation, translation, error-find, multiple choice
- 🔄 **SRS (Spaced Repetition)** — FSRS algorithm for optimized review
- 📖 **Book index** — learn by textbook chapter (Irodori, Sou Matome)
- 🌐 **Bilingual** — Indonesian interface with Japanese content
- 📱 **PWA** — install on any device, works offline
- 🌙 **Dark mode** — easy on the eyes

## Quick Start

```bash
# Clone
git clone https://github.com/nuggetenak/nugget-nihongo.git
cd nugget-nihongo

# Serve locally
npx http-server public -p 3000 -c-1

# Run tests
node tests/run.js
```

Open `http://localhost:3000` in your browser.

## Project Structure

```
public/          → Deploy root (what users see)
  js/            → Application JavaScript
  data/          → Vocab, grammar, quiz data
  styles/        → CSS
  fonts/         → Subsetted web fonts
tests/           → Test runner
tools/           → Development scripts (133 total)
docs/            → Documentation & governance
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed structure.

## Tech Stack

- Vanilla JavaScript (ES2020) — no framework, no build step
- Service Worker for offline caching
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## Data

| Level | Vocab | Grammar (Global) | Grammar (Cards) |
|-------|-------|-------------------|-----------------|
| N5 | 789 | 248 | 132 |
| N4 | 720 | 272 | 132 |
| N3 | 110 | 329 | — |
| N2 | — | — | — |
| N1 | — | — | — |

## Contributing

This project is managed through a multi-agent AI governance system.
See [ROADMAP.md](ROADMAP.md) for the development plan.

## License

[MIT](LICENSE) — Nugget Nihongo, 2026
