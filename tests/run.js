#!/usr/bin/env node
// ══════════════════════════════════════
// Nugget Nihongo — Test Runner (Architecture v3)
// Run: node tests/run.js
// ══════════════════════════════════════

const fs = require('fs');
const path = require('path');

global.window = global;
let pass = 0, fail = 0, skip = 0;

function assert(condition, msg) {
  if (condition) { pass++; }
  else { fail++; console.error('  FAIL:', msg); }
}

// ── Load data files ──
const ROOT = path.join(__dirname, '..');
function loadData(file) {
  const full = path.join(ROOT, 'public', file);
  if (!fs.existsSync(full)) { skip++; console.log(`  SKIP: ${file} (not found)`); return; }
  try { eval(fs.readFileSync(full, 'utf8')); } catch(e) { skip++; console.log(`  WARN: ${file} eval error: ${e.message.split('\n')[0]}`); }
}

console.log('Loading data files...');
loadData('data/vocab/vocab-n5.js');
loadData('data/vocab/vocab-n4.js');
loadData('data/vocab/vocab-n3.js');
loadData('data/vocab/vocab-n2.js');
loadData('data/vocab/vocab-n1.js');
loadData('data/grammar/grammar-n5.js');
loadData('data/grammar/grammar-n4.js');
loadData('data/grammar/grammar-n3.js');
loadData('data/grammar/grammar-n2.js');
loadData('data/grammar/grammar-n1.js');
loadData('data/books/book-minna-1.js');
loadData('data/books/book-minna-2.js');
loadData('data/books/book-irodori-a1.js');
loadData('data/books/book-irodori-a2-1.js');
loadData('data/books/book-irodori-a2-2.js');
loadData('data/books/sources.js');
loadData('data/vocab/vocab-index.js');
loadData('data/grammar/grammar-index.js');

console.log('Data loaded. Running tests...\n');

// ── Vocab N5 ──
console.log('── Vocab N5 ──');
const vn5 = global.vocabN5 || [];
assert(vn5.length > 0,   'vocabN5 should have entries');
assert(vn5.length >= 700, `vocabN5 count: ${vn5.length} (expected ≥700)`);
vn5.forEach((e, i) => {
  assert(e.id,          `vocabN5[${i}]: missing id`);
  assert(e.word,        `vocabN5[${i}] ${e.id}: missing word`);
  assert(e.jlpt,        `vocabN5[${i}] ${e.id}: missing jlpt`);
  assert(e.pos,         `vocabN5[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id,  `vocabN5[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n5-'), `vocabN5[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N4 ──
console.log('── Vocab N4 ──');
const vn4 = global.vocabN4 || [];
assert(vn4.length > 0,   'vocabN4 should have entries');
assert(vn4.length >= 690, `vocabN4 count: ${vn4.length} (expected ≥690)`);
vn4.forEach((e, i) => {
  assert(e.id,          `vocabN4[${i}]: missing id`);
  assert(e.word,        `vocabN4[${i}] ${e.id}: missing word`);
  assert(e.jlpt,        `vocabN4[${i}] ${e.id}: missing jlpt`);
  assert(e.pos,         `vocabN4[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id,  `vocabN4[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n4-'), `vocabN4[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N3 ──
console.log('── Vocab N3 ──');
const vn3 = global.vocabN3 || [];
assert(vn3.length > 0, 'vocabN3 should have entries (70 expected)');
vn3.forEach((e, i) => {
  assert(e.id,   `vocabN3[${i}]: missing id`);
  assert(e.word, `vocabN3[${i}] ${e.id}: missing word`);
  if (e.id) assert(e.id.startsWith('vg-n3-'), `vocabN3[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N2 (seed data) ──
console.log('── Vocab N2 (seed) ──');
const vn2 = global.vocabN2 || [];
if (vn2.length > 0) {
  vn2.forEach((e, i) => {
    assert(e.id,   `vocabN2[${i}]: missing id`);
    assert(e.word, `vocabN2[${i}] ${e.id}: missing word`);
    if (e.id) assert(e.id.startsWith('vg-n2-'), `vocabN2[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: vocabN2 empty (seed data not yet populated)');
}

// ── Vocab N1 (seed data) ──
console.log('── Vocab N1 (seed) ──');
const vn1 = global.vocabN1 || [];
if (vn1.length > 0) {
  vn1.forEach((e, i) => {
    assert(e.id,   `vocabN1[${i}]: missing id`);
    assert(e.word, `vocabN1[${i}] ${e.id}: missing word`);
    if (e.id) assert(e.id.startsWith('vg-n1-'), `vocabN1[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: vocabN1 empty (seed data not yet populated)');
}

// ── Grammar N5 ──
console.log('── Grammar N5 ──');
const gn5 = global.grammarN5 || [];
assert(gn5.length > 0, 'grammarN5 should have entries');
gn5.forEach((e, i) => {
  assert(e.id,      `grammarN5[${i}]: missing id`);
  assert(e.pattern, `grammarN5[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN5[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn5-'), `grammarN5[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N4 ──
console.log('── Grammar N4 ──');
const gn4 = global.grammarN4 || [];
assert(gn4.length > 0, 'grammarN4 should have entries');
gn4.forEach((e, i) => {
  assert(e.id,      `grammarN4[${i}]: missing id`);
  assert(e.pattern, `grammarN4[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN4[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn4-'), `grammarN4[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N3 ──
console.log('── Grammar N3 ──');
const gn3 = global.grammarN3 || [];
assert(gn3.length > 0, 'grammarN3 should have entries');
gn3.forEach((e, i) => {
  assert(e.id,      `grammarN3[${i}]: missing id`);
  assert(e.pattern, `grammarN3[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN3[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn3-'), `grammarN3[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N2 (seed data) ──
console.log('── Grammar N2 (seed) ──');
const gn2 = global.grammarN2 || [];
if (gn2.length > 0) {
  gn2.forEach((e, i) => {
    assert(e.id,      `grammarN2[${i}]: missing id`);
    assert(e.pattern, `grammarN2[${i}] ${e.id}: missing pattern`);
    if (e.id) assert(e.id.startsWith('gn2-'), `grammarN2[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: grammarN2 empty (seed data not yet populated)');
}

// ── Grammar DB (Architecture v3) ──
console.log('── Grammar DB v3 ──');
const grammarDB = global.grammarDB || global.grammarData || [];
assert(grammarDB.length > 0, 'grammarDB (window.grammarDB) should have entries after grammar-index.js');
assert(grammarDB.length >= 273, `grammarDB count: ${grammarDB.length} (expected ≥273 for N5+N4+N3)`);

// ── VocabDB merge ──
console.log('── VocabDB merge ──');
const vocabDB = global.vocabDB || [];
assert(vocabDB.length >= 1400, `vocabDB merged count: ${vocabDB.length} (expected ≥1400 for N5+N4+N3)`);

// ── Version sync ──
console.log('── Version sync ──');
const vjs = fs.readFileSync(path.join(ROOT, 'public/js/core/version.js'), 'utf8');
const sw  = fs.readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');
const vMatch  = vjs.match(/APP_VERSION\s*=\s*'(v[\d.]+)'/);
const swMatch = sw.match(/nihongo-(v[\d.]+)/);
assert(vMatch && swMatch, 'Version strings parseable');
if (vMatch && swMatch) {
  assert(vMatch[1] === swMatch[1], `Version sync: version.js=${vMatch[1]} sw.js=${swMatch[1]}`);
}

// ── Duplicate ID check ──
console.log('── Duplicate ID check ──');
function checkDuplicates(arr, label) {
  const ids = arr.filter(e => e.id).map(e => e.id);
  const seen = new Set();
  const dupes = [];
  ids.forEach(id => { if (seen.has(id)) dupes.push(id); seen.add(id); });
  assert(dupes.length === 0,
    `${label}: ${dupes.length} duplicate IDs${dupes.length > 0 ? ' — ' + dupes.slice(0, 5).join(', ') : ''}`);
}
checkDuplicates(vn5, 'vocabN5');
checkDuplicates(vn4, 'vocabN4');
checkDuplicates(vn3, 'vocabN3');
checkDuplicates(gn5, 'grammarN5');
checkDuplicates(gn4, 'grammarN4');
checkDuplicates(gn3, 'grammarN3');

// ── Fallback drills ──
console.log('── Fallback drills ──');
['grammar-drills.json', 'vocab-drills.json'].forEach(filename => {
  const fullPath = path.join(ROOT, 'public/data/fallback', filename);
  if (!fs.existsSync(fullPath)) {
    fail++; console.error(`  FAIL: ${filename} not found at public/data/fallback/`); return;
  }
  let drills;
  try { drills = JSON.parse(fs.readFileSync(fullPath, 'utf8')); }
  catch (e) { fail++; console.error(`  FAIL: ${filename} invalid JSON:`, e.message); return; }

  assert(Array.isArray(drills.items), `${filename}: items must be array`);
  assert(drills.items.length >= 10,   `${filename}: need ≥10 items (got ${drills.items.length})`);
  drills.items.forEach((item, i) => {
    assert(item.id,             `${filename}[${i}]: missing id`);
    assert(item.question,       `${filename}[${i}] ${item.id}: missing question`);
    assert(item.answer,         `${filename}[${i}] ${item.id}: missing answer`);
    assert(item.explanation_id, `${filename}[${i}] ${item.id}: missing explanation_id`);
    assert(Array.isArray(item.options) && item.options.length >= 2,
      `${filename}[${i}] ${item.id}: options must be array with ≥2 items`);
  });
});

// ── Book lens cross-reference integrity (Plan C) ──
console.log('── Book lens cross-reference ──');
loadData('data/books/book-irodori-a1.js');
loadData('data/books/book-irodori-a2-1.js');
loadData('data/books/book-irodori-a2-2.js');
loadData('data/books/book-minna-1.js');
loadData('data/books/book-minna-2.js');

const vocabIdSet = new Set([
  ...(global.vocabN5 || []),
  ...(global.vocabN4 || []),
  ...(global.vocabN3 || []),
  ...(global.vocabN2 || []),
  ...(global.vocabN1 || []),
].map(e => e.id));

const bookLenses = [
  { obj: global.bookIrodoriA1,  name: 'bookIrodoriA1' },
  { obj: global.bookIrodoriA21, name: 'bookIrodoriA21' },
  { obj: global.bookIrodoriA22, name: 'bookIrodoriA22' },
  { obj: global.bookMinna1,     name: 'bookMinna1' },
  { obj: global.bookMinna2,     name: 'bookMinna2' },
];
bookLenses.forEach(({ obj, name }) => {
  if (!obj) { skip++; console.log(`  SKIP: ${name} not loaded`); return; }
  const units = obj.units || obj.chapters || {};
  let broken = 0;
  Object.entries(units).forEach(([unitKey, unit]) => {
    (unit.vocab_ids || []).forEach(id => {
      if (!vocabIdSet.has(id)) {
        broken++;
        if (broken <= 3) console.error(`  FAIL: ${name} unit ${unitKey}: id '${id}' not in vocabDB`);
      }
    });
  });
  if (broken > 3) console.error(`  FAIL: ${name}: ${broken} broken refs total (showing first 3)`);
  assert(broken === 0, `${name}: ${broken} vocab_ids not found in vocabDB`);
});

// ── Summary ──
console.log(`\n══════════════════════════════════`);
console.log(`  PASS: ${pass}  |  FAIL: ${fail}  |  SKIP: ${skip}`);
console.log(`══════════════════════════════════`);
process.exit(fail > 0 ? 1 : 0);
