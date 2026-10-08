const fs = require('fs');
const path = require('path');

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
let refMap = {};

for (let lvl of ['n5','n4','n3','n2','n1']) {
  for (let item of levels[lvl]) {
    if (allWords.has(item.word)) {
      let match = allWords.get(item.word);
      if (match.meaning_id === item.meaning_id) {
        refMap[item.id] = match.id;
      }
    } else {
      allWords.set(item.word, item);
    }
  }
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function processFile(p) {
  if (!p.endsWith('.js') || path.basename(p).startsWith('vocab-') || p.includes('index')) return;
  let text = fs.readFileSync(p, 'utf8');
  let changed = false;

  for (let [oldId, newId] of Object.entries(refMap)) {
    if (text.includes(oldId)) {
      text = text.split(oldId).join(newId);
      changed = true;
      console.log(`Replaced ${oldId} with ${newId} in ${p}`);
    }
  }

  if (changed) {
    fs.writeFileSync(p, text, 'utf8');
  }
}

walkDir('public/data/books', processFile);
