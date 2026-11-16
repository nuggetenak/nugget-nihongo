// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint23-gemba-depollution.js
//  Sprint 23: Gemba De-pollution & Workplace Context Remapping QA
//  Verifies elimination of "gemba" overgeneralization across curriculum,
//  UI components, CBT simulators, and diagnostic inventories while
//  preserving authentic Japanese domain terminology.
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Sprint 23 — Gemba De-pollution & Workplace Context Remapping QA\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ PASS: ${message}`);
  passedTests++;
}

async function runTests() {
  // ── 1. Diagnostic Inventory & Confusion Pairs Domain VI De-pollution ──
  console.log('--- [Check 1] Diagnostic Inventory & Confusion Pairs Sanitization ---');
  const diagJsonPath = path.join(ROOT_DIR, 'public', 'data', 'diagnostic', 'diagnostic-inventory.json');
  assert(fs.existsSync(diagJsonPath), 'diagnostic-inventory.json must exist');

  const diagData = JSON.parse(fs.readFileSync(diagJsonPath, 'utf8'));
  const items = diagData.items || diagData;
  const domainVIPairs = items.filter((item) => item.domain && item.domain.includes('Domain VI'));
  assert(domainVIPairs.length > 0, 'Domain VI items must be present');

  domainVIPairs.forEach((item) => {
    assert(
      !item.domain.toLowerCase().includes('gemba'),
      `Item #${item.id} domain must not contain 'gemba' (got: ${item.domain})`
    );
    assert(
      !item.category.toLowerCase().includes('gemba'),
      `Item #${item.id} category must not contain 'gemba' (got: ${item.category})`
    );
  });

  // Verify specific everyday confusion pairs have zero 'gemba' pollution
  const confPairsContent = fs.readFileSync(path.join(ROOT_DIR, 'public', 'data', 'confusion-pairs.js'), 'utf8');
  assert(!confPairsContent.includes('Janji temu gemba'), 'Confusion pairs must not label casual 2:00 meeting as gemba');
  assert(!confPairsContent.includes('kepolisian gemba'), 'Confusion pairs must not label 110 police call as gemba');
  assert(!confPairsContent.includes('dapur gemba'), 'Confusion pairs must not label cooking seasoning as gemba');
  assert(!confPairsContent.includes('SOP gemba'), 'Confusion pairs must not label moral grammar (beki da) as SOP gemba');
  assert(!confPairsContent.includes('Mitigasi Bahaya Gemba'), 'Confusion pairs must not label general disaster (mangaichi) as mitigasi gemba');

  // ── 2. Kaigo Eldercare Curriculum Context Remapping ──
  console.log('\n--- [Check 2] Kaigo Eldercare Curriculum Context Remapping ---');
  const kaigoLessonPath = path.join(ROOT_DIR, 'src', 'lib', 'curriculum', 'lessons', 'ssw', 'kaigo.ts');
  const kaigoContent = fs.readFileSync(kaigoLessonPath, 'utf8');
  assert(!kaigoContent.includes('K3 Gemba'), 'Kaigo lessons must not label eldercare safety as K3 Gemba');
  assert(!kaigoContent.includes('gemba panti wreda'), 'Kaigo lessons must not label nursing homes as gemba');
  assert(kaigoContent.includes('panti lansia (施設)'), 'Kaigo lessons must accurately refer to eldercare facilities as panti lansia (施設)');

  // ── 3. UI Navigation & Mode Label Harmonization ──
  console.log('\n--- [Check 3] UI Navigation & Mode Label Harmonization ---');
  const hubPath = path.join(ROOT_DIR, 'src', 'components', 'quiz', 'QuizArenaHub.tsx');
  const hubContent = fs.readFileSync(hubPath, 'utf8');
  assert(hubContent.includes('Mode Tambahan & Spesialis Kerja Nyata'), 'Quiz arena hub must display humanized workplace label');
  assert(!hubContent.includes('Mode Tambahan & Spesialis Gemba'), 'Quiz arena hub must not use gemba buzzword in main accordion header');

  const ctbPath = path.join(ROOT_DIR, 'src', 'components', 'materi', 'CurriculumTrackBrowser.tsx');
  const ctbContent = fs.readFileSync(ctbPath, 'utf8');
  assert(!ctbContent.includes('SSW Konstruksi & Gemba'), 'Construction track must be titled SSW Konstruksi (Kensetsu)');
  assert(!ctbContent.includes('Pencegahan celaka K3 Gemba'), 'Track description must use clean phrasing (K3 lapangan proyek)');

  const hvptModalPath = path.join(ROOT_DIR, 'src', 'components', 'audio', 'HVPTModal.tsx');
  const hvptContent = fs.readFileSync(hvptModalPath, 'utf8');
  assert(!hvptContent.includes('K3 Gemba & Desonorisasi'), 'HVPT modal must label category as Keselamatan K3 & Desonorisasi');

  const panicCardPath = path.join(ROOT_DIR, 'src', 'components', 'quiz', 'PanicRecallCard.tsx');
  const panicCardContent = fs.readFileSync(panicCardPath, 'utf8');
  assert(!panicCardContent.includes('Simulasi Darurat Gemba K3'), 'Panic recall card must use clean title (Simulasi Darurat Keselamatan K3)');

  const onboardingPath = path.join(ROOT_DIR, 'src', 'components', 'onboarding', 'OnboardingModal.tsx');
  const onboardingContent = fs.readFileSync(onboardingPath, 'utf8');
  assert(!onboardingContent.includes('SSW Konstruksi Gemba'), 'Onboarding modal must use SSW Konstruksi (Kensetsu)');

  // ── 4. Backward-Compatible Domain Query Resolver ──
  console.log('\n--- [Check 4] Backward-Compatible Domain Query Resolver ---');
  const { getDiagnosticPairsByDomain } = await import('../src/lib/data/diagnosticManager.ts');
  const legacyGembaPairs = await getDiagnosticPairsByDomain('gemba');
  assert(legacyGembaPairs.length > 0, `Legacy query 'gemba' must resolve workplace safety pairs via backward-compatible alias (got ${legacyGembaPairs.length})`);

  const workplacePairs = await getDiagnosticPairsByDomain('workplace');
  assert(workplacePairs.length > 0, `Modern query 'workplace' must resolve diagnostic pairs (got ${workplacePairs.length})`);

  // ── 5. Authentic Japanese Domain Preservation ──
  console.log('\n--- [Check 5] Authentic Japanese Domain Terminology Preservation ---');
  const vocabN3Path = path.join(ROOT_DIR, 'public', 'data', 'vocab', 'vocab-n3.js');
  const vocabN3Content = fs.readFileSync(vocabN3Path, 'utf8');
  assert(vocabN3Content.includes('現場'), 'Legitimate JLPT N3 vocabulary entry 現場 (genba) must be strictly preserved');

  const prometricPath = path.join(ROOT_DIR, 'src', 'components', 'quiz', 'PrometricCbtModal.tsx');
  const prometricContent = fs.readFileSync(prometricPath, 'utf8');
  assert(prometricContent.includes('CN-SSW-JAC-2026'), 'Prometric official construction exam specification must be intact');

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log(`🎉 SPRINT 23 AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED 100% GREEN!`);
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
