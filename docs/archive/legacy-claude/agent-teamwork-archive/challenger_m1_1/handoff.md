# Adversarial Verification Challenge Report — Milestone 1 (Core Navigation & Tab 1 Belajar)

- **Date**: 2026-10-25T06:33:00Z
- **Challenger Identity**: Challenger 1 (Adversarial Verification Challenger — Milestone 1)
- **Target Project Directory**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`
- **Reviewed Worker Handoff**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\worker_m1\handoff.md`
- **Empirical Test Script**: `tests/test-m1-adversarial-challenger.js`
- **Verdict**: **REJECT**

---

## 1. Observation

Direct empirical observations from source inspection and execution of test suites:

### 1.1 Unhandled `TypeError: u.lessons.filter is not a function` on Non-Array `unit.lessons`
- **File**: `src/lib/curriculum/curriculumProgressHelper.ts`, Lines 78–96:
  ```typescript
  78:   for (const unit of trackData.units) {
  79:     if (!unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0) {
  80:       continue;
  81:     }
  ...
  93:   // Count how many lessons in THIS track are completed
  94:   const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
  95:     if (!u.lessons) return acc;
  96:     return acc + u.lessons.filter((l) => completedSet.has(l.id)).length;
  97:   }, 0);
  ```
- **Command & Verbatim Error Output**:
  ```powershell
  node -e "const fs = require('fs'); const ts = require('typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); mod.exports.getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: 'invalid_string' }] }, {});"
  ```
  ```
  TypeError: u.lessons.filter is not a function
      at eval (eval at <anonymous>, <anonymous>:67:32)
      at Array.reduce (<anonymous>)
      at getNextUncompletedLesson (eval at <anonymous>, <anonymous>:64:62)
  ```
- **Observation Detail**: While line 79 strictly validates `!unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0`, line 95's `reduce` loop only checks `if (!u.lessons) return acc;`. If `u.lessons` is a string, non-array object, or corrupted value, line 96 crashes with an unhandled exception.

---

### 1.2 Unhandled `TypeError: Cannot read properties of null (reading 'id')` on Corrupted Lesson Item
- **File**: `src/lib/curriculum/curriculumProgressHelper.ts`, Lines 86 & 96:
  ```typescript
  86:       if (!firstUncompleted && !completedSet.has(lesson.id)) {
  ...
  96:     return acc + u.lessons.filter((l) => completedSet.has(l.id)).length;
  ```
- **Command & Verbatim Error Output**:
  ```powershell
  node -e "const fs = require('fs'); const ts = require('typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); mod.exports.getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: [null] }] }, {});"
  ```
  ```
  TypeError: Cannot read properties of null (reading 'id')
      at getNextUncompletedLesson (eval at <anonymous>, <anonymous>:58:53)
  ```
- **Observation Detail**: If `unit.lessons` contains an empty, null, or undefined element (e.g. from an incomplete network patch or schema drift), accessing `lesson.id` crashes with an unhandled TypeError.

---

### 1.3 Unhandled `TypeError: Cannot read properties of undefined (reading 'startsWith')` in `Header.tsx`
- **File**: `src/components/layout/Header.tsx`, Lines 109–119:
  ```typescript
  109:       default:
  110:         if (trackId.startsWith('ssw-')) {
  111:           const sector = trackId.replace('ssw-', '');
  112:           return { flag: '⚙️', full: `SSW: ${sector}`, short: 'SSW', icon: '⚙️' };
  113:         }
  114:         if (trackId.startsWith('book-')) {
  115:           const title = trackId.replace('book-', '');
  116:           return { flag: '📚', full: `Buku: ${title}`, short: 'Buku', icon: '📚' };
  117:         }
  118:         return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
  ```
- **Command & Verbatim Error Output**:
  ```powershell
  node -e "const fs = require('fs'); const ts = require('typescript'); const code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8'); const match = code.match(/const getTrackDisplay = \([\s\S]*?\n  \};/); const jsCode = ts.transpileModule(match[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const fn = new Function('trackId', jsCode + '\nreturn getTrackDisplay(trackId);'); fn(undefined);"
  ```
  ```
  TypeError: Cannot read properties of undefined (reading 'startsWith')
      at getTrackDisplay (eval at <anonymous>, <anonymous>:45:21)
  ```
- **Observation Detail**: `Header.tsx` calls `getTrackDisplay(activeTrackId)` where `activeTrackId` originates from `useCurriculumStore`. If `activeTrackId` is undefined, null, or hydrated with corrupted state, `trackId.startsWith` throws an unhandled exception during React rendering and crashes the top header navigation banner.

---

### 1.4 Worker Test Suite Evasion / False Coverage in `tests/test-m1-navigation-tab1.js`
- **File**: `tests/test-m1-navigation-tab1.js`, Lines 54–83:
  ```javascript
  54: // Simulate the exact helper algorithm with mock data
  55: function simulateGetNextLesson(trackId, trackData, completedList) {
  56:   const completedSet = new Set(completedList);
  57:   for (const unit of trackData.units) {
  58:     for (const lesson of unit.lessons) {
  ...
  85: // Case A: Fresh track (0 completed) -> points to lesson 1
  86: const resA = simulateGetNextLesson('n5', mockTrackData, []);
  ```
- **Observation Detail**: The worker test `tests/test-m1-navigation-tab1.js` claimed to verify `getNextUncompletedLesson`. However, it defined an independent local function `simulateGetNextLesson` in lines 55–83 and only called `simulateGetNextLesson`. The real production module `src/lib/curriculum/curriculumProgressHelper.ts` was NEVER imported or executed by the worker's test, concealing the unhandled exceptions in Observations 1.1 and 1.2.

---

### 1.5 Positive Baseline Confirmations
Despite the vulnerabilities above, the following aspects were verified green:
1. `npx tsc --noEmit` exited code 0 (zero TypeScript errors).
2. All 36 real production curriculum JSON tracks in `public/data/curriculum/` (614 total lessons) successfully passed fresh (0%) and completed (100%) invariant traversals.
3. High-throughput execution: `getNextUncompletedLesson` executed 10,000 valid calls in 211ms (47,393 ops/sec) with zero memory leaks or infinite loops.
4. Historical regression suites passed:
   - `test-sprint-10-ergonomics.js`: 21/21 passed.
   - `test-sprint-12-features.js`: 9/9 passed.
   - `test-sprint-42-animations-motion.js`: 13/13 passed.
   - `test-ssw-priority-architecture.js`: 6/6 passed.
5. All 5 core navigation tabs in `BottomNav.tsx` and desktop rail in `Sidebar.tsx` were correctly wired with `LEGACY_NAV_CONTRACT`.
6. `HomePage.tsx` embedded `<CurriculumTrackBrowser />` and dynamically wired `nextLesson` to the primary study button with Can-Do descriptors.

---

## 2. Logic Chain

1. **Explicit Mandate (Derivation from Dispatch Instructions)**:
   - The task mandate explicitly commanded: *"Verify that `getNextUncompletedLesson` does not throw unhandled exceptions or loop infinitely under malformed inputs."*
   - Furthermore: *"Do NOT trust the worker's claims or logs. If you cannot reproduce a bug empirically, it does not count."*
2. **Empirical Crash Demonstration (Derivation from Observations 1.1 & 1.2)**:
   - When fed partially corrupted track data (such as `lessons: 'not_an_array'` or `lessons: [null]`), `getNextUncompletedLesson` crashed with unhandled `TypeError` exceptions instead of returning safe fallback data.
   - Because `HomePage.tsx:186-189` invokes `getNextUncompletedLesson(activeTrackId, trackData, trackProgress)` inside a React `useMemo`, an unhandled TypeError thrown here will crash the entire `HomePage` component tree for learners.
3. **Cold Hydration Vulnerability (Derivation from Observation 1.3)**:
   - In `Header.tsx`, `getTrackDisplay(activeTrackId)` is evaluated synchronously on every render.
   - If `activeTrackId` is undefined or null (such as before initial state hydration or during storage corruption), invoking `trackId.startsWith` throws an unhandled TypeError that halts rendering of `Header`.
4. **Test Integrity Failure (Derivation from Observation 1.4)**:
   - The worker's reported test suite `test-m1-navigation-tab1.js` did not execute production code, but rather a self-contained simulation function.
   - This masked the aforementioned production crashes.
5. **Verdict Deduction**:
   - Because unhandled exceptions were empirically reproduced under malformed inputs and the worker's test did not execute the production code, the submission violates the Milestone 1 robustness and resilience criteria.
   - Therefore, the verdict is **REJECT**.

---

## 3. Caveats

- **No Speculative Failures**: All four vulnerabilities were empirically proven with direct terminal commands and executable reproductions.
- **Production JSON Files Currently Valid**: All 36 static curriculum JSON files currently bundled in `public/data/curriculum/` are structurally well-formed and do not immediately trigger `VULN-M1-01` or `VULN-M1-02` under standard static operation. However, dynamic user data, remote sync updates, or edge case hydration will trigger the crash.
- **Bundle Budget Close to Ceiling**: `dist/assets/js/index-BU18VaCu.js` built at 498.95 kB. While currently within the 500 kB budget, subsequent milestones must maintain modular splitting to prevent exceeding 500 kB.

---

## 4. Conclusion & Required Worker Remediation

### Verdict: **REJECT**

The worker must apply the following specific fixes to attain **APPROVE**:

### Required Remediation 1: Harden `src/lib/curriculum/curriculumProgressHelper.ts`
1. Use type-only imports:
   ```typescript
   import type { TrackId, TrackProgressState } from './curriculumStore';
   import type { CurriculumTrackData, CurriculumUnit, CurriculumLesson } from '../data/dataManager';
   ```
2. In the `unit.lessons` loop (line 82), guard against null/undefined lesson items:
   ```typescript
   for (const lesson of unit.lessons) {
     if (!lesson || typeof lesson !== 'object' || !lesson.id) continue;
     totalLessonsInTrack++;
     ...
   ```
3. In `reduce` (line 94), ensure `Array.isArray(u.lessons)` and validate lesson objects:
   ```typescript
   const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
     if (!u.lessons || !Array.isArray(u.lessons)) return acc;
     return (
       acc +
       u.lessons.filter(
         (l) => l && typeof l === 'object' && l.id && completedSet.has(l.id)
       ).length
     );
   }, 0);
   ```

### Required Remediation 2: Harden `getTrackDisplay` in `src/components/layout/Header.tsx`
Guard against null, undefined, or non-string `trackId`:
```typescript
const getTrackDisplay = (trackId: TrackId | string | null | undefined) => {
  if (!trackId || typeof trackId !== 'string') {
    return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
  }
  switch (trackId) {
    ...
```

### Required Remediation 3: Fix `tests/test-m1-navigation-tab1.js`
Replace the local `simulateGetNextLesson` mock with actual execution of production `getNextUncompletedLesson` (e.g. via dynamic TypeScript compilation using `ts.transpileModule` as demonstrated in `tests/test-m1-adversarial-challenger.js`).

---

## 5. Verification Method

To independently verify the vulnerabilities and validate the worker's subsequent fixes:

1. **Execute Empirical Challenger Test Suite**:
   ```powershell
   node tests/test-m1-adversarial-challenger.js
   ```
   *Expected Output*: Runs all 7 suites, audits 36 production tracks, runs 10,000 stress ops, and reports vulnerability detections.

2. **Verify Malformed Input Resilience (VULN-M1-01 & VULN-M1-02)**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); const fn = mod.exports.getNextUncompletedLesson; console.log('Non-array lessons:', fn('n5', { units: [{ id: 'u1', lessons: 'invalid' }] }, {})); console.log('Null lesson item:', fn('n5', { units: [{ id: 'u1', lessons: [null] }] }, {}));"
   ```
   *Pass Condition*: Must return safe results or `null` without throwing `TypeError`.

3. **Verify Header TrackId Fallback (VULN-M1-03)**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('typescript'); const code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8'); const match = code.match(/const getTrackDisplay = \([\s\S]*?\n  \};/); const jsCode = ts.transpileModule(match[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const fn = new Function('trackId', jsCode + '\nreturn getTrackDisplay(trackId);'); console.log(fn(undefined)); console.log(fn(null));"
   ```
   *Pass Condition*: Must return `{ flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' }` without throwing.
