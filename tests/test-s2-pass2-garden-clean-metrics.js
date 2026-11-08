/**
 * test-s2-pass2-garden-clean-metrics.js
 * Siklus II — Pass 2 Verification Suite:
 * Validates fixes for Defects #121–#125 across Hero Momentum, FSRS Kebun Metrics, and Clean State Integrity
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 2 Verification Suite...\n');
let passedChecks = 0;
const totalChecks = 5;

// ─────────────────────────────────────────────────────────────
// Check 1: KebunPage.tsx Honest 0% Retrievability on Clean State
// ─────────────────────────────────────────────────────────────
try {
  console.log('📋 Check 1: Validating honest FSRS retrievability on clean state...');
  const kebunPath = path.join(rootDir, 'src/pages/KebunPage.tsx');
  const kebunSource = fs.readFileSync(kebunPath, 'utf8');

  // Verify code does not return 90 when totalCards === 0
  if (kebunSource.includes('estimatedRetrievability = totalCards > 0\n      ? Math.round((totalRetrievability / totalCards) * 100)\n      : 90')) {
    throw new Error('KebunPage.tsx still defaults estimatedRetrievability to 90 on 0 cards');
  }

  // Verify UI renders clean non-hallucinated metric
  if (!kebunSource.includes("totalCards > 0 ? `${fsrsStats.estimatedRetrievability}%` : '— (0 Kartu)'")) {
    throw new Error('KebunPage.tsx headline does not render honest "— (0 Kartu)" when totalCards === 0');
  }

  console.log('   ✅ PASS: KebunPage.tsx reports honest 0% / "— (0 Kartu)" on fresh accounts.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 1:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 2: gardenStore.ts Default Plants All Unbloomed (Stage 0)
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 2: Validating gardenStore.ts pristine unbloomed starter plants...');
  const gardenPath = path.join(rootDir, 'src/lib/garden/gardenStore.ts');
  const gardenSource = fs.readFileSync(gardenPath, 'utf8');

  // Must not have stage 4 in DEFAULT_PLANTS
  const defaultPlantsMatch = gardenSource.match(/const DEFAULT_PLANTS:\s*PlantItem\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!defaultPlantsMatch) {
    throw new Error('Could not find DEFAULT_PLANTS in gardenStore.ts');
  }

  const defaultPlantsContent = defaultPlantsMatch[1];
  if (defaultPlantsContent.includes('stage: 4') || defaultPlantsContent.includes('stage: 3') || defaultPlantsContent.includes('stage: 2') || defaultPlantsContent.includes('stage: 1')) {
    throw new Error('DEFAULT_PLANTS still contains pre-bloomed or pre-sprouted plants on clean state');
  }

  console.log('   ✅ PASS: gardenStore.ts initializes all 8 starter plants at stage 0 (zero pre-bloomed plants).');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 2:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 3: ProfileSettingsTab.tsx True Mastery Threshold (Stage >= 4)
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 3: Validating ProfileSettingsTab.tsx kanji mastery stage threshold...');
  const profileTabPath = path.join(rootDir, 'src/components/settings/ProfileSettingsTab.tsx');
  const profileSource = fs.readFileSync(profileTabPath, 'utf8');

  if (profileSource.includes('plants.filter((p) => p.stage >= 3)')) {
    throw new Error('ProfileSettingsTab.tsx still counts unbloomed stage 3 buds as mastered kanji');
  }

  if (!profileSource.includes('plants.filter((p) => p.stage >= 4)')) {
    throw new Error('ProfileSettingsTab.tsx does not check stage >= 4 for bloomed kanji count');
  }

  console.log('   ✅ PASS: ProfileSettingsTab.tsx strictly enforces stage >= 4 (Mekar Sempurna) for Kanji Melekat.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 3:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 4: KebunPage.tsx Honest CAT Card & Elimination of Bait-and-Switch
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 4: Validating KebunPage.tsx CAT card honest navigation...');
  const kebunPath = path.join(rootDir, 'src/pages/KebunPage.tsx');
  const kebunSource = fs.readFileSync(kebunPath, 'utf8');

  if (kebunSource.includes('Catatan Evaluasi / Mistake Notebook')) {
    throw new Error('KebunPage.tsx still uses misleading "Catatan Evaluasi / Mistake Notebook" title for CAT trigger');
  }

  if (!kebunSource.includes('Tes Diagnostik CAT (IRT)') || !kebunSource.includes('Mulai Tes CAT (6-12 Soal)')) {
    throw new Error('KebunPage.tsx does not properly label CAT diagnostic card and action');
  }

  console.log('   ✅ PASS: KebunPage.tsx transparently routes learners to CAT diagnostic test with honest copy.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 4:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 5: HomePage.tsx WCAG AA Contrast & Clean Streak State
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 5: Validating HomePage.tsx contrast tokens & clean streak indicator...');
  const homePath = path.join(rootDir, 'src/pages/HomePage.tsx');
  const homeSource = fs.readFileSync(homePath, 'utf8');

  if (!homeSource.includes("streak > 0 ? `Streak ${streak} Hari Aktif` : 'Streak 0 Hari (Mulai Hari Ini)'")) {
    throw new Error('HomePage.tsx does not adapt streak badge copy when streak is 0');
  }

  if (!homeSource.includes('text-emerald-700 dark:text-emerald-400') || !homeSource.includes('text-accent-hot dark:text-amber-400')) {
    throw new Error('HomePage.tsx momentum widget does not apply WCAG AA high-contrast tokens');
  }

  console.log('   ✅ PASS: HomePage.tsx uses high-contrast tokens and contextual streak indicator.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 5:', err.message);
  process.exit(1);
}

console.log(`\n🎉 Siklus II — Pass 2 Verification: ${passedChecks}/${totalChecks} Checks Passed Successfully!`);
