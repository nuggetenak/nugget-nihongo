const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GRAMMAR_FILES = [
  'public/data/grammar/grammar-n5.js',
  'public/data/grammar/grammar-n4.js',
  'public/data/grammar/grammar-n3.js',
  'public/data/grammar/grammar-n2.js',
  'public/data/grammar/grammar-n1.js'
];

global.window = global;

GRAMMAR_FILES.forEach(f => {
  const fullPath = path.join(ROOT, f);
  eval(fs.readFileSync(fullPath, 'utf8'));
});

const items = [
  ...(global.grammarN5 || []),
  ...(global.grammarN4 || []),
  ...(global.grammarN3 || []),
  ...(global.grammarN2 || []),
  ...(global.grammarN1 || [])
];

const bidirectionalMap = {};
items.forEach(item => {
  if (item.id) {
    bidirectionalMap[item.id] = new Set(item.confusion_pairs || []);
  }
});

items.forEach(item => {
  if (item.id && item.confusion_pairs) {
    item.confusion_pairs.forEach(targetId => {
      if (bidirectionalMap[targetId]) {
        bidirectionalMap[targetId].add(item.id);
      }
    });
  }
});

const output = items.map(item => ({
  id: item.id,
  confusion_pairs: Array.from(bidirectionalMap[item.id]).filter(x => x !== item.id)
}));

fs.writeFileSync(path.join(ROOT, 'scratch/bidir_updates.json'), JSON.stringify(output, null, 2), 'utf8');
console.log("Wrote scratch/bidir_updates.json");
