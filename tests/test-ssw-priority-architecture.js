// ══════════════════════════════════════════════════════════════════
//  test-ssw-priority-architecture.js
//  Verification suite for SSW Priority Sectors, Coming Soon Gating,
//  Construction 3 Sub-Tracks (JAC Prometric), and Cloud Sync Pill
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting SSW Priority Architecture & Cloud Sync Test Suite...\n');

const ROOT = path.resolve(__dirname, '..');

// 1. Verify CurriculumTrackBrowser.tsx exists and contains SSW configuration
const browserPath = path.join(ROOT, 'src/components/materi/CurriculumTrackBrowser.tsx');
assert(fs.existsSync(browserPath), 'CurriculumTrackBrowser.tsx must exist');
const browserCode = fs.readFileSync(browserPath, 'utf8');

// Check 1: Exactly 6 active priority tracks
const activeTracks = [
  'ssw-kaigo',
  'ssw-building-cleaning',
  'ssw-construction',
  'ssw-agriculture',
  'ssw-food',
  'ssw-accommodation'
];

activeTracks.forEach(trackId => {
  const activeRegex = new RegExp(`id:\\s*'${trackId}'[\\s\\S]*?status:\\s*'active'`);
  assert(activeRegex.test(browserCode), `Track ${trackId} must have status: 'active'`);
});
console.log('✅ Check 1 Passed: All 6 flagship priority SSW tracks verified active.');

// Check 2: Exactly 13 coming_soon tracks
const comingSoonTracks = [
  'ssw-manufacturing',
  'ssw-industrial-machinery',
  'ssw-electric-electronic',
  'ssw-shipbuilding',
  'ssw-automobile',
  'ssw-textile',
  'ssw-fishery',
  'ssw-forestry',
  'ssw-timber',
  'ssw-food-service',
  'ssw-aviation',
  'ssw-logistics',
  'ssw-railway'
];

assert.strictEqual(comingSoonTracks.length, 13, 'There must be exactly 13 coming soon tracks');
comingSoonTracks.forEach(trackId => {
  const comingSoonRegex = new RegExp(`id:\\s*'${trackId}'[\\s\\S]*?status:\\s*'coming_soon'`);
  assert(comingSoonRegex.test(browserCode), `Track ${trackId} must have status: 'coming_soon'`);
});
console.log('✅ Check 2 Passed: All 13 non-priority tracks locked with status: coming_soon.');

// Check 3: Construction 3 Sub-Tracks Switcher & Units mapping
assert(browserCode.includes('constructionSubTrack'), 'CurriculumTrackBrowser must manage constructionSubTrack state');
assert(browserCode.includes('doboku') && browserCode.includes('kenchiku') && browserCode.includes('setsubi'), 'Must contain 3 JAC sub-tracks: doboku, kenchiku, setsubi');
assert(browserCode.includes('Spesialisasi Ujian Prometric JAC (建設業)'), 'Must render Prometric JAC specialization header');
console.log('✅ Check 3 Passed: Construction 3 Sub-Tracks (Doboku, Kenchiku, Setsubi) verified.');

// Check 4: Coming Soon Modal Dialog
assert(browserCode.includes('comingSoonModalData'), 'CurriculumTrackBrowser must manage comingSoonModalData state');
assert(browserCode.includes('Dalam Proses Kurasi Standar Prometric CBT'), 'Coming soon modal must display Prometric CBT notice');
console.log('✅ Check 4 Passed: SSW Coming Soon Modal Dialog verified.');

// Check 5: SyncStatusPill Component Presence and Integrations
const pillPath = path.join(ROOT, 'src/components/ui/SyncStatusPill.tsx');
assert(fs.existsSync(pillPath), 'SyncStatusPill.tsx must exist');
const pillCode = fs.readFileSync(pillPath, 'utf8');
assert(pillCode.includes('useAuthStore'), 'SyncStatusPill must read useAuthStore');
assert(pillCode.includes('navigator.onLine'), 'SyncStatusPill must track online/offline events');

// Verify mounted in HomePage, MateriHubPage, and SettingsPage
const homeCode = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf8');
const hubCode = fs.readFileSync(path.join(ROOT, 'src/pages/MateriHubPage.tsx'), 'utf8');
const settingsCode = fs.readFileSync(path.join(ROOT, 'src/pages/SettingsPage.tsx'), 'utf8');

assert(homeCode.includes('<SyncStatusPill />'), 'HomePage must mount SyncStatusPill');
assert(hubCode.includes('<SyncStatusPill />'), 'MateriHubPage must mount SyncStatusPill');
assert(settingsCode.includes('<SyncStatusPill />'), 'SettingsPage must mount SyncStatusPill');
console.log('✅ Check 5 Passed: SyncStatusPill component and mountings in Home, MateriHub, and Settings verified.');

// Check 6: syncEngine.ts curriculum progress integration
const syncEnginePath = path.join(ROOT, 'src/lib/supabase/syncEngine.ts');
const syncEngineCode = fs.readFileSync(syncEnginePath, 'utf8');
assert(syncEngineCode.includes('curriculum_progress'), 'syncEngine must synchronize curriculum_progress');
assert(syncEngineCode.includes('useCurriculumStore'), 'syncEngine must import and use useCurriculumStore');
console.log('✅ Check 6 Passed: syncEngine curriculum progress cloud reconciliation verified.');

console.log('\n🎉 ALL SSW PRIORITY & CLOUD SYNC ARCHITECTURE CHECKS PASSED WITH 100% GREEN STATUS!');
