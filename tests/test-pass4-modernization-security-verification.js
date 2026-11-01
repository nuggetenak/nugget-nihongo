// ══════════════════════════════════════════════════════════════════
//  test-pass4-modernization-security-verification.js
//  PASS 4 — Component Modernization, Security & Typography Safeguards
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
  }
}

console.log('\n=============================================================');
console.log('🛡️ RUNNING PASS 4: MODERNIZATION, SECURITY & TYPOGRAPHY AUDIT');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

const senseiPagePath = path.join(ROOT_DIR, 'src/pages/SenseiPage.tsx');
const senseiClientPath = path.join(ROOT_DIR, 'src/lib/ai/senseiClient.ts');
const workerPath = path.join(ROOT_DIR, 'worker.js');
const aiProxyPath = path.join(ROOT_DIR, 'workers/ai-proxy.js');
const settingsPagePath = path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx');
const profileTabPath = path.join(ROOT_DIR, 'src/components/settings/ProfileSettingsTab.tsx');
const audioTabPath = path.join(ROOT_DIR, 'src/components/settings/AudioSettingsTab.tsx');
const syncTabPath = path.join(ROOT_DIR, 'src/components/settings/SyncSettingsTab.tsx');
const advancedTabPath = path.join(ROOT_DIR, 'src/components/settings/AdvancedSettingsTab.tsx');
const appPath = path.join(ROOT_DIR, 'src/App.tsx');

const senseiPageCode = fs.readFileSync(senseiPagePath, 'utf8');
const senseiClientCode = fs.readFileSync(senseiClientPath, 'utf8');
const workerCode = fs.readFileSync(workerPath, 'utf8');
const aiProxyCode = fs.readFileSync(aiProxyPath, 'utf8');
const settingsCode = fs.readFileSync(settingsPagePath, 'utf8');
const appCode = fs.readFileSync(appPath, 'utf8');

// ── Check 1: SenseiPage.tsx W3C Semantic Ruby Parsing ──────────────
test('P4.1: SenseiPage.tsx implements W3C-compliant <ruby> with <rt> and <rp> tags', () => {
  assert(senseiPageCode.includes('<ruby key={match.index} lang="ja"'), 'Must render standard semantic <ruby> with lang="ja"');
  assert(senseiPageCode.includes('<rp className="text-[0em] opacity-0">(</rp>'), 'Must render opening <rp> tag');
  assert(senseiPageCode.includes('<rt className="text-[0.65em] text-accent/80 font-normal select-none -mb-0.5">{reading}</rt>'), 'Must render standard <rt> with reading');
  assert(senseiPageCode.includes('<rp className="text-[0em] opacity-0">)</rp>'), 'Must render closing <rp> tag');
});

test('P4.2: SenseiPage.tsx eradicates broken child span structure inside <ruby>', () => {
  assert(
    !senseiPageCode.includes('<span className="text-inherit">{kanji}</span>'),
    'Broken child <span> inside <ruby> must be eradicated'
  );
  assert(
    !senseiPageCode.includes('inline-flex flex-col items-center leading-none px-0.5">\n              <span className="text-[0.65em]'),
    'Inverted span structure must not exist'
  );
});

// ── Check 2: senseiClient.ts Hardcoded Key Eradication & /api/chat Proxy Route ──
test('P4.3: senseiClient.ts purges hardcoded base64 OpenRouter API key', () => {
  const base64Key = 'c2stb3ItdjEtNTBhYjZjODkxZTYyNzhjOGNiZmNiMzQzOGUxZDY2ZGE4ZWZiYTg2NmQ2Y2M5NDJjOGI2OWJiOWNlMzZmNjAwMA==';
  assert(!senseiClientCode.includes(base64Key), 'Base64 OpenRouter key must be completely purged from senseiClient');
  assert(!senseiClientCode.includes("atob('c2stb3It"), 'atob obfuscated key must not exist');
});

test('P4.4: senseiClient.ts routes requests to serverless /api/chat endpoint by default', () => {
  assert(senseiClientCode.includes("fetch('/api/chat'"), 'Must call /api/chat worker proxy endpoint');
  assert(senseiClientCode.includes('Route 0 (Default): Secure Worker Proxy (/api/chat)'), 'Must declare default worker proxy route');
});

test('P4.5: senseiClient.ts supports graceful fallback to user-supplied BYOK keys', () => {
  assert(senseiClientCode.includes('byokKey'), 'Must resolve user-supplied BYOK key');
  assert(senseiClientCode.includes("localStorage.getItem('nn_openrouter_api_key')"), 'Must check local OpenRouter BYOK key');
  assert(senseiClientCode.includes("localStorage.getItem('nn_gemini_api_key')"), 'Must check local Gemini BYOK key');
  assert(senseiClientCode.includes('proxyHeaders[\'Authorization\'] = `Bearer ${byokKey}`'), 'Must pass BYOK Bearer header to proxy');
  assert(senseiClientCode.includes('proxyHeaders[\'x-goog-api-key\'] = byokKey'), 'Must pass BYOK Google header to proxy');
  assert(senseiClientCode.includes('streamSenseiResponse'), 'Must maintain streamSenseiResponse export');
});

// ── Check 3: Cloudflare Worker & ai-proxy Routing ──────────────────
test('P4.6: worker.js routes /api/chat and AI endpoints to ai-proxy.js', () => {
  assert(workerCode.includes("import aiProxy from './workers/ai-proxy.js';"), 'worker.js must import ai-proxy.js');
  assert(workerCode.includes("url.pathname.startsWith('/api/')"), 'worker.js must intercept /api/ requests');
  assert(workerCode.includes('return aiProxy.fetch(request, env);'), 'worker.js must delegate to aiProxy.fetch');
});

test('P4.7: ai-proxy.js supports /api/chat route and BYOK header authentication', () => {
  assert(aiProxyCode.includes("case '/api/chat':"), 'ai-proxy.js must route /api/chat');
  assert(aiProxyCode.includes("request.headers.get('Authorization')"), 'ai-proxy.js must read Authorization header');
  assert(aiProxyCode.includes("request.headers.get('x-goog-api-key')"), 'ai-proxy.js must read x-goog-api-key header');
  assert(aiProxyCode.includes('hasByok'), 'ai-proxy.js must detect user BYOK');
});

// ── Check 4: SettingsPage.tsx Modularization & Non-Destructive Scaling ──
test('P4.8: SettingsPage.tsx is deconstructed from 1,788 lines into modular domain components', () => {
  assert(fs.existsSync(profileTabPath), 'ProfileSettingsTab.tsx must exist');
  assert(fs.existsSync(audioTabPath), 'AudioSettingsTab.tsx must exist');
  assert(fs.existsSync(syncTabPath), 'SyncSettingsTab.tsx must exist');
  assert(fs.existsSync(advancedTabPath), 'AdvancedSettingsTab.tsx must exist');

  const lineCount = settingsCode.split('\n').length;
  assert(lineCount < 600, `SettingsPage.tsx must be modularized (< 600 lines), got ${lineCount} lines`);
  assert(settingsCode.includes('<ProfileSettingsTab'), 'SettingsPage must render ProfileSettingsTab');
  assert(settingsCode.includes('<AudioSettingsTab'), 'SettingsPage must render AudioSettingsTab');
  assert(settingsCode.includes('<SyncSettingsTab'), 'SettingsPage must render SyncSettingsTab');
  assert(settingsCode.includes('<AdvancedSettingsTab'), 'SettingsPage must render AdvancedSettingsTab');
});

test('P4.9: SettingsPage.tsx implements structured tabbed sub-navigation (#settings/profil, etc.)', () => {
  assert(settingsCode.includes("type SettingsTab = 'profil' | 'audio' | 'sync' | 'lanjutan';"), 'Must define SettingsTab domain types');
  assert(settingsCode.includes('#settings/profil'), 'Must define #settings/profil hash sub-route');
  assert(settingsCode.includes('#settings/audio'), 'Must define #settings/audio hash sub-route');
  assert(settingsCode.includes('#settings/sync'), 'Must define #settings/sync hash sub-route');
  assert(settingsCode.includes('#settings/lanjutan'), 'Must define #settings/lanjutan hash sub-route');
  assert(appCode.includes("rootSegment === 'profil' || rootSegment === 'pengaturan' || rootSegment === 'settings'"), 'App.tsx must support sub-path routing');
});

test('P4.10: SettingsPage.tsx eliminates destructive root fontSize overrides in favor of rem scaling', () => {
  assert(
    !settingsCode.includes("document.documentElement.style.fontSize = '15px'"),
    'Must eradicate fixed 15px root font override'
  );
  assert(
    !settingsCode.includes("document.documentElement.style.fontSize = '16px'"),
    'Must eradicate fixed 16px root font override'
  );
  assert(
    !settingsCode.includes("document.documentElement.style.fontSize = '17.5px'"),
    'Must eradicate fixed 17.5px root font override'
  );
  assert(
    settingsCode.includes("document.documentElement.style.fontSize = '93.75%'"),
    'Must apply proportional 93.75% rem scaling for small'
  );
  assert(
    settingsCode.includes("document.documentElement.style.fontSize = '109.375%'"),
    'Must apply proportional 109.375% rem scaling for large'
  );
  assert(
    settingsCode.includes("document.documentElement.style.fontSize = ''"),
    'Must preserve default system font size for normal'
  );
  assert(
    settingsCode.includes("document.documentElement.setAttribute('data-text-size', 'small')"),
    'Must set data-text-size attribute'
  );
});

// ── Check 5: Forensic Ruby Layout, BYOK Storage & Viewport Rigor ──
test('P4.11: SenseiPage eliminates flex-col override on <ruby> to ensure native top positioning', () => {
  assert(
    !senseiPageCode.includes('inline-flex flex-col items-center leading-normal px-0.5'),
    'SenseiPage must not apply flex-col to <ruby> which pushes reading below kanji'
  );
  assert(
    senseiPageCode.includes('className="font-jp [ruby-position:over] px-0.5 leading-normal"'),
    'SenseiPage must use standard ruby layout with [ruby-position:over]'
  );
});

test('P4.12: streamSenseiResponse provides graceful serverless proxy fallback instead of hard crash', () => {
  assert(
    senseiClientCode.includes('sendSenseiMessage(messages, config, contextCard)'),
    'streamSenseiResponse must fall back to sendSenseiMessage when no BYOK key is set'
  );
  assert(
    senseiClientCode.includes('onChunk(reply.content)'),
    'streamSenseiResponse fallback must emit chunks via onChunk'
  );
});

test('P4.13: SettingsPage.tsx supports seamless OpenRouter and Gemini BYOK key persistence', () => {
  assert(
    settingsCode.includes("localStorage.getItem('nn_openrouter_api_key') ||\n        localStorage.getItem('nn_gemini_api_key')"),
    'SettingsPage must read both OpenRouter and Gemini stored keys'
  );
  assert(
    settingsCode.includes("localStorage.setItem('nn_openrouter_api_key', trimmed)"),
    'SettingsPage must save OpenRouter keys to nn_openrouter_api_key'
  );
});

test('P4.14: App.tsx initializes persisted text scaling on mount across cold starts', () => {
  assert(
    appCode.includes("const savedTextSize = localStorage.getItem('nn_text_size');"),
    'App.tsx must read persisted text size on startup'
  );
  assert(
    appCode.includes("document.documentElement.style.fontSize = '93.75%'"),
    'App.tsx must apply small rem scaling'
  );
  assert(
    appCode.includes("document.documentElement.style.fontSize = '109.375%'"),
    'App.tsx must apply large rem scaling'
  );
});

test('P4.15: AdvancedSettingsTab modals enforce mobile viewport constraint max-h-[90dvh]', () => {
  const advancedCode = fs.readFileSync(advancedTabPath, 'utf8');
  assert(
    advancedCode.includes('max-h-[90dvh] overflow-y-auto'),
    'AdvancedSettingsTab dialog cards must include max-h-[90dvh] overflow-y-auto'
  );
});

console.log('\n-------------------------------------------------------------');
console.log(`📊 PASS 4 AUDIT RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('-------------------------------------------------------------\n');

if (passedTests === totalTests) {
  console.log('🌟 PASS 4 FORENSICALLY CERTIFIED — 100% GREEN!\n');
  process.exit(0);
} else {
  console.error('💥 PASS 4 VERIFICATION FAILED!\n');
  process.exit(1);
}
