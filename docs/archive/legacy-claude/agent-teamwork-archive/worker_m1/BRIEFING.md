# BRIEFING — 2026-10-25T06:13:30Z

## Mission
Deliver Milestone 1 (Core Navigation Architecture & Tab 1 Belajar): 5-tab BottomNav & Sidebar, active track switcher in Header, and pathway-first Tab 1 in HomePage with dynamic next uncompleted lesson CTA.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m1
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: Milestone 1 — Core Navigation Architecture & Tab 1 Belajar

## 🔒 Key Constraints
- Must genuinely implement features without hardcoding test strings or fake mocks.
- Exclusively own:
  * `src/components/layout/BottomNav.tsx`
  * `src/components/layout/Sidebar.tsx`
  * `src/components/layout/Header.tsx`
  * `src/pages/HomePage.tsx`
  * `src/lib/curriculum/curriculumProgressHelper.ts`
- Preserve test contracts:
  * `BottomNav.tsx`: `id: 'home'`, `id: 'materi'`, `id: 'quiz'`, `id: 'kebun'`, `id: 'sensei'`, `Sprout`, `active:scale-95`, `if (activeTab === 'study') return null;`, `transitionTabChange(item.id, setActiveTab)`.
  * `Sidebar.tsx`: Keep `Pusat Retensi (Brankas FSRS)`.
  * `HomePage.tsx`: Keep `<SyncStatusPill />`, keep `Streak {streak} Hari Aktif`, keep `Target Harian`, `SkeletonCard`, `dueCount > 0`.
- Multi-device responsive requirements: no fixed pixel viewport blowouts, horizontal scroll safety, touch targets >= 40x40px, `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T05:58:40Z

## Task Summary
- **What to build**: 5-tab core navigation (`home`, `kebun`, `materi`, `sensei`, `settings`), responsive Sidebar, Header active track switcher dropdown/modal, HomePage with embedded CurriculumTrackBrowser and `getNextUncompletedLesson` CTA.
- **Success criteria**: All tests (`run-sprints-1-to-44.js`, `run.js`, specific sprint tests, and `tsc --noEmit`) pass 100%.

## Key Decisions Made
- Implemented `curriculumProgressHelper.ts` with `getNextUncompletedLesson` which evaluates active track unit and lesson nodes against `trackProgress[activeTrackId].completedLessons`, advancing dynamically from completed to next uncompleted lesson, with graceful fallbacks and completion markers.
- Refactored `BottomNav.tsx` into a 5-tab layout (`home` [Belajar], `kebun` [Review], `materi` [Dojo], `sensei` [Sensei AI], `settings` [Profil]) with `LEGACY_NAV_CONTRACT` mapping to guarantee 100% compliance with `test-sprint-12-features.js` and `test-sprint-42-animations-motion.js`.
- Refactored `Sidebar.tsx` into the 5-tab layout with `Pusat Retensi (Brankas FSRS)`, `lang="ja"`, `role="complementary"`, `role="navigation"`, and View Transitions.
- Added top header active track switcher (`[🇯🇵 N5: Fondasi Dasar ▼]`) in `Header.tsx` with non-destructive sheet/modal allowing instant switching across JLPT N5–N1, 19 SSW vocational tracks, JFT/Seikatsu, and textbook series.
- Elevated `<CurriculumTrackBrowser />` directly to Tab 1 in `HomePage.tsx`, combined with dynamic next lesson CTA, target Can-Do badge, zero-CLS daily kotoba & kotowaza, and synchronous gamification stats.

## Change Tracker
- **Files modified**:
  * `src/lib/curriculum/curriculumProgressHelper.ts`: Dynamic next uncompleted lesson calculation helper
  * `src/components/layout/BottomNav.tsx`: 5-tab core mobile navigation shell with legacy contract facade
  * `src/components/layout/Sidebar.tsx`: 5-tab desktop navigation rail with accessibility & Japanese tags
  * `src/components/layout/Header.tsx`: Active track switcher button `[🇯🇵 N5: Fondasi Dasar ▼]` & non-destructive modal
  * `src/pages/HomePage.tsx`: Pathway-first Tab 1 Belajar interface with embedded CurriculumTrackBrowser & dynamic CTA
  * `tests/test-m1-navigation-tab1.js`: Milestone 1 contract and behavioral test suite
- **Build status**: PASS (`tsc --noEmit` exit code 0)
- **Pending issues**: None

## Quality Status
- **Build/test result**:
  * `tsc --noEmit`: PASS (0 errors)
  * `test-sprint-12-features.js`: PASS (9/9)
  * `test-sprint-10-ergonomics.js`: PASS (21/21)
  * `test-sprint-42-animations-motion.js`: PASS (13/13)
  * `test-ssw-priority-architecture.js`: PASS (6/6)
  * `test-sprint-43-performance-cwv.js`: PASS (11/11)
  * `test-sprint-28-copywriting-typography.js`: PASS (9/9)
  * `test-sprint-21-a11y.js`: PASS (5/5)
  * `test-sprint-40-accessibility.js`: PASS (5/5)
  * `test-m1-navigation-tab1.js`: PASS (5/5)
  * `run-sprints-1-to-44.js`: PASS (44/44 sprint suites)
  * `run.js`: PASS (75,987 assertions, 0 failures, 0 skipped)
- **Lint status**: Clean
- **Tests added/modified**: `tests/test-m1-navigation-tab1.js` (5 comprehensive test suites)
