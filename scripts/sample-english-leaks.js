const fs = require('fs');
const path = require('path');

const dir = 'public/data/staged-expansion/vocab';
const files = ['n5-staged.js', 'n4-staged.js', 'n3-staged.js', 'n2-staged.js', 'n1-staged.js'];
const samples = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const regex = /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)",\s*"romaji":\s*"([^"]+)",\s*"meaning_id":\s*"([^"]+)",\s*"meaning_en":\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const [_, word, reading, romaji, meaning_id, meaning_en] = m;
    if (meaning_id.trim() === meaning_en.trim()) {
      samples.push({ file, word, reading, romaji, meaning_en });
      if (samples.length >= 35) break;
    }
  }
  if (samples.length >= 35) break;
}

console.log(`Sample identical entries (${samples.length}):`);
samples.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.word} / ${s.reading}] "${s.meaning_en}"`);
});
