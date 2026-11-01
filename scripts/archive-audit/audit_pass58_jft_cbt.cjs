const fs = require('fs');
const path = require('path');

console.log('=== PASS 58: JFT-BASIC A1/A2 CBT SIMULATOR FORENSIC AUDIT ===\n');

const modalPath = path.resolve('src/components/quiz/JftBasicCbtModal.tsx');
if (!fs.existsSync(modalPath)) {
  console.log('JftBasicCbtModal.tsx NOT FOUND');
  process.exit(1);
}

const raw = fs.readFileSync(modalPath, 'utf8');
console.log(`JftBasicCbtModal.tsx size: ${raw.length} bytes, lines: ${raw.split('\n').length}`);

// 1. Audit Section Definitions
const sections = ['moji_goi', 'kaiwa_hyogen', 'choukai', 'dokkai'];
console.log('\n--- SECTIONS & CANONICAL QUESTIONS ---');
sections.forEach(sec => {
  const count = (raw.match(new RegExp(`section:\\s*['"]${sec}['"]`, 'g')) || []).length;
  console.log(`  Section '${sec}': ${count} questions`);
});

// Count total questions embedded
const qIds = (raw.match(/id:\s*['"]jft-[^'"]+['"]/g) || []);
console.log(`Total questions embedded with id prefix 'jft-': ${qIds.length}`);

// 2. Audit Timer & Section Timing
console.log('\n--- TIMER & PACING ---');
const timerMatch = raw.match(/timeRemainingSeconds.*?(\d+)/);
console.log('Initial timer setting:', timerMatch ? timerMatch[0] : 'Not found');
const hasPerSectionTimer = raw.includes('sectionTimer') || raw.includes('sectionTime');
console.log('Has per-section timer breakdown:', hasPerSectionTimer);

// 3. Audit Scoring Matrix (250-point scale vs raw %)
console.log('\n--- SCORING SYSTEM ---');
const has250PointScale = raw.includes('250');
console.log('References 250-point scale:', has250PointScale);
const scoreSnippet = raw.match(/scaledScore[\s\S]{0,100}/g);
if (scoreSnippet) {
  scoreSnippet.forEach(s => console.log('  ', s.trim()));
}
const passHurdle = raw.match(/passed\s*=\s*[\s\S]{0,100}/g);
if (passHurdle) {
  passHurdle.forEach(s => console.log('  ', s.trim()));
}

// 4. Audit Audio Playback Limit in Choukai
console.log('\n--- AUDIO PLAYBACK CONSTRAINTS ---');
const hasAudioLimit = raw.includes('audioPlayCount') || raw.includes('playCount') || raw.includes('maxPlays') || raw.includes('canPlayAudio');
console.log('Enforces strict 2-play audio playback limit in listening (Choukai):', hasAudioLimit);
const audioScrubbing = raw.includes('currentTime') || raw.includes('controls');
console.log('Audio scrubbing / player details:', audioScrubbing);

// 5. Audit Review Palette, Shuffling, and State Persistence
console.log('\n--- REVIEW PALETTE & PERSISTENCE ---');
const hasFlagging = raw.includes('flagged') || raw.includes('見直し');
const hasReviewPalette = raw.includes('palette') || raw.includes('Palette');
const hasPersistence = raw.includes('localStorage') || raw.includes('indexedDB');
const hasShuffling = raw.includes('Math.random') || raw.includes('shuffle');
console.log(`Has flagging: ${hasFlagging}, Has review palette: ${hasReviewPalette}`);
console.log(`Has persistence: ${hasPersistence}, Has shuffling: ${hasShuffling}`);

