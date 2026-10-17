// ══════════════════════════════════════════════════════════════════
//  optimize-book-covers.js — Dual-Tier WebP & AVIF Image Pipeline
//  Converts heavy JPEGs to 400x250 thumbnails & 1200x750 hero banners
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, '../public/assets/generated');

const COVERS = [
  'book-cover-dekiru',
  'book-cover-genki',
  'book-cover-irodori',
  'book-cover-marugoto',
  'book-cover-minna',
  'book-cover-quartet',
  'book-cover-shinkanzen',
  'book-cover-soumatome',
  'book-cover-tobira'
];

async function generateTryCover() {
  const trySvg = `
    <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c1917" />
          <stop offset="50%" stop-color="#292524" />
          <stop offset="100%" stop-color="#0c0a09" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#bg)" />
      <circle cx="950" cy="200" r="280" fill="#f59e0b" opacity="0.12" />
      <circle cx="150" cy="600" r="220" fill="#ef4444" opacity="0.1" />
      <rect x="100" y="80" width="1000" height="590" rx="24" fill="#000000" opacity="0.45" stroke="#f59e0b" stroke-width="3" stroke-opacity="0.3" />
      
      <!-- Badge -->
      <rect x="150" y="130" width="220" height="48" rx="12" fill="url(#accent)" />
      <text x="260" y="162" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">JLPT EXAM PREP</text>
      
      <!-- Main Title -->
      <text x="150" y="270" font-family="sans-serif" font-size="96" font-weight="900" fill="#f59e0b" letter-spacing="4">TRY!</text>
      <text x="150" y="360" font-family="sans-serif" font-size="44" font-weight="800" fill="#ffffff">日本語能力試験 N5–N1</text>
      <text x="150" y="420" font-family="sans-serif" font-size="28" font-weight="500" fill="#a8a29e">文法から伸ばす日本語 · Grammar-First Authentic Drills</text>
      
      <!-- Level Pills -->
      <g transform="translate(150, 480)">
        <rect x="0" y="0" width="100" height="42" rx="10" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
        <text x="50" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fbbf24" text-anchor="middle">N5</text>
        
        <rect x="120" y="0" width="100" height="42" rx="10" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
        <text x="170" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fbbf24" text-anchor="middle">N4</text>
        
        <rect x="240" y="0" width="100" height="42" rx="10" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
        <text x="290" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fbbf24" text-anchor="middle">N3</text>
        
        <rect x="360" y="0" width="100" height="42" rx="10" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
        <text x="410" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fbbf24" text-anchor="middle">N2</text>
        
        <rect x="480" y="0" width="100" height="42" rx="10" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
        <text x="530" y="28" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fbbf24" text-anchor="middle">N1</text>
      </g>
      
      <!-- Footer Note -->
      <text x="150" y="600" font-family="sans-serif" font-size="20" font-weight="600" fill="#78716c">THE ASSOCIATION FOR OVERSEAS TECHNICAL COOPERATION AND SUSTAINABLE PARTNERSHIPS (AOTS)</text>
    </svg>
  `;

  const tryJpgPath = path.join(ASSETS_DIR, 'book-cover-try.jpg');
  await sharp(Buffer.from(trySvg))
    .jpeg({ quality: 90 })
    .toFile(tryJpgPath);
  console.log('✅ Generated authentic TRY! JLPT base cover image');
}

async function main() {
  console.log('🖼️ OPTIMIZING BOOK COVERS WITH DUAL-TIER WEBP & AVIF PIPELINE...\n');

  await generateTryCover();
  const allCovers = [...COVERS, 'book-cover-try'];

  let totalOriginalSize = 0;
  let totalOptimizedThumbSize = 0;

  for (const name of allCovers) {
    const inputJpg = path.join(ASSETS_DIR, `${name}.jpg`);
    if (!fs.existsSync(inputJpg)) continue;

    const stats = fs.statSync(inputJpg);
    totalOriginalSize += stats.size;

    // 1. Thumbnail WebP (400x250, 82% quality)
    const thumbWebp = path.join(ASSETS_DIR, `${name}-thumb.webp`);
    await sharp(inputJpg)
      .resize(400, 250, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(thumbWebp);

    // Standard fallback webp
    const standardWebp = path.join(ASSETS_DIR, `${name}.webp`);
    await sharp(inputJpg)
      .resize(400, 250, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(standardWebp);

    // 2. Hero Banner WebP (1200x750, 85% quality)
    const heroWebp = path.join(ASSETS_DIR, `${name}-hero.webp`);
    await sharp(inputJpg)
      .resize(1200, 750, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(heroWebp);

    // 3. Thumbnail AVIF (400x250, 80% quality)
    const thumbAvif = path.join(ASSETS_DIR, `${name}-thumb.avif`);
    await sharp(inputJpg)
      .resize(400, 250, { fit: 'cover' })
      .avif({ quality: 80 })
      .toFile(thumbAvif);

    const thumbStats = fs.statSync(thumbWebp);
    totalOptimizedThumbSize += thumbStats.size;

    console.log(`  ✓ ${name}: Original ${(stats.size / 1024).toFixed(1)} KB -> WebP ${(thumbStats.size / 1024).toFixed(1)} KB`);
  }

  const reduction = ((1 - totalOptimizedThumbSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n🎉 COMPRESSION COMPLETE!`);
  console.log(`Original: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Thumbnails Total: ${(totalOptimizedThumbSize / 1024).toFixed(1)} KB (${reduction}% reduction)`);
}

main().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
});
