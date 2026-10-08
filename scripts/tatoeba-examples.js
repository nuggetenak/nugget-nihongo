const fs = require('fs');
const path = require('path');

const TATOEBA_FILE = 'data-sources/jpn.txt';
const VOCAB_DIR = 'public/data/vocab';

console.log('Loading Tatoeba...');
const lines = fs.readFileSync(TATOEBA_FILE, 'utf8').split('\n');
const sentences = [];
for (let line of lines) {
  let parts = line.split('\t');
  if (parts.length >= 2) {
    sentences.push({ en: parts[0], jp: parts[1] });
  }
}
console.log(`Loaded ${sentences.length} sentences.`);

function findExamples(keyword, count) {
  // Prefer shorter sentences (<= 15 chars)
  let matches = sentences.filter(s => s.jp.includes(keyword) && s.jp.length <= 15);
  if (matches.length < count) {
    const more = sentences.filter(s => s.jp.includes(keyword) && s.jp.length > 15 && s.jp.length <= 25);
    matches = matches.concat(more);
  }
  return matches.slice(0, count);
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
  if (!p.includes('n4') && !p.includes('n5')) return;

  let text = fs.readFileSync(p, 'utf8');
  let original = text;
  
  global.window = {};
  try { eval(text); } catch(e) { return; }
  const key = Object.keys(global.window)[0];
  const items = global.window[key];
  if (!items) return;

  for (let item of items) {
    let exCount = Array.isArray(item.examples) ? item.examples.length : 0;
    if (exCount >= 2) continue;

    let needed = 2 - exCount;
    
    let found = findExamples(item.word, needed);
    if (found.length < needed && item.reading && item.reading !== item.word) {
      const more = findExamples(item.reading, needed - found.length);
      found = found.concat(more);
    }
    
    if (found.length > 0) {
      let newExStr = '';
      for (let ex of found) {
        // Inject id: '[TBD]' so it doesn't break Indonesian requirement
        newExStr += `\n      { jp: '${ex.jp.replace(/'/g, "\\'")}', en: '${ex.en.replace(/'/g, "\\'")}', id: '[TBD]' },`;
      }
      
      const idIdx = text.indexOf(`'${item.id}'`) !== -1 ? text.indexOf(`'${item.id}'`) : text.indexOf(`"${item.id}"`);
      if (idIdx === -1) continue;
      
      let startIdx = text.lastIndexOf('{', idIdx);
      if (startIdx === -1) continue;
      
      let endIdx = startIdx;
      let depth = 0;
      for (let i = startIdx; i < text.length; i++) {
        if (text[i] === '{') depth++;
        if (text[i] === '}') {
          depth--;
          if (depth === 0) { endIdx = i; break; }
        }
      }

      let block = text.substring(startIdx, endIdx);
      let changedBlock = false;

      if (block.match(/examples\s*:\s*\[\s*\]/)) {
        block = block.replace(/(examples\s*:\s*\[)(\s*\])/, (m, p1, p2) => {
          changedBlock = true;
          return p1 + newExStr + '\n    ' + p2.trim();
        });
      } 
      else if (block.match(/examples\s*:\s*\[/)) {
        block = block.replace(/(examples\s*:\s*\[)/, (m, p1) => {
          changedBlock = true;
          return p1 + newExStr;
        });
      }
      
      if (changedBlock) {
        text = text.substring(0, startIdx) + block + text.substring(endIdx);
      }
    }
  }

  if (text !== original) {
    fs.writeFileSync(p, text, 'utf8');
    console.log('Added examples in', p);
  }
}

walkDir(VOCAB_DIR, processFile);
console.log('Done.');
