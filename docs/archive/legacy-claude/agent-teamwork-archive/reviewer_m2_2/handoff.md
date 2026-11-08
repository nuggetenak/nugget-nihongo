# Review & Adversarial Audit Report: Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub)

**Reviewer Identity:** Reviewer 2 (Quality Reviewer & Adversarial Critic)  
**Parent Conversation ID:** `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Target File Reviewed:** `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\pages\KebunPage.tsx`  
**Worker Identity:** Worker M2 (`worker_m2_run2`)  
**Verdict:** **APPROVE**  
**Date:** 2026-10-25T08:55:00Z  

---

## Review Summary

**Verdict**: **APPROVE**  
**Overall Risk Assessment**: **LOW**  
**Integrity Audit**: **CLEAN (Zero Integrity Violations)**  

The implementation of Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) in `KebunPage.tsx` by Worker M2 fully meets all specifications set forth in `ORIGINAL_REQUEST.md` (R2, R6) and `PROJECT.md` (Features F5, F6, F7, F8). All 7 mandatory verification test suites compile and pass with 100% green status, the production Vite bundle satisfies the strict $\le 500\text{ kB}$ budget, and edge cases (0 cards, 0 water drops, all plants bloomed, empty plant state) are defensively handled.

---

## 1. Observation

1. **Target Implementation File Inspected**:
   - `src/pages/KebunPage.tsx` (710 lines):
     - Lines 32–45: Connects `useGardenStore` (`waterDrops`, `plants`, `waterPlant`, `waterAll`, `checkDailyRefill`) and `useAppStore` (`cards`, `showToast`, `incrementXp`, `setActiveTab`, `startFSRSDueSession`, `openConjugation`, `openCatPlacement`).
     - Lines 48–50: Implements `useEffect(() => { checkDailyRefill(); }, [checkDailyRefill]);` to handle daily morning water refill.
     - Lines 53–101: Calculates dynamic FSRS v4 retention statistics via `getFSRSDueCount(cards)` and `fsrsForgettingCurve(elapsedDays, stability)`. Clamped or fake formulas were completely eliminated.
     - Lines 189–356 (Card 1 - Top): Renders Garden status, blooming badge (`{bloomingCount} dari {plants.length} Kanji Telah Mekar`), water drop count (`💧 {waterDrops} Tetes Air Tersedia`), 1-tap "Siram Semua Tanaman" button (`waterAll`), filter pills (`all`, `n5`, `n4`, `n3`, `n2`), empty water banner, and `<SkeletonGrid count={8} type="plant" />` fallback.
     - Lines 361–534 (Card 2 - Middle): Renders FSRS retention hub with estimated retrievability percentage, 4 scientific metrics (Kartu Terdaftar, Jatuh Tempo Hari Ini, Rata-rata Stabilitas, Indeks Kesulitan D), card status distribution spectrum, and primary review CTA with adaptive messaging.
     - Lines 539–705 (Section 3 - Bottom): Renders 6 secondary practice drills (Quick Quiz, Isian Partikel, Susun Kalimat, Latihan Mendengar Choukai, Latihan Konjugasi, Catatan Evaluasi CAT) with direct dispatchers.

2. **Tool Execution Commands and Verbatim Results**:
   - `npx tsc --noEmit`: Exited with code 0 (zero TypeScript errors).
   - `node tests/test-sprint-10-ergonomics.js`: Exited with code 0.
     - Result: `21 / 21 TESTS PASSED` (including `KebunPage presents welcoming start action when 0 cards exist`).
   - `node tests/test-sprint-11-motion.js`: Exited with code 0.
     - Result: `6 / 6 TESTS PASSED` (including `SkeletonCard shimmer-flow & page integration (Zero CLS)`).
   - `node tests/test-sprint-12-features.js`: Exited with code 0.
     - Result: `9 / 9 TESTS PASSED` (including `Direct FSRS Due-Review Dispatcher integration`).
   - `node tests/test-sprint-36-gamification-hardening.js`: Exited with code 0.
     - Result: `5 / 5 TESTS PASSED` (including `GardenStore features MAX_GARDEN_CAPACITY, applyLapseWilt, and daily refill`).
   - `node tests/test-ui-ia-overhaul-e2e.js`: Exited with code 0.
     - Result: `91 / 91 TESTS PASSED` (100% green across Tier 1, Tier 2, Tier 3, Tier 4, and R6 Guardrails).
   - `node tests/run.js`: Exited with code 0.
     - Result: `PASS: 75987 | FAIL: 0 | SKIP: 0`.
   - `node tests/run-sprints-1-to-44.js`: Exited with code 0.
     - Result: `44 / 44 SPRINT SUITES PASSED WITH ZERO REGRESSIONS!`.
   - `npm run build:vite`: Exited with code 0 (`built in 2m 39s`).
   - `node scripts/verify-bundle-budget.js`: Exited with code 0.
     - Result: `All 50 chunks strictly adhere to the 500 kB ceiling!` (`KebunPage-ckJNerQI.js` is 27.06 kB).

---

## 2. Logic Chain

1. **Integrity Verification**:
   - *Observation*: Inspected `KebunPage.tsx` lines 53–101, 112–144, 218–226, 338–350, 380–407.
   - *Reasoning*:
     - No hardcoded test responses or facade mocks exist.
     - Real FSRS math is executed using `fsrsForgettingCurve` imported from `src/lib/fsrs/math`.
     - Real due count is queried from `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine`.
     - Real store dispatches occur for plant watering, XP increments, toast notifications, and modal triggers.
     - Independent execution of all test suites confirmed real-world green status without bypassing.
   - *Deduction*: The work possesses genuine integrity; no integrity violations detected.

2. **Interface Contracts & Functional Completeness (F5, F6, F7, F8)**:
   - *F5 (Top Card: Kebun & Water Stock)*: Successfully consolidated on lines 189–356. Displays water drops, bloomed count, and 1-tap "Siram Semua Tanaman" calling `waterAll()`.
   - *F6 (Middle Card: FSRS Due Review Trigger)*: Successfully integrated on lines 361–534. Displays due count, retrievability %, and CTA button calling `startFSRSDueSession()`.
   - *F7 (Water Reward & In-Screen Immediate Watering)*: Water drops awarded from FSRS reviews can be immediately spent on the same screen via `waterAll` or `handleWaterSingle` without navigating between tabs.
   - *F8 (Secondary Practice Drills Shelf)*: Successfully rendered on lines 539–705 with 6 distinct drill pathways routed cleanly to `quiz`, `choukai`, `openConjugation`, and `openCatPlacement`.

3. **Edge Case Handling**:
   - *0 Cards Total*: When `fsrsStats.totalCards === 0`, division by zero is prevented (`totalCards > 0 ? ... : ...`). A welcoming CTA "Mulai Pelajaran Pertama di Materi Hub" is displayed with route to `'materi'` (satisfying Sprint 10 T-50).
   - *0 Cards Due*: When `dueCount === 0`, the CTA adapts to "Semua Kartu Segar! Ulas Bebas · Latihan Bebas (Semua Kartu Segar)" invoking `startFSRSDueSession()` for non-punitive review.
   - *0 Water Drops*: Both "Siram Semua Tanaman" and individual plant water buttons are disabled (`disabled={waterDrops <= 0}` or `disabled:pointer-events-none`). An empty water banner guides the learner to complete FSRS reviews or practice quizzes.
   - *All Plants Bloomed*: Individual buttons show "Mekar Sempurna" and are disabled. "Siram Semua Tanaman" gracefully toasts "Semua tanaman yang bisa disiram sudah mekar sempurna! 🌿".
   - *Empty Plant State*: When `plants.length === 0`, `<SkeletonGrid count={8} type="plant" />` renders to prevent Cumulative Layout Shift (CLS) (satisfying Sprint 11 T-56).

4. **Multi-Device Responsive Constraints**:
   - Outer container specifies `max-w-5xl mx-auto py-4 sm:py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 min-w-0 overflow-x-hidden`.
   - Plant grid uses responsive columns: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4`. On 375px viewports, 2 columns with `truncate` on readings and meanings prevent horizontal blowouts.
   - Filter pills use `overflow-x-auto scrollbar-none` with `whitespace-nowrap shrink-0`.
   - Interactive touch targets strictly meet or exceed $40\times 40\text{px}$ (`min-h-[44px]` for primary CTAs, `min-h-[40px]` for secondary/filter buttons, `min-h-[40px] min-w-[40px]` for audio speaker buttons) with `active:scale-95` tactile feedback.

---

## 3. Adversarial Stress-Test Findings & Challenges

### [Low Risk] Finding 1: Defense-in-depth on Plant Water Progress Ratio
- **Observation**: Line 333 uses `style={{ width: `${(plant.waterCount / plant.maxWater) * 100}%` }}`.
- **Stress-Test Scenario**: If an anomalous or corrupted plant record in localStorage has `maxWater = 0` or `undefined`, the division produces `NaN%`.
- **Current Mitigation**: `useGardenStore` initializes all plants with `maxWater: 3`. In our runtime testing, all plants have valid `maxWater`.
- **Recommendation**: In a future hardening pass, add defensive default `(plant.maxWater || 1)`. Non-blocking.

### [Low Risk] Finding 2: Ephemeral State on Rapid Card Unmount
- **Observation**: Line 125 sets `setTimeout(() => setWateringId(null), 500)`.
- **Stress-Test Scenario**: If the user quickly navigates away within 500ms of clicking water.
- **Current Behavior**: In React 18, unmounted state updates are safely batched and ignored without warnings. Verified benign.

---

## 4. Verified Claims Matrix

| Claim from Worker M2 | Verification Method | Result |
|---|---|---|
| Zero TypeScript compilation errors (`tsc --noEmit`) | `npx tsc --noEmit` executed in terminal | PASS (Exit code 0) |
| Sprint 10 Ergonomics & T-50 0-card welcome state pass | `node tests/test-sprint-10-ergonomics.js` | PASS (21/21 tests green) |
| Sprint 11 Motion & T-56 SkeletonGrid loader pass | `node tests/test-sprint-11-motion.js` | PASS (6/6 tests green) |
| Sprint 12 Features & T-62 FSRS dispatcher pass | `node tests/test-sprint-12-features.js` | PASS (9/9 tests green) |
| Sprint 36 Gamification Hardening & FSRS forgetting curve pass | `node tests/test-sprint-36-gamification-hardening.js` | PASS (5/5 tests green) |
| E2E UI/IA Overhaul suite passes 100% | `node tests/test-ui-ia-overhaul-e2e.js` | PASS (91/91 tests green) |
| Master Regression Suite passes 75,987 assertions | `node tests/run.js` | PASS (75,987 passed, 0 fail) |
| Historical Sprints 1 to 44 pass without regressions | `node tests/run-sprints-1-to-44.js` | PASS (44/44 sprint suites green) |
| Production bundle complies with 500 kB budget ceiling | `scripts/verify-bundle-budget.js` | PASS (`KebunPage` = 27.06 kB) |

---

## 5. Caveats

- **No Caveats**: The review and adversarial stress-testing were conducted independently against the live codebase, store integrations, and test suites.

---

## 6. Conclusion

The Milestone 2 work by Worker M2 is architecturally sound, thoroughly tested, free of integrity violations, and adheres to all responsive and backward-compatibility guidelines.

**Final Verdict**: **APPROVE**

---

## 7. Verification Method

To independently reproduce this verification:
```powershell
cd "c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo"
npx tsc --noEmit
node tests/test-sprint-10-ergonomics.js
node tests/test-sprint-11-motion.js
node tests/test-sprint-12-features.js
node tests/test-sprint-36-gamification-hardening.js
node tests/test-ui-ia-overhaul-e2e.js
node tests/run.js
node tests/run-sprints-1-to-44.js
npm run build:vite; node scripts/verify-bundle-budget.js
```
