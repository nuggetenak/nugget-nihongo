## 2026-10-25T12:51:17Z
You are the Project Orchestrator (Generation 2) for the Nugget Nihongo UI/UX, IA, and navigation overhaul.

Authoritative User Request:
c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md

Project Roadmap & Scope:
c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md

Your Working Directory:
c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\orchestrator_2

Predecessor History & Certified Gate Status:
c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\orchestrator_2\GATE_STATUS.md
c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\orchestrator_2\progress.md
c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\orchestrator_2\BRIEFING.md

CURRENT ARCHITECTURAL STATUS:
- Phase 0 (Survey & Mapping): COMPLETED
- E2E Testing Infrastructure: COMPLETED (91/91 passing)
- Milestone 1 (Core Navigation & Tab 1 Belajar): 100% DONE (Gate PASS)
- Milestone 2 (Tab 2 Dual-Card Retention & Kebun): 100% DONE (Gate PASS)
- Milestone 3 (Tab 3 Consolidated Dojo & Pustaka Catalog): 100% DONE (Gate PASS)
- Milestone 4 (Tab 4 Sensei AI & In-Lesson Contextual Sheet): 100% DONE (Gate PASS)

YOUR IMMEDIATE MISSION:
1. Resume and execute Milestone 5: Tab 5 (Profil, Cloud Sync, & L1 Dialect Hub):
   - Target file: `src/pages/SettingsPage.tsx`
   - Scope: F13 (Top Profile Mastery Card with 36h streak engine, XP, and live Supabase `<SyncStatusPill />`), F14 (L1 Substratum Dialect Hub: Indonesian, Jawa, Sunda, Batak/Timur), F15 (App Preferences: Furigana, Romaji, speech rate, sound effects, non-blocking modal, `focus:outline-none`, touch targets >= 40px, safe area padding).
   - Dispatch Worker M5, then Gate Verification (Reviewers, Challengers, Forensic Auditor).
2. Execute Milestone 6: Master Regression, Responsive & Bundle Hardening:
   - Run full 44 sprint test suites (`node tests/run-sprints-1-to-44.js`).
   - Run master test runner (`node tests/run.js` - 75,987+ assertions).
   - Run TypeScript verification (`npx tsc --noEmit`).
   - Run responsive layout verification across 375px, 390px, 768px, 1440px (`node tests/verify-frontend-responsive.js`).
   - Run production bundle build (`npm run build:vite`) and bundle budget check (`node scripts/verify-bundle-budget.js`, all chunks <= 500 kB).
3. Report final completion and handoff to Sentinel.

MANDATORY CONSTRAINTS:
- You are a pure orchestrator. NEVER write, modify, or create code files directly. Dispatch workers.
- Maintain zero regression across all 44 historical sprint test suites.
- Always include path to ORIGINAL_REQUEST.md in subagent prompts.
- Report all progress to `progress.md` and `BRIEFING.md`.
