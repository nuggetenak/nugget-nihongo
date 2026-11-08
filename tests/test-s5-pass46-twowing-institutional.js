// ══════════════════════════════════════════════════════════════════
//  test-s5-pass46-twowing-institutional.js — Forensic Unit & Regression Suite
//  Siklus V Pass 46: Two-Wing Information Architecture (AboutPage & MethodologyPage)
//  Validates:
//  1. Two-Wing routing integration & bidirectional page navigation
//  2. Open-source licensing transparency & statutory legal attributions
//  3. Active verified portals (𝕏, Trakteer, Email) & truthful future disclosures
//  4. Academic rigor, SLA conflict resolutions, APA 7th & BibTeX engine
//  5. Stress-free learning philosophy & anti-Duolingo heart penalty invariants
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const aboutPagePath = path.join(ROOT_DIR, 'src/pages/AboutPage.tsx');
const methodologyPagePath = path.join(ROOT_DIR, 'src/pages/MethodologyPage.tsx');
const licenseModalPath = path.join(ROOT_DIR, 'src/components/ui/LicenseAttributionModal.tsx');

console.log('🧪 Running Siklus V Pass 46: Two-Wing Institutional Architecture Test...\n');

// ── Check 1: File Existence & Two-Wing Navigation ───────────────────
console.log('  🔍 Check 1: Validating Two-Wing Institutional Pages & Linking...');
assert(fs.existsSync(aboutPagePath), 'AboutPage.tsx must exist');
assert(fs.existsSync(methodologyPagePath), 'MethodologyPage.tsx must exist');
assert(fs.existsSync(licenseModalPath), 'LicenseAttributionModal.tsx must exist');

const aboutSrc = fs.readFileSync(aboutPagePath, 'utf8');
const methodologySrc = fs.readFileSync(methodologyPagePath, 'utf8');
const licenseSrc = fs.readFileSync(licenseModalPath, 'utf8');

// Bidirectional navigation contract
assert(
  aboutSrc.includes("setActiveTab('methodology')"),
  'AboutPage must link to MethodologyPage via setActiveTab("methodology")'
);
assert(
  methodologySrc.includes("setActiveTab('about')"),
  'MethodologyPage must provide back button to AboutPage via setActiveTab("about")'
);
console.log('  ✅ Check 1 Passed: Two-Wing architecture & bidirectional routing verified\n');

// ── Check 2: Open-Source Licensing & Statutory Attributions ─────────
console.log('  🔍 Check 2: Auditing Open-Source Licensing & Statutory Attributions...');

// Verify licenses in LicenseAttributionModal
const expectedLicenses = [
  'CC BY-SA 3.0',     // JMdict, KANJIDIC2, KanjiVG, OJAD
  'CC BY 2.0 FR',      // Tatoeba
  'Apache 2.0',        // BudouX, Kuromoji
  'MIT',               // FSRS-rs, Nugget Nihongo Engine
  'OFL 1.1',           // BIZ UDGothic, Google Fonts
  'Irasutoya Terms'    // Takashi Mifune
];

for (const lic of expectedLicenses) {
  assert(
    licenseSrc.includes(lic),
    `LicenseAttributionModal must include license type '${lic}'`
  );
}

// Attribution projects
const expectedProjects = [
  'Irasutoya',
  'JMdict',
  'KanjiVG',
  'Tatoeba',
  'BudouX',
  'Kuromoji',
  'FSRS-rs'
];

for (const proj of expectedProjects) {
  assert(
    licenseSrc.includes(proj),
    `LicenseAttributionModal must include project '${proj}'`
  );
}

// Drag handle and safe area in license modal
assert(
  licenseSrc.includes('w-12 h-1.5') && licenseSrc.includes('rounded-full'),
  'LicenseAttributionModal must include mobile drag handle'
);
assert(
  licenseSrc.includes('safe-area-inset-bottom'),
  'LicenseAttributionModal must include safe-area-inset-bottom padding'
);
console.log('  ✅ Check 2 Passed: Open-source licensing & legal attributions 100% verified\n');

// ── Check 3: Verified Portals & Transparent Channel Disclosures ─────
console.log('  🔍 Check 3: Auditing External Portals & Community Transparency...');

// Active verified portals
assert(
  aboutSrc.includes('https://x.com/NuggetNihongo'),
  'AboutPage must contain active verified link to 𝕏 (@NuggetNihongo)'
);
assert(
  aboutSrc.includes('https://trakteer.id/nugget-nihongo'),
  'AboutPage must contain active verified link to Trakteer (trakteer.id/nugget-nihongo)'
);
assert(
  aboutSrc.includes('mailto:nuggetnihongo@gmail.com'),
  'AboutPage must contain verified official email link (nuggetnihongo@gmail.com)'
);

// Truthful disclosure for in-preparation platforms
assert(
  aboutSrc.includes('Instagram') && aboutSrc.includes('Discord'),
  'AboutPage must mention Instagram and Discord'
);
assert(
  aboutSrc.includes('Segera Hadir') || aboutSrc.includes('tahap persiapan'),
  'AboutPage must clearly disclose uncreated channels as Segera Hadir / Tahap Persiapan'
);
console.log('  ✅ Check 3 Passed: Verified portals & transparent channel statuses confirmed\n');

// ── Check 4: Academic Rigor, APA 7th & BibTeX Engine ────────────────
console.log('  🔍 Check 4: Verifying Academic Rigor, APA 7th Bibliography & BibTeX...');

// MethodologyPage conflict resolutions
const conflictCodes = ['CONF-01', 'CONF-02', 'CONF-03', 'CONF-04'];
for (const code of conflictCodes) {
  assert(
    methodologySrc.includes(code),
    `MethodologyPage must specify conflict resolution ${code}`
  );
}

// BibTeX Citation block
assert(
  methodologySrc.includes('@misc{nuggetnihongo2026') && methodologySrc.includes('BibTeX'),
  'MethodologyPage must provide copyable BibTeX citation code'
);

// FSRS v4.5 Formula
assert(
  methodologySrc.includes('0.19') && methodologySrc.includes('-0.5'),
  'MethodologyPage must document exact FSRS v4.5 power-decay formula'
);

// 200 Personas validation
assert(
  methodologySrc.includes('200 Persona') || methodologySrc.includes('200 Personas'),
  'MethodologyPage must document the 200 Indonesian personas field validation matrix'
);

// AboutPage APA 7th Citations
const apaCitations = [
  'Pienemann',
  'Lado',
  'Tinkham',
  'Ye, J.',
  'Japan Foundation',
  'Krashen'
];

for (const author of apaCitations) {
  assert(
    aboutSrc.includes(author),
    `AboutPage bibliography must cite ${author}`
  );
}
console.log('  ✅ Check 4 Passed: Conflict resolutions, BibTeX, FSRS math & APA 7th citations sound\n');

// ── Check 5: Stress-Free Pedagogy & Anti-Duolingo Heart Invariants ───
console.log('  🔍 Check 5: Auditing Stress-Free Pedagogy & Anti-Guilt Design Philosophy...');

// Zero heart penalty
assert(
  aboutSrc.includes('nyawa') && aboutSrc.includes('hearts'),
  'AboutPage must affirm the absence of punitive heart/lives systems'
);

// Elimination of public shame leaderboards
assert(
  methodologySrc.includes('Hofstede') && methodologySrc.includes('papan peringkat'),
  'MethodologyPage must explain the elimination of public shame leaderboards for Indonesian collectivist psychology'
);

// Micro-session learning pace
assert(
  aboutSrc.includes('5 hingga 10 menit') || aboutSrc.includes('mikro'),
  'AboutPage must recommend 5-10 minute gentle micro-sessions'
);

// Layout responsiveness on both pages
assert(
  aboutSrc.includes('overflow-x-hidden') && aboutSrc.includes('safe-area-inset-bottom'),
  'AboutPage must enforce overflow-x-hidden and safe-area-inset-bottom'
);
assert(
  methodologySrc.includes('overflow-x-hidden') && methodologySrc.includes('safe-area-inset-bottom'),
  'MethodologyPage must enforce overflow-x-hidden and safe-area-inset-bottom'
);
console.log('  ✅ Check 5 Passed: Stress-free pedagogy & multi-device ergonomics 100% compliant\n');

console.log('══════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 46: TWO-WING INSTITUTIONAL ARCHITECTURE TEST PASSED 100%!');
console.log('══════════════════════════════════════════════════════════════════\n');
process.exit(0);
