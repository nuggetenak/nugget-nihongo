# 🗺️ Master Project Architecture & Navigation Map
> **Nugget Nihongo (ナゲット日本語) — Living Single Source of Truth (SSOT)**  
> **Platform:** React 18 · TypeScript · Vite · TailwindCSS · PWA · TinyBase · Supabase  
> **Authoritative Navigation Matrix for Developers & AI Agents**

---

## 1. Root Configuration & Entry Points

| File Path | Primary Responsibility |
| :--- | :--- |
| [`package.json`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/package.json) | Dependencies, scripts (`test`, `build`, `changelog`, `validate`), package metadata. |
| [`vite.config.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/vite.config.ts) | Vite bundler config, manual vendor chunking, PWA plugin integration. |
| [`tailwind.config.js`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/tailwind.config.js) | Design system tokens, Nippon Colors, Japanese font families, micro-animations. |
| [`src/index.css`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/index.css) | Global CSS variables (`--bg`, `--surface`, `--accent`), dual-theme tokens, `.card-interactive-lift`. |
| [`src/main.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/main.tsx) | Application bootstrap, React 18 root mounting, service worker registration. |
| [`src/App.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/App.tsx) | Top-level routing layout, active tab switcher, global modal portal container. |
| [`AGENTS.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/AGENTS.md) | Antigravity AI agent operating charter, inviolable rules, and test contracts. |

---

## 2. Core Engines & Algorithmic Subsystems (`src/lib/`)

```
src/lib/
├── spaced-repetition/   <-- FSRS v4.5 Math Engine (Stability, Difficulty, Retrievability)
├── adaptive/            <-- CAT IRT 3PL Adaptive Placement Engine (Theta estimation, SEM)
├── sync/                <-- TinyBase CRDT Multi-Device Sync & Supabase Cloud Bridge
├── storage/             <-- LocalStorage Sanitizer & Storage Eviction Crash Guard
├── japanese/            <-- Yomitan De-inflector, BudouX Bunsetsu Segmentation & Ruby Furigana
├── audio/               <-- Web Speech API TTS, Kokoro Pitch Accent & Choukai Limiter
└── assets/              <-- Irasutoya Illustration Catalog & Cultural Asset Resolver
```

### 🔬 Rincian Berkas Engine Utama:
- **FSRS Memory Engine:** [`src/lib/spaced-repetition/fsrs.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/spaced-repetition/fsrs.ts)  
  *Menghitung $R(t, S) = (1 + 0.19 \cdot t/S)^{-0.5}$, Matsunaga non-kanji L1 multiplier, dan interval review optimal.*
- **CAT 3PL IRT Placement Engine:** [`src/lib/adaptive/catEngine.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/adaptive/catEngine.ts)  
  *Item Response Theory 3-Parameter Logistic ($a$ diskriminasi, $b$ kesulitan, $c$ tebakan semu) untuk diagnosa N5–N1 dalam 10–12 soal.*
- **Sync & Storage Engine:** [`src/lib/sync/syncEngine.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/sync/syncEngine.ts) & [`src/lib/storage/storageEvictionGuard.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/storage/storageEvictionGuard.ts)  
  *Offline persistence di IndexedDB, auto-backup ke LocalStorage, dan sinkronisasi dua arah ke Supabase Postgres.*
- **Irasutoya Asset Catalog:** [`src/lib/assets/irasutoyaCatalog.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/assets/irasutoyaCatalog.ts)  
  *Pustaka aset otentik Takashi Mifune dengan metadata lisensi edukasi bebas royalti.*

---

## 3. Application State Store (`src/store/`)

| Store File | Tanggung Jawab State |
| :--- | :--- |
| [`src/store/useAppStore.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/store/useAppStore.ts) | State monolitik terpusat: navigasi aktif (`activeTab`), modal visibility map, profil pembelajar (`learnerProfile`), metrik XP harian, streak belajar, setelan tema (`light`/`dark`), dan status sinkronisasi. |

---

## 4. Screen Pages & Learning Domains (`src/pages/`)

| Halaman | Lokasi Berkas | Tanggung Jawab & Fitur Utama |
| :--- | :--- | :--- |
| **Beranda (Cockpit)** | [`src/pages/HomePage.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/pages/HomePage.tsx) | Hero Card bersih (Nugget Progress), Senpai Daily Wisdom, Heatmap kalender aktivitas 49 hari, kartu FSRS Due review. |
| **MateriHub** | [`src/pages/MateriHubPage.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/pages/MateriHubPage.tsx) | 8 Trek Belajar: JLPT N5..N1, JFT-Basic A1/A2, 19 Sektor SSW Tokutei Ginou, Dojo Kanji & animCJK, Kamus 28k vocab, 9 Buku Teks kanonikal. |
| **Arena Kuis** | [`src/pages/QuizHubPage.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/pages/QuizHubPage.tsx) | 9 Mode Kuis interaktif, rekomendasi latihan cerdas, filter segmen level, dan pelacak kombo streak. |
| **Pusat Ujian CBT (LMS)** | [`src/components/exercise/ExamLmsHub.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/components/exercise/ExamLmsHub.tsx) | The 3 Clean Doors: Pintu 1 (JLPT 50 Set), Pintu 2 (SSW & JFT 39 Set), Pintu 3 (Rapid Drill, FSRS Due, Mistake Bank, CAT Placement). |
| **CBT Runner Screen** | [`src/components/exercise/CbtRunnerScreen.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/components/exercise/CbtRunnerScreen.tsx) | Shell simulasi resmi CBT bebas distraksi: countdown timer 15:00, laci review 15 nomor, ADHD smart pause, auto-recovery IndexedDB. |
| **Simulasi Choukai** | [`src/pages/ChoukaiSimulatorPage.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/pages/ChoukaiSimulatorPage.tsx) | Simulator mendengarkan audio ujian JFT/JLPT dengan pembatas 2x putar dan transkrip interaktif. |
| **Tentang Aplikasi** | [`src/pages/AboutPage.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/pages/AboutPage.tsx) | Visi, filosofi "teman belajar", daftar pustaka APA 7th, FAQ interaktif, atribusi lisensi pihak ketiga. |

---

## 5. Modal Registry & Universal Portals (`src/components/common/`)

Semua modal interaktif dimount langsung ke `document.body` via `createPortal`:
- **Onboarding 3-Langkah & CAT:** `OnboardingModal.tsx` & `CatPlacementModal.tsx`
- **Profil & Gamifikasi:** `ProfileModal.tsx`, `BadgesModal.tsx`, `StreakBrokenModal.tsx`
- **Peralatan Dojo & Kebun:** `KanjiStudyModal.tsx`, `QuickLookupModal.tsx`, `KotowazaModal.tsx`
- **Autentikasi & Penyimpanan:** `AuthModal.tsx`, `StorageEvictionRecoveryModal.tsx`, `SettingsModal.tsx`
- **Pemberitahuan & Jaringan:** `OfflineBanner.tsx`, `UpdatePromptToast.tsx`, `SyncStatusPill.tsx`
- **Komponen Budaya Irasutoya:** `IrasutoyaImage.tsx` (offline fallback & micro-animations)

---

## 6. Data Corpora Architecture (`public/data/`)

```
public/data/
├── curriculum/    <-- File JSON struktur unit & lesson kurikulum N5..N1 & SSW
├── vocab/         <-- 10.508 entri kosakata aktif per level dengan audio & kanji
├── grammar/       <-- 859 pola tata bahasa dengan formula & pasangan kalimat JP-ID
├── kanji/         <-- 2.210 karakter kanji dengan kurva goresan KanjiVG SVG
└── exercises/     <-- 14 Golden Sets (210 soal terverifikasi untuk CBT Runner)
```

---

## 7. Enterprise QA & Test Matrix Structure (`tests/`)

| Folder Kategori | Cakupan Pengujian |
| :--- | :--- |
| `tests/engines/` | Unit test matematika FSRS, algoritma CAT IRT 3PL, Zustand stores, dan sinkronisasi CRDT. |
| `tests/sprints/` | Suite kumulatif 44 sprint historis (`run-sprints-1-to-44.js`, Sprints 1..44). |
| `tests/curriculum/` | Verifikasi integritas korpus (zero broken references, validasi struktur unit & can-do). |
| `tests/modules/` | Modul spesialis: Keigo, Counter kata bantu bilangan, Kotowaza peribahasa, Pitch Accent nada Tokyo. |
| `tests/audits/` | Suite verifikasi multi-siklus: Fase 1–5, Siklus II Pass 1–15, dan Siklus III Pass 1–12+. |

*Terverifikasi 100% HIJAU (Exit Code 0) di seluruh 75.136+ butir asersi.*
