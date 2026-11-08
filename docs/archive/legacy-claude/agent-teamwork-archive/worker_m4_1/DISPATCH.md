## 2026-10-25T10:14:58Z

You are Worker M4 for Milestone 4 (Tab 4: Sensei AI Room & In-Lesson Contextual Sheet).
Your working directory is: `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m4_1`

FILE OWNERSHIP:
You exclusively own:
- `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\SenseiPage.tsx`
- `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\LessonStudyPage.tsx`

MANDATORY INSTRUCTIONS:
1. You MUST read `ORIGINAL_REQUEST.md` at `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md` before starting work.
2. Read `PROJECT.md` at `c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md` (specifically Feature Inventory F11, F12, and Milestone 4 specifications).
3. Inspect `src/pages/SenseiPage.tsx` and `src/pages/LessonStudyPage.tsx`.

OBJECTIVE:
1. **Feature 11 (F11) — Polish Tab 4 Dedicated AI Tutor Room (`SenseiPage.tsx`)**:
   - Ensure dual personas: Sensei Nugget (`sensei_nugget`: warm, encouraging, cultural context) and Senpai Aoi (`senpai_aoi`: sharp, conversational, workplace realism).
   - Support 3 modes: `explain`, `roleplay`, `correct`.
   - Ensure roleplay scenarios include: Ramen (`ramen`), Konbini (`konbini`), Station (`station`), Baito (`baito`).
   - Integrate speech audio playback for responses (`speakPersona`).
   - Chat history persistence with non-blocking confirmation dialog (`isClearConfirmOpen`, strictly NO native `window.confirm`).
   - Include copy `'kantung plastik'` in conversation/prompts (Sprint 28 contract).
   - Use `focus:outline-none` (strictly NO `focus:outline-hidden` per Sprint 3 contract).
   - Mobile keyboard-safe input, touch targets >= 40x40px with `active:scale-95`, `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.

2. **Feature 12 (F12) — In-Lesson Contextual Sensei Sheet (`LessonStudyPage.tsx`)**:
   - Add a non-intrusive Sensei button (e.g. `[💡 Tanya Sensei]`) in the lesson header or control bar.
   - When clicked, call `openSenseiSheet` from `useAppStore` passing current lesson context:
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
   - Crucial non-destructive invariant: Opening and closing `ContextualSenseiSheet` must NOT reset `activeStage` or `MicroDrillStage` quiz state (`currentIndex`, `selectedAnswer`, `reorderedTokens`).
   - Container responsive constraints: `min-w-0 max-w-full overflow-x-hidden`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A forensic auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

VERIFICATION COMMANDS (run in `nugget-nihongo`):
- `npx tsc --noEmit`
- `node tests/test-sprint-3-frontend.js`
- `node tests/test-sprint-12-features.js`
- `node tests/test-sprint-28-copywriting-typography.js`
- `node tests/test-ui-ia-overhaul-e2e.js`
- `node tests/run-sprints-1-to-44.js`
- `node tests/run.js`
- `npm run build:vite; node scripts/verify-bundle-budget.js`

OUTPUT:
Write your handoff report to `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m4_1\handoff.md`.
Send completion message via send_message to caller (conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d).
