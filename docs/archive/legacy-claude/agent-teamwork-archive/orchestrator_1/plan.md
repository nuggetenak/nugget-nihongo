# Project Execution Plan: Nugget Nihongo UI/UX, IA, and Navigation Overhaul

## Overview
Transform feature sprawl and modal stacking into a 5-tab core architecture for Indonesian learners, preserving backward compatibility, state stores, 44 sprint test suites, responsive constraints, and bundle budget.

## Phases & Verification Milestones

### Phase 0: Survey & Codebase Discovery
- Dispatch 3 parallel Explorers:
  - Explorer 1 (Survey: Navigation, Core Layout, Tab 1 Belajar, Tab 4 Sensei)
  - Explorer 2 (Survey: Tab 2 Review/Garden, Tab 3 Dojo & Pustaka Catalog)
  - Explorer 3 (Survey: Tab 5 Profile/Sync/L1, Stores, 44 Sprint Test Runners, Responsive & Budget Scripts)
- Synthesize findings into `PROJECT.md` with full Architecture, Feature Inventory, Milestones, and Interface Contracts.

### Phase 1: Core Navigation & Tab 1 (Belajar) [R1, R6]
- Implement/Refactor Bottom Navigation & Header Track Switcher (`[🇯🇵 N5: Fondasi Dasar ▼]`).
- Guided Daily Mission pathway view with Can-Do milestones.
- Prominent "Mulai Belajar Hari Ini" / "Lanjutkan Pelajaran" action.
- Verification: Component unit tests, routing integrity, responsive checks.

### Phase 2: Tab 2 (Review: Dual-Card Retention & Kebun Hub) [R2, R6]
- Consolidate FSRS flashcards review and Kebun Nihongo plant progression.
- Plant status & water drops top card, due cards review trigger middle card.
- Award water drops on session completion with instant 1-tap watering on the same screen.
- Secondary access to practice drills.
- Verification: Review session flow, store persistence, responsive checks.

### Phase 3: Tab 3 (Dojo & Pustaka 3-Cluster Catalog) [R3, R6]
- Eliminate modal stacking with clean 3-cluster catalog:
  1. Core Skills (Kanji Dojo, Choukai CBT, Pitch Accent, CAT)
  2. Grammar & Culture Lab (Keigo, Counters, Conjugation, Nuance, Kotowaza)
  3. Reference Library (Interactive Kana Chart, Standard Textbooks)
- Dedicated sub-views/sheets with explicit back button navigation.
- Verification: Sub-view open/close, no modal overlap, responsive checks.

### Phase 4: Tab 4 (Sensei AI) & In-Lesson Contextual Sheet [R4, R6]
- Tab 4 AI tutor conversation room with situational roleplay & grammar inquiries.
- In-lesson lightweight Sensei helper sheet in `LessonStudyPage` preserving quiz state.
- Verification: Chat interface, contextual sheet non-destructive state, responsive checks.

### Phase 5: Tab 5 (Profil, Cloud Sync, & L1 Dialect Hub) [R5, R6]
- Profile hub with XP, streak, SyncStatusPill.
- L1 dialect selector (Indonesian, Javanese, Sundanese) and app toggles (Furigana, Romaji, speech rate, SFX) with immediate persistence.
- Verification: Store updates, local persistence, responsive checks.

### Phase 6: Cumulative Regression, Responsive, & Bundle Budget Hardening [R6]
- Execute full test verification:
  - `npx tsc --noEmit`
  - `node tests/run.js` (75,987+ assertions)
  - `node tests/run-sprints-1-to-44.js` (all 44 suites 100% green)
  - `node tests/test-ssw-priority-architecture.js`
  - `node tests/verify-frontend-responsive.js` across 375px, 390px, 768px, 1440px
  - `npm run build:vite` and `node scripts/verify-bundle-budget.js` (<= 500 kB per chunk)
- Review & Forensic Audit gate checks.
- Final handoff report generation and notification to Sentinel.
