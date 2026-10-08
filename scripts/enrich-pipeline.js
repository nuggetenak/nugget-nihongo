const fs = require('fs');
const path = require('path');

const JMDICT_JSON = 'data-sources/jmdict-eng-3.6.2.json';
const VOCAB_DIR = 'public/data/vocab';

console.log('Loading JMDict...');
const dict = JSON.parse(fs.readFileSync(JMDICT_JSON, 'utf8')).words;
console.log(`Loaded ${dict.length} entries.`);

const jmIndex = new Map();
for (let entry of dict) {
  const kanjiTexts = entry.kanji.map(k => k.text);
  const kanaTexts = entry.kana.map(k => k.text);
  const keys = [...kanjiTexts, ...kanaTexts];
  for (let k of keys) {
    if (!jmIndex.has(k)) { jmIndex.set(k, []); }
    jmIndex.get(k).push(entry);
  }
}

const posMap = {
  "v5u": "godan", "v5k": "godan", "v5g": "godan", "v5s": "godan",
  "v5t": "godan", "v5n": "godan", "v5b": "godan", "v5m": "godan",
  "v5r": "godan", "v5r-i": "godan", "v5aru": "godan",
  "v1": "ichidan", "v1-s": "ichidan",
  "vk": "kuru", "vs": "suru", "vs-i": "suru",
  "adj-i": "i-adj", "adj-na": "na-adj"
};

function getConjType(sense) {
  for (let s of sense) {
    for (let pos of s.partOfSpeech) {
      if (posMap[pos]) return posMap[pos];
    }
  }
  return null;
}

function getGloss(sense) {
  let glosses = [];
  for (let s of sense) {
    for (let g of s.gloss) {
      if (g.text) glosses.push(g.text);
    }
  }
  // limit to 3 glosses max to keep it clean
  return glosses.slice(0, 3).join(', ');
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

function enrichFile(p) {
  if (!p.endsWith('.js') || path.basename(p).startsWith('vocab-') || p.includes('index')) return;
  let text = fs.readFileSync(p, 'utf8');
  let original = text;
  
  global.window = {};
  try { eval(text); } catch(e) { return; }
  const key = Object.keys(global.window)[0];
  const items = global.window[key];
  if (!items) return;

  for (let item of items) {
    const query = item.word || item.reading;
    if (!query) continue;

    const matches = jmIndex.get(query);
    if (matches && matches.length > 0) {
      const bestMatch = matches[0]; 
      const en = getGloss(bestMatch.sense);
      const conj = getConjType(bestMatch.sense);
      
      // We isolate the block for this specific item using its ID
      if (!item.id) continue;
      const idIdx = text.indexOf(`'${item.id}'`);
      const idIdx2 = text.indexOf(`"${item.id}"`);
      const startIdx = Math.max(idIdx, idIdx2);
      if (startIdx === -1) continue;
      
      const endIdx = text.indexOf('}', startIdx);
      if (endIdx === -1) continue;

      let block = text.substring(startIdx, endIdx);
      let changedBlock = false;

      if (!item.meaning_en && en) {
        const enSafe = en.replace(/'/g, "\\'");
        block = block.replace(/(['"]?meaning_en['"]?\s*:\s*['"])(.*?)(['"])/, (m, p1, p2, p3) => {
          if (p2 === '') { changedBlock = true; return p1 + enSafe + p3; }
          return m;
        });
      }
      
      if (conj && (!item.conj_type || item.conj_type === 'null' || item.conj_type === null)) {
        block = block.replace(/(['"]?conj_type['"]?\s*:\s*)(null|'null'|"null"|''|"")/g, (m, p1) => {
          changedBlock = true;
          return p1 + `'${conj}'`;
        });
      }

      if (changedBlock) {
        text = text.substring(0, startIdx) + block + text.substring(endIdx);
      }
    }
  }

  if (text !== original) {
    fs.writeFileSync(p, text, 'utf8');
    console.log('Enriched', p);
  }
}

walkDir(VOCAB_DIR, enrichFile);
console.log('Done.');
