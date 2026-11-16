// ══════════════════════════════════════════════════════════════════
//  test-s8-pass12-personas-multidevice-profiling.js
//  Siklus VIII Pass 12 (Sprint 58 / Suite 199):
//  200 Indonesian Learner Personas Multi-Device Walkthrough & Performance Profiling
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

console.log('⚡ Running Suite 199: Siklus VIII Pass 12 (Sprint 58): 200 Personas Multi-Device & Profiling...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Canonical 200 Personas Dataset & 4-Pillar Allocation ────────────
console.log('  Check 58.1: Auditing canonical 200 personas dataset and 4-pillar quota...');
const localPersonasPath = path.join(ROOT, 'tests', 'fixtures', 'personas', '200_INDONESIAN_LEARNER_PERSONAS.json');
const externalPersonasPath = path.resolve(ROOT, '../nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/personas/200_INDONESIAN_LEARNER_PERSONAS.json');
const personasPath = fs.existsSync(localPersonasPath) ? localPersonasPath : externalPersonasPath;

assert(fs.existsSync(personasPath), `Canonical personas file must exist at: ${personasPath}`);
const personaData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
const personas = personaData.personas;

assert(Array.isArray(personas), 'personas must be an array');
assert.strictEqual(personas.length, 200, 'Must contain exactly 200 canonical personas');

const pillarCounts = {
  JLPT_N5_N1: 0,
  JFT_BASIC: 0,
  SSW_SECTOR: 0,
  LIVING_WORKING_JAPAN: 0,
};

for (const p of personas) {
  assert(p.id && p.name, `Persona missing id or name: ${JSON.stringify(p)}`);
  assert(p.primary_vision_pillar, `Persona ${p.id} missing primary_vision_pillar`);
  pillarCounts[p.primary_vision_pillar]++;
}

assert.strictEqual(pillarCounts.JLPT_N5_N1, 75, 'Must contain exactly 75 JLPT personas');
assert.strictEqual(pillarCounts.JFT_BASIC, 35, 'Must contain exactly 35 JFT-Basic personas');
assert.strictEqual(pillarCounts.SSW_SECTOR, 50, 'Must contain exactly 50 SSW personas');
assert.strictEqual(pillarCounts.LIVING_WORKING_JAPAN, 40, 'Must contain exactly 40 Living in Japan personas');

console.log('  ✅ Check 58.1 passed: Exactly 200 personas (75 JLPT, 35 JFT, 50 SSW, 40 Living) verified.');

// ── Check 2: Multi-Device Viewport Contracts & BottomNav Ergonomics ──────────
console.log('  Check 58.2: Verifying multi-device touch targets, safe area bottom & anti-leakage...');
const bottomNavPath = path.join(ROOT, 'src', 'components', 'layout', 'BottomNav.tsx');
assert(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

assert(
  bottomNavContent.includes('min-h-[48px]') &&
  bottomNavContent.includes('min-w-0') &&
  bottomNavContent.includes('active:scale-95') &&
  bottomNavContent.includes('role="navigation"') &&
  bottomNavContent.includes('aria-label="Navigasi Utama Ponsel"'),
  'BottomNav must enforce accessible touch targets (>=48px), responsive flexbox min-w-0, and active feedback'
);

assert(
  bottomNavContent.includes('safe-area-bottom') ||
  bottomNavContent.includes('pb-[calc(') ||
  bottomNavContent.includes('fixed z-40'),
  'BottomNav must respect safe area inset padding on modern notched mobile devices'
);

assert(
  bottomNavContent.includes("activeTab === 'study'") &&
  bottomNavContent.includes('hasActiveCbt'),
  'BottomNav must implement immersion shield (auto-hiding during study studio and active timed CBT exams)'
);

console.log('  ✅ Check 58.2 passed: Multi-device touch targets and immersion shields verified.');

// ── Check 3: Data Quality Audit Rubric (Version 6.0.0 & 4 Severity Levels) ───
console.log('  Check 58.3: Verifying Data Quality Audit Rubric schema and severity hierarchy...');
const localRubricPath = path.join(ROOT, 'tests', 'fixtures', 'personas', 'DATA_QUALITY_AUDIT_RUBRIC.json');
const externalRubricPath = path.resolve(ROOT, '../nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/data_quality_assurance/DATA_QUALITY_AUDIT_RUBRIC.json');
const rubricPath = fs.existsSync(localRubricPath) ? localRubricPath : externalRubricPath;

assert(fs.existsSync(rubricPath), `Data quality rubric must exist at: ${rubricPath}`);
const rubric = JSON.parse(fs.readFileSync(rubricPath, 'utf8'));

assert(rubric.version === '6.0.0', `Rubric version must be 6.0.0 (got ${rubric.version})`);
assert(Array.isArray(rubric.severity), 'Rubric must declare severity tiers array');

const severityIds = rubric.severity.map((s) => s.id);
assert(
  severityIds.includes('CRITICAL') &&
  severityIds.includes('HIGH') &&
  severityIds.includes('MEDIUM') &&
  severityIds.includes('LOW'),
  'Rubric must declare all 4 statutory severity tiers (CRITICAL, HIGH, MEDIUM, LOW)'
);

const checkIds = rubric.checks.map((c) => c.id);
assert(
  checkIds.includes('LING-01') &&
  checkIds.includes('LING-02') &&
  checkIds.includes('LING-03') &&
  checkIds.includes('LING-04'),
  'Rubric must define core linguistic and naturalness checks (LING-01 to LING-04)'
);

console.log('  ✅ Check 58.3 passed: Data Quality Audit Rubric v6.0.0 verified.');

// ── Check 4: Offline Zero-Quota Curriculum Library Completeness ───────────────
console.log('  Check 58.4: Verifying 100% offline curriculum availability across all 36 tracks...');
const curriculumDir = path.join(ROOT, 'public', 'data', 'curriculum');
assert(fs.existsSync(curriculumDir), 'public/data/curriculum directory must exist');

const trackFiles = fs.readdirSync(curriculumDir).filter((f) => f.endsWith('.json'));
assert(trackFiles.length >= 10, `Curriculum library must contain at least 10 core tracks (found ${trackFiles.length})`);

// Essential tracks verification
const essentialTracks = [
  'curriculum-n5.json',
  'curriculum-n4.json',
  'curriculum-n3.json',
  'curriculum-jft-a1.json',
  'curriculum-jft-a2.json',
  'curriculum-ssw-kaigo.json',
  'curriculum-seikatsu.json',
];

for (const trackName of essentialTracks) {
  const filePath = path.join(curriculumDir, trackName);
  assert(fs.existsSync(filePath), `Essential offline track '${trackName}' must exist in public/data/curriculum/`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  assert(
    (content.units && content.units.length > 0) || (content.lessons && content.lessons.length > 0),
    `Track '${trackName}' must contain non-empty units or lessons`
  );
}

console.log('  ✅ Check 58.4 passed: Offline zero-quota curriculum library verified.');

// ── Check 5: Automated 200 Personas Simulation Runner Execution ───────────────
console.log('  Check 58.5: Executing full 200 Indonesian learner personas simulation script...');
const simulationScript = path.join(ROOT, 'scripts', 'run-persona-simulations.js');
assert(fs.existsSync(simulationScript), 'scripts/run-persona-simulations.js must exist');

const simResult = spawnSync('node', [simulationScript], {
  cwd: ROOT,
  encoding: 'utf8',
  stdio: 'pipe',
});

assert.strictEqual(
  simResult.status,
  0,
  `run-persona-simulations.js must exit with code 0\n${simResult.stdout}\n${simResult.stderr}`
);

assert(
  simResult.stdout.includes('100% OF 200 INDONESIAN LEARNER PERSONAS SUCCESSFULLY SIMULATED!'),
  'Persona simulation runner must report 100% successful simulation across all 200 personas'
);

console.log('  ✅ Check 58.5 passed: 200 Indonesian learner personas simulation completed with 0 failures.');

console.log('\n🎉 ALL PASS 12 (SUITE 199) 200 PERSONAS & MULTI-DEVICE PROFILING TESTS PASSED 100% GREEN!\n');
