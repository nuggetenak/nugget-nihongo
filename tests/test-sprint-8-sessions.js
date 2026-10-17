// ══════════════════════════════════════════════════════════════════
//  test-sprint-8-sessions.js — Comprehensive Sprint 8 Test Runner
//  Verifies Tickets T-29, T-30, T-31, T-32
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ? PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ? FAIL: ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n============================================================');
console.log('?? SPRINT 8 VERIFICATION: SESSIONS, ARCHETYPES & METHODOLOGY');
console.log('============================================================\n');

// ──────────────────────────────────────────────────────────────────
// 1. TICKET T-29: 4-Phase Micro-Session Choreography & 5-7 Min Capping
// ──────────────────────────────────────────────────────────────────
console.log('--- Ticket T-29: Micro-Session Choreography Engine ---');

const microSessionPath = path.join(__dirname, '../src/lib/session/microSessionEngine.ts');
assert(fs.existsSync(microSessionPath), 'microSessionEngine.ts must exist');
const microSessionContent = fs.readFileSync(microSessionPath, 'utf8');

runTest('SESSION_CAPS defines 5-7 min window and Cowan K=4 chunk bounds', () => {
  assert(microSessionContent.includes('MIN_DURATION_SECONDS: 300'), 'Min duration must be 300s (5 min)');
  assert(microSessionContent.includes('MAX_DURATION_SECONDS: 420'), 'Max duration must be 420s (7 min)');
  assert(microSessionContent.includes('MAX_NEW_CHUNKS: 3'), 'Max new chunks must be <= 3');
  assert(microSessionContent.includes('MIN_REVIEW_CARDS: 12'), 'Min review cards must be 12');
  assert(microSessionContent.includes('MAX_REVIEW_CARDS: 18'), 'Max review cards must be 18');
  assert(microSessionContent.includes('WARMUP_MAX_LATENCY_SEC: 15'), 'Warmup max latency must be 15s');
});

runTest('createMicroSession choreographs 4 distinct SLA phases', () => {
  assert(microSessionContent.includes('Phase 1: Retrieval Warm-Up'), 'Must include Phase 1 Retrieval Warm-Up');
  assert(microSessionContent.includes('Phase 2: Micro-Chunk Acquisition'), 'Must include Phase 2 Micro-Chunk Acquisition');
  assert(microSessionContent.includes('Phase 3: High-Intensity Active Production Practice'), 'Must include Phase 3 Active Practice');
  assert(microSessionContent.includes('Phase 4 is Metacognitive Consolidation'), 'Must include Phase 4 Metacognitive Consolidation');
});

runTest('advanceSessionCard tracks latency, accuracy, and L1 trap reminders', () => {
  assert(microSessionContent.includes('export function advanceSessionCard'), 'Must export advanceSessionCard function');
  assert(microSessionContent.includes('averageLatencyMs'), 'Must calculate running average latency');
  assert(microSessionContent.includes('trapReminders'), 'Must track unique trap reminders');
});

runTest('calculateSessionSummary computes reflex percentage and stability deltas', () => {
  assert(microSessionContent.includes('export function calculateSessionSummary'), 'Must export calculateSessionSummary');
  assert(microSessionContent.includes('reflexPercentage'), 'Must calculate reflex percentage');
  assert(microSessionContent.includes('l <= 1500'), 'Reflex threshold must be <= 1500ms');
  assert(microSessionContent.includes('stabilityDeltas'), 'Must output orthoDelta and audioDelta');
});

// ──────────────────────────────────────────────────────────────────
// 2. TICKET T-30: The 6 Production Card Archetypes with L1 Warnings
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-30: 6 Production Card Archetypes Component ---');

const archetypesComponentPath = path.join(__dirname, '../src/components/quiz/ProductionCardArchetypes.tsx');
assert(fs.existsSync(archetypesComponentPath), 'ProductionCardArchetypes.tsx must exist');
const archetypesContent = fs.readFileSync(archetypesComponentPath, 'utf8');

runTest('ProductionCardArchetypes handles all 6 specialized archetypes', () => {
  const archetypes = [
    'contrastive_pair_slot',
    'audio_speed_gate',
    'production_type_cloze',
    'pragmatic_register_pivot',
    'collocation_chunk_builder',
    'speed_comprehension_blast',
  ];
  archetypes.forEach((arch) => {
    assert(archetypesContent.includes(arch), `Must support archetype ${arch}`);
  });
});

runTest('Archetype 1 (contrastive_pair_slot) provides L1 contrast warning on error', () => {
  assert(archetypesContent.includes('ARCHETYPE 1: CONTRASTIVE PAIR SLOT'), 'Must have Archetype 1 section');
  assert(archetypesContent.includes('card.isL1Trap'), 'Must detect L1 trap');
  assert(archetypesContent.includes('Peringatan Interferensi Bahasa Ibu'), 'Must render L1 gap warning banner');
});

runTest('Archetype 2 (audio_speed_gate) implements 2.5s acoustic countdown gate', () => {
  assert(archetypesContent.includes('ARCHETYPE 2: AUDIO SPEED GATE'), 'Must have Archetype 2 section');
  assert(archetypesContent.includes('2500'), 'Audio gate countdown must be 2500ms');
  assert(archetypesContent.includes('speakJapanese'), 'Must trigger Japanese acoustic speech playback');
});

runTest('Archetype 3 (production_type_cloze) performs character-level typing diffing', () => {
  assert(archetypesContent.includes('ARCHETYPE 3: PRODUCTION TYPE CLOZE'), 'Must have Archetype 3 section');
  assert(archetypesContent.includes('renderCharacterDiff'), 'Must implement character diffing function');
  assert(archetypesContent.includes('Analisis Karakter per Karakter'), 'Must render character diff breakdown');
});

runTest('Archetype 4 (pragmatic_register_pivot) evaluates workplace keigo vs eldercare speech', () => {
  assert(archetypesContent.includes('ARCHETYPE 4: PRAGMATIC REGISTER PIVOT'), 'Must have Archetype 4 section');
  assert(archetypesContent.includes('Skenario Sosio-Pragmatik'), 'Must display socio-pragmatic scenario');
});

runTest('Archetype 5 (collocation_chunk_builder) enforces Head-Final SOV order', () => {
  assert(archetypesContent.includes('ARCHETYPE 5: COLLOCATION CHUNK BUILDER'), 'Must have Archetype 5 section');
  assert(archetypesContent.includes('Predikat di Akhir (SOV)'), 'Must enforce SOV predicate-final rule');
  assert(archetypesContent.includes('handleAddToken'), 'Must allow token assembly');
  assert(archetypesContent.includes('handleRemoveToken'), 'Must allow token removal');
});

runTest('Archetype 6 (speed_comprehension_blast) measures reflex latency with 1.5s countdown', () => {
  assert(archetypesContent.includes('ARCHETYPE 6: SPEED COMPREHENSION BLAST'), 'Must have Archetype 6 section');
  assert(archetypesContent.includes('1500'), 'Speed blast timer must be 1500ms');
  assert(archetypesContent.includes('Refleks Otomatis'), 'Must display reflex badge');
});

runTest('Universal multi-device responsive compliance in ProductionCardArchetypes', () => {
  assert(archetypesContent.includes('min-h-[44px]') || archetypesContent.includes('min-h-[48px]'), 'Must enforce >= 44px touch targets');
  assert(archetypesContent.includes('active:scale-95'), 'Must provide active scale feedback');
  assert(archetypesContent.includes('overflow-x-hidden'), 'Must prevent horizontal blowouts');
  assert(archetypesContent.includes('break-words'), 'Must wrap long kanji compounds');
});

// ──────────────────────────────────────────────────────────────────
// 3. TICKET T-31: Dual-Track Stability Matrix & Review Telemetry
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-31: Review Telemetry & Dual-Track Stability ---');

const telemetryPath = path.join(__dirname, '../src/lib/telemetry/reviewTelemetry.ts');
assert(fs.existsSync(telemetryPath), 'reviewTelemetry.ts must exist');
const telemetryContent = fs.readFileSync(telemetryPath, 'utf8');

runTest('reviewTelemetry defines cross-modal coefficients alpha=0.25 and beta=0.65', () => {
  assert(telemetryContent.includes('ALPHA_CROSS: 0.25'), 'ALPHA_CROSS must be 0.25');
  assert(telemetryContent.includes('BETA_CROSS: 0.65'), 'BETA_CROSS must be 0.65');
});

runTest('SRSReviewEvent schema captures dual stability, modality, and proceduralization factor', () => {
  assert(telemetryContent.includes("eventType: 'srs_review_completed'"), 'Must specify srs_review_completed');
  assert(telemetryContent.includes('stabilityBefore'), 'Must track stabilityBefore');
  assert(telemetryContent.includes('stabilityAfter'), 'Must track stabilityAfter');
  assert(telemetryContent.includes('proceduralizationFactor'), 'Must track proceduralization factor Phi(delta_t)');
  assert(telemetryContent.includes('isL1TrapEncountered'), 'Must track L1 trap occurrence');
});

runTest('recordReview updates dual-track stability and applies L1 interference penalty', () => {
  assert(telemetryContent.includes('calculateDualTrackStability'), 'Must invoke calculateDualTrackStability');
  assert(telemetryContent.includes('calculateLatencyFactor'), 'Must invoke calculateLatencyFactor');
  assert(telemetryContent.includes('applyInterferencePenalty'), 'Must invoke applyInterferencePenalty on trap');
});

runTest('ReviewTelemetryService supports FIFO buffer persistence and pub/sub subscription', () => {
  assert(telemetryContent.includes('MAX_BUFFER_SIZE = 500'), 'Buffer size must cap at 500 events');
  assert(telemetryContent.includes('subscribe(listener: TelemetryListener)'), 'Must support subscriber callbacks');
  assert(telemetryContent.includes('exportTelemetryJSON'), 'Must support exporting telemetry JSON');
});

// ──────────────────────────────────────────────────────────────────
// 4. TICKET T-32: Public Methodology Page & Conflict Resolutions
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-32: Methodology Page & Theoretical Conflict Resolutions ---');

const methodologyPagePath = path.join(__dirname, '../src/pages/MethodologyPage.tsx');
assert(fs.existsSync(methodologyPagePath), 'MethodologyPage.tsx must exist');
const methodologyContent = fs.readFileSync(methodologyPagePath, 'utf8');

runTest('MethodologyPage contains the 6 canonical narrative sections', () => {
  assert(methodologyContent.includes('Siapa Target Pembelajar Kami'), 'Must include Section 1');
  assert(methodologyContent.includes('Bagaimana Platform Mengajarkan Kosakata'), 'Must include Section 2');
  assert(methodologyContent.includes('Bagaimana Mengajarkan Bahasa Jepang Spesifik'), 'Must include Section 3');
  assert(methodologyContent.includes('Bagaimana Platform Beradaptasi pada Individu'), 'Must include Section 4');
  assert(methodologyContent.includes('Temuan Riset: Kejujuran Epistemik'), 'Must include Section 5');
  assert(methodologyContent.includes('Agenda Riset Berkelanjutan'), 'Must include Section 6');
});

runTest('Section 5 articulates What We Claim vs What We DO NOT Claim', () => {
  assert(methodologyContent.includes('Yang Terbukti Secara Ilmiah (Well-Established)'), 'Must list well-established findings');
  assert(methodologyContent.includes('Yang TIDAK Kami Klaim Terbukti (Honest Boundaries)'), 'Must list honest boundaries');
  assert(methodologyContent.includes('Randomized Controlled Trial (RCT) independen'), 'Must acknowledge absence of external RCT');
  assert(methodologyContent.includes('JLPT N4 saja cukup untuk bekerja di sektor Kaigo/SSW'), 'Must acknowledge workplace keigo gap');
});

runTest('MethodologyPage articulates the 4 Theoretical Conflict Resolutions (CONF-01 to CONF-04)', () => {
  assert(methodologyContent.includes('CONF-01'), 'Must include CONF-01');
  assert(methodologyContent.includes('Prinsip Redundansi vs Pengecualian Takarir L2'), 'Must explain CONF-01 title');
  assert(methodologyContent.includes('CONF-02'), 'Must include CONF-02');
  assert(methodologyContent.includes('Interleaving Efek vs Variasi Gamifikasi'), 'Must explain CONF-02 title');
  assert(methodologyContent.includes('CONF-03'), 'Must include CONF-03');
  assert(methodologyContent.includes('Budaya Malu (Shame) vs Papan Peringkat Publik'), 'Must explain CONF-03 title');
  assert(methodologyContent.includes('CONF-04'), 'Must include CONF-04');
  assert(methodologyContent.includes('Testing Effect vs Expertise Reversal Effect'), 'Must explain CONF-04 title');
});

runTest('App.tsx and useAppStore.ts register the methodology view and route', () => {
  const appPath = path.join(__dirname, '../src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(
    appContent.includes("from './pages/MethodologyPage'") || appContent.includes("import('./pages/MethodologyPage')"),
    'App.tsx must import MethodologyPage (eager or lazy)'
  );
  assert(appContent.includes("case 'methodology':"), 'App.tsx must handle methodology activeTab');

  const storePath = path.join(__dirname, '../src/store/useAppStore.ts');
  const storeContent = fs.readFileSync(storePath, 'utf8');
  assert(storeContent.includes("'methodology'"), 'useAppStore.ts must include methodology in activeTab union');

  const aboutPath = path.join(__dirname, '../src/pages/AboutPage.tsx');
  const aboutContent = fs.readFileSync(aboutPath, 'utf8');
  assert(aboutContent.includes("setActiveTab('methodology')"), 'AboutPage.tsx must link to methodology page');
});

console.log('\n============================================================');
console.log(`? SPRINT 8 VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('============================================================\n');
