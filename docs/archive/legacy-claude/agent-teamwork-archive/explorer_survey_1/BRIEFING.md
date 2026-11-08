# BRIEFING — 2026-10-25T05:52:00Z

## Mission
Investigate navigation architecture, Tab 1 (Belajar/Roadmap), In-Lesson Study Sensei helper, and Tab 4 (Sensei AI Tutor) for UI/UX & IA Overhaul.

## 🔒 My Identity
- Archetype: explorer
- Roles: Codebase Explorer (Navigation, Layout, Tab 1 Belajar, Tab 4 Sensei AI)
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_survey_1
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: Navigation & UI/UX Overhaul Survey Phase

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Do NOT modify or write any source code files in nugget-nihongo
- Output report to .agents/teamwork/explorer_survey_1/handoff.md
- Use send_message to report back to parent (9110eabb-ae6d-43ee-8e3e-c0e815b0201d)

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T05:32:04Z

## Investigation State
- **Explored paths**:
  - `src/App.tsx` (navigation routing, layout wrapper, global modals, `renderActiveView`)
  - `src/components/layout/BottomNav.tsx` (5 mobile tab buttons, study suppression)
  - `src/components/layout/Sidebar.tsx` (Desktop 260px sidebar navigation)
  - `src/components/layout/Header.tsx` (Sticky header, search, streak, sync indicator)
  - `src/components/layout/MobileDrawer.tsx` (Slide-over drawer for mobile)
  - `src/store/useAppStore.ts` (activeTab, openLessonStudy, openSenseiSheet, streak, FSRS cards)
  - `src/lib/curriculum/curriculumStore.ts` (activeTrackId, trackProgress, completeLesson, isLessonUnlocked)
  - `src/pages/HomePage.tsx` (Hero, lastStudiedLesson trigger, grammar/vocab/ssw overview)
  - `src/pages/MateriHubPage.tsx` (3 studios: kanji, buku, kurikulum & sub-track spiral/freeway/jlpt)
  - `src/components/materi/CurriculumTrackBrowser.tsx` (Roadmap rendering, JLPT & 19 SSW tracks, Can-Do display)
  - `src/pages/LessonStudyPage.tsx` (4-stage stepper, drill progression, findNextLesson)
  - `src/components/curriculum/player/MicroDrillStage.tsx` (Quiz state management, retry loop)
  - `src/components/sensei/ContextualSenseiSheet.tsx` (Root mounted contextual bottom sheet)
  - `src/pages/SenseiPage.tsx` (Tab 4 Sensei AI tutor room, personas, 3 modes, voice, suggested actions)
  - `src/lib/ai/senseiClient.ts` & `src/lib/ai/senseiMemory.ts` (Chat history, system prompts, Mem0 memory)
  - Test suites: `tests/run-sprints-1-to-44.js`, `tests/run.js`, `tests/test-ssw-priority-architecture.js`, `tests/test-sprint-12-features.js`, `tests/test-sprint-10-ergonomics.js`, `tests/test-sprint-3-frontend.js`, `tests/test-sprint-28-copywriting-typography.js`
- **Key findings**:
  - Baseline health: 75,987 assertions passing, 44/44 sprint suites passing, 6/6 SSW priority checks passing, zero TS errors.
  - Strict regression contracts discovered in tests: `BottomNav.tsx` literal IDs (`home`, `materi`, `quiz`, `kebun`, `sensei`), `activeTab === 'study'` hiding contract, `<RubyText>` component requirements, and root modal mounting rules.
  - Pathway navigation is currently deeply nested in `MateriHubPage.tsx` -> `activeStudio === 'kurikulum'` -> `kurikulumSub === 'spiral'`. Refactoring to Tab 1 Belajar requires exposing `CurriculumTrackBrowser` directly while keeping backward-compatible aliases for existing tests.
  - Quiz state in `LessonStudyPage` (`MicroDrillStage`) is local React state; contextual Sensei bottom sheet is root-mounted in `App.tsx` and can be opened without unmounting or resetting quiz state.
- **Unexplored areas**: None within Explorer 1 scope.

## Key Decisions Made
- Fully documented all 4 scope topics with exact file paths, line ranges, AST/component contracts, and historical regression test guardrails.

## Artifact Index
- DISPATCH.md — Incoming dispatch message
- progress.md — Liveness heartbeat and progress tracking
- BRIEFING.md — Persistent memory index
- handoff.md — Comprehensive survey report
