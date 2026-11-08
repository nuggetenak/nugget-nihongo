# BRIEFING — 2026-10-25T09:40:00Z

## Mission
Transform Tab 3 (`src/pages/MateriHubPage.tsx`) into a consolidated, highly organized Dojo & Pustaka catalog structured into 3 distinct clusters (Core Skills, Grammar & Culture Lab, Reference Library) with focused sub-view navigation and sticky back header.

## 🔒 My Identity
- Archetype: implementer
- Roles: implementer, qa
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m3_1
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: M3 (Tab 3: Consolidated Dojo & Pustaka Catalog)

## 🔒 Key Constraints
- File ownership: Exclusively `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\MateriHubPage.tsx`.
- Keep file named `MateriHubPage.tsx` so Vite produces the `MateriHubPage-` chunk (`tests/test-sprint-17-bundle-optimization.js`).
- `<SyncStatusPill />` must be mounted in `MateriHubPage.tsx` (`tests/test-ssw-priority-architecture.js`).
- `RubyText` must be imported and included in `MateriHubPage.tsx` (`tests/test-sprint-28-copywriting-typography.js`).
- Cards must declare `role="button"` and `tabIndex={0}`, handle `Enter` and `' '` space key activation, and audio buttons must be >= 44px (`tests/test-sprint-40-accessibility.js`).
- Canonical 7-category POS taxonomy & filter predicate (`tests/test-sprint-12-features.js`): `id: 'verb'`, `'adj'`, `'noun'`, `'adverb'`, `'counter'`, `'conjunction'`, `'expression'`, and `!pos.includes('adverb')`.
- Do NOT mount `<DetailModal`, `<KanaChartModal`, `<ConjugationModal`, or `<NuanceCompareModal` directly inside `MateriHubPage.tsx` (`tests/test-sprint-3-frontend.js`).
- Container must enforce `min-w-0 max-w-full overflow-x-hidden`, `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
- All touch targets >= 40x40px with `active:scale-95`.
- Sticky back header: `← Kembali ke Katalog Dojo` with clean reset of `activeTool` to null.
- Handle Escape key and browser popstate to return to catalog.

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T09:40:00Z

## Task Summary
- **What to build**: 3-cluster catalog layout in `MateriHubPage.tsx` with 11 tools/references, sub-view launcher for in-place views (`kanji`, `buku`, `choukai`), and modal triggers (`pitch`, `catPlacement`, `keigo`, `counters`, `conjugation`, `nuance`, `kotowaza`, `kana`), sticky `← Kembali ke Katalog Dojo` navigation bar, while preserving dictionary/freeway/JLPT search features and all historical test contracts.
- **Success criteria**: 100% green test suite, TypeScript 0 errors, bundle budget <= 500kB.
- **Interface contracts**: PROJECT.md § 4, R3, R6.
- **Code layout**: PROJECT.md § Code Layout.

## Change Tracker
- **Files modified**: `src/pages/MateriHubPage.tsx` (Complete 3-cluster catalog implementation, in-place subviews, sticky header, full contract compliance)
- **Build status**: PASS (tsc: 0 errors; sprints 1-44: 44/44 pass; run.js: 75,987 pass; bundle budget: all 50 chunks <= 500kB)
- **Pending issues**: None

## Quality Status
- **Build/test result**: All passing (100% green)
- **Lint status**: 0 violations, clean types
- **Tests added/modified**: All historical tests pass untouched

## Key Decisions Made
- Reorganized `MateriHubPage.tsx` into 3 explicit clusters:
  - Cluster 1: Latihan Keterampilan Inti (Core Skills) — Kanji Dojo & Stroke Animator, Choukai CBT Simulator, Pitch Accent Studio, Adaptive Placement Test (CAT).
  - Cluster 2: Laboratorium Tata Bahasa & Budaya (Grammar & Culture Lab) — Keigo Business Trainer, Counter Simulator (助数詞), Verb Conjugation Engine, Nuance Inspector, Kotowaza Gallery 376+.
  - Cluster 3: Perpustakaan & Referensi (Reference Library) — Interactive Kana Chart, Standard Textbooks (9 Buku Teks Standar).
- Supported mounting selected tools in a focused sub-view (Kanji Dojo, Textbooks, and Choukai CBT Simulator) with a sticky top bar containing `← Kembali ke Katalog Dojo`.
- Resetting `activeTool` to null cleanly restores the catalog grid.
- Event listeners for keyboard `Escape` and browser `popstate` automatically return to the catalog grid.
- Modal-based tools (`pitch`, `cat`, `keigo`, `counters`, `conjugation`, `nuance`, `kotowaza`, `kana`) trigger via `useModalStore` / `useAppStore` actions without duplicating portals or violating `test-sprint-3-frontend.js`.
- Preserved full JLPT N5–N1 dictionary and Freeway track with canonical POS filtering (`!pos.includes('adverb')`), `RubyText`, `SyncStatusPill`, and >= 44px audio buttons.

## Artifact Index
- `.agents/teamwork/worker_m3_1/BRIEFING.md`
- `.agents/teamwork/worker_m3_1/DISPATCH.md`
- `.agents/teamwork/worker_m3_1/progress.md`
- `.agents/teamwork/worker_m3_1/handoff.md`
