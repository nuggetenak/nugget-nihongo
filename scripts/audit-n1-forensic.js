const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const lessonsDir = path.join(ROOT, 'src/lib/curriculum/lessons/n1');
const files = fs.readdirSync(lessonsDir).filter(f => f.startsWith('unit') && f.endsWith('.ts'));

let issues = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
  
  // 1. Check for Latin characters (Indonesian/English) in jp fields
  const jpLines = content.split('\n').filter(l => l.includes('"jp":'));
  jpLines.forEach((l, idx) => {
    // Extract string value
    const match = l.match(/"jp":\s*"([^"]+)"/);
    if (!match) return;
    const text = match[1];
    // Check if there are English/Indonesian words
    const words = text.match(/[A-Za-z]{3,}/g) || [];
    const badWords = words.filter(w => !['exp', 'd1', 'd2', 'd3', 'd4'].includes(w));
    if (badWords.length > 0) {
      issues.push({ file, type: 'LATIN_IN_JP', words: badWords, text: text.slice(0, 100) });
    }
  });

  // 2. Check for double punctuation or periods before particles
  if (content.includes('。。')) {
    issues.push({ file, type: 'DOUBLE_PERIOD' });
  }
  if (content.includes('。ように')) {
    issues.push({ file, type: 'PERIOD_BEFORE_YOU_NI' });
  }

  // 3. Check for speaker bracket prefix in jp
  if (content.match(/"jp":\s*"[^"]+【[^】]+】「/)) {
    issues.push({ file, type: 'SPEAKER_PREFIX_IN_JP' });
  }

  // 4. Check for mismatched Romaji fallback
  if (content.includes('ni kansuru houshin o kettei itashimasu')) {
    issues.push({ file, type: 'BOILERPLATE_ROMAJI_IN_VOCAB' });
  }
});

console.log('Total issues found across N1 units:', issues.length);
const summary = {};
issues.forEach(i => {
  summary[i.type] = (summary[i.type] || 0) + 1;
});
console.log('Issues by category:', summary);
console.log('\nSample details:');
issues.slice(0, 10).forEach(i => {
  console.log(`- [${i.file}] ${i.type}: ${i.words ? i.words.join(', ') : ''} -> ${i.text || ''}`);
});
