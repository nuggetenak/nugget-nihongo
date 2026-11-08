# BRIEFING — 2026-10-25T08:35:00Z

## Mission
Refactor `src/pages/KebunPage.tsx` for Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) of the Nugget Nihongo UI/UX, IA, & Navigation Overhaul, unifying long-term memory retrieval and garden progression into a single cohesive retention hub while maintaining 100% test compatibility.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m2_run2
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub)

## 🔒 Key Constraints
- Exclusively owned files: `src/pages/KebunPage.tsx` (and supporting components in `src/components/garden/` or `src/components/quiz/` if directly tied to Tab 2 view).
- MUST import and render `<SkeletonGrid count={8} type="plant" />` (satisfying `tests/test-sprint-11-motion.js`).
- MUST include and call `startFSRSDueSession` (satisfying `tests/test-sprint-12-features.js`).
- MUST call `fsrsForgettingCurve` and `checkDailyRefill()` (satisfying `tests/test-sprint-36-gamification-hardening.js`).
- Interactive touch targets >= 40x40px with `active:scale-95`.
- Mobile container padding: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
- Zero horizontal overflow across 375px, 390px, 768px, 1440px viewports.
- Genuine implementation — no cheating, facade, or dummy logic.

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T08:35:00Z

## Task Summary
- **What to build**: Dual-Card Review & Garden Retention Hub in `src/pages/KebunPage.tsx`:
  1. Top Card: Kebun Kata & 1-Tap Water Stock (F5, F7): blooming count/status, water drops badge, "Siram Semua Tanaman" button invoking `waterAll()`, shelf/grid of plants with 1-tap individual watering triggers `waterPlant(plant.id)`, award water drops on review completion and allow 1-tap watering on the same screen without page navigation.
  2. Middle Card: FSRS Spaced Repetition Due Review Trigger (F6): due cards count calculated via `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine.ts`, retrievability percentage computed via `fsrsForgettingCurve` from `src/lib/fsrs/math.ts`, primary CTA button `"Mulai Ulas {dueCount} Kartu Due →"` (or `"Semua Kartu Segar! Ulas Bebas"`) calling `startFSRSDueSession()`.
  3. Bottom Section: Secondary Practice Drills Shelf (F8): quick quiz, particle filling, sentence reordering, listening drills, verb conjugation, mistake notebook.
- **Success criteria**: All sprint tests (11, 12, 36, UI-IA overhaul e2e, 1-to-44, run.js) pass green, `tsc --noEmit` succeeds, responsive rules met.
- **Interface contracts**: PROJECT.md, ORIGINAL_REQUEST.md R2 & R6, explorer_survey_2/handoff.md § 3.1.
- **Code layout**: `src/pages/KebunPage.tsx`.

## Key Decisions Made
- Replaced mutually exclusive sub-tabs (`vault` vs `garden`) with unified vertical card flow: Top Card (Garden & 1-Tap Water), Middle Card (FSRS Due Review), and Bottom Section (Secondary Practice Drills Shelf).
- Wired `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine.ts` to calculate due count directly.
- Wired `startFSRSDueSession` to review CTA with backwards-compatible copy preserving `Latihan Bebas (Semua Kartu Segar)`.
- Maintained `<SkeletonGrid count={8} type="plant" />` loading fallback.
- Added 6 secondary drill actions (`setActiveTab('quiz')`, `setActiveTab('choukai')`, `openConjugation()`, `openCatPlacement()`).
- Maintained strict touch target minimums (>= 40px) and active:scale-95 feedback.

## Artifact Index
- `.agents/teamwork/worker_m2_run2/DISPATCH.md` — Original assignment from parent
- `.agents/teamwork/worker_m2_run2/BRIEFING.md` — Situational awareness and working memory
- `.agents/teamwork/worker_m2_run2/progress.md` — Liveness and execution tracking
- `.agents/teamwork/worker_m2_run2/handoff.md` — Final handoff report

## Change Tracker
- **Files modified**: `src/pages/KebunPage.tsx` — Unified dual-card review & garden retention hub
- **Build status**: All tests pass (tsc clean, Sprints 1-44 green, E2E 91/91 green, run.js 75,987 green, bundle budget clean)
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS (100%)
- **Lint status**: PASS (tsc --noEmit exited 0)
- **Tests added/modified**: Verified against all cumulative suites

## Loaded Skills
- None explicitly loaded
