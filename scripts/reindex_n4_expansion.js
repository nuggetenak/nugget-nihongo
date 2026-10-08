const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCRATCH_DIR = path.join(ROOT, 'scratch');
const N4_DIR = path.join(ROOT, 'public/data/vocab/n4');

// 1. Clean previous expansion entries from public/data/vocab/n4/*.js
const catFiles = ['n4-adjectives.js', 'n4-adverbs.js', 'n4-expressions.js', 'n4-nouns.js', 'n4-verbs.js'];

for (const f of catFiles) {
  const p = path.join(N4_DIR, f);
  const content = fs.readFileSync(p, 'utf8');

  // We want to remove objects that contain "added_v": "v15-expansion" or 'added_v': 'v15-expansion'
  // Since objects are comma-separated inside window.vocabN4_... = [ ... ];
  // Let's parse or split safely.
  // In our injection script, all expansion entries were appended as JSON objects at the end:
  // \n{\n  "id": "vg-n4-...\n  ...\n  "added_v": "v15-expansion",\n  ...\n},
  // Let's locate the first occurrence of "v15-expansion" or clean by regex.
  
  // Alternative: Match the variable name and array content
  const varMatch = content.match(/^(window\.vocabN4_\w+\s*=\s*\[)([\s\S]*?)(\];?\s*)$/m);
  if (!varMatch) {
    console.error(`Could not match array in ${f}`);
    continue;
  }
  const prefix = varMatch[1];
  const arrayBody = varMatch[2];
  const suffix = varMatch[3];

  // In arrayBody, let's filter out entries with 'v15-expansion' or "v15-expansion"
  // Let's evaluate or split.
  // Notice that existing entries have added_v: 'v15-migrated'. Only expansion entries have added_v: 'v15-expansion'.
  // All expansion entries were appended at the end!
  // Let's find the first index of `"added_v": "v15-expansion"` and see where that object begins.
  
  // Let's split by `},\n{` or parse.
  // Or even better: each injected expansion entry starts with `{\n  "id": "vg-n4-` and has `"added_v": "v15-expansion"`.
  const lines = content.split('\n');
  const keptLines = [];
  let inExpansionObj = false;
  let objBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('{') && !line.includes('//')) {
      if (inExpansionObj) {
        // flush previous buffer if not expansion, but inExpansionObj was true
      }
      objBuffer = [line];
      inExpansionObj = true;
    } else if (inExpansionObj) {
      objBuffer.push(line);
      if (line.trim().startsWith('}') || line.trim().startsWith('},')) {
        const fullObjStr = objBuffer.join('\n');
        if (fullObjStr.includes('v15-expansion')) {
          // Drop it!
        } else {
          keptLines.push(...objBuffer);
        }
        objBuffer = [];
        inExpansionObj = false;
      }
    } else {
      keptLines.push(line);
    }
  }

  // Ensure valid formatting before ];
  let cleanedContent = keptLines.join('\n');
  // Make sure trailing comma before ]; is handled cleanly
  cleanedContent = cleanedContent.replace(/,\s*,\s*\];/g, ',\n];');
  fs.writeFileSync(p, cleanedContent, 'utf8');
  console.log(`Cleaned expansion entries from ${f}`);
}

// 2. Shift IDs in scratch/enriched_vocab_chunk_{6..11}.json and fix meaning issues
const chunks = [6, 7, 8, 9, 10, 11];
const SHIFT = 5; // vg-n4-00688 becomes vg-n4-00693

for (const c of chunks) {
  const p = path.join(SCRATCH_DIR, `enriched_vocab_chunk_${c}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  for (const item of data) {
    const oldNum = parseInt(item.id.replace('vg-n4-', ''), 10);
    const newNum = oldNum + SHIFT;
    item.id = `vg-n4-${String(newNum).padStart(5, '0')}`;

    // Fix meaning issues:
    // いたす
    if (item.reading === 'いたす' || item.word === '致す' || item.meaning_id.includes('ragam merendahkan diri / kenjougo dari する')) {
      item.meaning_id = 'melakukan, mengerjakan (ragam merendahkan diri / kenjougo)';
    }
    // おいでになる
    if (item.reading === 'おいでになる' || item.meaning_id.includes('sonkeigo dari いる, いく, くる')) {
      item.meaning_id = 'ada; pergi; datang (ragam hormat / sonkeigo)';
    }
    // よろしい
    if (item.reading === 'よろしい' || item.meaning_id.includes('bentuk sopan dari いい')) {
      item.meaning_id = 'baik; boleh; berkenan (ragam sopan / teineigo)';
    }
    // ～ございます
    if (item.reading === '～ございます' || item.meaning_id.includes('teineigo dari あります / です')) {
      item.meaning_id = 'ada; adalah (ragam sangat sopan / teineigo)';
    }
    // ピアノ
    if (item.reading === 'ピアノ' || item.word === 'ピアノ' || item.meaning_id.trim() === 'piano') {
      item.meaning_id = 'piano (alat musik)';
    }
  }

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated Chunk ${c}: shifted by +${SHIFT}, fixed meanings.`);
}

console.log('Reindexing complete.');
