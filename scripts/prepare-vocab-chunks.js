/**
 * prepare-vocab-chunks.js — Split gap data into auditable chunks for the AI swarm.
 * 
 * Each chunk is ~50 words. For each word we provide:
 *   - word, reading, meaning_en (from reference + JMDict)
 *   - ent_seq (JMDict sequence for cross-reference)
 *   - target_level (n5/n4/n3)
 * 
 * The AI agents will produce fully-formed vocab entries matching our schema.
 */
const fs = require('fs');
const path = require('path');

const CHUNK_SIZE = 50;
const LEVELS = ['n5', 'n4', 'n3'];

// Load existing vocab to determine next ID
global.window = global;
require('../public/data/vocab/vocab-n5.js');
require('../public/data/vocab/vocab-n4.js');
require('../public/data/vocab/vocab-n3.js');

const nextId = {
  n5: window.vocabN5.length + 1,
  n4: window.vocabN4.length + 1,
  n3: window.vocabN3.length + 1,
};

console.log('Next IDs:', nextId);

let chunkIndex = 0;
const manifest = [];

for (const level of LEVELS) {
  const gapFile = `scratch/jlpt_gap_${level}.json`;
  if (!fs.existsSync(gapFile)) {
    console.log(`Skipping ${level} — no gap file found`);
    continue;
  }
  
  let gap = JSON.parse(fs.readFileSync(gapFile, 'utf8'));
  
  // Filter out the header row artifact (first line of CSV is header)
  gap = gap.filter(w => w.word !== 'expression' && w.reading !== 'reading');
  
  // Clean up meaning_en (strip tags like "JLPT JLPT_N5")
  gap.forEach(w => {
    if (w.meaning_en) {
      // Strip trailing ",JLPT JLPT_..." tags
      w.meaning_en = w.meaning_en.replace(/,\s*(Genki|JLPT|Intermediate_Japanese|JLPT_\w+|Genki_\w+|Intermediate_Japanese_\w+)[\s,]*/g, '').trim();
      // Remove trailing quotes
      w.meaning_en = w.meaning_en.replace(/^"(.*)"$/, '$1');
    }
  });
  
  console.log(`${level.toUpperCase()}: ${gap.length} words to process`);
  
  // Chunk
  for (let i = 0; i < gap.length; i += CHUNK_SIZE) {
    const chunk = gap.slice(i, i + CHUNK_SIZE);
    const startId = nextId[level] + i;
    
    // Prepare with assigned IDs
    const prepared = chunk.map((w, j) => ({
      assigned_id: `vg-${level}-${String(startId + j).padStart(5, '0')}`,
      word: w.word,
      reading: w.reading,
      meaning_en: w.meaning_en || (w.jmdict_meanings ? w.jmdict_meanings.join('; ') : ''),
      ent_seq: w.ent_seq,
      pos_raw: w.pos_raw || [],
      level: level,
    }));
    
    const chunkFile = `scratch/vocab_chunk_${chunkIndex}.json`;
    fs.writeFileSync(chunkFile, JSON.stringify(prepared, null, 2), 'utf8');
    
    manifest.push({
      chunkIndex,
      level,
      file: chunkFile,
      count: prepared.length,
      idRange: `${prepared[0].assigned_id} → ${prepared[prepared.length - 1].assigned_id}`,
    });
    
    chunkIndex++;
  }
}

// Save manifest
fs.writeFileSync('scratch/vocab_chunk_manifest.json', JSON.stringify(manifest, null, 2), 'utf8');

console.log(`\n=== CHUNKING COMPLETE ===`);
console.log(`Total chunks: ${manifest.length}`);
manifest.forEach(m => {
  console.log(`  Chunk ${m.chunkIndex}: ${m.level.toUpperCase()} — ${m.count} words (${m.idRange})`);
});
console.log(`\nManifest: scratch/vocab_chunk_manifest.json`);
