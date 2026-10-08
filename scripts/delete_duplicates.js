const fs = require('fs');
const path = require('path');
const toDelete = new Set(require('../to_delete.json'));

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

  for (let id of toDelete) {
    // Look strictly for the id property declaration
    let idDecl = `id: '${id}'`;
    let idIdx = text.indexOf(idDecl);
    if (idIdx === -1) {
      idDecl = `id: "${id}"`;
      idIdx = text.indexOf(idDecl);
    }
    if (idIdx === -1) {
      idDecl = `"id": "${id}"`;
      idIdx = text.indexOf(idDecl);
    }
    if (idIdx === -1) {
      idDecl = `'id': '${id}'`;
      idIdx = text.indexOf(idDecl);
    }

    if (idIdx !== -1) {
      let startIdx = text.lastIndexOf('{', idIdx);
      if (startIdx === -1) continue;
      
      let endIdx = startIdx;
      let depth = 0;
      for (let i = startIdx; i < text.length; i++) {
        if (text[i] === '{') depth++;
        if (text[i] === '}') {
          depth--;
          if (depth === 0) {
            endIdx = i;
            break;
          }
        }
      }

      let afterEnd = text.substring(endIdx + 1).trim();
      let cutEnd = endIdx + 1;
      if (afterEnd.startsWith(',')) {
        cutEnd = text.indexOf(',', endIdx) + 1;
      } else {
        // If there's no trailing comma, maybe there is a preceding comma we should remove?
        let beforeStart = text.substring(0, startIdx).trim();
        if (beforeStart.endsWith(',')) {
          startIdx = text.lastIndexOf(',', startIdx);
        }
      }

      text = text.substring(0, startIdx) + text.substring(cutEnd);
      changed = true;
      console.log(`Deleted ${id} from ${p}`);
    }
  }

  if (changed) {
    fs.writeFileSync(p, text, 'utf8');
  }
}

walkDir('public/data/vocab', processFile);
