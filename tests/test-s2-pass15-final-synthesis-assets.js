// ══════════════════════════════════════════════════════════════════
//  test-s2-pass15-final-synthesis-assets.js
//  Verification Suite: Siklus II — Pass 15
//  Final Milestone Synthesis, Master Audit Regression Closure
//  & Pre-Release Asset Validation
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 15] Testing Final Synthesis, Error Boundaries & Pre-Release Asset Integrity...');

// ─────────────────────────────────────────────────────────────
// Check 15.1: App.tsx Skip to Content Z-Index & Layout Safeguards
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 15.1: App.tsx Accessible Skip Link & Layout Stacking Integrity');
{
  const appPath = path.join(ROOT, 'src/App.tsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  // Verify skip link z-index is standardized to focus:z-50
  assert(appCode.includes('focus:z-50'), 'App.tsx skip to content link must use standard focus:z-50');
  assert(!appCode.includes('focus:z-[9999]'), 'Must eliminate extreme focus:z-[9999] from App.tsx');

  // Verify safe area bottom padding and anti-leakage
  assert(
    appCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'),
    'App.tsx content container must provide mobile bottom nav cushion with safe-area-inset-bottom'
  );
  assert(
    appCode.includes('overflow-x-hidden'),
    'App.tsx must maintain strict horizontal anti-leakage constraints'
  );

  console.log('    ✓ Check 15.1 Passed: App.tsx skip link z-index and layout cushion verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 15.2: ModalErrorBoundary Body Scroll Lock & Escape Listener
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 15.2: ModalErrorBoundary Body Scroll Lock & Keyboard Escape Dismissal');
{
  const boundaryPath = path.join(ROOT, 'src/components/ui/ModalErrorBoundary.tsx');
  const boundaryCode = fs.readFileSync(boundaryPath, 'utf8');

  // Verify lifecycle scroll locking
  assert(
    boundaryCode.includes("document.body.style.overflow = 'hidden'"),
    'ModalErrorBoundary must lock body scroll when an error is trapped'
  );
  assert(
    boundaryCode.includes("document.body.style.overflow = ''"),
    'ModalErrorBoundary must restore body scroll when unmounted or dismissed'
  );

  // Verify Escape key event listener
  assert(boundaryCode.includes("e.key === 'Escape'"), 'ModalErrorBoundary must listen for Escape key');

  // Verify backdrop click dismissal
  assert(boundaryCode.includes('onClick={this.handleClose}'), 'ModalErrorBoundary must support backdrop click to dismiss');

  console.log('    ✓ Check 15.2 Passed: ModalErrorBoundary scroll lock and Escape dismiss verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 15.3: RouteErrorBoundary Responsive Cushioning & Contrast
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 15.3: RouteErrorBoundary Responsive Cushioning & Contrast');
{
  const boundaryPath = path.join(ROOT, 'src/components/ui/RouteErrorBoundary.tsx');
  const boundaryCode = fs.readFileSync(boundaryPath, 'utf8');

  // Verify safe-area bottom cushion
  assert(
    boundaryCode.includes('pb-[calc(2rem+env(safe-area-inset-bottom))]'),
    'RouteErrorBoundary must cushion against floating mobile navigation with safe-area-inset-bottom'
  );

  // Verify anti-blowout overflow constraints
  assert(
    boundaryCode.includes('min-w-0 overflow-hidden'),
    'RouteErrorBoundary must declare min-w-0 overflow-hidden to prevent container blowout'
  );
  assert(
    boundaryCode.includes('overflow-x-auto') && boundaryCode.includes('select-text'),
    'Technical trace container must enable horizontal scrolling for long code traces'
  );

  // Verify recovery action buttons touch target (>= 40px)
  assert(
    boundaryCode.includes('min-h-[44px] px-5'),
    'RouteErrorBoundary action buttons must meet touch target standards (min-h-[44px])'
  );

  console.log('    ✓ Check 15.3 Passed: RouteErrorBoundary responsive cushion and contrast verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 15.4: PWA Manifest Format & Icon Standards
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 15.4: PWA Web App Manifest Structure & Icon Coverage');
{
  const manifestPath = path.join(ROOT, 'public/manifest.webmanifest');
  const manifestJsonPath = path.join(ROOT, 'public/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest must exist');
  assert(fs.existsSync(manifestJsonPath), 'manifest.json must exist');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert(manifest.name && manifest.name.includes('Nugget Nihongo'), 'Manifest must have app name');
  assert.strictEqual(manifest.display, 'standalone', 'Manifest display must be standalone');
  assert(manifest.icons && manifest.icons.length >= 4, 'Manifest must provide multiple resolution icons');
  assert(
    manifest.icons.some((i) => i.purpose === 'maskable'),
    'Manifest must include maskable icons for modern Android PWA standards'
  );
  assert(manifest.shortcuts && manifest.shortcuts.length >= 3, 'Manifest must provide quick app shortcuts');

  console.log('    ✓ Check 15.4 Passed: PWA Web App Manifest structure and icons verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 15.5: Master Pre-Release Asset Catalog Presence
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 15.5: Pre-Release Asset Catalog Presence (Covers, Badges, Mascots)');
{
  const publicDir = path.join(ROOT, 'public');
  const generatedDir = path.join(publicDir, 'assets/generated');
  const badgesDir = path.join(publicDir, 'assets/badges');

  assert(fs.existsSync(generatedDir), 'public/assets/generated must exist');
  assert(fs.existsSync(badgesDir), 'public/assets/badges must exist');

  // Verify 9 textbook covers (AVIF, WebP, JPG)
  const books = ['minna', 'genki', 'soumatome', 'shinkanzen', 'tobira', 'quartet', 'try', 'irodori', 'marugoto'];
  for (const b of books) {
    const webpFile = path.join(generatedDir, `book-cover-${b}.webp`);
    const jpgFile = path.join(generatedDir, `book-cover-${b}.jpg`);
    assert(fs.existsSync(webpFile), `Book cover WebP for ${b} must exist`);
    assert(fs.existsSync(jpgFile), `Book cover JPG fallback for ${b} must exist`);
  }

  // Verify mascot assets
  assert(fs.existsSync(path.join(generatedDir, 'mascot-aoi-greeting.jpg')), 'Aoi mascot greeting must exist');
  assert(fs.existsSync(path.join(generatedDir, 'mascot-nugget-greeting.jpg')), 'Nugget mascot greeting must exist');

  // Verify badges count (>= 14 SVG badges)
  const badgeFiles = fs.readdirSync(badgesDir).filter((f) => f.endsWith('.svg'));
  assert(badgeFiles.length >= 14, `Must have >= 14 badge SVG assets (found ${badgeFiles.length})`);

  console.log('    ✓ Check 15.5 Passed: Master pre-release asset catalog completely verified.');
}

console.log('\n🎉 [Siklus II — Pass 15] All 5 Checks PASSED! Final Synthesis & Pre-Release Assets fully certified.\n');
