/**
 * download-jlpt-lists.js — Download JLPT reference word lists from elzup/jlpt-word-list
 * Then cross-reference with our existing vocab to find the exact gaps.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const LEVELS = ['n5', 'n4', 'n3'];
const BASE_URL = 'https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src';

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const entries = [];
  for (const line of lines) {
    // Format: 表現,ひょうげん,expression
    const parts = line.split(',');
    if (parts.length >= 2) {
      entries.push({
        word: parts[0].trim(),
        reading: parts[1].trim(),
        meaning_en: parts.slice(2).join(',').trim()
      });
    }
  }
  return entries;
}

async function main() {
  global.window = global;
  require('../public/data/vocab/vocab-n5.js');
  require('../public/data/vocab/vocab-n4.js');
  require('../public/data/vocab/vocab-n3.js');

  const ourWords = { n5: window.vocabN5, n4: window.vocabN4, n3: window.vocabN3 };

  // Build lookup sets per level
  const ourWordSets = {};
  for (const level of LEVELS) {
    ourWordSets[level] = new Set();
    ourWords[level].forEach(v => {
      ourWordSets[level].add(v.word);
      if (v.reading) ourWordSets[level].add(v.reading);
    });
  }

  // Also build a global set for cross-level dedup
  const allOurWords = new Set();
  Object.values(ourWords).flat().forEach(v => {
    allOurWords.add(v.word);
    if (v.reading) allOurWords.add(v.reading);
  });

  // Load JMDict for enrichment
  console.log('Loading JMDict for enrichment...');
  const jmdict = JSON.parse(fs.readFileSync('data-sources/jmdict-eng-3.6.2.json', 'utf8'));
  const jmIndex = new Map();
  for (const entry of jmdict.words) {
    for (const k of entry.kanji || []) jmIndex.set(k.text, entry);
    for (const k of entry.kana || []) {
      if (!jmIndex.has(k.text)) jmIndex.set(k.text, entry);
    }
  }
  console.log(`JMDict index: ${jmIndex.size} keys`);

  for (const level of LEVELS) {
    console.log(`\n=== ${level.toUpperCase()} ===`);
    const url = `${BASE_URL}/${level}.csv`;
    console.log(`Downloading ${url}...`);
    const csv = await downloadFile(url);
    const refWords = parseCSV(csv);
    console.log(`Reference list: ${refWords.length} words`);
    console.log(`Our database: ${ourWords[level].length} words`);

    // Find gaps: in reference list but NOT in our database
    const missing = [];
    for (const ref of refWords) {
      if (!allOurWords.has(ref.word) && !allOurWords.has(ref.reading)) {
        // Enrich from JMDict
        const jm = jmIndex.get(ref.word) || jmIndex.get(ref.reading);
        const enriched = {
          word: ref.word,
          reading: ref.reading,
          meaning_en: ref.meaning_en || '',
          ent_seq: jm?.id || null,
          pos_raw: jm?.sense?.[0]?.partOfSpeech || [],
          jmdict_meanings: jm ? jm.sense?.flatMap(s => s.gloss?.filter(g => g.lang === 'eng').map(g => g.text) || []).slice(0, 5) : [],
          is_common: jm?.kanji?.[0]?.common || jm?.kana?.[0]?.common || false,
        };
        missing.push(enriched);
      }
    }

    console.log(`Missing: ${missing.length} words`);
    
    // Save
    const outFile = `scratch/jlpt_gap_${level}.json`;
    fs.writeFileSync(outFile, JSON.stringify(missing, null, 2), 'utf8');
    console.log(`Saved to ${outFile}`);

    // Preview
    missing.slice(0, 5).forEach(m => {
      console.log(`  ${m.word} (${m.reading}) — ${m.meaning_en || m.jmdict_meanings?.join('; ') || '?'}`);
    });
  }
}

main().catch(console.error);
