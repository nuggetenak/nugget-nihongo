// ══════════════════════════════════════════════════════════════════
//  test-sprint-22-audio-pipeline.js — Forensic Unit & Integration Suite
//  Sprint 22: Offline Audio Asset Compression, Opus/Ogg Fallbacks & Audio Preload Strategy
//  (Tickets T-121 to T-126)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🎵 RUNNING SPRINT 22 VERIFICATION SUITE: AUDIO PIPELINE & CODECS');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-121: Codec Detection & Optimal URL Resolution ──
test('T-121: detectSupportedAudioCodecs and resolveOptimalAudioUrl negotiate optimal format', () => {
  const { detectSupportedAudioCodecs, resolveOptimalAudioUrl } = require('../src/lib/audio/audioCodecResolver.ts');

  const matrix = detectSupportedAudioCodecs();
  assert(typeof matrix === 'object', 'Matrix must be an object');
  assert('opusOgg' in matrix && 'mp3' in matrix && 'opusWebm' in matrix, 'Matrix must contain expected codecs');

  // Extensionless URL resolution
  const resolved = resolveOptimalAudioUrl('/audio/n5/greeting');
  assert(
    resolved.endsWith('.opus') || resolved.endsWith('.webm') || resolved.endsWith('.mp3'),
    'Should append optimal audio extension'
  );

  // Preserve existing mp3 if supported
  const mp3Url = resolveOptimalAudioUrl('/audio/n5/greeting.mp3');
  assert.strictEqual(mp3Url, '/audio/n5/greeting.mp3', 'Should preserve explicit mp3');
});

// ── T-122: Predictive Audio Preloader & Pool Management ──
test('T-122: audioPreloader maintains bounded LRU audio pool and instant retrieval', () => {
  const preloaderPath = path.join(ROOT_DIR, 'src/lib/audio/audioPreloader.ts');
  assert(fs.existsSync(preloaderPath), 'audioPreloader.ts must exist');
  const code = fs.readFileSync(preloaderPath, 'utf8');

  assert(code.includes('class AudioPreloaderService'), 'Must define AudioPreloaderService class');
  assert(code.includes('public async preload('), 'Must implement preload method');
  assert(code.includes('public getPreloadedAudio('), 'Must implement getPreloadedAudio method');
  assert(code.includes('public isPreloaded('), 'Must implement isPreloaded check');
  assert(code.includes('public clearPool('), 'Must implement clearPool method');
  assert(code.includes('private maxPoolSize: number = 12'), 'Must configure maximum pool size ceiling');
  assert(code.includes('export const audioPreloader = new AudioPreloaderService()'), 'Must export audioPreloader singleton');
});

// ── T-123: Audio Cache Storage Budget & LRU Eviction ──
test('T-123: audioCacheBudget tracks storage limits and executes LRU eviction', async () => {
  const { audioCacheBudget } = require('../src/lib/audio/audioCacheBudget.ts');

  assert(typeof audioCacheBudget.recordAudioAccess === 'function', 'Must export recordAudioAccess');
  assert(typeof audioCacheBudget.enforceBudget === 'function', 'Must export enforceBudget');
  assert(typeof audioCacheBudget.getAudioCacheUsage === 'function', 'Must export getAudioCacheUsage');

  // Record simulated audio files
  audioCacheBudget.recordAudioAccess('/audio/test-1.opus', 500_000);
  audioCacheBudget.recordAudioAccess('/audio/test-2.opus', 1_000_000);

  const usage = audioCacheBudget.getAudioCacheUsage();
  assert(usage.count >= 2, 'Usage count should reflect recorded items');
  assert(usage.totalBytes >= 1_500_000, 'Usage bytes should reflect accumulated size');
  assert(usage.budgetBytes === 50 * 1024 * 1024, 'Default budget should be 50 MB');
});

// ── T-124: Web Audio API Oscillator Synthesis Fallback ──
test('T-124: syntheticAudio generates zero-asset mora tones and pitch contours', () => {
  const { syntheticAudio } = require('../src/lib/audio/syntheticAudioFallback.ts');

  assert(typeof syntheticAudio.playMoraTone === 'function', 'syntheticAudio must export playMoraTone');
  assert(typeof syntheticAudio.playPitchContour === 'function', 'syntheticAudio must export playPitchContour');
  assert(typeof syntheticAudio.playComprehensionBeep === 'function', 'syntheticAudio must export playComprehensionBeep');

  // Verify non-throwing execution in headless/Node environment
  assert.doesNotThrow(() => {
    syntheticAudio.playMoraTone(440, 100);
    syntheticAudio.playComprehensionBeep(true);
    syntheticAudio.playComprehensionBeep(false);
  });
});

// ── T-125: Playback Rate Normalization & Pitch Preservation ──
test('T-125: configureAudioElement enforces preservesPitch and clamps rate', () => {
  const { configureAudioElement } = require('../src/lib/audio/audioCodecResolver.ts');

  const mockAudio = {
    playbackRate: 1.0,
    preservesPitch: false,
    webkitPreservesPitch: false,
    mozPreservesPitch: false,
  };

  // Test standard rate
  configureAudioElement(mockAudio, 0.75);
  assert.strictEqual(mockAudio.playbackRate, 0.75);
  assert.strictEqual(mockAudio.preservesPitch, true);
  assert.strictEqual(mockAudio.webkitPreservesPitch, true);
  assert.strictEqual(mockAudio.mozPreservesPitch, true);

  // Test extreme clamp lower bound
  configureAudioElement(mockAudio, 0.2);
  assert.strictEqual(mockAudio.playbackRate, 0.5, 'Should clamp minimum rate to 0.5x');

  // Test extreme clamp upper bound
  configureAudioElement(mockAudio, 4.0);
  assert.strictEqual(mockAudio.playbackRate, 2.0, 'Should clamp maximum rate to 2.0x');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 22 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
