const fs = require('fs');
const path = require('path');

console.log('=== PASS 57: PROMETRIC CBT ARCHITECTURE & QUESTION ENGINE AUDIT ===\n');

const modalPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const raw = fs.readFileSync(modalPath, 'utf8');

console.log(`PrometricCbtModal.tsx size: ${raw.length} bytes, lines: ${raw.split('\n').length}`);

// 1. Inspect Sector Definitions and Rules
const ruleMatches = raw.match(/SECTOR_RULES[\s\S]*?};/);
if (ruleMatches) {
  console.log('\n--- SECTOR_RULES Found ---');
  console.log(ruleMatches[0].slice(0, 1000));
} else {
  console.log('\nSECTOR_RULES not found');
}

// 2. Count question bank per sector
console.log('\n--- QUESTIONS IN MODAL ---');
const sectorQuestionCounts = {};
const qRegex = /sectorId:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = qRegex.exec(raw)) !== null) {
  const s = m[1];
  sectorQuestionCounts[s] = (sectorQuestionCounts[s] || 0) + 1;
}
console.log('Question counts by sectorId in PrometricCbtModal.tsx:');
console.table(sectorQuestionCounts);
console.log('Total questions embedded in modal:', Object.values(sectorQuestionCounts).reduce((a, b) => a + b, 0));

// 3. Inspect Scoring logic & Dual-pass criteria
console.log('\n--- SCORING & PASSING CRITERIA ---');
const hasTheoryPracticalSplit = raw.includes('theory') || raw.includes('practical') || raw.includes('gakka') || raw.includes('jitsugi') || raw.includes('学科') || raw.includes('実技');
console.log(`Has Theory vs Practical section split: ${hasTheoryPracticalSplit}`);

const scoreRegex = /(?:score|correct|passing|percentage|dualPass|isPassed)[\s\S]{0,100}/g;
console.log('Passing score logic snippet:');
const passSnippet = raw.match(/const\s+(?:isPassed|passed|scorePercentage)[\s\S]*?;/g);
if (passSnippet) {
  passSnippet.forEach(s => console.log('  ', s.trim()));
}

// 4. Timer & Countdown
console.log('\n--- TIMER & SUBMIT ---');
const hasTimer = raw.includes('timeLeft') || raw.includes('timer');
const hasAutoSubmit = raw.includes('handleSubmit') || raw.includes('handleTimeUp');
const hasWarning5Min = raw.includes('300') || raw.includes('warning');
console.log(`Has timer: ${hasTimer}, Has auto-submit: ${hasAutoSubmit}, Has 5-min warning: ${hasWarning5Min}`);

// 5. Review Palette & Bookmarking
console.log('\n--- REVIEW PALETTE & BOOKMARKING ---');
const hasReviewPalette = raw.includes('palette') || raw.includes('ReviewPalette') || raw.includes('jumpToQuestion');
const hasFlagging = raw.includes('flagged') || raw.includes('bookmark') || raw.includes('見直し');
console.log(`Has review palette: ${hasReviewPalette}, Has flagging/bookmarking: ${hasFlagging}`);

// 6. Shuffling & Randomization
console.log('\n--- QUESTION SHUFFLING ---');
const hasShuffling = raw.includes('sort(() => Math.random()') || raw.includes('shuffle');
console.log(`Has question shuffling: ${hasShuffling}`);

