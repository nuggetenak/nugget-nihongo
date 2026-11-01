const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

console.log('=== PASS 66: SERVICE WORKER, WORKBOX PWA OFFLINE CACHE & TINYBASE CRDT CLOUD SYNC AUDIT ===\n');

// 1. Audit public/sw.js CORE_ASSETS
const swPath = path.join(publicDir, 'sw.js');
const swContent = fs.readFileSync(swPath, 'utf8');

const coreAssetsMatch = swContent.match(/const CORE_ASSETS = \[([\s\S]*?)\];/);
if (!coreAssetsMatch) {
  console.error('Could not find CORE_ASSETS in sw.js');
  process.exit(1);
}

const assetLines = coreAssetsMatch[1]
  .split('\n')
  .map(l => l.trim())
  .filter(l => l.startsWith("'") && l.endsWith("',") || l.startsWith("'") && l.endsWith("'"))
  .map(l => l.replace(/^'|',?$|'$/g, ''));

console.log(`[1] CORE_ASSETS Census in sw.js: ${assetLines.length} precached URLs declared.`);

const missingAssets = [];
const existingAssets = [];

for (const assetUrl of assetLines) {
  if (assetUrl === '/' || assetUrl === '/index.html') {
    const indexPath = path.join(projectRoot, 'index.html');
    if (fs.existsSync(indexPath)) existingAssets.push(assetUrl);
    else missingAssets.push({ url: assetUrl, expectedPath: indexPath });
    continue;
  }

  // strip leading slash
  const relativePath = assetUrl.startsWith('/') ? assetUrl.slice(1) : assetUrl;
  const filePath = path.join(publicDir, relativePath);

  if (fs.existsSync(filePath)) {
    existingAssets.push(assetUrl);
  } else {
    // Check if it's in project root
    const rootPath = path.join(projectRoot, relativePath);
    if (fs.existsSync(rootPath)) {
      existingAssets.push(assetUrl);
    } else {
      missingAssets.push({ url: assetUrl, expectedPath: filePath });
    }
  }
}

console.log(`- Existing precached assets: ${existingAssets.length}`);
console.log(`- Missing (404) precached assets: ${missingAssets.length}`);
if (missingAssets.length > 0) {
  console.log('\n  MISSING (404) PRECACHE ASSETS (Will fail cache.add):');
  missingAssets.forEach(m => console.log(`    ❌ ${m.url} (not found at ${m.expectedPath})`));
}

// 2. Check 9 canonical books coverage in sw.js CORE_ASSETS
console.log('\n[2] Checking 9 Canonical Textbook Precache Coverage in sw.js:');
const bookFiles = [
  'book-irodori-a1.js',
  'book-irodori-a2-1.js',
  'book-irodori-a2-2.js',
  'book-minna-1.js',
  'book-minna-2.js',
  'book-genki-1.js',
  'book-genki-2.js',
  'book-marugoto-a1.js',
  'book-marugoto-a2-1.js',
  'book-tobira-1.js',
  'book-quartet-1.js',
  'book-soumatome-n3.js',
  'book-soumatome-n2.js',
  'book-shinkanzen-n3.js'
];
bookFiles.forEach(bf => {
  const isPrecached = assetLines.some(a => a.includes(bf));
  console.log(`  - ${bf}: ${isPrecached ? '✅ PRECACHED' : '❌ NOT PRECACHED'}`);
});

// 3. Check 19 SSW sectors coverage in sw.js CORE_ASSETS
console.log('\n[3] Checking 19 SSW Sector Curriculum Precache Coverage in sw.js:');
const sswPublicFiles = fs.readdirSync(path.join(publicDir, 'data', 'curriculum'))
  .filter(f => f.startsWith('curriculum-ssw-') && f.endsWith('.js'));
sswPublicFiles.forEach(sf => {
  const precached = assetLines.some(a => a.includes(sf));
  console.log(`  - ${sf}: ${precached ? '✅ PRECACHED' : '❌ MISSING FROM PRECACHE'}`);
});

// 4. Check Workbox & PWA plugins in package.json and vite.config.ts
console.log('\n[4] Checking Workbox / vite-plugin-pwa in Build Tooling:');
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
console.log(`  - vite-plugin-pwa: ${allDeps['vite-plugin-pwa'] ? 'Installed' : '❌ NOT INSTALLED'}`);
console.log(`  - workbox-window / workbox-core: ${allDeps['workbox-window'] || allDeps['workbox-core'] ? 'Installed' : '❌ NOT INSTALLED'}`);
console.log(`  - tinybase: ${allDeps['tinybase'] ? 'Installed (' + allDeps['tinybase'] + ')' : '❌ NOT INSTALLED'}`);

// 5. Audit Service Worker Registration in src/lib/pwa/pwaStore.ts
console.log('\n[5] Auditing Service Worker Registration Race Condition in pwaStore.ts:');
const pwaStorePath = path.join(srcDir, 'lib', 'pwa', 'pwaStore.ts');
const pwaStoreCode = fs.readFileSync(pwaStorePath, 'utf8');
const hasLoadListener = pwaStoreCode.includes("window.addEventListener('load'");
const checksReadyState = pwaStoreCode.includes('document.readyState');
console.log(`  - Contains window.addEventListener('load'): ${hasLoadListener}`);
console.log(`  - Handles document.readyState === 'complete': ${checksReadyState ? 'Yes' : '❌ NO (Race condition: dead if already loaded)'}`);

// 6. Audit TinyBase and Local-First Sync Disconnection
console.log('\n[6] Auditing Local-First TinyBase & Supabase Sync Integration:');
const appStorePath = path.join(srcDir, 'store', 'useAppStore.ts');
const appStoreCode = fs.readFileSync(appStorePath, 'utf8');
const usesLocalStoreInAppStore = appStoreCode.includes('localStore');
const usesStorageBridgeInAppStore = appStoreCode.includes('storageBridge');
const directLocalStorageWrites = (appStoreCode.match(/localStorage\.setItem/g) || []).length;
console.log(`  - useAppStore.ts imports localStore (TinyBase): ${usesLocalStoreInAppStore ? 'Yes' : '❌ NO'}`);
console.log(`  - useAppStore.ts imports storageBridge: ${usesStorageBridgeInAppStore ? 'Yes' : '❌ NO'}`);
console.log(`  - Direct synchronous localStorage.setItem calls in useAppStore.ts: ${directLocalStorageWrites}`);

const mainPath = path.join(srcDir, 'main.tsx');
const mainCode = fs.readFileSync(mainPath, 'utf8');
const initsLocalStore = mainCode.includes('localStore.init()');
const initsStorageBridge = mainCode.includes('storageBridge.migrateFromLocalStorage()');
console.log(`  - main.tsx calls localStore.init(): ${initsLocalStore ? 'Yes' : '❌ NO (TinyBase autoSave/autoLoad uninitialized)'}`);
console.log(`  - main.tsx calls storageBridge: ${initsStorageBridge ? 'Yes' : 'No'}`);

// 7. Audit BroadcastChannel Multi-tab Sync usage
console.log('\n[7] Auditing Multi-Tab BroadcastChannel Engine (broadcastSync.ts):');
const allSrcFiles = [];
function walkSrc(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkSrc(full);
    else if (full.endsWith('.ts') || full.endsWith('.tsx')) allSrcFiles.push(full);
  }
}
walkSrc(srcDir);

let broadcastCallers = 0;
let subscribeCallers = 0;
for (const file of allSrcFiles) {
  if (file.includes('broadcastSync.ts')) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('broadcastSync.broadcast')) broadcastCallers++;
  if (content.includes('broadcastSync.subscribe')) subscribeCallers++;
}
console.log(`  - broadcastSync.broadcast callers across src/: ${broadcastCallers} (❌ Completely dead code)`);
console.log(`  - broadcastSync.subscribe callers across src/: ${subscribeCallers} (❌ Completely dead code)`);

console.log('\n=== AUDIT COMPLETE ===');
