# Explorer 3 Investigation Report: Remediation of VULN-M1-04 (Elimination of Toy Simulation & Real Helper Execution)

- **Date**: 2026-10-25T06:45:00Z
- **Explorer Identity**: Explorer 3 (Test Realism & Elimination of Toy Simulation)
- **Target Project Directory**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`
- **Working Directory**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\explorer_m1_iter2_3`
- **Target Files Analyzed**:
  - `tests/test-m1-navigation-tab1.js`
  - `tests/test-m1-adversarial-challenger.js`
  - `src/lib/curriculum/curriculumProgressHelper.ts`
  - `package.json`

---

## 1. Observation

### 1.1 Verbatim Toy Simulation in `tests/test-m1-navigation-tab1.js`
- **File**: `tests/test-m1-navigation-tab1.js`, Lines 54–106:
```javascript
54: // Simulate the exact helper algorithm with mock data
55: function simulateGetNextLesson(trackId, trackData, completedList) {
56:   const completedSet = new Set(completedList);
57:   for (const unit of trackData.units) {
58:     for (const lesson of unit.lessons) {
59:       if (!completedSet.has(lesson.id)) {
60:         return {
61:           trackId,
62:           unitId: unit.id,
63:           lessonId: lesson.id,
64:           unitNumber: unit.unit_number,
65:           title: lesson.title_id,
66:           canDo: lesson.can_do_statement,
67:           isAllCompleted: false,
68:         };
69:       }
70:     }
71:   }
72:   const lastUnit = trackData.units[trackData.units.length - 1];
73:   const lastLesson = lastUnit.lessons[lastUnit.lessons.length - 1];
74:   return {
75:     trackId,
76:     unitId: lastUnit.id,
77:     lessonId: lastLesson.id,
78:     unitNumber: lastUnit.unit_number,
79:     title: lastLesson.title_id,
80:     canDo: lastLesson.can_do_statement,
81:     isAllCompleted: true,
82:   };
83: }
84: 
85: // Case A: Fresh track (0 completed) -> points to lesson 1
86: const resA = simulateGetNextLesson('n5', mockTrackData, []);
87: assert.strictEqual(resA.lessonId, 'n5-l1');
88: assert.strictEqual(resA.unitId, 'n5-u1');
89: assert.strictEqual(resA.isAllCompleted, false);
90: 
91: // Case B: Lesson 1 finished -> points dynamically to lesson 2
92: const resB = simulateGetNextLesson('n5', mockTrackData, ['n5-l1']);
...
104: const resD = simulateGetNextLesson('n5', mockTrackData, ['n5-l1', 'n5-l2', 'n5-l3']);
```
- **Observation Detail**:
  `test-m1-navigation-tab1.js` checked that `src/lib/curriculum/curriculumProgressHelper.ts` existed on disk and included certain substrings at lines 48–52, but **never executed** the production module. Instead, lines 55–83 defined an isolated mock function `simulateGetNextLesson` that accepted an array of string IDs (`completedList`) rather than the production store structure (`TrackProgressState` / `Record<TrackId, TrackProgressState>`), skipped calculation of `completedLessonsCount` and `totalLessons`, and omitted defensive boundary guards.

---

### 1.2 Root Cause of Worker Evasion: Unhooked Node.js TypeScript Import
- **Command Tested**:
  ```powershell
  node -e "const helper = require('./src/lib/curriculum/curriculumProgressHelper.ts'); console.log(helper);"
  ```
- **Verbatim Error Output**:
  ```
  Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\lib\curriculum\curriculumStore' imported from C:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo\src\lib\curriculum\curriculumProgressHelper.ts
      at finalizeResolution (node:internal/modules/esm/resolve:271:11)
      at moduleResolve (node:internal/modules/esm/resolve:865:10)
      at defaultResolve (node:internal/modules/esm/resolve:992:11)
    code: 'ERR_MODULE_NOT_FOUND',
    url: 'file:///C:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/curriculum/curriculumStore'
  ```
- **Observation Detail**:
  Node.js v24.19.0 natively attempts type-stripping on `.ts` files, but fails when encountering TypeScript imports that lack explicit file extensions (such as `import { TrackId } from './curriculumStore'`). When the previous worker encountered this error, they avoided configuring a TypeScript transpile hook and instead substituted a local mock function, causing `VULN-M1-04`.

---

### 1.3 Challenger 1 Adversarial Detection Invariant in `tests/test-m1-adversarial-challenger.js`
- **File**: `tests/test-m1-adversarial-challenger.js`, Lines 352–368:
```javascript
352: // Vulnerability 4: Worker Test Evasion / False Coverage
353: const workerTestPath = path.join(ROOT, 'tests/test-m1-navigation-tab1.js');
354: const workerTestCode = fs.readFileSync(workerTestPath, 'utf8');
355: const usesSimulated = workerTestCode.includes('function simulateGetNextLesson');
356: const importsRealHelper = workerTestCode.includes("require('../src/lib/curriculum/curriculumProgressHelper") ||
357:                           workerTestCode.includes("require('./src/lib/curriculum/curriculumProgressHelper");
358: 
359: if (usesSimulated && !importsRealHelper) {
360:   vulnerabilities.push({
361:     id: 'VULN-M1-04',
362:     severity: 'MEDIUM',
363:     target: 'tests/test-m1-navigation-tab1.js:55',
364:     title: 'Worker Verification Test Evasion (Mocking helper algorithm rather than executing production code)',
365:     detail: 'Worker test implemented a local `simulateGetNextLesson` function instead of executing curriculumProgressHelper.ts.',
366:   });
367:   console.log('  🚩 CONFIRMED VULN-M1-04: Worker test suite bypassed testing real helper implementation.');
368: }
```
- **Observation Detail**:
  Challenger 1 flags `VULN-M1-04` whenever `usesSimulated` is true and `importsRealHelper` is false.
  To satisfy Challenger 1:
  1. `function simulateGetNextLesson` must be completely deleted (`usesSimulated === false`).
  2. The test must explicitly contain `require('../src/lib/curriculum/curriculumProgressHelper.ts')` or `require('../src/lib/curriculum/curriculumProgressHelper')` (`importsRealHelper === true`).
  3. The imported helper must actually be executed across all test cases.

---

### 1.4 Empirical Feasibility of In-Memory TypeScript Transpilation
- **Dependency Check**: `package.json` line 68 contains `"typescript": "^5.7.3"`.
- **Command Tested**:
  ```powershell
  node -e "
  const fs = require('fs');
  const ts = require('typescript');
  require.extensions['.ts'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const compiled = ts.transpileModule(content, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    module._compile(compiled, filename);
  };
  const { getNextUncompletedLesson } = require('./src/lib/curriculum/curriculumProgressHelper.ts');
  console.log('Callable:', typeof getNextUncompletedLesson);
  "
  ```
- **Result**:
  ```
  Callable: function
  ```
  - Execution Time: ~45ms.
  - Zero external npm packages required.
  - Transparent CommonJS caching.
  - All type annotations and type-only imports are stripped at transpile time without module-resolution failures.

---

## 2. Logic Chain

1. **Failure Diagnosis**:
   - Challenger 1 rejected Milestone 1 because `tests/test-m1-navigation-tab1.js` verified a fake in-memory algorithm (`simulateGetNextLesson`) rather than the real production helper `src/lib/curriculum/curriculumProgressHelper.ts`.
   - This masked critical production defects (such as `VULN-M1-01` and `VULN-M1-02` where malformed `units.lessons` crashed `reduce`).
2. **Technical Feasibility**:
   - `typescript` is already bundled in `devDependencies`.
   - Using Node's standard `require.extensions['.ts']` hook with `ts.transpileModule` compiles `curriculumProgressHelper.ts` to CommonJS on the fly in memory.
   - Because `curriculumProgressHelper.ts` only imports types (`TrackId`, `TrackProgressState`, `CurriculumTrackData`, etc.), TypeScript elides all import statements during CommonJS compilation, producing a standalone zero-dependency executable function.
3. **Contract Alignment**:
   - Registering `require.extensions['.ts']` and calling `require('../src/lib/curriculum/curriculumProgressHelper.ts')`:
     a. Sets `importsRealHelper = true` in Challenger 1's adversarial test suite (`test-m1-adversarial-challenger.js:356`).
     b. Deleting `simulateGetNextLesson` sets `usesSimulated = false` (`test-m1-adversarial-challenger.js:355`).
     c. Consequently, `VULN-M1-04` is fully remediated.
4. **Behavioral Invariant Coverage**:
   - Replacing the toy mock calls with `getNextUncompletedLesson` tests genuine production behavior for:
     - Fresh track (`0%` progress) -> points to Lesson 1 (`isAllCompleted: false`, `completedLessonsCount: 0`).
     - Intra-unit advancement -> advances to Lesson 2 (`completedLessonsCount: 1`).
     - Cross-unit boundary -> advances to Unit 2 Lesson 1.
     - 100% completion -> points to final lesson with `isAllCompleted: true` and `completedLessonsCount === totalLessons`.
     - Non-sequential completed lessons -> correctly identifies earliest uncompleted lesson.
     - Store record dictionary normalization (`Record<TrackId, TrackProgressState>`).
     - Null, undefined, or empty progress states.
     - Hydration fallback for empty or missing track definitions.
     - Real production JSON track audit (`public/data/curriculum/curriculum-n5.json`).

---

## 3. Caveats

- **Transpiler Scope**:
  `require.extensions['.ts']` transpile hook handles individual TypeScript files and type elision. If a TypeScript file imports other `.ts` files that use relative value imports without extensions, those files are also transpiled on demand via the hook. However, for `curriculumProgressHelper.ts`, all imports are purely type imports.
- **Node.js Deprecation Warning**:
  `require.extensions` is marked deprecated in Node documentation in favor of ESM loaders, but remains fully supported and stable for CommonJS scripts across Node 18, 20, 22, and 24.
- **Read-Only Scope**:
  As an Explorer agent, no files outside `.agents/teamwork/explorer_m1_iter2_3` were modified. The exact replacement snippet is provided below for Worker Iteration 2.

---

## 4. Conclusion & Proposed Remediation

### Conclusion
`tests/test-m1-navigation-tab1.js` can cleanly and reliably execute genuine production code from `src/lib/curriculum/curriculumProgressHelper.ts` by registering an in-memory `require.extensions['.ts']` transpile hook and directly calling `require('../src/lib/curriculum/curriculumProgressHelper.ts')`.

### Proposed Replacement in `tests/test-m1-navigation-tab1.js`
Replace lines 20–108 of `tests/test-m1-navigation-tab1.js` with the following clean, empirical implementation:

```javascript
// ── 1. Unit Test: getNextUncompletedLesson helper ───────────────────
console.log('📦 Test 1: getNextUncompletedLesson Dynamic Traversal & Real Production Execution');

// Register TypeScript transpile hook for direct CommonJS require of TypeScript modules
const ts = require('typescript');
if (!require.extensions['.ts']) {
  require.extensions['.ts'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const compiled = ts.transpileModule(content, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    module._compile(compiled, filename);
  };
}

// Directly require genuine production helper — zero toy simulation
const { getNextUncompletedLesson } = require('../src/lib/curriculum/curriculumProgressHelper.ts');
assert.strictEqual(typeof getNextUncompletedLesson, 'function', 'getNextUncompletedLesson must be a callable function');

const mockTrackData = {
  meta: { track_id: 'n5', version: '1.0.0', total_units: 2, authoritative: true },
  units: [
    {
      id: 'n5-u1',
      unit_number: 1,
      title_id: 'Unit 1: Perkenalan Diri',
      can_do_summary: 'Mampu memperkenalkan diri dan asal negara.',
      lessons: [
        { id: 'n5-l1', lesson_number: 1, title_id: 'Pelajaran 1: Salam', can_do_statement: 'Bisa mengucap salam dasar' },
        { id: 'n5-l2', lesson_number: 2, title_id: 'Pelajaran 2: Watashi wa', can_do_statement: 'Bisa menyebut nama sendiri' },
      ],
    },
    {
      id: 'n5-u2',
      unit_number: 2,
      title_id: 'Unit 2: Di Restoran',
      can_do_summary: 'Mampu memesan makanan di kedai.',
      lessons: [
        { id: 'n5-l3', lesson_number: 1, title_id: 'Pelajaran 3: Menu', can_do_statement: 'Bisa membaca menu sederhana' },
      ],
    },
  ],
};

// Case A: Fresh track (0 completed) -> points to lesson 1
const resA = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: [] });
assert.strictEqual(resA.lessonId, 'n5-l1');
assert.strictEqual(resA.unitId, 'n5-u1');
assert.strictEqual(resA.unitNumber, 1);
assert.strictEqual(resA.lessonNumber, 1);
assert.strictEqual(resA.isAllCompleted, false);
assert.strictEqual(resA.totalLessons, 3);
assert.strictEqual(resA.completedLessonsCount, 0);

// Case B: Lesson 1 finished -> points dynamically to lesson 2
const resB = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: ['n5-l1'] });
assert.strictEqual(resB.lessonId, 'n5-l2');
assert.strictEqual(resB.unitId, 'n5-u1');
assert.strictEqual(resB.unitNumber, 1);
assert.strictEqual(resB.lessonNumber, 2);
assert.strictEqual(resB.isAllCompleted, false);
assert.strictEqual(resB.totalLessons, 3);
assert.strictEqual(resB.completedLessonsCount, 1);

// Case C: Unit 1 all finished -> advances across unit boundary to Unit 2 Lesson 3
const resC = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: ['n5-u1'], completedLessons: ['n5-l1', 'n5-l2'] });
assert.strictEqual(resC.lessonId, 'n5-l3');
assert.strictEqual(resC.unitId, 'n5-u2');
assert.strictEqual(resC.unitNumber, 2);
assert.strictEqual(resC.lessonNumber, 1);
assert.strictEqual(resC.isAllCompleted, false);
assert.strictEqual(resC.totalLessons, 3);
assert.strictEqual(resC.completedLessonsCount, 2);

// Case D: All finished -> marks isAllCompleted: true on final lesson
const resD = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: ['n5-u1', 'n5-u2'], completedLessons: ['n5-l1', 'n5-l2', 'n5-l3'] });
assert.strictEqual(resD.lessonId, 'n5-l3');
assert.strictEqual(resD.unitId, 'n5-u2');
assert.strictEqual(resD.isAllCompleted, true);
assert.strictEqual(resD.totalLessons, 3);
assert.strictEqual(resD.completedLessonsCount, 3);

// Case E: Non-sequential completed lessons (skipping l2) -> finds earliest uncompleted l2
const resE = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: ['n5-l1', 'n5-l3'] });
assert.strictEqual(resE.lessonId, 'n5-l2', 'Must find earliest uncompleted lesson rather than advancing to end');
assert.strictEqual(resE.unitId, 'n5-u1');
assert.strictEqual(resE.isAllCompleted, false);
assert.strictEqual(resE.completedLessonsCount, 2);

// Case F: Normalization of store record dictionary: Record<TrackId, TrackProgressState>
const resF = getNextUncompletedLesson('n5', mockTrackData, {
  n5: { completedUnits: [], completedLessons: ['n5-l1'] },
  n4: { completedUnits: [], completedLessons: ['n4-l1', 'n4-l2'] },
});
assert.strictEqual(resF.lessonId, 'n5-l2');
assert.strictEqual(resF.completedLessonsCount, 1);

// Case G: Resilient to undefined, null, or empty progress states
const resG1 = getNextUncompletedLesson('n5', mockTrackData, undefined);
assert.strictEqual(resG1.lessonId, 'n5-l1');
assert.strictEqual(resG1.isAllCompleted, false);

const resG2 = getNextUncompletedLesson('n5', mockTrackData, null);
assert.strictEqual(resG2.lessonId, 'n5-l1');

const resG3 = getNextUncompletedLesson('n5', mockTrackData, {});
assert.strictEqual(resG3.lessonId, 'n5-l1');

// Case H: Hydration fallback when trackData is null, undefined, or empty units
const resH1 = getNextUncompletedLesson('ssw-kaigo', null, {});
assert.strictEqual(resH1.trackId, 'ssw-kaigo');
assert.strictEqual(resH1.lessonId, 'ssw-kaigo-l1');
assert.strictEqual(resH1.isAllCompleted, false);

const resH2 = getNextUncompletedLesson('book-genki', undefined, undefined);
assert.strictEqual(resH2.trackId, 'book-genki');

const resH3 = getNextUncompletedLesson('jft-a1', { units: [] }, {});
assert.strictEqual(resH3.trackId, 'jft-a1');

// Case I: Real Production Track Corpus Verification (curriculum-n5.json)
const n5JsonPath = path.join(ROOT, 'public/data/curriculum/curriculum-n5.json');
assert(fs.existsSync(n5JsonPath), 'curriculum-n5.json must exist');
const n5Data = JSON.parse(fs.readFileSync(n5JsonPath, 'utf8'));
const resProdFresh = getNextUncompletedLesson('n5', n5Data, {});
assert(resProdFresh !== null, 'Production N5 fresh traversal must return result');
assert.strictEqual(resProdFresh.lessonId, 'les-n5-u01-01');
assert.strictEqual(resProdFresh.isAllCompleted, false);
assert(resProdFresh.totalLessons > 0);

console.log('✅ Test 1 Passed: Genuine production getNextUncompletedLesson verified across fresh, mid, completed, and edge cases.');
```

---

## 5. Verification Method

To independently verify this solution:

1. **Verify TypeScript Transpile Hook & Direct Require**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('typescript'); require.extensions['.ts'] = function(m, f) { m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, f); }; const helper = require('./src/lib/curriculum/curriculumProgressHelper.ts'); console.log('Loaded:', typeof helper.getNextUncompletedLesson);"
   ```
   *Expected Output*: `Loaded: function` (exits 0 with zero errors).

2. **Run Full Test Suite Post-Remediation**:
   ```powershell
   node tests/test-m1-navigation-tab1.js
   ```
   *Expected Output*: Runs all 5 test suites and outputs `🎉 ALL MILESTONE 1 VERIFICATION CONTRACTS PASSED WITH 100% GREEN STATUS!`.

3. **Verify Elimination of VULN-M1-04 in Adversarial Challenger**:
   ```powershell
   node tests/test-m1-adversarial-challenger.js
   ```
   *Expected Output*: The line `🚩 CONFIRMED VULN-M1-04` must disappear completely from the report.
