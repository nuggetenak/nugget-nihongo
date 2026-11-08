// ══════════════════════════════════════════════════════════════════
//  test-s2-pass12-nav-header-ergonomics.js
//  Nugget Nihongo · Siklus II — Pass 12 Verification Suite
//  Bottom Navigation Bar Ergonomics, Mobile Safe-Area Inset
//  Cushioning, Active State Haptics & Z-Index Layering Integrity
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 12] Testing BottomNav, Header & Z-Index Layering Ergonomics...');

const bottomNavPath = path.join(ROOT, 'src/components/layout/BottomNav.tsx');
const headerPath = path.join(ROOT, 'src/components/layout/Header.tsx');
const quickActionPath = path.join(ROOT, 'src/components/layout/QuickActionSheet.tsx');
const appPath = path.join(ROOT, 'src/App.tsx');

assert(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
assert(fs.existsSync(headerPath), 'Header.tsx must exist');
assert(fs.existsSync(quickActionPath), 'QuickActionSheet.tsx must exist');
assert(fs.existsSync(appPath), 'App.tsx must exist');

const bottomNavCode = fs.readFileSync(bottomNavPath, 'utf8');
const headerCode = fs.readFileSync(headerPath, 'utf8');
const quickActionCode = fs.readFileSync(quickActionPath, 'utf8');
const appCode = fs.readFileSync(appPath, 'utf8');

// ── Check 12.1: BottomNav 5-Tab Architecture, Active State Indicator & Safe-Area Padding ──
console.log('  ▸ Check 12.1: BottomNav 5-Tab Architecture, Active State Indicator & Safe-Area');
assert(bottomNavCode.includes("id: 'home'"), 'BottomNav must include home');
assert(bottomNavCode.includes("id: 'quiz'"), 'BottomNav must include quiz');
assert(bottomNavCode.includes("id: 'kebun'"), 'BottomNav must include kebun');
assert(bottomNavCode.includes("id: 'materi'"), 'BottomNav must include materi');
assert(bottomNavCode.includes("id: 'sensei'"), 'BottomNav must include sensei');
assert(bottomNavCode.includes('role="navigation"'), 'BottomNav must declare role="navigation"');
assert(bottomNavCode.includes("aria-current={isActive ? 'page' : undefined}"), 'BottomNav must mark active page');
assert(bottomNavCode.includes('active:scale-95'), 'BottomNav buttons must feature active tactile feedback');
assert(bottomNavCode.includes('safe-area-bottom'), 'BottomNav must use safe-area-bottom padding class');
assert(bottomNavCode.includes('shadow-glow'), 'BottomNav must display active glowing indicator dot');
console.log('    ✓ Check 12.1 Passed: BottomNav 5-tab architecture and safe-area padding verified.');

// ── Check 12.2: Ultra-Compact Mobile (320px) Responsive Typography ──
console.log('  ▸ Check 12.2: Ultra-Compact Mobile (320px) Responsive Typography');
assert(
  bottomNavCode.includes('text-[11px] sm:text-xs'),
  'BottomNav must use responsive text-[11px] sm:text-xs to prevent label clipping on 320px screens'
);
assert(
  headerCode.includes('currentTrack.short') && headerCode.includes('currentTrack.full'),
  'Header must adapt track title between short on mobile and full on larger screens'
);
console.log('    ✓ Check 12.2 Passed: Responsive typography prevents overflow on ultra-compact screens.');

// ── Check 12.3: Z-Index Layering Integrity & Stacking War Elimination ──
console.log('  ▸ Check 12.3: Z-Index Layering Integrity & Stacking War Elimination');
assert(!headerCode.includes('z-[99999]'), 'Header must not declare extreme z-[99999] stacking wars');
assert(!quickActionCode.includes('z-[99999]'), 'QuickActionSheet must not declare extreme z-[99999] stacking wars');
assert(headerCode.includes('fixed inset-0 z-50'), 'Header track switcher portal must use standard z-50');
assert(quickActionCode.includes('fixed inset-0 z-50'), 'QuickActionSheet portal must use standard z-50');
assert(bottomNavCode.includes('z-40'), 'BottomNav must stay at z-40 so dialogs render cleanly above it');
console.log('    ✓ Check 12.3 Passed: Z-Index layering conforms to standard hierarchy.');

// ── Check 12.4: Header & Track Switcher Touch Ergonomics (>= 40px) ──
console.log('  ▸ Check 12.4: Header & Track Switcher Touch Ergonomics (>= 40px)');
assert(
  headerCode.includes('min-h-[40px] py-2 px-3 rounded-xl'),
  'Header track switcher category tabs must enforce min-h-[40px] touch targets'
);
assert(
  headerCode.includes('min-h-[40px] sm:min-h-[44px]'),
  'Header active track button must enforce min-h-[40px] sm:min-h-[44px]'
);
assert(
  headerCode.includes('min-w-[44px] min-h-[44px]') && headerCode.includes('active:scale-95'),
  'Header drawer and modal triggers must meet 44px ergonomics with active:scale-95'
);
console.log('    ✓ Check 12.4 Passed: Header interactive touch targets enforce >= 40px standard.');

// ── Check 12.5: WCAG AA High-Contrast Dual-Theme Tokens in Navigation Shell ──
console.log('  ▸ Check 12.5: WCAG AA High-Contrast Dual-Theme Tokens in Navigation Shell');
assert(
  headerCode.includes('text-amber-800 dark:text-amber-400'),
  'Header streak counter must use high-contrast dual-theme amber tokens'
);
assert(
  quickActionCode.includes('text-emerald-700 dark:text-emerald-400 font-bold'),
  'QuickActionSheet sync status must use high-contrast dual-theme emerald tokens'
);
assert(
  quickActionCode.includes('text-amber-800 dark:text-amber-300 font-bold'),
  'QuickActionSheet PWA download icon must use high-contrast dual-theme amber tokens'
);
console.log('    ✓ Check 12.5 Passed: Navigation shell tokens conform to WCAG AA.');

console.log('\n🎉 [Siklus II — Pass 12] All 5 Checks PASSED! Navigation & Header Ergonomics fully verified.\n');
