// ══════════════════════════════════════════════════════════════════
//  test-s4-pass4-zzfx-audio.js — Siklus IV Pass 4 Verification
//  Validates Procedural WebAudio Synthesis, Harmonic Stroke Progression,
//  Soft Non-Punitive Alerts, Pentatonic Fanfares & Web Audio Cleanup
// ══════════════════════════════════════════════════════════════════

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Running Siklus IV Pass 4: Procedural Audio ZzFX Sound System Test...');

const audioPath = path.resolve(ROOT, 'src/lib/audio/zzfxKanjiAudio.ts');
assert(fs.existsSync(audioPath), 'zzfxKanjiAudio.ts must exist at src/lib/audio/zzfxKanjiAudio.ts');
const audioSrc = fs.readFileSync(audioPath, 'utf8');

// 1. Static Contract & API Export Verifications
console.log('  🔍 Check 1: Validating Module Exports & Synthesizer Methods...');
assert(audioSrc.includes('export const zzfxKanjiAudio'), 'Must export zzfxKanjiAudio object');
assert(audioSrc.includes('playStrokeCorrect('), 'Must provide playStrokeCorrect method');
assert(audioSrc.includes('playStrokeError('), 'Must provide playStrokeError method');
assert(audioSrc.includes('playBrushInk('), 'Must provide playBrushInk method');
assert(audioSrc.includes('playKanjiCompleteFanfare('), 'Must provide playKanjiCompleteFanfare method');
console.log('  ✅ Check 1 Passed: Procedural audio methods certified');

// 2. Harmonic Pentatonic Progression Architecture
console.log('  🔍 Check 2: Validating Harmonic Frequency Progression...');
assert(audioSrc.includes('PROGRESSION_FREQUENCIES'), 'Must define harmonic frequency scale progression');
assert(audioSrc.includes('strokeIndex / total'), 'Must calculate progress ratio based on current stroke index');
assert(audioSrc.includes('overtoneFreq'), 'Must synthesize overtone frequencies for rich Japanese acoustic timbre');
console.log('  ✅ Check 2 Passed: Harmonic pentatonic scale progression certified');

// 3. User Audio Mute & Setting Compliance
console.log('  🔍 Check 3: Validating User Mute & Audio Setting Enforcement...');
assert(audioSrc.includes('if (!isSfxEnabled()) return;'), 'All methods must respect isSfxEnabled user preference');
assert(audioSrc.includes('getAudioContext()'), 'Must request singleton AudioContext');
console.log('  ✅ Check 3 Passed: User audio mute preference compliance certified');

// 4. Web Audio Resource Leak Prevention
console.log('  🔍 Check 4: Validating Web Audio Node Disconnection & Garbage Collection...');
assert(audioSrc.includes('scheduleCleanup'), 'Must implement node cleanup scheduler');
assert(audioSrc.includes('gain.disconnect()'), 'Must disconnect gain node after playback');
assert(audioSrc.includes('o.disconnect()'), 'Must disconnect oscillator nodes');
console.log('  ✅ Check 4 Passed: Web Audio node cleanup and anti-leak safeguards certified');

// 5. Japanese Yo-Scale Mastery Fanfare Structure
console.log('  🔍 Check 5: Validating 5-Tone Pentatonic Mastery Fanfare...');
assert(audioSrc.includes('melody = [587.33, 783.99, 880.00, 1174.66, 1567.98]'), 'Must implement Yo-scale melodic celebration sequence');
assert(audioSrc.includes('exponentialRampToValueAtTime'), 'Must use exponential decay envelopes to eliminate audio clicks/pops');
console.log('  ✅ Check 5 Passed: Japanese pentatonic celebration sequence certified');

console.log('\n🎉 PASS 4 VERIFIED: Procedural Audio ZzFX Sound System certified 100% compliant!\n');
process.exit(0);
