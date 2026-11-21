// ============================================================================
// Sprint 11 Pass 7: Desktop Residual Flattening & Final Release Certification
// Suite #216 — Master Regression Orchestrator
// ============================================================================

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('--- Suite #216: Sprint 11 Pass 7 (Desktop Residual Flattening & Final Certification) ---');

let passedChecks = 0;
function check(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

// 1. Sidebar.tsx Clean Hairline Footer Dividers
const sidebarPath = path.join(ROOT_DIR, 'src/components/layout/Sidebar.tsx');
check('Sidebar.tsx exists', () => {
  assert.ok(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
});

const sidebarSrc = fs.readFileSync(sidebarPath, 'utf8');
check('Sidebar.tsx quick utility bar uses clean border divider without nested surface class', () => {
  const hasCleanUtility = /border-t border-border flex items-center justify-between gap-1\.5/.test(sidebarSrc);
  assert.ok(hasCleanUtility, 'Sidebar.tsx quick utility bar must not have nested bg-surface class');
});

check('Sidebar.tsx bottom user card uses clean border-t without nested surface class', () => {
  const hasCleanBottomCard = /p-4 border-t border-border space-y-2/.test(sidebarSrc);
  assert.ok(hasCleanBottomCard, 'Sidebar.tsx bottom card must not redeclare bg-surface-2/40');
});

// 2. AppModalShell.tsx Sticky Header & Footer Purity
const appModalShellPath = path.join(ROOT_DIR, 'src/components/ui/AppModalShell.tsx');
check('AppModalShell.tsx exists', () => {
  assert.ok(fs.existsSync(appModalShellPath), 'AppModalShell.tsx must exist');
});

const modalShellSrc = fs.readFileSync(appModalShellPath, 'utf8');
check('AppModalShell.tsx header uses clean divider without redundant bg-surface', () => {
  const hasCleanHeader = /border-b border-border flex items-center justify-between shrink-0(?!\s+bg-surface)/.test(modalShellSrc);
  assert.ok(hasCleanHeader, 'AppModalShell.tsx header must not redeclare bg-surface');
});

check('AppModalShell.tsx footer uses clean divider without nested bg-surface-2/40', () => {
  const hasCleanFooter = /border-t border-border shrink-0 pb-\[max\(0\.875rem,env\(safe-area-inset-bottom\)\)\]/.test(modalShellSrc);
  assert.ok(hasCleanFooter, 'AppModalShell.tsx footer must not redeclare bg-surface-2/40');
});

// 3. Exhaustive Playwright Multi-Device Simulator Ledger
const ledgerPath = path.join(ROOT_DIR, '.playwright-cli/exhaustive-baseline-ledger.json');
check('Playwright exhaustive simulation ledger exists', () => {
  assert.ok(fs.existsSync(ledgerPath), 'exhaustive-baseline-ledger.json must exist');
});

const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const viewportKeys = Object.keys(ledger.viewports);
check('Exhaustive simulation covers all 3 viewports and 30 scans', () => {
  assert.strictEqual(viewportKeys.length, 3, 'Must test 3 viewports');
  assert.strictEqual(ledger.summary.totalPagesAudited, 30, 'Must audit exactly 30 page instances');
});

check('Exhaustive simulation verifies ZERO nested card violations across all viewports', () => {
  assert.strictEqual(ledger.summary.totalCardViolations, 0, 'Total nested cards must be strictly 0');
});

check('Exhaustive simulation verifies ZERO touch target violations (<44px)', () => {
  assert.strictEqual(ledger.summary.totalTouchTargetViolations, 0, 'Total touch violations must be strictly 0');
});

check('Exhaustive simulation verifies ZERO text truncation instances', () => {
  assert.strictEqual(ledger.summary.totalTruncationViolations, 0, 'Total truncated text instances must be strictly 0');
});

check('Exhaustive simulation verifies ZERO runtime console errors', () => {
  assert.strictEqual(ledger.summary.totalConsoleErrors, 0, 'Total console errors must be strictly 0');
});

check('Exhaustive simulation verifies all 21 interactive flows completed successfully', () => {
  assert.strictEqual(ledger.summary.totalInteractionsSimulated, 21, 'Must simulate 21 interactive flows');
  for (const vpKey of viewportKeys) {
    const interactions = ledger.viewports[vpKey].interactions;
    for (const [flowName, flowData] of Object.entries(interactions)) {
      assert.strictEqual(flowData.status, 'SUCCESS', `Flow ${flowName} on ${vpKey} must be SUCCESS`);
    }
  }
});

console.log(`\n🎉 [Suite #216 PASSED] All ${passedChecks}/${passedChecks} Desktop Residual & Final Certification contracts verified!`);
process.exit(0);
