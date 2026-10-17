const fs = require('fs');
let total = 0;
for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const content = fs.readFileSync('public/data/vocab/vocab-' + lvl + '.js', 'utf8');
  const count = (content.match(/"word":/g) || []).length;
  console.log(lvl, count);
  total += count;
}
console.log('Total vocabulary words:', total);
