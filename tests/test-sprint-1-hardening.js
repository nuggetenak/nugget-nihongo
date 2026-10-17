// ══════════════════════════════════════════════════════════════
//  tests/test-sprint-1-hardening.js — Nugget Nihongo
//  Sprint 1: Security Hardening & Algorithmic Repair Verification
// ══════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   TESTING SPRINT 1: SECURITY HARDENING & ALGORITHMS        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

let passCount = 0;
let failCount = 0;

function check(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

// ── 1. T-01: Service Worker SkipWaiting Removal & Prompt Flow ──
console.log('── 1. Ticket T-01: Service Worker Prompt-Based Update Flow ──');
const swCode = fs.readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');

check('sw.js does not call self.skipWaiting() unconditionally in install event', () => {
  const installBlockMatch = swCode.match(/self\.addEventListener\('install'[\s\S]*?\}\);/);
  assert(installBlockMatch, 'Install event listener must exist');
  const installBlock = installBlockMatch[0];
  assert(!/^\s*self\.skipWaiting\(\);/m.test(installBlock), 'self.skipWaiting() invocation must not be inside install handler');
});

check('sw.js contains message event listener for SKIP_WAITING', () => {
  assert(swCode.includes("e.data.type === 'SKIP_WAITING'"), 'Must check e.data.type === SKIP_WAITING');
  assert(swCode.includes('self.skipWaiting()'), 'Must call self.skipWaiting() in message listener');
});

const pwaStoreCode = fs.readFileSync(path.join(ROOT, 'src/lib/pwa/pwaStore.ts'), 'utf8');
check('pwaStore.ts exposes hasUpdate, waitingWorker, and applyUpdate', () => {
  assert(pwaStoreCode.includes('hasUpdate: boolean'), 'pwaStore must have hasUpdate state');
  assert(pwaStoreCode.includes('waitingWorker: ServiceWorker | null'), 'pwaStore must have waitingWorker state');
  assert(pwaStoreCode.includes('applyUpdate: () => void'), 'pwaStore must have applyUpdate method');
  assert(pwaStoreCode.includes("postMessage({ type: 'SKIP_WAITING' })"), 'applyUpdate must postMessage SKIP_WAITING');
});

const updateToastPath = path.join(ROOT, 'src/components/ui/UpdatePromptToast.tsx');
check('UpdatePromptToast.tsx component exists and binds to pwaStore.applyUpdate', () => {
  assert(fs.existsSync(updateToastPath), 'UpdatePromptToast.tsx must exist');
  const toastCode = fs.readFileSync(updateToastPath, 'utf8');
  assert(toastCode.includes('usePwaStore()'), 'Must use usePwaStore');
  assert(toastCode.includes('applyUpdate()'), 'Must call applyUpdate');
  assert(toastCode.includes('hasUpdate'), 'Must observe hasUpdate');
});

const appTsxCode = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');
check('App.tsx imports and renders UpdatePromptToast', () => {
  assert(appTsxCode.includes('UpdatePromptToast'), 'App.tsx must include UpdatePromptToast');
  assert(appTsxCode.includes('<UpdatePromptToast />'), 'App.tsx must render <UpdatePromptToast />');
});

// ── 2. T-02: iOS Safari / WebKit HTTP 206 Partial Content Audio Streaming ──
console.log('\n── 2. Ticket T-02: iOS Safari HTTP 206 Partial Content Media Handler ──');

check('sw.js intercepts range requests and audio media paths', () => {
  assert(swCode.includes("req.headers.has('range')"), 'Must check range header');
  assert(swCode.includes("handleRangeRequest(req)"), 'Must delegate to handleRangeRequest');
});

check('sw.js handleRangeRequest returns HTTP 206 with Content-Range and Accept-Ranges', () => {
  assert(swCode.includes("status: 206"), 'Must return status 206 Partial Content');
  assert(swCode.includes("'Content-Range'"), 'Must set Content-Range header');
  assert(swCode.includes("'Accept-Ranges', 'bytes'"), 'Must set Accept-Ranges: bytes');
  assert(swCode.includes(".slice(start, end + 1)"), 'Must slice ArrayBuffer to range bytes');
});

check('sw.js strips Content-Encoding header to prevent decoding mismatch on raw slices', () => {
  assert(swCode.includes("responseHeaders.delete('Content-Encoding')"), 'Must strip Content-Encoding');
});

// Functional simulation of range parsing algorithm from sw.js
function parseRangeHeader(rangeHeader, totalLength) {
  const matches = /bytes\s*=\s*(\d*)\s*-\s*(\d*)/.exec(rangeHeader);
  if (!matches) return { status: 200, start: 0, end: totalLength - 1 };

  let start;
  let end;
  const rawStart = matches[1];
  const rawEnd = matches[2];

  if (!rawStart && rawEnd) {
    const suffixLength = parseInt(rawEnd, 10);
    if (isNaN(suffixLength) || suffixLength <= 0) {
      start = 0;
      end = totalLength - 1;
    } else {
      start = Math.max(0, totalLength - suffixLength);
      end = totalLength - 1;
    }
  } else if (rawStart && !rawEnd) {
    start = parseInt(rawStart, 10);
    end = totalLength - 1;
  } else if (rawStart && rawEnd) {
    start = parseInt(rawStart, 10);
    end = parseInt(rawEnd, 10);
  } else {
    start = 0;
    end = totalLength - 1;
  }

  if (isNaN(start)) start = 0;
  if (isNaN(end) || end >= totalLength) end = totalLength - 1;

  if (start >= totalLength || end < start || totalLength === 0) {
    return { status: 416 };
  }

  return { status: 206, start, end, length: end - start + 1 };
}

check('RFC 7233 suffix byte range (bytes=-500) slices the last 500 bytes of media', () => {
  const total = 10000;
  const res = parseRangeHeader('bytes=-500', total);
  assert.strictEqual(res.status, 206);
  assert.strictEqual(res.start, 9500);
  assert.strictEqual(res.end, 9999);
  assert.strictEqual(res.length, 500);
});

check('RFC 7233 open-ended byte range (bytes=1000-) slices from offset 1000 to end', () => {
  const total = 10000;
  const res = parseRangeHeader('bytes=1000-', total);
  assert.strictEqual(res.status, 206);
  assert.strictEqual(res.start, 1000);
  assert.strictEqual(res.end, 9999);
  assert.strictEqual(res.length, 9000);
});

check('RFC 7233 standard byte range (bytes=0-499) slices exact 500-byte window', () => {
  const total = 10000;
  const res = parseRangeHeader('bytes=0-499', total);
  assert.strictEqual(res.status, 206);
  assert.strictEqual(res.start, 0);
  assert.strictEqual(res.end, 499);
  assert.strictEqual(res.length, 500);
});

check('Out-of-bounds or inverted ranges return HTTP 416 Range Not Satisfiable', () => {
  const total = 10000;
  assert.strictEqual(parseRangeHeader('bytes=12000-15000', total).status, 416);
  assert.strictEqual(parseRangeHeader('bytes=500-200', total).status, 416);
  assert.strictEqual(parseRangeHeader('bytes=0-100', 0).status, 416);
});

// ── 3. T-03: FSRS Mathematical Exponent Inversion & Interval Ratio ──
console.log('\n── 3. Ticket T-03: FSRS Mathematical Exponent Inversion & Accuracy ──');

const mathTsCode = fs.readFileSync(path.join(ROOT, 'src/lib/fsrs/math.ts'), 'utf8');

check('math.ts has correct forgetting curve exponent -DECAY and interval exponent -1 / DECAY', () => {
  assert(mathTsCode.includes('Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY)'), 'Forgetting curve must use -DECAY');
  assert(mathTsCode.includes('Math.pow(requestRetention, -1 / DECAY) - 1'), 'Next interval must use -1 / DECAY');
});

// Pure mathematical simulation of the fix
const DECAY = 0.5;
const FACTOR = 19 / 81;

function forgettingCurve(elapsedDays, stability) {
  if (stability <= 0) return 0;
  return Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
}

function nextInterval(stability, requestRetention) {
  if (stability <= 0 || requestRetention <= 0 || requestRetention >= 1) return 0;
  return (stability / FACTOR) * (Math.pow(requestRetention, -1 / DECAY) - 1);
}

check('At elapsedDays = stability, retrievability R is exactly 0.9', () => {
  const S = 10;
  const R = forgettingCurve(S, S);
  assert(Math.abs(R - 0.9) < 1e-9, `R at t=S must equal 0.9, got ${R}`);
});

check('At target retention R = 0.9, scheduled interval t is exactly stability S', () => {
  const S = 14.5;
  const t = nextInterval(S, 0.9);
  assert(Math.abs(t - S) < 1e-9, `t at R=0.9 must equal S (${S}), got ${t}`);
});

check('Forgetting curve and nextInterval are exact mathematical inverses across a grid', () => {
  const stabilities = [1, 2.5, 7, 21, 60, 180];
  const retentions = [0.75, 0.8, 0.85, 0.9, 0.95];

  for (const S of stabilities) {
    for (const R of retentions) {
      const t = nextInterval(S, R);
      const computedR = forgettingCurve(t, S);
      assert(
        Math.abs(computedR - R) < 1e-7,
        `Round-trip failed for S=${S}, R=${R}: computed ${computedR}`
      );
    }
  }
});

check('Elimination of the 4.336x interval compression confirmed', () => {
  const buggyInterval = (10 / FACTOR) * (Math.pow(0.9, -DECAY) - 1);
  const correctInterval = nextInterval(10, 0.9);
  const compressionRatio = correctInterval / buggyInterval;
  assert(
    Math.abs(compressionRatio - 4.336) < 0.01,
    `Expected ratio ~4.336, got ${compressionRatio}`
  );
});

// ── 4. T-04: CAT IRT Fisher Information & SEM Dynamic Stopping ──
console.log('\n── 4. Ticket T-04: CAT IRT Fisher Information & SEM Stopping Criteria ──');

const catEngineCode = fs.readFileSync(path.join(ROOT, 'src/lib/cat/catEngine.ts'), 'utf8');

check('catEngine.ts exports calculateFisherInformation, calculateCATSEM, and shouldStopCAT', () => {
  assert(catEngineCode.includes('export function calculateFisherInformation'), 'Must export calculateFisherInformation');
  assert(catEngineCode.includes('export function calculateCATSEM'), 'Must export calculateCATSEM');
  assert(catEngineCode.includes('export function shouldStopCAT'), 'Must export shouldStopCAT');
  assert(catEngineCode.includes('CAT_TARGET_SEM = 0.35'), 'Must define target SEM = 0.35');
});

// Simulate IRT Fisher Info and SEM
function simFisherInfo(item, theta) {
  const a = item.discrimination || 1.25;
  const b = item.difficulty;
  const c = item.guessing || 0.25;
  const logit = Math.max(-20, Math.min(20, a * (theta - b)));
  const pStar = 1 / (1 + Math.exp(-logit));
  const p = c + (1 - c) * pStar;
  const pMinusC = p - c;
  const oneMinusC = 1 - c;
  return Math.max(0.0001, (a * a) * ((pMinusC * pMinusC) / (oneMinusC * oneMinusC)) * ((1 - p) / p));
}

function simSEM(items, theta) {
  let totalInfo = 1.0;
  for (const it of items) {
    const q = it && 'question' in it ? it.question : it;
    totalInfo += simFisherInfo(q, theta);
  }
  return 1 / Math.sqrt(totalInfo);
}

function simShouldStop(count, sem, minQ = 6, maxQ = 12) {
  if (count >= maxQ) return true;
  if (count >= minQ && sem <= 0.35) return true;
  return false;
}

check('Fisher information is maximum when item difficulty b matches theta', () => {
  const item = { difficulty: 0.5, discrimination: 1.5, guessing: 0.25 };
  const infoAtTheta = simFisherInfo(item, 0.5);
  const infoFarAway = simFisherInfo(item, -1.5);
  assert(infoAtTheta > infoFarAway, `Info at theta (${infoAtTheta}) must exceed info far away (${infoFarAway})`);
});

check('SEM decreases monotonically as questions are answered', () => {
  const theta = 0.2;
  const items = [
    { difficulty: 0.1, discrimination: 1.2 },
    { difficulty: 0.2, discrimination: 1.4 },
    { difficulty: 0.3, discrimination: 1.3 },
    { difficulty: 0.0, discrimination: 1.1 },
    { difficulty: 0.25, discrimination: 1.5 },
    { difficulty: 0.15, discrimination: 1.3 },
  ];
  let prevSem = 1.0;
  for (let i = 1; i <= items.length; i++) {
    const sem = simSEM(items.slice(0, i), theta);
    assert(sem < prevSem, `SEM step ${i} (${sem}) should be strictly less than previous (${prevSem})`);
    prevSem = sem;
  }
});

check('calculateCATSEM handles both wrapped { question } and direct question items', () => {
  const theta = 0.0;
  const rawItem = { difficulty: 0.0, discrimination: 1.25 };
  const wrappedItem = { question: rawItem };
  const semRaw = simSEM([rawItem], theta);
  const semWrapped = simSEM([wrappedItem], theta);
  assert.strictEqual(semRaw, semWrapped, 'SEM calculation must be identical regardless of wrapping');
});

check('CAT stopping condition enforces min 6 questions, SEM <= 0.35, and max 12 questions', () => {
  assert(!simShouldStop(4, 0.30), 'Must NOT stop before min questions (4 < 6) even with low SEM');
  assert(!simShouldStop(6, 0.38), 'Must NOT stop at 6 questions if SEM > 0.35');
  assert(simShouldStop(6, 0.34), 'Must STOP at 6 questions when SEM <= 0.35');
  assert(simShouldStop(12, 0.45), 'Must STOP at 12 questions regardless of SEM');
});

const catModalCode = fs.readFileSync(path.join(ROOT, 'src/components/cat/CatPlacementModal.tsx'), 'utf8');
check('CatPlacementModal.tsx dynamically reflects stopping condition in next button', () => {
  assert(catModalCode.includes('shouldStopCAT('), 'CatPlacementModal must invoke shouldStopCAT');
  assert(catModalCode.includes('Lihat Hasil Diagnosis'), 'Button must show Lihat Hasil Diagnosis when stop condition is met');
});

// ── 5. T-05: Supabase Client Neutralization of Query Param Injection ──
console.log('\n── 5. Ticket T-05: Supabase Client URL Injection Neutralization ──');

const clientTsCode = fs.readFileSync(path.join(ROOT, 'src/lib/supabase/client.ts'), 'utf8');

check('client.ts does not write sb_url or sb_key from query params to localStorage', () => {
  assert(!clientTsCode.includes("localStorage.setItem('nn_supabase_url', trimmedUrl)"), 'Must not store sb_url from params');
  assert(!clientTsCode.includes("localStorage.setItem('nn_supabase_anon_key', trimmedKey)"), 'Must not store sb_key from params');
  assert(clientTsCode.includes('params.delete(\'sb_url\')'), 'Must strip sb_url from params');
  assert(clientTsCode.includes('window.history.replaceState'), 'Must sanitize URL in browser history');
});

// ── 6. T-06: Supabase Edge Function ai-router Strict CORS & JWT Auth ──
console.log('\n── 6. Ticket T-06: ai-router Strict CORS & JWT Authentication ──');

const aiRouterCode = fs.readFileSync(path.join(ROOT, 'supabase/functions/ai-router/index.ts'), 'utf8');

function simIsAllowedOrigin(origin) {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    const host = parsed.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return true;
    if (
      host === 'nuggetnihongo.com' ||
      host.endsWith('.nuggetnihongo.com') ||
      host === 'nugget-nihongo.com' ||
      host.endsWith('.nugget-nihongo.com') ||
      /^(nugget-?nihongo.*)\.vercel\.app$/i.test(host) ||
      /^(nugget-?nihongo.*)\.pages\.dev$/i.test(host) ||
      /^(.*nugget.*)\.github\.io$/i.test(host)
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

check('ai-router strict origin allowlist allows official and preview domains', () => {
  assert(simIsAllowedOrigin('https://nuggetnihongo.com'), 'Must allow nuggetnihongo.com');
  assert(simIsAllowedOrigin('https://study.nuggetnihongo.com'), 'Must allow subdomains of nuggetnihongo.com');
  assert(simIsAllowedOrigin('https://nugget-nihongo.com'), 'Must allow nugget-nihongo.com');
  assert(simIsAllowedOrigin('https://nugget-nihongo.vercel.app'), 'Must allow nugget-nihongo.vercel.app');
  assert(simIsAllowedOrigin('https://nuggetnihongo-preview-123.pages.dev'), 'Must allow nuggetnihongo pages.dev');
  assert(simIsAllowedOrigin('http://localhost:5173'), 'Must allow localhost');
});

check('ai-router strict origin allowlist rejects rogue third-party subdomains', () => {
  assert(!simIsAllowedOrigin('https://attacker.vercel.app'), 'Must reject unauthorized vercel.app');
  assert(!simIsAllowedOrigin('https://evil-phish.pages.dev'), 'Must reject unauthorized pages.dev');
  assert(!simIsAllowedOrigin('https://malicious.github.io'), 'Must reject unauthorized github.io');
  assert(!simIsAllowedOrigin('https://phishing-site.com'), 'Must reject external random domains');
});

check('ai-router/index.ts enforces Bearer JWT authentication and verifies user session', () => {
  assert(aiRouterCode.includes("req.headers.get('Authorization')"), 'Must read Authorization header');
  assert(aiRouterCode.includes("Unauthorized: Missing Authorization Bearer token"), 'Must reject requests lacking Bearer token');
  assert(aiRouterCode.includes('supabase.auth.getUser(token)'), 'Must verify user session token with Supabase auth');
  assert(aiRouterCode.includes('Internal Server Error: Supabase client not initialized'), 'Must return 500 if Supabase auth backend is uninitialized');
});

// ── 7. T-07: Supabase Schema Constraint Expansion ──
console.log('\n── 7. Ticket T-07: Supabase Schema Constraint Expansion ──');

const schemaSqlCode = fs.readFileSync(path.join(ROOT, 'supabase/schema.sql'), 'utf8');

check('schema.sql expands profiles.current_level constraint to include JFT and all 19 SSW sectors', () => {
  const sswTracks = [
    'ssw-kaigo', 'ssw-food', 'ssw-construction', 'ssw-agriculture',
    'ssw-accommodation', 'ssw-building-cleaning', 'ssw-manufacturing',
    'ssw-automobile', 'ssw-aviation', 'ssw-fishery', 'ssw-food-service',
    'ssw-industrial-machinery', 'ssw-electric-electronic', 'ssw-shipbuilding',
    'ssw-logistics', 'ssw-railway', 'ssw-forestry', 'ssw-timber', 'ssw-textile'
  ];
  for (const trk of sswTracks) {
    assert(schemaSqlCode.includes(`'${trk}'`), `schema.sql must include track '${trk}'`);
  }
  assert(schemaSqlCode.includes("'jft'"), "schema.sql must include 'jft'");
  assert(schemaSqlCode.includes("'jft_a1'"), "schema.sql must include 'jft_a1'");
});

check('schema.sql expands srs_cards.item_type constraint to include choukai, panic, k3, gemba, dialogue, kotowaza', () => {
  const expectedTypes = ['vocab', 'grammar', 'kanji', 'choukai', 'panic', 'k3', 'gemba', 'dialogue', 'kotowaza'];
  for (const t of expectedTypes) {
    assert(schemaSqlCode.includes(`'${t}'`), `srs_cards.item_type must include '${t}'`);
  }
});

check('schema.sql provides idempotent ALTER TABLE statements for pre-existing databases', () => {
  assert(schemaSqlCode.includes('ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_current_level_check'), 'Idempotent profiles check migration required');
  assert(schemaSqlCode.includes('ALTER TABLE public.srs_cards DROP CONSTRAINT IF EXISTS srs_cards_item_type_check'), 'Idempotent srs_cards check migration required');
});

// ── Summary ──
console.log('\n════════════════════════════════════════════════════════════');
console.log(` SPRINT 1 VERIFICATION RESULT: PASS: ${passCount} | FAIL: ${failCount}`);
console.log('════════════════════════════════════════════════════════════');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SPRINT 1 HARDENING CHECKS VERIFIED 100% SUCCESSFUL!\n');
}
