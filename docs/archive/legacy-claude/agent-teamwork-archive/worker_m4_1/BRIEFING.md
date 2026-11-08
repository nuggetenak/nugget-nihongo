# BRIEFING — 2026-10-25T10:39:00Z

## Mission
Deliver Milestone 4: Polish Tab 4 Dedicated AI Tutor Room (SenseiPage.tsx) and In-Lesson Contextual Sensei Sheet (LessonStudyPage.tsx).

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m4_1
- Original parent: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Milestone: Milestone 4 (Tab 4: Sensei AI Room & In-Lesson Contextual Sheet)

## 🔒 Key Constraints
- File ownership: strictly own only `src/pages/SenseiPage.tsx` and `src/pages/LessonStudyPage.tsx` (plus `.agents/teamwork/worker_m4_1/` metadata).
- No Windows PowerShell `&&` syntax.
- Strictly NO `focus:outline-hidden` (Sprint 3 contract: must use `focus:outline-none`).
- Include copy `'kantung plastik'` in conversation/prompts (Sprint 28 contract).
- Dual personas: Sensei Nugget (`sensei_nugget`), Senpai Aoi (`senpai_aoi`).
- 3 modes: `explain`, `roleplay`, `correct`.
- Roleplay scenarios: Ramen (`ramen`), Konbini (`konbini`), Station (`station`), Baito (`baito`).
- `speakPersona` audio playback integration.
- Non-blocking confirmation modal (`isClearConfirmOpen`, NO `window.confirm`).
- Mobile keyboard-safe input, touch targets >= 40x40px with `active:scale-95`, `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
- In-Lesson Contextual Sensei Sheet in `LessonStudyPage.tsx`:
  - Add non-intrusive Sensei button (`[💡 Tanya Sensei]`).
  - Calls `openSenseiSheet` with current lesson context:
    ```typescript
    openSenseiSheet({
      id: currentLesson?.id || 'lesson',
      type: 'grammar',
      level: trackId,
      target: currentLesson?.title || 'Pelajaran',
      structure: currentLesson?.grammarSummary || '',
      exampleJa: currentLesson?.exampleSentenceJa || '',
      exampleId: currentLesson?.exampleSentenceId || '',
    });
    ```
  - Opening/closing sheet must NOT reset `activeStage` or `MicroDrillStage` quiz state.
  - Container responsive constraints: `min-w-0 max-w-full overflow-x-hidden`.

## Current Parent
- Conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d
- Updated: 2026-10-25T10:39:00Z

## Task Summary
- **What to build**: Polish `SenseiPage.tsx` and add non-destructive Sensei sheet button in `LessonStudyPage.tsx`.
- **Success criteria**: All specified regression tests pass, bundle budget checks pass, no typescript errors.
- **Interface contracts**: PROJECT.md Interface Contract 5
- **Code layout**: PROJECT.md Code Layout

## Key Decisions Made
- `SenseiPage.tsx`:
  - Persona pairing clarified: Sensei Nugget = warm, encouraging, cultural context; Senpai Aoi = sharp, conversational, workplace realism.
  - Retained all 3 modes (`explain`, `roleplay`, `correct`), 4 scenarios (`ramen`, `konbini`, `station`, `baito`), `speakPersona`, non-blocking confirmation dialog (`isClearConfirmOpen`, no `window.confirm`).
  - All interactive elements upgraded to touch target >= 40px and `active:scale-95`.
  - Responsive bounds: `w-full max-w-full sm:max-w-4xl pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 overflow-x-hidden min-w-0`.
- `LessonStudyPage.tsx`:
  - Added `LessonWithContext` interface extending `CurriculumLesson` with contextual properties (`title`, `grammarSummary`, `exampleSentenceJa`, `exampleSentenceId`).
  - Added non-intrusive `[💡 Tanya Sensei]` button in header control bar with `min-h-[40px]` and `active:scale-95`.
  - Non-destructive invariant strictly preserved: `ContextualSenseiSheet` is rendered at root boundary in `App.tsx` and opening/closing it does not reset `activeStage` or `MicroDrillStage` state.
  - Responsive bounds: `w-full max-w-full sm:max-w-4xl pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 overflow-x-hidden min-w-0`.

## Artifact Index
- .agents/teamwork/worker_m4_1/DISPATCH.md
- .agents/teamwork/worker_m4_1/BRIEFING.md
- .agents/teamwork/worker_m4_1/progress.md
- .agents/teamwork/worker_m4_1/handoff.md

## Change Tracker
- **Files modified**:
  - `src/pages/SenseiPage.tsx`: Touch targets >= 40px, persona descriptions, responsive bounds.
  - `src/pages/LessonStudyPage.tsx`: Added `[💡 Tanya Sensei]` button calling `openSenseiSheet` with lesson context, responsive bounds.
- **Build status**: PASS (`npx tsc --noEmit` code 0, `npm run build:vite` code 0, bundle budget 100% compliant)
- **Pending issues**: None

## Quality Status
- **Build/test result**: All 44 sprint test suites passed (100% green). Master `tests/run.js` passed (75,987 assertions). `test-ui-ia-overhaul-e2e.js` passed (91/91 assertions).
- **Lint status**: Clean (no TypeScript errors).
- **Tests added/modified**: Verified against all regression and E2E suites.

## Loaded Skills
- None
