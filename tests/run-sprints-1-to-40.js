// ══════════════════════════════════════════════════════════════════
//  run-sprints-1-to-40.js — Cumulative Regression Runner
//  Executes all Sprint verification suites from Sprint 1 to Sprint 40
// ══════════════════════════════════════════════════════════════════

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SPRINT_TESTS = [
  'tests/test-sprint-1-hardening.js',
  'tests/test-sprint-2-pipeline.js',
  'tests/test-sprint-3-frontend.js',
  'tests/test-sprint-4-taxonomy.js',
  'tests/test-sprint-5-pedagogy.js',
  'tests/test-sprint-6-books.js',
  'tests/test-sprint-7-sla-engines.js',
  'tests/test-sprint-8-sessions.js',
  'tests/test-sprint-9-convergence.js',
  'tests/test-sprint-10-ergonomics.js',
  'tests/test-sprint-11-motion.js',
  'tests/test-sprint-12-features.js',
  'tests/test-sprint-13-skills-storage.js',
  'tests/test-sprint-14-pwa-caching.js',
  'tests/test-sprint-15-security.js',
  'tests/test-sprint-16-i18n-sla.js',
  'tests/test-sprint-17-bundle-optimization.js',
  'tests/test-sprint-18-telemetry-error.js',
  'tests/test-sprint-19-sync-crdt.js',
  'tests/test-sprint-20-disaster-recovery.js',
  'tests/test-sprint-21-a11y.js',
  'tests/test-sprint-22-audio-pipeline.js',
  'tests/test-sprint-23-deinflector-tokenizer.js',
  'tests/test-sprint-24-kanji-canvas.js',
  'tests/test-sprint-25-assets-multimedia.js',
  'tests/test-sprint-26-ssw-cbt.js',
  'tests/test-sprint-27-jft-seikatsu.js',
  'tests/test-sprint-28-copywriting-typography.js',
  'tests/test-sprint-29-textbook-drills.js',
  'tests/test-sprint-30-choukai-audio.js',
  'tests/test-sprint-31-morphology-yomitan.js',
  'tests/test-sprint-32-dataset-ingestion.js',
  'tests/test-sprint-33-budoux-segmentation.js',
  'tests/test-sprint-34-pitch-accent.js',
  'tests/test-sprint-35-storage-sync.js',
  'tests/test-sprint-36-gamification-hardening.js',
  'tests/test-sprint-37-settings-hardening.js',
  'tests/test-sprint-38-about-licensing.js',
  'tests/test-sprint-39-error-boundaries.js',
  'tests/test-sprint-40-accessibility.js',
];

console.log('🚀 Running Master Cumulative Regression (Sprints 1 through 40)...\n');

let passedSuites = 0;
const totalSuites = SPRINT_TESTS.length;

for (const testFile of SPRINT_TESTS) {
  const fullPath = path.join(ROOT, testFile);
  try {
    process.stdout.write(`▶ Executing ${testFile}... `);
    execSync(`node "${fullPath}"`, { stdio: 'pipe', cwd: ROOT });
    console.log('✅ PASS');
    passedSuites++;
  } catch (err) {
    console.log('❌ FAIL');
    console.error(`\nFailure in ${testFile}:`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    process.exit(1);
  }
}

console.log(`\n=============================================================`);
console.log(`🏆 ALL ${passedSuites}/${totalSuites} SPRINT SUITES PASSED WITH ZERO REGRESSIONS!`);
console.log(`=============================================================\n`);
