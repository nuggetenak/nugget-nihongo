# Nugget Nihongo 🍙

> Referensi & Quiz Tata Bahasa Jepang JLPT — Gratis, Offline, Tanpa Akun

[![Deploy](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/deploy.yml)
[![Validate](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml/badge.svg)](https://github.com/nuggetenak/nugget-nihongo/actions/workflows/validate.yml)

## What is this?

A Progressive Web App for learning Japanese, built for JLPT N5–N1 preparation.
Works completely offline after first load. No account needed. No ads. Free forever.

**Live**: [nugget-nihongo.pages.dev](https://nugget-nihongo.pages.dev)

## Features

- 📚 **4,800+ vocabulary entries** across JLPT N5–N1 plus dedicated Tokutei Ginou (SSW) tracks (Konstruksi, Pengolahan Makanan, Kaigo)
- 📝 **850+ grammar points** with authentic examples, furigana, and Indonesian contrastive notes
- 🎯 **9 quiz modes** — flashcard, fill-in, rearrange, conjugation, translation, error-find, multiple choice
- 🔄 **SRS (Spaced Repetition)** — FSRS algorithm for optimized review
- 📖 **Book index** — learn by textbook chapter (Irodori, Sou Matome, Minna no Nihongo)
- 🌐 **Bilingual** — Indonesian interface tailored for Indonesian native learners
- 📱 **PWA & Offline** — install on any device, works completely offline
- 🌙 **Dark mode** — easy on the eyes

## Quick Start

```bash
# Clone
git clone https://github.com/nuggetenak/nugget-nihongo.git
cd nugget-nihongo

# Install dependencies
npm install

# Run development server
npm run dev

# Run comprehensive test suite
npm test

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/             → React 18 + TypeScript application source
  components/    → Accessible, multi-device UI components (Sidebar, BottomNav, Modals)
  pages/         → Router views (HomePage, LessonStudyPage, QuizPage, MateriHubPage)
  lib/           → Core engines (dataManager, lessonContentAdapter, fsrs, supabase)
  types/         → Strong TypeScript definitions
public/          → Static assets & canonical corpora
  data/          → Authoritative vocab, grammar, textbook lenses, SSW tracks
  fonts/         → Subsetted web fonts
tests/           → Automated unit, regression, and semantic test suite
workers/         → Cloudflare Edge workers (ai-proxy, admin-api)
scripts/         → Corpus merging and build automation compilers
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed structure.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React
- **State & Storage:** Zustand, LocalStorage, IndexedDB
- **Offline / PWA:** Service Worker (Cache-First shell, Stale-While-Revalidate data)
- **Backend / Edge:** Cloudflare Workers (Multi-model AI proxy, Admin promotion API), Supabase
- **Testing & CI:** Node test runners, GitHub Actions

## Data Inventory

| Level / Sector | Vocab | Grammar | Description |
|---|---|---|---|
| **N5** | 991 | 94 | Salam dasar, partikel primer, kopula & verba sopan |
| **N4** | 946 | 92 | Bentuk sambung, syarat (~ba/~tara), keharusan & izin |
| **N3** | 2,368 | 163 | Wacana menengah, nuansa emosi, ragam kasual vs formal |
| **N2** | 344 | 310 | Bahasa bisnis, koran, penulisan formal, relasi logis |
| **N1** | 190 | 200 | Wacana tingkat tinggi, ekspresi klasik/resmi |
| **SSW Specialist** | 72 | — | Konstruksi (JAC), Pengolahan Makanan, Kaigo |
| **Total Corpus** | **4,839+** | **859** | Terindeks 100% dengan audio, romaji & contoh kalimat |

## Contributing

This project is managed through a multi-agent AI governance system.
See [ROADMAP.md](ROADMAP.md) for the development plan.

## License

[MIT](LICENSE) — Nugget Nihongo, 2026
