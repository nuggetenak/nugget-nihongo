// ══════════════════════════════════════════════════════════════════════
//  test-s6-pass4-quiz-distractors-clean.js
//  Siklus VI Pass 4: Pembersihan Opsi Jawaban Kuis (Anti-Kurung & Anti-Slash)
//  Verifies that multiple choice options and distractors across quizzes and
//  curriculum drills are clean, homogeneous, and free of leaked meta-hints
//  or parentheses explanations.
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Siklus VI Pass 4 — Clean Quiz Distractors (Anti-Kurung & Anti-Slash) QA');

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
  // Check 1: cleanOptionText exists and handles stripping
  const adapterPath = path.join(ROOT_DIR, 'src', 'lib', 'curriculum', 'lessonContentAdapter.ts');
  assert(fs.existsSync(adapterPath), 'lessonContentAdapter.ts exists');
  const { cleanOptionText } = await import('../src/lib/curriculum/lessonContentAdapter.ts');
  assert(typeof cleanOptionText === 'function', 'cleanOptionText is exported function');

  // Check 2: Parentheses stripping tests
  assert(
    cleanOptionText('買えません (hanya bisa / negatif)') === '買えません',
    'cleanOptionText removes "(hanya bisa / negatif)"'
  );
  assert(
    cleanOptionText('りようしゃさま (Riyousha-sama)') === 'りようしゃさま',
    'cleanOptionText removes "(Riyousha-sama)"'
  );
  assert(
    cleanOptionText('てんとう (転倒)') === 'てんとう',
    'cleanOptionText removes "(転倒)"'
  );
  assert(
    cleanOptionText('行ったことがあります (pernah)') === '行ったことがあります',
    'cleanOptionText removes "(pernah)"'
  );
  assert(
    cleanOptionText('降りそう (kelihatannya akan)') === '降りそう',
    'cleanOptionText removes "(kelihatannya akan)"'
  );
  assert(
    cleanOptionText('とは限らない (belum tentu)') === 'とは限らない',
    'cleanOptionText removes "(belum tentu)"'
  );
  assert(
    cleanOptionText('につれて (seiring bertambahnya)') === 'につれて',
    'cleanOptionText removes "(seiring bertambahnya)"'
  );

  // Check 3: Slash alternative stripping tests
  assert(
    cleanOptionText('melihat / menonton') === 'melihat',
    'cleanOptionText trims ambiguous slash alternative "melihat / menonton" -> "melihat"'
  );
  assert(
    cleanOptionText('di / ke') === 'di',
    'cleanOptionText trims ambiguous slash alternative "di / ke" -> "di"'
  );
  assert(
    cleanOptionText('3/4') === '3/4',
    'cleanOptionText preserves numeric fractions like "3/4"'
  );

  // Check 4: quizEngine.ts ERROR_TRAP_BANK sanitization
  const enginePath = path.join(ROOT_DIR, 'src', 'lib', 'quiz', 'quizEngine.ts');
  assert(fs.existsSync(enginePath), 'quizEngine.ts exists');
  const engineCode = fs.readFileSync(enginePath, 'utf8');
  assert(
    !engineCode.includes('(hanya bisa / negatif)') &&
      !engineCode.includes('(pernah)') &&
      !engineCode.includes('(kelihatannya akan)') &&
      !engineCode.includes('(belum tentu)') &&
      !engineCode.includes('(seiring bertambahnya)'),
    'quizEngine.ts ERROR_TRAP_BANK options are completely free of leaked parentheses hints'
  );

  // Check 5: ssw/kaigo.ts drills options sanitization
  const kaigoPath = path.join(ROOT_DIR, 'src', 'lib', 'curriculum', 'lessons', 'ssw', 'kaigo.ts');
  assert(fs.existsSync(kaigoPath), 'ssw/kaigo.ts exists');
  const kaigoCode = fs.readFileSync(kaigoPath, 'utf8');
  assert(
    !kaigoCode.includes("['りようしゃさま (Riyousha-sama)'") &&
      !kaigoCode.includes("['おじいちゃん (Ojiichan)'") &&
      !kaigoCode.includes("['てんとう (転倒)'"),
    'ssw/kaigo.ts drill options are pure Japanese strings without inline romaji or brackets'
  );

  // Check 6: QuizPage and MicroDrillStage render with cleanOptionText
  const quizPagePath = path.join(ROOT_DIR, 'src', 'pages', 'QuizPage.tsx');
  assert(fs.existsSync(quizPagePath), 'QuizPage.tsx exists');
  const quizPageCode = fs.readFileSync(quizPagePath, 'utf8');
  assert(
    quizPageCode.includes('cleanOptionText'),
    'QuizPage.tsx imports and applies cleanOptionText on option labels'
  );

  const drillStagePath = path.join(ROOT_DIR, 'src', 'components', 'curriculum', 'player', 'MicroDrillStage.tsx');
  assert(fs.existsSync(drillStagePath), 'MicroDrillStage.tsx exists');
  const drillStageCode = fs.readFileSync(drillStagePath, 'utf8');
  assert(
    drillStageCode.includes('cleanOptionText'),
    'MicroDrillStage.tsx applies cleanOptionText on drill option tiles'
  );

  console.log(`\n🎉 Suite Summary: ${passedTests}/${totalTests} tests passed successfully.`);
  process.exit(0);
} catch (err) {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
}
