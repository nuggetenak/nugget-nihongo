const fs = require('fs');
const path = require('path');

const SCRATCH_DIR = path.join(__dirname, '../scratch');
let totalEntries = 0;
const chunkStats = [];

for (let i = 12; i <= 45; i++) {
  const p = path.join(SCRATCH_DIR, `vocab_chunk_${i}.json`);
  if (!fs.existsSync(p)) {
    console.log(`Chunk ${i} does not exist!`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  totalEntries += data.length;
  chunkStats.push({
    chunk: i,
    count: data.length,
    firstId: data[0].assigned_id,
    lastId: data[data.length - 1].assigned_id,
    firstWord: data[0].word || data[0].reading,
    lastWord: data[data.length - 1].word || data[data.length - 1].reading
  });
}

console.log(`Found ${chunkStats.length} N3 chunks with total ${totalEntries} entries.`);
console.log('First 3 chunks:', chunkStats.slice(0, 3));
console.log('Last 3 chunks:', chunkStats.slice(-3));
