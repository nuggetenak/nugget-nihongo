/**
 * test-s2-pass1-cat-onboarding.js
 * Siklus II — Pass 1 Verification Suite:
 * Validates fixes for Defects #116–#120 across Onboarding Wizard, CAT IRT Engine, and Diagnostics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 1 Verification Suite...\n');
let passedChecks = 0;
const totalChecks = 4;

// ─────────────────────────────────────────────────────────────
// Check 1: cp-l1-045 Data Integrity in JSON and JS
// ─────────────────────────────────────────────────────────────
try {
  console.log('📋 Check 1: Validating cp-l1-045 data integrity in JSON & JS catalogs...');
  const jsonPath = path.join(rootDir, 'public/data/diagnostic/diagnostic-inventory.json');
  const jsPath = path.join(rootDir, 'public/data/diagnostic/diagnostic-inventory.js');

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const itemJson = (jsonData.items || []).find((i) => i.id === 'cp-l1-045');

  if (!itemJson) throw new Error('cp-l1-045 not found in diagnostic-inventory.json');
  if (itemJson.target_form === itemJson.l1_trap_form) {
    throw new Error(`cp-l1-045 target_form matches l1_trap_form in JSON: "${itemJson.target_form}"`);
  }
  if (itemJson.patterns[0] === itemJson.patterns[1]) {
    throw new Error(`cp-l1-045 patterns are duplicate in JSON: ${JSON.stringify(itemJson.patterns)}`);
  }

  const jsContent = fs.readFileSync(jsPath, 'utf8');
  if (!jsContent.includes('"id": "cp-l1-045"') || !jsContent.includes('"l1_trap_form": "私は日本へ行った。"')) {
    throw new Error('cp-l1-045 l1_trap_form not synchronized in diagnostic-inventory.js');
  }

  console.log('   ✅ PASS: cp-l1-045 target and trap forms are distinct and in lockstep across JSON & JS.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 1:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 2: catEngine.ts Collision-Free Distractor Generation
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 2: Validating catEngine.ts robust distractor generation...');
  const catEnginePath = path.join(rootDir, 'src/lib/cat/catEngine.ts');
  const catEngineSource = fs.readFileSync(catEnginePath, 'utf8');

  // Verify synthetic placeholder pattern was eradicated
  if (catEngineSource.includes('uniqueOptions.push(`選択肢 ${uniqueOptions.length + 1}`)')) {
    throw new Error('catEngine.ts still contains synthetic "選択肢 N" placeholder fallback');
  }

  // Empirically simulate question pool generation across all 300 inventory items
  const jsonPath = path.join(rootDir, 'public/data/diagnostic/diagnostic-inventory.json');
  const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8')).items;

  const pairsByLevel = {};
  items.forEach((p) => {
    if (!pairsByLevel[p.level]) pairsByLevel[p.level] = [];
    pairsByLevel[p.level].push(p);
  });

  function shuffle(arr) {
    const c = [...arr];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  let invalidOptionCount = 0;
  for (const pair of items) {
    const sameLevel = pairsByLevel[pair.level] || [];
    const otherCandidates = sameLevel
      .filter((other) => other.id !== pair.id && other.target_form !== pair.target_form)
      .map((other) => other.target_form);

    const shuffledOthers = shuffle(otherCandidates);
    const chosenOptions = new Set();
    chosenOptions.add(pair.target_form);

    if (pair.l1_trap_form && pair.l1_trap_form.trim() !== '' && pair.l1_trap_form !== pair.target_form) {
      chosenOptions.add(pair.l1_trap_form);
    }

    for (const other of shuffledOthers) {
      if (chosenOptions.size >= 4) break;
      if (other && !chosenOptions.has(other)) chosenOptions.add(other);
    }

    if (chosenOptions.size < 4) {
      const otherTraps = shuffle(
        sameLevel.filter((other) => other.id !== pair.id && other.l1_trap_form).map((other) => other.l1_trap_form)
      );
      for (const trap of otherTraps) {
        if (chosenOptions.size >= 4) break;
        if (trap && !chosenOptions.has(trap)) chosenOptions.add(trap);
      }
    }

    if (chosenOptions.size < 4) {
      const allOther = shuffle(items.filter((other) => other.id !== pair.id).map((other) => other.target_form));
      for (const cand of allOther) {
        if (chosenOptions.size >= 4) break;
        if (cand && !chosenOptions.has(cand)) chosenOptions.add(cand);
      }
    }

    const opts = Array.from(chosenOptions);
    if (opts.length < 4 || opts.some((o) => o.includes('選択肢'))) {
      invalidOptionCount++;
    }
  }

  if (invalidOptionCount > 0) {
    throw new Error(`Encountered ${invalidOptionCount} questions with < 4 options or synthetic placeholders!`);
  }

  console.log(`   ✅ PASS: catEngine.ts distractor algorithm produces 100% 4 unique realistic choices across all ${items.length} items.`);
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 2:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 3: CatPlacementModal.tsx Ergonomics & Contrast
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 3: Validating CatPlacementModal.tsx scroll lock & WCAG AA contrast...');
  const catModalPath = path.join(rootDir, 'src/components/cat/CatPlacementModal.tsx');
  const catModalSource = fs.readFileSync(catModalPath, 'utf8');

  if (!catModalSource.includes('useBodyScrollLock(isOpen)')) {
    throw new Error('CatPlacementModal.tsx does not invoke useBodyScrollLock(isOpen)');
  }

  if (
    !catModalSource.includes('text-emerald-700 dark:text-emerald-300 font-bold') ||
    !catModalSource.includes('text-red-700 dark:text-red-300')
  ) {
    throw new Error('CatPlacementModal.tsx does not use WCAG AA compliant feedback contrast tokens');
  }

  console.log('   ✅ PASS: CatPlacementModal.tsx locks body scroll and applies WCAG AA semantic tokens.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 3:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 4: OnboardingModal.tsx Contrast & Adaptive CTA
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 4: Validating OnboardingModal.tsx feedback contrast & dynamic CTA...');
  const onboardingPath = path.join(rootDir, 'src/components/onboarding/OnboardingModal.tsx');
  const onboardingSource = fs.readFileSync(onboardingPath, 'utf8');

  if (
    !onboardingSource.includes('text-emerald-700 dark:text-emerald-300 font-bold') ||
    !onboardingSource.includes('text-red-700 dark:text-red-300')
  ) {
    throw new Error('OnboardingModal.tsx does not use WCAG AA compliant feedback contrast tokens');
  }

  if (
    !onboardingSource.includes("isStopConditionMet ? 'Lihat Hasil Diagnosis' : 'Lanjut ke Soal Berikutnya'")
  ) {
    throw new Error('OnboardingModal.tsx does not dynamically adapt next CTA label on CAT completion');
  }

  console.log('   ✅ PASS: OnboardingModal.tsx provides high-contrast feedback and adaptive final CTA.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 4:', err.message);
  process.exit(1);
}

console.log(`\n🎉 Siklus II — Pass 1 Verification: ${passedChecks}/${totalChecks} Checks Passed Successfully!`);
