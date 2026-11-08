# BRIEFING — 2026-10-25T13:09:00Z

## Mission
Implement Milestone 5 (Tab 5: Profil, Cloud Sync, & L1 Dialect Hub) in `src/pages/SettingsPage.tsx` adhering to F13 (Top Profile & Progress Mastery Card), F14 (L1 Substratum Dialect Hub), F15 (Application Preferences & Data Management), responsive design, zero focus:outline-hidden, touch target >= 40px, and production bundle budget (<500 kB).

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m5_run2
- Original parent: e6673b1e-3a2c-4326-9a10-aacfa0f20aff
- Milestone: M5

## 🔒 Key Constraints
- Scope & File Ownership: Exclusively own `src/pages/SettingsPage.tsx` (do NOT modify any other files).
- Container wrapper: `w-full max-w-full sm:max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 min-w-0 overflow-x-hidden`.
- Touch targets: >= 40x40px or `min-h-[40px]`/`min-h-[44px]` with `active:scale-95`.
- Tailwind: strictly adhere to `focus:outline-none` (zero `focus:outline-hidden`).
- Cache clear: non-blocking confirmation dialog (zero `window.confirm`).
- Production bundle budget: SettingsPage chunk strictly < 500 kB.
- Historical contracts: 100% green across all 44 sprint test suites and E2E overhaul tests.

## Current Parent
- Conversation ID: e6673b1e-3a2c-4326-9a10-aacfa0f20aff
- Updated: 2026-10-25T13:09:00Z

## Task Summary
- **What to build**: Tab 5 (SettingsPage.tsx) overhaul:
  - F13: Top Profile & Progress Mastery Card (Learner identity, 36h streak engine, XP & Level badge/progress, SyncStatusPill).
  - F14: L1 Substratum Dialect Hub (4 regional dialects with synchronous persistence to useAppStore, useCurriculumStore, and localStorage).
  - F15: Application Preferences (Typography, Audio & Speech, Theme, Offline storage telemetry, non-blocking cache clear modal, and reset data modal).
- **Success criteria**:
  - `npx tsc --noEmit` exits with 0
  - `node tests/test-sprint-3-frontend.js` passes
  - `node tests/test-sprint-12-features.js` passes
  - `node tests/test-sprint-28-copywriting-typography.js` passes
  - `node tests/test-ui-ia-overhaul-e2e.js` passes
  - `node tests/run-sprints-1-to-44.js` passes
  - `node tests/run.js` passes (75,987 assertions)
  - `cmd /c "npm run build:vite && node scripts/verify-bundle-budget.js"` passes
- **Interface contracts**: PROJECT.md § Tab 5 Profile & Settings ↔ Sync & Telemetry
- **Code layout**: `src/pages/SettingsPage.tsx`

## Key Decisions Made
- Integrate Top Profile & Progress Mastery Card directly at the top of SettingsPage before typography settings.
- Use `getLevelForXp` and `getNextLevelProgress` from `../lib/gamification/gamificationStore` to calculate level, title, and progress bar from total `xp`.
- Read `heatmap` from `useGamificationStore` to display today's XP vs `dailyGoalXP`.
- Calculate 36-hour streak freeze status and display active flame and grace period badge.
- Implement an accessible non-blocking modal for cache clearing with `role="dialog"`, eliminating `window.confirm`.
- Maintain all existing sensitive backup encryption (AES-256), Gemini API studio, Supabase connection manager, and reset confirmation modal.

## Change Tracker
- **Files modified**: `src/pages/SettingsPage.tsx` (in progress)
- **Build status**: baseline pass confirmed
- **Pending issues**: none

## Quality Status
- **Build/test result**: All 44 sprint suites pass, master test runner passes 75,987 assertions
- **Lint status**: clean
- **Tests added/modified**: validation battery across 8 suites
