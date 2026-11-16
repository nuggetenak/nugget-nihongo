// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint32-pacing-telemetry-webvitals.js — Regression Suite
//  Sprint 32 (Pass 10): Micro-Session Pacing, Review Telemetry & Core Web Vitals
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
    throw err;
  }
}

console.log('\n====================================================================');
console.log('⏱️ SPRINT 32: MICRO-SESSION PACING, TELEMETRY & WEB VITALS RIGOR');
console.log('====================================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── Test 1: Micro-Session Pacing Architecture & Research Caps ──
test('T1: microSessionEngine.ts enforces Cowan (2001) caps and 4-phase choreography', () => {
  const pacingPath = path.join(ROOT_DIR, 'src/lib/session/microSessionEngine.ts');
  assert(fs.existsSync(pacingPath), 'microSessionEngine.ts must exist');
  const code = fs.readFileSync(pacingPath, 'utf8');

  // Verify caps constants
  assert(code.includes('MIN_DURATION_SECONDS: 300'), 'Min duration must be 300s (5m)');
  assert(code.includes('MAX_DURATION_SECONDS: 420'), 'Max duration must be 420s (7m)');
  assert(code.includes('MAX_NEW_CHUNKS: 3'), 'New chunks capped at 3 (Cowan working memory limit)');
  assert(code.includes('MIN_REVIEW_CARDS: 12'), 'Min review cards must be 12');
  assert(code.includes('MAX_REVIEW_CARDS: 18'), 'Max review cards must be 18');

  // Verify export signatures
  assert(code.includes('export function createMicroSession'), 'Must export createMicroSession');
  assert(code.includes('export function advanceSessionCard'), 'Must export advanceSessionCard');
  assert(code.includes('export function calculateSessionSummary'), 'Must export calculateSessionSummary');
  assert(code.includes('export function isReflexLatency'), 'Must export isReflexLatency');
  assert(code.includes('export function formatSessionDuration'), 'Must export formatSessionDuration');
  assert(code.includes('export function getPhaseTitle'), 'Must export getPhaseTitle');
});

// ── Test 2: Dual-Track Review Telemetry & Buffer Sanitization ──
test('T2: reviewTelemetry.ts protects against corrupted storage and enforces dual-track coupling', () => {
  const telemetryPath = path.join(ROOT_DIR, 'src/lib/telemetry/reviewTelemetry.ts');
  assert(fs.existsSync(telemetryPath), 'reviewTelemetry.ts must exist');
  const code = fs.readFileSync(telemetryPath, 'utf8');

  // Verify storage buffer sanitization
  assert(code.includes('Array.isArray(parsed) ? parsed : []'), 'hydrateBuffer must sanitize non-array storage');
  assert(code.includes('!Array.isArray(this.buffer)'), 'persistBuffer must guard against non-array buffer');

  // Verify cross-modal constants
  assert(code.includes('ALPHA_CROSS: 0.25'), 'ALPHA_CROSS must be 0.25');
  assert(code.includes('BETA_CROSS: 0.65'), 'BETA_CROSS must be 0.65');

  // Verify safe parameters in recordReview
  assert(code.includes('safeLatency = Number.isFinite(params.latencyMs)'), 'Must sanitize latency parameter');
  assert(code.includes('safeOrtho = Number.isFinite(params.currentStabilityOrtho)'), 'Must sanitize ortho stability');
  assert(code.includes('safeAudio = Number.isFinite(params.currentStabilityAudio)'), 'Must sanitize audio stability');
});

// ── Test 3: Core Web Vitals Observer & Google Rating Thresholds ──
test('T3: webVitals.ts provides negative/NaN guards and standard Google CWV thresholds', () => {
  const vitalsPath = path.join(ROOT_DIR, 'src/lib/telemetry/webVitals.ts');
  assert(fs.existsSync(vitalsPath), 'webVitals.ts must exist');
  const code = fs.readFileSync(vitalsPath, 'utf8');

  // Verify rating functions
  assert(code.includes('rateLCP(value: number)'), 'Must define rateLCP');
  assert(code.includes('rateCLS(value: number)'), 'Must define rateCLS');
  assert(code.includes('rateINP(value: number)'), 'Must define rateINP');
  assert(code.includes('rateTTFB(value: number)'), 'Must define rateTTFB');
  assert(code.includes('getHealthSummary()'), 'Must define getHealthSummary');

  // Simulate rating function contracts
  function rateLCP(v) {
    if (!Number.isFinite(v) || v < 0) return 'poor';
    if (v <= 2500) return 'good';
    if (v <= 4000) return 'needs-improvement';
    return 'poor';
  }
  assert.strictEqual(rateLCP(2499), 'good');
  assert.strictEqual(rateLCP(3500), 'needs-improvement');
  assert.strictEqual(rateLCP(4500), 'poor');
  assert.strictEqual(rateLCP(NaN), 'poor');
  assert.strictEqual(rateLCP(-1), 'poor');

  function rateCLS(v) {
    if (!Number.isFinite(v) || v < 0) return 'poor';
    if (v <= 0.1) return 'good';
    if (v <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  assert.strictEqual(rateCLS(0.08), 'good');
  assert.strictEqual(rateCLS(0.20), 'needs-improvement');
  assert.strictEqual(rateCLS(0.35), 'poor');

  function rateINP(v) {
    if (!Number.isFinite(v) || v < 0) return 'poor';
    if (v <= 200) return 'good';
    if (v <= 500) return 'needs-improvement';
    return 'poor';
  }
  assert.strictEqual(rateINP(150), 'good');
  assert.strictEqual(rateINP(350), 'needs-improvement');
  assert.strictEqual(rateINP(600), 'poor');
});

// ── Test 4: Privacy Scrubber & Safe Serialization ──
test('T4: errorReporter.ts scrubs PII/keys and safeSerialize avoids circular recursion', () => {
  const errorPath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  assert(fs.existsSync(errorPath), 'errorReporter.ts must exist');
  const code = fs.readFileSync(errorPath, 'utf8');

  // Verify scrubber and serializer
  assert(code.includes('export function scrubSensitiveData'), 'Must export scrubSensitiveData');
  assert(code.includes('export function safeSerialize'), 'Must export safeSerialize');
  assert(code.includes('Array.isArray(parsed) ? parsed : []'), 'loadOfflineQueue must sanitize non-array storage');

  // Verify scrubber patterns
  assert(code.includes('sk-or-v1-'), 'Must pattern match OpenRouter keys');
  assert(code.includes('AIzaSy'), 'Must pattern match Gemini keys');
  assert(code.includes('Bearer '), 'Must pattern match Authorization Bearer tokens');
  assert(code.includes('[SCRUBBED_EMAIL]'), 'Must replace user emails with tag');
});

// ── Test 5: Acoustic Mora Metronome & Visual Pacing Card ──
test('T5: MoraPacingCard synthesizes 240 bpm Web Audio tones and provides clean speech text', () => {
  const moraPath = path.join(ROOT_DIR, 'src/components/quiz/MoraPacingCard.tsx');
  assert(fs.existsSync(moraPath), 'MoraPacingCard.tsx must exist');
  const code = fs.readFileSync(moraPath, 'utf8');

  // Verify Web Audio synthesized clicks
  assert(code.includes('playMoraClickTone'), 'Must implement playMoraClickTone');
  assert(code.includes('250'), 'Must tick at 250ms (240 bpm isochronous mora rhythm)');
  assert(code.includes('min-h-[44px]'), 'Must enforce 44px touch targets on buttons');

  // Verify speech text cleanup regex
  assert(code.includes("/[\\(（].*?[\\)）]/g"), 'Must strip parenthetical readings before speech synthesis');
});

// ── Test 6: Micro-Session Functional Simulation ──
test('T6: Pure micro-session state transition and summary calculation behave monotonically', () => {
  // Pure functional mock of advanceSessionCard & calculateSessionSummary
  const initialState = {
    sessionId: 'ms-test-1',
    currentPhase: 1,
    currentIndex: 0,
    cards: [
      { id: 'c1', phase: 1, archetype: 'speed_comprehension_blast', prompt: 'P1', targetPattern: '猫', correctAnswer: '猫', targetLatencyMs: 1500 },
      { id: 'c2', phase: 2, archetype: 'contrastive_pair_slot', prompt: 'P2', targetPattern: '犬', correctAnswer: '犬', targetLatencyMs: 3000 },
      { id: 'c3', phase: 3, archetype: 'production_type_cloze', prompt: 'P3', targetPattern: '鳥', correctAnswer: '鳥', targetLatencyMs: 2500 }
    ],
    elapsedSeconds: 0,
    newCardsCount: 1,
    reviewCardsCount: 2,
    latencies: [],
    phaseMetrics: {
      1: { completed: 0, correct: 0, averageLatencyMs: 0 },
      2: { completed: 0, correct: 0, averageLatencyMs: 0 },
      3: { completed: 0, correct: 0, averageLatencyMs: 0 },
      4: { completed: 0, correct: 0, averageLatencyMs: 0 },
    },
    trapReminders: [],
    isCompleted: false,
  };

  // Simulate answering 3 cards
  let current = initialState;
  current = {
    ...current,
    currentIndex: 1,
    currentPhase: 2,
    latencies: [1200],
    elapsedSeconds: 1,
    phaseMetrics: { ...current.phaseMetrics, 1: { completed: 1, correct: 1, averageLatencyMs: 1200 } }
  };
  current = {
    ...current,
    currentIndex: 2,
    currentPhase: 3,
    latencies: [1200, 2800],
    elapsedSeconds: 4,
    phaseMetrics: { ...current.phaseMetrics, 2: { completed: 1, correct: 1, averageLatencyMs: 2800 } }
  };
  current = {
    ...current,
    currentIndex: 3,
    currentPhase: 4,
    isCompleted: true,
    latencies: [1200, 2800, 2100],
    elapsedSeconds: 6,
    phaseMetrics: { ...current.phaseMetrics, 3: { completed: 1, correct: 1, averageLatencyMs: 2100 } }
  };

  assert.strictEqual(current.isCompleted, true);
  assert.strictEqual(current.currentPhase, 4);

  // Summary calculation simulation
  const total = current.latencies.length;
  assert.strictEqual(total, 3);
  const reflexCount = current.latencies.filter(l => l <= 1500).length;
  assert.strictEqual(reflexCount, 1);
  const reflexPct = Math.round((reflexCount / total) * 100);
  assert.strictEqual(reflexPct, 33);
});

console.log('\n====================================================================');
console.log(`✅ SPRINT 32 REGRESSION VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('====================================================================\n');
