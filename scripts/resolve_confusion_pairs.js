const fs = require('fs');
const path = require('path');

// 1. Build a grammar database for fuzzy matching
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, callback);
    else callback(p);
  });
}

let files = [];
walk('public/data/grammar', p => {
  if (p.endsWith('.js') && !path.basename(p).startsWith('grammar-') && !p.includes('index')) {
    files.push(p);
  }
});

const grammarDb = [];
files.forEach(f => {
  global.window = {};
  eval(fs.readFileSync(f, 'utf8'));
  const key = Object.keys(global.window)[0];
  const items = global.window[key];
  items.forEach(i => grammarDb.push(i));
});

function cleanPattern(p) {
  return p.replace(/[〜/／()（）]/g, '').trim();
}

function findBestMatch(str) {
  if (!str) return null;
  const target = cleanPattern(str);
  if (!target) return null;

  let bestMatch = null;
  let bestScore = -1;

  for (const g of grammarDb) {
    const candidate = cleanPattern(g.pattern);
    if (candidate === target) return g.id; // Exact match
    if (candidate.includes(target) || target.includes(candidate)) {
      const score = Math.min(candidate.length, target.length) / Math.max(candidate.length, target.length);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = g.id;
      }
    }
  }
  return bestScore > 0.5 ? bestMatch : null;
}

// 2. Process all generated files
let matchCount = 0;
let failCount = 0;

for (let i = 0; i < 22; i++) {
  const file = `scratch/generated_grammar_chunk_${i}.json`;
  if (!fs.existsSync(file)) continue;
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`Error parsing ${file}: ${e.message}`);
    continue;
  }
  
  data.forEach(item => {
    item.confusion_pairs = [];
    if (item.confused_with_patterns && Array.isArray(item.confused_with_patterns)) {
      item.confused_with_patterns.forEach(pat => {
        const id = findBestMatch(pat);
        if (id && id !== item.id) {
          item.confusion_pairs.push(id);
          matchCount++;
        } else {
          failCount++;
        }
      });
    }
    // Remove the temporary patterns field
    delete item.confused_with_patterns;
  });
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

console.log(`Resolved ${matchCount} confusion pairs. Failed to match ${failCount} patterns.`);
