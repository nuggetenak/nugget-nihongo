// standardize-ssw-keys.js — Ensure meaning_id is present across all SSW vocabulary files
const fs = require('fs');
const path = require('path');

const sswDir = path.resolve(__dirname, '../public/data/vocab/ssw');
const targetFiles = ['construction.js', 'food.js', 'kaigo.js'];

let totalFixed = 0;

for (const tf of targetFiles) {
  const filePath = path.join(sswDir, tf);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  // Match meaning: '...' where meaning_id is missing
  // Using JSON/eval transformation to preserve structure perfectly
  global.window = {};
  eval(content);

  const key = Object.keys(global.window)[0];
  const list = global.window[key];

  if (Array.isArray(list)) {
    list.forEach(item => {
      if (item.meaning && !item.meaning_id) {
        item.meaning_id = item.meaning;
        totalFixed++;
      }
    });

    // Re-serialize back to clean JS
    const header = content.split('window.')[0];
    const newContent = `${header}window.${key} = ${JSON.stringify(list, null, 2)};\n`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Standardized SSW keys in ${tf} (${list.length} entries)`);
  }
}

console.log(`\n🎉 Total SSW entries standardized with meaning_id: ${totalFixed}`);
