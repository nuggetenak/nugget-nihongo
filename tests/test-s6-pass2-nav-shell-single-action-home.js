// ══════════════════════════════════════════════════════════════════
//  test-s6-pass2-nav-shell-single-action-home.js — Siklus VI Pass 2 Test Suite
//  Navigation Shell Declutter & Single-Action Sovereign Home Assurance
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

console.log('🧪 [Siklus VI — Pass 2] Testing Nav Shell Declutter & Single-Action Sovereign Home...\n');

let passCount = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 2.1: BottomNav.tsx 5 Sovereign Tabs & Indonesian-First Labels
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.1: BottomNav 5-tab sovereign architecture and Indonesian-first labels');

const bottomNavPath = path.join(ROOT, 'src/components/layout/BottomNav.tsx');
assert(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

// Ensure 'Ulas' replaced 'Review'
assert(bottomNavContent.includes("label: 'Ulas'"), "BottomNav must use Indonesian label 'Ulas' instead of English 'Review'");
// Ensure 'Akun' is restored to Tab 5
assert(bottomNavContent.includes("label: 'Akun'"), "BottomNav must feature 'Akun' in 5-tab mobile navigation");
assert(bottomNavContent.includes("id: 'settings'"), "BottomNav must route Tab 5 to settings (Akun)");

// Ensure Kuis is unified under Dojo
assert(bottomNavContent.includes("activeTab === 'materi' || activeTab === 'choukai' || activeTab === 'quiz'"), "Dojo tab must represent materi, choukai, and quiz activities");

// Backward-compatibility: LEGACY_NAV_CONTRACT must be present
assert(bottomNavContent.includes('LEGACY_NAV_CONTRACT'), 'Must preserve LEGACY_NAV_CONTRACT for historical regression tests');

console.log('    ✓ Check 2.1 Passed: BottomNav enforces 5 sovereign tabs (Belajar, Ulas, Dojo, Sensei, Akun).');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.2: Header.tsx Mobile 3-Anchor Layout & Clutter Eradication
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.2: Header 3-anchor mobile ergonomics');

const headerPath = path.join(ROOT, 'src/components/layout/Header.tsx');
assert(fs.existsSync(headerPath), 'Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');

// Mobile Center Sensei Mascot
assert(headerContent.includes('src="/assets/illustrations/sensei-welcome.svg"'), 'Header must render Sensei avatar shortcut on mobile');
assert(headerContent.includes("setActiveTab('sensei')"), 'Header Sensei avatar must link directly to Sensei AI');

// Sliders and Profile avatar hidden on mobile (handled by BottomNav Tab 5)
assert(headerContent.includes('hidden sm:flex min-w-[40px] min-h-[40px] p-2 rounded-full bg-surface-2') ||
       headerContent.includes('hidden sm:flex'), 'Secondary sliders trigger must not crowd mobile 360px bar');

// High-contrast streak tokens preserved
assert(headerContent.includes('text-amber-800 dark:text-amber-400'), 'Streak counter must preserve WCAG AA amber contrast');

console.log('    ✓ Check 2.2 Passed: Header enforces clean 3-anchor mobile bar without 6-button crowding.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.3: HomePage.tsx Humanized Jargon & Anti-Alienation
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.3: HomePage humanized language and linguistic jargon purging');

const homePath = path.join(ROOT, 'src/pages/HomePage.tsx');
assert(fs.existsSync(homePath), 'HomePage.tsx must exist');
const homeContent = fs.readFileSync(homePath, 'utf8');

// Humanized Due count
assert(homeContent.includes('Kata Perlu Diulas'), "HomePage must render friendly Indonesian 'Kata Perlu Diulas'");

// Humanized L1 notes heading
assert(homeContent.includes('Tips Bahasa (Waspada Pola Bahasa Indonesia)'), "HomePage must humanize L1 notes into warm Indonesian advice");

console.log('    ✓ Check 2.3 Passed: Cold linguistic jargon purged in favor of empathetic Indonesian phrasing.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.4: HomePage.tsx Anti-Spam (4x CAT Placement Test Purged)
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.4: Elimination of redundant CAT placement test spam');

// In Target Harian & Momentum: Uji CAT was replaced with Dojo Latihan
assert(!homeContent.includes('<span>Uji CAT</span>\n              <ArrowRight className="w-4 h-4 shrink-0" />'), 'HomePage must not spam CAT test in Target Harian card');
assert(homeContent.includes('<span>Latihan Dojo</span>'), 'HomePage Target Harian card must promote daily Dojo practice');

// Under Heatmap: CAT button was replaced with detail statistics
assert(!homeContent.includes('<span>Tes Kemampuan CAT →</span>'), 'HomePage must not spam CAT test under 49-day heatmap');
assert(homeContent.includes('<span>Lihat Detail Statistik →</span>'), 'HomePage must offer calm link to detail statistics');

console.log('    ✓ Check 2.4 Passed: Redundant CAT test spam successfully purged from daily learning flow.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.5: Zero-Regression Core Home & Navigation Contracts
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.5: Zero-regression core home contracts');

assert(homeContent.includes('todayXP === 0'), 'Preserves todayXP === 0 contract');
assert(homeContent.includes('Langkah Pertama ('), 'Preserves Langkah Pertama contract');
assert(homeContent.includes('Target Selesai ('), 'Preserves Target Selesai contract');
assert(homeContent.includes('Momentum ('), 'Preserves Momentum contract');
assert(homeContent.includes('今日も頑張ろう'), 'Preserves authentic kicker');
assert(homeContent.includes('Selamat Belajar 🍙'), 'Preserves Wa-Bento title');
assert(homeContent.includes('min-h-[48px]'), 'Preserves 48px touch target height');
assert(homeContent.includes('shadow-glow'), 'Preserves shadow-glow CTA elevation');
assert(homeContent.includes('active:scale-95'), 'Preserves active tactile feedback');

console.log('    ✓ Check 2.5 Passed: All historical regression contracts satisfied 100%.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Final Assessment
// ──────────────────────────────────────────────────────────────────
if (passCount === totalChecks) {
  console.log('\n🎉 [Siklus VI — Pass 2] All 5 Checks PASSED! Navigation shell & Single-Action Home verified.\n');
  process.exit(0);
} else {
  console.error(`\n❌ [Siklus VI — Pass 2] Only ${passCount}/${totalChecks} checks passed.\n`);
  process.exit(1);
}
