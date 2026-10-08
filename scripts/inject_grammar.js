const fs = require('fs');
const path = require('path');

// 1. Build ID to File Map
const idToFile = {};
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, callback);
    else callback(p);
  });
}
walk('public/data/grammar', p => {
  if (p.endsWith('.js') && !path.basename(p).startsWith('grammar-') && !p.includes('index')) {
    global.window = {};
    eval(fs.readFileSync(p, 'utf8'));
    const key = Object.keys(global.window)[0];
    const items = global.window[key];
    items.forEach(i => idToFile[i.id] = p);
  }
});

// 2. Inject
let injectedCount = 0;

const filesToProcess = ['scratch/bidir_updates.json'];
for (const file of filesToProcess) {
  if (!fs.existsSync(file)) continue;
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch(e) {
    console.error(`Invalid JSON in ${file}`);
    continue;
  }
  
  for (const item of data) {
    const filePath = idToFile[item.id];
    if (!filePath) continue;
    
    let text = fs.readFileSync(filePath, 'utf8');
    
    const patterns = [
      new RegExp(`"?id"?\\s*:\\s*'${item.id}'`),
      new RegExp(`"?id"?\\s*:\\s*"${item.id}"`)
    ];
    let idIdx = -1;
    for (const pat of patterns) {
      const match = pat.exec(text);
      if (match) { idIdx = match.index; break; }
    }
    if (idIdx === -1) continue;
    
    let startIdx = -1, braceDepth = 0;
    for (let j = idIdx - 1; j >= 0; j--) {
      if (text[j] === '}') braceDepth++;
      if (text[j] === '{') {
        if (braceDepth === 0) { startIdx = j; break; }
        braceDepth--;
      }
    }
    if (startIdx === -1) continue;
    
    let endIdx = startIdx, depth = 0;
    for (let j = startIdx; j < text.length; j++) {
      if (text[j] === '{') depth++;
      if (text[j] === '}') {
        depth--;
        if (depth === 0) { endIdx = j; break; }
      }
    }
    
    let block = text.substring(startIdx, endIdx);
    
    const replaceField = (fieldName, newValue) => {
      let replacement = '';
      if (newValue === null || newValue === undefined || newValue === 'null') {
        replacement = 'null';
      } else if (Array.isArray(newValue)) {
        replacement = `['${newValue.join("', '")}']`;
        if (replacement === `['']`) replacement = `[]`;
      } else {
        const escaped = newValue.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
        replacement = `'${escaped}'`;
      }
      
      const patNull = new RegExp(`"?${fieldName}"?\\s*:\\s*null`);
      const patStr = new RegExp(`"?${fieldName}"?\\s*:\\s*(['"])((?:\\\\.|[^\\\\])*?)\\1`);
      const patArr = new RegExp(`"?${fieldName}"?\\s*:\\s*\\[[^\\]]*\\]`);
      
      if (block.match(patNull)) {
        block = block.replace(patNull, `${fieldName}: ${replacement}`);
      } else if (block.match(patStr)) {
        block = block.replace(patStr, `${fieldName}: ${replacement}`);
      } else if (block.match(patArr)) {
        block = block.replace(patArr, `${fieldName}: ${replacement}`);
      } else {
        // Inject before see_also_grammar or examples
        if (block.includes('see_also_grammar')) {
          block = block.replace(/(see_also_grammar\s*:)/, `${fieldName}: ${replacement},\n    $1`);
        } else {
          block = block.replace(/(examples\s*:)/, `${fieldName}: ${replacement},\n    $1`);
        }
      }
    };
    
    replaceField('nuance', item.nuance);
    replaceField('register', item.register);
    replaceField('exceptions', item.exceptions);
    replaceField('notes', item.notes);
    
    if (item.confusion_pairs && item.confusion_pairs.length > 0) {
      replaceField('confusion_pairs', item.confusion_pairs);
    }
    
    text = text.substring(0, startIdx) + block + text.substring(endIdx);
    fs.writeFileSync(filePath, text, 'utf8');
    injectedCount++;
  }
}

console.log(`Injected ${injectedCount} grammar items.`);
