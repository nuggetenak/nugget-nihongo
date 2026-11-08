/**
 * SIKLUS V — PASS 36 VERIFICATION SUITE
 * Klaster 10: Gamification & Cognitive Pacing (Grand Finale)
 * Target: src/lib/session/microSessionEngine.ts
 *
 * Verifies:
 * 1. Cognitive Load Theory Caps & Cowan K=4 Working Memory Invariant.
 * 2. Defensive Session Instantiation & Bounds Clamping (empty/null array resilience).
 * 3. 4-Phase Choreography & State Machine Advancement (Phase 1 -> 2 -> 3 -> 4).
 * 4. Latency Sanitization & Native Reflex Recall Quantification (<= 1500ms).
 * 5. Metacognitive Session Summary & Dual Stability Vector Deltas (ortho/audio).
 * 6. Pure Pedagogical Helpers & 6 Card Archetypes Diversity.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 36: MICRO-SESSION PACING ENGINE INVARIANTS                 ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const ENGINE_PATH = path.join(ROOT_DIR, 'src', 'lib', 'session', 'microSessionEngine.ts');

assert(fs.existsSync(ENGINE_PATH), `microSessionEngine.ts must exist at ${ENGINE_PATH}`);

const {
  SESSION_CAPS,
  createMicroSession,
  advanceSessionCard,
  calculateSessionSummary,
  isReflexLatency,
  formatSessionDuration,
  getPhaseTitle,
} = require('../src/lib/session/microSessionEngine.ts');

// ── Check 1: Cognitive Load Theory Caps & Cowan K=4 Working Memory Invariant ───
console.log('▶ Check 1: CLT Caps & Cowan K=4 Working Memory Invariant...');

assert.strictEqual(SESSION_CAPS.MIN_DURATION_SECONDS, 300, 'Min session duration must be 300s (5m)');
assert.strictEqual(SESSION_CAPS.MAX_DURATION_SECONDS, 420, 'Max session duration must be 420s (7m)');
assert.strictEqual(SESSION_CAPS.MAX_NEW_CHUNKS, 3, 'Cowan working memory chunk limit must be capped at 3 new items');
assert.strictEqual(SESSION_CAPS.MIN_REVIEW_CARDS, 12, 'Min review cards must be 12');
assert.strictEqual(SESSION_CAPS.MAX_REVIEW_CARDS, 18, 'Max review cards must be 18');

console.log('  ✔ [PASS] CLT session caps verified: duration [300s, 420s], max new chunks = 3');

// ── Check 2: Defensive Session Instantiation & Bounds Clamping Invariant ──────
console.log('\n▶ Check 2: Defensive Session Instantiation & Bounds Clamping Invariant...');

// Test with ample candidates (10 new, 20 review)
const mockNew = Array.from({ length: 10 }, (_, i) => ({
  id: `new-${i}`,
  prompt: `Grammar Point N${i + 1}`,
  targetJapanese: `文法${i + 1}`,
  trapWarning: `Trap warning ${i + 1}`,
}));

const mockReview = Array.from({ length: 20 }, (_, i) => ({
  id: `rev-${i}`,
  prompt: `Vocab ${i}`,
  targetJapanese: `単語${i}`,
  stability: 5.0,
  difficulty: 4.5,
}));

const session = createMicroSession(mockReview, mockNew);
assert(session.sessionId.startsWith('ms-'), 'Session ID must start with "ms-"');
assert.strictEqual(session.currentPhase, 1, 'Initial phase must be Phase 1 (Retrieval Warm-Up)');
assert.strictEqual(session.currentIndex, 0, 'Initial index must be 0');
assert.strictEqual(session.isCompleted, false, 'Session must not be completed on init');
assert.strictEqual(session.newCardsCount, 3, 'New cards must be strictly clamped to MAX_NEW_CHUNKS (3)');
assert(session.reviewCardsCount >= 11, `Review cards must meet review allocation (got ${session.reviewCardsCount})`);
assert.strictEqual(session.cards.length, session.newCardsCount + session.reviewCardsCount);

// Test empty array defense
const emptySession = createMicroSession([], []);
assert(emptySession.cards.length > 0, 'Empty session must gracefully populate fallback review items');
assert.strictEqual(emptySession.newCardsCount, 0, 'Zero new cards when none provided');

// Test null/undefined defense
const nullSession = createMicroSession(null, undefined);
assert(nullSession.cards.length > 0, 'Null candidates must not crash session constructor');

console.log('  ✔ [PASS] Defensive session initialization resilient to empty and null arrays; Cowan K=3 enforced');

// ── Check 3: 4-Phase Choreography & State Machine Advancement ─────────────────
console.log('\n▶ Check 3: 4-Phase Choreography & State Machine Invariant...');

// Verify phase distribution of cards
const phase1Cards = session.cards.filter((c) => c.phase === 1);
const phase2Cards = session.cards.filter((c) => c.phase === 2);
const phase3Cards = session.cards.filter((c) => c.phase === 3);

assert(phase1Cards.length >= 3 && phase1Cards.length <= 4, 'Phase 1 must contain 3-4 warm-up cards');
assert.strictEqual(phase2Cards.length, 3, 'Phase 2 must contain 3 micro-acquisition chunks');
assert(phase3Cards.length >= 8 && phase3Cards.length <= 10, 'Phase 3 must contain 8-10 production practice cards');

// Simulate card-by-card submission
let currentState = session;
const totalCards = session.cards.length;

for (let i = 0; i < totalCards; i++) {
  const currentCard = currentState.cards[currentState.currentIndex];
  assert.strictEqual(currentState.currentIndex, i);
  assert.strictEqual(currentState.currentPhase, currentCard.phase);

  // Alternate correct/incorrect with varying latencies
  const isCorrect = i % 2 === 0;
  const latency = 1000 + (i * 100);
  const trapWarning = i === 4 ? 'Waspadai partikel に vs で' : undefined;

  currentState = advanceSessionCard(currentState, latency, isCorrect, trapWarning);
}

assert.strictEqual(currentState.currentIndex, totalCards, 'Index must reach totalCards at completion');
assert.strictEqual(currentState.isCompleted, true, 'Session must be marked isCompleted: true');
assert.strictEqual(currentState.currentPhase, 4, 'Terminal phase must transition to Phase 4 (Consolidation)');
assert(currentState.trapReminders.includes('Waspadai partikel に vs で'), 'Trap warning must be recorded in trapReminders');

console.log(`  ✔ [PASS] 4-phase transition choreography completed across ${totalCards} cards into terminal Phase 4`);

// ── Check 4: Latency Sanitization & Native Reflex Recall (<= 1500ms) ──────────
console.log('\n▶ Check 4: Latency Sanitization & Native Reflex Recall...');

// Test isReflexLatency
assert.strictEqual(isReflexLatency(500), true);
assert.strictEqual(isReflexLatency(1200), true);
assert.strictEqual(isReflexLatency(1500), true, '1500ms target latency qualifies as native reflex');
assert.strictEqual(isReflexLatency(1501), false, '1501ms exceeds native reflex boundary');
assert.strictEqual(isReflexLatency(3000), false);
assert.strictEqual(isReflexLatency(-100), false, 'Negative latency invalid');
assert.strictEqual(isReflexLatency(NaN), false, 'NaN latency invalid');

// Test latency sanitization in advanceSessionCard
const freshSession = createMicroSession(mockReview.slice(0, 5), mockNew.slice(0, 2));
const advancedNaN = advanceSessionCard(freshSession, NaN, true);
assert.strictEqual(advancedNaN.latencies[0], 1500, 'NaN latency must sanitize to default 1500ms');

const advancedNegative = advanceSessionCard(advancedNaN, -500, true);
assert.strictEqual(advancedNegative.latencies[1], 1500, 'Negative latency must sanitize to default 1500ms');

console.log('  ✔ [PASS] Response latency sanitization and DeKeyser native reflex threshold (<= 1500ms) verified');

// ── Check 5: Metacognitive Session Summary & Dual Stability Deltas ────────────
console.log('\n▶ Check 5: Metacognitive Session Summary & Dual Stability Deltas...');

const summary = calculateSessionSummary(currentState);
assert(summary.sessionId.startsWith('ms-'), 'Summary must contain sessionId');
assert(summary.totalCards === totalCards, 'Summary totalCards must match completed items count');
assert(summary.overallAccuracy >= 0 && summary.overallAccuracy <= 100, 'Overall accuracy must be in [0, 100]%');
assert(summary.averageLatencyMs > 0, 'Average latency must be positive');
assert(summary.reflexPercentage >= 0 && summary.reflexPercentage <= 100, 'Reflex percentage in [0, 100]%');
assert(summary.durationSeconds >= 60 && summary.durationSeconds <= SESSION_CAPS.MAX_DURATION_SECONDS, 'Duration capped within session bounds');
assert(summary.stabilityDeltas.orthoDelta > 0, 'Ortho stability delta must be positive after successful reviews');
assert(summary.stabilityDeltas.audioDelta > 0, 'Audio stability delta must be positive after successful reviews');
assert(summary.trapOfTheDay.length > 0, 'Trap of the day reminder must be non-empty');

console.log(`  ✔ [PASS] Session summary metrics verified: Acc=${summary.overallAccuracy}%, Reflex=${summary.reflexPercentage}%, OrthoDelta=+${summary.stabilityDeltas.orthoDelta}d, AudioDelta=+${summary.stabilityDeltas.audioDelta}d`);

// ── Check 6: Pure Pedagogical Helpers & Card Archetypes Diversity ─────────────
console.log('\n▶ Check 6: Pure Pedagogical Helpers & Card Archetypes Diversity...');

assert.strictEqual(formatSessionDuration(300), '5:00');
assert.strictEqual(formatSessionDuration(365), '6:05');
assert.strictEqual(formatSessionDuration(420, 'human'), '7m 00s');

assert(getPhaseTitle(1).includes('Retrieval Warm-Up'));
assert(getPhaseTitle(2).includes('Micro-Chunk Acquisition'));
assert(getPhaseTitle(3).includes('Active Production Practice'));
assert(getPhaseTitle(4).includes('Metacognitive Consolidation'));

// Verify card archetypes present in session cards
const archetypes = new Set(session.cards.map((c) => c.archetype));
assert(archetypes.has('speed_comprehension_blast'), 'Phase 1 speed blast archetype present');
assert(archetypes.has('contrastive_pair_slot'), 'Phase 2 contrastive pair archetype present');
assert(archetypes.has('production_type_cloze') || archetypes.has('collocation_chunk_builder'), 'Phase 3 active production archetype present');

console.log('  ✔ [PASS] Pedagogical title mappings, duration formatters, and card archetypes verified');

console.log('\n══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 36 VERIFICATION COMPLETE: ALL 6 CHECKS PASSED (100% GREEN)');
console.log('══════════════════════════════════════════════════════════════════════════════\n');
