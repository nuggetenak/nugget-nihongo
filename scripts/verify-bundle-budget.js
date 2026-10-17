// ══════════════════════════════════════════════════════════════════
//  verify-bundle-budget.js — CI/CD Performance Budget Verification
//  Ticket T-235: Strictly enforces the 500 kB chunk threshold
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_JS = path.join(ROOT, 'dist/assets/js');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — PRODUCTION BUNDLE PERFORMANCE BUDGET      ║');
console.log('║   Enforcing 500 kB Single-Chunk Ceiling & Modular Splitting  ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

if (!fs.existsSync(DIST_JS)) {
  console.error(`❌ Error: ${DIST_JS} does not exist. Run 'npm run build' first.`);
  process.exit(1);
}

const MAX_CHUNK_SIZE_KB = 500;
const files = fs.readdirSync(DIST_JS).filter((f) => f.endsWith('.js'));

if (files.length === 0) {
  console.error('❌ Error: No JS chunks found in dist/assets/js.');
  process.exit(1);
}

let violations = 0;
let totalJsBytes = 0;

console.log('📦 Auditing generated JavaScript chunks:\n');

for (const file of files) {
  const filePath = path.join(DIST_JS, file);
  const stats = fs.statSync(filePath);
  const sizeKb = stats.size / 1024;
  totalJsBytes += stats.size;

  const paddedName = file.padEnd(38, ' ');
  const paddedSize = sizeKb.toFixed(2).padStart(8, ' ') + ' kB';

  if (sizeKb > MAX_CHUNK_SIZE_KB) {
    console.error(`  ❌ [VIOLATION] ${paddedName} ${paddedSize} > ${MAX_CHUNK_SIZE_KB} kB budget!`);
    violations++;
  } else {
    console.log(`  ✓ [WITHIN BUDGET] ${paddedName} ${paddedSize}`);
  }
}

const totalJsKb = (totalJsBytes / 1024).toFixed(2);
console.log(`\n📊 Total JS chunks analyzed: ${files.length} (${totalJsKb} kB across all modular chunks)`);
console.log(`🎯 Performance budget ceiling: ${MAX_CHUNK_SIZE_KB} kB per chunk\n`);

if (violations > 0) {
  console.error(`❌ PERFORMANCE BUDGET FAILED: ${violations} chunk(s) exceeded ${MAX_CHUNK_SIZE_KB} kB.`);
  process.exit(1);
}

console.log('🌟 PERFORMANCE BUDGET PASSED 100%: All chunks strictly adhere to the 500 kB ceiling!\n');
