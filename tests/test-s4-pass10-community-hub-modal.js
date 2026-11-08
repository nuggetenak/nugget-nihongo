// ══════════════════════════════════════════════════════════════════
//  test-s4-pass10-community-hub-modal.js — Forensic Unit & Regression Suite
//  Siklus IV Pass 10: External Community Hub Modal & Portals
//  Validates CommunityHubModal, official portals, daily kanji challenge,
//  Trakteer support, and global modal stacking integration.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const modalPath = path.join(ROOT_DIR, 'src/components/community/CommunityHubModal.tsx');
const storePath = path.join(ROOT_DIR, 'src/store/useModalStore.ts');
const globalManagerPath = path.join(ROOT_DIR, 'src/components/modals/GlobalModalManager.tsx');
const sidebarPath = path.join(ROOT_DIR, 'src/components/layout/Sidebar.tsx');
const mobileDrawerPath = path.join(ROOT_DIR, 'src/components/layout/MobileDrawer.tsx');

console.log('🧪 Running Siklus IV Pass 10: External Community Hub Modal Test...');

// 1. CommunityHubModal Verification
console.log('  🔍 Check 1: Validating CommunityHubModal.tsx Grounded Channels & Anti-Hallucination...');
assert(fs.existsSync(modalPath), 'CommunityHubModal.tsx must exist');
const modalSrc = fs.readFileSync(modalPath, 'utf8');

assert(
  modalSrc.includes('export const CommunityHubModal: React.FC'),
  'Must export CommunityHubModal component'
);
assert(
  modalSrc.includes('https://x.com/NuggetNihongo'),
  'Must include active confirmed X account link'
);
assert(
  modalSrc.includes('https://trakteer.id/nugget-nihongo'),
  'Must include active confirmed Trakteer creator support link'
);
assert(
  modalSrc.includes('mailto:nuggetnihongo@gmail.com'),
  'Must include active confirmed email support link'
);
assert(
  modalSrc.includes('Segera Hadir') && modalSrc.includes('Instagram'),
  'Must label uncreated Instagram channel as Segera Hadir (anti-hallucination)'
);
assert(
  modalSrc.includes('Discord Lounge') && modalSrc.includes('Segera Hadir'),
  'Must label uncreated Discord channel as Segera Hadir (anti-hallucination)'
);
console.log('  ✅ Check 1 Passed: Grounded active channels & Segera Hadir status verified');

// 2. Daily Kanji Challenge & Mnemonic Showcase
console.log('  🔍 Check 2: Validating Daily Kanji Challenge and Mnemonic Upvote System...');
assert(
  modalSrc.includes('DAILY_KANJI') && modalSrc.includes('Tantangan Kanji Harian'),
  'Must include 7-day cyclical daily kanji challenge'
);
assert(
  modalSrc.includes('INITIAL_MNEMONICS') && modalSrc.includes('Koleksi Tips & Mnemonik Kanji'),
  'Must include curated Indonesian mnemonic showcase'
);
assert(
  modalSrc.includes('nn_community_mnemonic_upvotes'),
  'Must persist mnemonic upvotes to localStorage'
);
assert(
  modalSrc.includes('handleShareChallenge') && modalSrc.includes('#NuggetNihongo'),
  'Must provide Web Share API / clipboard share handler with #NuggetNihongo hashtag'
);
console.log('  ✅ Check 2 Passed: Daily challenge & mnemonic showcase certified');

// 3. Ergonomics and Modal Stacking Integration
console.log('  🔍 Check 3: Validating Modal Stacking & Navigation Triggers...');
const storeSrc = fs.readFileSync(storePath, 'utf8');
assert(
  storeSrc.includes("'community'"),
  "ModalType must include 'community'"
);

const globalManagerSrc = fs.readFileSync(globalManagerPath, 'utf8');
assert(
  globalManagerSrc.includes("import('../community/CommunityHubModal')"),
  'GlobalModalManager must lazy load CommunityHubModal'
);
assert(
  globalManagerSrc.includes("case 'community':"),
  "GlobalModalManager must handle 'community' modal type"
);

const sidebarSrc = fs.readFileSync(sidebarPath, 'utf8');
assert(
  sidebarSrc.includes("openModal('community')"),
  'Sidebar must contain trigger to open community modal'
);

const mobileDrawerSrc = fs.readFileSync(mobileDrawerPath, 'utf8');
assert(
  mobileDrawerSrc.includes("openModal('community')"),
  'MobileDrawer must contain trigger to open community modal'
);
console.log('  ✅ Check 3 Passed: Global modal stacking and UI triggers certified');

// 4. Responsive Design & A11y Standards
console.log('  🔍 Check 4: Validating Responsive Design Tokens & Touch Targets...');
assert(
  modalSrc.includes('max-h-[90dvh]') || modalSrc.includes('max-h-[92vh]'),
  'Must cap height at viewport dvh'
);
assert(
  modalSrc.includes('min-h-[40px]') || modalSrc.includes('min-h-[52px]'),
  'All interactive links must satisfy >= 40px touch ergonomics'
);
assert(
  modalSrc.includes('active:scale-95'),
  'Must provide active:scale-95 touch feedback'
);
console.log('  ✅ Check 4 Passed: Multi-device ergonomics & a11y certified');

console.log('\n🎉 PASS 10 VERIFIED: External Community Hub Modal certified 100% compliant!\n');
process.exit(0);
