// ══════════════════════════════════════════════════════════════════
//  generate-pwa-icon-matrix.js — Full-Spectrum PWA Icon Matrix
//  Generates densities (48-512), safe-zone maskables, favicon & screenshots
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'public/icons');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SOURCE_LOGO = path.join(ICONS_DIR, 'logo.png');

const DENSITIES = [48, 72, 96, 128, 144, 192, 384, 512];
const BG_COLOR = { r: 13, g: 11, b: 8, alpha: 1 }; // #0D0B08

async function generateDensities() {
  console.log('📱 Generating standard PWA icon densities...');
  for (const size of DENSITIES) {
    const outPath = path.join(ICONS_DIR, `icon-${size}.png`);
    await sharp(SOURCE_LOGO)
      .resize(size, size, { fit: 'contain', background: BG_COLOR })
      .png()
      .toFile(outPath);
    console.log(`  ✓ Generated icon-${size}.png`);
  }
}

async function generateMaskables() {
  console.log('🛡️ Generating dedicated maskable icons (20% safe-zone margin)...');
  for (const size of [192, 512]) {
    const innerSize = Math.round(size * 0.76); // 24% margin total, 12% on each side
    const innerBuffer = await sharp(SOURCE_LOGO)
      .resize(innerSize, innerSize, { fit: 'contain' })
      .toBuffer();

    const outPath = path.join(ICONS_DIR, `icon-${size}-maskable.png`);
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: BG_COLOR
      }
    })
      .composite([{ input: innerBuffer, gravity: 'center' }])
      .png()
      .toFile(outPath);
    console.log(`  ✓ Generated icon-${size}-maskable.png`);
  }
}

async function generateAppleTouchIcon() {
  console.log('🍎 Generating Apple Touch Icon (180x180)...');
  const appleTouchPath = path.join(PUBLIC_DIR, 'apple-touch-icon.png');
  const appleTouchIconDir = path.join(ICONS_DIR, 'apple-touch-icon.png');
  const buf = await sharp(SOURCE_LOGO)
    .resize(180, 180, { fit: 'contain', background: BG_COLOR })
    .png()
    .toBuffer();

  fs.writeFileSync(appleTouchPath, buf);
  fs.writeFileSync(appleTouchIconDir, buf);
  console.log('  ✓ Generated apple-touch-icon.png in public/ and public/icons/');
}

async function generateFavicons() {
  console.log('⭐ Generating vector favicon.svg and favicon.ico...');
  
  // Vector SVG Favicon with Japanese Kanji "日本語" and golden accent
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="nuggetGlow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="60%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </radialGradient>
    <filter id="subtleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="128" height="128" rx="28" fill="#0D0B08" />
  <rect x="2" y="2" width="124" height="124" rx="26" fill="none" stroke="#F59E0B" stroke-opacity="0.3" stroke-width="2" />
  
  <!-- Golden Nugget Crest -->
  <path d="M64 22 C36 22, 22 40, 22 68 C22 96, 42 108, 64 108 C86 108, 106 96, 106 68 C106 40, 92 22, 64 22 Z" fill="url(#nuggetGlow)" filter="url(#subtleShadow)" />
  
  <!-- Japanese Character 日 -->
  <text x="64" y="75" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="44" font-weight="900" fill="#0D0B08" text-anchor="middle" dominant-baseline="middle">日</text>
  
  <!-- Sparkle Accent -->
  <circle cx="88" cy="38" r="4" fill="#FEF3C7" />
</svg>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg, 'utf8');

  // Multi-resolution ICO: Generate 48x48, 32x32, 16x16 PNG buffers and assemble standard ICO format
  const png16 = await sharp(SOURCE_LOGO).resize(16, 16, { fit: 'contain' }).png().toBuffer();
  const png32 = await sharp(SOURCE_LOGO).resize(32, 32, { fit: 'contain' }).png().toBuffer();
  const png48 = await sharp(SOURCE_LOGO).resize(48, 48, { fit: 'contain' }).png().toBuffer();

  // Write 32x32 PNG as direct favicon.ico fallback (modern browsers accept PNG data in .ico)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), png32);
  console.log('  ✓ Generated favicon.svg and favicon.ico in public/');
}

async function generateScreenshots() {
  console.log('📸 Generating rich PWA install preview screenshots...');
  
  // Desktop 1280x720 preview screenshot
  const desktopSvg = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="720" fill="#0D0B08" />
    <rect x="40" y="40" width="1200" height="640" rx="20" fill="#171410" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.3" />
    <circle cx="100" cy="80" r="12" fill="#ef4444" />
    <circle cx="132" cy="80" r="12" fill="#f59e0b" />
    <circle cx="164" cy="80" r="12" fill="#10b981" />
    <text x="640" y="240" font-family="sans-serif" font-size="48" font-weight="900" fill="#f59e0b" text-anchor="middle">Nugget Nihongo · Belajar JLPT &amp; SSW</text>
    <text x="640" y="300" font-family="sans-serif" font-size="24" font-weight="500" fill="#d6d3d1" text-anchor="middle">Kurikulum Resmi N5–N1, FSRS Spaced Repetition, &amp; Kuis Adaptif</text>
    <rect x="440" y="380" width="400" height="70" rx="18" fill="#f59e0b" />
    <text x="640" y="425" font-family="sans-serif" font-size="24" font-weight="bold" fill="#0d0b08" text-anchor="middle">Mulai Belajar Sekarang</text>
  </svg>`;
  
  await sharp(Buffer.from(desktopSvg))
    .png()
    .toFile(path.join(ICONS_DIR, 'screenshot-desktop.png'));

  // Mobile 390x844 preview screenshot
  const mobileSvg = `<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
    <rect width="390" height="844" fill="#0D0B08" />
    <rect x="20" y="20" width="350" height="804" rx="32" fill="#171410" stroke="#f59e0b" stroke-width="2" stroke-opacity="0.4" />
    <rect x="130" y="35" width="130" height="24" rx="12" fill="#000000" />
    <text x="195" y="160" font-family="sans-serif" font-size="28" font-weight="900" fill="#f59e0b" text-anchor="middle">Nugget Nihongo</text>
    <text x="195" y="200" font-family="sans-serif" font-size="14" font-weight="600" fill="#d6d3d1" text-anchor="middle">Persiapan JLPT &amp; SSW Jepang</text>
    <rect x="50" y="250" width="290" height="80" rx="16" fill="#26221b" stroke="#f59e0b" stroke-opacity="0.2" />
    <text x="75" y="295" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fbbf24">🎯 Kuis Harian FSRS</text>
    <rect x="50" y="350" width="290" height="80" rx="16" fill="#26221b" stroke="#f59e0b" stroke-opacity="0.2" />
    <text x="75" y="395" font-family="sans-serif" font-size="16" font-weight="bold" fill="#38bdf8">📚 9 Seri Buku Teks</text>
    <rect x="50" y="450" width="290" height="80" rx="16" fill="#26221b" stroke="#f59e0b" stroke-opacity="0.2" />
    <text x="75" y="495" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399">🌱 Kebun Kata</text>
  </svg>`;

  await sharp(Buffer.from(mobileSvg))
    .png()
    .toFile(path.join(ICONS_DIR, 'screenshot-mobile.png'));
  console.log('  ✓ Generated screenshot-desktop.png and screenshot-mobile.png in public/icons/');
}

async function main() {
  console.log('🚀 BUILDING PWA FULL-SPECTRUM ICON MATRIX...\n');
  await generateDensities();
  await generateMaskables();
  await generateAppleTouchIcon();
  await generateFavicons();
  await generateScreenshots();
  console.log('\n🎉 PWA ICON MATRIX GENERATION COMPLETE!');
}

main().catch(err => {
  console.error('Failed generating icon matrix:', err);
  process.exit(1);
});
