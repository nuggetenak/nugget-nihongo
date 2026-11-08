# Handoff Report: Challenger 2 — Milestone 2 Verification

**Agent Identity:** Challenger 2 (Empirical Challenger)  
**Parent Conversation ID:** `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Verdict:** **APPROVE**  
**Date:** 2026-10-25T08:56:00Z  

---

## 1. Observation

1. **Direct Code Inspection in `src/pages/KebunPage.tsx`**:
   - Lines 29–30:
     ```typescript
     import { fsrsForgettingCurve } from '../lib/fsrs/math';
     import { getFSRSDueCount } from '../lib/quiz/quizEngine';
     ```
   - Lines 48–50:
     ```typescript
     // Ticket T-199: Check and grant daily morning water refill (+3 drops)
     useEffect(() => {
       checkDailyRefill();
     }, [checkDailyRefill]);
     ```
   - Lines 53–74:
     ```typescript
     const fsrsStats = useMemo(() => {
       const cardList = Object.entries(cards)
         .map(([id, entry]) => ({ id, ...entry.card }))
         .filter((c) => c && c.due);

       const now = Date.now();
       const dueCount = getFSRSDueCount(cards);
       ...
       cardList.forEach((c) => {
         ...
         const elapsedDays = c.last_review
           ? Math.max(0, (now - new Date(c.last_review).getTime()) / 86400000)
           : (c.elapsed_days || 0);
         const r = fsrsForgettingCurve(elapsedDays, c.stability || 1);
         totalRetrievability += r;
         ...
       });
     ```
   - Lines 88–90:
     ```typescript
     const estimatedRetrievability = totalCards > 0
       ? Math.round((totalRetrievability / totalCards) * 100)
       : 90;
     ```
   - Lines 381–407: Primary review trigger button correctly invokes `startFSRSDueSession()` from `useAppStore`:
     ```typescript
     <button onClick={startFSRSDueSession} ...>
       <span>Mulai Ulas {fsrsStats.dueCount} Kartu Due →</span>
     </button>
     ```
   - Lines 537–704 (Section 3: Secondary Practice Drills Shelf):
     - Pilihan Ganda: `onClick={() => setActiveTab('quiz')}`
     - Isian Partikel & Pola: `onClick={() => setActiveTab('quiz')}`
     - Susun Kalimat: `onClick={() => setActiveTab('quiz')}`
     - Latihan Mendengar: `onClick={() => setActiveTab('choukai')}`
     - Latihan Konjugasi: `onClick={openConjugation}`
     - Catatan Evaluasi: `onClick={openCatPlacement}`
     - None of these secondary actions trigger `startFSRSDueSession` or alter card states.

2. **Mathematical Properties in `src/lib/fsrs/math.ts`**:
   - Lines 8–24:
     ```typescript
     export const DECAY = 0.5;
     export const FACTOR = 19 / 81; // (1/DECAY - 1)
     export function fsrsForgettingCurve(elapsedDays: number, stability: number): number {
       if (stability <= 0) return 0;
       return Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
     }
     ```
   - Analytical derivative with respect to elapsed days $t$:
     $$\frac{\partial R}{\partial t} = -0.5 \cdot \left(1 + \frac{19}{81} \frac{t}{S}\right)^{-1.5} \cdot \frac{19}{81 S} < 0 \quad (\forall t \ge 0, S > 0)$$
   - Analytical value at $t = S$:
     $$R(S, S) = \left(1 + \frac{19}{81} \cdot 1\right)^{-0.5} = \left(\frac{100}{81}\right)^{-0.5} = \sqrt{\frac{81}{100}} = \frac{9}{10} = 0.90$$

3. **`getFSRSDueCount` in `src/lib/quiz/quizEngine.ts`**:
   - Lines 541–552:
     ```typescript
     export function getFSRSDueCount(cardsMap: Record<string, { card: FSRSCard; source?: string }>): number {
       const now = new Date();
       let count = 0;
       for (const record of Object.values(cardsMap)) {
         if (record?.card) {
           if (!record.card.due || new Date(record.card.due) <= now) {
             count++;
           }
         }
       }
       return count;
     }
     ```

4. **`checkDailyRefill` in `src/lib/garden/gardenStore.ts`**:
   - Lines 219–242:
     ```typescript
     checkDailyRefill: () => {
       if (typeof window === 'undefined') return false;
       try {
         let todayStr = '';
         try {
           todayStr = new Intl.DateTimeFormat('en-CA', {
             timeZone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Jakarta',
             year: 'numeric',
             month: '2-digit',
             day: '2-digit',
           }).format(new Date());
         } catch {
           todayStr = new Date().toISOString().slice(0, 10);
         }

         const lastRefill = localStorage.getItem('nn_garden_last_refill');
         if (lastRefill !== todayStr) {
           localStorage.setItem('nn_garden_last_refill', todayStr);
           get().addWaterDrop(3);
           return true;
         }
       } catch {}
       return false;
     },
     ```

5. **Empirical Test Suite Execution Results**:
   - Custom Challenger Test Suite `tests/test-challenger-m2.js`:
     - 18/18 checks PASSED (100% green).
   - TypeScript Compilation:
     - `npx tsc --noEmit` exited with code 0 (zero compilation errors).
   - Historical Sprint Regression Suites:
     - `node tests/test-sprint-10-ergonomics.js`: 21/21 PASS
     - `node tests/test-sprint-11-motion.js`: 6/6 PASS
     - `node tests/test-sprint-12-features.js`: 9/9 PASS
     - `node tests/test-sprint-36-gamification-hardening.js`: 5/5 PASS
     - `node tests/run-sprints-1-to-44.js`: All 44/44 sprint suites PASSED with zero regressions.
   - Master Test Suite:
     - `node tests/run.js`: 75,987 assertions PASSED, 0 failures, 0 skips.
   - SSW Priority Architecture:
     - `node tests/test-ssw-priority-architecture.js`: 6/6 checks PASSED.
   - Production Bundle Performance Budget:
     - `node scripts/verify-bundle-budget.js`: All 50 generated JS chunks strictly adhere to the $\le 500\text{ kB}$ ceiling (`KebunPage-ckJNerQI.js` is 27.06 kB).

---

## 2. Logic Chain

1. **Verification of `fsrsForgettingCurve` Invocation & Mathematical Rigor**:
   - *Observation 1 & 2*: `KebunPage.tsx` imports and directly executes `fsrsForgettingCurve(elapsedDays, c.stability || 1)`. The fake linear interpolation `100 - (dueCount / totalCards) * 20` was eliminated.
   - *Mathematical Proof & Test 1.2–1.6*:
     - When $t = 0$: $R(0, S) = 1.0$ (100% immediate recall).
     - When $t = S$: $R(S, S) = 0.90$ (exact Ye et al. 2022 FSRS anchor condition).
     - As $t$ increases ($t > 0$): $\frac{\partial R}{\partial t} < 0$, ensuring strictly monotonic retention decay.
     - Higher stability $S_2 > S_1$ produces higher retrievability at equivalent elapsed days.
     - As $t \to \infty$: $R(t, S) \to 0$.
     - Invalid stability $S \le 0$ safely returns 0 without NaN or throwing.
   - *Clock Skew*: Elapsed days calculation wraps `now - last_review` with `Math.max(0, ...)` preventing negative days if client clock shifts backwards.
   - *Conclusion on Claim 1*: Verified and mathematically sound.

2. **Verification of `getFSRSDueCount` Overdue Accuracy**:
   - *Observation 1 & 3*: `KebunPage.tsx` delegates due calculation to `getFSRSDueCount(cards)` from `src/lib/quiz/quizEngine.ts`.
   - *Test 2.1–2.5*: Tested against empty card maps, new cards without `due` dates, past due cards, exact-now timestamps, future timestamps (1 second ahead, 1 day ahead, 1 month ahead), and null/undefined malformed entries.
   - The predicate `!record.card.due || new Date(record.card.due) <= now` accurately counts all and only overdue/unreviewed cards against the current timestamp.
   - *Conclusion on Claim 2*: Verified and robust against edge cases.

3. **Verification of `checkDailyRefill()` Mount Lifecycle & Idempotency**:
   - *Observation 1 & 4*: `KebunPage.tsx` invokes `checkDailyRefill()` inside `useEffect` on mount.
   - *Test 3.1–3.2*: In `gardenStore.ts`, `checkDailyRefill` checks the persistent key `nn_garden_last_refill` in `localStorage`.
   - On the first mount of the day, it awards 3 drops (`addWaterDrop(3)`) and writes today's ISO date string.
   - On subsequent remounts, route switches, or re-renders within the same calendar day, it returns `false` and does not grant excess drops.
   - On a new calendar day, it awards 3 drops again.
   - *Conclusion on Claim 3*: Verified and strictly idempotent per calendar day.

4. **Verification of Secondary Practice Drills Decoupling**:
   - *Observation 1 & Test 4.1–4.4*: Section 3 provides 6 secondary drills: Pilihan Ganda, Isian Partikel, Susun Kalimat, Choukai, Konjugasi, and Catatan Evaluasi.
   - In contrast to the primary review CTA (which invokes `startFSRSDueSession()` to set `fsrsDueReviewTrigger: true`), none of the secondary drills invoke `startFSRSDueSession` or set `fsrsDueReviewTrigger`.
   - Invariant testing proves that launching secondary drills leaves card objects, stability, difficulty, repetitions, lapses, and due dates 100% unmutated.
   - *Conclusion on Claim 4*: Secondary practice drills are strictly secondary and completely decoupled from FSRS due session scheduling.

---

## 3. Caveats

- **No Caveats**: All 4 adversarial verification requirements and cumulative regression requirements were tested empirically via automated suites and manual code verification. No discrepancies or regressions were found.

---

## 4. Conclusion

- **VERDICT: APPROVE**.
- Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) meets all functional, mathematical, pedagogical, and architectural specifications.
- Card 1 (Kebun & Water Stock) and Card 2 (FSRS Due Review) are seamlessly integrated in a single screen without internal tab fragmentation.
- FSRS retention curve math strictly adheres to Ye et al. (2022).
- Zero regression across all 44 sprint test suites and 75,987 assertions in master runner `run.js`.

---

## 5. Verification Method

To independently reproduce the empirical results:
```powershell
cd "c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo"
npx tsc --noEmit
node tests/test-challenger-m2.js
node tests/test-sprint-10-ergonomics.js
node tests/test-sprint-11-motion.js
node tests/test-sprint-12-features.js
node tests/test-sprint-36-gamification-hardening.js
node tests/test-ui-ia-overhaul-e2e.js
node tests/run.js
node tests/run-sprints-1-to-44.js
node tests/test-ssw-priority-architecture.js
node scripts/verify-bundle-budget.js
```

**Invalidation Conditions**:
- If `fsrsForgettingCurve` does not decrease monotonically for elapsed days $t > 0$.
- If `getFSRSDueCount` returns non-zero for cards scheduled strictly in the future.
- If `checkDailyRefill()` awards more than 3 water drops on repeated visits within the same calendar day.
- If clicking secondary practice drills mutates FSRS card stability or schedules an unprompted due session.
