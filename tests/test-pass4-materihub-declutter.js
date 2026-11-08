// ══════════════════════════════════════════════════════════════════
//  test-pass4-materihub-declutter.js
//  PASS 4 Forensic Verification Suite: MateriHubPage Progressive Disclosure,
//  Anti-Microfont Purge, & Urushi Aesthetic Certification
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
    throw err;
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');

function main() {
  console.log('\n=============================================================');
  console.log('🏛️  RUNNING PASS 4: MATERIHUB DE-CLUTTERING & READABILITY AUDIT');
  console.log('=============================================================\n');

  const hubPath = path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx');
  assert(fs.existsSync(hubPath), 'MateriHubPage.tsx must exist');

  const hubCode = fs.readFileSync(hubPath, 'utf8');

  // ── 1. Categorized Progressive Disclosure & 2 Calm Categories ──
  test('P4.1: Restructures the 11 tools into 2 calm categories (Kemahiran Inti & Referensi Tata Bahasa)', () => {
    // Exactly 11 tools in DOJO_TOOLS
    const toolIds = [
      'kanji', 'choukai', 'pitch', 'cat',
      'keigo', 'counters', 'conjugation', 'nuance', 'kotowaza',
      'kana', 'books'
    ];
    for (const id of toolIds) {
      assert(hubCode.includes(`id: '${id}'`), `DOJO_TOOLS must contain tool ${id}`);
    }

    // Verify categories defined
    assert(hubCode.includes("categoryId: 'kemahiran'"), 'Must define Kemahiran Inti categoryId');
    assert(hubCode.includes("categoryId: 'referensi'"), 'Must define Referensi categoryId');
    assert(hubCode.includes('Latihan Kemahiran Inti'), 'Must declare Latihan Kemahiran Inti category name');
    assert(hubCode.includes('Peralatan & Referensi Tata Bahasa'), 'Must declare Peralatan & Referensi category name');

    // Verify category filter pill bar
    assert(hubCode.includes('Semua Alat (11)'), 'Pill bar must include Semua Alat (11)');
    assert(hubCode.includes('Kemahiran Inti (3)'), 'Pill bar must include Kemahiran Inti (3)');
    assert(hubCode.includes('Peralatan & Referensi (8)'), 'Pill bar must include Peralatan & Referensi (8)');

    // Verify section rendering
    assert(hubCode.includes("DOJO_TOOLS.filter((t) => t.categoryId === 'kemahiran')"), 'Renders Kemahiran section');
    assert(hubCode.includes("DOJO_TOOLS.filter((t) => t.categoryId === 'referensi')"), 'Renders Referensi section');
  });

  // ── 2. Anti-Microfont Purge Across Entire MateriHubPage ──
  test('P4.2: Purges all micro-fonts (text-[10px], text-[11px], text-[9px], text-[8px]) across MateriHubPage', () => {
    const microfontRegex = /text-\[(10|11|10\.5|11\.5|9|8)px\]/;
    const match = hubCode.match(microfontRegex);
    assert(!match, `MateriHubPage.tsx must NOT contain any micro-fonts below text-xs (12px), found: ${match?.[0]}`);

    // Verify standardized badge & annotation sizes
    assert(hubCode.includes('text-xs font-bold px-2.5 py-1 rounded-full border'), 'Tool badges must be text-xs');
    assert(
      hubCode.includes('text-sm text-stone-300 leading-relaxed') ||
      hubCode.includes('text-sm text-appText-muted leading-relaxed'),
      'Tool descriptions must be text-sm'
    );
  });

  // ── 3. Anti-Truncation & Readability on Descriptions and Can-Do Descriptors ──
  test('P4.3: Eliminates aggressive truncations (line-clamp-2 and line-clamp-1) on tool cards', () => {
    // Extract renderDojoToolCard slice
    const cardStart = hubCode.indexOf('const renderDojoToolCard');
    const cardEnd = hubCode.indexOf('// ── Render Focused Sub-View');
    const cardCode = hubCode.slice(cardStart, cardEnd);

    assert(!cardCode.includes('line-clamp-2'), 'Tool card description must not clamp with line-clamp-2');
    assert(!cardCode.includes('line-clamp-1'), 'Tool card canDo objective must not clamp with line-clamp-1');
    assert(cardCode.includes('min-h-[220px]'), 'Tool card must declare min-h-[220px] for consistent breathing room');
    assert(cardCode.includes('leading-relaxed'), 'Tool card description must declare leading-relaxed');
  });

  // ── 4. Urushi Lacquerware Aesthetic & Tactile Polish ──
  test('P4.4: Features refined Urushi lacquerware styling with soft amber hover accents', () => {
    assert(hubCode.includes('hover:border-amber-500/50'), 'Tool cards must feature soft amber hover accent border');
    assert(hubCode.includes('group-hover:text-amber-400'), 'Tool card title must transition to amber-400 on hover');
    assert(
      hubCode.includes('bg-surface-3/90 text-accent-hot dark:text-amber-300 border-amber-500/30') ||
      hubCode.includes('bg-surface-3/90 text-amber-300 border-amber-500/30'),
      'Core modules must use refined Urushi amber badges'
    );
    assert(
      hubCode.includes('bg-surface-3/90 text-stone-200 border-accent/25') ||
      hubCode.includes('bg-surface-3/90 text-appText-bright border-accent/25'),
      'Reference tools must use subtle stone lacquer badges'
    );
  });

  // ── 5. Modal Isolation & Exclusive useModalStore Dispatching ──
  test('P4.5: handleOpenTool dispatches exclusively to useModalStore without portal wars', () => {
    const modalTools = ['pitch', 'catPlacement', 'keigo', 'counters', 'conjugation', 'nuance', 'kotowaza', 'kana'];
    for (const tool of modalTools) {
      assert(
        hubCode.includes(`useModalStore.getState().openModal('${tool}')`),
        `MateriHubPage must dispatch ${tool} to useModalStore`
      );
    }

    // Prohibit direct modal embedding
    assert(!hubCode.includes('<DetailModal'), 'Must not mount DetailModal directly');
    assert(!hubCode.includes('<KanaChartModal'), 'Must not mount KanaChartModal directly');
    assert(!hubCode.includes('<ConjugationModal'), 'Must not mount ConjugationModal directly');
    assert(!hubCode.includes('<NuanceCompareModal'), 'Must not mount NuanceCompareModal directly');
    assert(!hubCode.includes('<KotowazaModal'), 'Must not mount KotowazaModal directly');

    // Prohibit legacy boolean selectors
    assert(!hubCode.includes('openCatPlacement,'), 'No legacy openCatPlacement selector');
    assert(!hubCode.includes('openKotowaza,'), 'No legacy openKotowaza selector');
    assert(!hubCode.includes('openKana,'), 'No legacy openKana selector');
  });

  // ── 6. Sub-View Lifecycle, Sticky Header, & Studio Sync ──
  test('P4.6: Preserves focused sub-views (kanji, books, choukai), sticky back bar, and reset mechanics', () => {
    assert(hubCode.includes('← Kembali ke Katalog Dojo'), 'Must include ← Kembali ke Katalog Dojo');
    assert(hubCode.includes('aria-label="Kembali ke Katalog Dojo"'), 'Must have accessible back button');
    assert(hubCode.includes('<KanjiDojoView'), 'Mounts KanjiDojoView');
    assert(hubCode.includes('<BookTrackBrowser'), 'Mounts BookTrackBrowser');
    assert(hubCode.includes('<ChoukaiSimulatorPage />'), 'Mounts ChoukaiSimulatorPage');
    assert(hubCode.includes("e.key === 'Escape'"), 'Registers Escape key handler');
    assert(hubCode.includes("'popstate'"), 'Registers popstate event handler');
    assert(hubCode.includes('<SyncStatusPill />'), 'Mounts SyncStatusPill');
  });

  // ── 7. Responsive Anti-Leakage & Mobile Touch Ergonomics ──
  test('P4.7: Enforces responsive anti-leakage constraints, safe-area padding, and >=40px touch targets', () => {
    assert(hubCode.includes('min-w-0 max-w-full overflow-x-hidden'), 'Root container must enforce anti-leakage');
    assert(hubCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Root container must specify safe-area bottom cushion');
    assert(hubCode.includes('active:scale-95'), 'Interactive elements must provide active:scale-95 feedback');
    assert(hubCode.includes('min-h-[40px]'), 'Touch targets must enforce minimum 40px height');
    assert(hubCode.includes('aria-pressed={isSelected}'), 'Category filter pills must declare aria-pressed for screen readers');
    assert(hubCode.includes('aria-label={`Filter alat: ${tab.label}`}'), 'Category filter pills must have accessible aria-label');
    assert(hubCode.includes("aria-pressed={hubSectionMode === 'dojo'}"), 'Mode switch must declare aria-pressed');
  });

  // ── 8. POS Taxonomy & Search Invariants ──
  test('P4.8: Preserves canonical 7-category POS taxonomy and search predicate invariants', () => {
    const posCategories = ['verb', 'adj', 'noun', 'adverb', 'counter', 'conjunction', 'expression'];
    for (const pos of posCategories) {
      assert(hubCode.includes(`id: '${pos}'`), `Must declare POS category "${pos}"`);
    }
    assert(hubCode.includes("!pos.includes('adverb')"), 'Verb filter must exclude adverb');
    assert(hubCode.includes("!pos.includes('suru')"), 'Noun filter must exclude suru');
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`📊 PASS 4 AUDIT RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
  console.log('-------------------------------------------------------------\n');

  if (passedTests === totalTests) {
    console.log('🌟 PASS 4 "MATERIHUB DE-CLUTTERING & PROGRESSIVE DISCLOSURE" 100% VERIFIED!\n');
  } else {
    process.exit(1);
  }
}

main();
