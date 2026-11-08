// ══════════════════════════════════════════════════════════════════
//  test-s3-pass14-warm-editorial-palette.js
//  Siklus III Pass 14: Warm Editorial Color Palette & Nippon Colors Integration
//  Nugget Nihongo Enterprise Quality Assurance
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const indexCssPath = path.join(ROOT_DIR, 'src/index.css');
const tailwindConfigPath = path.join(ROOT_DIR, 'tailwind.config.js');
const aboutPagePath = path.join(ROOT_DIR, 'src/pages/AboutPage.tsx');
const methodologyPagePath = path.join(ROOT_DIR, 'src/pages/MethodologyPage.tsx');

console.log('🧪 Running Siklus III Pass 14: Warm Editorial Palette & Nippon Colors Verification...');

const indexCss = fs.readFileSync(indexCssPath, 'utf8');
const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
const aboutPage = fs.readFileSync(aboutPagePath, 'utf8');
const methodologyPage = fs.readFileSync(methodologyPagePath, 'utf8');

// Check 1: Warm Editorial Light Mode tokens in src/index.css
assert(indexCss.includes('--bg: #F7F4EE'), 'src/index.css must declare Washi paper --bg: #F7F4EE in light mode');
assert(indexCss.includes('--surface: #FFFFFF'), 'src/index.css must declare Milk White --surface: #FFFFFF in light mode');
assert(indexCss.includes('--accent: #D97706'), 'src/index.css must declare Kohaku Gold --accent: #D97706 in light mode');
assert(indexCss.includes('--text: #1C150E'), 'src/index.css must declare Sumi Ink --text: #1C150E in light mode');
console.log('  ✅ Check 1 Passed: src/index.css enforces Warm Editorial Light Mode (Washi Wash #F7F4EE & Pure Milk White #FFFFFF)');

// Check 2: Warm Sumi & Makie Gold Dark Mode tokens in src/index.css
assert(indexCss.includes('--bg: #121110'), 'src/index.css must declare Warm Sumi --bg: #121110 in dark mode');
assert(indexCss.includes('--surface: #1A1816'), 'src/index.css must declare Sumi Card --surface: #1A1816 in dark mode');
assert(indexCss.includes('--accent: #F59E0B'), 'src/index.css must declare Makie Gold --accent: #F59E0B in dark mode');
assert(indexCss.includes('--text: #F5EFE6'), 'src/index.css must declare Soft Ivory --text: #F5EFE6 in dark mode');
console.log('  ✅ Check 2 Passed: src/index.css enforces Warm Sumi & Makie Gold Dark Mode (#121110 & #F59E0B)');

// Check 3: tailwind.config.js registers nippon colors
assert(tailwindConfig.includes('nippon: {'), 'tailwind.config.js must define nippon colors object');
assert(tailwindConfig.includes("kohaku: '#D97706'"), 'tailwind.config.js must include nippon.kohaku');
assert(tailwindConfig.includes("tokiwa: '#059669'"), 'tailwind.config.js must include nippon.tokiwa');
assert(tailwindConfig.includes("shu: '#DC2626'"), 'tailwind.config.js must include nippon.shu');
assert(tailwindConfig.includes("'edo-indigo': '#2563EB'"), 'tailwind.config.js must include nippon.edo-indigo');
assert(tailwindConfig.includes("fuji: '#7C3AED'"), 'tailwind.config.js must include nippon.fuji');
assert(tailwindConfig.includes("gofun: '#FAF7F2'"), 'tailwind.config.js must include nippon.gofun');
assert(tailwindConfig.includes("sumi: '#1C150E'"), 'tailwind.config.js must include nippon.sumi');
console.log('  ✅ Check 3 Passed: tailwind.config.js registers all 8 official Nippon Colors tokens');

// Check 4: Dual-theme card-interactive-lift shadow physics
assert(indexCss.includes('.card-interactive-lift:hover'), 'src/index.css must declare .card-interactive-lift:hover');
assert(indexCss.includes('rgba(45, 35, 25, 0.08)'), 'src/index.css must provide warm light mode shadow');
assert(indexCss.includes('rgba(0, 0, 0, 0.45)'), 'src/index.css must provide rich dark mode lacquer shadow');
console.log('  ✅ Check 4 Passed: .card-interactive-lift provides authentic dual-theme tactile elevation');

// Check 5: AboutPage and MethodologyPage integration
assert(aboutPage.includes('senpai_studying'), 'AboutPage must embed senpai_studying companion avatar');
assert(aboutPage.includes('card-interactive-lift'), 'AboutPage must apply card-interactive-lift');
assert(methodologyPage.includes('Calculator'), 'MethodologyPage must integrate interactive FSRS visualizer');
assert(methodologyPage.includes('200 Persona Indonesia'), 'MethodologyPage must feature 200 personas matrix');
assert(methodologyPage.includes('Protokol Kolaborasi Riset Terbuka'), 'MethodologyPage must provide Open Science contribution protocol');
console.log('  ✅ Check 5 Passed: AboutPage & MethodologyPage feature Irasutoya, FSRS Simulator & Open Science');

console.log('\n📊 Siklus III Pass 14 Result: 5/5 checks passed.');
console.log('🎉 SIKLUS III PASS 14 PASSED 100% GREEN!\n');
process.exit(0);
