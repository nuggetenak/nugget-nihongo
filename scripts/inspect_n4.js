const fs = require('fs');
const path = require('path');

const chunks = [6, 7, 8, 9, 10, 11];
let allEntries = [];

for (const c of chunks) {
  const p = path.join(__dirname, `../scratch/enriched_vocab_chunk_${c}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log(`Chunk ${c}: ${data.length} entries, range ${data[0].id} to ${data[data.length - 1].id}`);
  allEntries.push(...data);
}

console.log(`Total N4 entries in chunks 6-11: ${allEntries.length}`);
