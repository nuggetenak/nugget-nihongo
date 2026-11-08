# BRIEFING — 2026-10-25T05:58:00Z

## Mission
Conduct thorough read-only investigation of Tab 5 (Profile/Sync/L1), State Stores & Schemas, and Test Suites & Bundle Budgets for Nugget Nihongo UI/UX & IA Overhaul.

## 🔒 My Identity
- Archetype: explorer
- Roles: Codebase Explorer (Tab 5 Profile/Sync/L1, State Stores, Test Suites & Budget)
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_survey_3
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: UI/UX, IA, and Navigation Overhaul Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Do NOT modify or write any source code files in nugget-nihongo
- File workspace convention: write only in .agents/teamwork/explorer_survey_3
- All handoffs must follow 5-component handoff report

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T05:58:00Z

## Investigation State
- **Explored paths**:
  - `src/App.tsx`, `src/pages/SettingsPage.tsx`, `src/components/ui/SyncStatusPill.tsx`, `src/components/sync/SyncStatusIndicator.tsx`, `src/components/ui/OfflineStatusPill.tsx`
  - `src/components/layout/BottomNav.tsx`, `src/components/layout/Sidebar.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/MobileDrawer.tsx`
  - `src/store/useAppStore.ts`, `src/lib/curriculum/curriculumStore.ts`, `src/lib/garden/gardenStore.ts`, `src/lib/supabase/authStore.ts`, `src/lib/storage/localStore.ts`, `src/lib/persistence/storageBridge.ts`
  - `vite.config.ts`, `tests/run.js`, `tests/run-sprints-1-to-44.js`, `tests/test-ssw-priority-architecture.js`, `tests/verify-frontend-responsive.js`, `scripts/verify-bundle-budget.js`
- **Key findings**:
  - Tab 5: Currently no standalone ProfilePage; unified inside `SettingsPage.tsx` (1,228 lines). Re-architecting Tab 5 into Profile & Sync Hub requires maintaining existing settings sections or extracting cleanly.
  - Critical Contract: `tests/test-ssw-priority-architecture.js:78-86` mandates `<SyncStatusPill />` verbatim in HomePage, MateriHubPage, and SettingsPage.
  - Test Matchers: 13+ sprint test files contain literal string matchers (e.g., `id: 'kebun'`, `'Pusat Retensi (Brankas FSRS)'`, `setSpeechRate`, `x-goog-api-key`). Any changes to navigation items or copy must adhere to backward compatibility or the tests must be carefully preserved.
  - Storage & Schemas: 5 primary stores (`useAppStore`, `useCurriculumStore`, `useGardenStore`, `useAuthStore`, TinyBase `localStore`). All keys (`nn_*`) must remain intact without data loss.
  - Bundling: Strict 500 kB limit enforced by `verify-bundle-budget.js` and `vite.config.ts`.
- **Unexplored areas**: None within assigned scope (all 3 pillars thoroughly investigated).

## Key Decisions Made
- Documented complete 5-component handoff in `handoff.md` with explicit line references and verification commands.
- Verified test suite baselines: all 75,987 unit tests passed, all 44 sprint regression suites passed, bundle budget verified (51 chunks <= 500 kB), and TypeScript compilation passed with zero errors.

## Artifact Index
- `DISPATCH.md` — Logged parent instructions
- `BRIEFING.md` — Persistent working memory
- `progress.md` — Liveness heartbeat (Complete)
- `handoff.md` — Final survey investigation report (5-component structure)
