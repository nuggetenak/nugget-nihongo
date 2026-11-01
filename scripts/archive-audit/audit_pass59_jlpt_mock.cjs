const fs = require('fs');
const path = require('path');

console.log('=== PASS 59: JLPT MOCK EXAMINATION ENGINE FORENSIC AUDIT ===\n');

// 1. Search for JLPT exam components and engines
function findInDir(dir, filterFn) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !full.includes('node_modules') && !full.includes('.git') && !full.includes('dist')) {
      res = res.concat(findInDir(full, filterFn));
    } else if (filterFn(full, f)) {
      res.push(full);
    }
  });
  return res;
}

const jlptComponents = findInDir('src', (p, f) => {
  return f.toLowerCase().includes('jlpt') || f.toLowerCase().includes('mock') || f.toLowerCase().includes('exam');
});
console.log('JLPT / Mock / Exam files found in src:', jlptComponents);

// 2. Search QuizArenaHub for JLPT Mock Exam entry points
const hubPath = path.resolve('src/components/quiz/QuizArenaHub.tsx');
if (fs.existsSync(hubPath)) {
  const hubContent = fs.readFileSync(hubPath, 'utf8');
  console.log('\n--- QuizArenaHub.tsx JLPT References ---');
  const lines = hubContent.split('\n');
  lines.forEach((l, i) => {
    if (l.toLowerCase().includes('jlpt') || l.toLowerCase().includes('simulasi')) {
      console.log(`  Line ${i+1}: ${l.trim()}`);
    }
  });
}

// 3. Search for JLPT mock questions data
const mockDataFiles = findInDir('public/data', (p, f) => {
  return f.toLowerCase().includes('jlpt') && (f.endsWith('.json') || f.endsWith('.js'));
});
console.log('\nJLPT data files in public/data:', mockDataFiles);

// 4. Check quizEngine.ts for JLPT scoring rules
const enginePath = path.resolve('src/lib/quiz/quizEngine.ts');
if (fs.existsSync(enginePath)) {
  const engineContent = fs.readFileSync(enginePath, 'utf8');
  console.log('\n--- quizEngine.ts Analysis ---');
  const hasJlpt = engineContent.toLowerCase().includes('jlpt');
  const hasSectionalHurdle = engineContent.includes('hurdle') || engineContent.includes('sectional') || engineContent.includes('threshold') || engineContent.includes('kijunten') || engineContent.includes('基準点');
  const hasScoringMatrix = engineContent.includes('180') || engineContent.includes('scaledScore') || engineContent.includes('irt');
  console.log(`  Mentions JLPT: ${hasJlpt}`);
  console.log(`  Sectional passing hurdles (基準点 - min 19/60 per section): ${hasSectionalHurdle}`);
  console.log(`  Official 180-point scale / scaled scoring: ${hasScoringMatrix}`);
}
