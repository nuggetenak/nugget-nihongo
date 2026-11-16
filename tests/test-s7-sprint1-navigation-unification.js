// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint1-navigation-unification.js
//  Sprint 1 Verification Suite: Navigation Identity & Nomenclature Unification
//  - Unifies Drawer, Sidebar, and BottomNav to single "Dojo (Sasana Latihan & Ujian)"
//  - Eradicates fragmented "Materi Hub" & "Arena Kuis" labels
//  - Enforces Universal Multi-Device Touch Ergonomics (>= 44px, active:scale-95)
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SPRINT 1: NAVIGATION IDENTITY & NOMENCLATURE UNIFICATION       ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: MobileDrawer Identity Unification ───────────────────────
console.log('▶ Check 1: MobileDrawer Identity Unification...');
const drawerPath = path.join(ROOT_DIR, 'src', 'components', 'layout', 'MobileDrawer.tsx');
assert(fs.existsSync(drawerPath), 'MobileDrawer.tsx must exist');
const drawerContent = fs.readFileSync(drawerPath, 'utf8');

// Must feature unified Dojo
assert(
  drawerContent.includes("label: 'Dojo (Sasana Latihan & Ujian)'"),
  'MobileDrawer must feature unified "Dojo (Sasana Latihan & Ujian)" label'
);
assert(
  drawerContent.includes("badge: '4 Pilar'"),
  'MobileDrawer must feature "4 Pilar" badge for Dojo'
);

// Must NOT contain fragmented labels
assert(
  !drawerContent.includes("label: 'Arena Kuis'"),
  'MobileDrawer must NOT contain separate "Arena Kuis" navigation label'
);
assert(
  !drawerContent.includes("label: 'Materi Hub'"),
  'MobileDrawer must NOT contain separate "Materi Hub" navigation label'
);

// Ergonomics
assert(
  drawerContent.includes('min-h-[44px]'),
  'MobileDrawer navigation buttons must guarantee min-h-[44px] touch targets'
);
assert(
  drawerContent.includes('active:scale-95'),
  'MobileDrawer buttons must provide active:scale-95 tactile feedback'
);

console.log('  ✔ [PASS] MobileDrawer identity unified to Dojo (4 Pilar) with zero disconnect.');

// ── Check 2: Sidebar Desktop Identity Unification ────────────────────
console.log('\n▶ Check 2: Sidebar Desktop Identity Unification...');
const sidebarPath = path.join(ROOT_DIR, 'src', 'components', 'layout', 'Sidebar.tsx');
assert(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

// Must feature unified Dojo
assert(
  sidebarContent.includes("label: 'Dojo (Sasana Latihan & Ujian)'"),
  'Sidebar must feature unified "Dojo (Sasana Latihan & Ujian)" label'
);
assert(
  sidebarContent.includes("badge: '4 Pilar'"),
  'Sidebar must feature "4 Pilar" badge for Dojo'
);

// Must NOT contain fragmented labels
assert(
  !sidebarContent.includes("label: 'Arena Kuis'"),
  'Sidebar must NOT contain separate "Arena Kuis" navigation label'
);
assert(
  !sidebarContent.includes("label: 'Dojo & Pustaka'"),
  'Sidebar must NOT contain redundant "Dojo & Pustaka" label'
);

console.log('  ✔ [PASS] Sidebar desktop navigation unified to Dojo (4 Pilar).');

// ── Check 3: BottomNav Synchronization & Active State ────────────────
console.log('\n▶ Check 3: BottomNav Synchronization & Active State...');
const bottomNavPath = path.join(ROOT_DIR, 'src', 'components', 'layout', 'BottomNav.tsx');
assert(fs.existsSync(bottomNavPath), 'BottomNav.tsx must exist');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

assert(
  bottomNavContent.includes("label: 'Dojo'") && bottomNavContent.includes("id: 'materi'"),
  'BottomNav must feature Dojo as Tab 3 pointing to id: "materi"'
);
assert(
  bottomNavContent.includes("activeTab === 'materi' || activeTab === 'choukai' || activeTab === 'quiz'"),
  'BottomNav Dojo tab must remain active for all Dojo sub-modes (materi, choukai, quiz)'
);

console.log('  ✔ [PASS] BottomNav synchronized with Dojo tab identity.');

// ── Check 4: Transition Tab Change Integration ───────────────────────
console.log('\n▶ Check 4: View Transition Compatibility across Navigation Shells...');
assert(
  drawerContent.includes('transitionTabChange'),
  'MobileDrawer must execute transitionTabChange for smooth view transitions'
);
assert(
  sidebarContent.includes('transitionTabChange'),
  'Sidebar must execute transitionTabChange for smooth view transitions'
);
assert(
  bottomNavContent.includes('transitionTabChange'),
  'BottomNav must execute transitionTabChange for smooth view transitions'
);

console.log('  ✔ [PASS] View transition compatibility verified across all navigation shells.');

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('🎉 SPRINT 1: NAVIGATION NOMENCLATURE UNIFICATION 100% VERIFIED GREEN!');
console.log('══════════════════════════════════════════════════════════════════\n');
process.exit(0);
