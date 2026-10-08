const fs = require('fs');

const lines = fs.readFileSync('data-sources/jpn.txt', 'utf8').split('\n');
const sentences = [];
for (let line of lines) {
  let parts = line.split('\t');
  if (parts.length >= 2) {
    sentences.push({ en: parts[0], jp: parts[1] });
  }
}

console.log('Loaded', sentences.length, 'sentences');

function findExamples(keyword, count) {
  return sentences.filter(s => s.jp.includes(keyword) && s.jp.length <= 15).slice(0, count);
}

console.log('Examples for 食べる:');
console.log(findExamples('食べる', 3));
console.log('Examples for あそこ:');
console.log(findExamples('あそこ', 3));
