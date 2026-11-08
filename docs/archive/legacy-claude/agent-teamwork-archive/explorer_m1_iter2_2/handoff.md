# Explorer 2 Investigation & Remediation Report — VULN-M1-03 (`Header.tsx` TrackDisplay Hardening)

- **Date**: 2026-10-25T06:42:00Z
- **Explorer Identity**: Explorer 2 (Codebase Explorer — `Header.tsx` TrackDisplay Hardening)
- **Target Repository**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`
- **Issue Reference**: `VULN-M1-03` (Challenger 1 Adversarial Verification Failure)
- **Target File**: `src/components/layout/Header.tsx`
- **Status**: Investigation Complete — Hardening Strategy Formulated & Verified

---

## 1. Observation

### 1.1 Direct Source Code Inspection
In `src/components/layout/Header.tsx`:
- **Lines 57 & 122**: `Header` retrieves `activeTrackId` from `useCurriculumStore` and immediately passes it to `getTrackDisplay`:
  ```typescript
  57:   const { activeTrackId, setActiveTrack, trackProgress } = useCurriculumStore();
  ...
  122:   const currentTrack = getTrackDisplay(activeTrackId);
  ```
- **Lines 75–120**: `getTrackDisplay` function definition:
  ```typescript
  74:   // Track Display Information
  75:   const getTrackDisplay = (trackId: TrackId) => {
  76:     switch (trackId) {
  77:       case 'n5':
  78:         return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
  ...
  107:       case 'book-minna':
  108:         return { flag: '📙', full: 'Buku: Minna', short: 'Minna', icon: '📙' };
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
  119:     }
  120:   };
  ```

### 1.2 Verbatim Error Reproductions
When `getTrackDisplay` receives `undefined`, `null`, or a non-string value, it falls into the `default:` branch. Line 110 immediately attempts to call `.startsWith` on the unvalidated argument.

1. **Invoked with `undefined`**:
   - **Command**:
     ```powershell
     node -e "const fs = require('fs'); const ts = require('typescript'); const code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8'); const match = code.match(/const getTrackDisplay = \([\s\S]*?\n  \};/); const jsCode = ts.transpileModule(match[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const fn = new Function('trackId', jsCode + '\nreturn getTrackDisplay(trackId);'); fn(undefined);"
     ```
   - **Verbatim Error Output**:
     ```
     TypeError: Cannot read properties of undefined (reading 'startsWith')
         at getTrackDisplay (eval at <anonymous>, <anonymous>:45:21)
     ```

2. **Invoked with `null`**:
   - **Verbatim Error Output**:
     ```
     TypeError: Cannot read properties of null (reading 'startsWith')
         at getTrackDisplay (eval at <anonymous>, <anonymous>:45:21)
     ```

3. **Invoked with non-string (e.g. number `123`)**:
   - **Verbatim Error Output**:
     ```
     TypeError: trackId.startsWith is not a function
         at getTrackDisplay (eval at <anonymous>, <anonymous>:45:21)
     ```

### 1.3 Impact on Top Header Navigation Banner
In `src/components/layout/Header.tsx`, `currentTrack` properties (`flag`, `full`, `short`, `icon`) are required to render the active track switcher button:
```tsx
197:       {/* Feature F2: Top Header Active Track Switcher Button */}
198:       <button
199:         type="button"
200:         onClick={() => setIsTrackPickerOpen(true)}
201:         aria-label={`Jalur aktif: ${currentTrack.full}. Klik untuk mengganti jalur belajar.`}
...
204:         <span className="text-sm shrink-0">{currentTrack.flag}</span>
205:         <span className="hidden sm:inline font-mono truncate max-w-[170px] lg:max-w-none">
206:           {currentTrack.full}
207:         </span>
208:         <span className="sm:hidden font-mono text-[11px] font-extrabold">{currentTrack.short}</span>
209:         <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0" />
210:       </button>
```
Because this occurs during synchronous React render, any unhandled `TypeError` thrown in `getTrackDisplay` aborts the render lifecycle and causes a White Screen of Death (WSOD) for the user.

---

## 2. Logic Chain

1. **State Origin & Hydration Hazards**:
   - `activeTrackId` originates in `useCurriculumStore` (`src/lib/curriculum/curriculumStore.ts`), which initializes state from `localStorage.getItem('nn_active_curriculum_track')`.
   - In environments where localStorage is empty, corrupted, cleared mid-session, accessed during SSR/testing, or populated with an invalid string, `activeTrackId` can be `undefined`, `null`, or invalid.
2. **Missing Boundary Validation**:
   - `getTrackDisplay` assumed TypeScript type guarantees (`trackId: TrackId`) at runtime.
   - At runtime, TypeScript types do not protect against undefined/null state passed by hooks or stores.
3. **Execution Path to Crash**:
   - For any falsy value (`undefined`, `null`, `""`), none of the 16 explicit `case` statements (`n5`, `n4`, `ssw-kaigo`, etc.) match.
   - Flow unconditionally enters `default:` at line 109.
   - Line 110 executes `trackId.startsWith('ssw-')`, immediately throwing `TypeError`.
4. **Remediation Invariant Formulation**:
   - A defensive check placed immediately before the `switch` statement:
     ```typescript
     if (!trackId || typeof trackId !== 'string') {
       return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
     }
     ```
   - Guarantees:
     - Falsy values (`undefined`, `null`, `""`) return the canonical default track (`N5`).
     - Non-string types (`number`, `object`, `boolean`) return the canonical default track (`N5`).
     - Once past the guard, TypeScript and JavaScript guarantee `trackId` is a non-empty string, ensuring `trackId.startsWith('ssw-')` and `trackId.startsWith('book-')` in `default:` will never throw.
5. **Preservation of Canonical Track Mappings**:
   - All standard JLPT tracks (`n5`, `n4`, `n3`, `n2`, `n1`) match their respective `case` branches.
   - All specialized SSW tracks (`ssw-kaigo`, `ssw-food`, `ssw-construction`, `ssw-agriculture`, `ssw-accommodation`, `ssw-building-cleaning`) match their specific case statements.
   - Any dynamic/extended SSW tracks (`ssw-manufacturing`, `ssw-automobile`, `ssw-food-service`, etc.) match `trackId.startsWith('ssw-')` and format cleanly as `SSW: <sector>`.
   - All JFT tracks (`jft-a1`, `jft-a2`, `seikatsu`) match their case branches.
   - Specialized Book tracks (`book-genki`, `book-minna`) match their case branches.
   - Any dynamic Book tracks (`book-soumatome`, `book-tobira`, etc.) match `trackId.startsWith('book-')` and format cleanly as `Buku: <title>`.
   - Unrecognized strings match `default:` and fall back to `{ flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' }`.

---

## 3. Caveats

1. **Read-Only Explorer Scope**:
   - In accordance with Teamwork Explorer protocol, no source files were directly edited. The exact proposed code diff is provided below for Worker M1 Iteration 2 to apply.
2. **Modal Track Switcher State**:
   - In `Header.tsx` line 453 and 496, `const isSelected = activeTrackId === trk.id;` was already safe when `activeTrackId` is undefined (evaluates to `false`). Only `getTrackDisplay` required remediation.
3. **TypeScript Type Signature**:
   - To make `Header.tsx` cleanly compile when called with `undefined` or `null`, the function parameter type should be updated from `(trackId: TrackId)` to `(trackId?: TrackId | string | null)`.

---

## 4. Conclusion & Proposed Implementation

### 4.1 Recommended Code Replacement for `src/components/layout/Header.tsx`

**Lines 74–120 (Target Chunk)**:

```typescript
<<<< BEFORE
  // Track Display Information
  const getTrackDisplay = (trackId: TrackId) => {
    switch (trackId) {
      case 'n5':
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
      case 'n4':
        return { flag: '🇯🇵', full: 'N4: Percakapan Harian', short: 'N4', icon: '🌿' };
      case 'n3':
        return { flag: '🇯🇵', full: 'N3: Menengah', short: 'N3', icon: '🌊' };
      case 'n2':
        return { flag: '🇯🇵', full: 'N2: Pra-Lanjutan', short: 'N2', icon: '⛰️' };
      case 'n1':
        return { flag: '🇯🇵', full: 'N1: Mahir', short: 'N1', icon: '⛩️' };
      case 'ssw-kaigo':
        return { flag: '👵', full: 'SSW: Kaigo (Lansia)', short: 'Kaigo', icon: '👵' };
      case 'ssw-food':
        return { flag: '🍱', full: 'SSW: Pabrik Makanan', short: 'Food', icon: '🍱' };
      case 'ssw-construction':
        return { flag: '👷', full: 'SSW: Konstruksi K3', short: 'Kensetsu', icon: '👷' };
      case 'ssw-agriculture':
        return { flag: '🌱', full: 'SSW: Pertanian', short: 'Nogyo', icon: '🌱' };
      case 'ssw-accommodation':
        return { flag: '🏨', full: 'SSW: Perhotelan', short: 'Hotel', icon: '🏨' };
      case 'ssw-building-cleaning':
        return { flag: '🧹', full: 'SSW: Pembersihan', short: 'Cleaning', icon: '🧹' };
      case 'jft-a1':
        return { flag: '🎌', full: 'JFT: Basic A1', short: 'JFT-A1', icon: '🎌' };
      case 'jft-a2':
        return { flag: '🎌', full: 'JFT: Basic A2', short: 'JFT-A2', icon: '🎌' };
      case 'seikatsu':
        return { flag: '🏮', full: 'Hidup di Jepang', short: 'Seikatsu', icon: '🏮' };
      case 'book-genki':
        return { flag: '📘', full: 'Buku: GENKI', short: 'Genki', icon: '📘' };
      case 'book-minna':
        return { flag: '📙', full: 'Buku: Minna', short: 'Minna', icon: '📙' };
      default:
        if (trackId.startsWith('ssw-')) {
          const sector = trackId.replace('ssw-', '');
          return { flag: '⚙️', full: `SSW: ${sector}`, short: 'SSW', icon: '⚙️' };
        }
        if (trackId.startsWith('book-')) {
          const title = trackId.replace('book-', '');
          return { flag: '📚', full: `Buku: ${title}`, short: 'Buku', icon: '📚' };
        }
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
  };
==== AFTER
  // Track Display Information
  const getTrackDisplay = (trackId?: TrackId | string | null) => {
    if (!trackId || typeof trackId !== 'string') {
      return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
    switch (trackId) {
      case 'n5':
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
      case 'n4':
        return { flag: '🇯🇵', full: 'N4: Percakapan Harian', short: 'N4', icon: '🌿' };
      case 'n3':
        return { flag: '🇯🇵', full: 'N3: Menengah', short: 'N3', icon: '🌊' };
      case 'n2':
        return { flag: '🇯🇵', full: 'N2: Pra-Lanjutan', short: 'N2', icon: '⛰️' };
      case 'n1':
        return { flag: '🇯🇵', full: 'N1: Mahir', short: 'N1', icon: '⛩️' };
      case 'ssw-kaigo':
        return { flag: '👵', full: 'SSW: Kaigo (Lansia)', short: 'Kaigo', icon: '👵' };
      case 'ssw-food':
        return { flag: '🍱', full: 'SSW: Pabrik Makanan', short: 'Food', icon: '🍱' };
      case 'ssw-construction':
        return { flag: '👷', full: 'SSW: Konstruksi K3', short: 'Kensetsu', icon: '👷' };
      case 'ssw-agriculture':
        return { flag: '🌱', full: 'SSW: Pertanian', short: 'Nogyo', icon: '🌱' };
      case 'ssw-accommodation':
        return { flag: '🏨', full: 'SSW: Perhotelan', short: 'Hotel', icon: '🏨' };
      case 'ssw-building-cleaning':
        return { flag: '🧹', full: 'SSW: Pembersihan', short: 'Cleaning', icon: '🧹' };
      case 'jft-a1':
        return { flag: '🎌', full: 'JFT: Basic A1', short: 'JFT-A1', icon: '🎌' };
      case 'jft-a2':
        return { flag: '🎌', full: 'JFT: Basic A2', short: 'JFT-A2', icon: '🎌' };
      case 'seikatsu':
        return { flag: '🏮', full: 'Hidup di Jepang', short: 'Seikatsu', icon: '🏮' };
      case 'book-genki':
        return { flag: '📘', full: 'Buku: GENKI', short: 'Genki', icon: '📘' };
      case 'book-minna':
        return { flag: '📙', full: 'Buku: Minna', short: 'Minna', icon: '📙' };
      default:
        if (trackId.startsWith('ssw-')) {
          const sector = trackId.replace('ssw-', '');
          return { flag: '⚙️', full: `SSW: ${sector}`, short: 'SSW', icon: '⚙️' };
        }
        if (trackId.startsWith('book-')) {
          const title = trackId.replace('book-', '');
          return { flag: '📚', full: `Buku: ${title}`, short: 'Buku', icon: '📚' };
        }
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
  };
>>>>
```

### 4.2 Empirical Test Results on Proposed Implementation
Tested across 24 test cases in `.agents/teamwork/explorer_m1_iter2_2/test-vuln3.js`:
| Input Case | Resulting Output | Status |
| :--- | :--- | :--- |
| `undefined` | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `null` | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `""` (empty string) | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `0` (number) | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `{}` (object) | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `'n5'` | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |
| `'n4'` | `[🇯🇵] N4: Percakapan Harian (N4)` | **PASS** |
| `'n3'` | `[🇯🇵] N3: Menengah (N3)` | **PASS** |
| `'n2'` | `[🇯🇵] N2: Pra-Lanjutan (N2)` | **PASS** |
| `'n1'` | `[🇯🇵] N1: Mahir (N1)` | **PASS** |
| `'ssw-kaigo'` | `[👵] SSW: Kaigo (Lansia) (Kaigo)` | **PASS** |
| `'ssw-food'` | `[🍱] SSW: Pabrik Makanan (Food)` | **PASS** |
| `'ssw-construction'` | `[👷] SSW: Konstruksi K3 (Kensetsu)` | **PASS** |
| `'ssw-agriculture'` | `[🌱] SSW: Pertanian (Nogyo)` | **PASS** |
| `'ssw-accommodation'`| `[🏨] SSW: Perhotelan (Hotel)` | **PASS** |
| `'ssw-building-cleaning'` | `[🧹] SSW: Pembersihan (Cleaning)` | **PASS** |
| `'ssw-manufacturing'` | `[⚙️] SSW: manufacturing (SSW)` | **PASS** |
| `'jft-a1'` | `[🎌] JFT: Basic A1 (JFT-A1)` | **PASS** |
| `'jft-a2'` | `[🎌] JFT: Basic A2 (JFT-A2)` | **PASS** |
| `'seikatsu'` | `[🏮] Hidup di Jepang (Seikatsu)` | **PASS** |
| `'book-genki'` | `[📘] Buku: GENKI (Genki)` | **PASS** |
| `'book-minna'` | `[📙] Buku: Minna (Minna)` | **PASS** |
| `'book-soumatome'` | `[📚] Buku: soumatome (Buku)` | **PASS** |
| `'arbitrary-corrupted'` | `[🇯🇵] N5: Fondasi Dasar (N5)` | **PASS** |

---

## 5. Verification Method

Once Worker M1 applies the change:

1. **Verify `Header.tsx` getTrackDisplay with Undefined and Null**:
   ```powershell
   node -e "const fs = require('fs'); const ts = require('typescript'); const code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8'); const match = code.match(/const getTrackDisplay = \([\s\S]*?\n  \};/); const jsCode = ts.transpileModule(match[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText; const fn = new Function('trackId', jsCode + '\nreturn getTrackDisplay(trackId);'); console.log('undefined:', fn(undefined)); console.log('null:', fn(null));"
   ```
   *Expected Output*:
   ```
   undefined: { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' }
   null: { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' }
   ```
   *Pass Condition*: Zero `TypeError` thrown.

2. **Run the Empirical Challenger Test Harness**:
   ```powershell
   node tests/test-m1-adversarial-challenger.js
   ```
   *Expected Output*: `VULN-M1-03` will no longer be detected.

3. **Verify Zero TypeScript Compiler Errors**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected Output*: Exit code 0 with zero diagnostic errors.
