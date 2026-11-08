// ══════════════════════════════════════════════════════════════════════
//  test-s3-pass4-dojo-cultural-tools.js — Verification Suite
//  Siklus III Pass 4: Dojo Specialty Tools & Cultural Modals
//  (KanaChartModal, KanjiStrokeModal, KeigoTrainerModal, KotowazaModal, CounterTrainerModal)
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedChecks = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  passedChecks++;
  console.log(`✅ PASS [${passedChecks}/${totalChecks}]: ${message}`);
}

console.log('🥋 [SIKLUS III PASS 4] Starting Dojo Specialty & Cultural Modals Verification...\n');

// ---------------------------------------------------------------------
// Check 1: KanaChartModal.tsx (Irasutoya JLPT N5, Lift, High-contrast tokens)
// ---------------------------------------------------------------------
const kanaPath = path.resolve(__dirname, '../src/components/kana/KanaChartModal.tsx');
const kanaCode = fs.readFileSync(kanaPath, 'utf8');

assert(
  kanaCode.includes('import { IrasutoyaImage }') &&
  kanaCode.includes('assetId="jlpt_n5"') &&
  kanaCode.includes('card-interactive-lift') &&
  kanaCode.includes('group-hover:text-amber-800 dark:group-hover:text-amber-300 font-bold') &&
  kanaCode.includes('text-amber-800 dark:text-amber-300 font-bold'),
  'KanaChartModal embeds Irasutoya jlpt_n5 avatar, card-interactive-lift on tiles, and WCAG AA contrast tokens'
);

// ---------------------------------------------------------------------
// Check 2: KanjiStrokeModal.tsx (Irasutoya Sensei, Touch Target, WCAG Contrast)
// ---------------------------------------------------------------------
const kanjiPath = path.resolve(__dirname, '../src/components/kanji/KanjiStrokeModal.tsx');
const kanjiCode = fs.readFileSync(kanjiPath, 'utf8');

assert(
  kanjiCode.includes('import { IrasutoyaImage }') &&
  kanjiCode.includes('assetId="sensei_teaching"') &&
  kanjiCode.includes('text-emerald-800 dark:text-emerald-400 font-bold') &&
  kanjiCode.includes('text-amber-800 dark:text-amber-400 font-bold') &&
  kanjiCode.includes('min-h-[44px]'),
  'KanjiStrokeModal integrates Irasutoya Sensei, min-h-[44px] Ask Sensei touch cushion, and WCAG AA badges'
);

// ---------------------------------------------------------------------
// Check 3: KeigoTrainerModal.tsx (Irasutoya Ojigi, Guidance Banner Contrast, Lift)
// ---------------------------------------------------------------------
const keigoPath = path.resolve(__dirname, '../src/components/keigo/KeigoTrainerModal.tsx');
const keigoCode = fs.readFileSync(keigoPath, 'utf8');

assert(
  keigoCode.includes('import { IrasutoyaImage }') &&
  keigoCode.includes('assetId="sensei_ojigi"') &&
  keigoCode.includes('card-interactive-lift') &&
  keigoCode.includes('text-indigo-800 dark:text-indigo-300') &&
  keigoCode.includes('text-amber-800 dark:text-amber-300 font-bold') &&
  keigoCode.includes('text-cyan-800 dark:text-cyan-300 font-bold'),
  'KeigoTrainerModal embeds Irasutoya sensei_ojigi etiquette anchor, card-interactive-lift, and dual-theme contrast tokens'
);

// ---------------------------------------------------------------------
// Check 4: KotowazaModal.tsx (Irasutoya Tatami, Dynamic Count, Card Lift)
// ---------------------------------------------------------------------
const kotowazaPath = path.resolve(__dirname, '../src/components/kotowaza/KotowazaModal.tsx');
const kotowazaCode = fs.readFileSync(kotowazaPath, 'utf8');

assert(
  kotowazaCode.includes('import { IrasutoyaImage }') &&
  kotowazaCode.includes('assetId="zen_tatami"') &&
  kotowazaCode.includes('card-interactive-lift') &&
  kotowazaCode.includes('{KOTOWAZA_LIST.length} peribahasa') &&
  !kotowazaCode.includes('dari 52 peribahasa'),
  'KotowazaModal integrates Irasutoya zen_tatami, card-interactive-lift, and dynamic proverb collection counter'
);

// ---------------------------------------------------------------------
// Check 5: CounterTrainerModal.tsx (Irasutoya Senpai, Hanko Stamp, Lift, WCAG Contrast)
// ---------------------------------------------------------------------
const counterPath = path.resolve(__dirname, '../src/components/counters/CounterTrainerModal.tsx');
const counterCode = fs.readFileSync(counterPath, 'utf8');

assert(
  counterCode.includes('import { IrasutoyaImage }') &&
  counterCode.includes('assetId="senpai_studying"') &&
  counterCode.includes('assetId="hanko_excellent"') &&
  counterCode.includes('card-interactive-lift') &&
  counterCode.includes('text-emerald-800 dark:text-emerald-300 font-bold') &&
  counterCode.includes('text-rose-800 dark:text-rose-300 font-bold'),
  'CounterTrainerModal embeds Irasutoya senpai, Hanko stamp celebration, card-interactive-lift, and WCAG AA quiz feedback'
);

console.log('\n🏆 [SIKLUS III PASS 4] All 5/5 Dojo Specialty & Cultural Modals Checks PASSED 100% GREEN!\n');
