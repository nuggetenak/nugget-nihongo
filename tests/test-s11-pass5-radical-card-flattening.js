// ══════════════════════════════════════════════════════════════════
//  test-s11-pass5-radical-card-flattening.js
//  Siklus XI — Pass 5: Radical Card Flattening & Editorial Purity Verification
// ══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('🧪 Starting Siklus XI — Pass 5: Radical Card Flattening & Editorial Purity Verification...\n');

// ── Check 5.1: HomePage Can-Do & L1 Contrastive Callout Purity ──
console.log('📋 Check 5.1: HomePage Can-Do & L1 Contrastive Callout Purity');
const homePath = resolve('src/pages/HomePage.tsx');
assert(existsSync(homePath), 'src/pages/HomePage.tsx exists');
const homeContent = readFileSync(homePath, 'utf8');

assert(
  !homeContent.includes('p-3.5 rounded-xl bg-surface-2/60 border-l-2 border-accent text-xs space-y-1.5'),
  'HomePage has eliminated nested rounded-xl border on Can-Do summary box'
);
assert(
  (homeContent.includes('p-3.5 rounded-r-lg bg-surface-2/60 border-l-4 border-accent text-xs space-y-1.5') ||
   homeContent.includes('p-3.5 rounded-r-lg bg-amber-500/10 border-l-4 border-accent text-xs space-y-1.5')) &&
  homeContent.includes('p-3.5 rounded-r-lg bg-amber-500/8 border-l-4 border-amber-500/40 text-xs space-y-1'),
  'HomePage employs sleek border-l-4 callout strips for Can-Do and L1 contrastive notes'
);

// ── Check 5.2: SenseiPage Persona Switcher & Message Bubble Flattening ──
console.log('\n📋 Check 5.2: SenseiPage Persona Switcher & Message Bubble Flattening');
const senseiPath = resolve('src/pages/SenseiPage.tsx');
assert(existsSync(senseiPath), 'src/pages/SenseiPage.tsx exists');
const senseiContent = readFileSync(senseiPath, 'utf8');

assert(
  !senseiContent.includes('flex items-center gap-1 p-1 bg-surface-2 border border-border rounded-xl w-full md:w-auto'),
  'SenseiPage has eliminated redundant border on persona switcher container'
);
assert(
  senseiContent.includes('flex items-center gap-1 p-1 bg-surface-2 rounded-xl w-full md:w-auto'),
  'SenseiPage persona switcher uses sleek borderless pill container'
);
assert(
  !senseiContent.includes('card-interactive-lift rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 leading-relaxed shadow-xs'),
  'SenseiPage chat message bubbles no longer trigger card container lift mechanics'
);
assert(
  senseiContent.includes('max-w-[88%] sm:max-w-[80%] rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 leading-relaxed shadow-xs'),
  'SenseiPage message bubbles use native conversational rounded-xl layout'
);

// ── Check 5.3: KebunPage Garden View Editorial Layout & Water Stock Flattening ──
console.log('\n📋 Check 5.3: KebunPage Garden View Editorial Layout & Water Stock Flattening');
const kebunPath = resolve('src/pages/KebunPage.tsx');
assert(existsSync(kebunPath), 'src/pages/KebunPage.tsx exists');
const kebunContent = readFileSync(kebunPath, 'utf8');

assert(
  !kebunContent.includes('<section className="relative overflow-hidden rounded-2xl bg-surface border border-border p-5 sm:p-6 shadow-xs space-y-6 animate-in fade-in duration-200">'),
  'KebunPage garden view has eliminated outer enclosing box-in-box card'
);
assert(
  kebunContent.includes('<section className="space-y-6 animate-in fade-in duration-200">'),
  'KebunPage garden view employs direct editorial section flow'
);
assert(
  !kebunContent.includes('flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface-2 border border-border shadow-xs'),
  'KebunPage water stock badge has eliminated redundant border box'
);
assert(
  kebunContent.includes('flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface-2 shadow-xs'),
  'KebunPage water stock badge uses modern borderless surface-2 container'
);

// ── Check 5.4: AboutPage Accordion, Can-Do & Tech Spec Flattening ──
console.log('\n📋 Check 5.4: AboutPage Accordion, Can-Do & Tech Spec Flattening');
const aboutPath = resolve('src/pages/AboutPage.tsx');
assert(existsSync(aboutPath), 'src/pages/AboutPage.tsx exists');
const aboutContent = readFileSync(aboutPath, 'utf8');

assert(
  !aboutContent.includes('divide-y divide-border rounded-2xl border border-border bg-surface-2/40 overflow-hidden'),
  'AboutPage FAQ accordion has eliminated nested double-border card wrapper'
);
assert(
  aboutContent.includes('divide-y divide-border rounded-xl bg-surface-2/40 overflow-hidden') ||
  aboutContent.includes('divide-y divide-border rounded-xl overflow-hidden'),
  'AboutPage FAQ accordion uses borderless rounded-xl hairline list'
);
assert(
  aboutContent.includes('p-3.5 rounded-r-lg bg-amber-500/10 border-l-4 border-amber-500/40 text-xs text-appText-muted') &&
  aboutContent.includes('p-4 rounded-r-lg bg-amber-500/10 border-l-4 border-amber-500/40 text-xs space-y-1.5'),
  'AboutPage Can-Do and database summary use border-l-4 editorial callout strips'
);
assert(
  aboutContent.includes('rounded-xl overflow-hidden bg-surface-2/60'),
  'AboutPage bibliography uses borderless surface-2 container'
);

// ── Check 5.5: MethodologyPage Dilemma Callouts & 200 Personas Tile Flattening ──
console.log('\n📋 Check 5.5: MethodologyPage Dilemma Callouts & 200 Personas Tile Flattening');
const methodologyPath = resolve('src/pages/MethodologyPage.tsx');
assert(existsSync(methodologyPath), 'src/pages/MethodologyPage.tsx exists');
const methodologyContent = readFileSync(methodologyPath, 'utf8');

assert(
  !methodologyContent.includes('p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-neutral-300') &&
  !methodologyContent.includes('p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 text-emerald-200'),
  'MethodologyPage has eliminated nested bordered boxes inside theoretical conflicts'
);
assert(
  methodologyContent.includes('p-3 bg-neutral-950/60 rounded-r-lg border-l-4 border-rose-500/60 text-neutral-300') &&
  methodologyContent.includes('p-3 bg-emerald-950/20 rounded-r-lg border-l-4 border-emerald-500/60 text-emerald-200'),
  'MethodologyPage employs distinct left-accent callout strips for conflict & resolution'
);
assert(
  !methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 hover:bg-surface-2/80 border border-border/40 transition-all space-y-2'),
  'MethodologyPage has eliminated nested border on 200 personas sample cards'
);
assert(
  methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 hover:bg-surface-2/80 transition-all space-y-2'),
  'MethodologyPage 200 personas cards use sleek borderless surface-2 tiles'
);

console.log('\n══════════════════════════════════════════════════════════════════');
if (failed === 0) {
  console.log(`🎉 PASSED: All ${passed} checks in Siklus XI — Pass 5 verified 100% GREEN (Exit Code 0)!`);
  process.exit(0);
} else {
  console.error(`💥 FAILED: ${failed} checks failed in Siklus XI — Pass 5!`);
  process.exit(1);
}
