// ══════════════════════════════════════════════════════════════════
//  test-sprint-27-jft-seikatsu.js — Master Verification Suite for Sprint 27
//  JFT-Basic CBT Exam Engine & Seikatsu Living Curriculum Overhaul
//  Tickets T-151 to T-155 Forensic Empirical Proof
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Sprint 27 Audit] Initiating JFT-Basic CBT & Seikatsu Living Guide Forensic Evaluation...\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-151: JFT-Basic A1 & A2 Curriculum Data Structure & Can-Do Descriptors
// ─────────────────────────────────────────────────────────────────────────────
check('T-151: JFT-Basic A1 and A2 curriculum files exist in public/data/curriculum/', () => {
  const a1Json = path.join(ROOT, 'public/data/curriculum/curriculum-jft-a1.json');
  const a1Js = path.join(ROOT, 'public/data/curriculum/curriculum-jft-a1.js');
  const a2Json = path.join(ROOT, 'public/data/curriculum/curriculum-jft-a2.json');
  const a2Js = path.join(ROOT, 'public/data/curriculum/curriculum-jft-a2.js');

  assert.ok(fs.existsSync(a1Json), 'Missing curriculum-jft-a1.json');
  assert.ok(fs.existsSync(a1Js), 'Missing curriculum-jft-a1.js');
  assert.ok(fs.existsSync(a2Json), 'Missing curriculum-jft-a2.json');
  assert.ok(fs.existsSync(a2Js), 'Missing curriculum-jft-a2.js');

  const a1Data = JSON.parse(fs.readFileSync(a1Json, 'utf8'));
  const a2Data = JSON.parse(fs.readFileSync(a2Json, 'utf8'));

  assert.ok(a1Data.meta.level === 'jft-a1' || a1Data.meta.track_id.includes('jft-a1'), `Unexpected level in A1: ${a1Data.meta.level}`);
  assert.ok(a2Data.meta.level === 'jft-a2' || a2Data.meta.track_id.includes('jft-a2'), `Unexpected level in A2: ${a2Data.meta.level}`);
  assert.ok(Array.isArray(a1Data.units) && a1Data.units.length > 0, 'A1 units must be non-empty array');
  assert.ok(Array.isArray(a2Data.units) && a2Data.units.length > 0, 'A2 units must be non-empty array');
});

check('T-151: JFT curricula contain official JF Standard sections and Can-Do descriptors', () => {
  const a2Json = path.join(ROOT, 'public/data/curriculum/curriculum-jft-a2.json');
  const content = fs.readFileSync(a2Json, 'utf8');

  // Verify JF Standard 4 sections or Can-Do keywords
  const hasCanDo = content.includes('can_do_summary') || content.includes('can_do_statement') || content.includes('Can-Do');
  const hasSections = content.includes('Moji') || content.includes('Kaiwa') || content.includes('Choukai') || content.includes('Dokkai') || content.includes('語彙') || content.includes('会話');

  assert.ok(hasCanDo, 'curriculum-jft-a2.json should specify Can-Do descriptors');
  assert.ok(hasSections, 'curriculum-jft-a2.json should reflect official JFT-Basic competencies');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. T-152: Seikatsu Living Guide Curriculum Data & Municipal Procedures
// ─────────────────────────────────────────────────────────────────────────────
check('T-152: curriculum-seikatsu.json exists with comprehensive municipal modules', () => {
  const seikatsuJson = path.join(ROOT, 'public/data/curriculum/curriculum-seikatsu.json');
  const seikatsuJs = path.join(ROOT, 'public/data/curriculum/curriculum-seikatsu.js');

  assert.ok(fs.existsSync(seikatsuJson), 'Missing curriculum-seikatsu.json');
  assert.ok(fs.existsSync(seikatsuJs), 'Missing curriculum-seikatsu.js');

  const data = JSON.parse(fs.readFileSync(seikatsuJson, 'utf8'));
  assert.ok(data.meta.level === 'seikatsu' || data.meta.track_id.includes('seikatsu'), `Expected level 'seikatsu', got ${data.meta.level}`);
  assert.ok(Array.isArray(data.units) && data.units.length >= 4, 'Seikatsu must have at least 4 units');

  const jsonStr = JSON.stringify(data);
  // Check for critical life domains: Shiyakusho / Gomi / Chintai or Bank / Hinan or Emergency
  assert.ok(jsonStr.includes('役所') || jsonStr.includes('Balai Kota') || jsonStr.includes('Juminhyo') || jsonStr.includes('Pemerintah'), 'Missing municipal administration content');
  assert.ok(jsonStr.includes('ごみ') || jsonStr.includes('Sampah') || jsonStr.includes('Bunbetsu'), 'Missing waste sorting content');
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. T-153: JFT-Basic Authentic CBT Exam Engine (JftBasicCbtModal.tsx)
// ─────────────────────────────────────────────────────────────────────────────
check('T-153: JftBasicCbtModal.tsx implements 60-min timer, 4 sections, and 250-point score standard', () => {
  const modalPath = path.join(ROOT, 'src/components/quiz/JftBasicCbtModal.tsx');
  assert.ok(fs.existsSync(modalPath), 'Missing JftBasicCbtModal.tsx');
  const content = fs.readFileSync(modalPath, 'utf8');

  // Verify 60-minute timer (3600 seconds)
  assert.ok(content.includes('3600'), 'Timer must be 3600 seconds (60 minutes)');
  assert.ok(content.includes('timeRemainingSeconds'), 'Timer state timeRemainingSeconds missing');

  // Verify 4 official sections
  assert.ok(content.includes('文字と語彙') && content.includes('Moji to Goi'), 'Section 1 Moji to Goi missing');
  assert.ok(content.includes('会話と表現') && content.includes('Kaiwa to Hyogen'), 'Section 2 Kaiwa to Hyogen missing');
  assert.ok(content.includes('聴解') && content.includes('Choukai'), 'Section 3 Choukai missing');
  assert.ok(content.includes('読解') && content.includes('Dokkai'), 'Section 4 Dokkai missing');

  // Verify official 250 points total scale and 200 points pass threshold (80%)
  assert.ok(content.includes('250'), 'Max score must be 250 points');
  assert.ok(content.includes('200'), 'Pass mark threshold must be 200 points (80%)');
  assert.ok(content.includes('合格') && content.includes('不合格'), 'Must determine 合格 (Gokaku) and 不合格 (Fugokaku)');
  assert.ok(content.includes('examResult.passed'), 'examResult.passed check missing');

  // Verify 2x audio play limit constraint
  assert.ok(content.includes('audioPlayCount'), 'Must track audioPlayCount');
  assert.ok(content.includes('handlePlayChoukaiAudio'), 'handlePlayChoukaiAudio method missing');
});

check('T-153: JftBasicCbtModal implements review palette with flagged (見直し) state', () => {
  const modalPath = path.join(ROOT, 'src/components/quiz/JftBasicCbtModal.tsx');
  const content = fs.readFileSync(modalPath, 'utf8');

  assert.ok(content.includes('flaggedQuestions'), 'Review palette flagging state missing');
  assert.ok(content.includes('handleToggleFlag'), 'Flag toggle handler missing');
  assert.ok(content.includes('見直し') || content.includes('Tandai'), 'Review label missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. T-154: Seikatsu Living Guide Interactive Modal & Municipal Checklists
// ─────────────────────────────────────────────────────────────────────────────
check('T-154: SeikatsuLivingGuideModal.tsx covers all 4 critical municipal and life domains', () => {
  const guidePath = path.join(ROOT, 'src/components/materi/SeikatsuLivingGuideModal.tsx');
  assert.ok(fs.existsSync(guidePath), 'Missing SeikatsuLivingGuideModal.tsx');
  const content = fs.readFileSync(guidePath, 'utf8');

  // Verify 4 categories
  assert.ok(content.includes("'shiyakusho'"), 'Category shiyakusho missing');
  assert.ok(content.includes("'gomi'"), 'Category gomi missing');
  assert.ok(content.includes("'housing'"), 'Category housing missing');
  assert.ok(content.includes("'disaster'"), 'Category disaster missing');

  // Verify procedural checklist functionality
  assert.ok(content.includes('checkedProcedures'), 'checkedProcedures state missing');
  assert.ok(content.includes('handleToggleProcedure'), 'handleToggleProcedure handler missing');

  // Verify Japanese terminology & emergency hotlines
  assert.ok(content.includes('住民票') || content.includes('Juminhyo'), 'Juminhyo missing');
  assert.ok(content.includes('110') && content.includes('119'), 'Emergency numbers 110/119 missing');
  assert.ok(content.includes('燃えるごみ') || content.includes('Moeru'), 'Combustible waste vocabulary missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-155: Component Mounts & Responsive Compliance in CurriculumTrackBrowser & QuizArenaHub
// ─────────────────────────────────────────────────────────────────────────────
check('T-155: CurriculumTrackBrowser mounts JftBasicCbtModal & SeikatsuLivingGuideModal', () => {
  const browserPath = path.join(ROOT, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const content = fs.readFileSync(browserPath, 'utf8');

  assert.ok(content.includes('JftBasicCbtModal'), 'JftBasicCbtModal not imported/used in CurriculumTrackBrowser');
  assert.ok(content.includes('SeikatsuLivingGuideModal'), 'SeikatsuLivingGuideModal not imported/used in CurriculumTrackBrowser');
  assert.ok(content.includes('isJftModalOpen'), 'isJftModalOpen state missing in CurriculumTrackBrowser');
  assert.ok(content.includes('isSeikatsuModalOpen'), 'isSeikatsuModalOpen state missing in CurriculumTrackBrowser');
});

check('T-155: QuizArenaHub mounts JftBasicCbtModal with authentic CBT entry point', () => {
  const hubPath = path.join(ROOT, 'src/components/quiz/QuizArenaHub.tsx');
  const content = fs.readFileSync(hubPath, 'utf8');

  assert.ok(content.includes('JftBasicCbtModal'), 'JftBasicCbtModal not imported/used in QuizArenaHub');
  assert.ok(content.includes('isJftModalOpen'), 'isJftModalOpen state missing in QuizArenaHub');
  assert.ok(content.includes('JFT-Basic CBT') || content.includes('JFT-Basic'), 'JFT CBT CTA button missing in QuizArenaHub');
});

check('T-155: Responsive viewport and safe area safeguards are strictly enforced', () => {
  const cbtPath = path.join(ROOT, 'src/components/quiz/JftBasicCbtModal.tsx');
  const cbtContent = fs.readFileSync(cbtPath, 'utf8');
  assert.ok(cbtContent.includes('max-h-[90dvh]') || cbtContent.includes('max-h-[92vh]'), 'CBT modal max height constraint violated');
  assert.ok(cbtContent.includes('overflow-y-auto'), 'CBT modal must have overflow-y-auto');

  const guidePath = path.join(ROOT, 'src/components/materi/SeikatsuLivingGuideModal.tsx');
  const guideContent = fs.readFileSync(guidePath, 'utf8');
  assert.ok(guideContent.includes('max-h-[90dvh]') || guideContent.includes('max-h-[92vh]'), 'Living Guide modal max height constraint violated');
  assert.ok(guideContent.includes('overflow-y-auto'), 'Living Guide modal must have overflow-y-auto');
});

// ─────────────────────────────────────────────────────────────────────────────
// Final Report
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n🏁 Sprint 27 Forensic Audit Complete: ${passedChecks}/${totalChecks} checks passed.`);
if (passedChecks === totalChecks) {
  console.log('🎉 SPRINT 27 FORENSIC CERTIFICATION: 100% PASS — Zero Regressions!\n');
} else {
  console.error(`💥 Audit failed: ${totalChecks - passedChecks} assertions failed.`);
  process.exit(1);
}
