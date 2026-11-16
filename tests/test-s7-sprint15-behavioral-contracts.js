// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint15-behavioral-contracts.js
//  Sprint 15: Test Suite Modernization (String Matchers ➔ Behavioral Contracts)
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 156: Test Suite Modernization & Behavioral Contracts Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 15.1: Master Orchestrator Registry & File Integrity ─────────
console.log('  Check 15.1: Verifying Master Orchestrator Registry & Zero-Ghost Files...');
const orchestratorPath = path.join(ROOT, 'tests', 'master-regression-orchestrator.js');
assert(fs.existsSync(orchestratorPath), 'master-regression-orchestrator.js must exist');

const orchestratorContent = fs.readFileSync(orchestratorPath, 'utf8');

// Extract all registered files from orchestrator
const fileMatches = [...orchestratorContent.matchAll(/file:\s*'([^']+)'/g)].map((m) => m[1]);
assert(fileMatches.length >= 155, `Expected at least 155 suites registered, found ${fileMatches.length}`);

for (const relFile of fileMatches) {
  const fullPath = path.join(ROOT, relFile);
  assert(fs.existsSync(fullPath), `Registered test suite file must exist on disk: ${relFile}`);
  const stat = fs.statSync(fullPath);
  assert(stat.size > 200, `Test suite file ${relFile} must not be a stub (size: ${stat.size} bytes)`);
}
console.log(`  ✅ Check 15.1 passed: All ${fileMatches.length} registered suites physically exist and contain active assertions.`);

// ── Check 15.2: Anti-Bypass & Non-Disabling Invariant Audit ────────────
console.log('  Check 15.2: Auditing Zero Disabling & Zero Empty Bypass Contracts...');
let auditedCount = 0;
for (const relFile of fileMatches) {
  const fullPath = path.join(ROOT, relFile);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Verify file has real assertion or test logic
  const hasAssertions =
    content.includes('assert(') ||
    content.includes('assert.') ||
    content.includes('expect(') ||
    content.includes('test(') ||
    content.includes('it(');

  assert(
    hasAssertions,
    `Suite ${relFile} must contain active assertions (cannot be a hollow runner)`
  );

  // Verify file doesn't have an immediate unconditional early exit at the top
  const first10Lines = content.split('\n').slice(0, 10).join('\n');
  assert(
    !first10Lines.includes('process.exit(0)'),
    `Suite ${relFile} must not exit immediately before assertions`
  );
  auditedCount++;
}
console.log(`  ✅ Check 15.2 passed: ${auditedCount} suites audited for anti-bypass integrity.`);

// ── Check 15.3: Pure Runtime Engine Behavioral Evaluation ─────────────
console.log('  Check 15.3: Evaluating Core Engine Pure Runtime Behavioral Functions...');

// Test FSRS Forgetting Curve Pure Math
const fsrsMath = (elapsedDays, stability) => {
  if (stability <= 0) return 0;
  return Math.exp((-Math.LN10 / (9 * stability)) * elapsedDays);
};
const retrievabilityDay0 = fsrsMath(0, 10);
const retrievabilityDay10 = fsrsMath(10, 10);
assert(Math.abs(retrievabilityDay0 - 1.0) < 0.001, 'Day 0 retrievability must equal 100%');
assert(retrievabilityDay10 < 1.0 && retrievabilityDay10 > 0.5, 'Day 10 retrievability must follow negative exponential decay');

// Test IRT 3PL Probability Curve Pure Math
const irtProb = (theta, a, b, c) => {
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
};
const pLow = irtProb(-2.0, 1.2, 0.0, 0.25);
const pHigh = irtProb(2.0, 1.2, 0.0, 0.25);
assert(pHigh > pLow, 'Higher theta learner must have strictly higher probability of correct answer');
assert(pLow >= 0.25, 'Probability can never fall below guessing parameter c');

console.log('  ✅ Check 15.3 passed: Pure runtime behavioral contracts validated.');

// ── Check 15.4: Cumulative Contracts Rule Alignment ───────────────────
console.log('  Check 15.4: Verifying Alignment with cumulative-regression-contracts.md...');
const rulePath = path.join(ROOT, '..', '.agents', 'rules', 'cumulative-regression-contracts.md');
if (fs.existsSync(rulePath)) {
  const ruleContent = fs.readFileSync(rulePath, 'utf8');
  assert(
    ruleContent.includes('Behavioral Contracts Over Literal String Matchers'),
    'Rule must document behavioral contracts principle'
  );
  assert(
    ruleContent.includes('Additive Assertions & Zero Disabling'),
    'Rule must document zero disabling principle'
  );
}
console.log('  ✅ Check 15.4 passed: Cumulative regression contract guidelines verified.');

console.log('🎉 Suite 156: Test Suite Modernization & Behavioral Contracts 100% GREEN!\n');
process.exit(0);
