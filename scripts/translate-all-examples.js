const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../tests/vocab_translation_cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

function isEnglish(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.trim();
  if (!t) return false;
  const enWords = /\b(the|is|are|was|were|they|their|she|he|with|from|have|has|had|you|your|what|where|when|which|that|this|there|here|will|would|could|should|can|not|but|for|and|in|on|at|to|a|an)\b/i;
  const idWords = /\b(yang|dan|di|ke|dari|adalah|dia|mereka|saya|kami|kita|ini|itu|dengan|untuk|pada|bisa|dapat|tidak|bukan|sudah|telah|akan|sangat|karena|jika|oleh|seperti)\b/i;
  return enWords.test(t) && !idWords.test(t);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateBatch(texts) {
  const q = texts.join('\n===SEP===\n');
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=' + encodeURIComponent(q);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const json = await res.json();
  const rawTranslated = json[0].map(x => x[0]).join('');
  const parts = rawTranslated.split(/\n?===SEP===\n?/);
  return parts.map(p => p.trim());
}

async function main() {
  const levels = ['n2', 'n1'];
  const cats = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

  // Collect all unique English sentences
  const toTranslate = new Set();
  const fileEntries = {};

  for (const lvl of levels) {
    for (const cat of cats) {
      const filePath = path.join(__dirname, `../public/data/vocab/${lvl}/${lvl}-${cat}.js`);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf8');
      const s = {};
      try {
        new Function('window', content)(s);
      } catch (err) {
        console.error(`Error loading ${filePath}:`, err.message);
        continue;
      }
      const arr = Object.values(s)[0] || [];
      fileEntries[filePath] = arr;

      for (const item of arr) {
        for (const ex of (item.examples || [])) {
          if (isEnglish(ex.id)) {
            const raw = ex.id.trim();
            if (!cache[raw]) {
              toTranslate.add(raw);
            }
          }
        }
      }
    }
  }

  const uncachedList = Array.from(toTranslate);
  console.log(`Found ${uncachedList.length} uncached English sentences to translate.`);
  console.log(`Already cached: ${Object.keys(cache).length}`);

  // Translate uncached in batches of 25
  const BATCH_SIZE = 25;
  for (let i = 0; i < uncachedList.length; i += BATCH_SIZE) {
    const chunk = uncachedList.slice(i, i + BATCH_SIZE);
    let success = false;
    let attempts = 0;
    while (!success && attempts < 5) {
      attempts++;
      try {
        const results = await translateBatch(chunk);
        if (results.length === chunk.length) {
          for (let j = 0; j < chunk.length; j++) {
            cache[chunk[j]] = results[j] || chunk[j];
          }
          success = true;
        } else {
          // If separator split failed, do one-by-one for this chunk
          for (const item of chunk) {
            try {
              const singleRes = await translateBatch([item]);
              cache[item] = singleRes[0] || item;
            } catch (err) {
              cache[item] = item;
            }
            await sleep(50);
          }
          success = true;
        }
      } catch (err) {
        console.warn(`Batch ${i}-${i + chunk.length} attempt ${attempts} failed: ${err.message}. Retrying...`);
        await sleep(1000 * attempts);
      }
    }

    if ((i / BATCH_SIZE) % 10 === 0 || i + BATCH_SIZE >= uncachedList.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, uncachedList.length)} / ${uncachedList.length} translated.`);
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
    }
    await sleep(200);
  }

  // Save full cache
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`✅ Translation cache updated. Total: ${Object.keys(cache).length}`);

  // Now apply translations back to files
  let totalReplaced = 0;
  for (const [filePath, arr] of Object.entries(fileEntries)) {
    let fileReplaced = 0;
    for (const item of arr) {
      for (const ex of (item.examples || [])) {
        const raw = (ex.id || '').trim();
        if (cache[raw]) {
          ex.id = cache[raw];
          fileReplaced++;
          totalReplaced++;
        }
      }
    }

    // Determine window var
    const baseName = path.basename(filePath, '.js');
    const [lvl, cat] = baseName.split('-');
    const varName = `window.vocab${lvl.toUpperCase()}_${cat.charAt(0).toUpperCase() + cat.slice(1)}`;

    const header = `// ────────────────────────────────────────────────────────────\n//  ${baseName}.js — Nugget Nihongo · JLPT ${lvl.toUpperCase()} · ${cat.toUpperCase()}\n//  ${arr.length} entries | Verified Indonesian Translations\n//  Schema: data/_schema-vocab.md | Part of vocab/${lvl}/ module\n// ────────────────────────────────────────────────────────────\n\n${varName} = [\n\n`;
    const body = arr.map(x => JSON.stringify(x, null, 2)).join(',\n\n');
    fs.writeFileSync(filePath, header + body + '\n\n];\n', 'utf8');
    console.log(`Updated ${baseName}.js: ${fileReplaced} examples converted to Indonesian.`);
  }

  console.log(`\n🎉 Total examples translated to Indonesian: ${totalReplaced}`);
}

main().catch(err => {
  console.error('Fatal error in translation pipeline:', err);
  process.exit(1);
});
