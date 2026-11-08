## 2026-10-25T11:38:23Z

You are Worker M5 for Nugget Nihongo UI/UX & IA Overhaul.
Your working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m5_1\
Read the authoritative user request: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md
Read the project specifications: c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. An auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & File Ownership:
You exclusively own: `src/pages/SettingsPage.tsx`
(Do NOT modify any other files).

Your objective: Implement Milestone 5 — Tab 5 (Profil, Cloud Sync, & L1 Dialect Hub):
1. Feature 13 (F13) — Top Profile & Progress Mastery Card:
   - Learner identity: avatar, learner name/email/guest badge.
   - 36-hour streak engine status (streak count, flame icon, active/freeze state).
   - Total XP and Level badge.
   - Embedded `<SyncStatusPill />` (imported from `src/components/sync/SyncStatusPill.tsx` or equivalent) indicating real-time Cloud/IndexedDB sync status.
2. Feature 14 (F14) — L1 Substratum Dialect Hub:
   - Cultural/regional dialect selector for Indonesian learners:
     - Bahasa Indonesia Umum
     - Logat Jawa (analogi partikel, unggah-ungguh keigo)
     - Logat Sunda (kehalusan rasa bahasa, tata krama)
     - Logat Batak / Timur (ketegasan intonasi, ekspresi langsung)
   - Synchronous persistence in `useAppStore` / `localStorage` (via existing store actions or settings state).
3. Feature 15 (F15) — Application Preferences:
   - Japanese typography toggles: Furigana display, Romaji toggle.
   - Audio & Speech preferences: Speech rate slider/stepper, Audio SFX volume/toggle.
   - Theme toggle (Dark / Light / System).
   - Data management: offline storage indicator, cache clear with non-blocking confirmation dialog (zero `window.confirm`).
4. Ergonomic, Responsive & Historical Constraints:
   - Strictly adhere to `focus:outline-none` (zero `focus:outline-hidden` per Sprint 3 contract).
   - Container wrapper: `w-full max-w-full sm:max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 min-w-0 overflow-x-hidden`.
   - All interactive touch targets must be >= 40x40px or `min-h-[40px]`/`min-h-[44px]` with tactile scale feedback `active:scale-95`.
   - Production bundle budget: ensure chunk `SettingsPage-` stays well below the 500 kB ceiling.

Verification battery to run in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`:
- `npx tsc --noEmit`
- `node tests/test-sprint-3-frontend.js`
- `node tests/test-sprint-12-features.js`
- `node tests/test-sprint-28-copywriting-typography.js`
- `node tests/test-ui-ia-overhaul-e2e.js`
- `node tests/run-sprints-1-to-44.js`
- `node tests/run.js`
- `cmd /c "npm run build:vite && node scripts/verify-bundle-budget.js"`

Deliver a structured handoff report in `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m5_1\handoff.md` with:
- Observation (verified source line ranges, test outputs)
- Logic Chain
- Caveats
- Conclusion
- Verification Method

Update `progress.md` before and after work. Send a message to orchestrator upon completion.
