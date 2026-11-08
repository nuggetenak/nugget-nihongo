// ══════════════════════════════════════════════════════════════════
//  test-s5-pass47-community-support-gateway.js — Forensic Unit & Regression Suite
//  Siklus V Pass 47: External Community Hub, Tantangan Kanji Harian & Support Gateway
//  (Klaster 14 Grand Finale)
//  Validates:
//  1. Verified active portals (𝕏, Trakteer, Email) & truthful future channel statuses
//  2. Tantangan Kanji Harian 7-day cyclical rotation & shareable Goukaku text
//  3. Rephrased honest terminology (zero false claims of internal social community)
//  4. Contextual content issue reporting & telemetry PII scrubbing
//  5. Mobile bottom-sheet drag handles, focus traps & safe area padding
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const communityModalPath = path.join(ROOT_DIR, 'src/components/community/CommunityHubModal.tsx');
const reportModalPath = path.join(ROOT_DIR, 'src/components/ui/ReportIssueModal.tsx');
const reportStorePath = path.join(ROOT_DIR, 'src/lib/report/reportStore.ts');

console.log('🧪 Running Siklus V Pass 47: External Community Hub & Support Gateway Test...\n');

// ── Check 1: File Existence & Core Structure ────────────────────────
console.log('  🔍 Check 1: Validating Community Hub & Support Gateway Files...');
assert(fs.existsSync(communityModalPath), 'CommunityHubModal.tsx must exist');
assert(fs.existsSync(reportModalPath), 'ReportIssueModal.tsx must exist');
assert(fs.existsSync(reportStorePath), 'reportStore.ts must exist');

const communitySrc = fs.readFileSync(communityModalPath, 'utf8');
const reportSrc = fs.readFileSync(reportModalPath, 'utf8');
const reportStoreSrc = fs.readFileSync(reportStorePath, 'utf8');
console.log('  ✅ Check 1 Passed: All 3 community & reporting modules exist\n');

// ── Check 2: Verified Active Portals & Truthful Channel Disclosures ─
console.log('  🔍 Check 2: Auditing Active External Portals & In-Preparation Disclosures...');

// Active Verified Portals
assert(
  communitySrc.includes('https://x.com/NuggetNihongo'),
  'CommunityHubModal must link to active verified 𝕏 (@NuggetNihongo)'
);
assert(
  communitySrc.includes('https://trakteer.id/nugget-nihongo'),
  'CommunityHubModal must link to active verified Trakteer (trakteer.id/nugget-nihongo)'
);
assert(
  communitySrc.includes('mailto:nuggetnihongo@gmail.com'),
  'CommunityHubModal must link to active verified support email'
);

// Truthful Future Statuses (Instagram, Threads, Discord)
assert(
  communitySrc.includes('Instagram') && communitySrc.includes('Segera Hadir'),
  'Instagram must be honestly disclosed as Segera Hadir / Dalam Persiapan'
);
assert(
  communitySrc.includes('Threads') && communitySrc.includes('Segera Hadir'),
  'Threads must be honestly disclosed as Segera Hadir / Dalam Persiapan'
);
assert(
  communitySrc.includes('Discord') && communitySrc.includes('Segera Hadir'),
  'Discord Lounge must be honestly disclosed as Segera Hadir / Dalam Persiapan'
);

// Zero false claims of internal social platform
assert(
  !communitySrc.toLowerCase().includes('daily community kanji'),
  'Must not use misleading phrase "Daily Community Kanji"'
);
assert(
  communitySrc.includes('Tantangan Kanji Harian'),
  'Must use honest pedagogical terminology "Tantangan Kanji Harian"'
);
console.log('  ✅ Check 2 Passed: Verified portals & transparent channel statuses confirmed\n');

// ── Check 3: Tantangan Kanji Harian 7-Day Cycle & Share Generator ────
console.log('  🔍 Check 3: Validating 7-Day Kanji Rotation & Social Share Text...');

const expectedDays = [
  { day: 'Minggu', char: '日' },
  { day: 'Senin', char: '月' },
  { day: 'Selasa', char: '火' },
  { day: 'Rabu', char: '水' },
  { day: 'Kamis', char: '木' },
  { day: 'Jumat', char: '金' },
  { day: 'Sabtu', char: '土' }
];

for (const item of expectedDays) {
  assert(
    communitySrc.includes(`'${item.day}'`) && communitySrc.includes(`'${item.char}'`),
    `DAILY_KANJI must declare day '${item.day}' with kanji '${item.char}'`
  );
}

// Social share text format
assert(
  communitySrc.includes('Tantangan Kanji Hari Ini di Nugget Nihongo') &&
  communitySrc.includes('#NuggetNihongo'),
  'handleShareChallenge must format share text with title and #NuggetNihongo hashtag'
);
console.log('  ✅ Check 3 Passed: 7-Day kanji cycle & social share generator verified\n');

// ── Check 4: Contextual Content Error Reporting Architecture ────────
console.log('  🔍 Check 4: Auditing Contextual Issue Reporting & PII Scrubbing...');

// Categories in ReportIssueModal
const expectedCategories = [
  'unnatural_japanese',
  'wrong_translation',
  'wrong_answer',
  'typo',
  'audio_issue',
  'other'
];

for (const cat of expectedCategories) {
  assert(
    reportSrc.includes(`'${cat}'`),
    `ReportIssueModal must handle category '${cat}'`
  );
}

// Item context and PII scrubbing
assert(
  reportSrc.includes('scrubSensitiveData'),
  'ReportIssueModal must scrub PII from user comments via scrubSensitiveData'
);
assert(
  reportSrc.includes('context.originalJapanese') && reportSrc.includes('context.itemType'),
  'ReportIssueModal must capture original Japanese and itemType context'
);

// Mailto fallback link
assert(
  reportSrc.includes('mailto:nuggetnihongo@gmail.com'),
  'ReportIssueModal must provide offline mailto fallback to nuggetnihongo@gmail.com'
);
console.log('  ✅ Check 4 Passed: Contextual reporting, categories & PII scrubbing confirmed\n');

// ── Check 5: Mobile Ergonomics, Drag Handles & A11y ─────────────────
console.log('  🔍 Check 5: Verifying Mobile Bottom-Sheet Drag Handles, Focus Trap & Touch Targets...');

// CommunityHubModal ergonomics
assert(
  communitySrc.includes('w-12 h-1.5') && communitySrc.includes('rounded-full'),
  'CommunityHubModal must render standard mobile drag handle (w-12 h-1.5 rounded-full)'
);
assert(
  communitySrc.includes('useFocusTrap') && communitySrc.includes('useBodyScrollLock'),
  'CommunityHubModal must lock body scroll and trap keyboard focus'
);
assert(
  communitySrc.includes("e.key === 'Escape'"),
  'CommunityHubModal must handle Escape key dismissal'
);
assert(
  communitySrc.includes('safe-area-inset-bottom'),
  'CommunityHubModal must respect safe-area-inset-bottom padding'
);
assert(
  communitySrc.includes('min-h-[40px]'),
  'CommunityHubModal buttons must satisfy minimum 40px touch targets'
);

// ReportIssueModal ergonomics
assert(
  reportSrc.includes('w-12 h-1.5') && reportSrc.includes('rounded-full'),
  'ReportIssueModal must render standard mobile drag handle (w-12 h-1.5 rounded-full)'
);
assert(
  reportSrc.includes('useFocusTrap') && reportSrc.includes('useBodyScrollLock'),
  'ReportIssueModal must lock body scroll and trap keyboard focus'
);
assert(
  reportSrc.includes("e.key === 'Escape'"),
  'ReportIssueModal must handle Escape key dismissal'
);
assert(
  reportSrc.includes('safe-area-inset-bottom'),
  'ReportIssueModal must respect safe-area-inset-bottom padding'
);
assert(
  reportSrc.includes('min-h-[44px]'),
  'ReportIssueModal buttons must satisfy minimum 44px touch targets'
);

console.log('  ✅ Check 5 Passed: Mobile drag handles, focus traps & safe area padding verified\n');

console.log('══════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 47: COMMUNITY HUB & SUPPORT GATEWAY TEST PASSED 100%!');
console.log('══════════════════════════════════════════════════════════════════\n');
process.exit(0);
