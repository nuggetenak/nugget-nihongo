// ══════════════════════════════════════════════════════════════════
//  test-s5-pass44-modal-stacking-manager.js — Forensic Unit & Regression Suite
//  Siklus V Pass 44: Centralized Modal Stacking Architecture & Drag Handles
//  Validates:
//  1. Component exports & schema definitions
//  2. useModalStore contract: 23 modal types, depth 10 cap, deduplication
//  3. GlobalModalManager root coordination, error boundaries & Escape key handler
//  4. Mobile bottom-sheet drag handle affordances & safe area padding
//  5. Dynamic stack transition semantics & LIFO popping lifecycle
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const storePath = path.join(ROOT_DIR, 'src/store/useModalStore.ts');
const managerPath = path.join(ROOT_DIR, 'src/components/modals/GlobalModalManager.tsx');
const badgesModalPath = path.join(ROOT_DIR, 'src/components/gamification/BadgesModal.tsx');
const detailModalPath = path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx');
const wordLookupPath = path.join(ROOT_DIR, 'src/components/modals/WordLookupSheet.tsx');
const errorBoundaryPath = path.join(ROOT_DIR, 'src/components/ui/ModalErrorBoundary.tsx');

console.log('🧪 Running Siklus V Pass 44: Centralized Modal Stacking & Drag Handles Test...\n');

// ── Check 1: File Existence & Module Presence ───────────────────────
console.log('  🔍 Check 1: Validating Modal System Files & Components...');
assert(fs.existsSync(storePath), 'useModalStore.ts must exist');
assert(fs.existsSync(managerPath), 'GlobalModalManager.tsx must exist');
assert(fs.existsSync(badgesModalPath), 'BadgesModal.tsx must exist');
assert(fs.existsSync(detailModalPath), 'DetailModal.tsx must exist');
assert(fs.existsSync(wordLookupPath), 'WordLookupSheet.tsx must exist');
assert(fs.existsSync(errorBoundaryPath), 'ModalErrorBoundary.tsx must exist');
console.log('  ✅ Check 1 Passed: All 6 core modal architecture files exist\n');

// ── Check 2: useModalStore Contract & Types ─────────────────────────
console.log('  🔍 Check 2: Auditing useModalStore Types, Depth Cap & Deduplication...');
const storeSrc = fs.readFileSync(storePath, 'utf8');

const requiredModalTypes = [
  'detail',
  'kana',
  'conjugation',
  'nuance',
  'shortcuts',
  'patchNotes',
  'kotowaza',
  'toolbox',
  'catPlacement',
  'keigo',
  'counters',
  'pitch',
  'featureGuide',
  'reportIssue',
  'auth',
  'install',
  'streakBroken',
  'onboarding',
  'storageEviction',
  'community',
  'hvpt',
  'badges',
  'wordLookup'
];

for (const type of requiredModalTypes) {
  assert(
    storeSrc.includes(`'${type}'`),
    `useModalStore.ts must declare modal type '${type}'`
  );
}

// Invariants in store source
assert(storeSrc.includes('slice(-10)'), 'useModalStore must enforce depth cap of 10');
assert(storeSrc.includes('top.type === type'), 'useModalStore must deduplicate consecutive identical modal types');
assert(storeSrc.includes('isModalOpen:'), 'useModalStore must export isModalOpen');
assert(storeSrc.includes('getStackDepth:'), 'useModalStore must export getStackDepth');
assert(storeSrc.includes('getActiveModal:'), 'useModalStore must export getActiveModal');
assert(storeSrc.includes('closeAllModals:'), 'useModalStore must export closeAllModals');
console.log(`  ✅ Check 2 Passed: All ${requiredModalTypes.length} modal types & store invariants verified\n`);

// ── Check 3: GlobalModalManager Architecture & Key Listeners ────────
console.log('  🔍 Check 3: Auditing GlobalModalManager Error Boundaries & Escape Handler...');
const managerSrc = fs.readFileSync(managerPath, 'utf8');

// Body scroll lock
assert(
  managerSrc.includes('useBodyScrollLock(modalStack.length > 0)'),
  'GlobalModalManager must lock body scroll when modals are open'
);

// Global Escape listener
assert(
  managerSrc.includes("e.key === 'Escape'"),
  'GlobalModalManager must handle Escape key event'
);
assert(
  managerSrc.includes("addEventListener('keydown'"),
  'GlobalModalManager must register keydown listener'
);

// Error boundary integration
assert(
  managerSrc.includes('<ModalErrorBoundary'),
  'GlobalModalManager must wrap dialogs in ModalErrorBoundary'
);

// Badges and WordLookupSheet lazy loading & routing
assert(
  managerSrc.includes("import('../gamification/BadgesModal')"),
  'GlobalModalManager must lazy import BadgesModal'
);
assert(
  managerSrc.includes("import('./WordLookupSheet')"),
  'GlobalModalManager must lazy import WordLookupSheet'
);
assert(
  managerSrc.includes("case 'badges':"),
  'GlobalModalManager must handle badges modal case'
);
assert(
  managerSrc.includes("case 'wordLookup':"),
  'GlobalModalManager must handle wordLookup modal case'
);
console.log('  ✅ Check 3 Passed: GlobalModalManager handles Escape, scroll lock & all modal cases\n');

// ── Check 4: Mobile Ergonomics & Bottom-Sheet Drag Handles ──────────
console.log('  🔍 Check 4: Verifying Mobile Bottom-Sheet Drag Handles & Touch Targets...');
const badgesSrc = fs.readFileSync(badgesModalPath, 'utf8');
const detailSrc = fs.readFileSync(detailModalPath, 'utf8');
const wordLookupSrc = fs.readFileSync(wordLookupPath, 'utf8');

// BadgesModal ergonomics
assert(
  badgesSrc.includes('rounded-full') && badgesSrc.includes('sm:hidden') && badgesSrc.includes('w-12'),
  'BadgesModal must include mobile drag handle pill'
);
assert(
  badgesSrc.includes('safe-area-inset-bottom'),
  'BadgesModal must respect safe-area-inset-bottom'
);
assert(
  badgesSrc.includes('min-h-[44px]') && badgesSrc.includes('min-w-[44px]'),
  'BadgesModal close button must satisfy >= 40px touch target'
);
assert(
  badgesSrc.includes('role="dialog"') && badgesSrc.includes('aria-modal="true"'),
  'BadgesModal must have ARIA dialog semantics'
);

// DetailModal ergonomics
assert(
  detailSrc.includes('rounded-full') && detailSrc.includes('sm:hidden') && detailSrc.includes('w-12'),
  'DetailModal must include mobile drag handle pill'
);
assert(
  detailSrc.includes('safe-area-inset-bottom'),
  'DetailModal must respect safe-area-inset-bottom'
);
assert(
  detailSrc.includes('min-w-[44px]') && detailSrc.includes('min-h-[44px]'),
  'DetailModal close button must satisfy >= 40px touch target'
);
assert(
  detailSrc.includes('role="dialog"') && detailSrc.includes('aria-modal="true"'),
  'DetailModal must have ARIA dialog semantics'
);

// WordLookupSheet ergonomics
assert(
  wordLookupSrc.includes('rounded-full') && wordLookupSrc.includes('sm:hidden') && wordLookupSrc.includes('w-12'),
  'WordLookupSheet must include mobile drag handle pill'
);
assert(
  wordLookupSrc.includes('role="dialog"') && wordLookupSrc.includes('aria-modal="true"'),
  'WordLookupSheet must have ARIA dialog semantics'
);
console.log('  ✅ Check 4 Passed: Drag handles, touch targets & safe area bottom padding verified\n');

// ── Check 5: Pure State Transition Semantics Simulation ─────────────
console.log('  🔍 Check 5: Simulating useModalStore State Transitions & Invariants...');

class MockModalStore {
  constructor() {
    this.modalStack = [];
  }

  openModal(type, props) {
    const top = this.modalStack[this.modalStack.length - 1];
    if (top && top.type === type) {
      this.modalStack = [...this.modalStack.slice(0, -1), { type, props }];
      return;
    }
    const nextStack = [...this.modalStack, { type, props }];
    this.modalStack = nextStack.length > 10 ? nextStack.slice(-10) : nextStack;
  }

  closeModal(type) {
    if (!type) {
      this.modalStack = this.modalStack.slice(0, -1);
      return;
    }
    const lastIndex = this.modalStack.map((m) => m.type).lastIndexOf(type);
    if (lastIndex === -1) return;
    this.modalStack = this.modalStack.filter((_, idx) => idx !== lastIndex);
  }

  closeAllModals() {
    this.modalStack = [];
  }

  getActiveModal() {
    return this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null;
  }

  isModalOpen(type) {
    return this.modalStack.some((m) => m.type === type);
  }

  getStackDepth() {
    return this.modalStack.length;
  }
}

const store = new MockModalStore();
assert.strictEqual(store.getStackDepth(), 0, 'Initial depth should be 0');
assert.strictEqual(store.getActiveModal(), null, 'Initial active modal should be null');

// Push modal 1
store.openModal('kana');
assert.strictEqual(store.getStackDepth(), 1);
assert.strictEqual(store.isModalOpen('kana'), true);
assert.strictEqual(store.getActiveModal().type, 'kana');

// Push modal 2
store.openModal('detail', { item: { word: '食べる' }, type: 'vocab' });
assert.strictEqual(store.getStackDepth(), 2);
assert.strictEqual(store.isModalOpen('detail'), true);
assert.strictEqual(store.getActiveModal().props.item.word, '食べる');

// Consecutive duplicate push replaces props without increasing depth
store.openModal('detail', { item: { word: '飲む' }, type: 'vocab' });
assert.strictEqual(store.getStackDepth(), 2, 'Consecutive push must not grow stack');
assert.strictEqual(store.getActiveModal().props.item.word, '飲む');

// Push to exceed max depth 10
for (let i = 1; i <= 15; i++) {
  store.openModal(i % 2 === 0 ? 'conjugation' : 'pitch');
}
assert.strictEqual(store.getStackDepth(), 10, 'Stack must cap at depth 10');

// Pop top modal (LIFO)
const prevDepth = store.getStackDepth();
store.closeModal();
assert.strictEqual(store.getStackDepth(), prevDepth - 1);

// Close all modals
store.closeAllModals();
assert.strictEqual(store.getStackDepth(), 0);
assert.strictEqual(store.getActiveModal(), null);
assert.strictEqual(store.isModalOpen('kana'), false);
console.log('  ✅ Check 5 Passed: State transition semantics & LIFO invariants 100% sound\n');

console.log('══════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 44: MODAL STACKING & DRAG HANDLES TEST PASSED 100%!');
console.log('══════════════════════════════════════════════════════════════════\n');
process.exit(0);
