# Nugget Nihongo 🍙

> Referensi & Quiz Tata Bahasa Jepang JLPT — Gratis, Offline, Tanpa Akun

[![Deploy](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml)
[![Validate](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml)

## What is this?

A Progressive Web App for learning Japanese, built for JLPT N5–N1 preparation.
Works completely offline after first load. No account needed. No ads. Free forever.

**Live**: [nugget-nihongo.pages.dev](https://nugget-nihongo.pages.dev)

## Features

- 📚 **2,400+ vocabulary entries** across JLPT N5–N1
- 📝 **450+ grammar points** with examples and explanations
- 🎯 **9 quiz modes** — flashcard, fill-in, rearrange, conjugation, translation, error-find, multiple choice
- 🔄 **SRS (Spaced Repetition)** — FSRS algorithm for optimized review
- 📖 **Book index** — learn by textbook chapter (Irodori, Sou Matome, Minna no Nihongo)
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

| Level | Vocab | Grammar |
|-------|-------|---------|
| N5 | 725 | 94 |
| N4 | 692 | 92 |
| N3 | 615 | 119 |
| N2 | 260 | 250 |
| N1 | 130 | 140 |

## Contributing

This project is managed through a multi-agent AI governance system.
See [ROADMAP.md](ROADMAP.md) for the development plan.

## License

[MIT](LICENSE) — Nugget Nihongo, 2026
