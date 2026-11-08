# Forensic Audit Report: Milestone 2 — Dual-Card Review & Garden Retention Hub (Tab 2)

**Work Product**: `src/pages/KebunPage.tsx`  
**Auditor**: Forensic Auditor (`auditor_m2_1`)  
**Parent Conversation ID**: `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Profile**: General Project  
**Integrity Mode**: Development Mode (Ground Truth: `ORIGINAL_REQUEST.md` line 8)  
**Date**: 2026-10-25T09:00:00Z  
**Verdict**: **CLEAN**

---

## 1. Observation

1. **Static Analysis of `src/pages/KebunPage.tsx`**:
   - **Genuine FSRS Retrievability Implementation**:
     - `src/pages/KebunPage.tsx` line 29: imports `fsrsForgettingCurve` from `../lib/fsrs/math`.
     - `src/pages/KebunPage.tsx` line 30: imports `getFSRSDueCount` from `../lib/quiz/quizEngine`.
     - `src/pages/KebunPage.tsx` lines 70–74:
       ```typescript
       const elapsedDays = c.last_review
         ? Math.max(0, (now - new Date(c.last_review).getTime()) / 86400000)
         : (c.elapsed_days || 0);
       const r = fsrsForgettingCurve(elapsedDays, c.stability || 1);
       totalRetrievability += r;
       ```
     - `src/pages/KebunPage.tsx` lines 88–90:
       ```typescript
       const estimatedRetrievability = totalCards > 0
         ? Math.round((totalRetrievability / totalCards) * 100)
         : 90;
       ```
     - **Negative Verification**: Grepping across the codebase for the prohibited fake formula `100 - (dueCount / totalCards) * 20` confirmed 0 occurrences in `KebunPage.tsx` (only appears in `tests/test-sprint-36-gamification-hardening.js` line 189 as a negative assertion `assert(!kebunCode.includes(...))`).
   - **Genuine 1-Tap Garden Watering Integration**:
     - `src/pages/KebunPage.tsx` line 33: destructures `waterDrops, plants, waterPlant, waterAll, checkDailyRefill` from `useGardenStore()`.
     - `src/pages/KebunPage.tsx` line 121: `const success = waterPlant(plant.id);` invokes genuine Zustand action updating `waterDrops` and `plants` with localStorage persistence.
     - `src/pages/KebunPage.tsx` line 136: `const count = waterAll();` invokes genuine batch watering action updating all eligible unbloomed plants.
     - `src/pages/KebunPage.tsx` lines 48–50: `useEffect(() => { checkDailyRefill(); }, [checkDailyRefill]);` calls daily refill on component mount.
   - **Zero Cheats / Facades / Hardcoded Test Responses**:
     - Card metrics are dynamically calculated from `Object.entries(cards)` in `useAppStore`.
     - Plant shelf dynamically renders `filteredPlants` with level filtering (`all`, `n5`, `n4`, `n3`, `n2`).
     - Empty plant state renders `<SkeletonGrid count={8} type="plant" />` satisfying Sprint 11 Motion contract.
     - Empty card pool state dynamically renders welcoming start button `"Mulai Pelajaran Pertama di Materi Hub"` satisfying Sprint 10 Ergonomics contract.
     - Zero due cards renders welcoming state `"Semua Kartu Segar! Ulas Bebas · Latihan Bebas (Semua Kartu Segar)"`.
     - Primary review trigger invokes `startFSRSDueSession()` in `useAppStore` setting `fsrsDueReviewTrigger: true`.
     - Secondary practice drills shelf exposes 6 distinct drills calling legitimate store triggers (`setActiveTab('quiz')`, `setActiveTab('choukai')`, `openConjugation()`, `openCatPlacement()`), without altering FSRS card stability or triggering due sessions.

2. **Test Suite Integrity (Anti-Bypass & Anti-Weakening Audit)**:
   - Evaluated `git diff tests/`:
     - `tests/run.js`: Added 4 new modular test blocks (N4 curriculum, N3 curriculum, Core modules: Keigo, Counters, Kotowaza 376+, Pitch Accent). Zero assertions removed or weakened.
     - `tests/test-curriculum.js`: Added multi-level curriculum verifier (N5, N4, N3, N2, N1).
     - `tests/test-sprint-5-pedagogy.js`: Updated uncurated test fixture ID to reflect N2 curriculum expansion.
     - `tests/verify-frontend-responsive.js`: Added `:visible` selector filter and retry handler for modal animations.
   - Zero test suites were disabled, bypassed, or commented out.

3. **Empirical Verification Tool Runs**:
   - `npx tsc --noEmit`: Exited with code 0 (Zero TypeScript errors).
   - `node tests/test-challenger-m2.js`: 18/18 PASS (100% green across FSRS mathematical rigor, timestamp verification, daily refill idempotency, and secondary drill decoupling).
   - `node tests/test-sprint-10-ergonomics.js`: 21/21 PASS.
   - `node tests/test-sprint-11-motion.js`: 6/6 PASS.
   - `node tests/test-sprint-12-features.js`: 9/9 PASS.
   - `node tests/test-sprint-36-gamification-hardening.js`: 5/5 PASS.
   - `node tests/test-ui-ia-overhaul-e2e.js`: 91/91 PASS (including all 24 Milestone 2 contracts).
   - `node tests/run.js`: 75,987 assertions PASS, 0 FAIL, 0 SKIP.
   - `node tests/run-sprints-1-to-44.js`: All 44/44 sprint regression suites PASSED with 0 regressions.
   - `npm run build:vite; node scripts/verify-bundle-budget.js`: Production build succeeded. All 50 JS chunks strictly remain $\le 500\text{ kB}$ (`KebunPage-ckJNerQI.js` is 27.06 kB).

---

## 2. Logic Chain

1. **Integrity Mode Classification**:
   - `ORIGINAL_REQUEST.md` line 8 specifies `Integrity mode: development`.
   - In Development Mode, code reuse and shared libraries are permitted; prohibited patterns are: hardcoded test outputs, dummy/facade implementations lacking real logic, fabricated logs/artifacts, and test suite bypassing/weakening.

2. **Empirical Evaluation of Prohibited Patterns**:
   - **Pattern 1: Hardcoded test results**: None found. Values rendered in `KebunPage.tsx` (`waterDrops`, `plants`, `fsrsStats.totalCards`, `fsrsStats.dueCount`, `fsrsStats.avgStability`, `fsrsStats.avgDifficulty`, `fsrsStats.estimatedRetrievability`) are derived from reactive Zustand stores via mathematical functions.
   - **Pattern 2: Facade implementations**: None found. `fsrsForgettingCurve` from `src/lib/fsrs/math.ts` calculates retrievability according to Ye et al. (2022) $R(t, S) = (1 + \text{FACTOR} \cdot t / S)^{-\text{DECAY}}$. `waterPlant` and `waterAll` update plant stage and drop inventory with persistent localStorage storage.
   - **Pattern 3: Fabricated verification outputs**: None found. All test runs were executed live and captured in terminal logs with exit code 0.
   - **Pattern 4: Self-certifying tests**: None found. Tests in `test-challenger-m2.js`, `test-ui-ia-overhaul-e2e.js`, and sprint suites validate runtime outputs and AST properties independently.
   - **Pattern 5: Test weakening / bypass**: None found. `git diff` confirms zero deleted or commented-out assertions. All historical suites (Sprints 1–44) remain 100% green.

3. **Conclusion Inference**:
   - Since all Phase 1 checks passed without a single failure or prohibited pattern, the work product satisfies all forensic requirements.

---

## 3. Caveats

- **No Caveats**: The audit was comprehensive, covering static source analysis, AST/token inspection, mathematical property verification, store state mutations, test suite diff analysis, master regression test execution, and production bundle budget audit.

---

## 4. Conclusion

- **Verdict: CLEAN**
- `src/pages/KebunPage.tsx` implements the Dual-Card Review & Garden Retention Hub authentically and rigorously.
- All R2 requirements from `ORIGINAL_REQUEST.md` and Milestone 2 specifications from `PROJECT.md` are fully satisfied.
- The work product is certified for merge and ready for Milestone 3 progression.

---

## 5. Verification Method

To independently reproduce the forensic verification, run the following commands in `nugget-nihongo`:
```powershell
# 1. Typecheck
npx tsc --noEmit

# 2. Adversarial & Sprint verification
node tests/test-challenger-m2.js
node tests/test-sprint-10-ergonomics.js
node tests/test-sprint-11-motion.js
node tests/test-sprint-12-features.js
node tests/test-sprint-36-gamification-hardening.js
node tests/test-ui-ia-overhaul-e2e.js

# 3. Master regression suites
node tests/run.js
node tests/run-sprints-1-to-44.js

# 4. Production build & bundle budget check
npm run build:vite; node scripts/verify-bundle-budget.js
```

**Invalidation Conditions**:
- If `KebunPage.tsx` fails to calculate retention using `fsrsForgettingCurve`.
- If `waterAll()` or `waterPlant(id)` fail to mutate `useGardenStore` state.
- If any test in `run.js` or `run-sprints-1-to-44.js` fails.
- If any production chunk exceeds 500 kB.
