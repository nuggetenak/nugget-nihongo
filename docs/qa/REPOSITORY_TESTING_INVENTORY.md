# 📋 Repository Testing Inventory — Nugget Nihongo

Dokumen ini mendokumentasikan seluruh inventaris uji (testing inventory) di repositori **Nugget Nihongo**.

---

## 📊 Ringkasan Inventaris

- **Total File Skrip Uji di `tests/`**: 198 berkas
- **Total Suite Regresi Terdaftar di Orchestrator**: 157 suites
- **Framework Uji Utama**: Pure Node.js Assertion Engine (`node:assert`, `node:test`, AST/Module Parsers, Zero Heavy Test Runner Overhead)
- **Kompatibilitas**: Windows PowerShell 5.1 / 7+, Linux, macOS
- **Status Hasil Terakhir**: **157/157 PASSED (100% Target)**

---

## 🔬 Klasifikasi Disiplin Uji (16 Disiplin QA)

| Kode | Disiplin QA | File / Suite Contoh | Cakupan |
|:---:|---|---|---|
| **A** | **Static Analysis & Type Checking** | `tsc --noEmit`, `eslint.config.js` | Validasi tipe data TypeScript, dead code, dependency trees. |
| **B** | **Unit Testing** | `tests/test-fsrs.js`, `tests/test-cat.js` | Matematika FSRS, formula IRT 3PL, kalkulasi probabilitas theta. |
| **C** | **Component Testing** | `tests/test-s7-sprint6-curriculum-browser.js` | Dekomposisi `LessonRowNode`, `UnitAccordionCard`, segmented tabs. |
| **D** | **Integration Testing** | `tests/test-s6-pass11-tri-connection.js` | Jembatan `Belajar` ➔ `Ulas` (FSRS) ➔ `Dojo` (4 Pilar) ➔ `Sensei AI`. |
| **E** | **End-to-End User Journeys** | `scripts/run-persona-simulations.js` | 200 alur pemelajar Indonesia dari onboarding CAT ke sertifikasi. |
| **F** | **Regression Testing** | `tests/master-regression-orchestrator.js` | 157 suite pengujian kumulatif otomatis multi-pass. |
| **G** | **Smoke Testing** | `tests/test-s7-sprint1-navigation.js` | Keutuhan rute utama, bottom bar 4 pilar, status offline sentinel. |
| **H** | **API & Contract Testing** | `tests/test-backend-consolidation.js` | Kontrak HTTP proxy Sensei AI, token limiter, rate limiting. |
| **I** | **Database & Data Integrity** | `tests/test-s5-pass37-tinybase-indexeddb.js` | TinyBase IndexedDB persistence, CRDT conflict-free clock. |
| **J** | **UI/UX & Visual Testing** | `tests/test-s5-pass45-ergonomics-targets.js` | Viewport 320px–1920px, touch target >= 40px, non-sticky studio. |
| **K** | **Accessibility (a11y) WCAG** | `tests/test-sprint-40-accessibility.js` | Focus traps, keyboard Escape handler, modal lock, ARIA labels. |
| **L** | **Performance & CWV** | `scripts/verify-bundle-budget.js` | Chunk budget <= 500 kB, LCP/CLS optimization, Web Vitals. |
| **M** | **Security & RLS Hardening** | `tests/test-backend-security.js` | Supabase RLS audit, secret non-leakage, backup allowlist. |
| **N** | **Multi-Device Compatibility** | `tests/test-s5-pass45-ergonomics-targets.js` | iPhone SE (320px) s.d. 4K desktop, touch targets, safe-area. |
| **O** | **Educational & Linguistic QA** | `tests/test-corpus-integrity.js` | 10.500+ kosakata, 850+ tata bahasa, furigana ruby, kana onbin. |
| **P** | **SSW 19-Sector Assurance** | `tests/test-s5-pass33-kaigo.js` dll. | Prometric SSW 19 sektor (Kaigo, Konstruksi, Pengolahan Makanan, dll). |

---

## 🗂️ Daftar Suite Regresi Terdaftar (Orchestrator Registry)

Berikut ringkasan blok suite regresi yang dijalankan dalam `tests/master-regression-orchestrator.js`:

1. **Suite 1–16**: Core Cognitive & Pedagogical Engines (FSRS, CAT/IRT, Zustand Stores, Curriculum Adapters, Persona Swarm 200, Corpus Integrity, Pitch Accent, Kotowaza 376, Counters, Keigo).
2. **Suite 17**: Historical Master Sprints 1–44 Cumulative Harness (18.6s exhaustive runtime).
3. **Suite 18–31**: Siklus I Polish & Security Verification (Learner Profile, Modal Lifecycle, CWV, MateriHub/Quiz Declutter, CBT Runner, Onboarding).
4. **Suite 32–46**: Siklus II Deep Ergonomics (CAT Onboarding, Garden Metrics, Lesson Stages, Choukai Audio Pipeline, Gamification Streak Resilience).
5. **Suite 47–61**: Siklus III Visual Excellence & Typography (Irasutoya Avatars, Pitch & Gemba, Grammar Conjugation, Dokkai LMS, Enterprise Mobile Layout).
6. **Suite 62–77**: Siklus IV Pedagogy & Exam Engine (JLPT N5–N1 Alignment, Furigana Precision, SSW Prometric Prep, Adaptive CAT IRT, Audio Codecs).
7. **Suite 78–129**: Siklus V Supreme Protocol (52 Surgical Remediations: TinyBase IndexedDB, Multi-Tab Broadcast Sync, CRDT Vector Clock, 320px Ergonomics, Telemetry, Security Hardening, Bundle Budget).
8. **Suite 130–141**: Siklus VI Humanized Polish (Nav Shell Declutter, Single-Action Sovereign Home, Anti-Kurung Quiz Distractors, Pure Practice Dojo, Belajar-Ulas-Dojo Tri-Connection).
9. **Suite 142–157**: Master Reconstruction Akbar Sprints:
   - *Suite 142*: Sprint 1 — Navigation Identity & Nomenclature Unification (`#dojo`)
   - *Suite 143*: Sprint 2 — Top-Pill PWA Sentinel & Service Worker Lifecycle
   - *Suite 144*: Sprint 3 — Studio Belajar Non-Sticky Ergonomics & 80% Viewport
   - *Suite 145*: Sprint 4 — FSRS Same-Day Review Damping & Dojo Practice Ripple Bridge
   - *Suite 146*: Sprint 5 — Tab 1 Belajar Sovereign Single-Action Home Cockpit
   - *Suite 147*: Sprint 6 — Tab 1 Belajar Modularizing CurriculumTrackBrowser
   - *Suite 148*: Sprint 7 — Tab 3 Dojo 4-Pillar Hub Coordinator & Hash Sub-Routing
   - *Suite 149*: Sprint 8 — Tab 3 Dojo Pilar 1: Sasana Drill Refleks Modularization
   - *Suite 150*: Sprint 9 — Tab 3 Dojo Pilar 2: Kamus & Indeks Referensi Extraction
   - *Suite 151*: Sprint 10 — Tab 3 Dojo Pilar 3: Pustaka Referensi Extraction
   - *Suite 152*: Sprint 11 — Tab 3 Dojo Pilar 4: Simulator CBT Resmi Extraction
   - *Suite 153*: Sprint 12 — Tab 2 Ulas Pusat Retensi & Kebun Kata Dual-View Polish
   - *Suite 154*: Sprint 13 — Tab 4 Sensei AI & Tab 5 Settings Modularization
   - *Suite 155*: Sprint 14 — Directory Refactoring & Feature-Sliced Path Aliases
   - *Suite 156*: Sprint 15 — Test Suite Modernization (String Matchers ➔ Behavioral Contracts)
   - *Suite 157*: Sprint 16 — Comprehensive 16-Discipline QA Audit & Release Readiness Gate
