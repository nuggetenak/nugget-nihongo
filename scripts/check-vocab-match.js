const fs = require('fs');

const v5 = fs.readFileSync('public/data/vocab/vocab-n5.js', 'utf8');
const words = ['あし', 'あたま', 'あつい', 'あぶない', 'あまい'];

for (const w of words) {
  const m = v5.match(new RegExp('"reading":\\s*"' + w + '"[\\s\\S]*?"meaning":\\s*"([^"]+)"'));
  if (m) console.log(`${w} -> ${m[1]}`);
}
