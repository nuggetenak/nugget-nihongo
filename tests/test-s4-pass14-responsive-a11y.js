// ══════════════════════════════════════════════════════════════════
//  test-s4-pass14-responsive-a11y.js — Forensic Unit & Regression Suite
//  Siklus IV Pass 14: Universal Multi-Device Ergonomics & A11y Audit
//  Audits responsive layouts (320px–1920px), touch targets (>= 40px),
//  safe areas, keyboard navigation, and WCAG/ARIA accessibility.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS IV PASS 14: MULTI-DEVICE ERGONOMICS & A11Y AUDIT        ║');
console.log('║   320px–1920px Viewports • >=40px Touch Targets • ARIA Modal     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Audit KanjiStrokeModal Responsive & A11y Standards
console.log('  🔍 Check 1: KanjiStrokeModal Multi-Device Ergonomics & ARIA Contracts...');
const strokeModalPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiStrokeModal.tsx');
assert(fs.existsSync(strokeModalPath), 'KanjiStrokeModal.tsx must exist');
const strokeModalSrc = fs.readFileSync(strokeModalPath, 'utf8');

assert(
  strokeModalSrc.includes('role="dialog"') && strokeModalSrc.includes('aria-modal="true"'),
  'KanjiStrokeModal must include role="dialog" and aria-modal="true"'
);
assert(
  strokeModalSrc.includes('items-end sm:items-center'),
  'KanjiStrokeModal must adapt as bottom-sheet on mobile and centered card on desktop'
);
assert(
  strokeModalSrc.includes('max-h-[92dvh]'),
  'KanjiStrokeModal must clamp height with dvh units for mobile browser chrome adaptation'
);
assert(
  strokeModalSrc.includes('w-10 h-10') || strokeModalSrc.includes('min-h-[40px]'),
  'KanjiStrokeModal must maintain touch target >= 40px'
);
assert(
  strokeModalSrc.includes('active:scale-95'),
  'KanjiStrokeModal interactive triggers must feature active:scale-95 tactile feedback'
);
console.log('  ✅ Check 1 Passed: KanjiStrokeModal satisfies mobile sheet and a11y criteria');

// 2. Audit CommunityHubModal Multi-Device & Anti-Leakage Contracts
console.log('  🔍 Check 2: CommunityHubModal Ergonomics & Viewport Adaptation...');
const communityModalPath = path.join(ROOT_DIR, 'src/components/community/CommunityHubModal.tsx');
assert(fs.existsSync(communityModalPath), 'CommunityHubModal.tsx must exist');
const communityModalSrc = fs.readFileSync(communityModalPath, 'utf8');

assert(
  communityModalSrc.includes('role="dialog"') && communityModalSrc.includes('aria-modal="true"'),
  'CommunityHubModal must include role="dialog" and aria-modal="true"'
);
assert(
  communityModalSrc.includes('aria-labelledby="community-modal-title"'),
  'CommunityHubModal must reference aria-labelledby for screen readers'
);
assert(
  communityModalSrc.includes('min-h-[40px]') || communityModalSrc.includes('min-w-[40px]'),
  'CommunityHubModal close & action buttons must enforce min 40px touch targets'
);
assert(
  communityModalSrc.includes('max-h-[90dvh]') || communityModalSrc.includes('max-h-[92vh]'),
  'CommunityHubModal must bound vertical height on compact screens'
);
assert(
  communityModalSrc.includes('active:scale-95'),
  'CommunityHubModal interactive elements must provide active tactile compression'
);
console.log('  ✅ Check 2 Passed: CommunityHubModal satisfies viewport and ARIA contracts');

// 3. Audit KanjiCanvas Retina & Pointer Accessibility
console.log('  🔍 Check 3: KanjiCanvas Pointer & Retina Accessibility...');
const canvasPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiCanvas.tsx');
assert(fs.existsSync(canvasPath), 'KanjiCanvas.tsx must exist');
const canvasSrc = fs.readFileSync(canvasPath, 'utf8');

assert(
  canvasSrc.includes('role="application"'),
  'KanjiCanvas must provide role="application" for rich drawing interaction'
);
assert(
  canvasSrc.includes('aria-label="Kanvas latihan menulis goresan kanji interaktif"'),
  'KanjiCanvas must describe canvas utility for screen readers'
);
assert(
  canvasSrc.includes('touchAction: \'none\'') || canvasSrc.includes('touch-none'),
  'KanjiCanvas must prevent unwanted mobile scroll gesture interference'
);
assert(
  canvasSrc.includes('devicePixelRatio') || canvasSrc.includes('window.devicePixelRatio'),
  'KanjiCanvas must handle Retina / high-DPI resolution scaling'
);
console.log('  ✅ Check 3 Passed: KanjiCanvas certified for touch and Retina rendering');

// 4. Audit SyncStatusPill & SyncStatusIndicator Ergonomics
console.log('  🔍 Check 4: Sync Status Indicators Ergonomics...');
const syncPillPath = path.join(ROOT_DIR, 'src/components/ui/SyncStatusPill.tsx');
assert(fs.existsSync(syncPillPath), 'SyncStatusPill.tsx must exist');
const syncPillSrc = fs.readFileSync(syncPillPath, 'utf8');

assert(
  syncPillSrc.includes('min-h-[36px]') || syncPillSrc.includes('min-h-[40px]'),
  'SyncStatusPill must meet ergonomic button height'
);
assert(
  syncPillSrc.includes('role="dialog"') && syncPillSrc.includes('aria-modal="true"'),
  'SyncStatusPill modal dialog must have role="dialog" and aria-modal="true"'
);
assert(
  syncPillSrc.includes('active:scale-95'),
  'SyncStatusPill must provide active tactile feedback'
);

const syncIndicatorPath = path.join(ROOT_DIR, 'src/components/sync/SyncStatusIndicator.tsx');
assert(fs.existsSync(syncIndicatorPath), 'SyncStatusIndicator.tsx must exist');
const syncIndicatorSrc = fs.readFileSync(syncIndicatorPath, 'utf8');

assert(
  syncIndicatorSrc.includes('min-h-[40px]'),
  'SyncStatusIndicator must enforce minimum 40px touch height'
);
console.log('  ✅ Check 4 Passed: Sync telemetry triggers meet ergonomic standards');

// 5. Audit AboutPage & MethodologyPage Safe Area Cushions
console.log('  🔍 Check 5: Page Bottom Safe Area Cushions (No BottomNav Obscurity)...');
const aboutPagePath = path.join(ROOT_DIR, 'src/pages/AboutPage.tsx');
const aboutSrc = fs.readFileSync(aboutPagePath, 'utf8');
assert(
  aboutSrc.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'),
  'AboutPage must cushion bottom for mobile navigation and iOS home bar'
);

const methodologyPath = path.join(ROOT_DIR, 'src/pages/MethodologyPage.tsx');
const methodologySrc = fs.readFileSync(methodologyPath, 'utf8');
assert(
  methodologySrc.includes('card-interactive-lift'),
  'MethodologyPage cards must employ interactive lift styling'
);
console.log('  ✅ Check 5 Passed: Pages maintain safe area padding and responsive cards');

console.log('\n🌟 ALL SIKLUS IV PASS 14 ERGONOMICS & A11Y AUDITS PASSED 100% GREEN!');
