// ══════════════════════════════════════════════════════════════════
//  test-s5-pass42-warm-editorial-theme.js — Forensic Unit & Regression Suite
//  Siklus V Pass 42: Warm Editorial Hybrid Theme & 8 Token Nippon
//  Validates:
//  1. Washi Wash & Pure Milk White Light Mode palette declarations
//  2. Warm Sumi & Makie Gold Dark Mode palette declarations
//  3. 8 Nippon Traditional Color tokens in Tailwind & CSS variables
//  4. W3C WCAG AAA / AA relative luminance contrast ratios
//  5. Universal :focus-visible rings and reduced motion accessibility
//  6. Dual-theme card elevation physics & uncorrupted keyframe animations
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexCssPath = path.join(ROOT_DIR, 'src/index.css');
const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');

console.log('🧪 Running Siklus V Pass 42: Warm Editorial Hybrid Theme & 8 Token Nippon Test...\n');

// ── Check 1: Light Mode Palette Declarations in src/index.css ─────
console.log('  🔍 Check 1: Validating Warm Editorial Light Mode Palette in src/index.css...');
assert(fs.existsSync(indexCssPath), 'src/index.css must exist');
const indexCss = fs.readFileSync(indexCssPath, 'utf8');

const lightTokens = [
  '--bg: #F7F4EE',
  '--bg-deep: #EDE8DC',
  '--surface: #FFFFFF',
  '--surface-2: #F2EFE8',
  '--surface-3: #E5E0D5',
  '--surface-4: #D8D1C4',
  '--text: #1C150E',
  '--text-bright: #0E0905',
  '--text-muted: #4A3E31',
  '--text-dim: #6E5D4B',
  '--accent: #D97706',
  '--accent-hot: #B45309',
  '--border-theme: rgba(45, 35, 25, 0.14)',
];

for (const t of lightTokens) {
  assert(indexCss.includes(t), `src/index.css must declare Light token: ${t}`);
}
console.log('  ✅ Check 1 Passed: Washi Wash (#F7F4EE) & Pure Milk White (#FFFFFF) verified\n');

// ── Check 2: Dark Mode Palette Declarations in src/index.css ──────
console.log('  🔍 Check 2: Validating Warm Sumi & Makie Gold Dark Mode in src/index.css...');

const darkTokens = [
  '--bg: #121110',
  '--bg-deep: #0C0B0A',
  '--surface: #1A1816',
  '--surface-2: #24211E',
  '--surface-3: #322D28',
  '--surface-4: #423B34',
  '--text: #F5EFE6',
  '--text-bright: #FFFFFF',
  '--text-muted: #D5CBBF',
  '--text-dim: #B3A799',
  '--accent: #F59E0B',
  '--accent-hot: #FBBF24',
  '--border-theme: rgba(245, 239, 230, 0.14)',
];

for (const t of darkTokens) {
  assert(indexCss.includes(t), `src/index.css must declare Dark token: ${t}`);
}
console.log('  ✅ Check 2 Passed: Warm Sumi (#121110) & Makie Gold (#F59E0B) verified\n');

// ── Check 3: 8 Nippon Color Tokens in Tailwind & CSS Variables ────
console.log('  🔍 Check 3: Validating 8 Nippon Traditional Colors...');
assert(fs.existsSync(tailwindConfigPath), 'tailwind.config.js must exist');
const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');

const nipponTokens = [
  { key: 'kohaku', hex: '#D97706', desc: '琥珀 Amber Gold' },
  { key: 'tokiwa', hex: '#059669', desc: '常磐 Evergreen Pine' },
  { key: 'shu', hex: '#DC2626', desc: '朱色 Torii Vermilion' },
  { key: 'edo-indigo', hex: '#2563EB', desc: '江戸藍 Edo Indigo' },
  { key: 'fuji', hex: '#7C3AED', desc: '藤紫 Wisteria Purple' },
  { key: 'gofun', hex: '#FAF7F2', desc: '白粉 Washi Rice Paper' },
  { key: 'sumi', hex: '#1C150E', desc: '墨 Deep Sumi Ink' },
  { key: 'sakura', hex: '#F472B6', desc: '桜 Cherry Blossom Pink' },
];

assert(tailwindConfig.includes('nippon: {'), 'tailwind.config.js must declare nippon color palette');

for (const token of nipponTokens) {
  // Check in Tailwind
  const tailwindKey = token.key.includes('-') ? `'${token.key}'` : token.key;
  assert(
    tailwindConfig.includes(`${tailwindKey}: '${token.hex}'`),
    `tailwind.config.js must map nippon.${token.key} to ${token.hex} (${token.desc})`
  );

  // Check in index.css CSS variables
  assert(
    indexCss.includes(`--nippon-${token.key}:`),
    `src/index.css must declare CSS variable --nippon-${token.key}`
  );
}
console.log('  ✅ Check 3 Passed: All 8 official Nippon tokens certified in Tailwind & CSS\n');

// ── Check 4: W3C Mathematical Relative Luminance & Contrast ───────
console.log('  🔍 Check 4: Verifying W3C WCAG 2.1 Contrast Ratios (AA & AAA)...');

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const l1 = getLuminance(c1.r, c1.g, c1.b);
  const l2 = getLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 1. Light Mode Primary Text on Washi Wash (#1C150E on #F7F4EE)
const ratioTextLight = getContrastRatio('#1C150E', '#F7F4EE');
assert(
  ratioTextLight >= 7.0,
  `Primary text contrast must exceed WCAG AAA (7.0:1). Got: ${ratioTextLight.toFixed(2)}:1`
);

// 2. Light Mode Primary Text on Milk White (#1C150E on #FFFFFF)
const ratioTextCard = getContrastRatio('#1C150E', '#FFFFFF');
assert(
  ratioTextCard >= 7.0,
  `Card primary text must exceed WCAG AAA (7.0:1). Got: ${ratioTextCard.toFixed(2)}:1`
);

// 3. Light Mode Muted Text on Milk White (#4A3E31 on #FFFFFF)
const ratioMuted = getContrastRatio('#4A3E31', '#FFFFFF');
assert(
  ratioMuted >= 7.0,
  `Muted text must exceed WCAG AAA (7.0:1). Got: ${ratioMuted.toFixed(2)}:1`
);

// 4. Light Mode Dim Text on Milk White (#6E5D4B on #FFFFFF)
const ratioDim = getContrastRatio('#6E5D4B', '#FFFFFF');
assert(
  ratioDim >= 4.5,
  `Dim text must satisfy WCAG AA (4.5:1). Got: ${ratioDim.toFixed(2)}:1`
);

// 5. Dark Mode Primary Text on Warm Sumi (#F5EFE6 on #121110)
const ratioDarkText = getContrastRatio('#F5EFE6', '#121110');
assert(
  ratioDarkText >= 7.0,
  `Dark mode primary text must exceed WCAG AAA (7.0:1). Got: ${ratioDarkText.toFixed(2)}:1`
);

// 6. Dark Mode Makie Gold on Warm Sumi (#F59E0B on #121110)
const ratioDarkGold = getContrastRatio('#F59E0B', '#121110');
assert(
  ratioDarkGold >= 7.0,
  `Dark mode Makie gold must exceed WCAG AAA (7.0:1). Got: ${ratioDarkGold.toFixed(2)}:1`
);

console.log(`  ✅ Check 4 Passed: Contrast Ratios Verified:
     - Light Text on Washi: ${ratioTextLight.toFixed(2)}:1 (AAA)
     - Light Text on White: ${ratioTextCard.toFixed(2)}:1 (AAA)
     - Light Muted on White: ${ratioMuted.toFixed(2)}:1 (AAA)
     - Light Dim on White: ${ratioDim.toFixed(2)}:1 (AA)
     - Dark Text on Sumi: ${ratioDarkText.toFixed(2)}:1 (AAA)
     - Dark Gold on Sumi: ${ratioDarkGold.toFixed(2)}:1 (AAA)\n`);

// ── Check 5: Universal Focus Rings & Reduced Motion ───────────────
console.log('  🔍 Check 5: Validating Focus Visible & A11y Normalizations...');

assert(
  indexCss.includes(':focus-visible') && indexCss.includes('*:focus-visible'),
  'src/index.css must declare universal :focus-visible selectors'
);
assert(
  indexCss.includes('outline: 2px solid var(--accent)'),
  'Focus outline must use 2px solid var(--accent)'
);
assert(
  indexCss.includes('outline-offset: 2px'),
  'Focus outline offset must be 2px'
);

// Reduced motion support
assert(
  indexCss.includes('@media (prefers-reduced-motion: reduce)'),
  'src/index.css must respect prefers-reduced-motion'
);
assert(
  indexCss.includes('animation-duration: 0.01ms !important'),
  'Reduced motion must zero animation durations'
);

// Light mode high contrast text utility normalization
assert(
  indexCss.includes('html:not(.dark) .text-amber-500'),
  'src/index.css must normalize amber text in light mode'
);
assert(
  indexCss.includes('html:not(.dark) .text-emerald-500'),
  'src/index.css must normalize emerald text in light mode'
);

console.log('  ✅ Check 5 Passed: Universal focus rings & WCAG 2.1 SC 2.4.7 verified\n');

// ── Check 6: Dual-Theme Elevation Physics & Uncorrupted Keyframes ──
console.log('  🔍 Check 6: Validating Elevation Physics & Keyframe Animation Integrity...');

// Card elevation physics
assert(
  indexCss.includes('.card-interactive-lift:hover'),
  'src/index.css must define .card-interactive-lift:hover'
);
assert(
  indexCss.includes('rgba(45, 35, 25, 0.08)'),
  'Must provide light mode warm elevation shadow'
);
assert(
  indexCss.includes('rgba(0, 0, 0, 0.45)'),
  'Must provide dark mode rich lacquer elevation shadow'
);

// Keyframe isolation verification:
// Ensure .animate-float-gentle, .animate-bounce-pop, etc. use their own keyframes
assert(
  indexCss.includes('.animate-float-gentle {\n  animation: floatGentleAnim'),
  '.animate-float-gentle must use floatGentleAnim'
);
assert(
  indexCss.includes('.animate-bounce-pop {\n  animation: bouncePopAnim'),
  '.animate-bounce-pop must use bouncePopAnim'
);
assert(
  indexCss.includes('.animate-slot-snap {\n  animation: slotSnapAnim'),
  '.animate-slot-snap must use slotSnapAnim'
);
assert(
  indexCss.includes('.animate-petal-bloom {\n  animation: petalBloomAnim'),
  '.animate-petal-bloom must use petalBloomAnim'
);
assert(
  indexCss.includes('.animate-page-enter {\n  animation: pageEnterAnim'),
  '.animate-page-enter must use pageEnterAnim'
);
assert(
  indexCss.includes('.animate-draw-dynamic-stroke {\n  animation: drawDynamicStroke'),
  '.animate-draw-dynamic-stroke must be isolated'
);

console.log('  ✅ Check 6 Passed: Uncorrupted keyframe animations & authentic dual-theme elevation\n');

console.log('🎉 SIKLUS V PASS 42 VERIFIED: Warm Editorial Hybrid Theme & 8 Token Nippon 100% GREEN!\n');
process.exit(0);
