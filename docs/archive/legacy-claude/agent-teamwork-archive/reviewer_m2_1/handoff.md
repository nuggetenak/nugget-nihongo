# Review & Adversarial Critic Report: Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub)

**Reviewer Identity:** Reviewer 1 (`reviewer_m2_1`)  
**Parent Conversation ID:** `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Target Codebase:** `src/pages/KebunPage.tsx`  
**Date:** 2026-10-25T08:54:30Z  
**Verdict:** **APPROVE**

---

## 1. Observation

1. **Top Card Architecture (Plant Growth & Water Stock — F5, F7)**:
   - `src/pages/KebunPage.tsx` lines 189–227: Consolidates blooming progress badge (`🌸 {bloomingCount} dari {plants.length} Kanji Telah Mekar`), water drop stock (`💧 {waterDrops} Tetes Air Tersedia`), and 1-tap `Siram Semua Tanaman` button invoking `handleWaterAll()`.
   - `src/pages/KebunPage.tsx` lines 271–273:
     ```tsx
     {plants.length === 0 ? (
       <SkeletonGrid count={8} type="plant" />
     ) : (
     ```
   - `src/pages/KebunPage.tsx` lines 218–226 & 338–350: 1-Tap `Siram Semua Tanaman` button and individual plant water buttons disable safely when `waterDrops <= 0`.
   - `src/pages/KebunPage.tsx` lines 230–248: When `waterDrops === 0`, an empty-water guide banner is displayed offering immediate CTA "Ulas Kartu Sekarang →" calling `startFSRSDueSession`.

2. **Middle Card Architecture (FSRS Spaced Repetition Due Review Trigger — F6)**:
   - `src/pages/KebunPage.tsx` lines 29–30:
     ```tsx
     import { fsrsForgettingCurve } from '../lib/fsrs/math';
     import { getFSRSDueCount } from '../lib/quiz/quizEngine';
     ```
   - `src/pages/KebunPage.tsx` line 60: `const dueCount = getFSRSDueCount(cards);`
   - `src/pages/KebunPage.tsx` line 73: `const r = fsrsForgettingCurve(elapsedDays, c.stability || 1);`
   - `src/pages/KebunPage.tsx` lines 88–90: True FSRS retrievability based on Ye et al. (2022) forgetting curve, with 90% default when cards empty:
     ```tsx
     const estimatedRetrievability = totalCards > 0
       ? Math.round((totalRetrievability / totalCards) * 100)
       : 90;
     ```
   - `src/pages/KebunPage.tsx` lines 380–407: FSRS CTA handles all 3 states:
     - When `fsrsStats.totalCards === 0`: Welcoming start button `"Mulai Pelajaran Pertama di Materi Hub"` invoking `setActiveTab('materi')`.
     - When `fsrsStats.dueCount === 0`: Celebratory button `"Semua Kartu Segar! Ulas Bebas · Latihan Bebas (Semua Kartu Segar)"` invoking `startFSRSDueSession`.
     - When `fsrsStats.dueCount > 0`: Urgent review trigger `"Mulai Ulas {fsrsStats.dueCount} Kartu Due →"` invoking `startFSRSDueSession`.
   - `src/pages/KebunPage.tsx` lines 419–534: 4 core scientific metrics (Kartu Terdaftar, Jatuh Tempo Hari Ini, Rata-rata Stabilitas, Indeks Kesulitan D) and 4-tier Retention Distribution Spectrum (Baru, Belajar, Pengulangan, Evaluasi Ulang).

3. **Bottom Section Architecture (Secondary Practice Drills Shelf — F8)**:
   - `src/pages/KebunPage.tsx` lines 538–704: Clean vertical rendering of 6 optional practice drill triggers directly below Card 2 without internal tabs or modal nesting:
     - 1. Quick Quiz / Pilihan Ganda (`setActiveTab('quiz')`)
     - 2. Isian Partikel & Pola (`setActiveTab('quiz')`)
     - 3. Susun Kalimat (`setActiveTab('quiz')`)
     - 4. Latihan Mendengar (`setActiveTab('choukai')`)
     - 5. Latihan Konjugasi (`openConjugation()`)
     - 6. Catatan Evaluasi / Mistake Notebook (`openCatPlacement()`)

4. **Multi-Device Responsiveness, Safe Area Padding & Touch Targets**:
   - `src/pages/KebunPage.tsx` line 153:
     ```tsx
     <div className="max-w-5xl mx-auto py-4 sm:py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-6 sm:space-y-8 animate-in fade-in duration-300 min-w-0 overflow-x-hidden">
     ```
   - Interactive touch targets strictly adhere to $\ge 40\times 40\text{px}$ with `active:scale-95` tactile feedback across all primary buttons (`min-h-[44px]`), filter pills (`min-h-[40px]`), plant water triggers (`min-h-[40px]`), audio triggers (`min-h-[40px] min-w-[40px]`), and drill action buttons (`min-h-[40px]`).

5. **Independent Tool & Test Execution Results**:
   - `npx tsc --noEmit` exited with code 0 (zero TypeScript compilation errors).
   - `node tests/test-sprint-11-motion.js` -> 6/6 PASS (includes `<SkeletonGrid count={8} type="plant" />` check).
   - `node tests/test-sprint-12-features.js` -> 10/10 PASS (includes `startFSRSDueSession` integration check).
   - `node tests/test-sprint-36-gamification-hardening.js` -> 5/5 PASS (includes `fsrsForgettingCurve` and `checkDailyRefill()` check).
   - `node tests/test-ui-ia-overhaul-e2e.js` -> 91/91 PASS (100% green across all 4 tiers and architectural guardrails).
   - `node tests/run.js` -> 75,987 assertions passed, 0 failures, 0 skips.
   - `node tests/test-sprint-10-ergonomics.js` -> 21/21 PASS (includes zero-card empty state check).
   - `node tests/run-sprints-1-to-44.js` -> 44/44 cumulative sprint suites passed with zero regressions.
   - `npm run build:vite; node scripts/verify-bundle-budget.js` -> `KebunPage-ckJNerQI.js` is 27.06 kB (well below 500 kB budget; all 50 chunks within budget).
   - `node tests/test-ssw-priority-architecture.js` -> 6/6 PASS.

---

## 2. Logic Chain

1. **Verification of Consolidations (R2, F5–F8)**:
   - Observations 1 and 2 prove that `KebunPage.tsx` successfully consolidates the previously separated "garden" and "vault" views into a single unified retention hub.
   - The top card immediately exposes plant status and water stock with a 1-tap "Siram Semua Tanaman" button, satisfying Feature F5 and Feature F7.
   - The middle card directly accesses `cards` from `useAppStore`, executes `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine.ts`, computes retrievability via `fsrsForgettingCurve(elapsedDays, stability)`, and connects the primary CTA to `startFSRSDueSession()`, satisfying Feature F6.
   - The bottom section cleanly lays out the 6 secondary drill modules, eliminating tab toggling and satisfying Feature F8.

2. **Integrity & Anti-Cheat Check**:
   - Reviewed `src/pages/KebunPage.tsx` for hardcoded test scores, dummy facades, or simulated logic.
   - Result:
     - No hardcoded test responses or bypasses.
     - `fsrsStats` is dynamically computed on every render from live Zustand state.
     - `handleWaterSingle` and `handleWaterAll` call genuine store methods (`waterPlant`, `waterAll`) that decrement water drop inventory and mutate plant stages.
     - `checkDailyRefill()` is genuinely triggered on mount to check the 24-hour timestamp boundary.
     - TTS pronunciation uses `speakJapanese(plant.kanji)`.
     - Zero integrity violations detected.

3. **Adversarial Stress-Testing & Boundary Case Analysis**:
   - **Boundary 1: Zero Total Cards (`cards = {}`)**:
     - Observation 2 confirms that if `cards` is empty, `totalCards === 0` is detected.
     - `avgStability` and `avgDifficulty` safely format as `'0.0'`, `estimatedRetrievability` defaults to 90%, preventing `NaN` or division by zero.
     - CTA renders welcoming action `"Mulai Pelajaran Pertama di Materi Hub"` invoking `setActiveTab('materi')`, passing `test-sprint-10-ergonomics.js`.
   - **Boundary 2: Zero Overdue Cards (`dueCount === 0`)**:
     - When cards exist but none are due, CTA transitions to celebratory free practice button `"Semua Kartu Segar! Ulas Bebas · Latihan Bebas (Semua Kartu Segar)"` invoking `startFSRSDueSession`.
   - **Boundary 3: Zero Water Drops (`waterDrops === 0`)**:
     - Both 1-tap "Siram Semua Tanaman" and individual "Siram (+1)" buttons are disabled (`disabled={waterDrops <= 0}`).
     - A banner appears guiding the learner to complete FSRS reviews to acquire water drops.
     - Attempting to water returns early with an informative toast message.
   - **Boundary 4: All Plants Already at Maximum Bloom (`stage === 4`)**:
     - `handleWaterAll` checks watered count; if 0 plants were watered, it informs the learner with a toast that all plants are already in full bloom. Individual buttons show "Mekar Sempurna" and are disabled.
   - **Boundary 5: Clock Drift or Future `last_review`**:
     - `Math.max(0, (now - new Date(c.last_review).getTime()) / 86400000)` guards against negative elapsed days.
   - **Boundary 6: Empty Plants Array**:
     - Render fallback `<SkeletonGrid count={8} type="plant" />` activates cleanly, preventing CLS and blank pages.
   - **Boundary 7: Mobile Viewport & Touch Ergonomics**:
     - Minimum dimensions $\ge 40\times 40\text{px}$ and `active:scale-95` on all touch targets.
     - Container provides `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12` and `min-w-0 overflow-x-hidden`, preventing occlusion by `BottomNav` and 0px horizontal blowout.

---

## 3. Caveats

- **No caveats**: The scope was strictly confined to `src/pages/KebunPage.tsx`. No breaking changes or mutations were introduced to shared Zustand stores (`useGardenStore`, `useAppStore`, `useCurriculumStore`), preserving 100% backward compatibility across all 44 sprint test suites.

---

## 4. Conclusion

- **Verdict: APPROVE**
- Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) is fully implemented, mathematically grounded in FSRS v4, and completely verified.
- All 6 verification commands exit with code 0.
- Master test runner (`run.js`) passes all 75,987 assertions with 0 failures and 0 skips.
- The implementation strictly complies with all UI/IA overhaul requirements (R2, R6), responsive rules, and bundle budgets.

---

## 5. Verification Method

To independently verify this approval, run the following commands in `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`:

```powershell
npx tsc --noEmit
node tests/test-sprint-11-motion.js
node tests/test-sprint-12-features.js
node tests/test-sprint-36-gamification-hardening.js
node tests/test-ui-ia-overhaul-e2e.js
node tests/run.js
node tests/test-sprint-10-ergonomics.js
node tests/run-sprints-1-to-44.js
npm run build:vite; node scripts/verify-bundle-budget.js
```

**Invalidation Conditions**:
- If `KebunPage.tsx` fails to render `<SkeletonGrid count={8} type="plant" />` when `plants.length === 0`.
- If `getFSRSDueCount(cards)` or `fsrsForgettingCurve` are removed or bypassed.
- If `startFSRSDueSession` is not wired to the review CTA.
- If any touch target is smaller than 40x40px or lacks `active:scale-95`.
- If any test in `run.js` or `run-sprints-1-to-44.js` fails.
