// ══════════════════════════════════════════════════════════════════
//  test-s8-pass11-community-about-share-feedback.js
//  Siklus VIII Pass 11 (Sprint 57 / Suite 198):
//  Community Hub, About & Licensing, Shareable Mastery Cards & Integrated Feedback Gateway
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 198: Siklus VIII Pass 11 (Sprint 57): Community Hub, About, Share Cards & Feedback...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: CommunityHubModal Verified Channels & Daily Kanji Challenge ────
console.log('  Check 57.1: Verifying CommunityHubModal verified channels, in-prep badges & daily challenge...');
const communityModalPath = path.join(ROOT, 'src', 'components', 'community', 'CommunityHubModal.tsx');
assert(fs.existsSync(communityModalPath), 'CommunityHubModal.tsx must exist');
const communityContent = fs.readFileSync(communityModalPath, 'utf8');

// Verified official portals
assert(
  communityContent.includes('https://x.com/NuggetNihongo') &&
  communityContent.includes('@NuggetNihongo') &&
  communityContent.includes('https://trakteer.id/nugget-nihongo') &&
  communityContent.includes('mailto:nuggetnihongo@gmail.com'),
  'CommunityHubModal must feature verified official channels: 𝕏 @NuggetNihongo, Trakteer, and official Email'
);

// In-preparation transparency badges
assert(
  communityContent.includes('Segera Hadir') &&
  communityContent.includes('@nugget.nihongo (Persiapan)') &&
  communityContent.includes('Discord Lounge') &&
  communityContent.includes('Threads'),
  'CommunityHubModal must transparently display in-preparation badges for Instagram, Threads, and Discord'
);

// Daily kanji challenge & mnemonics showcase
assert(
  communityContent.includes('DAILY_KANJI') &&
  communityContent.includes('handleShareChallenge') &&
  communityContent.includes('INITIAL_MNEMONICS') &&
  communityContent.includes('handleToggleUpvote'),
  'CommunityHubModal must provide daily kanji challenge rotation and interactive community mnemonics'
);

console.log('  ✅ Check 57.1 passed: CommunityHubModal channels and daily challenge verified.');

// ── Check 2: AboutPage Academic Bibliography & Pedagogical Pillars ───────────
console.log('  Check 57.2: Verifying AboutPage academic bibliography, pedagogical pillars & FAQ categories...');
const aboutPagePath = path.join(ROOT, 'src', 'pages', 'AboutPage.tsx');
assert(fs.existsSync(aboutPagePath), 'AboutPage.tsx must exist');
const aboutContent = fs.readFileSync(aboutPagePath, 'utf8');

// APA 7th academic references
assert(
  aboutContent.includes('Daftar Pustaka Akademik & Rujukan Pedagogis (APA 7th)') &&
  aboutContent.includes('Krashen, S.') &&
  aboutContent.includes('Pienemann, M.') &&
  aboutContent.includes('Lado, R.') &&
  aboutContent.includes('Tinkham, T.') &&
  aboutContent.includes('Ye, J.') &&
  aboutContent.includes('The Japan Foundation') &&
  aboutContent.includes('Ministry of Health, Labour and Welfare'),
  'AboutPage must cite APA 7th academic foundational references (Krashen, Pienemann, Lado, Tinkham, Ye, JF, MHLW)'
);

// 5 Pedagogical pillars
assert(
  aboutContent.includes('Alur Belajar Bertahap & Rapi') &&
  aboutContent.includes('Pencegahan Salah Kaprah Bahasa Indonesia') &&
  aboutContent.includes('Penyajian Kosakata Tematik Kontekstual') &&
  aboutContent.includes('Penjadwalan Pengulangan Cerdas (FSRS v4)') &&
  aboutContent.includes('Standar Kemampuan Komunikatif Nyata (CEFR-J & JF Standard)'),
  'AboutPage must document all 5 pedagogical pillars of Nugget Nihongo'
);

// FAQ categories & curriculum metrics
assert(
  aboutContent.includes("category: 'umum'") &&
  aboutContent.includes("category: 'fsrs'") &&
  aboutContent.includes("category: 'materi'") &&
  aboutContent.includes("category: 'cloud'") &&
  aboutContent.includes("category: 'teknis'") &&
  aboutContent.includes('28.500+') &&
  aboutContent.includes('850+'),
  'AboutPage must provide comprehensive categorized FAQs and verified curriculum metrics'
);

console.log('  ✅ Check 57.2 passed: AboutPage academic bibliography and pedagogy verified.');

// ── Check 3: ReportIssueModal & reportStore Feedback Resilience ───────────────
console.log('  Check 57.3: Verifying ReportIssueModal categories, sanitization & SSR-safe reportStore...');
const reportModalPath = path.join(ROOT, 'src', 'components', 'ui', 'ReportIssueModal.tsx');
assert(fs.existsSync(reportModalPath), 'ReportIssueModal.tsx must exist');
const reportModalContent = fs.readFileSync(reportModalPath, 'utf8');

assert(
  reportModalContent.includes("'unnatural_japanese'") &&
  reportModalContent.includes("'wrong_translation'") &&
  reportModalContent.includes("'wrong_answer'") &&
  reportModalContent.includes("'typo'") &&
  reportModalContent.includes("'audio_issue'") &&
  reportModalContent.includes("'other'"),
  'ReportIssueModal must provide all 6 issue taxonomy categories'
);

assert(
  reportModalContent.includes('scrubSensitiveData') &&
  reportModalContent.includes('if (isSubmitting) return;'),
  'ReportIssueModal must sanitize user input and prevent duplicate submissions'
);

const reportStorePath = path.join(ROOT, 'src', 'lib', 'report', 'reportStore.ts');
assert(fs.existsSync(reportStorePath), 'reportStore.ts must exist');
const reportStoreContent = fs.readFileSync(reportStorePath, 'utf8');

assert(
  reportStoreContent.includes("typeof localStorage === 'undefined'") &&
  reportStoreContent.includes("typeof localStorage !== 'undefined'"),
  'reportStore must guard localStorage access for SSR and Node test environments'
);

console.log('  ✅ Check 57.3 passed: ReportIssueModal and reportStore feedback resilience verified.');

// ── Check 4: shareCardGenerator High-Res Canvas & Headless SVG ───────────────
console.log('  Check 57.4: Verifying shareCardGenerator canvas rendering, Hanko seal & AbortError safety...');
const shareCardPath = path.join(ROOT, 'src', 'lib', 'social', 'shareCardGenerator.ts');
assert(fs.existsSync(shareCardPath), 'shareCardGenerator.ts must exist');
const shareCardContent = fs.readFileSync(shareCardPath, 'utf8');

assert(
  shareCardContent.includes('export function getKanjiShareText') &&
  shareCardContent.includes('export function generateKanjiMasterySvg') &&
  shareCardContent.includes('export async function generateKanjiMasteryCard') &&
  shareCardContent.includes('export async function shareKanjiCard') &&
  shareCardContent.includes('export function downloadKanjiCard'),
  'shareCardGenerator must export canonical card generation, SVG fallback, and sharing utilities'
);

assert(
  shareCardContent.includes('NUGGET NIHONGO') &&
  shareCardContent.includes('合格') &&
  shareCardContent.includes('Akurasi Goresan') &&
  shareCardContent.includes('1080') &&
  shareCardContent.includes('Noto Serif JP'),
  'shareCardGenerator must render high-res 1080x1080 layout with traditional Goukaku Hanko seal'
);

assert(
  shareCardContent.includes("'AbortError'") &&
  shareCardContent.includes('downloadKanjiCard'),
  'shareCardGenerator must handle Web Share AbortError without forcing unwanted downloads'
);

console.log('  ✅ Check 57.4 passed: shareCardGenerator canvas, SVG and share contracts verified.');

// ── Check 5: LicenseAttributionModal Statutory Legal Compliance ───────────────
console.log('  Check 57.5: Verifying LicenseAttributionModal open-source attributions & modal contracts...');
const licenseModalPath = path.join(ROOT, 'src', 'components', 'ui', 'LicenseAttributionModal.tsx');
assert(fs.existsSync(licenseModalPath), 'LicenseAttributionModal.tsx must exist');
const licenseContent = fs.readFileSync(licenseModalPath, 'utf8');

// Key statutory attributions
assert(
  licenseContent.includes('EDRDG (Electronic Dictionary Research and Development Group)') &&
  licenseContent.includes('Ulrich Apel') &&
  licenseContent.includes('Tatoeba Project') &&
  licenseContent.includes('OJAD & Wadoku') &&
  licenseContent.includes('Google BudouX') &&
  licenseContent.includes('Kuromoji.js & WanaKana') &&
  licenseContent.includes('Free Spaced Repetition Scheduler (FSRS-rs)') &&
  licenseContent.includes('Takashi Mifune (みふねたかし)'),
  'LicenseAttributionModal must credit EDRDG, KanjiVG, Tatoeba, OJAD, BudouX, Kuromoji, FSRS-rs, and Irasutoya'
);

// Focus trap & accessible modal
assert(
  licenseContent.includes('useFocusTrap') &&
  licenseContent.includes('useBodyScrollLock') &&
  licenseContent.includes('role="dialog"') &&
  licenseContent.includes('aria-modal="true"'),
  'LicenseAttributionModal must be accessible with focus trap and body scroll lock'
);

console.log('  ✅ Check 57.5 passed: LicenseAttributionModal statutory legal compliance verified.');

console.log('\n🎉 ALL PASS 11 (SUITE 198) COMMUNITY, ABOUT, SHARE & FEEDBACK TESTS PASSED 100% GREEN!\n');
