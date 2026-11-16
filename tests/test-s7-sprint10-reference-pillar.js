// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint10-reference-pillar.js
//  Sprint 10: Tab 3 Dojo — Pilar 3: Pustaka Referensi Extraction
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 151: Dojo Pilar 3 Reference Library & Tools Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: Component & Barrel Exports ───────────────────────────────
console.log('  Check 10.1: Verifying ReferencePillar source and barrel exports...');
const pillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'ReferencePillar.tsx');
assert(fs.existsSync(pillarPath), 'ReferencePillar.tsx must exist');
const pillarContent = fs.readFileSync(pillarPath, 'utf8');

assert(
  pillarContent.includes('export const ReferencePillar'),
  'ReferencePillar.tsx must export ReferencePillar component'
);
assert(
  pillarContent.includes('export const DOJO_TOOLS'),
  'ReferencePillar.tsx must export DOJO_TOOLS catalog'
);
assert(
  pillarContent.includes('export interface ReferencePillarProps'),
  'ReferencePillar.tsx must export ReferencePillarProps'
);

const barrelPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'index.ts');
const barrelContent = fs.readFileSync(barrelPath, 'utf8');
assert(
  barrelContent.includes('ReferencePillar') && barrelContent.includes('DOJO_TOOLS'),
  'Pillars barrel must re-export ReferencePillar and DOJO_TOOLS'
);
console.log('  ✅ Check 10.1 passed: Component & barrel exports verified.');

// ── Check 2: Pedagogical Scope & 11 Tools Invariant ───────────────────
console.log('  Check 10.2: Verifying 11 tools across Kemahiran Inti & Referensi Tata Bahasa...');

const toolIds = [
  'kanji', 'choukai', 'pitch', 'cat',
  'keigo', 'counters', 'conjugation', 'nuance', 'kotowaza',
  'kana', 'books'
];
for (const id of toolIds) {
  assert(pillarContent.includes(`id: '${id}'`), `ReferencePillar must contain tool ${id}`);
}

// 2 Categories
assert(pillarContent.includes("categoryId: 'kemahiran'"), 'Must define Kemahiran Inti categoryId');
assert(pillarContent.includes("categoryId: 'referensi'"), 'Must define Referensi categoryId');
assert(pillarContent.includes('Latihan Kemahiran Inti'), 'Must declare Latihan Kemahiran Inti title');
assert(pillarContent.includes('Peralatan & Referensi Tata Bahasa'), 'Must declare Peralatan & Referensi title');

// Category filter pills
assert(pillarContent.includes('Semua Alat (11)'), 'Must include Semua Alat (11) filter pill');
assert(pillarContent.includes('Kemahiran Inti (3)'), 'Must include Kemahiran Inti (3) filter pill');
assert(pillarContent.includes('Peralatan & Referensi (8)'), 'Must include Peralatan & Referensi (8) filter pill');

// 9 Textbook series mention
assert(
  pillarContent.includes('9 seri buku teks standar'),
  'Must include 9 textbook standard series'
);

console.log('  ✅ Check 10.2 passed: 11 tools and 2 categories verified.');

// ── Check 3: A11y & Mobile Touch Ergonomics ───────────────────────────
console.log('  Check 10.3: Verifying Accessibility (A11y) & Touch Ergonomics...');

assert(
  pillarContent.includes('role="button"') && pillarContent.includes('tabIndex={0}'),
  'Interactive tool cards must declare role="button" and tabIndex={0}'
);
assert(
  pillarContent.includes("e.key === 'Enter' || e.key === ' '"),
  'Tool cards must support Enter and Space keyboard activation'
);
assert(
  pillarContent.includes('min-h-[220px]'),
  'Tool cards must have min-h-[220px] comfortable target size'
);
assert(
  pillarContent.includes('active:scale-95'),
  'Interactive tool cards must provide active:scale-95 feedback'
);
assert(
  pillarContent.includes('aria-label={`${tool.title}: ${tool.desc}`}'),
  'Tool cards must provide descriptive aria-labels'
);

console.log('  ✅ Check 10.3 passed: A11y & touch ergonomics verified.');

// ── Check 4: MateriHubPage Clean Delegation ───────────────────────────
console.log('  Check 10.4: Verifying MateriHubPage delegation to ReferencePillar...');
const materiHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
const materiHubContent = fs.readFileSync(materiHubPath, 'utf8');

assert(
  materiHubContent.includes('ReferencePillar') &&
  materiHubContent.includes("from '../features/dojo/pillars"),
  'MateriHubPage must import ReferencePillar from features/dojo/pillars'
);
assert(
  materiHubContent.includes('<ReferencePillar onOpenTool={(toolId) => handleOpenTool(toolId)} />'),
  'MateriHubPage must mount ReferencePillar with tool open handler'
);

console.log('  ✅ Check 10.4 passed: MateriHubPage delegation verified.');

console.log('🎉 ALL SPRINT 10 REFERENCE PILLAR CHECKS PASSED (4/4)!');
