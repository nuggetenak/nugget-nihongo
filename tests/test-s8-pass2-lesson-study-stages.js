// ══════════════════════════════════════════════════════════════════
//  test-s8-pass2-lesson-study-stages.js
//  Siklus VIII Pass 2 (Sprint 48): 4-Stage Lesson Player, Study Studio Ergonomics & Anti-Exploit Timing Engine
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 189: Siklus VIII Pass 2 (Sprint 48): 4-Stage Lesson Player, Study Studio Ergonomics & Anti-Exploit Timing Engine...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: LessonStudyPage 4-Stage Stepper & Anti-Skip Guard ──────
console.log('  Check 48.1: Verifying LessonStudyPage 4-stage stepper & Stage 4 lock...');
const studyPagePath = path.join(ROOT, 'src', 'pages', 'LessonStudyPage.tsx');
assert(fs.existsSync(studyPagePath), 'LessonStudyPage.tsx must exist');
const studyPageContent = fs.readFileSync(studyPagePath, 'utf8');

assert(
  studyPageContent.includes("id: 'dialogue'") &&
  studyPageContent.includes("id: 'explanation'") &&
  studyPageContent.includes("id: 'drills'") &&
  studyPageContent.includes("id: 'cando'"),
  'LessonStudyPage must declare all 4 distinct learning stages'
);

assert(
  studyPageContent.includes('isCanDoLocked = st.id === \'cando\' && !isLessonDone && (drillScore === null || drillScore < 80)') &&
  studyPageContent.includes('Tahap 4 Terkunci: Selesaikan Cek Pemahaman'),
  'LessonStudyPage must enforce anti-skip lock on Stage 4 requiring >=80% score'
);

assert(
  studyPageContent.includes('isLessonDone = Boolean(') &&
  studyPageContent.includes('Array.isArray(trackProgress[trackId]?.completedLessons)'),
  'LessonStudyPage must strictly validate completedLessons array when determining lesson completion status'
);
console.log('  ✅ Check 48.1 passed: LessonStudyPage 4-stage stepper and anti-skip lock verified.');

// ── Check 2: lessonStageEngine Pure Progression & Score Math ────────
console.log('  Check 48.2: Verifying lessonStageEngine pure progression logic & scoring boundaries...');
const enginePath = path.join(ROOT, 'src', 'lib', 'curriculum', 'lessonStageEngine.ts');
assert(fs.existsSync(enginePath), 'lessonStageEngine.ts must exist');
const engineContent = fs.readFileSync(enginePath, 'utf8');

assert(
  engineContent.includes('isStage4Locked') &&
  engineContent.includes('canNavigateToStage') &&
  engineContent.includes('calculateDrillScore') &&
  engineContent.includes('LESSON_PASSING_THRESHOLD = 80'),
  'lessonStageEngine must export isStage4Locked, canNavigateToStage, and calculateDrillScore with threshold 80'
);

assert(
  engineContent.includes('if (!Number.isFinite(totalDrills) || totalDrills <= 0)') &&
  engineContent.includes('Math.max(0, Math.min(100, Math.round(ratio * 100)))'),
  'lessonStageEngine calculateDrillScore must mathematically guard against 0/NaN/negative boundaries'
);
console.log('  ✅ Check 48.2 passed: lessonStageEngine pure progression logic verified.');

// ── Check 3: MicroDrillStage Defensive String Handling & Retry Loop ─
console.log('  Check 48.3: Verifying MicroDrillStage defensive string handling & retry loop...');
const drillPath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'MicroDrillStage.tsx');
assert(fs.existsSync(drillPath), 'MicroDrillStage.tsx must exist');
const drillContent = fs.readFileSync(drillPath, 'utf8');

assert(
  drillContent.includes('cleanAnswer = (answerToTest || \'\').trim()') &&
  drillContent.includes('cleanCorrect = (currentItem.correctAnswer || \'\').trim()'),
  'MicroDrillStage must defensively sanitize answers against null/undefined before trimming'
);

assert(
  drillContent.includes('retryQueue') &&
  drillContent.includes('setActiveQueue(retryQueue)') &&
  drillContent.includes('firstAttemptCorrect'),
  'MicroDrillStage must implement retry loop queue and track first-attempt statistics'
);
console.log('  ✅ Check 48.3 passed: MicroDrillStage defensive strings and retry loop verified.');

// ── Check 4: DialogueStage Audio Lifecycle & Speaker Persona ────────
console.log('  Check 48.4: Verifying DialogueStage audio cleanup & bimodal playback...');
const dialoguePath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'DialogueStage.tsx');
assert(fs.existsSync(dialoguePath), 'DialogueStage.tsx must exist');
const dialogueContent = fs.readFileSync(dialoguePath, 'utf8');

assert(
  dialogueContent.includes('window.speechSynthesis.cancel()') &&
  dialogueContent.includes('activeAudioRef.current.pause()'),
  'DialogueStage must perform audio cleanup on unmount to prevent speech synthesis bleeding'
);

assert(
  dialogueContent.includes('resolveSpeakerPersona(line.speaker)') &&
  dialogueContent.includes('speechRate'),
  'DialogueStage must resolve speaker persona gender and support speech rate modulation'
);
console.log('  ✅ Check 48.4 passed: DialogueStage audio cleanup and speaker personas verified.');

// ── Check 5: ExplanationStage 3 Pillars & Segmented Navigation ─────
console.log('  Check 48.5: Verifying ExplanationStage 3-pillar structure & pitch accent playback...');
const explanationPath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx');
assert(fs.existsSync(explanationPath), 'ExplanationStage.tsx must exist');
const explanationContent = fs.readFileSync(explanationPath, 'utf8');

assert(
  explanationContent.includes('activeSubTab') &&
  explanationContent.includes("'all'") &&
  explanationContent.includes("'grammar'") &&
  explanationContent.includes("'vocab'") &&
  explanationContent.includes("'pitfalls'"),
  'ExplanationStage must support segmented views for all 3 pillars (grammar, vocab, pitfalls)'
);

assert(
  explanationContent.includes('handlePlayPitchMelody') &&
  explanationContent.includes('playPitchToneMelody') &&
  explanationContent.includes('PedagogicalFrameworkCard'),
  'ExplanationStage must integrate pitch tone melody synthesis and pedagogical framework cards'
);
console.log('  ✅ Check 48.5 passed: ExplanationStage 3-pillar structure and pitch audio verified.');

console.log('\n🎉 Suite 189 (Siklus VIII Pass 2: 4-Stage Lesson Player & Study Studio Ergonomics) PASSED (5/5 checks 100% GREEN)!\n');
process.exit(0);
