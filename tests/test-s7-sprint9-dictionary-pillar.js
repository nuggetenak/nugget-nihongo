// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint9-dictionary-pillar.js
//  Sprint 9: Tab 3 Dojo — Pilar 2: Kamus & Indeks Referensi Extraction
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 150: Dojo Pilar 2 Dictionary & Reference Index Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Component & Barrel Exports ───────────────────────────────
console.log('  Check 9.1: Verifying DictionaryPillar source and barrel exports...');
const pillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'DictionaryPillar.tsx');
assert(fs.existsSync(pillarPath), 'DictionaryPillar.tsx must exist');
const pillarContent = fs.readFileSync(pillarPath, 'utf8');

assert(
  pillarContent.includes('export const DictionaryPillar'),
  'DictionaryPillar.tsx must export DictionaryPillar component'
);
assert(
  pillarContent.includes('export interface DictionaryPillarProps'),
  'DictionaryPillar.tsx must export DictionaryPillarProps'
);
assert(
  pillarContent.includes('export const VOCAB_POS_FILTERS'),
  'DictionaryPillar.tsx must export VOCAB_POS_FILTERS taxonomy'
);

const barrelPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'index.ts');
const barrelContent = fs.readFileSync(barrelPath, 'utf8');
assert(
  barrelContent.includes('DictionaryPillar'),
  'Pillars barrel must re-export DictionaryPillar'
);
console.log('  ✅ Check 9.1 passed: Component & barrel exports verified.');

// ── Check 2: Pedagogical Scope & Features ─────────────────────────────
console.log('  Check 9.2: Verifying dual-track (JLPT + Freeway) and taxonomy...');

// Sub-tracks
assert(pillarContent.includes('Kamus JLPT') && pillarContent.includes('Jalur Freeway'), 'Must feature Kamus JLPT and Jalur Freeway sub-tracks');
assert(pillarContent.includes('21 Pola Paling Fundamental untuk Bertahan Hidup'), 'Freeway must include 21 fundamental survival patterns');

// Sub-tabs
assert(pillarContent.includes("activeTab === 'vocab'") && pillarContent.includes("activeTab === 'grammar'"), 'Must toggle between Vocab and Grammar');

// Canonical 7-category POS filter
assert(pillarContent.includes("id: 'verb'"), 'POS filter must contain verb');
assert(pillarContent.includes("id: 'adj'"), 'POS filter must contain adj');
assert(pillarContent.includes("id: 'noun'"), 'POS filter must contain noun');
assert(pillarContent.includes("id: 'adverb'"), 'POS filter must contain adverb');
assert(pillarContent.includes("id: 'counter'"), 'POS filter must contain counter');
assert(pillarContent.includes("id: 'conjunction'"), 'POS filter must contain conjunction');
assert(pillarContent.includes("id: 'expression'"), 'POS filter must contain expression');
assert(pillarContent.includes("!pos.includes('adverb')"), 'Verb filter must exclude adverb disambiguation');

// Typography integration
assert(pillarContent.includes('<BudouxText'), 'Must integrate BudouxText for line-breaking');
assert(pillarContent.includes('speakJapanese'), 'Must wire Japanese TTS pronunciation');

console.log('  ✅ Check 9.2 passed: Dual-track, taxonomy, and typography verified.');

// ── Check 3: A11y & Mobile Touch Ergonomics ───────────────────────────
console.log('  Check 9.3: Verifying Accessibility (A11y) & Touch Targets...');

assert(
  pillarContent.includes('role="button"') && pillarContent.includes('tabIndex={0}'),
  'Dictionary cards must declare role="button" and tabIndex={0}'
);
assert(
  pillarContent.includes("e.key === 'Enter' || e.key === ' '"),
  'Dictionary cards must support Enter and Space keyboard activation'
);
assert(
  pillarContent.includes('min-h-[40px]'),
  'Interactive buttons must ensure min-h-[40px] touch targets'
);
assert(
  pillarContent.includes('active:scale-95'),
  'Interactive elements must provide active scale feedback'
);

console.log('  ✅ Check 9.3 passed: Accessibility & touch ergonomics verified.');

// ── Check 4: MateriHubPage Clean Delegation ───────────────────────────
console.log('  Check 9.4: Verifying MateriHubPage delegation to DictionaryPillar...');
const materiHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
const materiHubContent = fs.readFileSync(materiHubPath, 'utf8');

assert(
  materiHubContent.includes('DictionaryPillar') &&
  materiHubContent.includes("from '../features/dojo/pillars"),
  'MateriHubPage must import DictionaryPillar'
);
assert(
  materiHubContent.includes('<DictionaryPillar') &&
  materiHubContent.includes('selectedLevel={selectedLevel}') &&
  materiHubContent.includes('onSelectLevel={(lvl) => setSelectedLevel(lvl)}') &&
  materiHubContent.includes('onOpenDetailModal={(item, type) => openDetailModal(item, type)}'),
  'MateriHubPage must mount DictionaryPillar with prop forwarding'
);

console.log('  ✅ Check 9.4 passed: MateriHubPage delegation verified.');

console.log('🎉 ALL SPRINT 9 DICTIONARY PILLAR CHECKS PASSED (4/4)!');
