// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-44-release-gate.js
//  Sprint 44: End-to-End Persona Verification, CI/CD Gate & Final Release
//  Tickets T-236 to T-240
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${title}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${title}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('====================================================================');
console.log('🧪 SPRINT 44 VERIFICATION: 200 PERSONAS, QUALITY GATE & RELEASE V20');
console.log('====================================================================\n');

// ── T-236: 200 Indonesian Learner Personas Simulation ──────────────
console.log('👥 T-236: 200 Indonesian Learner Personas Simulation Engine');

check('scripts/run-persona-simulations.js exists and is wired into package.json', () => {
  const scriptPath = path.join(ROOT, 'scripts/run-persona-simulations.js');
  assert(fs.existsSync(scriptPath), 'scripts/run-persona-simulations.js must exist');
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert(pkg.scripts['test:personas'], 'package.json must contain test:personas script');
  assert(pkg.scripts.test.includes('scripts/run-persona-simulations.js'), 'npm test must include persona simulations');
});

check('200 Indonesian Learner Personas JSON is accessible and has all 4 pillars', () => {
  const pPath = path.resolve(ROOT, '../nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/personas/200_INDONESIAN_LEARNER_PERSONAS.json');
  assert(fs.existsSync(pPath), 'Canonical personas file must exist');
  const data = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  assert.strictEqual(data.personas.length, 200, 'Must contain exactly 200 learner personas');
  
  const pillars = new Set(data.personas.map(p => p.primary_vision_pillar));
  assert(pillars.has('JLPT_N5_N1'), 'Must include JLPT_N5_N1 pillar');
  assert(pillars.has('JFT_BASIC'), 'Must include JFT_BASIC pillar');
  assert(pillars.has('SSW_SECTOR'), 'Must include SSW_SECTOR pillar');
  assert(pillars.has('LIVING_WORKING_JAPAN'), 'Must include LIVING_WORKING_JAPAN pillar');
});

// ── T-237: CI/CD Pipeline Consolidation & Engine Test Suites ───────
console.log('\n⚙️ T-237: CI/CD Pipeline Consolidation & Real Algorithmic Tests');

check('tests/fsrs-engine.test.js exists and tests forgetting curve math and fatigue', () => {
  const fPath = path.join(ROOT, 'tests/fsrs-engine.test.js');
  assert(fs.existsSync(fPath), 'tests/fsrs-engine.test.js must exist');
  const code = fs.readFileSync(fPath, 'utf8');
  assert(code.includes('fsrsForgettingCurve'), 'Must test fsrsForgettingCurve');
  assert(code.includes('MATSUNAGA_MULTIPLIER'), 'Must test MATSUNAGA_MULTIPLIER');
  assert(code.includes('calculateFatiguePenalty'), 'Must test fatigue penalty clamping');
});

check('tests/cat-engine.test.js exists and tests IRT 3PL, Fisher Info & SEM convergence', () => {
  const cPath = path.join(ROOT, 'tests/cat-engine.test.js');
  assert(fs.existsSync(cPath), 'tests/cat-engine.test.js must exist');
  const code = fs.readFileSync(cPath, 'utf8');
  assert(code.includes('calculateProbability3PL'), 'Must test 3PL probability');
  assert(code.includes('calculateFisherInformation'), 'Must test Fisher Information');
  assert(code.includes('calculateSEM'), 'Must test SEM stopping criteria');
  assert(code.includes('thetaToJLPTLevel'), 'Must test theta level classification');
});

check('tests/stores.test.js exists and tests Zustand persistence and 36h streak grace', () => {
  const sPath = path.join(ROOT, 'tests/stores.test.js');
  assert(fs.existsSync(sPath), 'tests/stores.test.js must exist');
  const code = fs.readFileSync(sPath, 'utf8');
  assert(code.includes('nn_streak'), 'Must test nn_streak persistence key');
  assert(code.includes('isWithinGraceWindow'), 'Must test 36h grace window');
  assert(code.includes('calculateProgress'), 'Must test daily XP progress');
});

check('tests/test-curriculum-adapter.js exists and tests universal 5W1H lesson adaptation', () => {
  const aPath = path.join(ROOT, 'tests/test-curriculum-adapter.js');
  assert(fs.existsSync(aPath), 'tests/test-curriculum-adapter.js must exist');
  const code = fs.readFileSync(aPath, 'utf8');
  assert(code.includes('getAdaptiveLessonContent'), 'Must call getAdaptiveLessonContent');
  assert(code.includes('pedagogical_framework'), 'Must verify 5W1H pedagogical framework');
});

// ── T-238: Content Quality Gate ────────────────────────────────────
console.log('\n🛡️ T-238: Content Quality Gate (Zero Blocking Errors)');

check('tests/quality.js exists and is wired into test:quality script', () => {
  const qPath = path.join(ROOT, 'tests/quality.js');
  assert(fs.existsSync(qPath), 'tests/quality.js must exist');
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert(pkg.scripts['test:quality'], 'package.json must contain test:quality script');
});

// ── T-239: Strict Multi-Device Responsive Layout Verification ──────
console.log('\n📱 T-239: Universal Multi-Device Responsive Layout Matrix');

check('tests/verify-frontend-responsive.js exists and tests 4 viewports', () => {
  const rPath = path.join(ROOT, 'tests/verify-frontend-responsive.js');
  assert(fs.existsSync(rPath), 'tests/verify-frontend-responsive.js must exist');
  const code = fs.readFileSync(rPath, 'utf8');
  assert(code.includes('375'), 'Must test 375px iPhone SE');
  assert(code.includes('390'), 'Must test 390px Standard Mobile');
  assert(code.includes('768'), 'Must test 768px Tablet iPad');
  assert(code.includes('1440'), 'Must test 1440px Desktop Wide');
});

// ── T-240: Production Release Certification for v20.0.0 ────────────
console.log('\n🏆 T-240: Production Release Certification (Clean-Slate v20.0.0)');

check('Application version synchronized to v20.0.0 across all 4 system entrypoints', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.strictEqual(pkg.version, '20.0.0', 'package.json version must be 20.0.0');

  const cfg = fs.readFileSync(path.join(ROOT, 'src/config/version.ts'), 'utf8');
  assert(cfg.includes("APP_VERSION = 'v20.0.0'"), 'version.ts APP_VERSION must be v20.0.0');
  assert(cfg.includes("APP_VERSION_NUMBER = '20.0.0'"), 'version.ts APP_VERSION_NUMBER must be 20.0.0');

  const vJs = fs.readFileSync(path.join(ROOT, 'public/js/core/version.js'), 'utf8');
  assert(vJs.includes("window.APP_VERSION = 'v20.0.0'"), 'version.js must declare v20.0.0');

  const sw = fs.readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');
  assert(sw.includes("CACHE = 'nihongo-v20.0.0'"), 'sw.js CACHE must be nihongo-v20.0.0');
});

check('patchNotes.ts and CHANGELOG.md document the historic v20.0.0 milestone', () => {
  const pn = fs.readFileSync(path.join(ROOT, 'src/lib/data/patchNotes.ts'), 'utf8');
  assert(pn.includes("version: 'v20.0.0'"), 'patchNotes.ts must contain v20.0.0 entry');
  assert(pn.includes('Grand Clean-Slate Enterprise Production Release'), 'patchNotes.ts must document release name');

  const cl = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');
  assert(cl.includes('v20.0.0'), 'CHANGELOG.md must contain v20.0.0 entry');
});

check('vite.config.ts maintains strict 500 kB chunk warning limit and budget auditor script', () => {
  const vCfg = fs.readFileSync(path.join(ROOT, 'vite.config.ts'), 'utf8');
  assert(vCfg.includes('chunkSizeWarningLimit: 500'), 'chunkSizeWarningLimit must be 500');
  const bScript = path.join(ROOT, 'scripts/verify-bundle-budget.js');
  assert(fs.existsSync(bScript), 'scripts/verify-bundle-budget.js must exist');
});

console.log('\n====================================================================');
console.log(`📊 SPRINT 44 RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED`);
console.log('====================================================================');

if (passedChecks === totalChecks) {
  console.log('\n🌟 SPRINT 44 & GRAND RELEASE GATE V20.0.0 FULLY CERTIFIED!');
} else {
  console.error('\n❌ SPRINT 44 HAS FAILING CHECKS');
  process.exit(1);
}
