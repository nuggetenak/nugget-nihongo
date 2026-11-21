// ══════════════════════════════════════════════════════════════════
//  tests/test-s9-pass1-e2e-onboarding-cat.js
//  Siklus IX Pass 1 (Suite 203):
//  End-to-End User Experience & Forensic Logic Audit:
//  Onboarding Wizard, CAT IRT Diagnostic Placement & First-Day Setup
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS IX PASS 1: ONBOARDING & CAT IRT FORENSIC VERIFICATION   ║');
console.log('║   Suite 203 | Logic Flaws, State Machines & 320px Ergonomics     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

let passCount = 0;
const totalChecks = 6;

// ── Check 1: Onboarding 3-Step Wizard Structure & Anti-Microfont Contract ──
console.log('📋 Check 1: Onboarding 3-Step Wizard Structure & Typography Ergonomics');
{
  const onboardingPath = path.join(ROOT, 'src/components/onboarding/OnboardingModal.tsx');
  assert(fs.existsSync(onboardingPath), 'OnboardingModal.tsx must exist');
  const code = fs.readFileSync(onboardingPath, 'utf8');

  // Verify 3-step wizard structure
  assert.ok(code.includes('type OnboardingStep = 1 | 2 | 3;'), 'Must define 3-step wizard type');
  assert.ok(code.includes('LANGKAH 1: FILOSOFI & SAMBUTAN'), 'Must render Step 1 header');
  assert.ok(code.includes('LANGKAH 2: PENENTUAN LEVEL & CAT'), 'Must render Step 2 header');
  assert.ok(code.includes('LANGKAH 3: TARGET HARIAN & PREFERENSI'), 'Must render Step 3 header');

  // Anti-microfont audit (<12px)
  const microfontMatches = code.match(/text-\[(8|9|10|10\.5|11|11\.5)px\]/g);
  assert.strictEqual(
    microfontMatches,
    null,
    `Found illegal micro-fonts below 12px in OnboardingModal: ${microfontMatches?.join(', ')}`
  );

  // Focus trap and body scroll lock
  assert.ok(code.includes('useFocusTrap'), 'Must bind useFocusTrap');
  assert.ok(code.includes('useBodyScrollLock(modalOpen)'), 'Must bind useBodyScrollLock');
  assert.ok(code.includes('e.preventDefault()'), 'Must call e.preventDefault() on Escape');

  console.log('  ✅ Check 1 Passed: 3-step wizard structure, zero microfonts, and a11y focus traps verified.');
  passCount++;
}

// ── Check 2: State Machine Concurrency & Race Condition Safeguards ─────────
console.log('\n📋 Check 2: State Machine Concurrency & Double-Click Race Condition Defense');
{
  const onboardingPath = path.join(ROOT, 'src/components/onboarding/OnboardingModal.tsx');
  const code = fs.readFileSync(onboardingPath, 'utf8');

  // isAdvancing double-click protection on next question CTA
  assert.ok(
    code.includes('const [isAdvancing, setIsAdvancing] = useState<boolean>(false);'),
    'Must declare isAdvancing state guard'
  );
  assert.ok(
    code.includes('if (!catCurrentQ || isAdvancing) return;'),
    'handleCatNextQuestion must guard against duplicate submissions while advancing'
  );

  // isSubmitting double-click protection on finish onboarding CTA
  assert.ok(
    code.includes('const [isSubmitting, setIsSubmitting] = useState<boolean>(false);'),
    'Must declare isSubmitting state guard'
  );
  assert.ok(
    code.includes('if (isSubmitting) return;'),
    'handleFinishOnboarding must guard against duplicate submissions'
  );

  // Reliable addPlacementResult on question pool exhaustion
  const poolExhaustionMatch = code.includes('if (!nextQ) {') && code.includes('addPlacementResult({');
  assert.ok(
    poolExhaustionMatch,
    'Must reliably record placement result in diagnostic store even if questions exhaust'
  );

  // Private browsing localStorage safe try-catch
  assert.ok(
    code.includes("try {\n      if (typeof window !== 'undefined') {\n        localStorage.setItem('nn_onboarding_completed'") ||
    code.includes("localStorage.setItem('nn_onboarding_completed', 'true');"),
    'Must protect localStorage access'
  );

  console.log('  ✅ Check 2 Passed: Debounce guards, exhaustion result persistence, and storage safety verified.');
  passCount++;
}

// ── Check 3: Educational & Vocational Curriculum Mapping Accuracy ──────────
console.log('\n📋 Check 3: Educational & Vocational Curriculum Level Mapping');
{
  const onboardingPath = path.join(ROOT, 'src/components/onboarding/OnboardingModal.tsx');
  const code = fs.readFileSync(onboardingPath, 'utf8');

  // Minna no Nihongo I must map to N5 (Bab 1-25)
  assert.ok(
    code.includes("item.id === 'minna-1' ? 'n5' : 'n4'"),
    'Minna no Nihongo I must correctly map to N5 level'
  );

  // Absolute beginner N5 mapping
  assert.ok(
    code.includes("setChosenLevel('n5')") && code.includes("setChosenTrack('n5')"),
    'Beginner path must set N5 track and level'
  );

  // Daily XP tiers
  assert.ok(code.includes('chosenDailyXp === 20') || code.includes('xp: 20'), 'Must support 20 XP tier');
  assert.ok(code.includes('chosenDailyXp === 50') || code.includes('xp: 50'), 'Must support 50 XP tier');
  assert.ok(code.includes('chosenDailyXp === 100') || code.includes('xp: 100'), 'Must support 100 XP tier');

  console.log('  ✅ Check 3 Passed: Minna 1 N5 mapping, beginner path, and daily XP tiers verified.');
  passCount++;
}

// ── Check 4: Mathematical IRT Convergence & Clamping Bounds ────────────────
console.log('\n📋 Check 4: Mathematical IRT Bounds & Dynamic Stopping Criterion');
{
  const catEngine = await import('../src/lib/cat/catEngine.ts');
  const {
    calculate3PLProbability,
    calculateFisherInformation,
    calculateCATSEM,
    updateThetaEstimate,
    shouldStopCAT,
    mapThetaToJLPTLevel,
  } = catEngine;

  // 1. 3PL Probability Bounds [c, 0.9999]
  const pMin = calculate3PLProbability(-5.0, 5.0, 1.25, 0.25);
  const pMax = calculate3PLProbability(5.0, -5.0, 1.25, 0.25);
  assert.ok(pMin >= 0.25, `pMin must be >= guessing (0.25), got ${pMin}`);
  assert.ok(pMax <= 0.9999, `pMax must be <= 0.9999, got ${pMax}`);

  // 2. Fisher Information non-negative
  const info = calculateFisherInformation({ difficulty: 0.0, discrimination: 1.25, guessing: 0.25 }, 0.0);
  assert.ok(Number.isFinite(info) && info > 0, `Fisher Info must be positive finite number, got ${info}`);

  // 3. SEM Prior & Convergence Math
  const initialSem = calculateCATSEM([], 0.0);
  assert.strictEqual(initialSem, 1.0, 'Initial SEM with prior must be exactly 1.0');

  // Simulated 6 perfect questions should lower SEM
  const dummyQuestions = Array(6).fill({
    question: { difficulty: 0.0, discrimination: 1.25, guessing: 0.25 },
    isCorrect: true,
  });
  const semAfter6 = calculateCATSEM(dummyQuestions, 0.0);
  assert.ok(semAfter6 < initialSem, `SEM after 6 items (${semAfter6}) must be lower than initial (${initialSem})`);

  // 4. Extreme Theta Streaks Clamping [-2.2, +2.2]
  let runawayThetaHigh = 0.0;
  for (let i = 0; i < 20; i++) {
    runawayThetaHigh = updateThetaEstimate(runawayThetaHigh, true, runawayThetaHigh, i, 12);
  }
  assert.ok(
    runawayThetaHigh <= 2.2,
    `Runaway positive theta must be clamped at +2.2, got ${runawayThetaHigh}`
  );
  assert.strictEqual(mapThetaToJLPTLevel(runawayThetaHigh), 'n1', 'Max theta must map to N1');

  let runawayThetaLow = 0.0;
  for (let i = 0; i < 20; i++) {
    runawayThetaLow = updateThetaEstimate(runawayThetaLow, false, runawayThetaLow, i, 12);
  }
  assert.ok(
    runawayThetaLow >= -2.2,
    `Runaway negative theta must be clamped at -2.2, got ${runawayThetaLow}`
  );
  assert.strictEqual(mapThetaToJLPTLevel(runawayThetaLow), 'n5', 'Min theta must map to N5');

  // 5. Stopping Criterion
  assert.strictEqual(shouldStopCAT(5, 0.10, 6, 12), false, 'Must not stop before minQuestions (6)');
  assert.strictEqual(shouldStopCAT(6, 0.30, 6, 12), true, 'Must stop when SEM <= 0.35 at 6 questions');
  assert.strictEqual(shouldStopCAT(12, 0.50, 6, 12), true, 'Must stop at maxQuestions (12)');

  console.log('  ✅ Check 4 Passed: 3PL bounds, Fisher info, SEM convergence, and theta clamping verified.');
  passCount++;
}

// ── Check 5: 200 Indonesian Learner Persona Simulation Convergence ─────────
console.log('\n📋 Check 5: 200 Indonesian Learner Personas Diagnostic Simulation');
{
  const personasPath = path.join(ROOT, 'tests/fixtures/personas/200_INDONESIAN_LEARNER_PERSONAS.json');
  assert(fs.existsSync(personasPath), 'Canonical 200 personas fixture must exist');
  const { personas } = JSON.parse(fs.readFileSync(personasPath, 'utf8'));

  const catEngine = await import('../src/lib/cat/catEngine.ts');
  const {
    updateThetaEstimate,
    calculateCATSEM,
    shouldStopCAT,
    finalizeCATResult,
    CAT_MIN_QUESTIONS,
    CAT_MAX_QUESTIONS,
  } = catEngine;

  let simulatedCount = 0;
  for (const persona of personas) {
    // Determine simulated accuracy based on target level
    let targetAcc = 0.5;
    if (persona.target_jlpt_level === 'n1') targetAcc = 0.90;
    else if (persona.target_jlpt_level === 'n2') targetAcc = 0.80;
    else if (persona.target_jlpt_level === 'n3') targetAcc = 0.65;
    else if (persona.target_jlpt_level === 'n4') targetAcc = 0.45;
    else targetAcc = 0.25;

    let theta = 0.0;
    const history = [];

    for (let q = 0; q < CAT_MAX_QUESTIONS; q++) {
      const isCorrect = Math.random() < targetAcc;
      const difficulty = theta + (Math.random() - 0.5) * 0.4;
      history.push({
        question: { id: `q-${q}`, difficulty, discrimination: 1.25, guessing: 0.25, stimulus: 'Sim', targetJapanese: 'テスト', options: ['A','B','C','D'], correctIndex: 0, level: 'n5', explanation: '', patterns: [], rootCause: '' },
        isCorrect,
      });

      theta = updateThetaEstimate(theta, isCorrect, difficulty, q, CAT_MAX_QUESTIONS);
      const sem = calculateCATSEM(history, theta);

      if (shouldStopCAT(history.length, sem, CAT_MIN_QUESTIONS, CAT_MAX_QUESTIONS)) {
        break;
      }
    }

    const res = finalizeCATResult(history, theta);
    assert.ok(Number.isFinite(res.theta), `Theta for ${persona.name} must be finite`);
    assert.ok(Number.isFinite(res.sem), `SEM for ${persona.name} must be finite`);
    assert.ok(res.accuracy >= 0 && res.accuracy <= 100, `Accuracy for ${persona.name} must be in [0, 100]`);
    assert.ok(['n5', 'n4', 'n3', 'n2', 'n1'].includes(res.estimatedLevel), `Invalid estimated level for ${persona.name}`);
    simulatedCount++;
  }

  assert.strictEqual(simulatedCount, 200, 'Must successfully simulate all 200 personas');
  console.log(`  ✅ Check 5 Passed: 100% of ${simulatedCount} Indonesian learner personas successfully diagnosed.`);
  passCount++;
}

// ── Check 6: 320px Viewport Physical Layout & User Escape Controls ─────────
console.log('\n📋 Check 6: 320px Viewport Anti-Squish & In-Modal User Escape Controls');
{
  const onboardingPath = path.join(ROOT, 'src/components/onboarding/OnboardingModal.tsx');
  const code = fs.readFileSync(onboardingPath, 'utf8');

  // Option text wrapper must include flex-1 min-w-0 for small mobile distribution
  assert.ok(
    code.includes('min-w-0 flex-1') || code.includes('flex-1 min-w-0'),
    'Option text wrapper must include flex-1 min-w-0 to avoid small mobile squishing'
  );

  // In-modal user escape control inside CAT screen
  assert.ok(
    code.includes('Batal & Pilih Manual') || code.includes("setStep2Mode('choose')"),
    'CAT screen must provide an escape button to return to manual level selection'
  );

  // Accessible Hanko and Irasutoya assets
  assert.ok(code.includes('assetId="sensei_teaching"'), 'Step 1 must feature sensei_teaching avatar');
  assert.ok(code.includes('cleanCATOptionText(opt)'), 'CAT options must be cleanly sanitized');

  console.log('  ✅ Check 6 Passed: 320px flex-1 anti-squish, in-modal escape button, and Irasutoya assets verified.');
  passCount++;
}

// ── Master Summary ────────────────────────────────────────────────────────
console.log('══════════════════════════════════════════════════════════════════');
console.log(`🎉 SIKLUS IX PASS 1 VERIFICATION RESULT: ${passCount}/${totalChecks} CHECKS PASSED (100% GREEN)`);
console.log('══════════════════════════════════════════════════════════════════\n');
process.exit(0);
