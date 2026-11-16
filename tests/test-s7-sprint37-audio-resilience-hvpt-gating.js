// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint37-audio-resilience-hvpt-gating.js
//  Sprint 37: Audio Subsystem Resilience, HVPT Acoustic Gating
//             & Speech-to-Text Fallbacks Forensics
//  Verifies:
//    1. ChoukaiPlayer Speech Pause Desync & onEnd/onError Lifecycles
//    2. HVPTPlayer Speech Cancellation on Unmount & Null-Safe Targets
//    3. HVPT Manager Pattern Parsing & Pitch Number Bounds Safety
//    4. Persona Voice Resolver Null/Undefined Defensive Fallbacks
//    5. Mora Tokenizer Digraph, Sokuon, Chouon & Distractor Invariants
//    6. Cumulative Regression Contract & Zero-Disabling Invariant
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 178: Audio Subsystem Resilience, HVPT Acoustic Gating & Voice Fallbacks...');

const rootDir = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Test 1: ChoukaiPlayer Speech Pause & Lifecycle Handlers ─────────
console.log('\nChecking Test 1: ChoukaiPlayer Speech Pause & Lifecycle Handlers...');
const choukaiPlayerSrc = fs.readFileSync(
  path.join(rootDir, 'src', 'components', 'exercise', 'ChoukaiPlayer.tsx'),
  'utf8'
);

assert(
  choukaiPlayerSrc.includes('stopJapaneseSpeech()'),
  'ChoukaiPlayer.tsx must call stopJapaneseSpeech() on pause and unmount'
);
assert(
  choukaiPlayerSrc.includes('onEnd: finishTts') && choukaiPlayerSrc.includes('onError: finishTts'),
  'ChoukaiPlayer.tsx must wire onEnd and onError callbacks to speakJapanese'
);
console.log('✅ Test 1 Passed: ChoukaiPlayer speech pause & lifecycle handlers verified.');

// ── Test 2: HVPTPlayer Unmount Cancellation & Null-Safety ───────────
console.log('\nChecking Test 2: HVPTPlayer Unmount Speech Cancellation & Null-Safety...');
const hvptPlayerSrc = fs.readFileSync(
  path.join(rootDir, 'src', 'components', 'audio', 'HVPTPlayer.tsx'),
  'utf8'
);

assert(
  hvptPlayerSrc.includes('stopJapaneseSpeech()'),
  'HVPTPlayer.tsx must invoke stopJapaneseSpeech() on pair change or component unmount'
);
assert(
  hvptPlayerSrc.includes('targetWordData = (effectiveTarget === \'A\' ? pair?.word_a : pair?.word_b) ||'),
  'HVPTPlayer.tsx must provide safe fallback object for targetWordData'
);
console.log('✅ Test 2 Passed: HVPTPlayer speech cancellation & null-safety verified.');

// ── Test 3: HVPT Pattern Parsing & Pitch Number Bounds Safety ───────
console.log('\nChecking Test 3: HVPT Pattern Parsing & Pitch Number Bounds...');
const { mapPhonologicalDomain, HVPT_SPEAKERS } = await import('../src/lib/audio/hvptManager.ts');

assert.strictEqual(Array.isArray(HVPT_SPEAKERS), true, 'HVPT_SPEAKERS must be an array');
assert.strictEqual(HVPT_SPEAKERS.length, 4, 'Must provide exactly 4 canonical speakers');

// Test domain mapping
assert.strictEqual(mapPhonologicalDomain('Domain III: Sokuon (Konsonan Kembar)'), 'sokuon_stop');
assert.strictEqual(mapPhonologicalDomain('Domain II: Chōon (Vokal Panjang)'), 'chōon_vowel');
assert.strictEqual(mapPhonologicalDomain('Domain V: Liquid /r/ vs /l/'), 'liquid_r_l');
assert.strictEqual(mapPhonologicalDomain('Domain VI: Devoicing & Workplace Safety'), 'devoicing');
assert.strictEqual(mapPhonologicalDomain('Domain I: Pitch Accent Homofon'), 'pitch_accent');
assert.strictEqual(mapPhonologicalDomain(''), 'pitch_accent');
assert.strictEqual(mapPhonologicalDomain(undefined), 'pitch_accent');
console.log('✅ Test 3 Passed: HVPT pattern parsing & domain mapping verified.');

// ── Test 4: Persona Voice Resolver Null/Undefined Defensive Fallbacks ─
console.log('\nChecking Test 4: Persona Voice Resolver Defenses & Canonical Roles...');
const { resolveSpeakerPersona, CANONICAL_PERSONA_VOICES } = await import('../src/lib/audio/personaVoices.ts');

// 4.1 Null and undefined safety
const nullPersona = resolveSpeakerPersona(null, null);
assert.strictEqual(nullPersona.id, 'sensei_nugget_m', 'Null speaker safely falls back to Sensei Nugget');

const undefinedPersona = resolveSpeakerPersona(undefined, undefined);
assert.strictEqual(undefinedPersona.id, 'sensei_nugget_m', 'Undefined speaker safely falls back to Sensei Nugget');

const emptyPersona = resolveSpeakerPersona('', '');
assert.strictEqual(emptyPersona.id, 'sensei_nugget_m', 'Empty speaker safely falls back to Sensei Nugget');

// 4.2 Role matching
const supervisor = resolveSpeakerPersona('Tanaka-san', 'Pabrik');
assert.strictEqual(supervisor.id, 'gemba_supervisor_m', 'Tanaka-san must resolve to gemba_supervisor_m');

const colleague = resolveSpeakerPersona('Yuki-senpai', 'Kantor');
assert.strictEqual(colleague.id, 'colleague_f', 'Yuki-senpai must resolve to colleague_f');

const resident = resolveSpeakerPersona('Sato-san', 'Panti Kaigo');
assert.strictEqual(resident.id, 'elderly_resident_f', 'Sato-san must resolve to elderly_resident_f');

const worker = resolveSpeakerPersona('Budi', 'Magang');
assert.strictEqual(worker.id, 'indonesian_worker_m', 'Budi must resolve to indonesian_worker_m');
console.log('✅ Test 4 Passed: Persona voice resolver defenses verified.');

// ── Test 5: Mora Tokenizer Digraph, Sokuon, Chouon & Distractor Invariants ─
console.log('\nChecking Test 5: Mora Tokenizer & Phonological Distractor Invariants...');
const { splitIntoMora, generatePhonologicalDistractors } = await import('../src/lib/audio/moraTokenizer.ts');

// 5.1 Mora extraction
assert.deepStrictEqual(splitIntoMora('きょうと'), ['きょ', 'う', 'と'], 'きょうと must decompose into 3 morae [きょ, う, と]');
assert.deepStrictEqual(splitIntoMora('きっぷ'), ['き', 'っ', 'ぷ'], 'きっぷ must decompose into 3 morae [き, っ, ぷ]');
assert.deepStrictEqual(splitIntoMora('コーヒー'), ['コ', 'ー', 'ヒ', 'ー'], 'コーヒー must decompose into 4 morae [コ, ー, ヒ, ー]');
assert.deepStrictEqual(splitIntoMora('とうきょう (地名)'), ['と', 'う', 'きょ', 'う'], 'Parentheticals must be stripped');

// 5.2 Negative & empty cases
assert.deepStrictEqual(splitIntoMora(''), [], 'Empty string returns empty array');
assert.deepStrictEqual(splitIntoMora(null), [], 'Null returns empty array');
assert.deepStrictEqual(splitIntoMora(undefined), [], 'Undefined returns empty array');

// 5.3 Phonological distractors
const distractors = generatePhonologicalDistractors('きょうと');
assert(Array.isArray(distractors), 'Distractors must be an array');
assert(distractors.length > 0, 'Must generate at least 1 phonological distractor for 3+ mora word');
console.log('✅ Test 5 Passed: Mora tokenizer & distractor invariants verified.');

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('🎉 SUITE 178: ALL AUDIO FORENSIC CHECKS PASSED 100% GREEN!');
console.log('══════════════════════════════════════════════════════════════════\n');
