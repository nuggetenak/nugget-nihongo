const fs = require('fs');

const inFile = process.argv[2];
const targetFile = process.argv[3];

if (!inFile || !targetFile) {
  console.error('Usage: node inject_nuances.js <json-file> <js-file>');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inFile, 'utf8'));
let text = fs.readFileSync(targetFile, 'utf8');
let injected = 0;

for (let item of data) {
  const { id, nuance } = item;
  
  // Find the id in an "id:" field context, not in antonyms/synonyms arrays
  // Search for patterns like: id: 'vg-n5-00058'  or  "id": "vg-n5-00058"
  const patterns = [
    new RegExp(`"?id"?\\s*:\\s*'${id}'`),
    new RegExp(`"?id"?\\s*:\\s*"${id}"`)
  ];
  
  let idIdx = -1;
  for (const pat of patterns) {
    const match = pat.exec(text);
    if (match) {
      idIdx = match.index;
      break;
    }
  }
  
  if (idIdx === -1) continue;
  
  // Walk backwards to find the opening { of this object
  let startIdx = -1;
  let braceDepth = 0;
  for (let i = idIdx - 1; i >= 0; i--) {
    if (text[i] === '}') braceDepth++;
    if (text[i] === '{') {
      if (braceDepth === 0) { startIdx = i; break; }
      braceDepth--;
    }
  }
  if (startIdx === -1) continue;
  
  // Walk forward to find the closing } of this object
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
  
  // Clean string for JS injection
  const escapedNuance = nuance.replace(/'/g, "\\'").replace(/\n/g, '\\n');
  
  // Handle both JS-style (nuance: null) and JSON-style ("nuance": null)
  if (block.match(/"?nuance"?\s*:\s*null/)) {
    block = block.replace(/"?nuance"?\s*:\s*null/, `nuance: '${escapedNuance}'`);
  } else if (block.match(/"?nuance"?\s*:\s*''/)) {
    block = block.replace(/"?nuance"?\s*:\s*''/, `nuance: '${escapedNuance}'`);
  } else if (block.match(/"?nuance"?\s*:\s*""/)) {
    block = block.replace(/"?nuance"?\s*:\s*""/, `nuance: '${escapedNuance}'`);
  } else if (!block.includes('nuance:') && !block.includes('nuance":') && !block.includes('nuance :')) {
    // Inject right after id
    block = block.replace(new RegExp(`"?id"?\\s*:\\s*['"]${id}['"],?`), `id: '${id}',\n    nuance: '${escapedNuance}',`);
  } else {
    // Existing nuance with content — skip (don't overwrite real data)
    continue;
  }
  
  text = text.substring(0, startIdx) + block + text.substring(endIdx);
  injected++;
}

fs.writeFileSync(targetFile, text, 'utf8');
console.log(`Injected ${injected} nuances successfully.`);
