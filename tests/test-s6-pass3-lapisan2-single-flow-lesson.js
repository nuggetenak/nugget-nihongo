// ══════════════════════════════════════════════════════════════════════
//  test-s6-pass3-lapisan2-single-flow-lesson.js
//  Siklus VI Pass 3: Bedah Total Lapisan 2 (Kurikulum & Ruang Belajar: Single-Flow Feed)
//  Verifies that lesson study explanation stage renders as a unified,
//  flowing single-stream feed by default (Semua Materi: Grammar -> Vocab -> Pitfalls)
//  with non-disruptive filter tabs, zero dead-ends, and safe mobile ergonomics.
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Siklus VI Pass 3 — Lapisan 2 Single-Flow Feed & Study Studio QA');

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

try {
  const explanationPath = path.join(
    ROOT_DIR,
    'src',
    'components',
    'curriculum',
    'player',
    'ExplanationStage.tsx'
  );
  assert(fs.existsSync(explanationPath), 'ExplanationStage.tsx exists');
  const explCode = fs.readFileSync(explanationPath, 'utf8');

  // Check 1: activeSubTab state defaults to 'all' for single-flow reading
  assert(
    explCode.includes("useState<'all' | 'grammar' | 'vocab' | 'pitfalls'>('all')"),
    'ExplanationStage initializes activeSubTab state with default value "all"'
  );

  // Check 2: Sub-tab switcher includes 'Semua Materi'
  assert(
    explCode.includes("activeSubTab === 'all'") && explCode.includes('Semua Materi'),
    'ExplanationStage segmented control features "Semua Materi" tab'
  );

  // Check 3: Pilar 1 (Tata Bahasa) renders in 'all' and 'grammar' modes
  assert(
    explCode.includes("activeSubTab === 'all' || activeSubTab === 'grammar'"),
    'Pilar 1 (Tata Bahasa & Framework) renders when activeSubTab is "all" or "grammar"'
  );

  // Check 4: Pilar 2 (Kosakata) renders in 'all' and 'vocab' modes with single-flow divider
  assert(
    explCode.includes("activeSubTab === 'all' || activeSubTab === 'vocab'"),
    'Pilar 2 (Kosakata Inti) renders when activeSubTab is "all" or "vocab"'
  );
  assert(
    explCode.includes('Pilar 2: Kosakata Inti'),
    'ExplanationStage includes visual anchor for Pilar 2 in single-flow mode'
  );

  // Check 5: Pilar 3 (Jebakan) renders in 'all' and 'pitfalls' modes with single-flow divider and CTA
  assert(
    explCode.includes("activeSubTab === 'all' || activeSubTab === 'pitfalls'"),
    'Pilar 3 (Waspada Kesalahan Umum) renders when activeSubTab is "all" or "pitfalls"'
  );
  assert(
    explCode.includes('Pilar 3: Waspada Kesalahan Umum'),
    'ExplanationStage includes visual anchor for Pilar 3 in single-flow mode'
  );
  assert(
    explCode.includes('Mulai Cek Pemahaman (Kuis)'),
    'Pilar 3 anchors persistent onCompleteStage CTA "Mulai Cek Pemahaman (Kuis)" at feed terminus'
  );

  // Check 6: LessonStudyPage mobile container padding and overflow safety
  const studyPagePath = path.join(ROOT_DIR, 'src', 'pages', 'LessonStudyPage.tsx');
  assert(fs.existsSync(studyPagePath), 'LessonStudyPage.tsx exists');
  const studyCode = fs.readFileSync(studyPagePath, 'utf8');
  assert(
    studyCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]') &&
      studyCode.includes('overflow-x-hidden'),
    'LessonStudyPage enforces mobile bottom nav clearance and overflow-x-hidden'
  );

  // Check 7: CanDoCompletionStage uses local SVG illustrations for Taihen Yoku Dekimashita
  const candoPath = path.join(
    ROOT_DIR,
    'src',
    'components',
    'curriculum',
    'player',
    'CanDoCompletionStage.tsx'
  );
  assert(fs.existsSync(candoPath), 'CanDoCompletionStage.tsx exists');
  const candoCode = fs.readFileSync(candoPath, 'utf8');
  assert(
    candoCode.includes('hanko_excellent') && candoCode.includes('daruma_recovery'),
    'CanDoCompletionStage leverages local Irasutoya assets (hanko_excellent & daruma_recovery)'
  );

  console.log(`\n🎉 Suite Summary: ${passedTests}/${totalTests} tests passed successfully.`);
  process.exit(0);
} catch (err) {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
}
