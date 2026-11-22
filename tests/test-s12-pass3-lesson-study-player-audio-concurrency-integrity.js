// ══════════════════════════════════════════════════════════════════
//  test-s12-pass3-lesson-study-player-audio-concurrency-integrity.js
//  Siklus XII Pass 3: 4-Stage Study Player Execution, Audio Concurrency
//  & Anti-Exploit Stage Locking Integrity Verification
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Siklus XII Pass 3: 4-Stage Study Player & Audio Concurrency Integrity...\n');

// ──────────────────────────────────────────────────────────────────
// Test 1: LessonStudyPage.tsx Source Contracts & JLPT Level Resolution
// ──────────────────────────────────────────────────────────────────
console.log('▶ Test 1: LessonStudyPage.tsx source contracts & JLPT level resolution...');
const studyPagePath = path.resolve(__dirname, '../src/pages/LessonStudyPage.tsx');
assert(fs.existsSync(studyPagePath), 'LessonStudyPage.tsx must exist');
const studyPageSrc = fs.readFileSync(studyPagePath, 'utf8');

// Must import resolveTrackToJLPTLevel
assert(
  studyPageSrc.includes('resolveTrackToJLPTLevel'),
  'LessonStudyPage.tsx must import and use resolveTrackToJLPTLevel'
);

// Must NOT hardcode textbook tracks to n5
assert(
  !studyPageSrc.includes(": isSsw || trackId === 'jft-a2'\n            ? 'n4'\n            : 'n5') as any;"),
  'LessonStudyPage.tsx must NOT fall back all textbook tracks to n5'
);

// Must import and trigger stopAllSpeech on stage change and unmount
assert(
  studyPageSrc.includes('stopAllSpeech') &&
  studyPageSrc.includes('stopAllSpeech();') &&
  studyPageSrc.includes('[activeStage]'),
  'LessonStudyPage.tsx must trigger stopAllSpeech on activeStage change'
);
console.log('  ✅ LessonStudyPage.tsx passed source contracts.\n');

// ──────────────────────────────────────────────────────────────────
// Test 2: lessonStageEngine.ts Anti-Exploit Guard & Math Invariants
// ──────────────────────────────────────────────────────────────────
console.log('▶ Test 2: lessonStageEngine.ts anti-exploit locks & scoring math...');
const stageEnginePath = path.resolve(__dirname, '../src/lib/curriculum/lessonStageEngine.ts');
assert(fs.existsSync(stageEnginePath), 'lessonStageEngine.ts must exist');

const {
  isStage4Locked,
  canNavigateToStage,
  getNextStage,
  getPreviousStage,
  calculateDrillScore,
  LESSON_PASSING_THRESHOLD,
  LESSON_STAGES,
} = require('../src/lib/curriculum/lessonStageEngine.ts');

assert.strictEqual(LESSON_PASSING_THRESHOLD, 80, 'Passing threshold must be 80%');
assert.strictEqual(LESSON_STAGES.length, 4, 'Must define exactly 4 study stages');

// 2a: isStage4Locked anti-exploit rules
assert.strictEqual(isStage4Locked(null, false), true, 'Null score on uncompleted lesson must lock Stage 4');
assert.strictEqual(isStage4Locked(undefined, false), true, 'Undefined score on uncompleted lesson must lock Stage 4');
assert.strictEqual(isStage4Locked(NaN, false), true, 'NaN score on uncompleted lesson must lock Stage 4');
assert.strictEqual(isStage4Locked(0, false), true, '0% score on uncompleted lesson must lock Stage 4');
assert.strictEqual(isStage4Locked(79, false), true, '79% score on uncompleted lesson must lock Stage 4');
assert.strictEqual(isStage4Locked(80, false), false, '80% score must unlock Stage 4');
assert.strictEqual(isStage4Locked(100, false), false, '100% score must unlock Stage 4');
assert.strictEqual(isStage4Locked(0, true), false, 'Previously completed lesson must always unlock Stage 4');
assert.strictEqual(isStage4Locked(null, true), false, 'Previously completed lesson with null score must unlock Stage 4');

// 2b: canNavigateToStage guard
const blockedNav = canNavigateToStage('cando', 'drills', 60, false);
assert.strictEqual(blockedNav.allowed, false, 'Navigation to cando below 80% must be disallowed');
assert(blockedNav.reason && blockedNav.reason.includes('80%'), 'Reason must mention 80% requirement');

const allowedNav = canNavigateToStage('cando', 'drills', 80, false);
assert.strictEqual(allowedNav.allowed, true, 'Navigation to cando at 80% must be allowed');

const reviewNav = canNavigateToStage('dialogue', 'drills', 0, false);
assert.strictEqual(reviewNav.allowed, true, 'Navigation backwards to review dialogue must always be allowed');

// 2c: calculateDrillScore math
assert.strictEqual(calculateDrillScore(5, 5), 100, '5/5 must be 100%');
assert.strictEqual(calculateDrillScore(5, 4), 80, '4/5 must be 80%');
assert.strictEqual(calculateDrillScore(5, 3), 60, '3/5 must be 60%');
assert.strictEqual(calculateDrillScore(0, 0), 100, '0 drills must yield 100% default');
assert.strictEqual(calculateDrillScore(10, 8), 80, '8/10 must be 80%');
console.log('  ✅ lessonStageEngine.ts verified across all anti-exploit edge cases.\n');

// ──────────────────────────────────────────────────────────────────
// Test 3: ExplanationStage.tsx Audio Concurrency & Pitch Collision Defense
// ──────────────────────────────────────────────────────────────────
console.log('▶ Test 3: ExplanationStage.tsx pitch & speech collision defense...');
const explanationPath = path.resolve(__dirname, '../src/components/curriculum/player/ExplanationStage.tsx');
assert(fs.existsSync(explanationPath), 'ExplanationStage.tsx must exist');
const explanationSrc = fs.readFileSync(explanationPath, 'utf8');

// Must import stopAllSpeech
assert(
  explanationSrc.includes('stopAllSpeech'),
  'ExplanationStage.tsx must import stopAllSpeech'
);

// handlePlayPitchMelody must stop speech synthesis to prevent audio clash
const pitchFnIdx = explanationSrc.indexOf('handlePlayPitchMelody');
assert(pitchFnIdx !== -1, 'handlePlayPitchMelody must be defined');
const pitchFnSrc = explanationSrc.slice(pitchFnIdx, pitchFnIdx + 500);
assert(
  pitchFnSrc.includes('stopAllSpeech();'),
  'handlePlayPitchMelody must call stopAllSpeech() before triggering pitch audio'
);

// handlePlayAudio must stop prior speech and not hardcode 1.0 rate
const audioFnIdx = explanationSrc.indexOf('const handlePlayAudio =');
assert(audioFnIdx !== -1, 'handlePlayAudio must be defined');
const audioFnSrc = explanationSrc.slice(audioFnIdx, audioFnIdx + 200);
assert(
  audioFnSrc.includes('stopAllSpeech();'),
  'handlePlayAudio must cancel existing speech before speaking'
);
assert(
  !audioFnSrc.includes('speakJapanese(text, 1.0)'),
  'handlePlayAudio must not hardcode 1.0 rate so user settings are respected'
);
console.log('  ✅ ExplanationStage.tsx audio concurrency verified.\n');

// ──────────────────────────────────────────────────────────────────
// Test 4: CanDoCompletionStage.tsx Defense-in-Depth & Garden Seeding
// ──────────────────────────────────────────────────────────────────
console.log('▶ Test 4: CanDoCompletionStage.tsx defense-in-depth & garden seeding...');
const canDoPath = path.resolve(__dirname, '../src/components/curriculum/player/CanDoCompletionStage.tsx');
assert(fs.existsSync(canDoPath), 'CanDoCompletionStage.tsx must exist');
const canDoSrc = fs.readFileSync(canDoPath, 'utf8');

// Must import resolveTrackToJLPTLevel
assert(
  canDoSrc.includes('resolveTrackToJLPTLevel'),
  'CanDoCompletionStage.tsx must import resolveTrackToJLPTLevel'
);

// Must import stopAllSpeech and clean up on unmount
assert(
  canDoSrc.includes('stopAllSpeech') &&
  canDoSrc.includes('stopAllSpeech();'),
  'CanDoCompletionStage.tsx must stop speech synthesis on unmount'
);

// Must not use hardcoded n5 fallback in garden seeding
assert(
  !canDoSrc.includes("? 'n4' : lesson.unit_id?.includes('n3') ? 'n3' : 'n5') as any;"),
  'CanDoCompletionStage.tsx must not hardcode targetLevel fallback'
);

// Must use resolveTrackToJLPTLevel for plant seeding
assert(
  canDoSrc.includes("resolveTrackToJLPTLevel(lesson.unit_id || lesson.id || 'n5')"),
  'CanDoCompletionStage.tsx must resolve targetLevel via resolveTrackToJLPTLevel'
);
console.log('  ✅ CanDoCompletionStage.tsx defense-in-depth verified.\n');

// ──────────────────────────────────────────────────────────────────
// Test 5: speechEngine.ts stopJapaneseSpeech and stopAllSpeech Alias
// ──────────────────────────────────────────────────────────────────
console.log('▶ Test 5: speechEngine.ts stopAllSpeech export & speech cancellation...');
const speechEnginePath = path.resolve(__dirname, '../src/lib/audio/speechEngine.ts');
assert(fs.existsSync(speechEnginePath), 'speechEngine.ts must exist');
const speechEngineSrc = fs.readFileSync(speechEnginePath, 'utf8');

assert(speechEngineSrc.includes('export function stopJapaneseSpeech'), 'speechEngine must export stopJapaneseSpeech');
assert(speechEngineSrc.includes('export const stopAllSpeech = stopJapaneseSpeech'), 'speechEngine must export stopAllSpeech alias');
assert(speechEngineSrc.includes('window.speechSynthesis.cancel()'), 'speechEngine must call speechSynthesis.cancel()');

console.log('  ✅ speechEngine.ts audio control exports verified.\n');

console.log('🎉 Siklus XII Pass 3: All 5 verification suites passed 100% GREEN!\n');
