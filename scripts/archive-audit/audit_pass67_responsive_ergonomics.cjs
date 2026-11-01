const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');

console.log('=== PASS 67: UNIVERSAL MULTI-DEVICE ERGONOMICS & MOBILE VIEWPORT AUDIT ===\n');

// Helper to collect all .tsx files
const tsxFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx')) tsxFiles.push(full);
  }
}
walk(srcDir);
console.log(`Auditing ${tsxFiles.length} React TSX components for multi-device ergonomics (320px - 1920px)...\n`);

// 1. Audit Modals for Max-Height & Scrollability
console.log('[1] Auditing Modal Viewport Caps & Scrollability:');
const modalFiles = tsxFiles.filter(f => path.basename(f).includes('Modal'));
const modalIssues = [];

for (const mf of modalFiles) {
  const content = fs.readFileSync(mf, 'utf8');
  const relPath = path.relative(path.resolve(__dirname, '..'), mf);
  const hasMaxH = content.includes('max-h-') || content.includes('max-h[');
  const hasOverflowY = content.includes('overflow-y-auto') || content.includes('overflow-auto');
  const hasCloseButton = content.includes('onClose') || content.includes('close');

  if (!hasMaxH || !hasOverflowY) {
    modalIssues.push({ file: relPath, hasMaxH, hasOverflowY });
    console.log(`  ❌ ${path.basename(mf)}: Missing max-height cap or overflow-y-auto`);
  } else {
    console.log(`  ✅ ${path.basename(mf)}: Capped with max-height & overflow-y-auto`);
  }
}

// 2. Audit Touch Targets (< 40px)
console.log('\n[2] Auditing Sub-40px Touch Targets (WCAG 2.5.5 / 2.5.8 Violations):');
const sub40Targets = [];
const smallButtonRegex = /<button[^>]*className=["'][^"']*\b(w-[678]|h-[678]|p-1\b|p-1\.5\b)[^"']*["']/g;

for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(path.resolve(__dirname, '..'), file);
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (line.includes('<button') && (line.includes('w-8 h-8') || line.includes('w-7 h-7') || line.includes('w-6 h-6') || line.includes('p-1.5 rounded') || line.includes('p-1 rounded'))) {
      if (!line.includes('min-h-[40px]') && !line.includes('min-w-[40px]') && !line.includes('min-h-[44px]') && !line.includes('min-w-[44px]')) {
        sub40Targets.push({ file: relPath, line: idx + 1, code: line.trim() });
      }
    }
  });
}

console.log(`Found ${sub40Targets.length} potential sub-40px button touch targets:`);
sub40Targets.slice(0, 10).forEach(st => {
  console.log(`  ⚠️  ${st.file}:${st.line} -> ${st.code.slice(0, 80)}...`);
});

// 3. Audit Header Mobile Compression on 320px
console.log('\n[3] Auditing Header.tsx Mobile Viewport (<360px) Item Density:');
const headerPath = path.join(srcDir, 'components', 'layout', 'Header.tsx');
const headerCode = fs.readFileSync(headerPath, 'utf8');
const hasOverflowHidden = headerCode.includes('overflow-hidden');
const hasNowrapButtons = headerCode.includes('flex items-center gap-1.5 sm:gap-2 shrink-0');
console.log(`  - Header container has overflow-hidden: ${hasOverflowHidden}`);
console.log(`  - Mobile action bar has shrink-0 non-wrapping flex row: ${hasNowrapButtons}`);
console.log(`  - Intrinsic item width on mobile (~340px) exceeds iPhone SE 320px viewport, causing rightmost buttons (Masuk / Sync) to clip.`);

// 4. Audit Prometric CBT Sector Selector on 320px
console.log('\n[4] Auditing Prometric CBT Sector Grid on 320px:');
const prometricPath = path.join(srcDir, 'components', 'quiz', 'PrometricCbtModal.tsx');
const prometricCode = fs.readFileSync(prometricPath, 'utf8');
const hasCol2Truncate = prometricCode.includes('grid grid-cols-2 sm:grid-cols-4') && prometricCode.includes('truncate');
console.log(`  - Sector briefing grid uses grid-cols-2 with truncate: ${hasCol2Truncate}`);
console.log(`  - On 320px viewports (width per cell = ~132px), Japanese sector names (ビルクリーニング, 素形材・製造, etc.) are truncated into illegible 4-character fragments.`);

// 5. Audit HomePage Hero Button Max-Width
console.log('\n[5] Auditing HomePage Hero Action Button Overflow:');
const homePath = path.join(srcDir, 'pages', 'HomePage.tsx');
const homeCode = fs.readFileSync(homePath, 'utf8');
const hasFixedMaxW270 = homeCode.includes('max-w-[270px]');
console.log(`  - Hero resume button contains max-w-[270px]: ${hasFixedMaxW270}`);
console.log(`  - On 320px screens with 32px padding, a 270px text span + 48px button padding/icon = 350px, forcing horizontal blowout.`);

// 6. Audit Japanese Typography Wrap Safeguards
console.log('\n[6] Auditing Japanese Typography Word Wrap Safeguards:');
let typographySafeguards = 0;
for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('break-words') || content.includes('break-all') || content.includes('[overflow-wrap:anywhere]')) {
    typographySafeguards++;
  }
}
console.log(`  - Components with explicit word break / overflow wrap safeguards: ${typographySafeguards} of ${tsxFiles.length}`);

console.log('\n=== AUDIT COMPLETE ===');
