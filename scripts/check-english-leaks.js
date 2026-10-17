const fs = require('fs');
const path = require('path');

const dir = 'public/data/staged-expansion/vocab';
const files = ['n5-staged.js', 'n4-staged.js', 'n3-staged.js', 'n2-staged.js', 'n1-staged.js'];
let totalIdentical = 0;
let totalEnglishId = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Match meaning_id and meaning_en
  const regex = /"meaning_id":\s*"([^"]+)",\s*"meaning_en":\s*"([^"]+)"/g;
  let m;
  let fileIdentical = 0;
  let fileEnglish = 0;
  while ((m = regex.exec(content)) !== null) {
    const id = m[1].trim();
    const en = m[2].trim();
    if (id === en) {
      fileIdentical++;
      totalIdentical++;
    } else if (id.startsWith('to ') || id.startsWith('a ') || id.startsWith('the ') || (id.length > 3 && /^[a-zA-Z\s,;()'-]+$/.test(id) && !id.startsWith('me-'))) {
      fileEnglish++;
      totalEnglishId++;
    }
  }
  console.log(`${file}: identical=${fileIdentical}, other_english=${fileEnglish}`);
}

console.log(`Total meaning_id === meaning_en: ${totalIdentical}`);
console.log(`Total other pure English meaning_id: ${totalEnglishId}`);
console.log(`Combined English leaks: ${totalIdentical + totalEnglishId}`);
