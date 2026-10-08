const fs = require('fs');

function fix(file) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace('bagaimana (bentuk sopan dari どう)', 'bagaimana (bentuk sopan)');
  c = c.replace(/"meaning_id": "kilo; kilogram"/g, '"meaning_id": "kilogram, kilo (satuan berat)"');
  c = c.replace(/'meaning_id': 'kilo; kilogram'/g, "'meaning_id': 'kilogram, kilo (satuan berat)'");
  c = c.replace(/meaning_id:\s*'kilo; kilogram'/g, "meaning_id: 'kilogram, kilo (satuan berat)'");

  c = c.replace(/"meaning_id": "kilo; kilometer"/g, '"meaning_id": "kilometer, kilo (satuan jarak)"');
  c = c.replace(/'meaning_id': 'kilo; kilometer'/g, "'meaning_id': 'kilometer, kilo (satuan jarak)'");
  c = c.replace(/meaning_id:\s*'kilo; kilometer'/g, "meaning_id: 'kilometer, kilo (satuan jarak)'");

  c = c.replace(/"meaning_id": "gram"/g, '"meaning_id": "gram (satuan berat)"');
  c = c.replace(/'meaning_id': 'gram'/g, "'meaning_id': 'gram (satuan berat)'");
  c = c.replace(/meaning_id:\s*'gram'/g, "meaning_id: 'gram (satuan berat)'");

  fs.writeFileSync(file, c, 'utf8');
}

fix('scratch/enriched_vocab_chunk_0.json');
fix('scratch/enriched_vocab_chunk_1.json');
fix('public/data/vocab/n5/n5-adverbs.js');
fix('public/data/vocab/n5/n5-nouns.js');
console.log('Fixed 4 N5 errors.');
