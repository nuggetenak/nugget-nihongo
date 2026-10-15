const fs = require('fs');
const path = require('path');

// Gather all curriculum and book files
const usedIds = new Set();

function scanForIds(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) scanForIds(full);
    else if (f.endsWith('.js') || f.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/gn2-\d+/g);
      if (matches) {
        matches.forEach(id => usedIds.add(id));
      }
    }
  }
}

scanForIds(path.join(__dirname, '..', 'public', 'data', 'curriculum'));
scanForIds(path.join(__dirname, '..', 'public', 'data', 'books'));

console.log('Total unique N2 grammar IDs referenced in curriculum & books:', usedIds.size);
console.log('Sample used IDs:', Array.from(usedIds).slice(0, 20));
