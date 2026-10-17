const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      count += scanDir(full);
    } else if (ent.name.endsWith('.js') || ent.name.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/["']me-[a-zA-Z]+/g);
      if (matches) {
        count += matches.length;
        console.log(`${ent.name}: ${matches.length} matches (sample: ${matches.slice(0, 3).join(', ')})`);
      }
    }
  }
  return count;
}

console.log('--- public/data/vocab ---');
const totalVocab = scanDir('public/data/vocab');
console.log('Total vocab matches:', totalVocab);

console.log('\n--- public/data/staged-expansion ---');
const totalStaged = scanDir('public/data/staged-expansion');
console.log('Total staged matches:', totalStaged);
