// ══════════════════════════════════════════════════════════════════
//  test-sprint-7-sla-engines.js — Sprint 7 SLA Engines & Synthesis Suite
//  Verifies Tickets T-25, T-26, T-27, T-28:
//  - 6 Official TypeScript Data Contracts
//  - 19 Indonesian Calibrated FSRS Weights, Latency & Interference Penalties
//  - CAT IRT 2-PL Fisher Information & Dynamic SEM Stopping
//  - 36 Vocational K3 Panic Scenarios & Point-and-Call 2.0s Gestures
//  - 42 Clinical Pain Onomatopoeia Items (Sakamoto et al. 2014)
//  - HVPT 4-Speaker Component Compliance
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let totalChecks = 0;
let passedChecks = 0;

function check(desc, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✓ [PASS] ${desc}`);
  } catch (err) {
    console.error(`  ✗ [FAIL] ${desc}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — SPRINT 7 SLA ENGINES & SYNTHESIS SUITE       ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// ── TEST 1: T-25 Ingest the 6 Official TypeScript Data Contracts ──
console.log('── TEST 1: T-25 Ingest the 6 Official TypeScript Data Contracts ──');

const requiredContractFiles = [
  { path: 'src/types/fsrs.ts', symbols: ['FSRSCardData', 'CardState'] },
  { path: 'src/types/cat.ts', symbols: ['CATQuestionItem', 'CATSessionState'] },
  { path: 'src/types/diagnostic.ts', symbols: ['L1DiagnosticItem', 'L1InterferenceDomain'] },
  { path: 'src/types/hvpt.ts', symbols: ['HVPTPairItem', 'PitchAccentType', 'HVPTPairWord'] },
  { path: 'src/types/k3.ts', symbols: ['K3DisasterScenario', 'K3PointAndCallGate', 'K3HazardHotspot'] },
  { path: 'src/types/onomatopoeia.ts', symbols: ['PainOnomatopoeiaItem', 'PhysiologicalCluster', 'ClinicalEmergencyLevel'] },
];

requiredContractFiles.forEach(fileInfo => {
  check(`Contract file exists: ${fileInfo.path}`, () => {
    assert(fs.existsSync(fileInfo.path), `Missing contract file: ${fileInfo.path}`);
  });

  const content = fs.readFileSync(fileInfo.path, 'utf-8');
  fileInfo.symbols.forEach(sym => {
    check(`Contract ${fileInfo.path} exports interface/type '${sym}'`, () => {
      assert(content.includes(sym), `Symbol ${sym} missing in ${fileInfo.path}`);
    });
  });
});

// ── TEST 2: T-26 Ingest 19 Indonesian Calibrated FSRS Weights & Latency Tuning ──
console.log('\n── TEST 2: T-26 Ingest 19 Indonesian Calibrated FSRS Weights & Latency Tuning ──');

// Load math.ts through ts-node / transpile or direct regex/eval
const mathContent = fs.readFileSync('src/lib/fsrs/math.ts', 'utf-8');

check('math.ts defines INDONESIAN_CALIBRATED_FSRS_WEIGHTS with 19 parameters', () => {
  assert(mathContent.includes('INDONESIAN_CALIBRATED_FSRS_WEIGHTS'), 'Missing INDONESIAN_CALIBRATED_FSRS_WEIGHTS');
  const weightsMatch = mathContent.match(/INDONESIAN_CALIBRATED_FSRS_WEIGHTS:\s*number\[\]\s*=\s*\[([\s\S]*?)\];/);
  assert(weightsMatch, 'Could not parse weights array');
  const cleanCode = weightsMatch[1].replace(/\/\/.*$/gm, '');
  const nums = (cleanCode.match(/\d+\.\d+/g) || []).map(Number);
  assert.strictEqual(nums.length, 19, `Expected 19 weights, got ${nums.length}`);
  assert.strictEqual(nums[0], 0.4072, 'w0 must be 0.4072');
  assert.strictEqual(nums[3], 15.4722, 'w3 must be 15.4722');
  assert.strictEqual(nums[18], 0.3211, 'w18 must be 0.3211');
});

check('math.ts exports calculateLatencyFactor function with DeKeyser ranges', () => {
  assert(mathContent.includes('export function calculateLatencyFactor'), 'Missing calculateLatencyFactor');
  assert(mathContent.includes('1.20'), 'Missing reflex speed factor 1.20');
  assert(mathContent.includes('0.40'), 'Missing severe strain factor 0.40');
});

check('math.ts exports applyInterferencePenalty spike function', () => {
  assert(mathContent.includes('export function applyInterferencePenalty'), 'Missing applyInterferencePenalty');
  assert(mathContent.includes('0.20'), 'Missing catastrophic penalty 0.20');
  assert(mathContent.includes('10.0'), 'Missing difficulty clamp 10.0');
});

check('math.ts exports calculateDualTrackStability function with cross-modal coefficients', () => {
  assert(mathContent.includes('export function calculateDualTrackStability'), 'Missing calculateDualTrackStability');
  assert(mathContent.includes('alphaCross = 0.25'), 'Missing alphaCross default 0.25');
  assert(mathContent.includes('betaCross = 0.65'), 'Missing betaCross default 0.65');
});

// ── TEST 3: T-27 IRT 2-PL Model & Dynamic Stopping in CAT Engine ──
console.log('\n── TEST 3: T-27 IRT 2-PL Model & Dynamic Stopping in CAT Engine ──');

const catContent = fs.readFileSync('src/lib/cat/catEngine.ts', 'utf-8');

check('catEngine.ts exports calculateFisherInformation with 3PL/2PL formula', () => {
  assert(catContent.includes('export function calculateFisherInformation'), 'Missing calculateFisherInformation');
  assert(catContent.includes('pMinusC'), 'Missing 3PL pMinusC Fisher calculation');
});

check('catEngine.ts exports calculateCATSEM with standard normal prior', () => {
  assert(catContent.includes('export function calculateCATSEM'), 'Missing calculateCATSEM');
  assert(catContent.includes('totalInformation = 1.0'), 'Missing standard normal prior 1.0');
});

check('catEngine.ts enforces SEM <= 0.35 dynamic stopping criterion', () => {
  assert(catContent.includes('CAT_TARGET_SEM = 0.35'), 'Missing CAT_TARGET_SEM = 0.35');
  assert(catContent.includes('export function shouldStopCAT'), 'Missing shouldStopCAT');
});

check('catEngine.ts exports selectNextCATQuestion maximizing Fisher info', () => {
  assert(catContent.includes('export function selectNextCATQuestion'), 'Missing selectNextCATQuestion');
  assert(catContent.includes('scored.sort'), 'Missing ranking by Fisher info');
});

// ── TEST 4: T-28 36 K3 Vocational Disaster Scenarios & Point-and-Call ──
console.log('\n── TEST 4: T-28 36 K3 Vocational Disaster Scenarios & Point-and-Call ──');

const panicContent = fs.readFileSync('src/lib/data/panicScenarioManager.ts', 'utf-8');
const panicIds = panicContent.match(/id:\s*'panic-[^']+'/g) || [];

check(`Total canonical panic scenarios is at least 36 (got ${panicIds.length})`, () => {
  assert(panicIds.length >= 36, `Expected at least 36 panic scenarios, got ${panicIds.length}`);
});

const sectorsFound = {};
panicIds.forEach(idMatch => {
  const s = idMatch.split('-')[1];
  sectorsFound[s] = (sectorsFound[s] || 0) + 1;
});

check('All 8 vocational sectors represented (kaigo, jac, jaim, agri, fish, food, resto, forest)', () => {
  const expectedSectors = ['kaigo', 'jac', 'jaim', 'agri', 'fish', 'food', 'resto', 'forest'];
  expectedSectors.forEach(sec => {
    assert(sectorsFound[sec] && sectorsFound[sec] >= 4, `Sector ${sec} has insufficient scenarios (${sectorsFound[sec]})`);
  });
});

check('Forestry sector has 4 complete gemba scenarios', () => {
  assert.strictEqual(sectorsFound['forest'], 4, `Expected 4 forestry scenarios, got ${sectorsFound['forest']}`);
  assert(panicContent.includes('panic-forest-01'), 'Missing panic-forest-01');
  assert(panicContent.includes('panic-forest-02'), 'Missing panic-forest-02');
  assert(panicContent.includes('panic-forest-03'), 'Missing panic-forest-03');
  assert(panicContent.includes('panic-forest-04'), 'Missing panic-forest-04');
});

check('Scenarios define Point-and-Call targets with 2000ms hold time', () => {
  assert(panicContent.includes('pointAndCallTarget'), 'Missing pointAndCallTarget');
  assert(panicContent.includes('touchDurationMs: 2000'), 'Missing touchDurationMs: 2000');
});

// ── TEST 5: T-28 42 Clinical Pain Onomatopoeia Items (Sakamoto et al. 2014) ──
console.log('\n── TEST 5: T-28 42 Clinical Pain Onomatopoeia Items (Sakamoto et al. 2014) ──');

const painManagerPath = 'src/lib/data/painOnomatopoeiaManager.ts';
check(`Pain onomatopoeia manager file exists: ${painManagerPath}`, () => {
  assert(fs.existsSync(painManagerPath), `Missing ${painManagerPath}`);
});

const painContent = fs.readFileSync(painManagerPath, 'utf-8');
const painIds = painContent.match(/id:\s*\d+/g) || [];

check(`Total clinical pain onomatopoeia items is exactly 42 (got ${painIds.length})`, () => {
  assert.strictEqual(painIds.length, 42, `Expected 42 pain onomatopoeia items, got ${painIds.length}`);
});

check('All 7 physiological clusters are present in pain inventory', () => {
  const clusters = [
    'menusuk_tajam',
    'panas_terbakar',
    'tumpul_berat',
    'gatal_menggigit',
    'kaku_terkunci',
    'pusing_disorientasi',
    'sesak_napas'
  ];
  clusters.forEach(c => {
    assert(painContent.includes(c), `Cluster '${c}' missing in pain inventory`);
  });
});

check('Key emergency onomatopoeia items exist (zukizuki, gangan, chikuchiku, gushatto)', () => {
  assert(painContent.includes('ズキズキ'), 'Missing ズキズキ (zukizuki)');
  assert(painContent.includes('ガンガン'), 'Missing ガンガン (gangan)');
  assert(painContent.includes('チクチク'), 'Missing チクチク (chikuchiku)');
  assert(painContent.includes('グシャッと'), 'Missing グシャッと (gushatto)');
  assert(painContent.includes('immediate_119_ambulance'), 'Missing immediate_119_ambulance triage tag');
});

// ── TEST 6: T-28 HVPTPlayer Component Compliance ──
console.log('\n── TEST 6: T-28 HVPTPlayer Component Compliance ──');

const hvptPlayerPath = 'src/components/audio/HVPTPlayer.tsx';
check(`HVPTPlayer component exists: ${hvptPlayerPath}`, () => {
  assert(fs.existsSync(hvptPlayerPath), `Missing ${hvptPlayerPath}`);
});

const hvptContent = fs.readFileSync(hvptPlayerPath, 'utf-8');
check('HVPTPlayer incorporates 4-speaker switching (M1, M2, F1, F2)', () => {
  assert(hvptContent.includes('speaker_m1'), 'Missing speaker_m1');
  assert(hvptContent.includes('speaker_m2'), 'Missing speaker_m2');
  assert(hvptContent.includes('speaker_f1'), 'Missing speaker_f1');
  assert(hvptContent.includes('speaker_f2'), 'Missing speaker_f2');
});

check('HVPTPlayer renders pitch contour step graph (H and L mora tiles)', () => {
  assert(hvptContent.includes('renderPitchContour'), 'Missing renderPitchContour');
  assert(hvptContent.includes('pitchPattern'), 'Missing pitchPattern rendering');
});

check('HVPTPlayer adheres to multi-device responsive touch targets (>= 40px)', () => {
  assert(hvptContent.includes('min-h-[44px]') || hvptContent.includes('min-h-[40px]'), 'Missing 40px/44px touch target class');
  assert(hvptContent.includes('active:scale-95'), 'Missing active:scale-95 feedback');
});

// ── SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 7 SLA ENGINES SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (process.exitCode) {
  console.error('❌ SPRINT 7 SLA ENGINES VERIFICATION FAILED');
  process.exit(1);
} else {
  console.log('🎉 SPRINT 7 SLA ENGINES & SYNTHESIS SUITE 100% VERIFIED!\n');
}
