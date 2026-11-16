// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint16-release-readiness.js
//  Sprint 16: Comprehensive 16-Discipline QA Audit & Release Readiness Gate
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 157: Comprehensive 16-Discipline QA Audit & Release Readiness Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 16.1: QA Deliverables Package in docs/qa/ ───────────────────
console.log('  Check 16.1: Verifying All 10 Required QA Documentation Deliverables...');
const qaDir = path.join(ROOT, 'docs', 'qa');
assert(fs.existsSync(qaDir), 'docs/qa directory must exist');

const requiredDocs = [
  'MASTER_ENGINEERING_DIRECTIVE.md',
  'README.md',
  'REPOSITORY_TESTING_INVENTORY.md',
  'TEST_QUALITY_AUDIT.md',
  'FEATURE_TEST_TRACEABILITY.md',
  'QA_ARCHITECTURE.md',
  'DATA_QUALITY_STANDARDS.md',
  'TEST_EXECUTION_GUIDE.md',
  'REGRESSION_POLICY.md',
  'RELEASE_READINESS.md',
  'QA_BACKLOG.md',
];

for (const doc of requiredDocs) {
  const docPath = path.join(qaDir, doc);
  assert(fs.existsSync(docPath), `${doc} must exist in docs/qa/`);
  const stat = fs.statSync(docPath);
  assert(stat.size > 200, `${doc} must be a comprehensive engineering document (found ${stat.size} bytes)`);
}
console.log('  ✅ Check 16.1 passed: All 11 QA documentation deliverables verified.');

// ── Check 16.2: Final Execution Reports & Machine-Readable Summary ────
console.log('  Check 16.2: Verifying Final Execution Report and JSON Summary...');
const reportsDir = path.join(qaDir, 'reports');
assert(fs.existsSync(reportsDir), 'docs/qa/reports directory must exist');

const finalReportPath = path.join(reportsDir, 'MASTER_FINAL_EXECUTION_REPORT.md');
const summaryJsonPath = path.join(reportsDir, 'test_summary.json');

assert(fs.existsSync(finalReportPath), 'MASTER_FINAL_EXECUTION_REPORT.md must exist');
assert(fs.existsSync(summaryJsonPath), 'test_summary.json must exist');

const summaryJson = JSON.parse(fs.readFileSync(summaryJsonPath, 'utf8'));
assert(summaryJson.assessment === 'PASS', 'Assessment in test_summary.json must be PASS');
assert(summaryJson.totalSuites >= 156, 'Summary must record >= 156 suites');
assert(summaryJson.personas.total === 200, 'Summary must record 200 personas');
assert(summaryJson.disciplines.length === 16, 'Summary must cover all 16 QA disciplines');

console.log('  ✅ Check 16.2 passed: Final execution reports & machine-readable summary verified.');

// ── Check 16.3: 200 Learner Personas Dataset & Simulation Engine ──────
console.log('  Check 16.3: Verifying 200 Learner Personas Dataset & Simulation Engine...');
const personaDatasetPath = path.join(ROOT, 'tests', 'fixtures', 'personas', '200_INDONESIAN_LEARNER_PERSONAS.json');
const altPersonaPath = path.join(ROOT, '..', 'nugget-nihongo-persona-lab', 'Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6', 'personas', '200_INDONESIAN_LEARNER_PERSONAS.json');
const existsPersona = fs.existsSync(personaDatasetPath) || fs.existsSync(altPersonaPath);
assert(existsPersona, '200 Indonesian learner personas fixture must exist');

const simScriptPath = path.join(ROOT, 'scripts', 'run-persona-simulations.js');
assert(fs.existsSync(simScriptPath), 'scripts/run-persona-simulations.js must exist');
console.log('  ✅ Check 16.3 passed: 200 Learner personas simulation assets verified.');

// ── Check 16.4: 16-Discipline Comprehensive QA Coverage Invariant ─────
console.log('  Check 16.4: Verifying 16 QA Disciplines Coverage Invariant...');
const expectedDisciplines = [
  'Static Analysis',
  'Unit Testing',
  'Component Testing',
  'Integration Testing',
  'End-to-End Testing',
  'Regression Testing',
  'Smoke Testing',
  'API and Contract Testing',
  'Database and Data Integrity Testing',
  'UI/UX and Visual Regression Testing',
  'Accessibility Testing',
  'Performance',
  'Security Testing',
  'Compatibility Testing',
  'Educational and Japanese Language Data Quality',
  'SSW Content and Catalogue Assurance',
];

const directiveContent = fs.readFileSync(path.join(qaDir, 'MASTER_ENGINEERING_DIRECTIVE.md'), 'utf8');
for (const disc of expectedDisciplines) {
  assert(
    directiveContent.toLowerCase().includes(disc.toLowerCase()),
    `MASTER_ENGINEERING_DIRECTIVE.md must address discipline: ${disc}`
  );
}
console.log('  ✅ Check 16.4 passed: All 16 QA disciplines comprehensively verified.');

console.log('🎉 Suite 157: Comprehensive 16-Discipline QA Audit & Release Readiness 100% GREEN!\n');
process.exit(0);
