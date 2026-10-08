const fs = require('fs');

global.window = {};
['5','4','3','2','1'].forEach(n => {
  eval(fs.readFileSync(`public/data/vocab/vocab-n${n}.js`, 'utf8'));
});

const levels = {
  n5: global.window.vocabN5,
  n4: global.window.vocabN4,
  n3: global.window.vocabN3,
  n2: global.window.vocabN2,
  n1: global.window.vocabN1
};

let allWords = new Map();
let identical = 0;
let diff = 0;

for (let lvl of ['n5','n4','n3','n2','n1']) {
  for (let item of levels[lvl]) {
    if (allWords.has(item.word)) {
      let match = allWords.get(item.word);
      if (match.meaning_id === item.meaning_id) {
        identical++;
      } else {
        diff++;
      }
    } else {
      allWords.set(item.word, item);
    }
  }
}

console.log(`Identical meanings: ${identical}, Different meanings: ${diff}`);
