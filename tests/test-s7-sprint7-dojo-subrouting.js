// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint7-dojo-subrouting.js
//  Sprint 7: Tab 3 Dojo — 4-Pillar Hub Coordinator & Hash Sub-Routing Test
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 7: Tab 3 Dojo — 4-Pillar Hub Coordinator & Hash Sub-Routing Test...');

// Check 1: App.tsx - Hash Sub-Routing for Dojo
console.log('  Check 7.1: App.tsx hash routing for #dojo and sub-segments...');
const appPath = path.join(ROOT, 'src', 'App.tsx');
assert(fs.existsSync(appPath), 'App.tsx must exist');
const appContent = fs.readFileSync(appPath, 'utf8');

assert(
  appContent.includes("rootSegment === 'dojo'") && appContent.includes("'materi'"),
  'App.tsx must route #dojo to the unified Dojo tab (materi)'
);
assert(
  appContent.includes("subSegment === 'drills'") && appContent.includes("setDojoTab('latihan')"),
  'App.tsx must support #dojo/drills sub-route'
);
assert(
  appContent.includes("subSegment === 'dictionary'") && appContent.includes("setDojoTab('kamus')"),
  'App.tsx must support #dojo/dictionary sub-route'
);
assert(
  appContent.includes("subSegment === 'reference'") && appContent.includes("setDojoTab('alat')"),
  'App.tsx must support #dojo/reference sub-route'
);
assert(
  appContent.includes("subSegment === 'cbt'") && appContent.includes("setDojoTab('cbt')"),
  'App.tsx must support #dojo/cbt sub-route'
);
console.log('  ✅ Check 7.1 passed: Hash sub-routing across all 4 pillars verified.');

// Check 2: MateriHubPage.tsx - Unified Nomenclature & 4-Pillar Coordination
console.log('  Check 7.2: MateriHubPage.tsx unified Dojo title & 4-pillar tabs...');
const materiHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
assert(fs.existsSync(materiHubPath), 'MateriHubPage.tsx must exist');
const materiHubContent = fs.readFileSync(materiHubPath, 'utf8');

assert(
  materiHubContent.includes('Dojo (Sasana Latihan & Ujian)'),
  'MateriHubPage must display unified title "Dojo (Sasana Latihan & Ujian)"'
);
assert(
  materiHubContent.includes("window.history.replaceState(null, '', `#dojo/${sub}`)"),
  'MateriHubPage handleSelectDojoTab must synchronize active pillar to URL hash'
);
assert(
  materiHubContent.includes("role=\"tablist\"") &&
  materiHubContent.includes("aria-selected={dojoTab === 'latihan'}") &&
  materiHubContent.includes("aria-selected={dojoTab === 'kamus'}") &&
  materiHubContent.includes("aria-selected={dojoTab === 'alat'}") &&
  materiHubContent.includes("aria-selected={dojoTab === 'cbt'}"),
  'MateriHubPage must provide fully accessible 4-pillar tab switcher'
);
console.log('  ✅ Check 7.2 passed: Unified Dojo title and accessible 4-pillar coordinator verified.');

console.log('🎉 ALL SPRINT 7 DOJO SUB-ROUTING CHECKS PASSED (2/2)!');
