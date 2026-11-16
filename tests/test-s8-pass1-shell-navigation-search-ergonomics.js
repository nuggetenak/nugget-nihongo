// ══════════════════════════════════════════════════════════════════
//  test-s8-pass1-shell-navigation-search-ergonomics.js
//  Siklus VIII Pass 1 (Sprint 47): UI Shell, Viewport Ergonomics, Navigation & Search
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 188: Siklus VIII Pass 1 (Sprint 47): UI Shell, Navigation, Search & Viewport Ergonomics...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: BottomNav 5-Tab Architecture & Immersion Shield ────────
console.log('  Check 47.1: Verifying BottomNav 5-tab architecture & immersion shield...');
const bottomNavPath = path.join(ROOT, 'src', 'components', 'layout', 'BottomNav.tsx');
assert(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

assert(
  bottomNavContent.includes("id: 'home'") &&
  bottomNavContent.includes("id: 'kebun'") &&
  bottomNavContent.includes("id: 'materi'") &&
  bottomNavContent.includes("id: 'sensei'") &&
  bottomNavContent.includes("id: 'settings'"),
  'BottomNav must declare all 5 sovereign mobile tabs (home, kebun, materi, sensei, settings)'
);

assert(
  bottomNavContent.includes("activeTab === 'study'") &&
  bottomNavContent.includes('hasActiveCbt') &&
  bottomNavContent.includes('return null;'),
  'BottomNav must enforce immersion shield during study mode and active CBT exam sets'
);

assert(
  bottomNavContent.includes('safeCards = cards && typeof cards === \'object\' ? cards : {}') &&
  bottomNavContent.includes('getFSRSDueCount(safeCards)'),
  'BottomNav must defensively guard cards object for live FSRS due badge calculation'
);
console.log('  ✅ Check 47.1 passed: BottomNav 5-tab and immersion shield verified.');

// ── Check 2: Header Multi-Track Switcher & Desktop ⌘K Search ───────
console.log('  Check 47.2: Verifying Header multi-track switcher & universal search...');
const headerPath = path.join(ROOT, 'src', 'components', 'layout', 'Header.tsx');
assert(fs.existsSync(headerPath), 'Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert(
  headerContent.includes('isTrackPickerOpen') &&
  headerContent.includes('jlptList') &&
  headerContent.includes('sswList') &&
  headerContent.includes('jftList') &&
  headerContent.includes('bookList'),
  'Header must support track switcher covering JLPT, SSW, JFT, and Textbook curriculum categories'
);

assert(
  headerContent.includes('openModal(\'badges\')') &&
  headerContent.includes('Flame') &&
  headerContent.includes('Zap'),
  'Header must link Streak & XP pill to achievement badges modal'
);

assert(
  headerContent.includes('QuickActionSheet') &&
  headerContent.includes('isQuickActionsOpen'),
  'Header must integrate QuickActionSheet for consolidated secondary utilities'
);
console.log('  ✅ Check 47.2 passed: Header track switcher and search integration verified.');

// ── Check 3: Sidebar Desktop Navigation Rail & Quick Utility Bar ───
console.log('  Check 47.3: Verifying Sidebar 260px desktop rail & quick utilities...');
const sidebarPath = path.join(ROOT, 'src', 'components', 'layout', 'Sidebar.tsx');
assert(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

assert(
  sidebarContent.includes('w-[260px]') &&
  sidebarContent.includes('h-screen fixed left-0 top-0'),
  'Sidebar must maintain fixed 260px desktop navigation rail'
);

assert(
  sidebarContent.includes('openKotowaza') &&
  sidebarContent.includes('openPatchNotes') &&
  sidebarContent.includes('toggleTheme') &&
  sidebarContent.includes('setShowFurigana'),
  'Sidebar must provide 1-click access to Kotowaza, PatchNotes, Theme toggle, and Furigana switch'
);
console.log('  ✅ Check 47.3 passed: Sidebar desktop rail and quick utilities verified.');

// ── Check 4: MobileDrawer Slide-Over & Gesture Dismissal ───────────
console.log('  Check 47.4: Verifying MobileDrawer gesture dismissal & control center...');
const drawerPath = path.join(ROOT, 'src', 'components', 'layout', 'MobileDrawer.tsx');
assert(fs.existsSync(drawerPath), 'MobileDrawer.tsx must exist');
const drawerContent = fs.readFileSync(drawerPath, 'utf8');

assert(
  drawerContent.includes('deltaX < -50') &&
  drawerContent.includes('onClose()'),
  'MobileDrawer must support touch swipe-left gesture dismissal'
);

assert(
  drawerContent.includes('useFocusTrap') &&
  drawerContent.includes('useBodyScrollLock'),
  'MobileDrawer must trap keyboard focus and lock body scrolling when open'
);

assert(
  drawerContent.includes('openCatPlacement') &&
  drawerContent.includes('openKotowaza') &&
  drawerContent.includes('openToolbox'),
  'MobileDrawer must provide direct triggers for CAT placement, Kotowaza, and Study Toolbox'
);
console.log('  ✅ Check 47.4 passed: MobileDrawer gesture dismissal and control center verified.');

// ── Check 5: SearchPalette LocalStorage Sanitation & FSRS Math Safety ──
console.log('  Check 47.5: Verifying SearchPalette recent searches & math.ts getFSRSDueCount safety...');
const searchPath = path.join(ROOT, 'src', 'components', 'ui', 'SearchPalette.tsx');
assert(fs.existsSync(searchPath), 'SearchPalette.tsx must exist');
const searchContent = fs.readFileSync(searchPath, 'utf8');

assert(
  searchContent.includes('Array.isArray(parsed)') &&
  searchContent.includes('safeRecent = Array.isArray(recentSearches)') &&
  searchContent.includes('Array.isArray(filteredVocab)'),
  'SearchPalette must sanitize localStorage recent searches and results arrays against non-array corruptions'
);

const mathPath = path.join(ROOT, 'src', 'lib', 'fsrs', 'math.ts');
assert(fs.existsSync(mathPath), 'math.ts must exist');
const mathContent = fs.readFileSync(mathPath, 'utf8');

assert(
  mathContent.includes('safeMap = cardsMap && typeof cardsMap === \'object\' ? cardsMap : {}'),
  'math.ts getFSRSDueCount must defensively sanitize cardsMap against non-object inputs'
);
console.log('  ✅ Check 47.5 passed: SearchPalette sanitation and getFSRSDueCount safety verified.');

console.log('\n🎉 Suite 188 (Siklus VIII Pass 1: UI Shell, Navigation, Search & Viewport Ergonomics) PASSED (5/5 checks 100% GREEN)!\n');
process.exit(0);
