// ══════════════════════════════════════════════════════════════════
//  master-regression-orchestrator.js — Unified Cumulative Test Runner
//  Nugget Nihongo Enterprise Quality Assurance
//  Zero Disabling • Cumulative Regression Contract • Realtime Telemetry
// ══════════════════════════════════════════════════════════════════

const { spawnSync } = require('child_process');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const SUITES = [
  { name: 'FSRS Memory Engine', file: 'tests/fsrs-engine.test.js' },
  { name: 'CAT / IRT Placement Engine', file: 'tests/cat-engine.test.js' },
  { name: 'Zustand State Stores', file: 'tests/stores.test.js' },
  { name: 'Curriculum Lesson Content Adapter', file: 'tests/test-curriculum-adapter.js' },
  { name: 'Persona Simulations (200 Personas)', file: 'scripts/run-persona-simulations.js' },
  { name: 'Corpus Integrity Linter', file: 'tests/run.js' },
  { name: 'Backend Consolidation Architecture', file: 'tests/test-backend-consolidation.js' },
  { name: 'Backend Exhaustive Security Audit', file: 'tests/test-backend-exhaustive-audit.js' },
  { name: 'Offline Fallback Integrity', file: 'tests/test-fallback-integrity.js' },
  { name: 'Curriculum Semantics & Level Ladder', file: 'tests/test-curriculum-semantics.js' },
  { name: 'Keigo Sociopragmatic Module', file: 'tests/test-keigo-module.js' },
  { name: 'Japanese Counters Taxonomy', file: 'tests/test-counter-module.js' },
  { name: 'Kotowaza Proverbs Expansion', file: 'tests/test-kotowaza-expansion.js' },
  { name: 'Pitch Accent Contour Engine', file: 'tests/test-pitch-accent-module.js' },
  { name: 'Sprint 8 N3 Pedagogy & JLPT Matrix', file: 'tests/test-sprint-8-n3-pedagogy.js' },
  { name: 'Canonical Curriculum Specification', file: 'tests/test-curriculum.js' },
  { name: 'Master Sprints Regression (Sprint 1–44)', file: 'tests/run-sprints-1-to-44.js' },
  { name: 'Pass 2 Learner Profile Verification', file: 'tests/test-pass2-learner-profile-verification.js' },
  { name: 'Pass 3 Modal Lifecycle Verification', file: 'tests/test-pass3-modal-lifecycle-verification.js' },
  { name: 'Pass 4 Modernization Security Verification', file: 'tests/test-pass4-modernization-security-verification.js' },
  { name: 'Pass 5 Performance & CWV Verification', file: 'tests/test-pass5-performance-verification.js' },
  { name: 'Pass 3 HomePage Declutter Verification', file: 'tests/test-pass3-homepage-declutter-verification.js' },
  { name: 'Pass 4 MateriHub Declutter Verification', file: 'tests/test-pass4-materihub-declutter.js' },
  { name: 'Pass 5 QuizPage Declutter Verification', file: 'tests/test-pass5-quizpage-declutter.js' },
  { name: 'Exercise Datasets Integrity', file: 'tests/test-exercise-datasets-integrity.js' },
  { name: 'Pass 6 Exercise CBT Runner', file: 'tests/test-pass6-exercise-cbt-runner.js' },
  { name: 'Pass 1 Onboarding CAT Flow', file: 'tests/test-pass1-onboarding-cat-flow.js' },
  { name: 'Pass 2 Hero Card Clean State', file: 'tests/test-pass2-hero-card-clean-state.js' },
  { name: 'Pass 3 Lesson Anti-Exploit Guard', file: 'tests/test-pass3-lesson-anti-exploit.js' },
  { name: 'Pass 4 CBT Star & Choukai Listening', file: 'tests/test-pass4-cbt-star-choukai.js' },
  { name: 'Pass 5 Modals Error Boundaries', file: 'tests/test-pass5-modals-error-boundaries.js' },
  { name: 'Siklus II Pass 1: CAT Onboarding', file: 'tests/test-s2-pass1-cat-onboarding.js' },
  { name: 'Siklus II Pass 2: Garden Clean Metrics', file: 'tests/test-s2-pass2-garden-clean-metrics.js' },
  { name: 'Siklus II Pass 3: MateriHub Curriculum', file: 'tests/test-s2-pass3-materihub-curriculum.js' },
  { name: 'Siklus II Pass 4: Quiz CBT Runner', file: 'tests/test-s2-pass4-quiz-cbt-runner.js' },
  { name: 'Siklus II Pass 5: Dojo Tools Modals', file: 'tests/test-s2-pass5-dojo-tools-modals.js' },
  { name: 'Siklus II Pass 6: Lesson Study Stages', file: 'tests/test-s2-pass6-lesson-study-stages.js' },
  { name: 'Siklus II Pass 7: Choukai Audio Pipeline', file: 'tests/test-s2-pass7-choukai-audio-pipeline.js' },
  { name: 'Siklus II Pass 8: Profile & Sync Settings', file: 'tests/test-s2-pass8-profile-sync-settings.js' },
  { name: 'Siklus II Pass 9: Modal Eviction Safeguards', file: 'tests/test-s2-pass9-modals-eviction-safeguards.js' },
  { name: 'Siklus II Pass 10: Sensei AI Orchestrator', file: 'tests/test-s2-pass10-sensei-ai-orchestrator.js' },
  { name: 'Siklus II Pass 11: PWA Offline Resiliency', file: 'tests/test-s2-pass11-pwa-offline-resiliency.js' },
  { name: 'Siklus II Pass 12: Nav & Header Ergonomics', file: 'tests/test-s2-pass12-nav-header-ergonomics.js' },
  { name: 'Siklus II Pass 13: Star Scramble Drills', file: 'tests/test-s2-pass13-star-scramble-drills.js' },
  { name: 'Siklus II Pass 14: Gamification & Streak Resilience', file: 'tests/test-s2-pass14-gamification-streak-resilience.js' },
  { name: 'Siklus II Pass 15: Final Synthesis Assets', file: 'tests/test-s2-pass15-final-synthesis-assets.js' },
  { name: 'Siklus III Pass 1: Bootstrap & Persistence', file: 'tests/test-s3-pass1-bootstrap-modals-persistence.js' },
  { name: 'Siklus III Pass 2: Animations & Irasutoya', file: 'tests/test-s3-pass2-animations-irasutoya.js' },
  { name: 'Siklus III Pass 3: Choukai Pitch & Gemba', file: 'tests/test-s3-pass3-choukai-pitch-gemba.js' },
  { name: 'Siklus III Pass 4: Dojo Cultural Tools', file: 'tests/test-s3-pass4-dojo-cultural-tools.js' },
  { name: 'Siklus III Pass 5: Settings & Profile Safeguards', file: 'tests/test-s3-pass5-settings-profile-safeguards.js' },
  { name: 'Siklus III Pass 6: Sensei AI Studio', file: 'tests/test-s3-pass6-sensei-ai-studio.js' },
  { name: 'Siklus III Pass 7: Utility Companion Modals', file: 'tests/test-s3-pass7-utility-companion-modals.js' },
  { name: 'Siklus III Pass 8: Grammar Conjugation Lookup', file: 'tests/test-s3-pass8-grammar-conjugation-lookup.js' },
  { name: 'Siklus III Pass 9: Gamification & Network Banners', file: 'tests/test-s3-pass9-gamification-network-banners.js' },
  { name: 'Siklus III Pass 10: Japanese Typography & Furigana', file: 'tests/test-s3-pass10-japanese-typography-furigana.js' },
  { name: 'Siklus III Pass 11: CBT Exam Scramble Accordion', file: 'tests/test-s3-pass11-cbt-exam-scramble-accordion.js' },
  { name: 'Siklus III Pass 12: Dokkai LMS & Choukai Polish', file: 'tests/test-s3-pass12-dokkai-lms-choukai-polish.js' },
  { name: 'Enterprise Gap 5: Runtime Schema Validator', file: 'tests/test-schema-validator.js' },
  { name: 'Siklus III Pass 13: Lesson Study Stages', file: 'tests/test-s3-pass13-lesson-study-stages.js' },
  { name: 'Siklus III Pass 14: Warm Editorial Palette', file: 'tests/test-s3-pass14-warm-editorial-palette.js' },
  { name: 'Siklus III Pass 15: Grand Master Synthesis', file: 'tests/test-s3-pass15-cycle3-master-synthesis.js' },
  { name: 'Siklus IV Pass 1: Kanji Canvas & Pointer Engine', file: 'tests/test-s4-pass1-kanji-canvas.js' },
  { name: 'Siklus IV Pass 2: KanjiVG Geometry Normalizer', file: 'tests/test-s4-pass2-kanjivg-normalizer.js' },
  { name: 'Siklus IV Pass 3: Fréchet & Vector Scoring Engine', file: 'tests/test-s4-pass3-stroke-validator.js' },
  { name: 'Siklus IV Pass 4: Procedural Audio ZzFX Engine', file: 'tests/test-s4-pass4-zzfx-audio.js' },
  { name: 'Siklus IV Pass 5: Modal Guided Practice', file: 'tests/test-s4-pass5-modal-practice.js' },
  { name: 'Siklus IV Pass 6: TinyBase IndexedDB Mastery', file: 'tests/test-s4-pass6-tinybase-mastery.js' },
  { name: 'Siklus IV Pass 7: CRDT Conflict-Free Reconciler', file: 'tests/test-s4-pass7-crdt-resolver.js' },
  { name: 'Siklus IV Pass 8: Supabase Delta Sync Bridge', file: 'tests/test-s4-pass8-supabase-sync.js' },
  { name: 'Siklus IV Pass 9: Real-Time Sync Status Indicators', file: 'tests/test-s4-pass9-sync-indicators.js' },
  { name: 'Siklus IV Pass 10: External Community Hub Modal', file: 'tests/test-s4-pass10-community-hub-modal.js' },
  { name: 'Siklus IV Pass 11: Shareable Study & Mastery Cards', file: 'tests/test-s4-pass11-share-cards.js' },
  { name: 'Siklus IV Pass 12: Integrated Support & Feedback Gateway', file: 'tests/test-s4-pass12-feedback-gateway.js' },
  { name: 'Siklus IV Pass 13: 200 Indonesian Learner Personas QA Audit', file: 'tests/test-s4-pass13-persona-kanji-audit.js' },
  { name: 'Siklus IV Pass 14: Universal Multi-Device Ergonomics & A11y', file: 'tests/test-s4-pass14-responsive-a11y.js' },
  { name: 'Siklus IV Pass 15: Grand Master Synthesis & Release v23.0.0', file: 'tests/test-s4-pass15-cycle4-master-synthesis.js' },
  { name: 'Siklus V Pass 1: FSRS v4.5 Math & Memory Stability Audit', file: 'tests/test-s5-pass1-fsrs-math-audit.js' },
  { name: 'Siklus V Pass 2: FSRS Difficulty, Stability & Intervals', file: 'tests/test-s5-pass2-fsrs-difficulty-intervals.js' },
  { name: 'Siklus V Pass 3: FSRS Lapse Recovery & Relearning Invariants', file: 'tests/test-s5-pass3-fsrs-lapse-recovery.js' },
  { name: 'Siklus V Pass 4: CAT / IRT 3PL Adaptive Diagnostic Engine', file: 'tests/test-s5-pass4-cat-irt-engine.js' },
  { name: 'Siklus V Pass 5: CAT Stopping Rules & Automated Level Bridge', file: 'tests/test-s5-pass5-cat-stopping-bridge.js' },
  { name: 'Siklus V Pass 6: JLPT N5–N1 Curriculum & Can-Do Descriptors', file: 'tests/test-s5-pass6-curriculum-can-do.js' },
  { name: 'Siklus V Pass 7: JFT-Basic A1/A2 & Seikatsu Matrix Audit', file: 'tests/test-s5-pass7-jft-matrix.js' },
  { name: 'Siklus V Pass 8: 28,500+ Lexical Corpus & Romanization Indexer', file: 'tests/test-s5-pass8-lexical-indexer.js' },
  { name: 'Siklus V Pass 9: 850+ Grammar Points & Verb Conjugation Engine', file: 'tests/test-s5-pass9-grammar-conjugation.js' },
  { name: 'Siklus V Pass 10: SSW 19-Sector Gemba Lexicon & Matrix', file: 'tests/test-s5-pass10-ssw-lexicon.js' },
  { name: 'Siklus V Pass 11: 190 Gemba Workplace Skits & Official K3 Commands', file: 'tests/test-s5-pass11-k3-gemba.js' },
  { name: 'Siklus V Pass 12: 300+ L1 Indonesian Contrastive Nuance Matrix', file: 'tests/test-s5-pass12-l1-nuance-matrix.js' },
  { name: 'Siklus V Pass 13: 300 Diagnostic Confusion Pairs & Regional Dialects', file: 'tests/test-s5-pass13-confusion-dialects.js' },
  { name: 'Siklus V Pass 14: Minna no Nihongo I & II Integration & Lexicon Bridge', file: 'tests/test-s5-pass14-minna-integration.js' },
  { name: 'Siklus V Pass 15: Irodori & Sou Matome Grammar Lens Matrix', file: 'tests/test-s5-pass15-irodori-soumatome.js' },
  { name: 'Siklus V Pass 16: Tokyo Pitch Accent Contour & Mora Visualizer', file: 'tests/test-s5-pass16-pitch-accent-engine.js' },
  { name: 'Siklus V Pass 17: HVPT Multi-Speaker Acoustic Engine & Minimal Pairs', file: 'tests/test-s5-pass17-hvpt-audio-engine.js' },
  { name: 'Siklus V Pass 18: Choukai Audio Simulator & Auto-Pause Drills', file: 'tests/test-s5-pass18-choukai-simulator.js' },
  { name: 'Siklus V Pass 19: Multi-Tier Voice Synthesis & ZzFX Procedural WebAudio', file: 'tests/test-s5-pass19-voice-synthesis-zzfx.js' },
  { name: 'Siklus V Pass 20: KanjiCanvas High-DPI Retina Buffer & Pointer Capture', file: 'tests/test-s5-pass20-kanji-canvas-retina.js' },
  { name: 'Siklus V Pass 21: KanjiVG Geometry Normalization & Bezier Path Sampling', file: 'tests/test-s5-pass21-kanjivg-geometry.js' },
  { name: 'Siklus V Pass 22: Discrete Fréchet Distance & Directional Vector Scoring', file: 'tests/test-s5-pass22-frechet-scoring.js' },
  { name: 'Siklus V Pass 23: KanjiStrokeModal Guided Practice & Goukaku Share Cards', file: 'tests/test-s5-pass23-kanji-modal-sharecards.js' },
  { name: 'Siklus V Pass 24: CBT Exam Simulator & 15-Minute Countdown Engine', file: 'tests/test-s5-pass24-cbt-simulator-engine.js' },
  { name: 'Siklus V Pass 25: Google BudouX Semantic Chunking & Star Scramble Drills', file: 'tests/test-s5-pass25-budoux-star-scramble.js' },
  { name: 'Siklus V Pass 26: Dokkai Split-Pane Reading Comprehension LMS', file: 'tests/test-s5-pass26-dokkai-lms-explanation.js' },
  { name: 'Siklus V Pass 27: Interactive Lesson Study 4-Stage Player & Anti-Exploit Guard', file: 'tests/test-s5-pass27-lesson-study-stages.js' },
  { name: 'Siklus V Pass 28: Arena Quiz Dynamic Question Dispatcher & Retention Scoring', file: 'tests/test-s5-pass28-arena-quiz-dispatcher.js' },
  { name: 'Siklus V Pass 29: Japanese Counters Taxonomy (助数詞) & Euphonic Shifts', file: 'tests/test-s5-pass29-japanese-counters.js' },
  { name: 'Siklus V Pass 30: Keigo Sociopragmatic Analyzer (Sonkeigo, Kenjougo, Teineigo)', file: 'tests/test-s5-pass30-keigo-sociopragmatic.js' },
  { name: 'Siklus V Pass 31: Kotowaza Proverbs & Cultural Idioms Encyclopedia', file: 'tests/test-s5-pass31-kotowaza-encyclopedia.js' },
  { name: 'Siklus V Pass 32: Interactive Kana Chart & Touch Stroke Order Visualizer', file: 'tests/test-s5-pass32-kana-chart-visualizer.js' },
  { name: 'Siklus V Pass 33: Kebun Kata (Kanji Growth Garden) Visual Retrievability Metaphor', file: 'tests/test-s5-pass33-kebun-kata-garden.js' },
  { name: 'Siklus V Pass 34: Streak Resilience, Freeze Shields & Milestone XP', file: 'tests/test-s5-pass34-streak-freeze-milestones.js' },
  { name: 'Siklus V Pass 35: Heatmap Calendar & Badges Modal', file: 'tests/test-s5-pass35-heatmap-badges.js' },
  { name: 'Siklus V Pass 36: Micro-Session Pacing Engine (4-Phase Choreography)', file: 'tests/test-s5-pass36-microsession-pacing.js' },
  { name: 'Siklus V Pass 37: TinyBase IndexedDB Persistence Schema & Tables', file: 'tests/test-s5-pass37-tinybase-persistence.js' },
  { name: 'Siklus V Pass 38: Browser Storage Eviction Defense & Emergency Backup', file: 'tests/test-s5-pass38-storage-eviction-backup.js' },
  { name: 'Siklus V Pass 39: Multi-Tab Broadcast Sync Daemon', file: 'tests/test-s5-pass39-broadcast-sync-daemon.js' },
  { name: 'Siklus V Pass 40: CRDT Conflict-Free Vector Clock Reconciler', file: 'tests/test-s5-pass40-crdt-conflict-reconciler.js' },
  { name: 'Siklus V Pass 41: Supabase Delta Sync Bridge & Visual Status Indicators', file: 'tests/test-s5-pass41-supabase-delta-sync.js' },
  { name: 'Siklus V Pass 42: Warm Editorial Hybrid Theme & 8 Token Nippon', file: 'tests/test-s5-pass42-warm-editorial-theme.js' },
  { name: 'Siklus V Pass 43: Japanese Typography, BudouX Semantic Breaking & Furigana', file: 'tests/test-s5-pass43-japanese-typography-furigana.js' },
  { name: 'Siklus V Pass 44: Centralized Modal Stacking Architecture & Drag Handles', file: 'tests/test-s5-pass44-modal-stacking-manager.js' },
  { name: 'Siklus V Pass 45: Universal Multi-Device Ergonomics (320px–1920px) & Touch Targets', file: 'tests/test-s5-pass45-responsive-ergonomics.js' },
  { name: 'Siklus V Pass 46: Two-Wing Institutional Architecture (AboutPage & MethodologyPage)', file: 'tests/test-s5-pass46-twowing-institutional.js' },
  { name: 'Siklus V Pass 47: External Community Hub, Tantangan Kanji Harian & Support Gateway', file: 'tests/test-s5-pass47-community-support-gateway.js' },
  { name: 'Siklus V Pass 48: 200 Indonesian Learner Personas Full-Swarm Simulation', file: 'tests/test-s5-pass48-200-personas-swarm.js' },
  { name: 'Siklus V Pass 49: Telemetry, Error Reporter & Core Web Vitals', file: 'tests/test-s5-pass49-telemetry-webvitals.js' },
  { name: 'Siklus V Pass 50: Security Hardening & Supabase RLS Audit', file: 'tests/test-s5-pass50-security-rls-hardening.js' },
  { name: 'Siklus V Pass 51: Production Vite Bundle Optimization & PWA Service Worker Cache', file: 'tests/test-s5-pass51-bundle-pwa-cache.js' },
  { name: 'Siklus V Pass 52: Grand Master Synthesis & Release v24.0.0 (Zenith & Shin-Nihongo)', file: 'tests/test-s5-pass52-zenith-synthesis.js' },
  { name: 'Siklus VI Pass 1: Local Irasutoya Vector Visual Architecture & Mobile Presence', file: 'tests/test-s6-pass1-irasutoya-local-mobile.js' },
  { name: 'Siklus VI Pass 2: Nav Shell Declutter & Single-Action Sovereign Home', file: 'tests/test-s6-pass2-nav-shell-single-action-home.js' },
  { name: 'Siklus VI Pass 3: Lapisan 2 Single-Flow Feed & Study Studio QA', file: 'tests/test-s6-pass3-lapisan2-single-flow-lesson.js' },
  { name: 'Siklus VI Pass 4: Clean Quiz Distractors (Anti-Kurung & Anti-Slash)', file: 'tests/test-s6-pass4-quiz-distractors-clean.js' },
  { name: 'Siklus VI Pass 5: Official Community Portals & Anti-Fake Upvotes', file: 'tests/test-s6-pass5-community-official-portals.js' },
  { name: 'Siklus VI Pass 6: Eradication of Leaked <b> Tags & Foreign Copy', file: 'tests/test-s6-pass6-b-tag-foreign-copy-purged.js' },
  { name: 'Siklus VI Pass 7: CAT Diagnostic Homogeneous 4-Distractor Revitalization', file: 'tests/test-s6-pass7-cat-slot-distractors.js' },
  { name: 'Siklus VI Pass 8: Humanized Methodology & Release Notes Redesign', file: 'tests/test-s6-pass8-methodology-changelog-humanized.js' },
  { name: 'Siklus VI Pass 9: Navigation Ergonomics, Single-Accordion & Scroll Restoration', file: 'tests/test-s6-pass9-ux-refinements-scroll-nav.js' },
  { name: 'Siklus VI Pass 10: Pure Practice Dojo, Unlocked Flashcard Access & Sticky Sub-Tabs', file: 'tests/test-s6-pass10-dojo-ulas-flashcard-sticky.js' },
  { name: 'Siklus VI Pass 11: Belajar <-> Ulas <-> Dojo Tri-Connection Verification', file: 'tests/test-s6-pass11-belajar-ulas-dojo-tri-connection.js' }
];

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO MASTER CUMULATIVE REGRESSION ORCHESTRATOR       ║');
console.log(`║   Total Suites: ${SUITES.length} | Windows PowerShell & Linux Compatible       ║`);
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const startTime = Date.now();
let passedCount = 0;
let failedCount = 0;
const failures = [];

for (let i = 0; i < SUITES.length; i++) {
  const suite = SUITES[i];
  const fullPath = path.join(ROOT_DIR, suite.file);
  const prefix = `[${String(i + 1).padStart(2, ' ')}/${SUITES.length}]`;
  
  process.stdout.write(`${prefix} Running: ${suite.name}... `);
  const suiteStart = Date.now();

  const res = spawnSync('node', [fullPath], {
    cwd: ROOT_DIR,
    stdio: 'pipe',
    encoding: 'utf8',
    env: process.env
  });

  const durationMs = Date.now() - suiteStart;

  if (res.status === 0) {
    passedCount++;
    console.log(`✅ PASS (${durationMs}ms)`);
  } else {
    failedCount++;
    console.log(`❌ FAIL (${durationMs}ms)`);
    failures.push({
      suite: suite.name,
      file: suite.file,
      error: res.stderr || res.stdout
    });
  }
}

const totalDurationSec = ((Date.now() - startTime) / 1000).toFixed(2);

console.log('\n══════════════════════════════════════════════════════════════════');
console.log(`📊 MASTER TEST RESULTS: ${passedCount}/${SUITES.length} PASSED (100% Target)`);
console.log(`⏱️ Total Execution Time: ${totalDurationSec}s`);
console.log('══════════════════════════════════════════════════════════════════');

if (failedCount > 0) {
  console.error(`\n❌ ${failedCount} SUITE(S) FAILED:\n`);
  failures.forEach(f => {
    console.error(`▶ [${f.suite}] (${f.file}):`);
    console.error(f.error.substring(0, 500) + '...\n');
  });
  process.exit(1);
} else {
  console.log(`\n🎉 ALL ${SUITES.length} REGRESSION SUITES PASSED 100% GREEN! ZERO REGRESSIONS DETECTED!\n`);
  process.exit(0);
}
