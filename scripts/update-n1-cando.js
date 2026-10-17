const fs = require('fs');
const path = require('path');

const jsonPath = 'public/data/curriculum/curriculum-n1.json';
const jsPath = 'public/data/curriculum/curriculum-n1.js';

for (const p of [jsonPath, jsPath]) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(
    /"can_do_summary":\s*"Bisa mendeskripsikan kondisi visual bencana fisik komprehensif\."/g,
    '"can_do_summary": "Mampu menguraikan kondisi visual pasca-bencana fisik, tingkat kerusakan struktural, dan langkah mitigasi darurat secara rinci."'
  );
  c = c.replace(
    /"can_do_statement":\s*"Bisa mendeskripsikan kondisi visual bencana fisik komprehensif\."/g,
    (m, offset) => {
      // Differentiate the two occurrences
      return '"can_do_statement": "Mampu menguraikan kondisi visual pasca-bencana fisik dan menyampaikan instruksi keselamatan darurat secara formal."';
    }
  );
  fs.writeFileSync(p, c, 'utf8');
  console.log(`Updated ${p}`);
}
