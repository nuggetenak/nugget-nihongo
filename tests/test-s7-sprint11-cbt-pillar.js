// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint11-cbt-pillar.js
//  Sprint 11: Tab 3 Dojo — Pilar 4: Simulator CBT Resmi Extraction
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 152: Dojo Pilar 4 CBT Simulator Pillar Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Component & Barrel Exports ───────────────────────────────
console.log('  Check 11.1: Verifying CbtSimulatorPillar source and barrel exports...');
const pillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'CbtSimulatorPillar.tsx');
assert(fs.existsSync(pillarPath), 'CbtSimulatorPillar.tsx must exist');
const pillarContent = fs.readFileSync(pillarPath, 'utf8');

assert(
  pillarContent.includes('export const CbtSimulatorPillar'),
  'CbtSimulatorPillar.tsx must export CbtSimulatorPillar component'
);
assert(
  pillarContent.includes('export interface CbtSimulatorPillarProps'),
  'CbtSimulatorPillar.tsx must export CbtSimulatorPillarProps'
);

const barrelPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'index.ts');
const barrelContent = fs.readFileSync(barrelPath, 'utf8');
assert(
  barrelContent.includes('CbtSimulatorPillar'),
  'Pillars barrel must re-export CbtSimulatorPillar'
);
console.log('  ✅ Check 11.1 passed: Component & barrel exports verified.');

// ── Check 2: 5 Official Simulators & ExamLmsHub Invariant ─────────────
console.log('  Check 11.2: Verifying 5 official exam simulators & ExamLmsHub...');

assert(pillarContent.includes('Simulasi Lengkap JLPT CBT (N5–N1)'), 'Must feature JLPT CBT simulator');
assert(pillarContent.includes('Simulasi JFT-Basic CBT (A1/A2)'), 'Must feature JFT-Basic simulator');
assert(pillarContent.includes('Simulasi Prometric Tokutei Ginou (SSW)'), 'Must feature Prometric Tokutei Ginou SSW simulator');
assert(pillarContent.includes('Simulator Menyimak Choukai (CBT Resmi)'), 'Must feature Choukai CBT simulator');
assert(pillarContent.includes('Tes Penempatan Adaptif CAT'), 'Must feature CAT Placement simulator');

assert(
  pillarContent.includes('id="exam-lms-doors"'),
  'Must include #exam-lms-doors anchor for smooth jump'
);
assert(
  pillarContent.includes('<ExamLmsHub'),
  'Must embed ExamLmsHub component'
);
assert(
  pillarContent.includes('onStartExerciseSet={onStartExerciseSet}'),
  'Must wire onStartExerciseSet to ExamLmsHub'
);

console.log('  ✅ Check 11.2 passed: 5 exam simulators & ExamLmsHub verified.');

// ── Check 3: A11y & Mobile Touch Ergonomics ───────────────────────────
console.log('  Check 11.3: Verifying Accessibility (A11y) & Touch Ergonomics...');

assert(
  pillarContent.includes('role="button"') && pillarContent.includes('tabIndex={0}'),
  'Simulator cards must declare role="button" and tabIndex={0}'
);
assert(
  pillarContent.includes("e.key === 'Enter' || e.key === ' '"),
  'Simulator cards must support Enter and Space keyboard activation'
);
assert(
  pillarContent.includes('min-h-[220px]'),
  'Simulator cards must have min-h-[220px] comfortable target size'
);
assert(
  pillarContent.includes('active:scale-95'),
  'Interactive simulator cards must provide active:scale-95 feedback'
);

console.log('  ✅ Check 11.3 passed: A11y & touch ergonomics verified.');

// ── Check 4: MateriHubPage Clean Delegation ───────────────────────────
console.log('  Check 11.4: Verifying MateriHubPage delegation to CbtSimulatorPillar...');
const materiHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
const materiHubContent = fs.readFileSync(materiHubPath, 'utf8');

assert(
  materiHubContent.includes('CbtSimulatorPillar') &&
  materiHubContent.includes("from '../features/dojo/pillars"),
  'MateriHubPage must import CbtSimulatorPillar from features/dojo/pillars'
);
assert(
  materiHubContent.includes('<CbtSimulatorPillar') &&
  materiHubContent.includes('onOpenTool={(toolId) => handleOpenTool(toolId as any)}') &&
  materiHubContent.includes('onStartExerciseSet={handleStartExerciseSet}') &&
  materiHubContent.includes('onStartQuizSession={(mode) => startQuizSession(mode)}'),
  'MateriHubPage must mount CbtSimulatorPillar with full callback forwarding'
);

console.log('  ✅ Check 11.4 passed: MateriHubPage delegation verified.');

console.log('🎉 ALL SPRINT 11 CBT SIMULATOR PILLAR CHECKS PASSED (4/4)!');
