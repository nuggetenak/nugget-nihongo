const fs = require('fs');
const path = require('path');

const dir = 'public/data/staged-expansion/vocab';
const files = ['n5-staged.js', 'n4-staged.js', 'n3-staged.js', 'n2-staged.js', 'n1-staged.js'];
const meMap = new Map();

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const regex = /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)",\s*"romaji":\s*"([^"]+)",\s*"meaning_id":\s*"(me-[^"]+)",\s*"meaning_en":\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const [_, word, reading, romaji, meaning_id, meaning_en] = m;
    const rawEnglish = meaning_id.replace(/^me-/, '');
    if (!meMap.has(rawEnglish)) {
      meMap.set(rawEnglish, []);
    }
    meMap.get(rawEnglish).push({ word, reading, romaji, meaning_id, meaning_en });
  }
}

console.log(`Found ${meMap.size} unique English verb lemmas across 913 me- verbs.`);
const sorted = Array.from(meMap.keys()).sort();
fs.writeFileSync('scripts/me-verbs-inventory.json', JSON.stringify(Object.fromEntries(meMap), null, 2));
console.log('Saved inventory to scripts/me-verbs-inventory.json');
