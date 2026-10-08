const fs = require('fs');
const path = require('path');

const SCRATCH_DIR = path.join(__dirname, '../scratch');
const SHIFT = 63; // vg-n3-00673 + 63 = vg-n3-00736

let totalModified = 0;

for (let i = 12; i <= 45; i++) {
  const p = path.join(SCRATCH_DIR, `vocab_chunk_${i}.json`);
  if (!fs.existsSync(p)) continue;

  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const item of data) {
    const oldNum = parseInt(item.assigned_id.replace('vg-n3-', ''), 10);
    const newNum = oldNum + SHIFT;
    item.assigned_id = `vg-n3-${String(newNum).padStart(5, '0')}`;
    totalModified++;
  }

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

console.log(`Successfully reindexed ${totalModified} entries across chunks 12 to 45.`);

// Verify first and last
const c12 = JSON.parse(fs.readFileSync(path.join(SCRATCH_DIR, 'vocab_chunk_12.json'), 'utf8'));
const c45 = JSON.parse(fs.readFileSync(path.join(SCRATCH_DIR, 'vocab_chunk_45.json'), 'utf8'));

console.log(`Chunk 12 first ID: ${c12[0].assigned_id}`);
console.log(`Chunk 45 last ID: ${c45[c45.length - 1].assigned_id}`);
