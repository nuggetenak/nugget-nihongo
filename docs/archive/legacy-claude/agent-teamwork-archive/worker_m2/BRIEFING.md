# BRIEFING — 2026-10-25T08:06:00Z

## Mission
Refactor `src/pages/KebunPage.tsx` into a unified Dual-Card Review & Garden Retention Hub (Tab 2) uniting plant growth, 1-tap water stock, FSRS spaced repetition review, and secondary practice drills shelf while satisfying all historical sprint test contracts and responsive design standards.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m2
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub)

## 🔒 Key Constraints
- Exclusively owned files: `src/pages/KebunPage.tsx` (and supporting components in `src/components/garden/` or `src/components/quiz/` if directly tied to Tab 2 view).
- MUST import and render `<SkeletonGrid count={8} type="plant" />` to satisfy `tests/test-sprint-11-motion.js`.
- MUST include and call `startFSRSDueSession` to satisfy `tests/test-sprint-12-features.js`.
- MUST call `fsrsForgettingCurve` and `checkDailyRefill()` to satisfy `tests/test-sprint-36-gamification-hardening.js`.
- All interactive touch targets >= 40x40px with `active:scale-95`.
- Mobile container padding: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
- Zero horizontal overflow across 375px, 390px, 768px, 1440px viewports.
- No cheating, no fake/dummy implementations. Maintain full backward compatibility for Sprints 1-44 tests and `tests/run.js`.

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T08:06:00Z

## Task Summary
- **What to build**: Tab 2 unified retention hub in `KebunPage.tsx`:
  1. Top Card: Kebun Kata & 1-Tap Water Stock (F5, F7)
  2. Middle Card: FSRS Spaced Repetition Due Review Trigger (F6)
  3. Bottom Section: Secondary Practice Drills Shelf (F8)
- **Success criteria**:
  - `npx tsc --noEmit` code 0.
  - `node tests/test-sprint-11-motion.js` passes.
  - `node tests/test-sprint-12-features.js` passes.
  - `node tests/test-sprint-36-gamification-hardening.js` passes.
  - `node tests/test-ui-ia-overhaul-e2e.js` passes.
  - `node tests/run-sprints-1-to-44.js` 100% green.
  - `node tests/run.js` passes.
- **Interface contracts**: `PROJECT.md`, `ORIGINAL_REQUEST.md`, `explorer_survey_2/handoff.md`.
- **Code layout**: `src/pages/KebunPage.tsx`.

## Key Decisions Made
- [TBD - will document as we inspect existing KebunPage and design implementation]

## Artifact Index
- `DISPATCH.md` — assignment and constraints
- `BRIEFING.md` — persistent situational awareness
- `progress.md` — liveness heartbeat and step logs
- `handoff.md` — final 5-component handoff report

## Change Tracker
- **Files modified**: None yet
- **Build status**: Untested
- **Pending issues**: None

## Quality Status
- **Build/test result**: Pending initial test run
- **Lint status**: Clean
- **Tests added/modified**: None yet

## Loaded Skills
- None
