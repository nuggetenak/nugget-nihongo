// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint8-reflex-drills.js
//  Sprint 8: Tab 3 Dojo — Pilar 1: Sasana Drill Refleks Extraction
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 149: Dojo Pilar 1 Reflex Drills Modularization Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: ReflexDrillsPillar Component & Barrel Exports ─────────────
console.log('  Check 8.1: Verifying ReflexDrillsPillar source and barrel exports...');
const pillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'ReflexDrillsPillar.tsx');
assert(fs.existsSync(pillarPath), 'ReflexDrillsPillar.tsx must exist');
const pillarContent = fs.readFileSync(pillarPath, 'utf8');

assert(
  pillarContent.includes('export const ReflexDrillsPillar'),
  'ReflexDrillsPillar.tsx must export ReflexDrillsPillar functional component'
);
assert(
  pillarContent.includes('export interface ReflexDrillsPillarProps'),
  'ReflexDrillsPillar.tsx must export typed ReflexDrillsPillarProps'
);

const barrelPath = path.join(ROOT, 'src', 'features', 'dojo', 'index.ts');
const pillarsBarrelPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'index.ts');
assert(fs.existsSync(barrelPath), 'src/features/dojo/index.ts must exist');
assert(fs.existsSync(pillarsBarrelPath), 'src/features/dojo/pillars/index.ts must exist');

const barrelContent = fs.readFileSync(pillarsBarrelPath, 'utf8');
assert(
  barrelContent.includes("export { ReflexDrillsPillar } from './ReflexDrillsPillar'"),
  'Pillars barrel must re-export ReflexDrillsPillar'
);
console.log('  ✅ Check 8.1 passed: ReflexDrillsPillar component and barrel exports verified.');

// ── Check 2: 6 Core Workout Modes Invariant ───────────────────────────
console.log('  Check 8.2: Verifying 6 Core Workout Modes in ReflexDrillsPillar...');

// 1. Kanji Dojo
assert(pillarContent.includes('Kanji Dojo & Goresan'), 'Must contain Kanji Dojo & Goresan');
assert(pillarContent.includes("onOpenTool('kanji')"), 'Kanji card must invoke onOpenTool with kanji');

// 2. Flashcard 3D Refleks
assert(pillarContent.includes('Flashcard 3D Refleks'), 'Must contain Flashcard 3D Refleks');
assert(pillarContent.includes("onStartQuizSession('flashcard')"), 'Flashcard card must invoke onStartQuizSession with flashcard');

// 3. Kuis Pilihan Ganda
assert(pillarContent.includes('Kuis Pilihan Ganda'), 'Must contain Kuis Pilihan Ganda');
assert(pillarContent.includes("onStartQuizSession('multiple-choice')"), 'MCQ card must invoke onStartQuizSession with multiple-choice');

// 4. Susun Kalimat (Bunsetsu)
assert(pillarContent.includes('Susun Kalimat (Bunsetsu)'), 'Must contain Susun Kalimat (Bunsetsu)');
assert(pillarContent.includes("onStartQuizSession('rearrange')"), 'Rearrange card must invoke onStartQuizSession with rearrange');

// 5. Isian Rumpang (Cloze)
assert(pillarContent.includes('Isian Rumpang (Cloze)'), 'Must contain Isian Rumpang (Cloze)');
assert(pillarContent.includes("onStartQuizSession('fill-in')"), 'Cloze card must invoke onStartQuizSession with fill-in');

// 6. Menyimak Kilat (Audio Drill)
assert(pillarContent.includes('Menyimak Kilat (Audio Drill)'), 'Must contain Menyimak Kilat (Audio Drill)');
assert(pillarContent.includes("onStartQuizSession('listening')"), 'Audio Drill card must invoke onStartQuizSession with listening');

console.log('  ✅ Check 8.2 passed: All 6 workout modes fully wired.');

// ── Check 3: Accessibility & Mobile Touch Invariants ──────────────────
console.log('  Check 8.3: Verifying Accessibility (A11y) and Mobile Touch Ergonomics...');

assert(
  pillarContent.includes('role="button"') && pillarContent.includes('tabIndex={0}'),
  'Interactive drill cards must declare role="button" and tabIndex={0}'
);
assert(
  pillarContent.includes("e.key === 'Enter' || e.key === ' '"),
  'Interactive drill cards must support Enter and Space keyboard activation'
);
assert(
  pillarContent.includes('active:scale-95'),
  'Drill cards must have active:scale-95 micro-interaction'
);
assert(
  pillarContent.includes('min-h-[220px]'),
  'Drill cards must provide comfortable touch target area (min-h-[220px])'
);
assert(
  pillarContent.includes('aria-label={`Pilih Level ${lvl.toUpperCase()}`}'),
  'Level selector buttons must provide accessible aria-labels'
);
console.log('  ✅ Check 8.3 passed: A11y and touch ergonomics verified.');

// ── Check 4: MateriHubPage Clean Delegation ───────────────────────────
console.log('  Check 8.4: Verifying MateriHubPage clean mounting and prop forwarding...');
const materiHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
const materiHubContent = fs.readFileSync(materiHubPath, 'utf8');

assert(
  materiHubContent.includes('ReflexDrillsPillar') &&
  materiHubContent.includes("from '../features/dojo/pillars"),
  'MateriHubPage must import ReflexDrillsPillar'
);
assert(
  materiHubContent.includes("<ReflexDrillsPillar") &&
  materiHubContent.includes("selectedLevel={selectedLevel}") &&
  materiHubContent.includes("onSelectLevel={(lvl) => setSelectedLevel(lvl)}") &&
  materiHubContent.includes("onOpenTool={(tool) => handleOpenTool(tool as any)}") &&
  materiHubContent.includes("onStartQuizSession={(mode) => startQuizSession(mode)}"),
  'MateriHubPage must cleanly delegate dojoTab latihan to ReflexDrillsPillar'
);

console.log('  ✅ Check 8.4 passed: MateriHubPage delegation verified.');

console.log('🎉 ALL SPRINT 8 DRILL REFLEKS PILLAR CHECKS PASSED (4/4)!');
