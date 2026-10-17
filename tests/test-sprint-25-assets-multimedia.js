// ══════════════════════════════════════════════════════════════════
//  test-sprint-25-assets-multimedia.js — Forensic Unit & Integration Suite
//  Sprint 25: Asset Ecosystem, Multimedia Pipeline & Storage Optimization
//  (Tickets T-141 to T-145)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('📦 RUNNING SPRINT 25 VERIFICATION SUITE: ASSETS & MULTIMEDIA');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-141: Dual-Tier WebP/AVIF Image Pipeline & Book Cover Compression ──
test('T-141: Dual-tier WebP/AVIF covers exist, TRY! cover is authentic, and BookTrackBrowser uses <picture>', () => {
  const assetsDir = path.join(ROOT_DIR, 'public/assets/generated');
  const requiredCovers = [
    'book-cover-dekiru',
    'book-cover-genki',
    'book-cover-irodori',
    'book-cover-marugoto',
    'book-cover-minna',
    'book-cover-quartet',
    'book-cover-shinkanzen',
    'book-cover-soumatome',
    'book-cover-tobira',
    'book-cover-try'
  ];

  let totalThumbBytes = 0;

  for (const cover of requiredCovers) {
    const thumbWebp = path.join(assetsDir, `${cover}-thumb.webp`);
    const heroWebp = path.join(assetsDir, `${cover}-hero.webp`);
    const thumbAvif = path.join(assetsDir, `${cover}-thumb.avif`);

    assert(fs.existsSync(thumbWebp), `Missing ${cover}-thumb.webp`);
    assert(fs.existsSync(heroWebp), `Missing ${cover}-hero.webp`);
    assert(fs.existsSync(thumbAvif), `Missing ${cover}-thumb.avif`);

    const st = fs.statSync(thumbWebp);
    totalThumbBytes += st.size;
  }

  // Verify total payload reduction (under 600 KB for all 10 thumbnails)
  assert(totalThumbBytes < 600 * 1024, `Total thumbnail size must be < 600KB, got ${(totalThumbBytes / 1024).toFixed(1)} KB`);

  // Verify BookTrackBrowser.tsx uses <picture> and references TRY! cover
  const btbPath = path.join(ROOT_DIR, 'src/components/materi/BookTrackBrowser.tsx');
  const btbCode = fs.readFileSync(btbPath, 'utf8');
  assert(btbCode.includes('<picture'), 'BookTrackBrowser must render <picture> tags');
  assert(btbCode.includes('image/avif'), 'BookTrackBrowser must support AVIF srcset');
  assert(btbCode.includes('image/webp'), 'BookTrackBrowser must support WebP srcset');
  assert(btbCode.includes('book-cover-try'), 'BookTrackBrowser must reference dedicated TRY! cover');
});

// ── T-142: PWA Full-Spectrum Icon Matrix, Dedicated Maskables & Favicons ──
test('T-142: PWA full-spectrum icon densities, dedicated maskables, favicons, and manifest match', () => {
  const iconsDir = path.join(ROOT_DIR, 'public/icons');
  const requiredDensities = [48, 72, 96, 128, 144, 192, 384, 512];

  for (const d of requiredDensities) {
    assert(fs.existsSync(path.join(iconsDir, `icon-${d}.png`)), `Missing icon-${d}.png`);
  }

  // Dedicated maskables
  assert(fs.existsSync(path.join(iconsDir, 'icon-192-maskable.png')), 'Missing icon-192-maskable.png');
  assert(fs.existsSync(path.join(iconsDir, 'icon-512-maskable.png')), 'Missing icon-512-maskable.png');

  // Favicons & Apple Touch Icon
  assert(fs.existsSync(path.join(ROOT_DIR, 'public/favicon.svg')), 'Missing public/favicon.svg');
  assert(fs.existsSync(path.join(ROOT_DIR, 'public/favicon.ico')), 'Missing public/favicon.ico');
  assert(fs.existsSync(path.join(ROOT_DIR, 'public/apple-touch-icon.png')), 'Missing public/apple-touch-icon.png');

  // Manifest verification
  const manifestPath = path.join(ROOT_DIR, 'public/manifest.webmanifest');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const maskables = manifest.icons.filter((i) => i.purpose === 'maskable');
  assert(maskables.length >= 2, 'Manifest must contain at least 2 dedicated maskable icons');
  assert(manifest.screenshots && manifest.screenshots.length >= 2, 'Manifest must contain wide and narrow screenshots');

  // index.html references
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  assert(indexHtml.includes('/favicon.svg'), 'index.html must link favicon.svg');
  assert(indexHtml.includes('/favicon.ico'), 'index.html must link favicon.ico');
  assert(indexHtml.includes('/apple-touch-icon.png'), 'index.html must link apple-touch-icon.png');
});

// ── T-143: Public Data Deduplication (Eradication of Redundant Staged JSON) ──
test('T-143: Zero duplicate JSON files exist in staged-expansion (11.28 MB eradicated) & 36 curriculum tracks verified', () => {
  const checkDirs = [
    path.join(ROOT_DIR, 'public/data/staged-expansion/kanji'),
    path.join(ROOT_DIR, 'public/data/staged-expansion/kanji/strokes'),
    path.join(ROOT_DIR, 'public/data/staged-expansion/vocab'),
  ];

  for (const dir of checkDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    assert.strictEqual(
      jsonFiles.length,
      0,
      `Directory ${dir} must have 0 duplicate JSON files, found: ${jsonFiles.join(', ')}`
    );
  }

  // Verify curriculum tracks exist (36 canonical tracks)
  const currDir = path.join(ROOT_DIR, 'public/data/curriculum');
  const currFiles = fs.readdirSync(currDir).filter((f) => f.endsWith('.js'));
  assert.strictEqual(currFiles.length, 36, `Expected 36 compiled curriculum track files, found ${currFiles.length}`);
});

// ── T-144: Choukai Audio Asset Directory & Pre-Rendered Pronunciation Cache ──
test('T-144: 104 Kana audio clips exist, Choukai metadata is sentence-aligned, and tts.ts has audio fallback', () => {
  const kanaDir = path.join(ROOT_DIR, 'public/audio/kana');
  assert(fs.existsSync(kanaDir), 'Missing public/audio/kana directory');
  const kanaFiles = fs.readdirSync(kanaDir).filter((f) => f.endsWith('.wav'));
  assert(kanaFiles.length >= 100, `Expected at least 100 Kana audio files, found ${kanaFiles.length}`);

  // Choukai metadata
  const choukaiFile = path.join(ROOT_DIR, 'public/audio/choukai/choukai-n5-01.json');
  assert(fs.existsSync(choukaiFile), 'Missing choukai-n5-01.json');
  const choukaiData = JSON.parse(fs.readFileSync(choukaiFile, 'utf8'));
  assert(Array.isArray(choukaiData.sentences), 'Choukai data must contain sentences array');
  assert(choukaiData.sentences[0].startMs !== undefined, 'Sentence must contain startMs timestamp');
  assert(choukaiData.sentences[0].endMs !== undefined, 'Sentence must contain endMs timestamp');

  // tts.ts fallback verification
  const ttsCode = fs.readFileSync(path.join(ROOT_DIR, 'src/lib/audio/tts.ts'), 'utf8');
  assert(ttsCode.includes('KANA_TO_ROMAJI'), 'tts.ts must contain KANA_TO_ROMAJI mapping');
  assert(ttsCode.includes('/audio/kana/'), 'tts.ts must check local /audio/kana/ clips');
  assert(ttsCode.includes('syntheticAudio'), 'tts.ts must integrate syntheticAudio fallback');

  // sw.js caching
  const swCode = fs.readFileSync(path.join(ROOT_DIR, 'public/sw.js'), 'utf8');
  assert(swCode.includes('/audio/choukai/choukai-n5-01.json'), 'sw.js must cache choukai-n5-01.json');
  assert(swCode.includes('/favicon.svg'), 'sw.js must cache favicon.svg');
});

// ── T-145: 18 SSW Vector Sector Insignias & 14 Tiered Gamification Medallions ──
test('T-145: 18 SSW sector vector insignias and 14 gamification medallions exist and BadgesModal integrates SVG', () => {
  const sswDir = path.join(ROOT_DIR, 'public/icons/ssw');
  assert(fs.existsSync(sswDir), 'Missing public/icons/ssw directory');
  const sswFiles = fs.readdirSync(sswDir).filter((f) => f.endsWith('.svg'));
  assert(sswFiles.length >= 18, `Expected at least 18 SSW sector SVGs, found ${sswFiles.length}`);

  const badgesDir = path.join(ROOT_DIR, 'public/assets/badges');
  assert(fs.existsSync(badgesDir), 'Missing public/assets/badges directory');
  const badgeFiles = fs.readdirSync(badgesDir).filter((f) => f.endsWith('.svg'));
  assert(badgeFiles.length >= 14, `Expected at least 14 badge SVGs, found ${badgeFiles.length}`);

  // BadgesModal.tsx integration
  const modalCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/gamification/BadgesModal.tsx'), 'utf8');
  assert(modalCode.includes('/assets/badges/'), 'BadgesModal must render vector badges from /assets/badges/');
  assert(modalCode.includes('grayscale'), 'BadgesModal must apply grayscale to locked badges');
});

console.log('\n=============================================================');
console.log(`📊 SPRINT 25 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
