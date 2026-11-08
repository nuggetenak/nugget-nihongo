// ══════════════════════════════════════════════════════════════════
//  tests/test-s2-pass7-choukai-audio-pipeline.js
//  Siklus II — Pass 7: Choukai Listening Lab, Audio Streaming Engines & Dialogue Highlighting
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 7: Choukai Listening Lab & Audio Streaming Pipeline Verification...\n');

let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 7.1: ChoukaiAudioPlayer Dark-Island Eradication & Semantic Tokens
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 7.1: ChoukaiAudioPlayer Dark-Island Eradication');
const choukaiAudioPath = path.join(ROOT_DIR, 'src', 'components', 'audio', 'ChoukaiAudioPlayer.tsx');
assert(fs.existsSync(choukaiAudioPath), 'src/components/audio/ChoukaiAudioPlayer.tsx exists');
const choukaiAudioContent = fs.readFileSync(choukaiAudioPath, 'utf8');

assert(
  !choukaiAudioContent.includes('bg-neutral-900') &&
  !choukaiAudioContent.includes('bg-neutral-800') &&
  !choukaiAudioContent.includes('text-neutral-200') &&
  !choukaiAudioContent.includes('text-neutral-300'),
  'ChoukaiAudioPlayer has completely eradicated hardcoded dark-island classes (bg-neutral-900, bg-neutral-800, text-neutral-200/300)'
);

assert(
  choukaiAudioContent.includes('bg-surface border border-theme rounded-2xl p-4 shadow-md backdrop-blur-sm overflow-x-hidden') &&
  choukaiAudioContent.includes('text-appText-bright truncate'),
  'ChoukaiAudioPlayer uses dynamic theme-aware tokens (bg-surface, border-theme, text-appText-bright)'
);

// ──────────────────────────────────────────────────────────────────
// Check 7.2: Universal Touch Target Enforcement (>= 40px)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 7.2: Speed Chips & Section Pills Touch Targets (>= 40px)');
assert(
  !choukaiAudioContent.includes('min-h-[36px] min-w-[36px]'),
  'ChoukaiAudioPlayer has eliminated sub-40px speed chip button dimensions (min-h-[36px])'
);

assert(
  choukaiAudioContent.includes('min-h-[40px] min-w-[40px] px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95'),
  'ChoukaiAudioPlayer playback speed chips meet >= 40x40px touch minimum'
);

const simPath = path.join(ROOT_DIR, 'src', 'pages', 'ChoukaiSimulatorPage.tsx');
assert(fs.existsSync(simPath), 'src/pages/ChoukaiSimulatorPage.tsx exists');
const simContent = fs.readFileSync(simPath, 'utf8');

assert(
  !simContent.includes('min-h-[38px] px-3.5 py-1.5'),
  'ChoukaiSimulatorPage has eliminated sub-40px section pill height (min-h-[38px])'
);

assert(
  simContent.includes('min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 active:scale-95'),
  'ChoukaiSimulatorPage section pills are elevated to >= 40px touch height'
);

// ──────────────────────────────────────────────────────────────────
// Check 7.3: ChoukaiPlayer Transcript Badge Contrast Tokens
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 7.3: ChoukaiPlayer Transcript Badge WCAG AA Contrast');
const playerPath = path.join(ROOT_DIR, 'src', 'components', 'exercise', 'ChoukaiPlayer.tsx');
assert(fs.existsSync(playerPath), 'src/components/exercise/ChoukaiPlayer.tsx exists');
const playerContent = fs.readFileSync(playerPath, 'utf8');

assert(
  playerContent.includes('text-emerald-700 dark:text-emerald-400 uppercase tracking-wider') &&
  playerContent.includes('Transkrip Resmi Dialog (Terbuka):'),
  'ChoukaiPlayer transcript reveal header employs dual-theme WCAG AA contrast tokens (text-emerald-700 dark:text-emerald-400)'
);

// ──────────────────────────────────────────────────────────────────
// Check 7.4: ChoukaiSimulatorPage WCAG AA Tokens & Mobile Padding
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 7.4: ChoukaiSimulatorPage Contrast Tokens & Layout Cushion');
assert(
  simContent.includes('text-emerald-700 dark:text-emerald-400 font-mono') &&
  simContent.includes('text-accent-hot dark:text-amber-400 font-bold') &&
  simContent.includes('text-amber-950 dark:text-amber-300 shadow-md font-bold'),
  'ChoukaiSimulatorPage utilizes dual-theme high-contrast tokens across score counters, headers, and option cards'
);

assert(
  simContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12') &&
  simContent.includes('overflow-x-hidden'),
  'ChoukaiSimulatorPage preserves safe-area bottom padding and horizontal anti-leakage constraints'
);

// ──────────────────────────────────────────────────────────────────
// Check 7.5: JFT-Basic CBT Playback Limiter & Hidden Script Protection
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 7.5: CBT Playback Limiter & Transcript Invariant Contract');
assert(
  playerContent.includes('const maxPlays = choukai.maxReplays || 2;') &&
  playerContent.includes('const isStartingFresh = !audioRef.current || audioRef.current.currentTime < 0.5 || playbackProgress === 0;') &&
  playerContent.includes('Transkrip teks disembunyikan untuk menjaga validitas ujian menyimak.'),
  'ChoukaiPlayer enforces 2x replay limit and strictly conceals transcripts until submission'
);

// ──────────────────────────────────────────────────────────────────
// Summary & Verdict
// ──────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
if (failedTests > 0) {
  console.error(`❌ FAILED: ${failedTests} assertion(s) failed in Siklus II — Pass 7.`);
  process.exit(1);
} else {
  console.log('🎉 PASSED: All 5 checks in Siklus II — Pass 7 verified 100% GREEN (Exit Code 0)!');
  process.exit(0);
}
