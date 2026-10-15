const fs = require('fs');
const path = require('path');

const n2File = path.join(__dirname, '..', 'public', 'data', 'grammar', 'grammar-n2.js');
const content = fs.readFileSync(n2File, 'utf8');

// Load window.grammarN2
const sandbox = { window: {} };
eval(content.replace('window.grammarN2', 'sandbox.window.grammarN2'));
const grammar = sandbox.window.grammarN2 || [];

console.log('Total N2 entries:', grammar.length);

const patternMap = new Map();
for (const item of grammar) {
  const p = (item.pattern || '').trim();
  if (!patternMap.has(p)) patternMap.set(p, []);
  patternMap.get(p).push(item);
}

let dupCount = 0;
for (const [p, items] of patternMap.entries()) {
  if (items.length > 1) {
    dupCount++;
    console.log(`Pattern "${p}" has ${items.length} records:`, items.map(i => `${i.id} (cat: ${i.cat}, id_meaning: ${i.meaning?.id || i.meaning || ''})`));
  }
}
console.log(`Found ${dupCount} repeated patterns in N2`);
