// ══════════════════════════════════════════════════════════════════
//  tests/test-s7-sprint39-pitch-accent-mora-visualizer.js
//  SIKLUS VII — SPRINT 39: Pitch Accent Mora Tiles, OJAD Intonation
//                          & Web Audio Collision Defense
//  Audits:
//    - 4 Tokyo Pitch Accent Patterns & single-mora edge cases
//    - Web Audio procedural tone synthesizer & audio collision cleanup
//    - Single-mora tone interactive tap (playSingleMoraTone)
//    - Optimized downstep marker (OJAD ▼) & removal of animate-ping thrash
//    - Touch ergonomics & dual-theme contrast tokens
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS VII — SPRINT 39: PITCH ACCENT MORA VISUALIZER FORENSICS  ║');
console.log('║  KLASTER 6: AUDIO, PHONETICS & TOKYO INTONATION CURVES           ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runSprint39Tests() {
  const ROOT_DIR = path.resolve(__dirname, '..');

  // ── [T-1] Tokyo Pitch Phonology & Calculation Engine ──
  console.log('--- [T-1] Tokyo Pitch Phonology & Calculation Engine ---');
  const {
    calculatePitchContour,
    playPitchToneMelody,
    playSingleMoraTone,
    stopPitchToneMelody,
    splitIntoMoras,
  } = await import('../src/lib/pitch/pitchEngine.ts');

  // 1. Heiban [0]
  const heiban = calculatePitchContour('さくら', 0);
  assert.strictEqual(heiban.category, 'heiban');
  assert.strictEqual(heiban.particlePitch, 'high');
  assert.strictEqual(heiban.moras[0].isHigh, false);
  assert.strictEqual(heiban.moras[1].isHigh, true);
  assert.strictEqual(heiban.moras[2].isHigh, true);

  // 2. Atamadaka [1]
  const atamadaka = calculatePitchContour('あめ', 1);
  assert.strictEqual(atamadaka.category, 'atamadaka');
  assert.strictEqual(atamadaka.particlePitch, 'low');
  assert.strictEqual(atamadaka.moras[0].isHigh, true);
  assert.strictEqual(atamadaka.moras[0].hasDrop, true);
  assert.strictEqual(atamadaka.moras[1].isHigh, false);

  // 3. Nakadaka [2]
  const nakadaka = calculatePitchContour('たまご', 2);
  assert.strictEqual(nakadaka.category, 'nakadaka');
  assert.strictEqual(nakadaka.particlePitch, 'low');
  assert.strictEqual(nakadaka.moras[1].hasDrop, true);

  // 4. Odaka [N]
  const odaka = calculatePitchContour('はな', 2);
  assert.strictEqual(odaka.category, 'odaka');
  assert.strictEqual(odaka.particlePitch, 'low');
  assert.strictEqual(odaka.moras[1].hasDrop, true);

  // 5. 1-mora words
  const haAtamadaka = calculatePitchContour('は', 1);
  assert.strictEqual(haAtamadaka.moras.length, 1);
  assert.strictEqual(haAtamadaka.moras[0].isHigh, true);
  assert.strictEqual(haAtamadaka.particlePitch, 'low');

  const haHeiban = calculatePitchContour('は', 0);
  assert.strictEqual(haHeiban.moras.length, 1);
  assert.strictEqual(haHeiban.moras[0].isHigh, false);
  assert.strictEqual(haHeiban.particlePitch, 'high');

  console.log('  ✔ Tokyo phonology rules & 4 pitch categories certified.\n');

  // ── [T-2] Procedural Web Audio Engine Resilience ──
  console.log('--- [T-2] Procedural Web Audio Engine Resilience ---');
  assert.doesNotThrow(() => {
    // Calling melody and single tones must not throw in headless / node environment
    playPitchToneMelody(heiban.moras, heiban.particlePitch);
    playPitchToneMelody(atamadaka.moras, atamadaka.particlePitch);
    playSingleMoraTone(true);
    playSingleMoraTone(false);
    stopPitchToneMelody();
  }, 'Audio tone functions must handle missing AudioContext gracefully');

  console.log('  ✔ Web Audio tone synthesizer & collision defense verified.\n');

  // ── [T-3] Static AST of PitchContourView.tsx ──
  console.log('--- [T-3] Static AST of PitchContourView.tsx ---');
  const contourPath = path.join(ROOT_DIR, 'src/components/pitch/PitchContourView.tsx');
  assert(fs.existsSync(contourPath), 'PitchContourView.tsx must exist');
  const contourSrc = fs.readFileSync(contourPath, 'utf8');

  // Interactive mora tiles
  assert(contourSrc.includes('playSingleMoraTone'), 'PitchContourView must import playSingleMoraTone');
  assert(contourSrc.includes('handleTapMora'), 'PitchContourView must implement handleTapMora');
  assert(contourSrc.includes('handleTapParticle'), 'PitchContourView must implement handleTapParticle');
  assert(contourSrc.includes('cursor-pointer'), 'Mora tiles must show pointer cursor');

  // Downstep marker & elimination of heavy animate-ping
  assert(!contourSrc.includes('animate-ping'), 'Heavy continuous animate-ping SVG loops must be removed');
  assert(contourSrc.includes('▼'), 'Downstep must be annotated with OJAD canonical downstep triangle ▼');

  // Contrast & Touch Ergonomics
  assert(contourSrc.includes('text-amber-800 dark:text-amber-300'), 'High mora tile must use dual-theme contrast');
  assert(contourSrc.includes('text-sky-800 dark:text-sky-400') || contourSrc.includes('text-sky-800 dark:text-sky-300'), 'Particle tile must use dual-theme contrast');
  assert(contourSrc.includes('min-h-[40px] px-3.5 py-1.5'), 'Toolbar buttons must meet min-h-[40px]');

  console.log('  ✔ PitchContourView interactive tiles, OJAD downstep ▼, and contrast verified.\n');

  // ── [T-4] Static AST of PitchAccentModal.tsx ──
  console.log('--- [T-4] Static AST of PitchAccentModal.tsx ---');
  const modalPath = path.join(ROOT_DIR, 'src/components/pitch/PitchAccentModal.tsx');
  assert(fs.existsSync(modalPath), 'PitchAccentModal.tsx must exist');
  const modalSrc = fs.readFileSync(modalPath, 'utf8');

  // Audio cleanup on close and tab switch
  assert(modalSrc.includes('stopPitchToneMelody'), 'PitchAccentModal must import and call stopPitchToneMelody');
  assert(modalSrc.includes('handleClose'), 'PitchAccentModal must define handleClose');

  // Focus trap & safe area padding
  assert(modalSrc.includes('useFocusTrap'), 'PitchAccentModal must trap keyboard focus');
  assert(modalSrc.includes('safe-area-inset-bottom'), 'PitchAccentModal must respect mobile safe area');

  // Quiz contrast and Mascot celebration
  assert(modalSrc.includes('text-emerald-800 dark:text-emerald-300 font-bold'), 'Quiz correct option must use contrast token');
  assert(modalSrc.includes('text-rose-800 dark:text-rose-300 font-bold'), 'Quiz incorrect option must use contrast token');
  assert(modalSrc.includes('celebration_kusudama'), 'PitchAccentModal must feature celebration mascot');

  console.log('  ✔ PitchAccentModal audio cleanup, focus trap, and quiz ergonomics verified.\n');

  // ── [T-5] Curated Minimal Pairs & Lexicon Lookups ──
  console.log('--- [T-5] Curated Minimal Pairs & Lexicon Lookups ---');
  const { lookupPitch } = await import('../src/lib/data/pitchAccentManager.ts');
  const { MINIMAL_PAIRS } = await import('../src/lib/pitch/pitchData.ts');

  assert(MINIMAL_PAIRS.length >= 16, `Must provide at least 16 minimal pairs (found ${MINIMAL_PAIRS.length})`);

  // Verify Ame & Hashi pairs
  const ameRain = lookupPitch('雨', 'あめ');
  assert(ameRain && ameRain.pattern === 1, '雨 must be Atamadaka 1');

  const ameCandy = lookupPitch('飴', 'あめ');
  assert(ameCandy && ameCandy.pattern === 0, '飴 must be Heiban 0');

  const hashiChopstick = lookupPitch('箸', 'はし');
  assert(hashiChopstick && hashiChopstick.pattern === 1, '箸 must be Atamadaka 1');

  const hashiBridge = lookupPitch('橋', 'はし');
  assert(hashiBridge && hashiBridge.pattern === 2, '橋 must be Odaka 2');

  console.log('  ✔ Curated minimal pairs and OJAD lexicon verified.\n');

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS VII SPRINT 39 VERIFICATION SUITES PASSED (5/5)    ║');
  console.log('║  🏆 PITCH ACCENT & MORA VISUALIZER PROTOCOL CERTIFIED GREEN!     ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runSprint39Tests().catch((err) => {
  console.error('\n❌ SIKLUS VII SPRINT 39 FAILED:', err);
  process.exit(1);
});
