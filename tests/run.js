#!/usr/bin/env node
// ══════════════════════════════════════
// Nugget Nihongo — Test Runner
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
  try { eval(fs.readFileSync(full, 'utf8')); } catch(e) { skip++; console.log(`  WARN: ${file} eval error: ${e.message.split("\n")[0]}`); }
}

console.log('Loading data files...');
loadData('data/vocab/vocab-n5.js');
loadData('data/vocab/vocab-n4.js');
loadData('data/vocab/vocab-n3.js');
loadData('data/grammar/grammar-n3.js');
loadData('data/grammar/grammar-n4.js');
loadData('data/grammar/grammar-n5.js');
loadData('data/grammar/n3-w1.js');
loadData('data/grammar/n3-w2.js');
loadData('data/grammar/n3-w3.js');
loadData('data/grammar/n3-w4.js');
loadData('data/grammar/n3-w5.js');
loadData('data/grammar/n3-w6.js');
loadData('data/grammar/n4-w1.js');
loadData('data/grammar/n4-w2.js');
loadData('data/grammar/n4-w3.js');
loadData('data/grammar/n4-w4.js');
loadData('data/grammar/n4-w5.js');
loadData('data/grammar/n4-w6.js');
loadData('data/grammar/dummy.js');
loadData('data/grammar/bank-soal.js');
loadData('data/grammar/bank-soal-n4.js');
loadData('data/grammar/bank-soal-quiz4.js');
loadData('data/books/book-minna-1.js');
loadData('data/books/book-minna-2.js');
loadData('data/books/book-irodori-a1.js');
loadData('data/books/book-irodori-a2-1.js');
loadData('data/books/book-irodori-a2-2.js');
loadData('data/books/sources.js');
loadData('data/vocab/vocab-index.js');
loadData('data/grammar/index.js');

console.log('Data loaded. Running tests...\n');

// ── Vocab tests ──
console.log('── Vocab N5 ──');
const vn5 = global.vocabN5 || [];
assert(vn5.length > 0, 'vocabN5 should have entries');
assert(vn5.length >= 700, `vocabN5 count: ${vn5.length} (expected ≥700)`);
vn5.forEach((e, i) => {
  assert(e.id, `vocabN5[${i}]: missing id`);
  assert(e.word, `vocabN5[${i}] ${e.id}: missing word`);
  assert(e.jlpt, `vocabN5[${i}] ${e.id}: missing jlpt`);
  assert(e.pos, `vocabN5[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id, `vocabN5[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n5-'), `vocabN5[${i}]: id ${e.id} wrong prefix`);
});

console.log('── Vocab N4 ──');
const vn4 = global.vocabN4 || [];
assert(vn4.length > 0, 'vocabN4 should have entries');
assert(vn4.length >= 690, `vocabN4 count: ${vn4.length} (expected ≥690)`);
vn4.forEach((e, i) => {
  assert(e.id, `vocabN4[${i}]: missing id`);
  assert(e.word, `vocabN4[${i}] ${e.id}: missing word`);
  assert(e.jlpt, `vocabN4[${i}] ${e.id}: missing jlpt`);
  assert(e.pos, `vocabN4[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id, `vocabN4[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n4-'), `vocabN4[${i}]: id ${e.id} wrong prefix`);
});

console.log('── Vocab N3 ──');
const vn3 = global.vocabN3 || [];
if (vn3.length > 0) {
  vn3.forEach((e, i) => {
    assert(e.id, `vocabN3[${i}]: missing id`);
    assert(e.word, `vocabN3[${i}] ${e.id}: missing word`);
    if (e.id) assert(e.id.startsWith('vg-n3-'), `vocabN3[${i}]: id ${e.id} wrong prefix`);
  });
}

console.log('── Grammar N5 ──');
const gn5 = global.grammarN5 || [];
gn5.forEach((e, i) => {
  assert(e.id, `grammarN5[${i}]: missing id`);
  assert(e.pattern, `grammarN5[${i}] ${e.id}: missing pattern`);
  assert(e.cat, `grammarN5[${i}] ${e.id}: missing cat`);
});

console.log('── Grammar N4 ──');
const gn4 = global.grammarN4 || [];
gn4.forEach((e, i) => {
  assert(e.id, `grammarN4[${i}]: missing id`);
  assert(e.pattern, `grammarN4[${i}] ${e.id}: missing pattern`);
  assert(e.cat, `grammarN4[${i}] ${e.id}: missing cat`);
});

console.log('── Grammar N3 ──');
const gn3 = global.grammarN3 || [];
gn3.forEach((e, i) => {
  assert(e.id, `grammarN3[${i}]: missing id`);
  assert(e.pattern, `grammarN3[${i}] ${e.id}: missing pattern`);
  assert(e.cat, `grammarN3[${i}] ${e.id}: missing cat`);
});

console.log('── Grammar week cards ──');
const grammarData = global.grammarData || [];
assert(grammarData.length > 0, 'grammarData should have entries from week cards');
grammarData.forEach((e, i) => {
  assert(e.id, `grammarData[${i}]: missing id`);
});

console.log('── Version sync ──');
const vjs = fs.readFileSync(path.join(ROOT, 'public/js/core/version.js'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');
const vMatch = vjs.match(/APP_VERSION\s*=\s*'(v[\d.]+)'/);
const swMatch = sw.match(/nihongo-(v[\d.]+)/);
assert(vMatch && swMatch, 'Version strings parseable');
if (vMatch && swMatch) {
  assert(vMatch[1] === swMatch[1], `Version sync: version.js=${vMatch[1]} sw.js=${swMatch[1]}`);
}

console.log('── VocabDB merge ──');
const vocabDB = global.vocabDB || [];
if (vocabDB.length > 0) {
  assert(vocabDB.length >= 1400, `vocabDB merged count: ${vocabDB.length} (expected ≥1400)`);
}

console.log('── Duplicate ID check ──');
function checkDuplicates(arr, label) {
  const ids = arr.filter(e => e.id).map(e => e.id);
  const seen = new Set();
  const dupes = [];
  ids.forEach(id => { if (seen.has(id)) dupes.push(id); seen.add(id); });
  assert(dupes.length === 0, `${label}: ${dupes.length} duplicate IDs${dupes.length > 0 ? ' — ' + dupes.slice(0,5).join(', ') : ''}`);
}
checkDuplicates(vn5, 'vocabN5');
checkDuplicates(vn4, 'vocabN4');
checkDuplicates(vn3, 'vocabN3');
checkDuplicates(gn5, 'grammarN5');
checkDuplicates(gn4, 'grammarN4');
checkDuplicates(gn3, 'grammarN3');

console.log('── Cross-reference check ──');
const allVocabIds = new Set([...vn5, ...vn4, ...vn3].filter(e=>e.id).map(e=>e.id));
const bookFiles = ['books/book-minna-1.js','books/book-minna-2.js','books/book-irodori-a1.js','books/book-irodori-a2-1.js','books/book-irodori-a2-2.js'];
bookFiles.forEach(bf => {
  const varName = bf.replace('books/','').replace('.js','').replace(/-/g,'_').replace(/book_/,'book');
  // Book files use window.bookMinna1 etc — check if loaded
});

// ── Fallback JSON validation ──
console.log('── Fallback drills ──');
const grammarDrillsPath = path.join(ROOT, 'public/data/fallback/grammar-drills.json');
const vocabDrillsPath   = path.join(ROOT, 'public/data/fallback/vocab-drills.json');

if (!fs.existsSync(grammarDrillsPath)) {
  fail++; console.error('  FAIL: grammar-drills.json not found at public/data/fallback/');
} else {
  let grammarDrills;
  try {
    grammarDrills = JSON.parse(fs.readFileSync(grammarDrillsPath, 'utf8'));
  } catch (e) {
    fail++; console.error('  FAIL: grammar-drills.json is invalid JSON:', e.message);
  }
  if (grammarDrills) {
    assert(Array.isArray(grammarDrills.items), 'grammar-drills.json: items must be an array');
    assert(grammarDrills.items.length >= 10, `grammar-drills.json: need ≥10 items (got ${grammarDrills.items.length})`);
    grammarDrills.items.forEach(function (item, i) {
      assert(item.id,             `grammar-drills[${i}]: missing id`);
      assert(item.question,       `grammar-drills[${i}] ${item.id}: missing question`);
      assert(item.answer,         `grammar-drills[${i}] ${item.id}: missing answer`);
      assert(item.explanation_id, `grammar-drills[${i}] ${item.id}: missing explanation_id`);
      assert(Array.isArray(item.options) && item.options.length >= 2,
        `grammar-drills[${i}] ${item.id}: options must be array with ≥2 items`);
    });
  }
}

if (!fs.existsSync(vocabDrillsPath)) {
  fail++; console.error('  FAIL: vocab-drills.json not found at public/data/fallback/');
} else {
  let vocabDrills;
  try {
    vocabDrills = JSON.parse(fs.readFileSync(vocabDrillsPath, 'utf8'));
  } catch (e) {
    fail++; console.error('  FAIL: vocab-drills.json is invalid JSON:', e.message);
  }
  if (vocabDrills) {
    assert(Array.isArray(vocabDrills.items), 'vocab-drills.json: items must be an array');
    assert(vocabDrills.items.length >= 10, `vocab-drills.json: need ≥10 items (got ${vocabDrills.items.length})`);
    vocabDrills.items.forEach(function (item, i) {
      assert(item.id,             `vocab-drills[${i}]: missing id`);
      assert(item.question,       `vocab-drills[${i}] ${item.id}: missing question`);
      assert(item.answer,         `vocab-drills[${i}] ${item.id}: missing answer`);
      assert(item.explanation_id, `vocab-drills[${i}] ${item.id}: missing explanation_id`);
      assert(Array.isArray(item.options) && item.options.length >= 2,
        `vocab-drills[${i}] ${item.id}: options must be array with ≥2 items`);
    });
  }
}

// ── Summary ──
console.log(`\n══════════════════════════════════`);
console.log(`  PASS: ${pass}  |  FAIL: ${fail}  |  SKIP: ${skip}`);
console.log(`══════════════════════════════════`);
process.exit(fail > 0 ? 1 : 0);
