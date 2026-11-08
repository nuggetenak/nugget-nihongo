// ══════════════════════════════════════════════════════════════════
//  test-s3-pass3-choukai-pitch-gemba.js — Siklus III Pass 3 Test Suite
//  Choukai Drills, Tokyo Pitch Accent Ergonomics & Gemba Cultural Nuance
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

console.log('🧪 [Siklus III — Pass 3] Testing Choukai Drills, Pitch Accent Ergonomics & Gemba Nuance...\n');

let passCount = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 3.1: FiveLayerExplanationSheet.tsx Dual-Theme Contrast & Cultural Anchors
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 3.1: FiveLayerExplanationSheet.tsx Dual-Theme Contrast & Cultural Anchors');

const sheetPath = path.join(ROOT, 'src/components/exercise/FiveLayerExplanationSheet.tsx');
assert(fs.existsSync(sheetPath), 'FiveLayerExplanationSheet.tsx must exist');

const sheetContent = fs.readFileSync(sheetPath, 'utf8');

assert(sheetContent.includes('text-emerald-800 dark:text-emerald-300'), 'Status banner must use high contrast emerald token');
assert(sheetContent.includes('text-rose-800 dark:text-rose-300'), 'Status banner must use high contrast rose token');
assert(sheetContent.includes('text-emerald-800 dark:text-emerald-400'), 'Lapis 1 must use dual-theme high contrast emerald');
assert(sheetContent.includes('text-rose-800 dark:text-rose-400'), 'Lapis 2 must use dual-theme high contrast rose');
assert(sheetContent.includes('text-amber-800 dark:text-amber-400'), 'Lapis 3 must use dual-theme high contrast amber');
assert(sheetContent.includes('text-orange-800 dark:text-orange-400'), 'Lapis 4 must use dual-theme high contrast orange');
assert(sheetContent.includes('text-cyan-800 dark:text-cyan-400'), 'Lapis 5 must use dual-theme high contrast cyan');
assert(sheetContent.includes('IrasutoyaImage') && sheetContent.includes('sensei_thinking'), 'Lapis 3 must feature Irasutoya sensei_thinking mnemonic anchor');
assert(sheetContent.includes('ssw_construction'), 'SSW K3 safety tip must anchor Irasutoya gemba construction');

console.log('    ✓ Check 3.1 Passed: 5-Layer sheet dual-theme contrast and cultural anchors verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 3.2: ChoukaiSimulatorPage.tsx Completion Celebration & Interactive Elevation
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 3.2: ChoukaiSimulatorPage.tsx Completion Celebration & Interactive Elevation');

const simPath = path.join(ROOT, 'src/pages/ChoukaiSimulatorPage.tsx');
assert(fs.existsSync(simPath), 'ChoukaiSimulatorPage.tsx must exist');

const simContent = fs.readFileSync(simPath, 'utf8');

assert(simContent.includes('IrasutoyaImage'), 'ChoukaiSimulatorPage must import and use IrasutoyaImage');
assert(simContent.includes('celebration_kusudama') && simContent.includes('daruma_recovery'), 'Completion screen must feature dynamic Kusudama and Daruma');
assert(simContent.includes('card-interactive-lift'), 'Completion screen must apply card-interactive-lift micro-interactions');
assert(simContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'Must maintain universal mobile bottom safe-area cushion');

console.log('    ✓ Check 3.2 Passed: Choukai simulator completion celebration and elevation verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 3.3: PitchContourView.tsx Touch Ergonomics & Light-Theme Token Contrast
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 3.3: PitchContourView.tsx Touch Ergonomics & Light-Theme Token Contrast');

const contourPath = path.join(ROOT, 'src/components/pitch/PitchContourView.tsx');
assert(fs.existsSync(contourPath), 'PitchContourView.tsx must exist');

const contourContent = fs.readFileSync(contourPath, 'utf8');

assert(contourContent.includes('min-h-[40px] px-3.5 py-1.5'), 'Audio toolbar buttons must enforce min-h-[40px] touch target bounds');
assert(contourContent.includes('text-amber-800 dark:text-amber-300'), 'High mora tile must use dual-theme contrast token');
assert(contourContent.includes('text-sky-800 dark:text-sky-400') || contourContent.includes('text-sky-800 dark:text-sky-300'), 'Particle tile must use dual-theme contrast token');

console.log('    ✓ Check 3.3 Passed: Pitch contour touch ergonomics and contrast verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 3.4: PitchAccentModal.tsx Quiz Option Contrast & Ear Trainer Celebration
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 3.4: PitchAccentModal.tsx Quiz Option Contrast & Ear Trainer Celebration');

const modalPath = path.join(ROOT, 'src/components/pitch/PitchAccentModal.tsx');
assert(fs.existsSync(modalPath), 'PitchAccentModal.tsx must exist');

const modalContent = fs.readFileSync(modalPath, 'utf8');

assert(modalContent.includes('text-emerald-800 dark:text-emerald-300 font-bold'), 'Quiz correct option must use high-contrast token');
assert(modalContent.includes('text-rose-800 dark:text-rose-300 font-bold'), 'Quiz incorrect option must use high-contrast token');
assert(modalContent.includes('IrasutoyaImage'), 'PitchAccentModal must import IrasutoyaImage');
assert(modalContent.includes('celebration_kusudama') && modalContent.includes('daruma_recovery'), 'Ear drill completion must feature dynamic Irasutoya feedback');
assert(modalContent.includes('z-50'), 'Modal portal must standardize on z-50');

console.log('    ✓ Check 3.4 Passed: Pitch accent quiz contrast and ear trainer celebration verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 3.5: ChoukaiPlayer.tsx & ChoukaiAudioPlayer.tsx Quota Guard & Speed Ergonomics
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 3.5: ChoukaiPlayer.tsx & ChoukaiAudioPlayer.tsx Quota Guard & Speed Ergonomics');

const playerPath = path.join(ROOT, 'src/components/exercise/ChoukaiPlayer.tsx');
const audioPlayerPath = path.join(ROOT, 'src/components/audio/ChoukaiAudioPlayer.tsx');

assert(fs.existsSync(playerPath), 'ChoukaiPlayer.tsx must exist');
assert(fs.existsSync(audioPlayerPath), 'ChoukaiAudioPlayer.tsx must exist');

const playerContent = fs.readFileSync(playerPath, 'utf8');
const audioContent = fs.readFileSync(audioPlayerPath, 'utf8');

assert(playerContent.includes('isStartingFresh'), 'ChoukaiPlayer must protect playback quota on pause/resume');
assert(playerContent.includes('bIdx * 40}ms'), 'ChoukaiPlayer must animate SVG audio waveform bars');
assert(audioContent.includes('min-h-[40px] min-w-[40px]'), 'ChoukaiAudioPlayer speed chips must enforce min 40x40px touch targets');

console.log('    ✓ Check 3.5 Passed: Choukai audio player quota guards and speed chip ergonomics verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Final Validation
// ──────────────────────────────────────────────────────────────────
if (passCount === totalChecks) {
  console.log('\n🎉 [Siklus III — Pass 3] All 5 Checks PASSED! Choukai drills, pitch accent ergonomics & gemba nuance verified.\n');
  process.exit(0);
} else {
  console.error(`\n❌ [Siklus III — Pass 3] Only ${passCount}/${totalChecks} checks passed.\n`);
  process.exit(1);
}
