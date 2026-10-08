const fs = require('fs');
const path = require('path');
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
walkDir('public/data/vocab', p => {
  if (!p.endsWith('.js') || path.basename(p).startsWith('vocab-')) return;
  let lines = fs.readFileSync(p, 'utf8').split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('domain:')) {
      if (lines[i].includes("'akademik'")) { lines[i] = lines[i].replace(/'akademik'/g, "'pendidikan'"); changed = true; }
      if (lines[i].includes("'sekolah'")) { lines[i] = lines[i].replace(/'sekolah'/g, "'pendidikan'"); changed = true; }
      if (lines[i].includes('"akademik"')) { lines[i] = lines[i].replace(/"akademik"/g, "'pendidikan'"); changed = true; }
      if (lines[i].includes('"sekolah"')) { lines[i] = lines[i].replace(/"sekolah"/g, "'pendidikan'"); changed = true; }
    }
  }
  if (changed) fs.writeFileSync(p, lines.join('\n'), 'utf8');
});
