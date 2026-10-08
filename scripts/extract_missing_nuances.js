const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Provide file path');
  process.exit(1);
}

global.window = {};
const text = fs.readFileSync(file, 'utf8');
try { eval(text); } catch(e) { console.error(e); process.exit(1); }

const key = Object.keys(global.window)[0];
const items = global.window[key];

const missing = items.filter(v => !v.nuance || v.nuance.length < 10).map(v => ({
  id: v.id,
  word: v.word,
  reading: v.reading,
  meaning_en: v.meaning_en
}));

if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');

if (missing.length === 0) {
  console.log(`No missing nuances in ${file}`);
  process.exit(0);
}

const CHUNK_SIZE = 50;
let chunkIndex = 0;

for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
  const chunk = missing.slice(i, i + CHUNK_SIZE);
  const out = `scratch/missing_${path.basename(file).replace('.js', '')}_${chunkIndex}.json`;
  fs.writeFileSync(out, JSON.stringify(chunk, null, 2));
  console.log(`Extracted ${chunk.length} items to ${out}`);
  chunkIndex++;
}
