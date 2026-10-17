// ══════════════════════════════════════════════════════════════════
//  test-sprint-34-pitch-accent.js — Forensic Unit & Integration Suite
//  Sprint 34: Japanese Pitch Accent Contour Visualizer, OJAD Alignment,
//  Mora Timing Engine & Remediation of Answer Leaks (Tickets T-186 to T-190)
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
console.log('🎵 RUNNING SPRINT 34 VERIFICATION SUITE: PITCH ACCENT & MORA');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-186: Ingest OJAD & Wadoku Pitch Accent Database ──
test('T-186: pitch-accent-index.json and pitchAccentManager resolve canonical Tokyo contours', () => {
  const indexPath = path.join(ROOT_DIR, 'public/data/pitch/pitch-accent-index.json');
  assert(fs.existsSync(indexPath), 'pitch-accent-index.json must exist');
  
  const rawIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const keyCount = Object.keys(rawIndex).length;
  console.log(`     Indexed keys in pitch-accent-index.json: ${keyCount}`);
  assert(keyCount > 50000, `Must index > 50,000 keys (found ${keyCount})`);

  // Verify minimal pairs in raw index
  const ameRain = rawIndex['雨:あめ'] || rawIndex['雨'];
  assert(ameRain, 'Must index 雨');
  assert.strictEqual(ameRain.pattern, 1, '雨 must be pattern 1 (Atamadaka)');
  assert.strictEqual(ameRain.category, 'atamadaka');
  assert.strictEqual(ameRain.downstep_mora, 1);
  assert(ameRain.contour.includes('＼'), 'Contour must contain downstep mark');

  const ameCandy = rawIndex['飴:あめ'] || rawIndex['飴'];
  assert(ameCandy, 'Must index 飴');
  assert.strictEqual(ameCandy.pattern, 0, '飴 must be pattern 0 (Heiban)');
  assert.strictEqual(ameCandy.category, 'heiban');
  assert.strictEqual(ameCandy.downstep_mora, 0);

  const hashiChopsticks = rawIndex['箸:はし'] || rawIndex['箸'];
  assert(hashiChopsticks, 'Must index 箸');
  assert.strictEqual(hashiChopsticks.pattern, 1, '箸 must be pattern 1 (Atamadaka)');

  const hashiBridge = rawIndex['橋:はし'] || rawIndex['橋'];
  assert(hashiBridge, 'Must index 橋');
  assert.strictEqual(hashiBridge.pattern, 2, '橋 must be pattern 2 (Odaka)');

  // Verify vocabulary files are enriched with pitch
  let enrichedVocab = 0;
  for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
    const file = path.join(ROOT_DIR, `public/data/vocab/vocab-${lvl}.js`);
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/"pitch":\s*\{/g);
    if (matches) enrichedVocab += matches.length;
  }
  console.log(`     Total vocabulary records enriched with pitch: ${enrichedVocab}`);
  assert(enrichedVocab > 9000, `Must enrich > 9,000 vocab records with pitch (found ${enrichedVocab})`);
});

// ── T-187: Eradicate Universal Heiban Default & Wire Curriculum Vocab Badges ──
test('T-187: ExplanationStage and DetailModal query pitchAccentManager and eliminate false Heiban default', () => {
  const curriculumTypesPath = path.join(ROOT_DIR, 'src/types/curriculum.ts');
  const curriculumTypes = fs.readFileSync(curriculumTypesPath, 'utf8');
  assert(curriculumTypes.includes('pitch?: PitchAccentEntry;'), 'LessonVocabDetail must declare pitch field');

  const explanationPath = path.join(ROOT_DIR, 'src/components/curriculum/player/ExplanationStage.tsx');
  const explanationCode = fs.readFileSync(explanationPath, 'utf8');
  assert(explanationCode.includes('lookupPitch'), 'ExplanationStage must import and use lookupPitch');
  assert(!explanationCode.includes('<PitchAccentBadge reading={vb.reading || vb.word} compact />'), 
    'ExplanationStage must NOT render PitchAccentBadge without pattern prop');

  const detailModalPath = path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx');
  const detailModalCode = fs.readFileSync(detailModalPath, 'utf8');
  assert(detailModalCode.includes('lookupPitch'), 'DetailModal must import and use lookupPitch');
  assert(!detailModalCode.includes('pattern={(vocab as any)?.pitch_pattern ?? 0}'),
    'DetailModal must NOT fall back to pattern 0 Heiban default');
});

// ── T-188: Fix Critical Answer Leaks & Dynamic Odaka Labeling ──
test('T-188: QuizPage hides pitchContour until submitted and quizEngine calculates dynamic Odaka labels', () => {
  const quizPagePath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
  const quizPageCode = fs.readFileSync(quizPagePath, 'utf8');
  
  // Verify answer leak is sealed: pitchContour requires feedback
  assert(quizPageCode.includes('feedback && currentQ.pitchContour'), 
    'pitchContour must only be revealed after feedback is submitted');
  assert(!quizPageCode.includes('currentQ.pitchContour && (\n                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/15'),
    'Unconditional pitchContour leak must be eradicated');

  // Verify question audio button sanitizes text
  assert(quizPageCode.includes('replace(/^Kata:\\s*"?/'), 'Speech audio must strip Kata prefix');

  // Verify quizEngine dynamic Odaka calculation
  const quizEnginePath = path.join(ROOT_DIR, 'src/lib/quiz/quizEngine.ts');
  const quizEngineCode = fs.readFileSync(quizEnginePath, 'utf8');
  assert(quizEngineCode.includes('const odakaLabel = `[${moraCount}] Odaka'),
    'quizEngine must dynamically calculate Odaka label based on moraCount');
});

// ── T-189: Re-engineer PitchAccentBadge with Enclitic Particle Slot & SVG Overflow ──
test('T-189: PitchAccentBadge supports enclitic particle slot and Odaka particle downstep', () => {
  const badgePath = path.join(ROOT_DIR, 'src/components/curriculum/interactive/PitchAccentBadge.tsx');
  assert(fs.existsSync(badgePath), 'PitchAccentBadge.tsx must exist');
  const badgeCode = fs.readFileSync(badgePath, 'utf8');

  assert(badgeCode.includes('particle?: string'), 'Must accept optional particle prop');
  assert(badgeCode.includes('isParticle?: boolean'), 'Must model isParticle in PitchMoraNode');
  assert(badgeCode.includes('overflow-visible'), 'SVG must specify overflow-visible');

  // Verify getMoraPitches implementation and Odaka / 1-mora handling
  assert(badgeCode.includes('export function getMoraPitches('), 'Must export getMoraPitches');
  assert(badgeCode.includes('pattern === moraCount'), 'Must identify Odaka when pattern === moraCount');
  assert(badgeCode.includes('particle || \'が\''), 'Must default particle to が');
  assert(badgeCode.includes('isParticle: true'), 'Must tag particle node with isParticle: true');
  assert(badgeCode.includes('viewBox={`0 0 ${svgWidth} 26`}'), 'Must dynamically calculate SVG viewbox');
});

// ── T-190: Canonical moraTokenizer and Web Audio Mora Metronome ──
test('T-190: moraTokenizer provides phonological splitting and MoraPacingCard has Web Audio click', () => {
  const tokenizerPath = path.join(ROOT_DIR, 'src/lib/audio/moraTokenizer.ts');
  assert(fs.existsSync(tokenizerPath), 'moraTokenizer.ts must exist');
  const tokenizerCode = fs.readFileSync(tokenizerPath, 'utf8');

  assert(tokenizerCode.includes('export function splitIntoMora'), 'Must export splitIntoMora');
  assert(tokenizerCode.includes('export function generatePhonologicalDistractors'), 'Must export generatePhonologicalDistractors');

  // Verify MoraPacingCard uses Web Audio click tone
  const pacingCardPath = path.join(ROOT_DIR, 'src/components/quiz/MoraPacingCard.tsx');
  const pacingCardCode = fs.readFileSync(pacingCardPath, 'utf8');
  assert(pacingCardCode.includes('playMoraClickTone'), 'Must define playMoraClickTone');
  assert(pacingCardCode.includes('createOscillator()'), 'Must synthesize tones via Web Audio API');
  assert(pacingCardCode.includes('exponentialRampToValueAtTime'), 'Must shape click audio envelope');

  // Verify generateMoraPacingQuestions hides answer in subText and shuffles options
  const quizEnginePath = path.join(ROOT_DIR, 'src/lib/quiz/quizEngine.ts');
  const quizEngineCode = fs.readFileSync(quizEnginePath, 'utf8');
  assert(!quizEngineCode.includes('subText: `Artikulasi ${morae.length} mora merata: ${morae.join(\' • \')}`'),
    'subText must not leak the mora answer');
  assert(quizEngineCode.includes('generatePhonologicalDistractors'),
    'generateMoraPacingQuestions must use realistic phonological distractors');
  assert(quizEngineCode.includes('shuffle([correctAnswer, ...distractors])'),
    'options must be shuffled to prevent correct answer always at index 0');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 34 TEST SUMMARY: ${passedTests} / ${totalTests} PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
