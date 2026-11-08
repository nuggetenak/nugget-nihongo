const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../../nugget-nihongo/node_modules/typescript'));

const headerPath = path.resolve(__dirname, '../../../nugget-nihongo/src/components/layout/Header.tsx');
const headerContent = fs.readFileSync(headerPath, 'utf8');

console.log('--- Current Header.tsx behavior ---');
const matchCurrent = headerContent.match(/const getTrackDisplay = \([\s\S]*?\n  \};/);
if (!matchCurrent) {
  console.error('Failed to match getTrackDisplay in current Header.tsx');
} else {
  const transpiled = ts.transpileModule(matchCurrent[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const fn = new Function('trackId', transpiled + '\nreturn getTrackDisplay(trackId);');
  try {
    fn(undefined);
  } catch (e) {
    console.log('Current throws on undefined:', e.message);
  }
}

console.log('\n--- Proposed Patched getTrackDisplay behavior ---');
// Proposed replacement
const proposed = `  // Track Display Information
  const getTrackDisplay = (trackId?: TrackId | string | null) => {
    if (!trackId || typeof trackId !== 'string') {
      return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
    switch (trackId) {
      case 'n5':
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
      case 'n4':
        return { flag: '🇯🇵', full: 'N4: Percakapan Harian', short: 'N4', icon: '🌿' };
      case 'n3':
        return { flag: '🇯🇵', full: 'N3: Menengah', short: 'N3', icon: '🌊' };
      case 'n2':
        return { flag: '🇯🇵', full: 'N2: Pra-Lanjutan', short: 'N2', icon: '⛰️' };
      case 'n1':
        return { flag: '🇯🇵', full: 'N1: Mahir', short: 'N1', icon: '⛩️' };
      case 'ssw-kaigo':
        return { flag: '👵', full: 'SSW: Kaigo (Lansia)', short: 'Kaigo', icon: '👵' };
      case 'ssw-food':
        return { flag: '🍱', full: 'SSW: Pabrik Makanan', short: 'Food', icon: '🍱' };
      case 'ssw-construction':
        return { flag: '👷', full: 'SSW: Konstruksi K3', short: 'Kensetsu', icon: '👷' };
      case 'ssw-agriculture':
        return { flag: '🌱', full: 'SSW: Pertanian', short: 'Nogyo', icon: '🌱' };
      case 'ssw-accommodation':
        return { flag: '🏨', full: 'SSW: Perhotelan', short: 'Hotel', icon: '🏨' };
      case 'ssw-building-cleaning':
        return { flag: '🧹', full: 'SSW: Pembersihan', short: 'Cleaning', icon: '🧹' };
      case 'jft-a1':
        return { flag: '🎌', full: 'JFT: Basic A1', short: 'JFT-A1', icon: '🎌' };
      case 'jft-a2':
        return { flag: '🎌', full: 'JFT: Basic A2', short: 'JFT-A2', icon: '🎌' };
      case 'seikatsu':
        return { flag: '🏮', full: 'Hidup di Jepang', short: 'Seikatsu', icon: '🏮' };
      case 'book-genki':
        return { flag: '📘', full: 'Buku: GENKI', short: 'Genki', icon: '📘' };
      case 'book-minna':
        return { flag: '📙', full: 'Buku: Minna', short: 'Minna', icon: '📙' };
      default:
        if (trackId.startsWith('ssw-')) {
          const sector = trackId.replace('ssw-', '');
          return { flag: '⚙️', full: \`SSW: \${sector}\`, short: 'SSW', icon: '⚙️' };
        }
        if (trackId.startsWith('book-')) {
          const title = trackId.replace('book-', '');
          return { flag: '📚', full: \`Buku: \${title}\`, short: 'Buku', icon: '📚' };
        }
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
  };`;

const patchedHeaderContent = headerContent.replace(matchCurrent[0], proposed.trim());
const matchProposed = patchedHeaderContent.match(/const getTrackDisplay = \([\s\S]*?\n  \};/);
if (!matchProposed) {
  console.error('Failed to match proposed getTrackDisplay regex!');
} else {
  const transpiled = ts.transpileModule(matchProposed[0], { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const fn = new Function('trackId', transpiled + '\nreturn getTrackDisplay(trackId);');
  
  const testInputs = [
    { input: undefined, label: 'undefined' },
    { input: null, label: 'null' },
    { input: '', label: 'empty string ""' },
    { input: 0, label: 'number 0' },
    { input: {}, label: 'object {}' },
    { input: 'n5', label: 'JLPT n5' },
    { input: 'n4', label: 'JLPT n4' },
    { input: 'n3', label: 'JLPT n3' },
    { input: 'n2', label: 'JLPT n2' },
    { input: 'n1', label: 'JLPT n1' },
    { input: 'ssw-kaigo', label: 'SSW Kaigo' },
    { input: 'ssw-food', label: 'SSW Food' },
    { input: 'ssw-construction', label: 'SSW Construction' },
    { input: 'ssw-agriculture', label: 'SSW Agriculture' },
    { input: 'ssw-accommodation', label: 'SSW Accommodation' },
    { input: 'ssw-building-cleaning', label: 'SSW Cleaning' },
    { input: 'ssw-manufacturing', label: 'SSW Manufacturing (generic ssw-)' },
    { input: 'jft-a1', label: 'JFT A1' },
    { input: 'jft-a2', label: 'JFT A2' },
    { input: 'seikatsu', label: 'Seikatsu' },
    { input: 'book-genki', label: 'Book Genki' },
    { input: 'book-minna', label: 'Book Minna' },
    { input: 'book-soumatome', label: 'Book Soumatome (generic book-)' },
    { input: 'arbitrary-corrupted', label: 'Unknown track id' }
  ];

  let allPassed = true;
  for (const t of testInputs) {
    try {
      const res = fn(t.input);
      if (!res || !res.flag || !res.full || !res.short || !res.icon) {
        console.error(`FAIL: ${t.label} returned malformed display:`, res);
        allPassed = false;
      } else {
        console.log(`PASS: ${t.label.padEnd(35)} -> [${res.flag}] ${res.full} (${res.short})`);
      }
    } catch (e) {
      console.error(`FAIL: ${t.label} threw:`, e);
      allPassed = false;
    }
  }

  console.log('\nAll inputs passed successfully:', allPassed);
}
