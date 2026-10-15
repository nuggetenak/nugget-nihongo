const fs = require('fs');
const path = require('path');

const IGNORES = ['node_modules', '.git', 'dist'];
const SECRET_REGEX = /(?:ghp_[a-zA-Z0-9]{30,}|AIza[0-9A-Za-z-_]{35}|sk-[a-zA-Z0-9]{20,}|eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,})/;

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (IGNORES.includes(f)) continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (/\.(js|ts|tsx|json|html|md|sh|toml|yml|yaml)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, i) => {
        const m = l.match(SECRET_REGEX);
        if (m) {
          console.log(`${full}:${i + 1} -> ${m[0].slice(0, 35)}...`);
        }
      });
    }
  }
}

console.log('Scanning for secrets across repository...');
scan(path.resolve('.'));
console.log('Scan complete.');
