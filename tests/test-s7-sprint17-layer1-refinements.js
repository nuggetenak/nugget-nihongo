// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint17-layer1-refinements.js
//  Suite 158: Comprehensive Verification of Lapisan 1 Refinements
//  (UI Shell & Navigasi Global)
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Suite 158: Lapisan 1 UI Shell & Navigasi Global Refinements...');

// ── Contract 1: Header.tsx Mobile Search, Safe-Area Top & Interactive Pill ──
const headerPath = path.join(rootDir, 'src', 'components', 'layout', 'Header.tsx');
assert.ok(fs.existsSync(headerPath), 'Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert.ok(
  headerContent.includes('pt-[calc(0.5rem+env(safe-area-inset-top))]'),
  'Header.tsx must implement iOS safe-area-inset-top padding'
);
assert.ok(
  headerContent.includes('onOpenSearch') && headerContent.includes('sm:hidden min-w-[40px]'),
  'Header.tsx mobile center anchor must provide instant search button trigger'
);
assert.ok(
  headerContent.includes("openModal('badges')"),
  'Header.tsx streak/XP pill must be an interactive button opening badges modal'
);
assert.ok(
  headerContent.includes("trk.status === 'soon'"),
  "Header.tsx track switcher must guard against 'soon' status tracks"
);

// ── Contract 2: SearchPalette.tsx Keyboard Navigation & Footer Hints ────────
const searchPalettePath = path.join(rootDir, 'src', 'components', 'ui', 'SearchPalette.tsx');
assert.ok(fs.existsSync(searchPalettePath), 'SearchPalette.tsx must exist');
const searchPaletteContent = fs.readFileSync(searchPalettePath, 'utf8');

assert.ok(
  searchPaletteContent.includes('selectedIndex') && searchPaletteContent.includes('combinedResults'),
  'SearchPalette.tsx must maintain selectedIndex and combinedResults state'
);
assert.ok(
  searchPaletteContent.includes("'ArrowDown'") && searchPaletteContent.includes("'ArrowUp'"),
  'SearchPalette.tsx must handle ArrowDown and ArrowUp keyboard navigation'
);
assert.ok(
  searchPaletteContent.includes("'Enter'"),
  'SearchPalette.tsx must handle Enter key to select active item'
);
assert.ok(
  searchPaletteContent.includes('ring-2 ring-amber-500 bg-amber-500/15'),
  'SearchPalette.tsx must visually highlight the active item at selectedIndex'
);
assert.ok(
  searchPaletteContent.includes('↑↓ Navigasi') || searchPaletteContent.includes('↵ Pilih'),
  'SearchPalette.tsx footer must include keyboard navigation hints'
);

// ── Contract 3: BottomNav.tsx Immersion Shield & Due Review Badge ───────────
const bottomNavPath = path.join(rootDir, 'src', 'components', 'layout', 'BottomNav.tsx');
assert.ok(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

assert.ok(
  bottomNavContent.includes('LEGACY_NAV_CONTRACT'),
  'BottomNav.tsx must preserve LEGACY_NAV_CONTRACT backward compatibility schema'
);
assert.ok(
  bottomNavContent.includes('BookOpen'),
  'BottomNav.tsx must retain BookOpen icon for Dojo per User Explicit Decision #2'
);
assert.ok(
  bottomNavContent.includes('hasActiveCbt') && bottomNavContent.includes('activeTab === \'choukai\''),
  'BottomNav.tsx must implement CBT & Choukai Immersion Shield to hide BottomNav during timed sessions'
);
assert.ok(
  bottomNavContent.includes('getFSRSDueCount') && bottomNavContent.includes('dueCount'),
  'BottomNav.tsx must calculate and render due count badge on Ulas tab'
);

// ── Contract 4: MobileDrawer.tsx Harmonized Labels & Touch Swipe-to-Close ───
const mobileDrawerPath = path.join(rootDir, 'src', 'components', 'layout', 'MobileDrawer.tsx');
assert.ok(fs.existsSync(mobileDrawerPath), 'MobileDrawer.tsx must exist');
const mobileDrawerContent = fs.readFileSync(mobileDrawerPath, 'utf8');

assert.ok(
  mobileDrawerContent.includes("label: 'Belajar'"),
  "MobileDrawer.tsx must use harmonized 'Belajar' label"
);
assert.ok(
  mobileDrawerContent.includes("label: 'Profil & Pengaturan'"),
  "MobileDrawer.tsx must use harmonized 'Profil & Pengaturan' label"
);
assert.ok(
  mobileDrawerContent.includes('onTouchStart') && mobileDrawerContent.includes('onTouchEnd'),
  'MobileDrawer.tsx must implement touch swipe-to-close gesture handling'
);

// ── Contract 5: navigation.ts Per-Tab Scroll Memory & View Transitions ──────
const navigationPath = path.join(rootDir, 'src', 'lib', 'ui', 'navigation.ts');
assert.ok(fs.existsSync(navigationPath), 'navigation.ts must exist');
const navigationContent = fs.readFileSync(navigationPath, 'utf8');

assert.ok(
  navigationContent.includes('tabScrollMemory') && navigationContent.includes('getTabScrollMemory'),
  'navigation.ts must export tabScrollMemory management functions'
);
assert.ok(
  navigationContent.includes('transitionTabChange'),
  'navigation.ts must export transitionTabChange'
);

// ── Contract 6: App.tsx Clean ROUTE_ALIAS_MAP & Per-Tab Scroll Restoration ──
const appPath = path.join(rootDir, 'src', 'App.tsx');
assert.ok(fs.existsSync(appPath), 'App.tsx must exist');
const appContent = fs.readFileSync(appPath, 'utf8');

assert.ok(
  appContent.includes('ROUTE_ALIAS_MAP'),
  'App.tsx must use clean ROUTE_ALIAS_MAP lookup table for routing'
);
assert.ok(
  appContent.includes('getTabScrollMemory(activeTab)'),
  'App.tsx must restore per-tab scroll position on tab switch'
);

// ── Contract 7: UpdatePromptToast.tsx Anti-Collision Coordinates ────────────
const updatePromptPath = path.join(rootDir, 'src', 'components', 'ui', 'UpdatePromptToast.tsx');
assert.ok(fs.existsSync(updatePromptPath), 'UpdatePromptToast.tsx must exist');
const updatePromptContent = fs.readFileSync(updatePromptPath, 'utf8');

assert.ok(
  updatePromptContent.includes('bottom-[calc(5.5rem+env(safe-area-inset-bottom))]'),
  'UpdatePromptToast.tsx must be cushioned at bottom right to avoid colliding with top OfflineBanner'
);

// ── Contract 8: GlobalModalManager.tsx Single Backdrop & Anti-Blackout Guard ─
const modalManagerPath = path.join(rootDir, 'src', 'components', 'modals', 'GlobalModalManager.tsx');
assert.ok(fs.existsSync(modalManagerPath), 'GlobalModalManager.tsx must exist');
const modalManagerContent = fs.readFileSync(modalManagerPath, 'utf8');

assert.ok(
  modalManagerContent.includes("isTop ? 'contents' : 'hidden'"),
  'GlobalModalManager.tsx must suppress underlying modal backdrops via display:none (contents/hidden) to prevent 96% blackout bug'
);

// ── Contract 9: index.css Anti-Layout Shift & Touch Highlight Styling ───────
const indexCssPath = path.join(rootDir, 'src', 'index.css');
assert.ok(fs.existsSync(indexCssPath), 'index.css must exist');
const indexCssContent = fs.readFileSync(indexCssPath, 'utf8');

assert.ok(
  indexCssContent.includes('scrollbar-gutter: stable'),
  'index.css must declare scrollbar-gutter: stable'
);
assert.ok(
  indexCssContent.includes('-webkit-tap-highlight-color: transparent'),
  'index.css must eliminate mobile grey tap flash via -webkit-tap-highlight-color: transparent'
);
assert.ok(
  indexCssContent.includes('overscroll-behavior-y: contain'),
  'index.css must contain pull-to-refresh overscroll bounce'
);

// ── Contract 10: Sidebar.tsx Brand Button, Vertical Active Bar & Quick Utilities ──
const sidebarPath = path.join(rootDir, 'src', 'components', 'layout', 'Sidebar.tsx');
assert.ok(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

assert.ok(
  sidebarContent.includes("setActiveTab('home')") && sidebarContent.includes("scrollTo({ top: 0, behavior: 'smooth' })"),
  'Sidebar.tsx Brand Header must be an interactive button scrolling to top'
);
assert.ok(
  sidebarContent.includes('before:absolute before:left-0'),
  'Sidebar.tsx must render vertical active bar indicator'
);
assert.ok(
  sidebarContent.includes('toggleTheme') && sidebarContent.includes('setShowFurigana'),
  'Sidebar.tsx must provide desktop quick utility bar for theme and furigana'
);

// ── Contract 11: MobileDrawer.tsx A11y Focus Trap, Scroll Lock & Control Center ─
assert.ok(
  mobileDrawerContent.includes('useFocusTrap') && mobileDrawerContent.includes('useBodyScrollLock'),
  'MobileDrawer.tsx must integrate useFocusTrap and useBodyScrollLock'
);
assert.ok(
  mobileDrawerContent.includes('/icons/icon-192.png'),
  'MobileDrawer.tsx must use lightweight icon-192.png instead of bloated logo.png'
);
assert.ok(
  mobileDrawerContent.includes('toggleTheme') && mobileDrawerContent.includes('setSoundEffects'),
  'MobileDrawer.tsx must provide Quick Control Center (Theme & Sound SFX)'
);

// ── Contract 12: SearchPalette.tsx RubyText, Level Filtering & Recent Searches ──
assert.ok(
  searchPaletteContent.includes('RubyText'),
  'SearchPalette.tsx must render RubyText furigana typography'
);
assert.ok(
  searchPaletteContent.includes('levelFilter') && searchPaletteContent.includes('setLevelFilter'),
  'SearchPalette.tsx must provide level filter pills'
);
assert.ok(
  searchPaletteContent.includes('nn_recent_searches') && searchPaletteContent.includes('recentSearches'),
  'SearchPalette.tsx must persist and surface recent searches'
);

// ── Contract 13: QuickActionSheet.tsx Focus Trap & Suasana Belajar ───────────
const quickSheetPath = path.join(rootDir, 'src', 'components', 'layout', 'QuickActionSheet.tsx');
assert.ok(fs.existsSync(quickSheetPath), 'QuickActionSheet.tsx must exist');
const quickSheetContent = fs.readFileSync(quickSheetPath, 'utf8');

assert.ok(
  quickSheetContent.includes('useFocusTrap'),
  'QuickActionSheet.tsx must integrate useFocusTrap'
);
assert.ok(
  quickSheetContent.includes('Suasana Belajar') && quickSheetContent.includes('toggleTheme'),
  'QuickActionSheet.tsx must provide Suasana Belajar section with Theme & Audio toggles'
);

// ── Contract 14: ContextualSenseiSheet & WordLookupSheet Focus Trapping ───────
const senseiSheetPath = path.join(rootDir, 'src', 'components', 'sensei', 'ContextualSenseiSheet.tsx');
assert.ok(fs.existsSync(senseiSheetPath), 'ContextualSenseiSheet.tsx must exist');
const senseiSheetContent = fs.readFileSync(senseiSheetPath, 'utf8');

assert.ok(
  senseiSheetContent.includes('useFocusTrap'),
  'ContextualSenseiSheet.tsx must integrate useFocusTrap'
);
assert.ok(
  senseiSheetContent.includes('pb-[calc(1rem+env(safe-area-inset-bottom))]'),
  'ContextualSenseiSheet.tsx must cushion action buttons against safe-area-inset-bottom'
);

const lookupSheetPath = path.join(rootDir, 'src', 'components', 'modals', 'WordLookupSheet.tsx');
assert.ok(fs.existsSync(lookupSheetPath), 'WordLookupSheet.tsx must exist');
const lookupSheetContent = fs.readFileSync(lookupSheetPath, 'utf8');

assert.ok(
  lookupSheetContent.includes('useFocusTrap') && lookupSheetContent.includes('useBodyScrollLock'),
  'WordLookupSheet.tsx must integrate useFocusTrap and useBodyScrollLock'
);

// ── Contract 15: Modal Backdrop Click Dismissals & Scroll Lock Integrity ────
const communityModalPath = path.join(rootDir, 'src', 'components', 'community', 'CommunityHubModal.tsx');
assert.ok(fs.existsSync(communityModalPath), 'CommunityHubModal.tsx must exist');
const communityModalContent = fs.readFileSync(communityModalPath, 'utf8');

assert.ok(
  communityModalContent.includes('onClick={onClose}') && communityModalContent.includes('e.stopPropagation()'),
  'CommunityHubModal.tsx must dismiss on backdrop click with stopPropagation on card'
);

const installModalPath = path.join(rootDir, 'src', 'components', 'ui', 'InstallModal.tsx');
assert.ok(fs.existsSync(installModalPath), 'InstallModal.tsx must exist');
const installModalContent = fs.readFileSync(installModalPath, 'utf8');

assert.ok(
  installModalContent.includes('onClick={handleClose}') && installModalContent.includes('e.stopPropagation()'),
  'InstallModal.tsx must dismiss on backdrop click with stopPropagation on card'
);

const patchNotesPath = path.join(rootDir, 'src', 'components', 'ui', 'PatchNotesModal.tsx');
assert.ok(fs.existsSync(patchNotesPath), 'PatchNotesModal.tsx must exist');
const patchNotesContent = fs.readFileSync(patchNotesPath, 'utf8');

assert.ok(
  patchNotesContent.includes('useBodyScrollLock(isOpen)'),
  'PatchNotesModal.tsx must use useBodyScrollLock instead of direct document.body manipulation'
);

// ── Contract 16: DetailModal.tsx Scroll Trap Removal & TTS Sanitization ─────
const detailModalPath = path.join(rootDir, 'src', 'components', 'ui', 'DetailModal.tsx');
assert.ok(fs.existsSync(detailModalPath), 'DetailModal.tsx must exist');
const detailModalContent = fs.readFileSync(detailModalPath, 'utf8');

assert.ok(
  !detailModalContent.includes('max-h-48 overflow-y-auto'),
  'DetailModal.tsx must eliminate nested scroll trap container on examples list'
);
assert.ok(
  detailModalContent.includes('.replace(/<[^>]+>/g, \'\')'),
  'DetailModal.tsx must sanitize raw tags before passing example sentence to speakJapanese'
);

// ── Contract 17: App.tsx Hotkey T, Dynamic Document Title & WCAG Skip Link ──
assert.ok(
  appContent.includes("e.key.toLowerCase() === 't'"),
  'App.tsx must register hotkey T for quick theme toggle'
);
assert.ok(
  appContent.includes('document.title = `${pageTitle} · Nugget Nihongo`'),
  'App.tsx must dynamically update document.title on tab change'
);
assert.ok(
  appContent.includes('focus:bg-amber-600 focus:text-white dark:focus:bg-amber-500 dark:focus:text-stone-950 font-black'),
  'App.tsx must render WCAG AAA high-contrast skip-to-content focus styling'
);

// ── Contract 18: Toast.tsx Adaptive Cushion & PageSkeleton max-w-7xl ────────
const toastPath = path.join(rootDir, 'src', 'components', 'ui', 'Toast.tsx');
assert.ok(fs.existsSync(toastPath), 'Toast.tsx must exist');
const toastContent = fs.readFileSync(toastPath, 'utf8');

assert.ok(
  toastContent.includes('line-clamp-2') && toastContent.includes('isImmersionMode'),
  'Toast.tsx must implement line-clamp-2 and adaptive bottom cushion during immersion mode'
);

const skeletonPath = path.join(rootDir, 'src', 'components', 'ui', 'PageSkeleton.tsx');
assert.ok(fs.existsSync(skeletonPath), 'PageSkeleton.tsx must exist');
const skeletonContent = fs.readFileSync(skeletonPath, 'utf8');

assert.ok(
  skeletonContent.includes('max-w-7xl'),
  'PageSkeleton.tsx must align with max-w-7xl to eliminate cumulative layout shift (Zero CLS)'
);

console.log('✅ Suite 158: All 18 Lapisan 1 architectural contracts PASSED perfectly!');
