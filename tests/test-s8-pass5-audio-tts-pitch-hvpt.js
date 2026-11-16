// ══════════════════════════════════════════════════════════════════
//  test-s8-pass5-audio-tts-pitch-hvpt.js
//  Siklus VIII Pass 5 (Sprint 51 / Suite 192):
//  Audio Subsystem, TTS Speech Fallbacks, Pitch Accent & HVPT Sound Engineering
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { calculatePitchContour, splitIntoMoras } from '../src/lib/pitch/pitchEngine.ts';
import { HVPT_SPEAKERS, mapPhonologicalDomain } from '../src/lib/audio/hvptManager.ts';

console.log('⚡ Running Suite 192: Siklus VIII Pass 5 (Sprint 51): Audio Subsystem, TTS Speech, Pitch Accent & HVPT...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: speechEngine.ts Source Hardening & Non-String Protection ──────
console.log('  Check 51.1: Verifying speechEngine.ts text type guarding & deadlock watchdog...');
const speechEnginePath = path.join(ROOT, 'src', 'lib', 'audio', 'speechEngine.ts');
assert(fs.existsSync(speechEnginePath), 'speechEngine.ts must exist');
const speechEngineContent = fs.readFileSync(speechEnginePath, 'utf8');

assert(
  speechEngineContent.includes("!text || typeof text !== 'string' || text.trim() === ''"),
  'speechEngine must defensively reject non-string, empty, or whitespace-only inputs'
);

assert(
  speechEngineContent.includes('const timeoutMs = Math.max(3000, cleanText.length * 350);') &&
  speechEngineContent.includes('watchdogTimer = setTimeout('),
  'speechEngine must enforce Deadlock Watchdog to prevent browser speech stalls'
);

assert(
  speechEngineContent.includes('syntheticAudio.playPitchContour'),
  'speechEngine must provide syntheticAudio fallback when speech synthesis is unsupported'
);
console.log('  ✅ Check 51.1 passed: speechEngine source hardening verified.');

// ── Check 2: sfx.ts Web Audio Safe Context Initialization ─────────────────
console.log('  Check 51.2: Verifying sfx.ts Web Audio context error resilience...');
const sfxPath = path.join(ROOT, 'src', 'lib', 'audio', 'sfx.ts');
assert(fs.existsSync(sfxPath), 'sfx.ts must exist');
const sfxContent = fs.readFileSync(sfxPath, 'utf8');

assert(
  sfxContent.includes('try {') &&
  sfxContent.includes('audioCtx = new AudioContextClass();') &&
  sfxContent.includes('catch (e) {'),
  'sfx.ts must wrap AudioContext initialization in try-catch for restricted autoplay/zero-device environments'
);

assert(
  sfxContent.includes('scheduleNodeCleanup'),
  'sfx.ts must schedule node cleanup to eliminate Web Audio leaks'
);
console.log('  ✅ Check 51.2 passed: sfx.ts safe AudioContext initialization verified.');

// ── Check 3: pitchEngine Phonological Calculation & Edge Cases ────────────
console.log('  Check 51.3: Verifying pitchEngine 4 Tokyo Pitch Accent Patterns & Edge Cases...');

// Heiban [0]
const heiban = calculatePitchContour('さくら', 0);
assert.strictEqual(heiban.category, 'heiban');
assert.strictEqual(heiban.particlePitch, 'high');
assert.strictEqual(heiban.moras.length, 3);
assert.strictEqual(heiban.moras[0].isHigh, false);
assert.strictEqual(heiban.moras[1].isHigh, true);

// Atamadaka [1]
const atamadaka = calculatePitchContour('あめ', 1);
assert.strictEqual(atamadaka.category, 'atamadaka');
assert.strictEqual(atamadaka.particlePitch, 'low');
assert.strictEqual(atamadaka.moras[0].isHigh, true);
assert.strictEqual(atamadaka.moras[0].hasDrop, true);

// Nakadaka [2]
const nakadaka = calculatePitchContour('たまご', 2);
assert.strictEqual(nakadaka.category, 'nakadaka');
assert.strictEqual(nakadaka.particlePitch, 'low');
assert.strictEqual(nakadaka.moras[1].hasDrop, true);

// Odaka [2 for 2-mora word]
const odaka = calculatePitchContour('はな', 2);
assert.strictEqual(odaka.category, 'odaka');
assert.strictEqual(odaka.particlePitch, 'low');
assert.strictEqual(odaka.moras[1].isHigh, true);

// Edge Cases: non-string, empty, single mora
const nonStringPitch = calculatePitchContour(null, 0);
assert.strictEqual(nonStringPitch.moras.length, 0);
assert.strictEqual(nonStringPitch.category, 'heiban');

const singleMora = calculatePitchContour('は', 1);
assert.strictEqual(singleMora.moras.length, 1);
assert.strictEqual(singleMora.moras[0].isHigh, true);
assert.strictEqual(singleMora.moras[0].hasDrop, true);

console.log('  ✅ Check 51.3 passed: pitchEngine calculation and edge cases verified.');

// ── Check 4: pitchEngine Procedural Tone Melody Defensive Guards ──────────
console.log('  Check 51.4: Verifying pitchEngine procedural tone melody null guards...');
const pitchEnginePath = path.join(ROOT, 'src', 'lib', 'pitch', 'pitchEngine.ts');
assert(fs.existsSync(pitchEnginePath), 'pitchEngine.ts must exist');
const pitchEngineContent = fs.readFileSync(pitchEnginePath, 'utf8');

assert(
  pitchEngineContent.includes("if (!Array.isArray(moras) || moras.length === 0) return;"),
  'pitchEngine playPitchToneMelody must guard against non-array or empty moras'
);

assert(
  pitchEngineContent.includes('stopPitchToneMelody()'),
  'pitchEngine must provide stopPitchToneMelody to prevent overlapping audio clashes'
);
console.log('  ✅ Check 51.4 passed: pitchEngine procedural tone melody guards verified.');

// ── Check 5: hvptManager 4-Speaker Profiles & Domain Mapping ──────────────
console.log('  Check 51.5: Verifying hvptManager 4-speaker acoustics and domain mappings...');
assert(Array.isArray(HVPT_SPEAKERS), 'HVPT_SPEAKERS must be an array');
assert.strictEqual(HVPT_SPEAKERS.length, 4, 'Must provide exactly 4 canonical speakers');

const m1 = HVPT_SPEAKERS.find((s) => s.key === 'speaker_m1');
const f1 = HVPT_SPEAKERS.find((s) => s.key === 'speaker_f1');
const m2 = HVPT_SPEAKERS.find((s) => s.key === 'speaker_m2');
const f2 = HVPT_SPEAKERS.find((s) => s.key === 'speaker_f2');

assert(m1 && m1.gender === 'M' && m1.pitch === 0.92, 'Speaker M1 profile must be correct');
assert(f1 && f1.gender === 'F' && f1.pitch === 1.15, 'Speaker F1 profile must be correct');
assert(m2 && m2.gender === 'M' && m2.pitch === 0.82, 'Speaker M2 profile must be correct');
assert(f2 && f2.gender === 'F' && f2.pitch === 1.05, 'Speaker F2 profile must be correct');

assert.strictEqual(mapPhonologicalDomain('Domain III: Sokuon (Konsonan Kembar)'), 'sokuon_stop');
assert.strictEqual(mapPhonologicalDomain('Domain II: Chōon (Vokal Panjang)'), 'chōon_vowel');
assert.strictEqual(mapPhonologicalDomain('Domain V: Liquid /r/ vs /l/'), 'liquid_r_l');
assert.strictEqual(mapPhonologicalDomain('Domain VI: Devoicing & Workplace Safety'), 'devoicing');

const hvptManagerPath = path.join(ROOT, 'src', 'lib', 'audio', 'hvptManager.ts');
const hvptManagerContent = fs.readFileSync(hvptManagerPath, 'utf8');
assert(
  hvptManagerContent.includes("if (!text || typeof text !== 'string') return;"),
  'playHVPTSpeaker must guard against non-string stimulus'
);
assert(
  hvptManagerContent.includes("if (!Array.isArray(allPairs)) return [];"),
  'loadAllHVPTPairs must guard against non-array pairs'
);

console.log('  ✅ Check 51.5 passed: hvptManager 4-speaker acoustics and domain mappings verified.');

console.log('\n🎉 Suite 192 (Siklus VIII Pass 5: Audio Subsystem, TTS Speech, Pitch Accent & HVPT) PASSED (5/5 checks 100% GREEN)!\n');
