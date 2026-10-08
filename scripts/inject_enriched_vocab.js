/**
 * inject_enriched_vocab.js — Inject AI-enriched vocabulary chunks into category files.
 *
 * Reads `scratch/enriched_vocab_chunk_*.json` files.
 * Appends entries to `public/data/vocab/{level}/{level}-{category}.js`.
 * Automatically dedupes by entry ID so it can be safely re-run.
 * Then calls `node scripts/merge-vocab.js`.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');
const SCRATCH_DIR = path.join(REPO_ROOT, 'scratch');
const VOCAB_DIR = path.join(REPO_ROOT, 'public/data/vocab');

function getCategory(pos) {
  const p = (pos || '').toLowerCase();
  if (p.startsWith('verb')) return 'verbs';
  if (p === 'i-adj' || p === 'na-adj' || p === 'adj-i' || p === 'adj-na') return 'adjectives';
  if (p === 'adverb') return 'adverbs';
  if (p === 'expr' || p === 'expression') return 'expressions';
  // default nouns, counters, particles, conjunctions
  return 'nouns';
}

function formatEntry(e) {
  return JSON.stringify(e, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // convert keys to unquoted JS identifiers if valid
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');
}

// Find all enriched chunk files
const chunkFiles = fs.readdirSync(SCRATCH_DIR)
  .filter(f => f.startsWith('enriched_vocab_chunk_') && f.endsWith('.json'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

console.log(`Found ${chunkFiles.length} enriched chunk file(s) to process.`);

let totalInjected = 0;
let totalSkipped = 0;
const perLevelCounts = {};

for (const cf of chunkFiles) {
  const filePath = path.join(SCRATCH_DIR, cf);
  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse ${cf}:`, err.message);
    continue;
  }

  if (!Array.isArray(entries)) continue;

  for (const entry of entries) {
    const level = (entry.jlpt || 'n5').toLowerCase();
    const cat = getCategory(entry.pos);
    const catFilePath = path.join(VOCAB_DIR, level, `${level}-${cat}.js`);

    if (!fs.existsSync(catFilePath)) {
      console.error(`❌ Target file not found: ${catFilePath}`);
      continue;
    }

    let fileContent = fs.readFileSync(catFilePath, 'utf8');

    // Dedup check: skip if ID already present
    if (fileContent.includes(`id: '${entry.id}'`) || fileContent.includes(`"id": "${entry.id}"`)) {
      totalSkipped++;
      continue;
    }

    // Format new entry
    const entryStr = JSON.stringify(entry, null, 2);

    // Locate the closing bracket `];`
    const closeIndex = fileContent.lastIndexOf('];');
    if (closeIndex === -1) {
      console.error(`❌ Closing ]; not found in ${catFilePath}`);
      continue;
    }

    const before = fileContent.slice(0, closeIndex).trimEnd();
    const needsComma = before.length > 0 && !before.endsWith(',') && !before.endsWith('[');

    const insertion = (needsComma ? ',\n\n' : '\n') + entryStr + ',\n';
    const updatedContent = before + insertion + '];\n';

    fs.writeFileSync(catFilePath, updatedContent, 'utf8');
    totalInjected++;
    perLevelCounts[level] = (perLevelCounts[level] || 0) + 1;
  }
}

console.log(`\n══════════════════════════════════════════════════════`);
console.log(`  VOCABULARY INJECTION SUMMARY`);
console.log(`══════════════════════════════════════════════════════`);
console.log(`Newly injected entries: ${totalInjected}`);
console.log(`Skipped (already exists): ${totalSkipped}`);
for (const [lv, cnt] of Object.entries(perLevelCounts)) {
  console.log(`  • ${lv.toUpperCase()}: ${cnt} entries added`);
}
console.log(`══════════════════════════════════════════════════════`);

// If entries were injected, run merge-vocab.js
if (totalInjected > 0) {
  console.log('\nRunning scripts/merge-vocab.js...');
  const mergeOut = execSync('node scripts/merge-vocab.js', { cwd: REPO_ROOT, encoding: 'utf8' });
  console.log(mergeOut);
}
