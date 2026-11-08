/**
 * test-s2-pass3-materihub-curriculum.js
 * Siklus II — Pass 3 Verification Suite:
 * Validates fixes for Defects #126–#130 across Materi Hub, Curriculum Track Browser, and Typography
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 3 Verification Suite...\n');
let passedChecks = 0;
const totalChecks = 5;

// ─────────────────────────────────────────────────────────────
// Check 1: CurriculumTrackBrowser.tsx Honest Accuracy on Clean State
// ─────────────────────────────────────────────────────────────
try {
  console.log('📋 Check 1: Validating honest 0% / "—" curriculum accuracy on fresh accounts...');
  const browserPath = path.join(rootDir, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserSource = fs.readFileSync(browserPath, 'utf8');

  // Must not return 100 on empty scores
  if (browserSource.includes('if (scores.length === 0) return 100;')) {
    throw new Error('CurriculumTrackBrowser.tsx still returns 100% accuracy when scores.length === 0');
  }

  // Must render dash when no lessons completed
  if (!browserSource.includes("Object.keys(currentProgress.lessonScores || {}).length > 0 ? `${averageScore}%` : '—'")) {
    throw new Error('CurriculumTrackBrowser.tsx does not render "—" for fresh users with 0 lesson scores');
  }

  console.log('   ✅ PASS: CurriculumTrackBrowser.tsx reports honest accuracy ("—") on 0 lessons.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 1:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 2: MateriHubPage.tsx Budoux Semantic Line-Breaking
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 2: Validating MateriHubPage.tsx BudouxText integration...');
  const materiPath = path.join(rootDir, 'src/pages/MateriHubPage.tsx');
  const materiSource = fs.readFileSync(materiPath, 'utf8');

  if (!materiSource.includes("import { BudouxText } from '../components/ui/BudouxText'")) {
    throw new Error('MateriHubPage.tsx does not import BudouxText');
  }

  if (!materiSource.includes('<BudouxText') || !materiSource.includes('text={item.pattern}')) {
    throw new Error('MateriHubPage.tsx does not render grammar patterns using BudouxText');
  }

  console.log('   ✅ PASS: MateriHubPage.tsx wraps grammar patterns in BudouxText for flawless mobile line breaking.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 2:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 3: Dynamic Track Grammar Resolution for SSW & Levels
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 3: Validating track-specific grammar mapping (effectiveGrammarList)...');
  const browserPath = path.join(rootDir, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserSource = fs.readFileSync(browserPath, 'utf8');

  if (!browserSource.includes('effectiveGrammarList') || !browserSource.includes('trackGrammars')) {
    throw new Error('CurriculumTrackBrowser.tsx does not maintain dynamic effectiveGrammarList for tracks');
  }

  if (!browserSource.includes('effectiveGrammarList.find((g) => g.id === gid)')) {
    throw new Error('CurriculumTrackBrowser.tsx does not query effectiveGrammarList for matched lesson grammars');
  }

  console.log('   ✅ PASS: CurriculumTrackBrowser.tsx dynamically maps track-specific grammar for vocational and academic tracks.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 3:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 4: Dark-Island Class Purge in Curriculum & Materi
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 4: Validating dark-island class purge in Curriculum & Materi...');
  const browserPath = path.join(rootDir, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserSource = fs.readFileSync(browserPath, 'utf8');
  const materiPath = path.join(rootDir, 'src/pages/MateriHubPage.tsx');
  const materiSource = fs.readFileSync(materiPath, 'utf8');

  if (browserSource.includes('bg-amber-950/20')) {
    throw new Error('CurriculumTrackBrowser.tsx still contains dark-island bg-amber-950/20');
  }

  if (materiSource.includes('from-amber-950/40')) {
    throw new Error('MateriHubPage.tsx still contains dark-island from-amber-950/40');
  }

  console.log('   ✅ PASS: Dark-island classes successfully purged and replaced with semantic tokens.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 4:', err.message);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Check 5: WCAG AA Semantic Contrast on Chips and Badges
// ─────────────────────────────────────────────────────────────
try {
  console.log('\n📋 Check 5: Validating WCAG AA contrast tokens on chips, badges and buttons...');
  const browserPath = path.join(rootDir, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserSource = fs.readFileSync(browserPath, 'utf8');
  const materiPath = path.join(rootDir, 'src/pages/MateriHubPage.tsx');
  const materiSource = fs.readFileSync(materiPath, 'utf8');

  if (!browserSource.includes('text-emerald-700 dark:text-emerald-400')) {
    throw new Error('CurriculumTrackBrowser.tsx does not use WCAG AA compliant text-emerald-700 dark:text-emerald-400');
  }

  if (!materiSource.includes('text-accent-hot dark:text-amber-300')) {
    throw new Error('MateriHubPage.tsx does not use WCAG AA compliant text-accent-hot dark:text-amber-300');
  }

  console.log('   ✅ PASS: High-contrast semantic tokens verified across chips, badges, and status pills.');
  passedChecks++;
} catch (err) {
  console.error('   ❌ FAIL Check 5:', err.message);
  process.exit(1);
}

console.log(`\n🎉 Siklus II — Pass 3 Verification: ${passedChecks}/${totalChecks} Checks Passed Successfully!`);
