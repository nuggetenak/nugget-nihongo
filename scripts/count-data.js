const fs = require('fs');

const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
console.log('| Level | Vocab | Grammar |');
console.log('|-------|-------|---------|');

let totalVocab = 0;
let totalGrammar = 0;

levels.forEach(lvl => {
  const vFile = `public/data/vocab/vocab-${lvl}.js`;
  const gFile = `public/data/grammar/grammar-${lvl}.js`;
  const vCount = (fs.readFileSync(vFile, 'utf8').match(/["']?id["']?\s*:\s*["']vg-/g) || []).length;
  const gCount = (fs.readFileSync(gFile, 'utf8').match(/["']?id["']?\s*:\s*["']gn\d-/g) || []).length;
  totalVocab += vCount;
  totalGrammar += gCount;
  console.log(`| ${lvl.toUpperCase()} | ${vCount} | ${gCount} |`);
});

console.log(`| **Total** | **${totalVocab}** | **${totalGrammar}** |`);
