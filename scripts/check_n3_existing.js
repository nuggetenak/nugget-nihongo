const fs = require('fs');
const path = require('path');

const files = ['adjectives', 'adverbs', 'expressions', 'nouns', 'verbs'];
const ids = [];

for (const cat of files) {
  const p = path.join(__dirname, `../public/data/vocab/n3/n3-${cat}.js`);
  const c = fs.readFileSync(p, 'utf8');
  const matches = c.matchAll(/(?:id|"id"):\s*['"](vg-n3-(\d+))['"]/g);
  for (const m of matches) {
    const num = parseInt(m[2], 10);
    if (num >= 670) ids.push(num);
  }
}

console.log('Existing N3 IDs >= 670 count:', ids.length);
console.log('Existing N3 IDs >= 670:', ids.sort((a,b)=>a-b));
