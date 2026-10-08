/**
 * gap-analysis.js — Find JLPT vocabulary gaps
 * 
 * Strategy: Use our existing vocab as seed. Cross-reference with JMDict
 * to find words that exist in JMDict as "common" but are NOT in our database yet.
 * For N5/N4 we know roughly 800/700 words are expected. For N3, roughly 2000-3500.
 */
const fs = require('fs');
const path = require('path');

global.window = global;

// Load our current vocab
require('../public/data/vocab/vocab-n5.js');
require('../public/data/vocab/vocab-n4.js');
require('../public/data/vocab/vocab-n3.js');

const existingWords = new Set();
const existingSeqs = new Set();

[...window.vocabN5, ...window.vocabN4, ...window.vocabN3].forEach(v => {
  existingWords.add(v.word);
  if (v.reading) existingWords.add(v.reading);
  if (v.jmdict_seq) existingSeqs.add(String(v.jmdict_seq));
});

console.log(`Existing unique words/readings: ${existingWords.size}`);
console.log(`Existing JMDict sequences: ${existingSeqs.size}`);
console.log(`Current counts — N5: ${window.vocabN5.length}, N4: ${window.vocabN4.length}, N3: ${window.vocabN3.length}`);

// Load JMDict
console.log('Loading JMDict (this is 118MB, takes ~5s)...');
const jmdict = JSON.parse(fs.readFileSync('data-sources/jmdict-eng-3.6.2.json', 'utf8'));
console.log(`JMDict loaded: ${jmdict.words.length} entries`);

// Find common words NOT in our database
const commonMissing = [];
for (const entry of jmdict.words) {
  const word = entry.kanji?.[0]?.text || entry.kana?.[0]?.text || '';
  const reading = entry.kana?.[0]?.text || '';
  const isCommon = entry.kanji?.some(k => k.common) || entry.kana?.some(k => k.common);
  
  if (!isCommon) continue;
  if (existingWords.has(word) || existingWords.has(reading)) continue;
  if (existingSeqs.has(entry.id)) continue;
  
  // Get POS
  const pos = entry.sense?.[0]?.partOfSpeech || [];
  const glosses = [];
  entry.sense?.forEach(s => {
    s.gloss?.forEach(g => { if (g.lang === 'eng') glosses.push(g.text); });
  });
  
  if (glosses.length === 0) continue;
  
  commonMissing.push({
    ent_seq: entry.id,
    word,
    reading,
    meaning_en: glosses.slice(0, 4).join('; '),
    pos: pos.join(', '),
  });
}

console.log(`\nCommon JMDict entries NOT in our database: ${commonMissing.length}`);
console.log(`These are potential vocab expansion candidates.`);

// Save for reference
fs.writeFileSync('scratch/jmdict_common_missing.json', JSON.stringify(commonMissing, null, 2), 'utf8');
console.log(`Saved to scratch/jmdict_common_missing.json`);

// Sample first 20
console.log('\nSample (first 20):');
commonMissing.slice(0, 20).forEach(e => {
  console.log(`  ${e.word} (${e.reading}) — ${e.meaning_en.substring(0, 60)}`);
});
