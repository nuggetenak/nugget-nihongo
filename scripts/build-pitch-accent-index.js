const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SUTEGANA = new Set([
  'ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
  'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'
]);

function splitIntoMora(text) {
  if (!text || typeof text !== 'string') return [];
  const clean = text.trim();
  const moras = [];
  const chars = Array.from(clean);
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const next = chars[i + 1];
    if (next && SUTEGANA.has(next)) {
      moras.push(char + next);
      i++;
    } else {
      moras.push(char);
    }
  }
  return moras.filter(m => m.length > 0);
}

function hiraganaToKatakana(hiragana) {
  return hiragana.replace(/[\u3041-\u3096]/g, (match) => {
    const code = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(code);
  });
}

function buildPitchEntry(pattern, reading) {
  const morae = splitIntoMora(reading);
  const moraCount = morae.length;
  let category = 'heiban';
  let downstepMora = 0;

  if (pattern === 0) {
    category = 'heiban';
    downstepMora = 0;
  } else if (pattern === 1) {
    category = 'atamadaka';
    downstepMora = 1;
  } else if (pattern === moraCount) {
    category = 'odaka';
    downstepMora = moraCount;
  } else {
    category = 'nakadaka';
    downstepMora = Math.min(pattern, moraCount);
  }

  // Build contour representation using Katakana + downstep mark ＼
  const kataMorae = morae.map(hiraganaToKatakana);
  let contour = '';
  if (downstepMora === 0) {
    contour = kataMorae.join('') + '￣';
  } else {
    const beforeDrop = kataMorae.slice(0, downstepMora).join('');
    const afterDrop = kataMorae.slice(downstepMora).join('');
    contour = beforeDrop + '＼' + afterDrop;
  }

  return {
    pattern,
    category,
    mora_count: moraCount,
    downstep_mora: downstepMora,
    contour
  };
}

async function main() {
  const accentsPath = path.join(__dirname, 'cache/accents.txt');
  if (!fs.existsSync(accentsPath)) {
    console.error('accents.txt not found. Run scripts/download-accents.js first.');
    process.exit(1);
  }

  // Collect target words from Nugget Nihongo vocabulary (N5-N1, SSW, confusion pairs)
  const targetTokens = new Set();

  for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
    const file = path.join(__dirname, `../public/data/vocab/vocab-${lvl}.js`);
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const regex = /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)"/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        targetTokens.add(m[1]);
        targetTokens.add(m[2]);
      }
    }
  }

  // SSW vocab
  const sswDir = path.join(__dirname, '../public/data/vocab/ssw');
  if (fs.existsSync(sswDir)) {
    for (const f of fs.readdirSync(sswDir)) {
      if (f.endsWith('.js')) {
        const content = fs.readFileSync(path.join(sswDir, f), 'utf8');
        const regex = /kanji:\s*['"]([^'"]+)['"],\s*reading:\s*['"]([^'"]+)['"]/g;
        let m;
        while ((m = regex.exec(content)) !== null) {
          targetTokens.add(m[1]);
          targetTokens.add(m[2]);
        }
      }
    }
  }

  // Confusion pairs
  const cpFile = path.join(__dirname, '../public/data/confusion-pairs.js');
  if (fs.existsSync(cpFile)) {
    const content = fs.readFileSync(cpFile, 'utf8');
    const regex = /"target_form":\s*"([^"]+)"/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      targetTokens.add(m[1].replace(/[（\(].*?[）\)]/g, '').trim());
    }
  }

  console.log(`Target tokens to index: ${targetTokens.size}`);

  console.log('Reading accents.txt and extracting optimized index...');
  const rl = readline.createInterface({
    input: fs.createReadStream(accentsPath),
    crlfDelay: Infinity
  });

  const index = {};
  let rawCount = 0;

  for await (const line of rl) {
    rawCount++;
    const parts = line.split('\t');
    if (parts.length >= 3) {
      const term = parts[0].trim();
      const reading = parts[1].trim();
      const rawPattern = parts[2].trim();

      // Only index if term or reading is in targetTokens or among top 5000 general words
      if (!targetTokens.has(term) && !targetTokens.has(reading) && rawCount > 6000) {
        continue;
      }

      const m = rawPattern.match(/\d+/);
      if (!m) continue;
      const pattern = parseInt(m[0], 10);

      const entry = buildPitchEntry(pattern, reading);

      // Composite key: e.g. "雨:あめ"
      index[`${term}:${reading}`] = entry;

      // Word key: e.g. "雨"
      if (!index[term]) {
        index[term] = entry;
      }

      // Reading key: e.g. "あめ"
      if (!index[reading]) {
        index[reading] = entry;
      }
    }
  }

  console.log(`Optimized index generated: ${Object.keys(index).length} keys.`);

  // Write index to public/data/pitch/pitch-accent-index.json
  const outDir = path.join(__dirname, '../public/data/pitch');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'pitch-accent-index.json');
  fs.writeFileSync(outPath, JSON.stringify(index), 'utf8');
  const stat = fs.statSync(outPath);
  console.log(`Saved optimized pitch index to ${outPath} (${(stat.size / 1024).toFixed(1)} KB)`);

  // Ensure vocabulary files in public/data/vocab/ are fully merged
  console.log('Running merge-vocab.js...');
  const { execSync } = require('child_process');
  execSync('node scripts/merge-vocab.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  console.log('Vocabulary merge complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
