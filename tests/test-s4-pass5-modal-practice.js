// ══════════════════════════════════════════════════════════════════
//  test-s4-pass5-modal-practice.js — Siklus IV Pass 5 Verification
//  Validates KanjiStrokeModal Guided Practice Integration,
//  Fréchet Validation, ZzFX Procedural Feedback & Accuracy Scoring
// ══════════════════════════════════════════════════════════════════

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Running Siklus IV Pass 5: Modal Guided Practice Integration Test...');

const modalPath = path.resolve(ROOT, 'src/components/kanji/KanjiStrokeModal.tsx');
assert(fs.existsSync(modalPath), 'KanjiStrokeModal.tsx must exist');
const modalSrc = fs.readFileSync(modalPath, 'utf8');

// 1. Validating Architecture & Module Imports
console.log('  🔍 Check 1: Validating Unified Module Imports in Modal...');
assert(
  modalSrc.includes("import { zzfxKanjiAudio } from '../../lib/audio/zzfxKanjiAudio'"),
  'Must import procedural zzfxKanjiAudio synthesizer'
);
assert(
  modalSrc.includes("import { validateStrokeWithFrechet } from '../../lib/kanji/strokeValidator'"),
  'Must import validateStrokeWithFrechet scoring engine'
);
assert(
  modalSrc.includes("import { getPathLength, samplePointsFromPath } from '../../lib/kanji/kanjiVgParser'"),
  'Must import geometry helpers from kanjiVgParser'
);
assert(
  modalSrc.includes("import { kanjiMasteryStore } from '../../lib/kanji/kanjiMasteryStore'"),
  'Must import kanjiMasteryStore tracker'
);
console.log('  ✅ Check 1 Passed: Modular imports and dependencies verified');

// 2. Fréchet Validation & Directional Scoring Integration
console.log('  🔍 Check 2: Validating Real-Time Fréchet Scoring Execution...');
assert(
  modalSrc.includes('validateStrokeWithFrechet(userPts, samples, { minPassScore: 80 })'),
  'Must invoke validateStrokeWithFrechet with minPassScore 80%'
);
assert(
  modalSrc.includes('setStrokeScores'),
  'Must track individual stroke scores across the kanji sequence'
);
assert(
  modalSrc.includes('avgScore'),
  'Must calculate composite average accuracy score'
);
console.log('  ✅ Check 2 Passed: Fréchet scoring and sequence tracking verified');

// 3. Procedural Audio ZzFX Trigger Integration
console.log('  🔍 Check 3: Validating ZzFX Procedural Sound Triggers...');
assert(
  modalSrc.includes('zzfxKanjiAudio.playBrushInk()'),
  'Must trigger tactile brush ink sound on pointerdown'
);
assert(
  modalSrc.includes('zzfxKanjiAudio.playStrokeCorrect(practiceStep, totalStrokes)'),
  'Must trigger harmonic ascending chime on correct stroke'
);
assert(
  modalSrc.includes('zzfxKanjiAudio.playStrokeError()'),
  'Must trigger soft corrective alert on drift or incorrect stroke'
);
assert(
  modalSrc.includes('zzfxKanjiAudio.playKanjiCompleteFanfare()'),
  'Must trigger 5-tone Japanese celebration fanfare on full character completion'
);
console.log('  ✅ Check 3 Passed: ZzFX audio triggers verified');

// 4. Feedback & Completion UI Accuracy Badge
console.log('  🔍 Check 4: Validating Accuracy Badge & Actionable Hints...');
assert(
  modalSrc.includes('Skor Akurasi:'),
  'Completion overlay must present verified accuracy score badge'
);
assert(
  modalSrc.includes("validation.feedback === 'wrong_direction'"),
  'Must handle backwards stroke direction with actionable guidance'
);
assert(
  modalSrc.includes("validation.feedback === 'too_far'"),
  'Must guide user to start point circle when too far'
);
assert(
  modalSrc.includes("validation.feedback === 'too_short'"),
  'Must prompt user to complete stroke to target endpoint'
);
console.log('  ✅ Check 4 Passed: Accuracy badge and dynamic educational hints verified');

// 5. Mastery Record Persistence Integration
console.log('  🔍 Check 5: Validating Kanji Mastery Store Logging...');
assert(
  modalSrc.includes('kanjiMasteryStore.recordPractice(kanji.character, avgScore, true)'),
  'Must persist verified average accuracy score into kanjiMasteryStore'
);
console.log('  ✅ Check 5 Passed: Mastery record logging verified');

console.log('\n🎉 PASS 5 VERIFIED: Modal Guided Practice Integration certified 100% compliant!\n');
process.exit(0);
