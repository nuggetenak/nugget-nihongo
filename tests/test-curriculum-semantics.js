#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════
//  test-curriculum-semantics.js — Semantic Curriculum & Taxonomy Test
//  Validates C-01, C-02, C-06, C-07, C-08, C-09
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

let pass = 0;
let fail = 0;

function assert(cond, msg) {
  if (cond) {
    pass++;
  } else {
    fail++;
    console.error('  FAIL:', msg);
  }
}

console.log('Testing curriculum semantics & taxonomy integrity...');

const ROOT = path.join(__dirname, '..');

// 1. SSW Curricula & Vocabulary Uniqueness (C-01)
const sswTracks = ['curriculum-ssw-construction', 'curriculum-ssw-food', 'curriculum-ssw-kaigo'];
sswTracks.forEach(track => {
  const jsonPath = path.join(ROOT, 'public', 'data', 'curriculum', `${track}.json`);
  assert(fs.existsSync(jsonPath), `Track file ${track}.json exists`);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  assert(data.units && data.units.length === 8, `${track} must have 8 units`);

  data.units.forEach((unit, uIdx) => {
    // Must NOT contain dummy generic verbs
    assert(!unit.vocab_ids.includes('vg-n4-00001'), `${track} unit ${uIdx + 1} must not contain generic vg-n4-00001 (動く)`);
    assert(!unit.vocab_ids.includes('vg-n4-00002'), `${track} unit ${uIdx + 1} must not contain generic vg-n4-00002 (動かす)`);

    // Must contain specialist prefix
    const prefix = track.includes('construction') ? 'v-ssw-const-' : (track.includes('food') ? 'v-ssw-food-' : 'v-ssw-kaigo-');
    const hasSpecialist = unit.vocab_ids.some(id => id.startsWith(prefix));
    assert(hasSpecialist, `${track} unit ${uIdx + 1} must include specialist vocabulary starting with ${prefix}`);

    unit.lessons.forEach((les, lIdx) => {
      assert(!les.vocab_ids.includes('vg-n4-00001'), `${track} unit ${uIdx + 1} lesson ${lIdx + 1} must not contain vg-n4-00001`);
      assert(!les.vocab_ids.includes('vg-n4-00002'), `${track} unit ${uIdx + 1} lesson ${lIdx + 1} must not contain vg-n4-00002`);
    });
  });
});

// 2. Grammar Taxonomy (C-07)
// Load grammar datasets
const gN5Path = path.join(ROOT, 'public', 'data', 'grammar', 'grammar-n5.js');
const gN4Path = path.join(ROOT, 'public', 'data', 'grammar', 'grammar-n4.js');

const win = {};
eval(fs.readFileSync(gN5Path, 'utf8').replace('window.grammarN5', 'win.gN5'));
eval(fs.readFileSync(gN4Path, 'utf8').replace('window.grammarN4', 'win.gN4'));

// Particles in N5 (gn5-00005 to gn5-00023)
const n5ParticleIds = ['gn5-00005', 'gn5-00006', 'gn5-00007', 'gn5-00008', 'gn5-00009', 'gn5-00010', 'gn5-00011', 'gn5-00012', 'gn5-00013', 'gn5-00014', 'gn5-00015', 'gn5-00016', 'gn5-00017', 'gn5-00018', 'gn5-00019', 'gn5-00020', 'gn5-00021', 'gn5-00022', 'gn5-00023'];
n5ParticleIds.forEach(id => {
  const item = win.gN5.find(g => g.id === id);
  assert(item, `N5 particle ${id} found in grammarN5`);
  if (item) {
    assert(item.cat === 'particle', `N5 particle ${id} cat must be 'particle' (got '${item.cat}')`);
    assert(item.cat !== 'te-form-use', `N5 particle ${id} must not be 'te-form-use'`);
  }
});

// Particles in N4 (gn4-00001 to gn4-00010)
const n4ParticleIds = ['gn4-00001', 'gn4-00002', 'gn4-00003', 'gn4-00004', 'gn4-00005', 'gn4-00006', 'gn4-00007', 'gn4-00008', 'gn4-00009', 'gn4-00010'];
n4ParticleIds.forEach(id => {
  const item = win.gN4.find(g => g.id === id);
  assert(item, `N4 particle ${id} found in grammarN4`);
  if (item) {
    assert(item.cat === 'particle', `N4 particle ${id} cat must be 'particle' (got '${item.cat}')`);
    assert(item.cat !== 'te-form-use', `N4 particle ${id} must not be 'te-form-use'`);
  }
});

// 3. Textbook Chapter Mappings Deduplication (C-09)
const bookFiles = [
  'book-minna-1.js',
  'book-minna-2.js',
  'book-irodori-a1.js',
  'book-irodori-a2-1.js',
  'book-irodori-a2-2.js'
];

bookFiles.forEach(file => {
  const filePath = path.join(ROOT, 'public', 'data', 'books', file);
  assert(fs.existsSync(filePath), `Book file ${file} exists`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Regex scan for any array with repeated items
  const arrayMatches = content.matchAll(/vocab_ids\s*:\s*\[([\s\S]*?)\]/g);
  for (const match of arrayMatches) {
    const raw = match[1];
    const ids = (raw.match(/['"](vg-[^'"]+)['"]/g) || []).map(s => s.replace(/['"]/g, ''));
    const unique = new Set(ids);
    assert(unique.size === ids.length, `${file} has duplicate vocab IDs: ${ids.length - unique.size} duplicates in unit`);
  }
});

// 4. N5 Curriculum Transparency (C-02, C-06)
const n5Curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'data', 'curriculum', 'curriculum-n5.json'), 'utf8'));
assert(n5Curriculum.meta.total_grammar_points === 94, 'N5 curriculum must declare 94 grammar points');
assert(n5Curriculum.meta.core_target_vocab_count === 124, 'N5 curriculum must declare 124 core target vocab items');
assert(n5Curriculum.desc.includes('124'), 'N5 curriculum description must mention 124 target vocabulary items');
assert(n5Curriculum.desc.includes('870'), 'N5 curriculum description must mention 870+ bank vocabulary items');

console.log(`\nCurriculum Semantics Results: PASS=${pass}, FAIL=${fail}`);
if (fail > 0) {
  process.exit(1);
}
