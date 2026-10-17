// audit-sprint-4.js — Forensic Discovery for Sprint 4 Tickets
const fs = require('fs');
const path = require('path');

global.window = global;

console.log('=== 1. Grammar Categories Audit ===');
const grammarFiles = [
  'public/data/grammar/grammar-n5.js',
  'public/data/grammar/grammar-n4.js',
  'public/data/grammar/grammar-n3.js',
  'public/data/grammar/grammar-n2.js',
  'public/data/grammar/grammar-n1.js',
];

const catCounts = {};
for (const gf of grammarFiles) {
  const content = fs.readFileSync(gf, 'utf8');
  eval(content);
}

const allGrammar = [
  ...(global.grammarN5 || []),
  ...(global.grammarN4 || []),
  ...(global.grammarN3 || []),
  ...(global.grammarN2 || []),
  ...(global.grammarN1 || []),
];

console.log(`Total grammar points: ${allGrammar.length}`);
for (const g of allGrammar) {
  catCounts[g.cat] = (catCounts[g.cat] || 0) + 1;
}
console.log('Category breakdown:\n', JSON.stringify(catCounts, null, 2));

console.log('\n=== 2. SSW Vocab Keys Audit ===');
const sswDir = 'public/data/vocab/ssw';
if (fs.existsSync(sswDir)) {
  const sswFiles = fs.readdirSync(sswDir).filter(f => f.endsWith('.js'));
  let missingMeaningId = 0;
  let totalSSWEntries = 0;
  for (const sf of sswFiles) {
    const content = fs.readFileSync(path.join(sswDir, sf), 'utf8');
    eval(content);
    // find window.vocabSSW_*
    for (const k of Object.keys(global)) {
      if (k.startsWith('vocabSSW_')) {
        const arr = global[k];
        if (Array.isArray(arr)) {
          totalSSWEntries += arr.length;
          arr.forEach(item => {
            if (!item.meaning_id && item.meaning) missingMeaningId++;
          });
        }
      }
    }
  }
  console.log(`SSW files: ${sswFiles.length}, Total entries: ${totalSSWEntries}, Missing meaning_id: ${missingMeaningId}`);
}

console.log('\n=== 3. Checking tests/test-curriculum-adapter.js ===');
const adapterTestPath = 'tests/test-curriculum-adapter.js';
if (fs.existsSync(adapterTestPath)) {
  console.log(`test-curriculum-adapter.js exists (${fs.statSync(adapterTestPath).size} bytes)`);
} else {
  console.log(`test-curriculum-adapter.js does NOT exist`);
}
