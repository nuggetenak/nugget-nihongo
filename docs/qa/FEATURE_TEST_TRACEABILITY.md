# 🗺️ Feature Test Traceability Matrix — Nugget Nihongo

Matriks ini memetakan setiap fitur utama produk ke implementasi kode sumber dan berkas suite uji yang memvalidasinya.

---

| Fitur Produk | Lokasi Sumber Utama | Suite Uji Regresi | Status Verifikasi |
|---|---|---|:---:|
| **Tab 1: Belajar (Sovereign Cockpit)** | `src/pages/HomePage.tsx`, `src/components/home/SovereignHeroCard.tsx` | `tests/test-s7-sprint5-belajar-cockpit.js` (Suite 146) | ✅ PASS |
| **Kurikulum 36 Trek (N5–N1)** | `src/components/curriculum/CurriculumTrackBrowser.tsx`, `LessonRowNode.tsx`, `UnitAccordionCard.tsx` | `tests/test-s7-sprint6-curriculum-browser.js` (Suite 147) | ✅ PASS |
| **Studio Belajar Non-Sticky** | `src/pages/LessonStudyPage.tsx` | `tests/test-s7-sprint3-studio-ergonomics.js` (Suite 144) | ✅ PASS |
| **Tab 2: Ulas (FSRS Cockpit & Kebun)** | `src/pages/KebunPage.tsx`, `src/lib/fsrs/fsrsService.ts` | `tests/test-s7-sprint12-ulas-dualmode.js` (Suite 153), `tests/test-fsrs.js` (Suite 1) | ✅ PASS |
| **Tab 3: Dojo (4-Pillar Hub Coordinator)** | `src/pages/MateriHubPage.tsx`, `src/features/dojo/` | `tests/test-s7-sprint7-dojo-subrouting.js` (Suite 148) | ✅ PASS |
| **Dojo Pilar 1: Sasana Drill Refleks** | `src/features/dojo/pillars/ReflexDrillsPillar.tsx` | `tests/test-s7-sprint8-reflex-drills.js` (Suite 149) | ✅ PASS |
| **Dojo Pilar 2: Kamus & Indeks Referensi** | `src/features/dojo/pillars/DictionaryPillar.tsx` | `tests/test-s7-sprint9-dictionary-pillar.js` (Suite 150) | ✅ PASS |
| **Dojo Pilar 3: Pustaka Referensi & Alat** | `src/features/dojo/pillars/ReferencePillar.tsx` | `tests/test-s7-sprint10-reference-pillar.js` (Suite 151) | ✅ PASS |
| **Dojo Pilar 4: Simulator CBT Resmi** | `src/features/dojo/pillars/CbtSimulatorPillar.tsx`, `src/components/exercise/ExamLmsHub.tsx` | `tests/test-s7-sprint11-cbt-pillar.js` (Suite 152) | ✅ PASS |
| **Tab 4: Sensei AI Dojo Studio** | `src/pages/SenseiPage.tsx`, `src/lib/ai/senseiClient.ts` | `tests/test-s7-sprint13-sensei-settings.js` (Suite 154) | ✅ PASS |
| **Tab 5: Pengaturan & Profil (4 Sub-Tabs)** | `src/pages/SettingsPage.tsx`, `src/components/settings/` | `tests/test-s7-sprint13-sensei-settings.js` (Suite 154) | ✅ PASS |
| **Top-Pill PWA Sentinel & Auto-Update** | `src/components/common/PwaUpdateBanner.tsx`, `src/store/usePwaStore.ts` | `tests/test-s7-sprint2-pwa-sentinel.js` (Suite 143) | ✅ PASS |
| **Simulasi 200 Persona Pemelajar** | `scripts/run-persona-simulations.js` | `tests/test-personas.js` (Suite 5) | ✅ PASS |
| **Kompilasi Bundle & 500 kB Chunk Ceiling** | `vite.config.ts`, `scripts/verify-bundle-budget.js` | `tests/test-s7-sprint14-directory-architecture.js` (Suite 155) | ✅ PASS |
