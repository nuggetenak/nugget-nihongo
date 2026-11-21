// ══════════════════════════════════════════════════════════════════
//  test-s11-pass1-truncation-viewport-resilience.js
//  Nugget Nihongo Siklus XI Pass 1 — Mobile Truncation & Viewport Resilience
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('--- Siklus XI Pass 1: Mobile Truncation & Viewport Resilience ---');

// 1. Verify HomePage.tsx anti-truncation & safe-area resilience
const homePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
assert(fs.existsSync(homePath), 'HomePage.tsx must exist');
const homeContent = fs.readFileSync(homePath, 'utf8');

assert(
  homeContent.includes('Target Kemampuan Nyata (Sasaran Can-Do):') &&
  !homeContent.includes('<span className="truncate">Target Kemampuan Nyata (Sasaran Can-Do):</span>'),
  'HomePage must not truncate the Can-Do target capability headline'
);
assert(
  homeContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'HomePage must have bottom safe area cushion for mobile nav'
);
console.log('✓ HomePage Can-Do headline anti-truncation & safe-area cushion verified');

// 2. Verify KebunPage.tsx anti-truncation & KPI layout
const kebunPath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
assert(fs.existsSync(kebunPath), 'KebunPage.tsx must exist');
const kebunContent = fs.readFileSync(kebunPath, 'utf8');

assert(
  kebunContent.includes('Stabilitas Rata-rata') &&
  !kebunContent.includes('<span className="text-xs text-appText-muted block truncate">Stabilitas Rata-rata</span>'),
  'KebunPage must not truncate Stabilitas Rata-rata KPI label on mobile'
);
assert(
  kebunContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'KebunPage must have bottom safe area cushion for mobile nav'
);
console.log('✓ KebunPage KPI anti-truncation & safe-area cushion verified');

// 3. Verify LearnerIdentityCard.tsx guest account anti-truncation
const identityPath = path.join(ROOT_DIR, 'src/components/settings/LearnerIdentityCard.tsx');
assert(fs.existsSync(identityPath), 'LearnerIdentityCard.tsx must exist');
const identityContent = fs.readFileSync(identityPath, 'utf8');

assert(
  identityContent.includes('Akun Tamu Lokal (Tersimpan di Perangkat)') &&
  !identityContent.includes('truncate max-w-full">\n                {user?.email || \'Akun Tamu Lokal'),
  'LearnerIdentityCard must not truncate guest account label on mobile'
);
console.log('✓ LearnerIdentityCard guest account anti-truncation verified');

// 4. Verify LearnerMasteryReport.tsx subtitle anti-truncation
const masteryPath = path.join(ROOT_DIR, 'src/components/settings/LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryPath, 'utf8');

assert(
  masteryContent.includes('{item.subtitle}') &&
  !masteryContent.includes('<span className="text-xs text-appText-muted truncate block">\n                      {item.subtitle}'),
  'LearnerMasteryReport must not truncate JLPT level subtitles'
);
console.log('✓ LearnerMasteryReport subtitle anti-truncation verified');

// 5. Verify ChoukaiAudioPlayer.tsx audio title & responsive speed chips
const audioPlayerPath = path.join(ROOT_DIR, 'src/components/audio/ChoukaiAudioPlayer.tsx');
assert(fs.existsSync(audioPlayerPath), 'ChoukaiAudioPlayer.tsx must exist');
const audioPlayerContent = fs.readFileSync(audioPlayerPath, 'utf8');

assert(
  audioPlayerContent.includes('break-words') &&
  audioPlayerContent.includes('audio.label'),
  'ChoukaiAudioPlayer must permit title wrapping via break-words'
);
assert(
  audioPlayerContent.includes('min-h-[40px]') && audioPlayerContent.includes('min-h-[44px]'),
  'ChoukaiAudioPlayer speed chips must satisfy both 40px and 44px contracts'
);
console.log('✓ ChoukaiAudioPlayer audio title anti-truncation & dual-contract speed chips verified');

console.log('🎉 Siklus XI Pass 1 Verification Complete: All assertions green!\n');
process.exit(0);
