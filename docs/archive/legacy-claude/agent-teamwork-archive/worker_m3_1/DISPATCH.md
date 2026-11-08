## 2026-10-25T09:06:49Z
Sender: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
Role: Worker M3 (Milestone 3: Tab 3 Consolidated Dojo & Pustaka Catalog)
Working Directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m3_1

FILE OWNERSHIP:
`c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\MateriHubPage.tsx`

OBJECTIVE:
Transform Tab 3 (`src/pages/MateriHubPage.tsx`) into a consolidated, highly organized Dojo & Pustaka catalog structured into 3 distinct clusters:
- Cluster 1: Latihan Keterampilan Inti (Core Skills)
  1. Kanji Dojo & Stroke Animator (`KanjiDojoView.tsx`)
  2. Choukai CBT Simulator (`ChoukaiSimulatorPage` or `ChoukaiAudioPlayer`)
  3. Pitch Accent Studio (`openModal('pitch')` or in-place viewer)
  4. Adaptive Placement Test (CAT) (`openModal('catPlacement')` or in-place test)
- Cluster 2: Laboratorium Tata Bahasa & Budaya (Grammar & Culture Lab)
  5. Keigo Business Trainer (`openModal('keigo')`)
  6. Counter Simulator 助数詞 (`openModal('counters')`)
  7. Verb Conjugation Engine (`openModal('conjugation')`)
  8. Nuance Inspector (`openModal('nuance')`)
  9. Kotowaza Gallery 376+ (`openModal('kotowaza')`)
- Cluster 3: Perpustakaan & Referensi (Reference Library)
  10. Interactive Kana Chart (`openModal('kana')`)
  11. Standard Textbooks / Buku Pelajaran (`materiStudio === 'buku'`)

FOCUSED SUB-VIEW & NAVIGATION:
- Support mounting selected tools in a focused sub-view (e.g. for Kanji Dojo and Textbooks studio) with a sticky top bar containing:
  `← Kembali ke Katalog Dojo`
- Clicking back button cleanly resets `activeTool` to null and restores the catalog grid.
- Listen to keyboard 'Escape' and browser popstate to return to catalog.
- Avoid z-[9999] portal wars.

CRITICAL HISTORICAL TEST CONTRACTS (MUST PRESERVE 100%):
- `<SyncStatusPill />` must be mounted in `MateriHubPage.tsx` (`tests/test-ssw-priority-architecture.js`).
- `RubyText` must be imported and included in `MateriHubPage.tsx` (`tests/test-sprint-28-copywriting-typography.js`).
- Cards must declare `role="button"` and `tabIndex={0}`, handle `Enter` and `' '` space key activation, and audio buttons must be >= 44px (`tests/test-sprint-40-accessibility.js`).
- Canonical 7-category POS taxonomy & filter predicate (`tests/test-sprint-12-features.js`).
- Do NOT mount `<DetailModal`, `<KanaChartModal`, `<ConjugationModal`, or `<NuanceCompareModal` directly inside `MateriHubPage.tsx` (`tests/test-sprint-3-frontend.js`) - open them via modal store/app store triggers or render in-place sub-studios (`KanjiDojoView`, `BookTrackBrowser`).
- Keep file named `MateriHubPage.tsx` so Vite produces the `MateriHubPage-` chunk (`tests/test-sprint-17-bundle-optimization.js`).
- Container must enforce `min-w-0 max-w-full overflow-x-hidden`, `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
- All touch targets >= 40x40px with `active:scale-95`.
