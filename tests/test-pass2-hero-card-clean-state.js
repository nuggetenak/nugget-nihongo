// ══════════════════════════════════════════════════════════════════
//  test-pass2-hero-card-clean-state.js
//  Verification Suite for Phase 2: Compact Wa-Bento Hero Card & Clean State
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
  }
}

console.log('\n=============================================================');
console.log('🍙 RUNNING PHASE 2: HERO CARD & CLEAN STATE HOMEPAGE AUDIT');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const homePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
const homeCode = fs.readFileSync(homePath, 'utf8');

// ── Test 1: Anti-Contradiction Real XP Status Badge (Defect #208 / #2) ──
test('P2.1: HomePage renders real XP status badge without dark-island bg-emerald-950/80 on 0 XP', () => {
  assert(!homeCode.includes("bg-emerald-950/80 text-emerald-400 font-extrabold"), 'Must eliminate dark-island bg-emerald-950/80');
  assert(homeCode.includes('todayXP === 0'), 'Must conditionally check todayXP === 0');
  assert(homeCode.includes('🌱 Langkah Pertama ('), 'Must render Langkah Pertama label on 0 XP');
  assert(homeCode.includes('✨ Target Selesai ('), 'Must render Target Selesai label when goal reached');
  assert(homeCode.includes('⚡ Momentum ('), 'Must render Momentum label during progress');
});

// ── Test 2: Hierarchical Wa-Bento Title Design (Defect #210) ──
test('P2.2: HomePage eliminates AI-slop title pile-up in favor of clear sub-kicker hierarchy', () => {
  assert(!homeCode.includes('Selamat Belajar · Misi Hari Ini 今日も頑張ろう'), 'Must eliminate concatenated title string');
  assert(homeCode.includes('今日も頑張ろう'), 'Must render authentic sub-kicker 今日も頑張ろう');
  assert(homeCode.includes('Selamat Belajar 🍙'), 'Must render clean Wa-Bento title');
});

// ── Test 3: Dynamic Contextual Secondary Button (Defect #212 / #4) ──
test('P2.3: Hero secondary action adapts to user state (CAT test when 0 cards, FSRS when due, or Kebun Kata)', () => {
  assert(homeCode.includes('totalLearnedCards === 0'), 'Must evaluate totalLearnedCards === 0');
  assert(homeCode.includes('placementHistory'), 'Must check placementHistory existence');
  assert(homeCode.includes('openCatPlacement'), 'Must provide CAT test button for fresh users');
  assert(homeCode.includes('Ulas FSRS ('), 'Must render Ulas FSRS when dueCount > 0');
  assert(homeCode.includes('Kebun Kata'), 'Must render Kebun Kata when cards exist');
});

// ── Test 4: Dynamic Vocabulary Loading per Active Track (Defect #24 / #68) ──
test('P2.4: HomePage loads vocab and grammar dynamically according to activeTrackId', () => {
  assert(homeCode.includes('Promise.all([loadVocab(targetLevel), loadGrammar(targetLevel)])'), 'Must load targetLevel dynamically');
  assert(homeCode.includes('}, [activeTrackId]);'), 'Must include activeTrackId in dependency array');
});

// ── Test 5: Compact Layout & Multi-Device Responsive Height ──
test('P2.5: Hero container uses compact Wa-Bento spacing (<220px) and safe cushions', () => {
  assert(homeCode.includes('p-4 sm:p-6'), 'Must use compact padding p-4 sm:p-6');
  assert(homeCode.includes('line-clamp-2'), 'Must clamp long descriptions to prevent card blowouts');
  assert(homeCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'Must maintain safe cushion above BottomNav');
});

console.log(`\n=============================================================`);
console.log(`📊 PHASE 2 RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
console.log(`=============================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
