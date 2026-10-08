const fs = require('fs');
const path = require('path');

const files = ['adjectives', 'adverbs', 'expressions', 'nouns', 'verbs'];
const existingIds = new Set();
let maxId = 0;

for (const cat of files) {
  const p = path.join(__dirname, `../public/data/vocab/n4/n4-${cat}.js`);
  const content = fs.readFileSync(p, 'utf8');
  // Regex to match entries
  const matches = content.matchAll(/id:\s*['"](vg-n4-(\d+))['"]/g);
  for (const m of matches) {
    const id = m[1];
    const num = parseInt(m[2], 10);
    // Let's check if this is an expansion entry
    // An expansion entry has added_v: 'v15-expansion'
    // Let's see the context around m.index
    const snippet = content.slice(m.index, m.index + 500);
    const isExpansion = snippet.includes('v15-expansion');
    if (!isExpansion) {
      existingIds.add(id);
      if (num > maxId) maxId = num;
    }
  }
}

console.log(`Original N4 entries count: ${existingIds.size}`);
console.log(`Max original N4 ID: vg-n4-${String(maxId).padStart(5, '0')} (${maxId})`);

// Find any existing IDs >= 688
const highIds = Array.from(existingIds).filter(id => {
  const num = parseInt(id.replace('vg-n4-', ''), 10);
  return num >= 685;
}).sort();
console.log('Original IDs >= 685:', highIds);
