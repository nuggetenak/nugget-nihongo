#!/usr/bin/env node
/**
 * merge-grammar.js — Merge grammar category files back into monolithic grammar-nX.js
 * Run: node scripts/merge-grammar.js
 */
const fs = require('fs');
const path = require('path');

const REPO     = path.join(__dirname, '..');
const OUT_DIR  = path.join(REPO, 'public/data/grammar');
const LEVELS   = ['n5', 'n4', 'n3', 'n2', 'n1'];
const GROUPS   = ['tense-aspect','verb-forms','conditionals','modality','negation-extent',
                  'connectives','nouns-predicates','desire-social','particles','adverbs','expressions','misc'];

const VAR = { n5:'window.grammarN5', n4:'window.grammarN4', n3:'window.grammarN3', n2:'window.grammarN2', n1:'window.grammarN1' };

function extractEntries(raw) {
  // Find the opening [ of the exported array (after `= [`)
  const eqBracket = raw.indexOf('= [');
  if (eqBracket === -1) return '';
  const arrStart = raw.indexOf('[', eqBracket);
  // Find the LAST ] in the file (the closing bracket of the array)
  const arrEnd = raw.lastIndexOf(']');
  if (arrEnd <= arrStart) return '';
  return raw.slice(arrStart + 1, arrEnd).trim();
}
function ensureTrailingComma(block) {
  const t = block.trimEnd();
  return t.endsWith(',') ? t : t + ',';
}

for (const level of LEVELS) {
  const levelDir = path.join(OUT_DIR, level);
  if (!fs.existsSync(levelDir)) continue;

  const sections = [];
  let totalEntries = 0;

  for (const group of GROUPS) {
    const f = path.join(levelDir, `${level}-${group}.js`);
    if (!fs.existsSync(f)) continue;
    const raw = fs.readFileSync(f, 'utf-8');
    const block = extractEntries(raw);
    if (!block) continue;
    const count = (block.match(/id\s*:\s*'gn\d-/g) || []).length;
    totalEntries += count;
    sections.push({ group, block: ensureTrailingComma(block), count });
  }

  if (!sections.length) { console.log(`⚠️  No sections for ${level}`); continue; }

  const bodyParts = sections.map(({ group, block, count }) =>
    `  // ── ${group.toUpperCase()} (${count}) ${'─'.repeat(35)}\n\n${block}`
  );
  const fullBody = bodyParts.join('\n\n').replace(/,(\s*\n\s*\n\s*];?\s*$)/m, '$1').replace(/,\s*$/, '');

  const now = new Date().toISOString().slice(0,10);
  const output = `// ${'═'.repeat(62)}
//  grammar-${level}.js — Nugget Nihongo · JLPT ${level.toUpperCase()} Grammar
//  AUTO-GENERATED — DO NOT EDIT DIRECTLY
//  Edit: public/data/grammar/${level}/*.js  then run: node scripts/merge-grammar.js
//  Entries: ${totalEntries} | Generated: ${now}
// ${'═'.repeat(62)}

${VAR[level]} = [

${fullBody}

];
`;
  const outPath = path.join(OUT_DIR, `grammar-${level}.js`);
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`✅ grammar-${level}.js — ${totalEntries} entries (${sections.map(s=>s.group+':'+s.count).join(', ')})`);
}
console.log('\nMerge complete.');
