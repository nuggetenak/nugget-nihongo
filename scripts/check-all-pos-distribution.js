const fs = require('fs');
const path = require('path');

const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const CATS = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

for (const level of LEVELS) {
  for (const cat of CATS) {
    const f = path.join('public/data/vocab', level, `${level}-${cat}.js`);
    if (!fs.existsSync(f)) {
      console.log(`Missing file: ${f}`);
      continue;
    }
    const c = fs.readFileSync(f, 'utf8');
    const advCount = (c.match(/"pos":\s*"adverb"/g) || []).length;
    const verbCount = (c.match(/"pos":\s*"verb/g) || []).length;
    console.log(`${level}-${cat}: total ~${(c.match(/"id":/g)||[]).length}, advs: ${advCount}, verbs: ${verbCount}`);
  }
}
