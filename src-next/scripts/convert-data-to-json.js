const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.join(__dirname, '..', 'public', 'data');
const outDir = path.join(baseDir, 'json');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function extractVariable(filePath, varName) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {} };
  try {
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);
    return sandbox.window[varName] || sandbox[varName] || null;
  } catch (err) {
    console.error(`Error evaluating ${filePath}:`, err.message);
    return null;
  }
}

// Convert Vocab
for (const level of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const file = path.join(baseDir, 'vocab', `vocab-${level}.js`);
  const varName = `vocab${level.toUpperCase()}`;
  const data = extractVariable(file, varName);
  if (data) {
    fs.writeFileSync(path.join(outDir, `vocab-${level}.json`), JSON.stringify(data));
    console.log(`Converted vocab-${level}: ${data.length} entries`);
  }
}

// Convert Grammar
for (const level of ['n5', 'n4', 'n3', 'n2', 'n1']) {
  const file = path.join(baseDir, 'grammar', `grammar-${level}.js`);
  const varName = `grammar${level.toUpperCase()}`;
  const data = extractVariable(file, varName);
  if (data) {
    fs.writeFileSync(path.join(outDir, `grammar-${level}.json`), JSON.stringify(data));
    console.log(`Converted grammar-${level}: ${data.length} entries`);
  }
}

// Convert Tracks
const tracksFile = path.join(baseDir, 'tracks', 'tracks.js');
const tracksData = extractVariable(tracksFile, 'studyTracks');
if (tracksData) {
  fs.writeFileSync(path.join(outDir, 'tracks.json'), JSON.stringify(tracksData));
  console.log(`Converted tracks: ${Object.keys(tracksData).length} tracks`);
}

console.log('Data conversion to JSON completed successfully!');
