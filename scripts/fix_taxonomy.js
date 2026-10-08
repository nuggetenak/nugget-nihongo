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

function fixFile(p) {
  if (!p.endsWith('.js') || path.basename(p).startsWith('vocab-') || path.basename(p).startsWith('grammar-') || p.includes('index')) return;
  let text = fs.readFileSync(p, 'utf8');
  let original = text;
  
  // Fix POS
  text = text.replace(/(['"]?pos['"]?\s*:\s*['"])(adj-i|adj-na|conj|expr)(['"])/g, (match, prefix, val, suffix) => {
    if (val === 'adj-i') return prefix + 'i-adj' + suffix;
    if (val === 'adj-na') return prefix + 'na-adj' + suffix;
    if (val === 'conj') return prefix + 'conjunction' + suffix;
    if (val === 'expr') return prefix + 'expression' + suffix;
    return match;
  });

  // Fix Domain
  text = text.replace(/(['"]?domain['"]?\s*:\s*\[)([^\]]+)(\])/g, (match, prefix, val, suffix) => {
    let mapped = val.replace(/['"]tempat['"]/g, '"ruang-arah"')
                    .replace(/['"]perasaan['"]/g, '"emosi"')
                    .replace(/['"]orang['"]/g, '"kehidupan-sehari"')
                    .replace(/['"]kegiatan-luar['"]/g, '"hiburan"')
                    .replace(/['"]transportasi['"]/g, '"perjalanan"')
                    .replace(/['"]seni['"]/g, '"budaya"')
                    .replace(/['"]hobi['"]/g, '"hiburan"')
                    .replace(/['"]angka['"]/g, '"kuantitas"')
                    .replace(/['"]akademik['"]/g, '"pendidikan"')
                    .replace(/['"]sekolah['"]/g, '"pendidikan"');
    return prefix + mapped + suffix;
  });

  // Fix Register
  text = text.replace(/(['"]?register['"]?\s*:\s*['"])(kasual|semi-formal)(['"])/g, (match, prefix, val, suffix) => {
    if (val === 'kasual') return prefix + 'casual' + suffix;
    if (val === 'semi-formal') return prefix + 'neutral' + suffix;
    return match;
  });

  if (text !== original) {
    fs.writeFileSync(p, text, 'utf8');
    console.log('Fixed', p);
  }
}

walkDir('public/data/vocab', fixFile);
walkDir('public/data/grammar', fixFile);
