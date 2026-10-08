const fs = require('fs');
const path = require('path');

const chunks = [6, 7, 8, 9, 10, 11];

for (const c of chunks) {
  const p = path.join(__dirname, `../scratch/enriched_vocab_chunk_${c}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const item of data) {
    if (/[一-龯ぁ-んァ-ヶ]/.test(item.meaning_id)) {
      console.log(`[JAPANESE_IN_MEANING] Chunk ${c} ${item.id} (${item.kanji || item.kana}): ${item.meaning_id}`);
    }
    if (item.meaning_id.trim().toLowerCase() === item.meaning_en.trim().toLowerCase()) {
      console.log(`[MEANING_EQ_EN] Chunk ${c} ${item.id} (${item.kanji || item.kana}): ${item.meaning_id}`);
    }
  }
}
