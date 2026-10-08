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

const allGrammar = {};
const bidirectionalMap = {};

// Load all items
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

items.forEach(item => {
  if (item.id) {
    allGrammar[item.id] = item;
    bidirectionalMap[item.id] = new Set(item.confusion_pairs || []);
  }
});

// Enforce bidirectionality
items.forEach(item => {
  if (item.id && item.confusion_pairs) {
    item.confusion_pairs.forEach(targetId => {
      if (bidirectionalMap[targetId]) {
        bidirectionalMap[targetId].add(item.id);
      }
    });
  }
});

// Write back to files
GRAMMAR_FILES.forEach(f => {
  const fullPath = path.join(ROOT, f);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  let modified = false;
  // Replace confusion_pairs using a regex on each block
  content = content.replace(/(id\s*:\s*['"])(gn[1-5]-\d{5})(['"][^]*?)(]?\s*\}| {2,})/g, (match, p1, id, p3, p4) => {
    if (!bidirectionalMap[id]) return match;
    const newPairs = Array.from(bidirectionalMap[id]).filter(x => x !== id);
    if (newPairs.length === 0) return match;
    
    const newStr = `confusion_pairs: ['${newPairs.join("', '")}']`;
    if (match.includes('confusion_pairs')) {
      return match.replace(/confusion_pairs\s*:\s*\[.*?\]/, newStr);
    } else {
      // Need to inject it before the last comma or something
      // Since we know all generated items have confusion_pairs, this branch might not even hit
      return match;
    }
  });
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${f}`);
});
