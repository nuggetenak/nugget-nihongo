# Explorer 1 Investigation & Remediation Report — Milestone 1 (Iteration 2)

- **Target File**: `src/lib/curriculum/curriculumProgressHelper.ts`
- **Working Directory**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_m1_iter2_1`
- **Related Artifacts**:
  * `proposed_curriculumProgressHelper.ts` (Full hardened replacement file)
  * `curriculumProgressHelper.patch` (Git unified diff patch)
  * `test_hardening.js` (Standalone edge-case verification harness)
  * `test_ts_transpile.js` (TypeScript CJS transpilation verification harness)
  * `test_candidate_full_suite.js` (Production 36-track audit + 10,000 stress test)
- **Role**: Codebase Explorer (curriculumProgressHelper.ts Hardening)
- **Status**: Investigation Complete — Ready for Worker Implementation

---

## 1. Observation

Direct empirical observations from source inspection and execution of test reproductions:

### 1.1 `VULN-M1-01`: Unhandled `TypeError: u.lessons.filter is not a function` during `reduce`
- **File**: `src/lib/curriculum/curriculumProgressHelper.ts`, Lines 93–97:
  ```typescript
  93:   // Count how many lessons in THIS track are completed
  94:   const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
  95:     if (!u.lessons) return acc;
  96:     return acc + u.lessons.filter((l) => completedSet.has(l.id)).length;
  97:   }, 0);
  ```
- **Reproduction Command**:
  ```powershell
  node -e "const fs = require('fs'); const ts = require('./node_modules/typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); mod.exports.getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: 'invalid_string' }] }, {});"
  ```
- **Verbatim Error**:
  ```
  TypeError: u.lessons.filter is not a function
      at eval (eval at <anonymous>, <anonymous>:67:32)
      at Array.reduce (<anonymous>)
      at getNextUncompletedLesson (eval at <anonymous>, <anonymous>:64:62)
  ```
- **Observation Detail**: While line 78 guards the unit loop with `if (!unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0)`, line 95's `reduce` only checks `if (!u.lessons) return acc;`. If `u.lessons` is a string, non-array object, or number, truthiness evaluates to `true` and invoking `.filter()` crashes with an unhandled TypeError.

---

### 1.2 `VULN-M1-02`: Unhandled `TypeError: Cannot read properties of null (reading 'id')`
- **File**: `src/lib/curriculum/curriculumProgressHelper.ts`, Lines 82–90 and 95–97:
  ```typescript
  82:     for (const lesson of unit.lessons) {
  83:       totalLessonsInTrack++;
  84:       lastEncounteredLesson = { unit, lesson };
  85: 
  86:       if (!firstUncompleted && !completedSet.has(lesson.id)) {
  87:         firstUncompleted = { unit, lesson };
  88:       }
  89:     }
  ...
  96:     return acc + u.lessons.filter((l) => completedSet.has(l.id)).length;
  ```
- **Reproduction Command**:
  ```powershell
  node -e "const fs = require('fs'); const ts = require('./node_modules/typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); mod.exports.getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: [null] }] }, {});"
  ```
- **Verbatim Error**:
  ```
  TypeError: Cannot read properties of null (reading 'id')
      at getNextUncompletedLesson (eval at <anonymous>, <anonymous>:58:53)
  ```
- **Observation Detail**: When `unit.lessons` contains `null`, `undefined`, or non-object primitives (e.g. from schema drift or partial hydration), line 86 accesses `lesson.id` directly. Furthermore, line 83 increments `totalLessonsInTrack` and line 84 sets `lastEncounteredLesson` to a null lesson. In line 96, `u.lessons.filter((l) => completedSet.has(l.id))` also accesses `l.id` without null-checking.

---

### 1.3 Value vs. Type Imports
- **File**: `src/lib/curriculum/curriculumProgressHelper.ts`, Lines 7–8:
  ```typescript
  7: import { TrackId, TrackProgressState } from './curriculumStore';
  8: import { CurriculumTrackData, CurriculumUnit, CurriculumLesson } from '../data/dataManager';
  ```
- **Observation Detail**: `TrackId`, `TrackProgressState`, `CurriculumTrackData`, `CurriculumUnit`, and `CurriculumLesson` are purely TypeScript type/interface declarations. When transpiled in CommonJS test environments (such as Jest, Mocha, or custom dynamic runners) without full type-checking, importing types using value syntax `import { ... }` can cause compilers or bundlers with `isolatedModules` or `verbatimModuleSyntax` to emit runtime `require('./curriculumStore')` and `require('../data/dataManager')`. Using `import type { ... }` guarantees 100% type-elision and zero runtime `require` calls.

---

### 1.4 Additional Defensive Vulnerabilities Observed
- **Line 39**: `if (!trackData || !trackData.units || trackData.units.length === 0)`
  If `trackData.units` is a string (e.g. `"corrupted"`), `"corrupted".length === 9 !== 0`. It bypasses the hydration fallback, iterates characters in the `for..of` loop, and throws `TypeError: trackData.units.reduce is not a function` at line 94 because strings lack `.reduce`.
- **Line 77 & Line 94**: `for (const unit of trackData.units)` and `trackData.units.reduce((acc, u) => ...)`
  If `trackData.units` contains `null` or `undefined` (e.g. `[null]`), accessing `unit.lessons` or `u.lessons` throws `TypeError: Cannot read properties of null (reading 'lessons')`.
- **Lines 57–63**: `trackProgress` normalization:
  If `trackProgress` is not an object (e.g. number, boolean, or string), `'completedLessons' in trackProgress` throws `TypeError: Cannot use 'in' operator to search for 'completedLessons' in ...`.

---

## 2. Logic Chain

1. **Rejection Trigger**:
   - Challenger 1 executed `tests/test-m1-adversarial-challenger.js`, which subjected `getNextUncompletedLesson` to adversarial edge cases.
   - `getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: 'not_an_array' }] }, {})` threw `TypeError: u.lessons.filter is not a function` (Observation 1.1).
   - `getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: [null] }] }, {})` threw `TypeError: Cannot read properties of null (reading 'id')` (Observation 1.2).
2. **Impact on Production App**:
   - In `src/pages/HomePage.tsx:186–189`, `getNextUncompletedLesson(activeTrackId, trackData, trackProgress)` is called inside a React `useMemo`.
   - If unhandled exceptions are thrown, React crashes during rendering of `HomePage`, displaying a blank screen for the learner.
3. **Remediation Strategy Derivation**:
   - **Step A: Type Imports**: Change lines 7–8 to `import type { ... }`.
   - **Step B: Array Check on `trackData.units`**: Check `!Array.isArray(trackData.units)` at line 39 to prevent non-array strings or objects from entering the unit loop and crashing `.reduce`.
   - **Step C: Unit Object Validation**: Add `if (!unit || typeof unit !== 'object') continue;` in both the loop and `reduce`.
   - **Step D: Lesson Array & Object Validation**:
     * In the loop: check `if (!unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0) continue;`
     * For each lesson: `if (!lesson || typeof lesson !== 'object' || !lesson.id) continue;`
     * In `reduce`: check `if (!u || typeof u !== 'object' || !u.lessons || !Array.isArray(u.lessons)) return acc;`
     * In `.filter`: check `(l) => l && typeof l === 'object' && l.id && completedSet.has(l.id)`
   - **Step E: Safe Progress Normalization**: Guard `trackProgress && typeof trackProgress === 'object'` before `'in'` operations.
   - **Step F: Safe Fallback Track Identifier**: Ensure fallback `safeTrackId = trackId && typeof trackId === 'string' ? trackId : 'n5'`.
4. **Empirical Validation**:
   - Standalone test `test_hardening.js` passed all 11 adversarial test cases (non-array lessons, null elements, empty units, null/undefined progress).
   - TypeScript CJS transpilation test `test_ts_transpile.js` verified zero runtime `require` calls and zero thrown TypeErrors.
   - Full corpus test `test_candidate_full_suite.js` audited all 36 production JSON files (614 total lessons) and ran 10,000 stress iterations in 10ms with 100% green status.

---

## 3. Caveats

- **No Source Code Changes Applied**: In compliance with the Explorer archetype read-only rule, neither `src/lib/curriculum/curriculumProgressHelper.ts` nor any production file was modified. All changes are provided as actionable specifications, a diff patch, and a proposed replacement file.
- **Worker Scope Coordination**: While Challenger 1 also reported `VULN-M1-03` (`Header.tsx:getTrackDisplay`) and `VULN-M1-04` (`test-m1-navigation-tab1.js`), this Explorer investigation focused strictly on `curriculumProgressHelper.ts` (VULN-M1-01 and VULN-M1-02) as commanded by the dispatch instructions. The proposed helper fixes are completely decoupled from `Header.tsx` and can be implemented independently.

---

## 4. Conclusion & Recommended Fix Specification

### 4.1 Recommended Exact Code Changes for Worker

#### A. Type-Only Imports (Lines 7–8)
```typescript
<<<< BEFORE
import { TrackId, TrackProgressState } from './curriculumStore';
import { CurriculumTrackData, CurriculumUnit, CurriculumLesson } from '../data/dataManager';
====
import type { TrackId, TrackProgressState } from './curriculumStore';
import type { CurriculumTrackData, CurriculumUnit, CurriculumLesson } from '../data/dataManager';
>>>> AFTER
```

#### B. Fallback Guard on `trackData.units` (Lines 38–53)
```typescript
<<<< BEFORE
  // Graceful fallback when curriculum track JSON is hydrating or empty
  if (!trackData || !trackData.units || trackData.units.length === 0) {
    return {
      trackId,
      unitId: `${trackId}-u1`,
      unitNumber: 1,
      unitTitle: 'Unit 1: Fondasi Awal',
      lessonId: `${trackId}-l1`,
      lessonNumber: 1,
      title: 'Pelajaran 1',
      canDo: 'Mulai langkah awal penguasaan bahasa Jepang di jalur ini.',
      isAllCompleted: false,
      totalLessons: 1,
      completedLessonsCount: 0,
    };
  }
====
  // Graceful fallback when curriculum track JSON is hydrating or empty or not an array
  if (!trackData || !trackData.units || !Array.isArray(trackData.units) || trackData.units.length === 0) {
    const safeTrackId = trackId && typeof trackId === 'string' ? trackId : ('n5' as TrackId);
    return {
      trackId: safeTrackId,
      unitId: `${safeTrackId}-u1`,
      unitNumber: 1,
      unitTitle: 'Unit 1: Fondasi Awal',
      lessonId: `${safeTrackId}-l1`,
      lessonNumber: 1,
      title: 'Pelajaran 1',
      canDo: 'Mulai langkah awal penguasaan bahasa Jepang di jalur ini.',
      isAllCompleted: false,
      totalLessons: 1,
      completedLessonsCount: 0,
    };
  }
>>>> AFTER
```

#### C. Safe `trackProgress` Normalization (Lines 56–63)
```typescript
<<<< BEFORE
  let completedLessonsList: string[] = [];
  if (trackProgress) {
    if ('completedLessons' in trackProgress && Array.isArray((trackProgress as TrackProgressState).completedLessons)) {
      completedLessonsList = (trackProgress as TrackProgressState).completedLessons;
    } else if (typeof trackProgress === 'object' && trackId in trackProgress) {
      completedLessonsList = (trackProgress as Record<TrackId, TrackProgressState>)[trackId]?.completedLessons || [];
    }
  }
====
  let completedLessonsList: string[] = [];
  if (trackProgress && typeof trackProgress === 'object') {
    if ('completedLessons' in trackProgress && Array.isArray((trackProgress as TrackProgressState).completedLessons)) {
      completedLessonsList = (trackProgress as TrackProgressState).completedLessons;
    } else if (trackId && trackId in trackProgress) {
      const entry = (trackProgress as Record<TrackId, TrackProgressState>)[trackId];
      if (entry && typeof entry === 'object' && Array.isArray(entry.completedLessons)) {
        completedLessonsList = entry.completedLessons;
      }
    }
  }
>>>> AFTER
```

#### D. Hardened Unit & Lesson Loop (Lines 77–90)
```typescript
<<<< BEFORE
  for (const unit of trackData.units) {
    if (!unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0) {
      continue;
    }

    for (const lesson of unit.lessons) {
      totalLessonsInTrack++;
      lastEncounteredLesson = { unit, lesson };

      if (!firstUncompleted && !completedSet.has(lesson.id)) {
        firstUncompleted = { unit, lesson };
      }
    }
  }
====
  for (const unit of trackData.units) {
    if (!unit || typeof unit !== 'object' || !unit.lessons || !Array.isArray(unit.lessons) || unit.lessons.length === 0) {
      continue;
    }

    for (const lesson of unit.lessons) {
      if (!lesson || typeof lesson !== 'object' || !lesson.id) {
        continue;
      }

      totalLessonsInTrack++;
      lastEncounteredLesson = { unit, lesson };

      if (!firstUncompleted && !completedSet.has(lesson.id)) {
        firstUncompleted = { unit, lesson };
      }
    }
  }
>>>> AFTER
```

#### E. Hardened Reduce Counter (Lines 93–97)
```typescript
<<<< BEFORE
  // Count how many lessons in THIS track are completed
  const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
    if (!u.lessons) return acc;
    return acc + u.lessons.filter((l) => completedSet.has(l.id)).length;
  }, 0);
====
  // Count how many lessons in THIS track are completed
  const completedLessonsInThisTrackCount = trackData.units.reduce((acc, u) => {
    if (!u || typeof u !== 'object' || !u.lessons || !Array.isArray(u.lessons)) return acc;
    return (
      acc +
      u.lessons.filter(
        (l) => l && typeof l === 'object' && l.id && completedSet.has(l.id)
      ).length
    );
  }, 0);
>>>> AFTER
```

#### F. Safe Return Objects (Lines 102 & 120)
Replace `trackId,` with `trackId: trackId || ('n5' as TrackId),` in both return blocks so `trackId` is never undefined in the result.

### 4.2 Available Artifacts in Working Directory
Worker can directly reference:
- Replacement file: `.agents/teamwork/explorer_m1_iter2_1/proposed_curriculumProgressHelper.ts`
- Unified patch: `.agents/teamwork/explorer_m1_iter2_1/curriculumProgressHelper.patch`

---

## 5. Verification Method

To independently verify the fix:

### 5.1 Verification Commands
From the project directory `nugget-nihongo`:

1. **Verify VULN-M1-01 and VULN-M1-02 Resolution**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('./node_modules/typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const mod = { exports: {} }; (new Function('exports', 'require', 'module', transpiled))(mod.exports, require, mod); const fn = mod.exports.getNextUncompletedLesson; console.log('Non-array lessons:', fn('n5', { units: [{ id: 'u1', lessons: 'invalid' }] }, {})); console.log('Null lesson item:', fn('n5', { units: [{ id: 'u1', lessons: [null] }] }, {}));"
   ```
   *Expected Output*: Both log `null` without throwing `TypeError`.

2. **Verify Zero Runtime Require for Types in Transpiled Output**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('./node_modules/typescript'); const rawTs = fs.readFileSync('src/lib/curriculum/curriculumProgressHelper.ts', 'utf8'); const transpiled = ts.transpileModule(rawTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const hasRequire = transpiled.includes('require('); console.log('Contains runtime require:', hasRequire); if (hasRequire) process.exit(1);"
   ```
   *Expected Output*: `Contains runtime require: false` (exits 0).

3. **TypeScript Type Check**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected Output*: Zero errors (exits 0).

4. **Run Challenger Test Harness**:
   ```powershell
   node tests/test-m1-adversarial-challenger.js
   ```
   *Expected Output*: VULN-M1-01 and VULN-M1-02 are no longer detected.

### 5.2 Invalidation Conditions
- Any occurrence of `TypeError: u.lessons.filter is not a function` or `TypeError: Cannot read properties of null (reading 'id')` when calling `getNextUncompletedLesson`.
- Failure in any of the 36 production curriculum JSON tracks or regression in the 10,000-op stress test.
- Any TypeScript diagnostic error emitted during `tsc --noEmit`.
