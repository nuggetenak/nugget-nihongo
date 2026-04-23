#!/usr/bin/env node
/**
 * merge-vocab.js — Merge category files back into monolithic vocab-nX.js
 * Run: node scripts/merge-vocab.js
 * Called by GitHub Actions before deploy.
 *
 * Input:  public/data/vocab/{n5,n4,n3,n2,n1}/*.js
 * Output: public/data/vocab/vocab-{n5,n4,n3,n2,n1}.js
 */

const fs = require('fs');
const path = require('path');

const REPO    = path.join(__dirname, '..');
const OUT_DIR = path.join(REPO, 'public/data/vocab');
const LEVELS  = ['n5', 'n4', 'n3', 'n2', 'n1'];
const CATS    = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

const VAR = {
  n5: 'window.vocabN5', n4: 'window.vocabN4', n3: 'window.vocabN3',
  n2: 'window.vocabN2', n1: 'window.vocabN1',
};

// Extract raw entries from a category file (content between [ and ])
function extractEntries(raw) {
  const m = raw.match(/\[\s*\n([\s\S]*?)\n\s*\];?\s*$/);
  if (!m) return '';
  return m[1].trim();
}

// Ensure entries are comma-separated — add trailing comma if missing
function ensureTrailingComma(block) {
  const trimmed = block.trimEnd();
  if (!trimmed.endsWith(',')) return trimmed + ',';
  return trimmed;
}

for (const level of LEVELS) {
  const levelDir = path.join(OUT_DIR, level);
  if (!fs.existsSync(levelDir)) continue;

  const sections = [];
  let totalEntries = 0;

  for (const cat of CATS) {
    const catFile = path.join(levelDir, `${level}-${cat}.js`);
    if (!fs.existsSync(catFile)) continue;

    const raw = fs.readFileSync(catFile, 'utf-8');
    const block = extractEntries(raw);
    if (!block) continue;

    // Count entries in this block
    const count = (block.match(/"id":\s*"vg-/g) || []).length +
                  (block.match(/id:\s*'vg-/g) || []).length;
    totalEntries += count;

    sections.push({ cat, block: ensureTrailingComma(block), count });
  }

  if (sections.length === 0) {
    console.log(`⚠️  No sections found for ${level}`);
    continue;
  }

  // Build merged array content — sections separated by category comments
  const bodyParts = sections.map(({ cat, block, count }) =>
    `  // ── ${cat.toUpperCase()} (${count}) ${'─'.repeat(40)}\n\n${block}`
  );

  // Last section already has trailing comma — remove it for the very last entry
  const fullBody = bodyParts.join('\n\n');
  // Remove the final trailing comma before the closing ]
  const cleanBody = fullBody.replace(/,(\s*\n\s*])$/m, '$1').replace(/,\s*$/, '');

  const now = new Date().toISOString().slice(0, 10);
  const output = `// ${'═'.repeat(62)}
//  vocab-${level}.js — Nugget Nihongo · JLPT ${level.toUpperCase()}
//  AUTO-GENERATED — DO NOT EDIT DIRECTLY
//  Edit: public/data/vocab/${level}/*.js  then run: node scripts/merge-vocab.js
//  Entries: ${totalEntries} | Generated: ${now}
// ${'═'.repeat(62)}

${VAR[level]} = [

${cleanBody}

];
`;

  const outPath = path.join(OUT_DIR, `vocab-${level}.js`);
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`✅ vocab-${level}.js — ${totalEntries} entries (${sections.map(s => s.cat + ':' + s.count).join(', ')})`);
}

console.log('\nMerge complete. Run: node tests/run.js to verify.');
// (Grammar merge is separate — see scripts/merge-grammar.js)
