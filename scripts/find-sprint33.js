const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../../QA_AUDIT_REPORT.md');
if (!fs.existsSync(reportPath)) {
  console.log('Not found:', reportPath);
  process.exit(1);
}

const c = fs.readFileSync(reportPath, 'utf8');
const lines = c.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Sprint 33') || lines[i].includes('T-181') || lines[i].includes('T-182') || lines[i].includes('Pass 39')) {
    console.log(`\n=== Match at line ${i} ===`);
    for (let j = Math.max(0, i - 1); j < Math.min(lines.length, i + 35); j++) {
      console.log(`${j}: ${lines[j]}`);
    }
  }
}
