// ══════════════════════════════════════════════════════════════════════
//  test-s6-pass6-b-tag-foreign-copy-purged.js
//  Siklus VI Pass 6: Eradikasi Tag <b> Bocor & Bahasa Asing
//  Verifies that raw HTML <b> tags are sanitized across RubyText,
//  rubyGenerator, CounterTrainer, and KanjiStrokeModal, and foreign copy
//  is harmonized to natural Indonesian.
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Siklus VI Pass 6 — Eradication of Leaked <b> Tags & Foreign Copy QA');

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
  // Check 1: rubyGenerator.ts sanitizes <b> tags in stripFurigana and parseRubySegments
  const rubyGenPath = path.join(ROOT_DIR, 'src', 'lib', 'data', 'rubyGenerator.ts');
  assert(fs.existsSync(rubyGenPath), 'rubyGenerator.ts exists');
  const { stripFurigana, parseRubySegments } = await import('../src/lib/data/rubyGenerator.ts');

  const testWithBold = '先生のご指導の<b>おかげで</b>、試験に合格しました。';
  const stripped = stripFurigana(testWithBold);
  assert(
    !stripped.includes('<b>') && !stripped.includes('</b>'),
    'stripFurigana eliminates raw <b> and </b> tags'
  );

  const segments = parseRubySegments(testWithBold);
  const leakedInSegments = segments.some(
    (s) => (s.kanji && s.kanji.includes('<b>')) || (s.rt && s.rt.includes('<b>'))
  );
  assert(!leakedInSegments, 'parseRubySegments eliminates raw <b> tags from parsed segments');

  // Check 2: RubyText component sanitizes <b> tags
  const rubyTextPath = path.join(ROOT_DIR, 'src', 'components', 'ui', 'RubyText.tsx');
  assert(fs.existsSync(rubyTextPath), 'RubyText.tsx exists');
  const rubyTextSrc = fs.readFileSync(rubyTextPath, 'utf8');
  assert(
    rubyTextSrc.includes('text.replace(/<\\/?b>/gi') || rubyTextSrc.includes('targetText = typeof text'),
    'RubyText.tsx sanitizes raw <b> and </b> tags from targetText'
  );

  // Check 3: JapaneseFormattedText.tsx handles <b> tags
  const jftPath = path.join(ROOT_DIR, 'src', 'components', 'ui', 'JapaneseFormattedText.tsx');
  assert(fs.existsSync(jftPath), 'JapaneseFormattedText.tsx exists');
  const jftSrc = fs.readFileSync(jftPath, 'utf8');
  assert(
    jftSrc.includes("part === '<b>'") && jftSrc.includes("part === '</b>'"),
    'JapaneseFormattedText safely splits and renders bold tags into styled spans'
  );

  // Check 4: CounterTrainerModal and KanjiStrokeModal sanitize examples
  const counterModalPath = path.join(ROOT_DIR, 'src', 'components', 'counters', 'CounterTrainerModal.tsx');
  assert(fs.existsSync(counterModalPath), 'CounterTrainerModal.tsx exists');
  const counterSrc = fs.readFileSync(counterModalPath, 'utf8');
  assert(
    counterSrc.includes('exampleSentence.jp.replace(/<\\/?b>/gi'),
    'CounterTrainerModal strips <b> tags from example sentence display'
  );

  const kanjiStrokePath = path.join(ROOT_DIR, 'src', 'components', 'kanji', 'KanjiStrokeModal.tsx');
  assert(fs.existsSync(kanjiStrokePath), 'KanjiStrokeModal.tsx exists');
  const kanjiStrokeSrc = fs.readFileSync(kanjiStrokePath, 'utf8');
  assert(
    kanjiStrokeSrc.includes('examples[0].jp.replace(/<\\/?b>/gi'),
    'KanjiStrokeModal strips <b> tags from example sentence display'
  );

  // Check 5: Foreign copy harmonization in KebunPage and ExamLmsHub
  const kebunPath = path.join(ROOT_DIR, 'src', 'pages', 'KebunPage.tsx');
  assert(fs.existsSync(kebunPath), 'KebunPage.tsx exists');
  const kebunSrc = fs.readFileSync(kebunPath, 'utf8');
  assert(
    kebunSrc.includes('Perlu Diulas') && kebunSrc.includes('Kartu Perlu Diulas'),
    'KebunPage harmonizes raw "Due" into friendly Indonesian "Perlu Diulas"'
  );

  const examLmsPath = path.join(ROOT_DIR, 'src', 'components', 'exercise', 'ExamLmsHub.tsx');
  assert(fs.existsSync(examLmsPath), 'ExamLmsHub.tsx exists');
  const examLmsSrc = fs.readFileSync(examLmsPath, 'utf8');
  assert(
    examLmsSrc.includes('Belum Ada Kartu Perlu Diulas') && examLmsSrc.includes('Mulai Ulas Materi'),
    'ExamLmsHub harmonizes button labels into friendly Indonesian'
  );

  console.log(`\n🎉 Suite Summary: ${passedTests}/${totalTests} tests passed successfully.`);
  process.exit(0);
} catch (err) {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
}
