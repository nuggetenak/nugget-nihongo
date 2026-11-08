// ══════════════════════════════════════════════════════════════════
//  test-s4-pass12-feedback-gateway.js
//  Siklus IV Pass 12: Integrated Support & Feedback Gateway Verification
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TEST PASS 12: INTEGRATED SUPPORT & FEEDBACK GATEWAY ---');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Verify ReportIssueModal contains direct mailto fallback to nuggetnihongo@gmail.com
const reportIssuePath = path.join(ROOT_DIR, 'src/components/ui/ReportIssueModal.tsx');
assert.ok(fs.existsSync(reportIssuePath), 'ReportIssueModal.tsx must exist');
const reportIssueSrc = fs.readFileSync(reportIssuePath, 'utf8');

assert.ok(
  reportIssueSrc.includes('nuggetnihongo@gmail.com'),
  'ReportIssueModal must contain official support email nuggetnihongo@gmail.com'
);
assert.ok(
  reportIssueSrc.includes('mailto:nuggetnihongo@gmail.com'),
  'ReportIssueModal must contain mailto link to nuggetnihongo@gmail.com'
);
console.log('✓ Verified ReportIssueModal direct mailto fallback');

// 2. Verify AboutPage contains Official Support & Creator / Community Gateway card
const aboutPagePath = path.join(ROOT_DIR, 'src/pages/AboutPage.tsx');
assert.ok(fs.existsSync(aboutPagePath), 'AboutPage.tsx must exist');
const aboutPageSrc = fs.readFileSync(aboutPagePath, 'utf8');

assert.ok(
  aboutPageSrc.includes('nuggetnihongo@gmail.com'),
  'AboutPage must contain official support email nuggetnihongo@gmail.com'
);
assert.ok(
  aboutPageSrc.includes('https://x.com/NuggetNihongo'),
  'AboutPage must link to official 𝕏 account https://x.com/NuggetNihongo'
);
assert.ok(
  aboutPageSrc.includes('https://trakteer.id/nugget-nihongo'),
  'AboutPage must link to official Trakteer account https://trakteer.id/nugget-nihongo'
);
assert.ok(
  aboutPageSrc.includes("openModal('community')"),
  'AboutPage must include button triggering openModal("community")'
);

// Verify Anti-Hallucination Guard: Instagram and Discord must NOT have active external links
assert.ok(
  aboutPageSrc.includes('Segera Hadir') || aboutPageSrc.includes('Tahap Persiapan'),
  'AboutPage must clearly mark uncreated channels as Segera Hadir / Tahap Persiapan'
);
assert.ok(
  !aboutPageSrc.includes('https://discord.gg/'),
  'AboutPage must not hallucinate an active Discord server link'
);
console.log('✓ Verified AboutPage official support channels and anti-hallucination compliance');

// 3. Verify MethodologyPage contains academic research inquiry contact to nuggetnihongo@gmail.com
const methodologyPath = path.join(ROOT_DIR, 'src/pages/MethodologyPage.tsx');
assert.ok(fs.existsSync(methodologyPath), 'MethodologyPage.tsx must exist');
const methodologySrc = fs.readFileSync(methodologyPath, 'utf8');

assert.ok(
  methodologySrc.includes('mailto:nuggetnihongo@gmail.com'),
  'MethodologyPage must include research inquiry mailto link to nuggetnihongo@gmail.com'
);
console.log('✓ Verified MethodologyPage research inquiry contact');

console.log('--- ALL PASS 12 CHECKS PASSED (100% GREEN) ---');
