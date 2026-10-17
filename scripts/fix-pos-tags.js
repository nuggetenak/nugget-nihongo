// fix-pos-tags.js — Normalize 1,007 non-canonical POS tags to Taxonomy v2 standards
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const vocabDir = path.join(ROOT, 'public/data/vocab');
const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];

const posMap = {
  'verb-godan': 'verb-u',
  'verb-ichidan': 'verb-ru',
  'conj': 'conjunction',
  'expr': 'expression',
  'adj-i': 'i-adj',
  'adj-na': 'na-adj'
};

let totalReplacements = 0;

for (const lvl of levels) {
  const dir = path.join(vocabDir, lvl);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  for (const f of files) {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let fileChanged = false;

    for (const [oldPos, newPos] of Object.entries(posMap)) {
      // Double quotes
      const doubleQuoteRegex = new RegExp(`"pos":\\s*"${oldPos}"`, 'g');
      const doubleMatches = content.match(doubleQuoteRegex);
      if (doubleMatches) {
        content = content.replace(doubleQuoteRegex, `"pos": "${newPos}"`);
        totalReplacements += doubleMatches.length;
        fileChanged = true;
      }

      // Single quotes
      const singleQuoteRegex = new RegExp(`'pos':\\s*'${oldPos}'`, 'g');
      const singleMatches = content.match(singleQuoteRegex);
      if (singleMatches) {
        content = content.replace(singleQuoteRegex, `'pos': '${newPos}'`);
        totalReplacements += singleMatches.length;
        fileChanged = true;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated partitioned file: ${lvl}/${f}`);
    }
  }
}

console.log(`\n🎉 Total POS replacements across partitioned files: ${totalReplacements}`);
