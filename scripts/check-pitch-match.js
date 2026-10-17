const fs = require('fs');
const readline = require('readline');
const path = require('path');

const vocabItems = [];

for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const content = fs.readFileSync(path.join(__dirname, `../public/data/vocab/vocab-${lvl}.js`), 'utf8');
  const regex = /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    vocabItems.push({ word: m[1], reading: m[2] });
  }
}

console.log('Total vocabulary items:', vocabItems.length);

const accentDict = new Map();

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'cache/accents.txt')),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split('\t');
  if (parts.length >= 3) {
    const term = parts[0];
    const reading = parts[1];
    const rawPattern = parts[2];
    const m = rawPattern.match(/\d+/);
    if (m) {
      const pattern = parseInt(m[0], 10);
      accentDict.set(`${term}:${reading}`, pattern);
      if (!accentDict.has(term)) accentDict.set(term, pattern);
      if (!accentDict.has(reading)) accentDict.set(reading, pattern);
    }
  }
});

rl.on('close', () => {
  let matched = 0;
  for (const item of vocabItems) {
    if (accentDict.has(`${item.word}:${item.reading}`) || accentDict.has(item.word) || accentDict.has(item.reading)) {
      matched++;
    }
  }
  console.log(`Matched ${matched} / ${vocabItems.length} (${((matched / vocabItems.length) * 100).toFixed(2)}%)`);
});
