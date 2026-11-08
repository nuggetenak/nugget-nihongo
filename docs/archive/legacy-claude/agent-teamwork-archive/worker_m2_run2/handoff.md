# Handoff Report: Milestone 2 — Dual-Card Review & Garden Retention Hub (Tab 2)

**Agent Identity:** Worker M2 (Implementation Worker)  
**Parent Conversation ID:** `9110eabb-ae6d-43ee-8e3e-c0e815b0201d`  
**Target File Exclusively Owned:** `src/pages/KebunPage.tsx`  
**Date:** 2026-10-25T08:37:00Z  

---

## 1. Observation

1. **Previous Fragmented Architecture in Tab 2 (`src/pages/KebunPage.tsx`)**:
   - Lines 36, 165–192, 197, 376 of previous `KebunPage.tsx` implemented an internal tab switcher: `const [activeTab, setVaultTab] = useState<'vault' | 'garden'>('vault');`.
   - When `activeTab === 'vault'`, the Kanji Garden and water drops were completely hidden from view.
   - When `activeTab === 'garden'`, the FSRS retention curve, due review metrics, and review CTA were completely hidden from view.
   - Users who completed reviews in `QuizPage.tsx` earned water drops via `useGardenStore.getState().addWaterDrop(earnedDrops)` (`QuizPage.tsx` lines 521–528) but could not water plants without manual tab switching back and forth.

2. **Mandatory Test Contracts Verified Directly**:
   - `tests/test-sprint-10-ergonomics.js` line 243–247:
     ```javascript
     runTest('KebunPage presents welcoming start action when 0 cards exist', () => {
       assert(kebunContent.includes('fsrsStats.totalCards === 0'), 'Must check for zero total cards');
       assert(kebunContent.includes('Mulai Pelajaran Pertama di Materi Hub'), 'Must offer welcoming start action');
       assert(kebunContent.includes('Latihan Bebas (Semua Kartu Segar)'), 'Must offer free practice when no cards due');
     });
     ```
   - `tests/test-sprint-11-motion.js` line 132–136:
     ```javascript
     assert(kebunContent.includes("import { SkeletonGrid } from '../components/ui/SkeletonCard';"), 'KebunPage must import SkeletonGrid');
     assert(kebunContent.includes('<SkeletonGrid count={8} type="plant" />'), 'KebunPage must render SkeletonGrid when plants are empty/loading');
     ```
   - `tests/test-sprint-12-features.js` line 142–145:
     ```javascript
     assert(kebunContent.includes('startFSRSDueSession'), 'KebunPage must wire startFSRSDueSession to CTA');
     ```
   - `tests/test-sprint-36-gamification-hardening.js` line 187–190:
     ```javascript
     assert(kebunCode.includes('fsrsForgettingCurve'), 'KebunPage must calculate retention via fsrsForgettingCurve');
     assert(!kebunCode.includes('100 - (dueCount / totalCards) * 20'), 'Must remove fake clamped retrievability formula');
     assert(kebunCode.includes('checkDailyRefill()'), 'KebunPage must call checkDailyRefill on mount');
     ```
   - `tests/test-ui-ia-overhaul-e2e.js` line 419–429, 480–510:
     - T1.5.1: `getFSRSDueCount` in `src/lib/quiz/quizEngine.ts` calculates due count.
     - T1.5.4: `KebunPage` combines `useGardenStore` and `useAppStore`, displaying `waterDrops`, `plants`, `cards`.
     - T1.6.4: 1-Tap water button enables immediately upon receiving drops.
     - T1.7.1–T1.7.5: Practice drills shelf renders optional practice categories below primary review card without mutating FSRS stability or plant growth.

3. **Tool Execution Results**:
   - `npx tsc --noEmit` exited with code 0 (zero TypeScript errors).
   - `node tests/test-sprint-11-motion.js; node tests/test-sprint-12-features.js; node tests/test-sprint-36-gamification-hardening.js; node tests/test-ui-ia-overhaul-e2e.js; node tests/run.js`:
     - Sprint 11 Motion: 6/6 PASS
     - Sprint 12 Features: 10/10 PASS
     - Sprint 36 Gamification: 5/5 PASS
     - E2E UI/IA Overhaul: 91/91 PASS (100% green across all tiers)
     - Master Test Runner `run.js`: 75,987 assertions PASS, 0 FAIL, 0 SKIP
   - `node tests/run-sprints-1-to-44.js`: All 44/44 sprint suites PASSED with zero regressions.
   - `scripts/verify-bundle-budget.js`: `KebunPage-ckJNerQI.js` is 27.06 kB (well within 500 kB budget).

---

## 2. Logic Chain

1. **Problem Analysis**:
   - Based on Observation 1, the fragmented tab toggle in `KebunPage.tsx` created visual and operational friction for Indonesian learners. Learners either saw the garden or the memory vault, but could not experience the gamified incentive loop: "complete due review -> earn drops -> immediately water growing kanji plants".
   - The user dispatch requested a single, unified vertical layout consolidating:
     - Top Card: Kebun Kata & 1-Tap Water Stock (F5, F7)
     - Middle Card: FSRS Spaced Repetition Due Review Trigger (F6)
     - Bottom Section: Secondary Practice Drills Shelf (F8)

2. **Card 1 (Top Card) Refactoring**:
   - Unified the garden status into the top card:
     - Displayed blooming progress badge: `🌸 {bloomingCount} dari {plants.length} Kanji Telah Mekar`
     - Displayed collected water drops: `💧 {waterDrops} Tetes Air Tersedia`
     - Provided instant 1-tap "Siram Semua Tanaman" button invoking `waterAll()`.
     - Provided plant shelf with filter pills (`all`, `n5`, `n4`, `n3`, `n2`) and `<SkeletonGrid count={8} type="plant" />` fallback.
     - Rendered plant items with pronunciation audio (`speakJapanese`), water progress bar, and 1-tap individual watering triggers invoking `waterPlant(plant.id)`.

3. **Card 2 (Middle Card) Refactoring**:
   - Integrated FSRS v4 memory review card directly underneath Card 1:
     - Imported `getFSRSDueCount` from `src/lib/quiz/quizEngine.ts` and called `getFSRSDueCount(cards)` to calculate overdue cards.
     - Calculated estimated retrievability via `fsrsForgettingCurve` from `src/lib/fsrs/math.ts` (with 90% default when cards empty).
     - Displayed 4 core retention metrics: Kartu Terdaftar, Jatuh Tempo Hari Ini, Rata-rata Stabilitas, and Indeks Kesulitan (D).
     - Wired primary CTA to `startFSRSDueSession()`:
       - When `fsrsStats.dueCount > 0`: `"Mulai Ulas {fsrsStats.dueCount} Kartu Due →"`
       - When `fsrsStats.dueCount === 0`: `"Semua Kartu Segar! Ulas Bebas · Latihan Bebas (Semua Kartu Segar)"`
       - When `fsrsStats.totalCards === 0`: `"Mulai Pelajaran Pertama di Materi Hub"` invoking `setActiveTab('materi')`.

4. **Section 3 (Bottom Section) Refactoring**:
   - Rendered secondary practice drills shelf below Card 2:
     - 1. Quick Quiz / Pilihan Ganda (四択クイズ) -> `setActiveTab('quiz')`
     - 2. Isian Partikel & Pola (助詞穴埋め) -> `setActiveTab('quiz')`
     - 3. Susun Kalimat (語順並べ替え) -> `setActiveTab('quiz')`
     - 4. Latihan Mendengar (リスニング特訓) -> `setActiveTab('choukai')`
     - 5. Latihan Konjugasi (動詞活用) -> `openConjugation()`
     - 6. Catatan Evaluasi / Mistake Notebook -> `openCatPlacement()`
   - All interactive touch targets are strictly $\ge 40\times 40\text{px}$ with `active:scale-95` tactile feedback.
   - Container maintains `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12` and `overflow-x-hidden min-w-0`.

---

## 3. Caveats

- **No Caveats**: All modifications were strictly confined to `src/pages/KebunPage.tsx`. No shared stores or schemas were modified, ensuring 100% backward compatibility across all existing components and historical suites.

---

## 4. Conclusion

- Milestone 2 (Tab 2: Dual-Card Review & Garden Retention Hub) is 100% complete and fully verified.
- The dual-card architecture unifies garden growth, 1-tap watering, FSRS v4 scientific retrievability, and 6 secondary practice drills into a single, cohesive retention hub without modal stacking or tab fragmentation.
- All cumulative sprint regression tests (1 through 44), master test runner (`run.js`), E2E overhaul suites, and TypeScript compilation pass with 100% green status.

---

## 5. Verification Method

Run the following commands in `nugget-nihongo`:
```powershell
npx tsc --noEmit
node tests/test-sprint-11-motion.js
node tests/test-sprint-12-features.js
node tests/test-sprint-36-gamification-hardening.js
node tests/test-ui-ia-overhaul-e2e.js
node tests/run-sprints-1-to-44.js
node tests/run.js
npm run build:vite; node scripts/verify-bundle-budget.js
```

**Invalidation Conditions**:
- If `KebunPage.tsx` fails to render `<SkeletonGrid count={8} type="plant" />` during empty plant state.
- If `startFSRSDueSession` is not called by the review CTA button.
- If `fsrsForgettingCurve` or `checkDailyRefill()` are removed.
- If any chunk in `scripts/verify-bundle-budget.js` exceeds 500 kB.
