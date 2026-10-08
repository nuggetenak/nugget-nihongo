const fs = require('fs');
const path = require('path');

const SCRATCH_DIR = path.join(__dirname, '../scratch');
let totalWords = 0;
const seenIds = new Set();
let issuesFound = 0;

for (let i = 12; i <= 45; i++) {
  const p = path.join(SCRATCH_DIR, `enriched_vocab_chunk_${i}.json`);
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing chunk ${i}`);
    issuesFound++;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  totalWords += data.length;

  for (const item of data) {
    // Check ID
    if (!item.id || !item.id.startsWith('vg-n3-')) {
      console.error(`❌ Invalid ID: ${item.id} in chunk ${i}`);
      issuesFound++;
    }
    if (seenIds.has(item.id)) {
      console.error(`❌ Duplicate ID: ${item.id} in chunk ${i}`);
      issuesFound++;
    }
    seenIds.add(item.id);

    // Check Japanese in meaning_id
    if (/[一-龯ぁ-んァ-ヶ]/.test(item.meaning_id)) {
      console.error(`❌ Japanese in meaning_id: ${item.id} (${item.word || item.reading}) -> "${item.meaning_id}"`);
      issuesFound++;
    }

    // Check meaning_id === meaning_en
    if (item.meaning_id.trim().toLowerCase() === (item.meaning_en || '').trim().toLowerCase()) {
      console.error(`❌ meaning_id === meaning_en: ${item.id} -> "${item.meaning_id}"`);
      issuesFound++;
    }

    // Check examples count
    if (!Array.isArray(item.examples) || item.examples.length < 2) {
      console.warn(`⚠️ Fewer than 2 examples: ${item.id}`);
    }

    // Check nuance
    if (!item.nuance || item.nuance.length < 10) {
      console.warn(`⚠️ Nuance too short: ${item.id}`);
    }
  }
}

console.log(`\n══════════════════════════════════════════════════════`);
console.log(`  N3 AUDIT REPORT (Chunks 12 - 45)`);
console.log(`══════════════════════════════════════════════════════`);
console.log(`Total Chunks Checked: 34`);
console.log(`Total Words:         ${totalWords}`);
console.log(`Unique IDs:          ${seenIds.size}`);
console.log(`Issues Found:        ${issuesFound}`);
console.log(`══════════════════════════════════════════════════════`);
