# BRIEFING — 2026-10-25T05:51:00Z

## Mission
Survey and map Tab 2 (Review: Dual-Card Review & Garden Retention Hub) and Tab 3 (Consolidated Dojo & Pustaka Catalog) architecture, stores, components, and modal stacking for UI/UX overhaul.

## 🔒 My Identity
- Archetype: explorer
- Roles: Codebase Explorer (Tab 2 Review & Garden, Tab 3 Dojo & Pustaka Catalog)
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_survey_2
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: UI/UX, IA, and Navigation Overhaul Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- No modification of files in nugget-nihongo
- File workspace convention (.agents/teamwork/explorer_survey_2 only)

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T05:32:04Z

## Investigation State
- **Explored paths**:
  - `src/App.tsx`
  - `src/store/useAppStore.ts`
  - `src/store/useModalStore.ts`
  - `src/lib/garden/gardenStore.ts`
  - `src/pages/KebunPage.tsx`
  - `src/pages/QuizPage.tsx`
  - `src/components/quiz/QuizArenaHub.tsx`
  - `src/lib/quiz/quizEngine.ts`
  - `src/lib/fsrs/math.ts`
  - `src/components/layout/BottomNav.tsx`
  - `src/components/layout/Sidebar.tsx`
  - `src/components/layout/MobileDrawer.tsx`
  - `src/components/modals/GlobalModalManager.tsx`
  - `src/components/kanji/KanjiDojoView.tsx` & `KanjiStrokeModal.tsx`
  - `src/pages/ChoukaiSimulatorPage.tsx` & `ChoukaiAudioPlayer.tsx`
  - `src/components/quiz/PrometricCbtModal.tsx` & `JftBasicCbtModal.tsx`
  - `src/components/pitch/PitchAccentModal.tsx` & `PitchContourView.tsx`
  - `src/components/cat/CatPlacementModal.tsx`
  - `src/components/keigo/KeigoTrainerModal.tsx`
  - `src/components/counters/CounterTrainerModal.tsx`
  - `src/components/grammar/ConjugationModal.tsx`
  - `src/components/grammar/NuanceCompareModal.tsx`
  - `src/components/kotowaza/KotowazaModal.tsx`
  - `src/components/kana/KanaChartModal.tsx`
  - `src/components/materi/BookTrackBrowser.tsx`
  - `src/components/tools/StudyToolboxModal.tsx`
  - `tests/` suites (Sprint 1 to 44, counter, keigo, pitch, cbt, etc.)
- **Key findings**:
  - Tab 2: FSRS cards stored in `useAppStore.ts` (`cards`), garden state in `useGardenStore.ts` (`waterDrops`, `plants`).
  - Water drops formula: 1 base + floor(score/3) + 1 (if 100% perfect).
  - Tab 2 current friction: user navigates from `KebunPage` to `QuizPage` for FSRS reviews, leaving them disconnected from the garden watering screen upon completion.
  - Tab 3 current friction: tools split between modals (`StudyToolboxModal`, `GlobalModalManager`), hidden sub-studios (`MateriHubPage` studio `kanji` and `buku`), and standalone pages (`ChoukaiSimulatorPage`), leading to portal `z-[9999]` stacking, double focus-traps, and loss of context.
- **Unexplored areas**: None, full survey complete.

## Key Decisions Made
- Architecting Tab 2 as a unified view combining top Kebun status + 1-tap watering, middle FSRS review trigger, and bottom optional drills.
- Architecting Tab 3 as a 3-cluster catalog where each tool opens in a focused sub-view with a dedicated back button.

## Artifact Index
- DISPATCH.md — Incoming parent instructions
- BRIEFING.md — Persistent working memory
- progress.md — Heartbeat progress log
- handoff.md — Comprehensive survey report
