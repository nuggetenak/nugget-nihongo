// ══════════════════════════════════════════════════════════════════
//  test-s6-pass1-irasutoya-local-mobile.js — Siklus VI Pass 1 Test Suite
//  Local Irasutoya Vector Visual Architecture & Mobile Presence Assurance
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

console.log('🧪 [Siklus VI — Pass 1] Testing Local Irasutoya Vector Visual Architecture & Mobile Presence...\n');

let passCount = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 1.1: Local Vector SVG Illustrations in public/assets/illustrations/
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 1.1: Verification of bundled local SVG illustrations');

const requiredSvgs = [
  'sensei-teaching.svg',
  'sensei-welcome.svg',
  'sensei-cheer.svg',
  'sensei-tea.svg',
  'senpai-study.svg',
  'hanko-excellent.svg',
  'daruma-recovery.svg',
  'garden-bloom.svg',
  'garden-sprout.svg',
  'kusudama.svg',
];

const illDir = path.join(ROOT, 'public/assets/illustrations');
assert(fs.existsSync(illDir), 'public/assets/illustrations directory must exist');

for (const svgName of requiredSvgs) {
  const filePath = path.join(illDir, svgName);
  assert(fs.existsSync(filePath), `Illustration ${svgName} must exist in public/assets/illustrations/`);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('<svg') && content.includes('viewBox='), `${svgName} must be a valid SVG with viewBox`);
}

console.log('    ✓ Check 1.1 Passed: All 10 local SVG vector illustrations exist and are valid SVGs.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 1.2: irasutoyaCatalog.ts localUrl Binding & Resolver Resilience
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 1.2: Catalog architecture and localUrl priority');

const catalogPath = path.join(ROOT, 'src/lib/assets/irasutoyaCatalog.ts');
assert(fs.existsSync(catalogPath), 'src/lib/assets/irasutoyaCatalog.ts must exist');

const catalogContent = fs.readFileSync(catalogPath, 'utf8');

assert(catalogContent.includes('localUrl?: string'), 'IrasutoyaAsset must define optional localUrl property');
assert(catalogContent.includes('/assets/illustrations/sensei-teaching.svg'), 'sensei_teaching must bind to local SVG');
assert(catalogContent.includes('/assets/illustrations/hanko-excellent.svg'), 'hanko_excellent must bind to local SVG');
assert(catalogContent.includes('/assets/illustrations/daruma-recovery.svg'), 'daruma_recovery must bind to local SVG');
assert(catalogContent.includes('asset.localUrl || asset.cdnUrl'), 'getIrasutoyaAsset must prioritize localUrl');

console.log('    ✓ Check 1.2 Passed: Catalog successfully maps canonical assets to zero-latency local vector SVGs.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 1.3: IrasutoyaImage.tsx Local Fallback & Safe crossOrigin
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 1.3: IrasutoyaImage.tsx offline safety');

const componentPath = path.join(ROOT, 'src/components/common/IrasutoyaImage.tsx');
assert(fs.existsSync(componentPath), 'src/components/common/IrasutoyaImage.tsx must exist');

const componentContent = fs.readFileSync(componentPath, 'utf8');

assert(componentContent.includes('asset.localUrl || asset.cdnUrl'), 'IrasutoyaImage must resolve localUrl before cdnUrl');
assert(componentContent.includes("imageUrl.startsWith('http') ? 'anonymous' : undefined"), 'crossOrigin must be conditional to prevent local SVG CORS blocks');

console.log('    ✓ Check 1.3 Passed: IrasutoyaImage safely renders local assets without CORS friction.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 1.4: Mobile Visibility Unblocked in HomePage.tsx
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 1.4: Sensei illustration unhidden on mobile in HomePage.tsx');

const homePath = path.join(ROOT, 'src/pages/HomePage.tsx');
assert(fs.existsSync(homePath), 'src/pages/HomePage.tsx must exist');

const homeContent = fs.readFileSync(homePath, 'utf8');

// Ensure 'hidden sm:flex' wrapping sensei_teaching has been purged
assert(!homeContent.includes('hidden sm:flex shrink-0 items-center justify-center">\n            <IrasutoyaImage\n              assetId="sensei_teaching"'), 'HomePage.tsx must NOT hide sensei_teaching on mobile');

console.log('    ✓ Check 1.4 Passed: Sensei mascot is actively visible on mobile screens in HomePage.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 1.5: Offline PWA & Build Zero-External-Failure Guarantee
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 1.5: Zero-external-dependency asset verification');

// Ensure that every local SVG path starts with /assets/illustrations/ and file actually exists on disk
const localUrlsMatches = catalogContent.match(/localUrl:\s*['"](\/assets\/illustrations\/[^'"]+)['"]/g) || [];
assert(localUrlsMatches.length >= 8, 'Catalog must contain at least 8 localUrl bindings');

for (const match of localUrlsMatches) {
  const relPath = match.replace(/localUrl:\s*['"]/, '').replace(/['"]$/, '');
  const sysPath = path.join(ROOT, 'public', relPath);
  assert(fs.existsSync(sysPath), `Referenced localUrl ${relPath} must exist on disk at ${sysPath}`);
}

console.log(`    ✓ Check 1.5 Passed: All ${localUrlsMatches.length} bound local illustrations verified on filesystem.`);
passCount++;

// ──────────────────────────────────────────────────────────────────
// Final Assessment
// ──────────────────────────────────────────────────────────────────
if (passCount === totalChecks) {
  console.log('\n🎉 [Siklus VI — Pass 1] All 5 Checks PASSED! Local Irasutoya illustrations fully restored and visible on mobile.\n');
  process.exit(0);
} else {
  console.error(`\n❌ [Siklus VI — Pass 1] Only ${passCount}/${totalChecks} checks passed.\n`);
  process.exit(1);
}
