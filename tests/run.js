#!/usr/bin/env node
// ══════════════════════════════════════
// Nugget Nihongo — Test Runner
// Run: node tests/run.js
// ══════════════════════════════════════

const fs = require('fs');
const path = require('path');

global.window = global;
let pass = 0, fail = 0;

function assert(condition, msg) {
  if (condition) { pass++; }
  else { fail++; console.error('  FAIL:', msg); }
}

// ── Load data files ──
function loadData(file) {
  eval(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
}

console.log('Loading data files...');
loadData('data/vocab-n5.js');
loadData('data/vocab-n4.js');
loadData('data/vocab-n3.js');
loadData('data/grammar-n3.js');
loadData('data/grammar-n4.js');
loadData('data/grammar-n5.js');
loadData('data/book-minna-1.js');
loadData('data/book-minna-2.js');
loadData('data/book-irodori-a1.js');
loadData('data/book-irodori-a2-1.js');
loadData('data/book-irodori-a2-2.js');

// ── Test: Vocab schemas ──
console.log('\n[Vocab Schema Tests]');
[{name:'N5', arr:vocabN5}, {name:'N4', arr:vocabN4}, {name:'N3', arr:vocabN3}].forEach(({name, arr}) => {
  assert(arr && arr.length > 0, `${name} has entries`);
  const ids = new Set();
  arr.forEach((e, i) => {
    assert(e.id, `${name}[${i}] has id`);
    assert(e.word, `${name}[${i}] has word`);
    assert(e.jlpt, `${name}[${i}] has jlpt`);
    assert(e.pos, `${name}[${i}] has pos`);
    assert(!ids.has(e.id), `${name} duplicate id: ${e.id}`);
    ids.add(e.id);
    // Check ID format
    assert(e.id.startsWith('vg-'), `${name}[${i}] id format: ${e.id}`);
    // Check xrefs use correct format
    ['antonyms','synonyms','see_also'].forEach(field => {
      if (e[field]) {
        e[field].forEach(ref => {
          assert(!ref.startsWith('v-n'), `${name}[${i}].${field} broken ref: ${ref}`);
        });
      }
    });
  });
  console.log(`  ${name}: ${arr.length} entries checked`);
});

// ── Test: Grammar schemas ──
console.log('\n[Grammar Schema Tests]');
[{name:'N5', arr:grammarN5}, {name:'N4', arr:grammarN4}, {name:'N3', arr:grammarN3}].forEach(({name, arr}) => {
  assert(arr && arr.length > 0, `${name} grammar has entries`);
  const ids = new Set();
  arr.forEach((e, i) => {
    assert(e.id, `${name}[${i}] has id`);
    assert(e.pattern, `${name}[${i}] has pattern`);
    assert(e.cat, `${name}[${i}] has cat`);
    assert(e.examples && e.examples.length > 0, `${name}[${i}] has examples`);
    assert(!ids.has(e.id), `${name} grammar duplicate id: ${e.id}`);
    ids.add(e.id);
  });
  console.log(`  ${name}: ${arr.length} entries checked`);
});

// ── Test: Version sync ──
console.log('\n[Version Sync]');
const vjsContent = fs.readFileSync(path.join(__dirname, '..', 'js/core/version.js'), 'utf8');
const swContent = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
const vMatch = vjsContent.match(/APP_VERSION\s*=\s*'(v[\d.]+)'/);
const swMatch = swContent.match(/nihongo-(v[\d.]+)/);
assert(vMatch && swMatch, 'Can parse version strings');
if (vMatch && swMatch) {
  assert(vMatch[1] === swMatch[1], `Version sync: version.js=${vMatch[1]} sw.js=${swMatch[1]}`);
  console.log(`  Version: ${vMatch[1]}`);
}

// ── Summary ──
console.log(`\n${'═'.repeat(40)}`);
console.log(`RESULTS: ${pass} passed, ${fail} failed`);
console.log(`${'═'.repeat(40)}`);
process.exit(fail > 0 ? 1 : 0);
