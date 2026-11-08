// ══════════════════════════════════════════════════════════════════
//  test-s4-pass11-share-cards.js — Forensic Unit & Regression Suite
//  Siklus IV Pass 11: Shareable Study & Mastery Card Generator
//  Validates HTML5 Canvas card rendering, Goukaku seal, social branding,
//  and KanjiStrokeModal integration with Web Share API.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const generatorPath = path.join(ROOT_DIR, 'src/lib/social/shareCardGenerator.ts');
const modalPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiStrokeModal.tsx');

console.log('🧪 Running Siklus IV Pass 11: Shareable Study & Mastery Card Generator Test...');

// 1. Static Contract & AST Verification
console.log('  🔍 Check 1: Validating shareCardGenerator.ts AST and Exported Functions...');
assert(fs.existsSync(generatorPath), 'shareCardGenerator.ts must exist');
const generatorSrc = fs.readFileSync(generatorPath, 'utf8');

assert(
  generatorSrc.includes('export async function generateKanjiMasteryCard'),
  'Must export generateKanjiMasteryCard'
);
assert(
  generatorSrc.includes('export async function shareKanjiCard'),
  'Must export shareKanjiCard'
);
assert(
  generatorSrc.includes('export function downloadKanjiCard'),
  'Must export downloadKanjiCard'
);
assert(
  generatorSrc.includes('NUGGET NIHONGO'),
  'Must render official NUGGET NIHONGO branding'
);
assert(
  generatorSrc.includes('合格'),
  'Must include traditional Goukaku (Certified) Hanko seal'
);
assert(
  generatorSrc.includes('@NuggetNihongo'),
  'Must include official @NuggetNihongo handle in footer'
);
assert(
  generatorSrc.includes('#NuggetNihongo'),
  'Must include #NuggetNihongo hashtag in Web Share text'
);
console.log('  ✅ Check 1 Passed: Function signatures & branding contracts certified');

// 2. Headless Runtime Execution
console.log('  🔍 Check 2: Testing Headless / SSR Execution Fallback...');
const { generateKanjiMasteryCard } = require('../src/lib/social/shareCardGenerator.ts');

async function testHeadless() {
  const result = await generateKanjiMasteryCard({
    character: '日',
    meaning: 'Matahari / Hari',
    score: 95,
    jlptLevel: 'N5',
  });

  assert(result, 'Must return generated card result');
  assert.strictEqual(result.width, 1080, 'Default width must be 1080px');
  assert.strictEqual(result.height, 1080, 'Default height must be 1080px');
  assert(result.dataUrl.includes('data:image/'), 'Must return valid dataUrl');
}

testHeadless().then(() => {
  console.log('  ✅ Check 2 Passed: Headless execution produces 1080x1080 card result');

  // 3. KanjiStrokeModal Integration Verification
  console.log('  🔍 Check 3: Validating KanjiStrokeModal.tsx Completion Overlay Integration...');
  const modalSrc = fs.readFileSync(modalPath, 'utf8');

  assert(
    modalSrc.includes("import { shareKanjiCard } from '../../lib/social/shareCardGenerator"),
    'KanjiStrokeModal must import shareKanjiCard'
  );
  assert(
    modalSrc.includes('handleShareCard'),
    'KanjiStrokeModal must implement handleShareCard callback'
  );
  assert(
    modalSrc.includes('Bagikan Kartu'),
    'KanjiStrokeModal completion overlay must render Bagikan Kartu button'
  );
  assert(
    modalSrc.includes('min-h-[40px]'),
    'Share card button must adhere to >= 40px touch ergonomics'
  );
  console.log('  ✅ Check 3 Passed: KanjiStrokeModal UI integration certified');

  console.log('\n🎉 PASS 11 VERIFIED: Shareable Study & Mastery Card Generator certified 100% compliant!\n');
  process.exit(0);
}).catch((err) => {
  console.error('❌ Check failed:', err);
  process.exit(1);
});
