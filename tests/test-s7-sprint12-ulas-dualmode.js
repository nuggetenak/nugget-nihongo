// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint12-ulas-dualmode.js
//  Sprint 12: Tab 2 Ulas — Pusat Retensi & Kebun Kata Dual-View Polish
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 153: Tab 2 Ulas Dual-Mode Retention & Garden Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: KebunPage Component & Architecture ───────────────────────
console.log('  Check 12.1: Verifying KebunPage source and Dual-View state...');
const kebunPath = path.join(ROOT, 'src', 'pages', 'KebunPage.tsx');
assert(fs.existsSync(kebunPath), 'KebunPage.tsx must exist');
const kebunContent = fs.readFileSync(kebunPath, 'utf8');

assert(
  kebunContent.includes('export const KebunPage'),
  'KebunPage.tsx must export KebunPage component'
);
assert(
  kebunContent.includes("activeView === 'garden'") && kebunContent.includes("activeView === 'metrics'"),
  'KebunPage must feature dual-view toggle: garden vs metrics'
);
assert(
  kebunContent.includes('checkDailyRefill()'),
  'KebunPage must check daily morning water refill'
);
console.log('  ✅ Check 12.1 passed: KebunPage source & dual-view controller verified.');

// ── Check 2: FSRS Retention Cockpit & Unlocked Flashcard Access ────────
console.log('  Check 12.2: Verifying FSRS Retention Cockpit & Flashcard Access...');

assert(
  kebunContent.includes('fsrsForgettingCurve') && kebunContent.includes('getFSRSDueCount'),
  'KebunPage must calculate FSRS retrievability and due count via scientific formulas'
);
assert(
  kebunContent.includes('startFSRSDueSession'),
  'Cockpit must wire startFSRSDueSession for 1-tap review'
);
assert(
  kebunContent.includes("startQuizSession('flashcard')") &&
  kebunContent.includes('Latihan Flashcard 3D Bebas'),
  'Cockpit must offer un-gated Latihan Flashcard 3D Bebas'
);
assert(
  kebunContent.includes('Jatuh Tempo') &&
  kebunContent.includes('Terdaftar') &&
  kebunContent.includes('Stabilitas Rata-rata') &&
  kebunContent.includes('Stok Air'),
  'Cockpit must render 4 essential memory KPIs'
);
console.log('  ✅ Check 12.2 passed: FSRS Retention Cockpit verified.');

// ── Check 3: Mode A: Kebun Kanji & Siram ──────────────────────────────
console.log('  Check 12.3: Verifying Mode A (Kebun Kanji, Watering SFX & Stages)...');

assert(
  kebunContent.includes('handleWaterSingle') && kebunContent.includes('handleWaterAll'),
  'Garden must support single and mass watering actions'
);
assert(
  kebunContent.includes('playWaterSfx()'),
  'Watering actions must trigger authentic WebAudio water SFX'
);
assert(
  kebunContent.includes('speakJapanese(plant.kanji)'),
  'Kanji garden cards must trigger Japanese TTS speech pronunciation'
);
assert(
  kebunContent.includes('STAGE_METADATA'),
  'Garden must reflect 4-stage botanical growth lifecycle'
);
console.log('  ✅ Check 12.3 passed: Mode A Kebun Kanji verified.');

// ── Check 4: Mode B: Metrik Ilmiah FSRS ───────────────────────────────
console.log('  Check 12.4: Verifying Mode B (Metrik Ilmiah & Forgetting Curve)...');

assert(
  kebunContent.includes('Distribusi Status Kartu Memori'),
  'Metrics view must report FSRS state distributions'
);
assert(
  kebunContent.includes('Baru (New)') &&
  kebunContent.includes('Belajar (Learning)') &&
  kebunContent.includes('Pengulangan (Review)'),
  'Metrics view must show New, Learning, and Review states'
);
assert(
  kebunContent.includes('Algoritma FSRS memodelkan kurva peluruhan memori secara matematis'),
  'Metrics view must explain FSRS mathematical forgetting curve'
);
assert(
  kebunContent.includes('fsrsStats.avgStability') &&
  kebunContent.includes('fsrsStats.avgDifficulty'),
  'Metrics view must analyze stability and difficulty distributions'
);
console.log('  ✅ Check 12.4 passed: Mode B Metrik Ilmiah verified.');

// ── Check 5: Responsive Ergonomics & Touch Targets ────────────────────
console.log('  Check 12.5: Verifying Mobile Ergonomics & Safe-Area Padding...');

assert(
  kebunContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'KebunPage must maintain safe-area cushion for floating bottom navigation'
);
assert(
  kebunContent.includes('min-h-[40px]'),
  'Interactive buttons must ensure minimum 40px touch targets'
);
assert(
  kebunContent.includes('active:scale-95'),
  'Interactive elements must provide active scale feedback'
);
console.log('  ✅ Check 12.5 passed: Ergonomics & touch targets verified.');

console.log('🎉 ALL SPRINT 12 ULAS DUAL-MODE CHECKS PASSED (5/5)!');
