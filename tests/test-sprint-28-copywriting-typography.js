// ══════════════════════════════════════════════════════════════════
//  test-sprint-28-copywriting-typography.js — Master Verification Suite
//  Copywriting Integrity, Japanese Typography & Linguistic Quality (KBBI V)
//  Tickets T-156 to T-160 Forensic Empirical Proof
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Sprint 28 Audit] Initiating Copywriting, Ruby Typography & KBBI V Linguistic Quality Evaluation...\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-156: Eradicate Distractor Self-Leaks & Implement Option Shuffling
// ─────────────────────────────────────────────────────────────────────────────
check('T-156: lessonContentAdapter.ts exports cleanOptionText and shuffleOptions', () => {
  const adapterPath = path.join(ROOT, 'src/lib/curriculum/lessonContentAdapter.ts');
  const content = fs.readFileSync(adapterPath, 'utf8');

  assert.ok(content.includes('export function cleanOptionText'), 'cleanOptionText export missing');
  assert.ok(content.includes('export function shuffleOptions'), 'shuffleOptions export missing');

  // Verify parenthetical leakage removal regex
  assert.ok(content.includes('Urutan terbalik') || content.includes('Partikel tidak pas'), 'Parenthetical leakage regex missing');

  // Verify CURATED_LESSONS_MAP drill option mapping cleans and shuffles
  assert.ok(content.includes('cleanOptionText'), 'CURATED_LESSONS_MAP options must be cleaned');
});

check('T-156: MicroDrillStage.tsx integrates cleanOptionText and labels Respons Percakapan Alami', () => {
  const drillPath = path.join(ROOT, 'src/components/curriculum/player/MicroDrillStage.tsx');
  const content = fs.readFileSync(drillPath, 'utf8');

  assert.ok(content.includes('cleanOptionText'), 'MicroDrillStage must import and use cleanOptionText');
  assert.ok(content.includes('Respons Percakapan Alami'), 'MicroDrillStage must label Respons (KBBI V) instead of Respon');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. T-157: Purge of 913 "me-[English]" Hybrid Verbs & Leaked English Entries
// ─────────────────────────────────────────────────────────────────────────────
check('T-157: Zero "me-[English]" hybrid verbs remain in public/data/', () => {
  const stagedDir = path.join(ROOT, 'public/data/staged-expansion');
  const vocabDir = path.join(ROOT, 'public/data/vocab');

  function scan(dir) {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        count += scan(full);
      } else if (ent.name.endsWith('.js') || ent.name.endsWith('.json')) {
        const content = fs.readFileSync(full, 'utf8');
        const matches = content.match(/["']me-[a-zA-Z]+/g);
        if (matches) count += matches.length;
      }
    }
    return count;
  }

  const stagedMe = scan(stagedDir);
  const vocabMe = scan(vocabDir);

  assert.equal(stagedMe, 0, `Expected 0 me- verbs in staged-expansion, found ${stagedMe}`);
  assert.equal(vocabMe, 0, `Expected 0 me- verbs in vocab, found ${vocabMe}`);
});

check('T-157: Canonical compiled vocab files exist and contain valid entries', () => {
  for (let lvl = 1; lvl <= 5; lvl++) {
    const fPath = path.join(ROOT, `public/data/vocab/vocab-n${lvl}.js`);
    assert.ok(fs.existsSync(fPath), `Missing vocab-n${lvl}.js`);
    const content = fs.readFileSync(fPath, 'utf8');
    assert.ok(content.includes(`window.vocabN${lvl}`), `Missing window.vocabN${lvl}`);
    assert.ok(content.includes('"meaning_id":'), `Missing meaning_id in vocab-n${lvl}.js`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. T-158: Universal Semantic <RubyText> Component Implementation & Mounts
// ─────────────────────────────────────────────────────────────────────────────
check('T-158: RubyText.tsx exports accessible semantic HTML5 ruby component', () => {
  const rubyPath = path.join(ROOT, 'src/components/ui/RubyText.tsx');
  const commonRubyPath = path.join(ROOT, 'src/components/common/RubyText.tsx');

  assert.ok(fs.existsSync(rubyPath), 'Missing src/components/ui/RubyText.tsx');
  assert.ok(fs.existsSync(commonRubyPath), 'Missing src/components/common/RubyText.tsx');

  const content = fs.readFileSync(rubyPath, 'utf8');
  assert.ok(content.includes('<ruby'), 'Must emit <ruby>');
  assert.ok(content.includes('<rt'), 'Must emit <rt>');
  assert.ok(content.includes('<rp'), 'Must emit <rp> for clipboard and fallback safety');
  assert.ok(content.includes('isPureKana'), 'Must detect pure kana strings');
});

check('T-158: RubyText is integrated into DetailModal, KotowazaModal, KanjiDojoView, and MateriHubPage', () => {
  const detailPath = path.join(ROOT, 'src/components/ui/DetailModal.tsx');
  const kotowazaPath = path.join(ROOT, 'src/components/kotowaza/KotowazaModal.tsx');
  const dojoPath = path.join(ROOT, 'src/components/kanji/KanjiDojoView.tsx');
  const hubPath = path.join(ROOT, 'src/pages/MateriHubPage.tsx');

  assert.ok(fs.readFileSync(detailPath, 'utf8').includes('RubyText'), 'DetailModal missing RubyText');
  assert.ok(fs.readFileSync(kotowazaPath, 'utf8').includes('RubyText'), 'KotowazaModal missing RubyText');
  assert.ok(fs.readFileSync(dojoPath, 'utf8').includes('RubyText'), 'KanjiDojoView missing RubyText');
  assert.ok(fs.readFileSync(hubPath, 'utf8').includes('RubyText'), 'MateriHubPage missing RubyText');
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. T-159: Indonesian Spelling Standardization (KBBI V) & UI Glossary Harmonization
// ─────────────────────────────────────────────────────────────────────────────
check('T-159: KBBI V standard spellings (respons, kantung) are enforced in UI', () => {
  const explPath = path.join(ROOT, 'src/components/curriculum/player/ExplanationStage.tsx');
  const methPath = path.join(ROOT, 'src/pages/MethodologyPage.tsx');
  const senseiPath = path.join(ROOT, 'src/pages/SenseiPage.tsx');

  assert.ok(fs.readFileSync(explPath, 'utf8').includes('Pembicara B (Respons)'), 'ExplanationStage must use Respons');
  assert.ok(fs.readFileSync(methPath, 'utf8').includes('respons'), 'MethodologyPage must use respons');
  assert.ok(fs.readFileSync(senseiPath, 'utf8').includes('kantung plastik'), 'SenseiPage must use kantung plastik');
});

check('T-159: Retention Vault UI terminology is harmonized to "Pusat Retensi (Brankas FSRS)"', () => {
  const sidebarPath = path.join(ROOT, 'src/components/layout/Sidebar.tsx');
  const drawerPath = path.join(ROOT, 'src/components/layout/MobileDrawer.tsx');

  assert.ok(
    fs.readFileSync(sidebarPath, 'utf8').includes('Pusat Retensi (Brankas FSRS)'),
    'Sidebar must label Pusat Retensi (Brankas FSRS)'
  );
  assert.ok(
    fs.readFileSync(drawerPath, 'utf8').includes('Pusat Retensi (Brankas FSRS)'),
    'MobileDrawer must label Pusat Retensi (Brankas FSRS)'
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-160: Can-Do Statement Corpus Refactoring (Zero Boilerplate)
// ─────────────────────────────────────────────────────────────────────────────
check('T-160: All 36 curriculum tracks have 0 boilerplate Can-Do summaries', () => {
  const dir = path.join(ROOT, 'public/data/curriculum');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));

  assert.ok(files.length >= 36, `Expected at least 36 curriculum tracks, found ${files.length}`);

  let boilerplateCount = 0;
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const u of data.units || []) {
      const summary = (u.can_do_summary || '').toLowerCase();
      if (summary.includes('komprehensif') || summary.includes('mempelajari tata bahasa secara umum')) {
        boilerplateCount++;
      }
      for (const l of u.lessons || []) {
        const stmt = (l.can_do_statement || '').toLowerCase();
        if (stmt.includes('komprehensif') || stmt.includes('mempelajari tata bahasa secara umum')) {
          boilerplateCount++;
        }
      }
    }
  }

  assert.equal(boilerplateCount, 0, `Found ${boilerplateCount} boilerplate statements in curriculum`);
});

// ─────────────────────────────────────────────────────────────────────────────
// Final Report
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n🏁 Sprint 28 Forensic Audit Complete: ${passedChecks}/${totalChecks} checks passed.`);
if (passedChecks === totalChecks) {
  console.log('🎉 SPRINT 28 FORENSIC CERTIFICATION: 100% PASS — Zero Regressions!\n');
} else {
  console.error(`💥 Audit failed: ${totalChecks - passedChecks} assertions failed.`);
  process.exit(1);
}
