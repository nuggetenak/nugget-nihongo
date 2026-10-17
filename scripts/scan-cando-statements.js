const fs = require('fs');
const path = require('path');

const dir = 'public/data/curriculum';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let totalUnits = 0;
let totalLessons = 0;
const summaries = [];

for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const units = data.units || [];
  totalUnits += units.length;
  for (const u of units) {
    if (u.can_do_summary) {
      summaries.push({ file: f, unit: u.id, summary: u.can_do_summary });
    }
    const lessons = u.lessons || [];
    totalLessons += lessons.length;
    for (const l of lessons) {
      if (l.can_do_statement) {
        summaries.push({ file: f, lesson: l.id, statement: l.can_do_statement });
      }
    }
  }
}

console.log(`Scanned ${files.length} files: ${totalUnits} units, ${totalLessons} lessons, ${summaries.length} statements.`);

// Check for repetitive/short/boilerplate patterns:
const boilerplate = summaries.filter(s => {
  const text = (s.summary || s.statement || '').toLowerCase();
  return text.length < 25 || text.includes('komprehensif') || text.includes('mempelajari tata bahasa') || text.includes('menguasai materi') || text.includes('memahami materi') || text.includes('fokus pada');
});

console.log(`Found ${boilerplate.length} potentially boilerplate statements.`);
if (boilerplate.length > 0) {
  console.log('Sample boilerplate:');
  boilerplate.slice(0, 10).forEach(b => console.log(`  - [${b.file}] ${b.summary || b.statement}`));
}
