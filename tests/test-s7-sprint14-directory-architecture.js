// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint14-directory-architecture.js
//  Sprint 14: Directory Refactoring & Feature-Sliced Path Aliases
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 155: Directory Refactoring & Feature-Sliced Architecture Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 14.1: Feature-Sliced Architecture Domain Structure ───────────
console.log('  Check 14.1: Verifying Feature-Sliced domain directories & barrels...');
const featuresDir = path.join(ROOT, 'src', 'features');
assert(fs.existsSync(featuresDir), 'src/features directory must exist');

const requiredDomains = ['learn', 'review', 'dojo', 'sensei', 'settings'];

for (const domain of requiredDomains) {
  const domainDir = path.join(featuresDir, domain);
  assert(fs.existsSync(domainDir), `src/features/${domain} directory must exist`);
  const indexPath = path.join(domainDir, 'index.ts');
  assert(fs.existsSync(indexPath), `src/features/${domain}/index.ts must exist`);
}

// Check central barrel
const centralIndexPath = path.join(featuresDir, 'index.ts');
assert(fs.existsSync(centralIndexPath), 'src/features/index.ts must exist');
const centralIndexContent = fs.readFileSync(centralIndexPath, 'utf8');

assert(
  centralIndexContent.includes("export * as LearnFeature from './learn'") &&
  centralIndexContent.includes("export * as ReviewFeature from './review'") &&
  centralIndexContent.includes("export * as DojoFeature from './dojo'") &&
  centralIndexContent.includes("export * as SenseiFeature from './sensei'") &&
  centralIndexContent.includes("export * as SettingsFeature from './settings'"),
  'src/features/index.ts must export all 5 core feature domains'
);
console.log('  ✅ Check 14.1 passed: All 5 domain feature directories and barrels verified.');

// ── Check 14.2: Dojo Pillars Modular Extraction ─────────────────────────
console.log('  Check 14.2: Verifying Dojo 4-Pillars Modular Extraction...');
const pillarsDir = path.join(featuresDir, 'dojo', 'pillars');
assert(fs.existsSync(pillarsDir), 'src/features/dojo/pillars must exist');

const requiredPillars = [
  'ReflexDrillsPillar.tsx',
  'DictionaryPillar.tsx',
  'ReferencePillar.tsx',
  'CbtSimulatorPillar.tsx',
];

for (const pillarFile of requiredPillars) {
  const pillarPath = path.join(pillarsDir, pillarFile);
  assert(fs.existsSync(pillarPath), `${pillarFile} must exist in pillars directory`);
  const content = fs.readFileSync(pillarPath, 'utf8');
  const compName = pillarFile.replace('.tsx', '');
  assert(content.includes(`export const ${compName}`), `${pillarFile} must export ${compName}`);
}
console.log('  ✅ Check 14.2 passed: All 4 Dojo pillars modular extraction verified.');

// ── Check 14.3: Path Aliases in tsconfig.json & vite.config.ts ──────────
console.log('  Check 14.3: Verifying Path Aliases in tsconfig.json and vite.config.ts...');
const tsconfigPath = path.join(ROOT, 'tsconfig.json');
const viteConfigPath = path.join(ROOT, 'vite.config.ts');

assert(fs.existsSync(tsconfigPath), 'tsconfig.json must exist');
assert(fs.existsSync(viteConfigPath), 'vite.config.ts must exist');

const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
const viteConfigContent = fs.readFileSync(viteConfigPath, 'utf8');

assert(
  tsconfigContent.includes('"@/*"') && tsconfigContent.includes('"@public/*"'),
  'tsconfig.json must define @/* and @public/* path aliases'
);

assert(
  viteConfigContent.includes("'@':") && viteConfigContent.includes("'@public':"),
  'vite.config.ts must resolve @ and @public path aliases'
);
console.log('  ✅ Check 14.3 passed: Path aliases verified in TypeScript and Vite configs.');

// ── Check 14.4: Vite Modular Chunks & Budget Safeguards ─────────────────
console.log('  Check 14.4: Verifying Rollup manualChunks & Modular Chunk Boundaries...');
assert(
  viteConfigContent.includes('vendor-react') &&
  viteConfigContent.includes('vendor-supabase') &&
  viteConfigContent.includes('vendor-icons') &&
  viteConfigContent.includes('vendor-state') &&
  viteConfigContent.includes('vendor-budoux') &&
  viteConfigContent.includes('vendor-tinybase') &&
  viteConfigContent.includes('app-infra'),
  'vite.config.ts must specify manualChunks for modular vendor isolation'
);
assert(
  viteConfigContent.includes('chunkSizeWarningLimit: 500'),
  'vite.config.ts must enforce 500 kB chunk size warning limit'
);
console.log('  ✅ Check 14.4 passed: Rollup manualChunks configuration verified.');

console.log('🎉 Suite 155: Directory Refactoring & Feature-Sliced Architecture 100% GREEN!\n');
process.exit(0);
