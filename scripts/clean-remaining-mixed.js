const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../tests/vocab_translation_cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch (e) {}
}

const levels = ['n2', 'n1'];
const cats = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

async function translateText(text) {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=' + encodeURIComponent(text);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const json = await res.json();
  return json[0].map(x => x[0]).join('').trim();
}

async function cleanRemaining() {
  for (const lvl of levels) {
    for (const cat of cats) {
      const filePath = path.join(__dirname, `../public/data/vocab/${lvl}/${lvl}-${cat}.js`);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf8');
      const s = {};
      new Function('window', content)(s);
      const arr = Object.values(s)[0] || [];
      let updated = 0;

      for (const item of arr) {
        for (const ex of (item.examples || [])) {
          let text = (ex.id || '').trim();
          // Check if contains pure English words or mixed English phrases
          if (/\b(excited|concerned|suck|terms|river|cloudy|path|twists|wetted|towel|designs|property|shot|soldier|chill|translated|French|burned|sweat|photographs|disappointed|transfusion|baggage|transit|transported|realized|guard|boil|phone|office|hurry|loose|execute|means|uncle|beaten|track|ground|tired|joke)\b/i.test(text)) {
            try {
              const trans = await translateText(text);
              if (trans) {
                ex.id = trans;
                updated++;
              }
            } catch (err) {}
          }
        }
      }

      if (updated > 0) {
        const baseName = path.basename(filePath, '.js');
        const [l, c] = baseName.split('-');
        const varName = `window.vocab${l.toUpperCase()}_${c.charAt(0).toUpperCase() + c.slice(1)}`;
        const header = `// ────────────────────────────────────────────────────────────\n//  ${baseName}.js — Nugget Nihongo · JLPT ${l.toUpperCase()} · ${c.toUpperCase()}\n//  ${arr.length} entries | Fully Curated Indonesian\n// ────────────────────────────────────────────────────────────\n\n${varName} = [\n\n`;
        const body = arr.map(x => JSON.stringify(x, null, 2)).join(',\n\n');
        fs.writeFileSync(filePath, header + body + '\n\n];\n', 'utf8');
        console.log(`Cleaned ${updated} remaining mixed phrases in ${baseName}.js`);
      }
    }
  }
}

cleanRemaining().then(() => {
  console.log('Finished secondary clean.');
});
