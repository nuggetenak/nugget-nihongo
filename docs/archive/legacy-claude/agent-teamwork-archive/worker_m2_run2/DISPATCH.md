## 2026-10-25T08:14:35Z
You are the replacement Worker M2 for Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) of the Nugget Nihongo UI/UX, IA, & Navigation Overhaul.

Your identity:
- Role: Implementation Worker (Milestone 2)
- Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m2_run2
- Target project directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo
- Scope document: c:\Users\Timedoor\Downloads\nugget nihonggo project\PROJECT.md
- Authoritative request: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md
- Architectural survey: c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_survey_2\handoff.md
- Parent conversation ID: 9110eabb-ae6d-43ee-8e3e-c0e815b0201d

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVELY OWNED FILES:
- `src/pages/KebunPage.tsx`
- (Optionally supporting components in `src/components/garden/` or `src/components/quiz/` if directly tied to Tab 2 view)

TASK OBJECTIVES (Milestone 2 — R2 & R6):
Read `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md` (specifically R2 and R6) and `explorer_survey_2/handoff.md § 3.1`.

Refactor `src/pages/KebunPage.tsx` to unify long-term memory retrieval and garden progression into a single, cohesive retention hub:
1. **Top Card: Kebun Kata & 1-Tap Water Stock (F5, F7)**:
   - Display current plant growth status (e.g. "X dari Y Kanji Telah Mekar" / blooming stages 0..4).
   - Display collected water drops (`💧 {waterDrops} Tetes Air Tersedia`).
   - Provide an instant 1-tap "Siram Semua Tanaman" button invoking `waterAll()`.
   - Provide a shelf/grid of plants with 1-tap individual watering triggers invoking `waterPlant(plant.id)`.
   - Award water drops upon completion of review and immediately enable 1-tap watering on the same screen without requiring page navigation.
2. **Middle Card: FSRS Spaced Repetition Due Review Trigger (F6)**:
   - Display the critical memory review card:
     * Due cards count calculated via `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine.ts`.
     * Estimated retrievability percentage computed via `fsrsForgettingCurve` from `src/lib/fsrs/math.ts`.
     * Prominent primary CTA button: `"Mulai Ulas {dueCount} Kartu Due →"` (or `"Semua Kartu Segar! Ulas Bebas"` when dueCount === 0), invoking `startFSRSDueSession()`.
3. **Bottom Section: Secondary Practice Drills Shelf (F8)**:
   - Provide secondary access to optional practice drills below the primary review card:
     * Quick Quiz / Pilihan Ganda (四択クイズ)
     * Isian Partikel & Pola (助詞穴埋め)
     * Susun Kalimat (語順並べ替え)
     * Latihan Mendengar (リスニング特訓)
     * Latihan Konjugasi (動詞活用)
     * Catatan Evaluasi / Mistake Notebook
4. **CRITICAL TEST CONTRACTS & BACKWARD COMPATIBILITY (R6)**:
   - MUST import and render `<SkeletonGrid count={8} type="plant" />` to satisfy `tests/test-sprint-11-motion.js`.
   - MUST include and call `startFSRSDueSession` to satisfy `tests/test-sprint-12-features.js`.
   - MUST call `fsrsForgettingCurve` and `checkDailyRefill()` to satisfy `tests/test-sprint-36-gamification-hardening.js`.
   - All interactive touch targets MUST be >= 40x40px with `active:scale-95`.
   - Mobile container padding MUST maintain `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12`.
   - Zero horizontal overflow across 375px, 390px, 768px, 1440px viewports.

VERIFICATION COMMANDS (Run and verify in `nugget-nihongo`):
- `npx tsc --noEmit`
- `node tests/test-sprint-11-motion.js`
- `node tests/test-sprint-12-features.js`
- `node tests/test-sprint-36-gamification-hardening.js`
- `node tests/test-ui-ia-overhaul-e2e.js`
- `node tests/run-sprints-1-to-44.js`
- `node tests/run.js`

OUTPUT REQUIREMENTS:
- Write completion report to `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m2_run2\handoff.md`.
- Document all modified lines and test outputs.
- Send message to parent (9110eabb-ae6d-43ee-8e3e-c0e815b0201d).
