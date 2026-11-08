// ══════════════════════════════════════════════════════════════════
//  test-pass3-homepage-declutter-verification.js
//  PASS 3 Forensic Verification Suite: HomePage De-Cluttering & Readability
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

const ROOT_DIR = path.resolve(__dirname, '..');

function main() {
  console.log('\n=============================================================');
  console.log('🏛️  RUNNING PASS 3: HOMEPAGE DE-CLUTTERING & READABILITY AUDIT');
  console.log('=============================================================\n');

  const homePagePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
  const heatmapPath = path.join(ROOT_DIR, 'src/components/gamification/HeatmapCalendar.tsx');

  assert(fs.existsSync(homePagePath), 'HomePage.tsx must exist');
  assert(fs.existsSync(heatmapPath), 'HeatmapCalendar.tsx must exist');

  const homeCode = fs.readFileSync(homePagePath, 'utf8');
  const heatCode = fs.readFileSync(heatmapPath, 'utf8');

  // ── 1. Hero Cockpit De-Cluttering & Prominent CTA ──
  test('P3.1: Hero learning cockpit features prominent primary CTA with >=48px touch height and shadow-glow', () => {
    assert(homeCode.includes('min-h-[48px]'), 'Primary hero CTA must have min-h-[48px]');
    assert(homeCode.includes('py-3'), 'Primary hero CTA must have py-3 padding');
    assert(homeCode.includes('shadow-glow'), 'Primary hero CTA must feature shadow-glow elevation');
    assert(homeCode.includes('active:scale-95'), 'Hero CTA must provide active:scale-95 tactile feedback');
    assert(homeCode.includes('Ulas Kembali · Unit'), 'Supports Ulas Kembali state');
    assert(homeCode.includes('Lanjut Belajar · Unit'), 'Supports Lanjut Belajar state');
    assert(homeCode.includes('Mulai Belajar · Unit'), 'Supports Mulai Belajar state');
  });

  // ── 2. Daily XP Progress Bar & Streak Counter Ergonomics ──
  test('P3.2: Daily XP progress bar and streak counter maintain generous breathing room and clear typography', () => {
    assert(homeCode.includes('tabular-nums') && homeCode.includes('font-mono'), 'Streak counter must declare tabular-nums and font-mono');
    assert(homeCode.includes('Target Harian & Momentum') || homeCode.includes('Target Harian'), 'Must prominently display Target Harian');
    assert(homeCode.includes('goalProgressPercent'), 'Must compute goalProgressPercent');
    assert(homeCode.includes('todayXP'), 'Must evaluate todayXP');
    assert(homeCode.includes('dailyGoalXP'), 'Must evaluate dailyGoalXP');
    assert(homeCode.includes('h-2.5 rounded-full overflow-hidden'), 'Progress bar must have generous h-2.5 height');
  });

  // ── 3. Daily Kotowaza (Proverb) Card Readability & Anti-Truncation ──
  test('P3.3: Kotowaza card purges micro-fonts, eliminates line-clamp/truncation, and maintains touch ergonomics', () => {
    assert(homeCode.includes('{/* Kotowaza: Daily Authentic Japanese Proverb */}'), 'Must preserve contract comment for Kotowaza');
    assert(homeCode.includes('{/* Daily word card container must have min-h-[180px] to prevent layout shift */}'), 'Must preserve CLS min-h-[180px] comment');
    
    // Check Kotowaza card slice
    const kotowazaStart = homeCode.indexOf('Kotowaza: Daily Authentic Japanese Proverb');
    const kotowazaEnd = homeCode.indexOf('TIER 3: QUICK UTILITIES STRIP');
    const kotowazaCard = homeCode.slice(kotowazaStart, kotowazaEnd);

    assert(kotowazaCard.includes('min-w-[40px] min-h-[40px]'), 'Kotowaza audio button must enforce min-w-[40px] min-h-[40px]');
    assert(kotowazaCard.includes('sm:min-w-[44px] sm:min-h-[44px]'), 'Kotowaza audio button must scale to 44px on desktop');
    assert(kotowazaCard.includes('active:scale-95'), 'Kotowaza audio button must have active:scale-95');

    // No aggressive truncations on Kotowaza meaning or wisdom
    assert(!kotowazaCard.includes('line-clamp-2'), 'Must eliminate line-clamp-2 cutting off proverb wisdom');
  });

  // ── 4. Daily Kotoba (Word of the Day) Card Readability ──
  test('P3.4: Kotoba Hari Ini card provides clear typography and enforces 40x40 / 44x44 touch targets', () => {
    assert(homeCode.includes('w-11 h-11') && homeCode.includes('min-w-[44px] min-h-[44px]'), 'Info button must declare min-w-[44px] min-h-[44px]');
    assert(homeCode.includes('min-w-[40px] min-h-[40px]') && homeCode.includes('sm:min-w-[44px] sm:min-h-[44px]'), 'Word audio button must declare 40px/44px');
    assert(homeCode.includes('min-h-[44px] px-2 active:scale-95'), 'Pelajari Selengkapnya trigger must declare min-h-[44px]');
    assert(homeCode.includes('<SkeletonCard type="word"'), 'Must render SkeletonCard for loading dailyWord');
  });

  // ── 5. 49-Day Activity Heatmap & Quick Stats ──
  test('P3.5: HeatmapCalendar supports hideWrapper to eliminate duplicate nested cards, with high-contrast cells', () => {
    assert(heatCode.includes('hideWrapper?: boolean'), 'HeatmapCalendar must support hideWrapper prop');
    assert(homeCode.includes('<HeatmapCalendar days={49} hideWrapper />'), 'HomePage must mount HeatmapCalendar with hideWrapper');
    assert(heatCode.includes('bg-amber-400') || heatCode.includes('bg-amber-500'), 'Heatmap must render vibrant activity tiers');
    assert(heatCode.includes('border-accent/20'), 'Empty cells must maintain discernible contrast borders');
  });

  // ── 6. Anti-Microfont Purge Across HomePage Subsystem ──
  test('P3.6: Purged all text-[10px], text-[11px], text-[10.5px], text-[11.5px] micro-fonts across HomePage', () => {
    const microfontRegex = /text-\[(10|11|10\.5|11\.5|9)px\]/;
    assert(!microfontRegex.test(homeCode), 'HomePage.tsx must NOT contain any micro-fonts below text-xs (12px)');
    assert(!microfontRegex.test(heatCode), 'HeatmapCalendar.tsx must NOT contain any micro-fonts below text-xs (12px)');
  });

  // ── 7. Cumulative Navigation & Modal Tree Contracts ──
  test('P3.7: HomePage preserves all foundational LMS, sync, and modal deduplication contracts', () => {
    assert(homeCode.includes('CurriculumTrackBrowser'), 'HomePage must embed CurriculumTrackBrowser');
    assert(homeCode.includes('getNextUncompletedLesson(activeTrackId, trackData, trackProgress)'), 'Dynamic next lesson engine');
    assert(homeCode.includes('openLessonStudy('), 'Lesson study dispatcher');
    assert(
      homeCode.includes('Streak ${streak} Hari Aktif') || homeCode.includes('Streak {streak} Hari Aktif'),
      'Synchronous streak render contract'
    );
    assert(homeCode.includes('dueCount > 0'), 'Due count evaluation');
    assert(homeCode.includes('<SyncStatusPill />'), 'SyncStatusPill mount contract');
    assert(homeCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Safe navigation cushion contract');
    
    // Zero duplicate modal mounts
    assert(!homeCode.includes('<DetailModal'), 'HomePage must NOT mount DetailModal');
    assert(!homeCode.includes('<KanaChartModal'), 'HomePage must NOT mount KanaChartModal');
    assert(!homeCode.includes('<ConjugationModal'), 'HomePage must NOT mount ConjugationModal');
    assert(!homeCode.includes('<NuanceCompareModal'), 'HomePage must NOT mount NuanceCompareModal');
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`📊 PASS 3 AUDIT RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
  console.log('-------------------------------------------------------------\n');

  if (passedTests === totalTests) {
    console.log('🌟 PASS 3 "HOMEPAGE DE-CLUTTERING & READABILITY" 100% VERIFIED!\n');
    process.exit(0);
  } else {
    console.error('💥 PASS 3 VERIFICATION FAILED!\n');
    process.exit(1);
  }
}

main();
