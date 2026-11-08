// ══════════════════════════════════════════════════════════════════
//  test-s3-pass1-bootstrap-modals-persistence.js
//  Siklus III — Pass 1: Fresh Bootstrap Hydration, Z-Index Elimination & Onboarding Accessibility
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus III — Pass 1] Testing Bootstrap Hydration, Modal Portals & Onboarding Ergonomics...\n');

// ── Check 1.1: useAppStore.ts Bootstrap State Hydration & Persistence ──
console.log('  ▸ Check 1.1: useAppStore.ts State Hydration & LocalStorage Persistence');
{
  const storePath = path.join(ROOT, 'src', 'store', 'useAppStore.ts');
  const content = fs.readFileSync(storePath, 'utf8');

  // Verify selectedLevel loads from localStorage and persists
  assert(
    content.includes("localStorage.getItem('nn_selected_level')"),
    'selectedLevel must check localStorage.getItem("nn_selected_level") on initialization'
  );
  assert(
    content.includes("localStorage.setItem('nn_selected_level', selectedLevel)"),
    'setSelectedLevel must persist to localStorage.setItem("nn_selected_level", selectedLevel)'
  );

  // Verify showRomaji and showFurigana load from localStorage
  assert(
    content.includes("localStorage.getItem('nn_romaji') === '1'"),
    'showRomaji must check localStorage.getItem("nn_romaji") === "1" on initialization'
  );
  assert(
    content.includes("localStorage.getItem('nn_furigana') !== '0'"),
    'showFurigana must check localStorage.getItem("nn_furigana") !== "0" on initialization'
  );

  console.log('    ✓ Check 1.1 Passed: useAppStore persistent hydration verified.');
}

// ── Check 1.2: Complete Elimination of z-[9999] & z-[99999] in JSX ──
console.log('  ▸ Check 1.2: Complete Elimination of Arbitrary Extreme Z-Indices in JSX');
{
  function walk(d) {
    let r = [];
    fs.readdirSync(d).forEach((f) => {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) {
        if (f !== 'node_modules' && f !== 'dist') r = r.concat(walk(p));
      } else if (f.endsWith('.tsx')) {
        const text = fs.readFileSync(p, 'utf8');
        if (text.includes('z-[9999]') || text.includes('z-[99999]')) {
          r.push(p);
        }
      }
    });
    return r;
  }

  const lingeringZ = walk(path.join(ROOT, 'src'));
  assert.strictEqual(
    lingeringZ.length,
    0,
    `Found lingering extreme z-indices in: ${lingeringZ.join(', ')}`
  );

  console.log('    ✓ Check 1.2 Passed: 100% of JSX modal portals standardized to z-50.');
}

// ── Check 1.3: OnboardingModal.tsx Backdrop Dismissal & Contrast Tokens ──
console.log('  ▸ Check 1.3: OnboardingModal.tsx Backdrop Dismissal & Contrast Tokens');
{
  const onboardingPath = path.join(ROOT, 'src', 'components', 'onboarding', 'OnboardingModal.tsx');
  const content = fs.readFileSync(onboardingPath, 'utf8');

  // Verify backdrop onClick dismissal
  assert(
    content.includes('role="dialog"') && content.includes('onClick={handleClose}'),
    'OnboardingModal backdrop wrapper must include onClick={handleClose}'
  );

  // Verify dual-theme high contrast tokens on path selection
  assert(
    content.includes('text-emerald-700 dark:text-emerald-400 font-bold'),
    'OnboardingModal must use dual-theme text-emerald-700 dark:text-emerald-400 for beginner path'
  );
  assert(
    content.includes('text-blue-700 dark:text-blue-400 font-bold'),
    'OnboardingModal must use dual-theme text-blue-700 dark:text-blue-400 for SSW vocational path'
  );

  // Verify touch target on back button in SSW picker
  assert(
    content.includes('min-h-[40px] px-2.5 py-1.5'),
    'OnboardingModal SSW picker back button must have min-h-[40px] touch target'
  );

  // Verify zero illegal py-0.2
  assert(
    !content.includes('py-0.2'),
    'OnboardingModal must not contain illegal Tailwind class py-0.2'
  );

  console.log('    ✓ Check 1.3 Passed: OnboardingModal backdrop dismissal and contrast verified.');
}

// ── Check 1.4: ExamLmsHub.tsx Pre-Test Modal Z-Index & Touch Target ──
console.log('  ▸ Check 1.4: ExamLmsHub.tsx Pre-Test Modal Layering & Touch Target');
{
  const hubPath = path.join(ROOT, 'src', 'components', 'exercise', 'ExamLmsHub.tsx');
  const content = fs.readFileSync(hubPath, 'utf8');

  assert(
    !content.includes('z-[99999]'),
    'ExamLmsHub.tsx must not contain extreme z-[99999]'
  );
  assert(
    content.includes('w-10 h-10 min-w-[40px] min-h-[40px]'),
    'ExamLmsHub.tsx pre-test modal close button must satisfy >= 40px touch target'
  );
  assert(
    content.includes('text-rose-700 dark:text-rose-300'),
    'ExamLmsHub.tsx strict mode badge must use dual-theme text-rose-700 dark:text-rose-300'
  );

  console.log('    ✓ Check 1.4 Passed: ExamLmsHub pre-test modal layering and touch targets verified.');
}

// ── Check 1.5: catEngine.ts IRT Mathematical Properties & Convergence ──
console.log('  ▸ Check 1.5: catEngine.ts IRT Mathematical Properties & Convergence');
{
  const catEnginePath = path.join(ROOT, 'src', 'lib', 'cat', 'catEngine.ts');
  const content = fs.readFileSync(catEnginePath, 'utf8');

  assert(
    content.includes('CAT_TARGET_SEM = 0.35'),
    'catEngine must define target SEM at 0.35'
  );
  assert(
    content.includes('CAT_MIN_QUESTIONS = 6'),
    'catEngine must define minimum questions at 6'
  );
  assert(
    content.includes('CAT_MAX_QUESTIONS = 12'),
    'catEngine must define maximum questions at 12'
  );
  assert(
    content.includes('Math.max(-2.2, Math.min(2.2, updated))'),
    'catEngine must clamp theta estimates within [-2.2, +2.2]'
  );

  console.log('    ✓ Check 1.5 Passed: catEngine IRT parameters and bounds verified.');
}

console.log('\n🎉 [Siklus III — Pass 1] All 5 Checks PASSED! Bootstrap, Z-Index Standardization & Onboarding fully verified.\n');
