// ══════════════════════════════════════════════════════════════════════
//  test-s6-pass5-community-official-portals.js
//  Siklus VI Pass 5: Penataan Kanal Resmi Komunitas (Hapus Upvote Palsu)
//  Verifies that CommunityHubModal is a transparent official portal
//  free from deceptive fake persona forum posts or fabricated upvote counters.
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Siklus VI Pass 5 — Official Community Portals & Anti-Fake Upvotes QA');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ PASS: ${message}`);
  passedTests++;
}

try {
  const modalPath = path.join(ROOT_DIR, 'src', 'components', 'community', 'CommunityHubModal.tsx');
  assert(fs.existsSync(modalPath), 'CommunityHubModal.tsx exists');
  const code = fs.readFileSync(modalPath, 'utf8');

  // Check 1: Verified official support links
  assert(
    code.includes('https://x.com/NuggetNihongo'),
    'CommunityHubModal links to verified X account (@NuggetNihongo)'
  );
  assert(
    code.includes('https://trakteer.id/nugget-nihongo'),
    'CommunityHubModal links to verified Trakteer creator support'
  );
  assert(
    code.includes('mailto:nuggetnihongo@gmail.com'),
    'CommunityHubModal provides direct email support link'
  );

  // Check 2: Strict anti-hallucination on unlaunched channels
  assert(
    code.includes('Segera Hadir') && code.includes('Instagram'),
    'Instagram is labeled as "Segera Hadir" (anti-hallucination)'
  );
  assert(
    code.includes('Segera Hadir') && code.includes('Discord Lounge'),
    'Discord is labeled as "Segera Hadir" (anti-hallucination)'
  );
  assert(
    code.includes('Segera Hadir') && code.includes('Threads'),
    'Threads is labeled as "Segera Hadir" (anti-hallucination)'
  );

  // Check 3: Eradication of fake personas and artificial 42 upvotes
  assert(
    !code.includes('Sensei Budi (N2)') &&
      !code.includes('Rina (Tokutei Ginou)') &&
      !code.includes('Agus (Surabaya)'),
    'Zero fake user personas remain in mnemonic items'
  );
  assert(
    code.includes('Tim Pedagogi Nugget') && code.includes('Spesialis Visual SSW'),
    'Mnemonics attributed transparently to Nugget curriculum specialists'
  );
  assert(
    !code.includes('upvotes: 42') && !code.includes('upvotes: 38') && !code.includes('upvotes: 29'),
    'Zero fabricated upvote counters (42, 38, 29) remain'
  );
  assert(
    code.includes('Tersimpan') && code.includes('Simpan'),
    'Heart action functions honestly as personal save/bookmark tool'
  );

  // Check 4: Daily Kanji Challenge
  assert(
    code.includes('DAILY_KANJI') && code.includes('Tantangan Kanji Harian'),
    'Daily Kanji Challenge cyclical engine is present'
  );
  assert(
    code.includes('handleShareChallenge') && code.includes('#NuggetNihongo'),
    'Social share integration with #NuggetNihongo hashtag is present'
  );

  // Check 5: Mobile ergonomics and A11y standards
  assert(
    code.includes('w-12 h-1.5 rounded-full'),
    'Mobile bottom-sheet drag handle is present'
  );
  assert(
    code.includes('useFocusTrap') && code.includes('useBodyScrollLock'),
    'Modal implements focus trap and body scroll locking'
  );
  assert(
    code.includes('min-h-[40px]'),
    'Interactive buttons enforce minimum 40px touch targets'
  );
  assert(
    code.includes('safe-area-inset-bottom'),
    'Content respects safe-area-inset-bottom clearance'
  );

  console.log(`\n🎉 Suite Summary: ${passedTests}/${totalTests} tests passed successfully.`);
  process.exit(0);
} catch (err) {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
}
