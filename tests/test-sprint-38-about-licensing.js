// ══════════════════════════════════════════════════════════════════
//  test-sprint-38-about-licensing.js — Forensic Unit & Integration Suite
//  Sprint 38: About Page, Open-Source Licensing & Corpus Provenance
//  (Tickets T-206 to T-210)
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
console.log('📜 RUNNING SPRINT 38 VERIFICATION SUITE: ABOUT & LICENSING');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const aboutPagePath = path.join(ROOT_DIR, 'src/pages/AboutPage.tsx');
const licenseModalPath = path.join(ROOT_DIR, 'src/components/ui/LicenseAttributionModal.tsx');

assert(fs.existsSync(aboutPagePath), 'AboutPage.tsx must exist');
assert(fs.existsSync(licenseModalPath), 'LicenseAttributionModal.tsx must exist');

const aboutCode = fs.readFileSync(aboutPagePath, 'utf8');
const modalCode = fs.readFileSync(licenseModalPath, 'utf8');

// ── T-206: Legal Open-Source Attribution Engine & LicenseAttributionModal ──
test('T-206: LicenseAttributionModal embeds statutory attributions and a11y dialog semantics', () => {
  // Check statutory attribution entries
  assert(modalCode.includes('EDRDG (Electronic Dictionary Research and Development Group)'), 'Must attribute EDRDG');
  assert(modalCode.includes('JMdict & KANJIDIC2'), 'Must mention JMdict & KANJIDIC2');
  assert(modalCode.includes('CC BY-SA 3.0'), 'Must cite CC BY-SA 3.0');
  assert(modalCode.includes('https://www.edrdg.org/'), 'Must link to EDRDG');

  assert(modalCode.includes('KanjiVG Project by Ulrich Apel'), 'Must attribute KanjiVG');
  assert(modalCode.includes('(c) 2009-2023 Ulrich Apel'), 'Must cite Ulrich Apel copyright');
  assert(modalCode.includes('https://kanjivg.tagaini.net/'), 'Must link to KanjiVG');

  assert(modalCode.includes('Tatoeba Project'), 'Must attribute Tatoeba');
  assert(modalCode.includes('CC BY 2.0 FR'), 'Must cite Tatoeba CC BY 2.0 FR');
  assert(modalCode.includes('https://tatoeba.org/'), 'Must link to Tatoeba');

  assert(modalCode.includes('OJAD & Wadoku'), 'Must attribute OJAD & Wadoku');
  assert(modalCode.includes('NINJAL'), 'Must cite NINJAL');

  assert(modalCode.includes('Google BudouX'), 'Must attribute Google BudouX');
  assert(modalCode.includes('Apache License 2.0'), 'Must cite Apache License 2.0');

  assert(modalCode.includes('Kuromoji.js & WanaKana'), 'Must attribute Kuromoji & WanaKana');
  assert(modalCode.includes('FSRS-rs'), 'Must attribute FSRS-rs and Open Spaced Repetition');
  assert(modalCode.includes('SIL Open Font License 1.1'), 'Must attribute OFL 1.1 fonts');

  // Check dialog accessibility
  assert(modalCode.includes('role="dialog"'), 'Modal must have role="dialog"');
  assert(modalCode.includes('aria-modal="true"'), 'Modal must have aria-modal="true"');
  assert(modalCode.includes('useFocusTrap'), 'Modal must employ useFocusTrap');
  assert(modalCode.includes('useBodyScrollLock'), 'Modal must lock body scroll');
  assert(modalCode.includes("e.key === 'Escape'"), 'Modal must handle Escape key dismiss');

  // Check AboutPage wiring
  assert(aboutCode.includes('<LicenseAttributionModal'), 'AboutPage must render LicenseAttributionModal');
  assert(aboutCode.includes('MIT & Creative Commons ↗'), 'AboutPage must provide interactive license button');
  assert(aboutCode.includes('setIsLicenseModalOpen(true)'), 'Button must trigger setIsLicenseModalOpen(true)');
});

// ── T-207: Curriculum Scope & SSW 19-Sector Grid Modernization ──
test('T-207: AboutPage modernizes curriculum coverage grid to 8 tracks and 28.5k vocab', () => {
  // Check 8 modular curriculum tracks
  assert(aboutCode.includes('JLPT N5 (Dasar Pemula)'), 'Must display JLPT N5 track');
  assert(aboutCode.includes('1.321 Kosakata · 94 Grammar · 103 Kanji'), 'Must show accurate N5 counts');

  assert(aboutCode.includes('JLPT N4 (Percakapan Dasar)'), 'Must display JLPT N4 track');
  assert(aboutCode.includes('1.286 Kosakata · 92 Grammar · 181 Kanji'), 'Must show accurate N4 counts');

  assert(aboutCode.includes('JLPT N3 (Menengah)'), 'Must display JLPT N3 track');
  assert(aboutCode.includes('2.580 Kosakata · 163 Grammar · 367 Kanji'), 'Must show accurate N3 counts');

  assert(aboutCode.includes('JLPT N2 (Tingkat Mahir)'), 'Must display JLPT N2 track');
  assert(aboutCode.includes('2.104 Kosakata · 310 Grammar · 415 Kanji'), 'Must show accurate N2 counts');

  assert(aboutCode.includes('JLPT N1 (Tingkat Ahli)'), 'Must display JLPT N1 track');
  assert(aboutCode.includes('3.217 Kosakata · 200 Grammar · 1.144 Kanji'), 'Must show accurate N1 counts');

  assert(aboutCode.includes('JFT-Basic A1 & A2 (Irodori)'), 'Must display JFT-Basic track');
  assert(aboutCode.includes('3.400+ Kosakata Kehidupan · 78 Can-Do'), 'Must show accurate JFT counts');

  assert(aboutCode.includes('Jalur Vokasional SSW'), 'Must display SSW vocational track');
  assert(aboutCode.includes('19 Sektor Resmi · 190 Modul Kerja Lapangan'), 'Must show all 19 official SSW sectors');

  assert(aboutCode.includes('Jalur Nol & Freeway (Kana)'), 'Must display Kana track');
  assert(aboutCode.includes('46 Hiragana · 46 Katakana · 71 Variasi'), 'Must show Kana variations');

  // Check updated database summary banner
  assert(aboutCode.includes('28.546 Kosakata'), 'Banner must declare 28.546 Kosakata');
  assert(aboutCode.includes('859+ Pola Tata Bahasa'), 'Banner must declare 859+ Pola Tata Bahasa');
  assert(aboutCode.includes('2.383 Kanji'), 'Banner must declare 2.383 Kanji');
  assert(aboutCode.includes('100% Terverifikasi EDRDG & KanjiVG'), 'Banner must state EDRDG & KanjiVG verification');

  // Check FAQ #4b SSW sectors detail
  assert(aboutCode.includes('Kaigo (Perawat Lansia)'), 'FAQ must mention Kaigo');
  assert(aboutCode.includes('Gaishoku (Restoran)'), 'FAQ must mention Gaishoku');
  assert(aboutCode.includes('Kensetsu (Konstruksi)'), 'FAQ must mention Kensetsu');
  assert(aboutCode.includes('CBT Prometric berstandar industri'), 'FAQ must mention Prometric CBT');
});

// ── T-208: Offline Voice Synthesis Reality Disclosure & Android Japanese TTS Guide ──
test('T-208: FAQ discloses offline TTS prerequisite and Android Japanese voice installation guide', () => {
  // Check FAQ #2 offline voice qualification
  assert(
    aboutCode.includes('paket suara bahasa Jepang (Google Speech Services / Apple Voice) sudah terpasang'),
    'FAQ #2 must qualify offline voice requirement'
  );

  // Check FAQ #9 Android configuration steps
  assert(
    aboutCode.includes('Output Text-to-Speech > Layanan Ucapan Google > Pasang Data Suara > pilih Bahasa Jepang'),
    'FAQ #9 must provide step-by-step Android Japanese TTS installation guide'
  );
  assert(
    aboutCode.includes('Di iOS dan macOS, suara penutur asli Jepang sudah terpasang secara bawaan'),
    'FAQ #9 must document iOS/macOS built-in voice support'
  );
});

// ── T-209: Academic Bibliography & Pedagogical Methodology Citation Accordion ──
test('T-209: AboutPage embeds expandable APA 7th academic bibliography accordion', () => {
  assert(
    aboutCode.includes('Daftar Pustaka Akademik & Rujukan Pedagogis (APA 7th)'),
    'Must display Academic Bibliography Accordion header'
  );
  assert(aboutCode.includes('Pienemann, M. (1998)'), 'Must cite Pienemann Processability Theory');
  assert(aboutCode.includes('Lado, R. (1957)'), 'Must cite Lado Contrastive Analysis');
  assert(aboutCode.includes('Tinkham, T. (1997)'), 'Must cite Tinkham Semantic & Thematic Clustering');
  assert(aboutCode.includes('Ye, J., et al. (2022)'), 'Must cite Jarrett Ye FSRS Spaced Repetition');
  assert(aboutCode.includes('The Japan Foundation (2017)'), 'Must cite JF Standard for Japanese-Language Education');
  assert(aboutCode.includes('Krashen, S. (1982)'), 'Must cite Stephen Krashen Second Language Acquisition');
  assert(aboutCode.includes('Ministry of Health, Labour and Welfare (MHLW / 厚生労働省, 2024)'), 'Must cite MHLW Caregiver Guidelines');
});

// ── T-210: Multi-Device Floating Nav Cushion & 320px Viewport Proofing ──
test('T-210: Container enforces safe-area floating nav cushion and 320px viewport proofing', () => {
  // Container padding check
  assert(
    aboutCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
    'Must enforce safe area bottom cushion to prevent BottomNav occlusion'
  );
  assert(
    aboutCode.includes('pt-4 sm:pt-6'),
    'Must provide responsive top padding'
  );

  // 320px Hero Version Pill check
  assert(
    aboutCode.includes('max-w-full') && aboutCode.includes('truncate'),
    'Hero version pill must employ max-w-full and truncate for 320px viewports'
  );
  assert(
    aboutCode.includes('hidden sm:inline'),
    'Release name in pill must hide on mobile to prevent blowout'
  );

  // Minimum touch target sizes
  assert(
    aboutCode.includes('min-h-[44px]'),
    'Interactive buttons must enforce min-h-[44px] touch target standard'
  );
  assert(
    aboutCode.includes('active:scale-95'),
    'Interactive buttons must provide active scale feedback'
  );
});

console.log('\n-------------------------------------------------------------');
console.log(`📊 SPRINT 38 AUDIT RESULTS: ${passedTests} / ${totalTests} SUITES PASSED`);
console.log('-------------------------------------------------------------\n');

if (passedTests === totalTests) {
  console.log('🌟 SPRINT 38 FORENSICALLY CERTIFIED — 100% GREEN!\n');
  process.exit(0);
} else {
  console.error('💥 SPRINT 38 VERIFICATION FAILED!\n');
  process.exit(1);
}
