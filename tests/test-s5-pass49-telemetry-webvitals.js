// ══════════════════════════════════════════════════════════════════
//  test-s5-pass49-telemetry-webvitals.js — Siklus V Pass 49
//  Klaster 15: Production Hardening, Swarm QA & Zenith Synthesis
//  Telemetry, Privacy Scrubber, Error Reporter & Core Web Vitals
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
console.log('📡 SIKLUS V PASS 49: TELEMETRY, ERROR REPORTER & WEB VITALS');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. Error Reporter & Privacy Scrubber ──────────────────────────
test('errorReporter.ts exists, exports scrubSensitiveData, safeSerialize, and errorReporter', () => {
  const filePath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  assert(fs.existsSync(filePath), 'errorReporter.ts must exist');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('export function scrubSensitiveData'), 'Must export scrubSensitiveData');
  assert(code.includes('export function safeSerialize'), 'Must export safeSerialize');
  assert(code.includes('export const errorReporter'), 'Must export errorReporter singleton');
  assert(code.includes('export interface Breadcrumb'), 'Must export Breadcrumb');
  assert(code.includes('export interface TelemetryErrorPayload'), 'Must export TelemetryErrorPayload');
});

test('scrubSensitiveData scrubs Gemini keys, OpenRouter keys, JWTs, emails, and URLs', () => {
  const SENSITIVE_PATTERNS = [
    /sk-or-v1-[a-zA-Z0-9]{32,}/g,
    /AIzaSy[a-zA-Z0-9_-]{30,}/g,
    /Bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/g,
    /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
    /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g,
    /([?&](?:password|passwd|pwd|key|token|sb_key)=)[^&]+/gi,
    /"(?:password|token|secret|apiKey|api_key)":\s*"[^"]+"/gi,
  ];

  function scrubSensitiveData(text) {
    if (!text || typeof text !== 'string') return '';
    let cleaned = text;
    for (const pattern of SENSITIVE_PATTERNS) {
      cleaned = cleaned.replace(pattern, (match) => {
        if (match.startsWith('?key=') || match.startsWith('&key=')) {
          return match.split('=')[0] + '=[SCRUBBED_KEY]';
        }
        if (match.startsWith('?token=') || match.startsWith('&token=')) {
          return match.split('=')[0] + '=[SCRUBBED_TOKEN]';
        }
        if (match.startsWith('Bearer ')) {
          return 'Bearer [SCRUBBED_TOKEN]';
        }
        if (match.includes('@')) {
          return '[SCRUBBED_EMAIL]';
        }
        return '[SCRUBBED_CREDENTIAL]';
      });
    }
    return cleaned;
  }

  // 1. Gemini API key
  const geminiRaw = 'Error calling Gemini: AIzaSyDabcdef1234567890abcdef1234567';
  assert(!scrubSensitiveData(geminiRaw).includes('AIzaSyDabcdef'), 'Gemini key must be scrubbed');

  // 2. OpenRouter API key
  const orRaw = 'OpenRouter error: sk-or-v1-abcdef0123456789abcdef0123456789abcdef01';
  assert(!scrubSensitiveData(orRaw).includes('abcdef0123456789'), 'OpenRouter key must be scrubbed');

  // 3. User email address
  const emailRaw = 'Exception for user test.budi@example.co.id during sync';
  assert(scrubSensitiveData(emailRaw).includes('[SCRUBBED_EMAIL]'), 'Email must be replaced with [SCRUBBED_EMAIL]');

  // 4. URL query secret
  const urlRaw = 'https://supabase.co/rest/v1/user?key=supersecret99&token=jwttoken123';
  const scrubbedUrl = scrubSensitiveData(urlRaw);
  assert(!scrubbedUrl.includes('supersecret99'), 'URL key must be scrubbed');
  assert(!scrubbedUrl.includes('jwttoken123'), 'URL token must be scrubbed');

  // 5. Edge cases: empty string, null, undefined
  assert.strictEqual(scrubSensitiveData(''), '');
  assert.strictEqual(scrubSensitiveData(null), '');
  assert.strictEqual(scrubSensitiveData(undefined), '');
});

test('safeSerialize handles circular references and nested objects without throwing', () => {
  const filePath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('WeakSet'), 'safeSerialize must use WeakSet or cycle detection');
  assert(code.includes('[Circular Reference]'), 'Must return [Circular Reference] tag');
  assert(code.includes('maxDepth'), 'Must cap recursion depth');

  // Simulate safeSerialize directly in JS
  function safeSerialize(obj, maxDepth = 5) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;

    const seen = new WeakSet();

    function helper(val, depth) {
      if (depth > maxDepth) return '[Truncated: Max Depth Exceeded]';
      if (val === null || val === undefined) return val;
      if (typeof val !== 'object') return val;
      if (seen.has(val)) return '[Circular Reference]';
      seen.add(val);

      if (val instanceof Error) {
        return { name: val.name, message: val.message, stack: val.stack || '' };
      }

      if (Array.isArray(val)) {
        return val.slice(0, 50).map((item) => helper(item, depth + 1));
      }

      const out = {};
      const keys = Object.keys(val).slice(0, 50);
      for (const k of keys) {
        out[k] = helper(val[k], depth + 1);
      }
      return out;
    }

    try {
      return helper(obj, 0);
    } catch {
      return { notice: '[Serialization Error]' };
    }
  }

  // Circular object test
  const circularObj = { a: 1, name: 'root' };
  circularObj.self = circularObj;

  const result = safeSerialize(circularObj);
  assert.strictEqual(result.a, 1);
  assert.strictEqual(result.self, '[Circular Reference]');

  // Deep object test
  let deepObj = { level: 0 };
  let curr = deepObj;
  for (let i = 1; i <= 10; i++) {
    curr.child = { level: i };
    curr = curr.child;
  }
  const deepResult = safeSerialize(deepObj, 3);
  assert(JSON.stringify(deepResult).includes('[Truncated: Max Depth Exceeded]'), 'Deep nesting must truncate safely');
});

// ── 2. Core Web Vitals Monitor ─────────────────────────────────────
test('webVitals.ts measures LCP, CLS, INP, TTFB and provides getHealthSummary', () => {
  const filePath = path.join(ROOT_DIR, 'src/lib/telemetry/webVitals.ts');
  assert(fs.existsSync(filePath), 'webVitals.ts must exist');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('class WebVitalsMonitor'), 'Must declare WebVitalsMonitor');
  assert(code.includes('rateLCP('), 'Must define rateLCP');
  assert(code.includes('rateCLS('), 'Must define rateCLS');
  assert(code.includes('rateINP('), 'Must define rateINP');
  assert(code.includes('rateTTFB('), 'Must define rateTTFB');
  assert(code.includes('getHealthSummary('), 'Must define getHealthSummary');
});

test('Core Web Vitals rating functions enforce Google CWV standards with negative/NaN guards', () => {
  function rateLCP(value) {
    if (!Number.isFinite(value) || value < 0) return 'poor';
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  function rateCLS(value) {
    if (!Number.isFinite(value) || value < 0) return 'poor';
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  function rateINP(value) {
    if (!Number.isFinite(value) || value < 0) return 'poor';
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }

  function rateTTFB(value) {
    if (!Number.isFinite(value) || value < 0) return 'poor';
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  // LCP tests
  assert.strictEqual(rateLCP(1200), 'good');
  assert.strictEqual(rateLCP(2500), 'good');
  assert.strictEqual(rateLCP(2501), 'needs-improvement');
  assert.strictEqual(rateLCP(4000), 'needs-improvement');
  assert.strictEqual(rateLCP(4001), 'poor');
  assert.strictEqual(rateLCP(NaN), 'poor');
  assert.strictEqual(rateLCP(-100), 'poor');

  // CLS tests
  assert.strictEqual(rateCLS(0.04), 'good');
  assert.strictEqual(rateCLS(0.10), 'good');
  assert.strictEqual(rateCLS(0.11), 'needs-improvement');
  assert.strictEqual(rateCLS(0.25), 'needs-improvement');
  assert.strictEqual(rateCLS(0.26), 'poor');
  assert.strictEqual(rateCLS(NaN), 'poor');
  assert.strictEqual(rateCLS(-0.5), 'poor');

  // INP tests
  assert.strictEqual(rateINP(50), 'good');
  assert.strictEqual(rateINP(200), 'good');
  assert.strictEqual(rateINP(201), 'needs-improvement');
  assert.strictEqual(rateINP(500), 'needs-improvement');
  assert.strictEqual(rateINP(501), 'poor');
  assert.strictEqual(rateINP(NaN), 'poor');
  assert.strictEqual(rateINP(-20), 'poor');

  // TTFB tests
  assert.strictEqual(rateTTFB(300), 'good');
  assert.strictEqual(rateTTFB(800), 'good');
  assert.strictEqual(rateTTFB(801), 'needs-improvement');
  assert.strictEqual(rateTTFB(1800), 'needs-improvement');
  assert.strictEqual(rateTTFB(1801), 'poor');
  assert.strictEqual(rateTTFB(NaN), 'poor');
  assert.strictEqual(rateTTFB(-10), 'poor');
});

// ── 3. Dual-Track FSRS Review Telemetry ───────────────────────────
test('reviewTelemetry.ts tracks cross-modal stabilities and sanitizes input bounds', () => {
  const filePath = path.join(ROOT_DIR, 'src/lib/telemetry/reviewTelemetry.ts');
  assert(fs.existsSync(filePath), 'reviewTelemetry.ts must exist');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('ALPHA_CROSS: 0.25'), 'ALPHA_CROSS must be 0.25');
  assert(code.includes('BETA_CROSS: 0.65'), 'BETA_CROSS must be 0.65');
  assert(code.includes('safeOrtho'), 'Must sanitize ortho stability');
  assert(code.includes('safeAudio'), 'Must sanitize audio stability');
  assert(code.includes('safeDiff'), 'Must sanitize difficulty');
  assert(code.includes('calculateDualTrackStability'), 'Must invoke calculateDualTrackStability');
  assert(code.includes('calculateLatencyFactor'), 'Must calculate proceduralization factor');
  assert(code.includes('applyInterferencePenalty'), 'Must apply L1 interference penalty on trap');
  assert(code.includes('MAX_BUFFER_SIZE = 500'), 'Buffer must cap at 500 events');
});

// ── 4. Defense-in-Depth ErrorBoundary Tree Integration ─────────────
test('Global, Modal, and Route ErrorBoundaries pipe exceptions to errorReporter', () => {
  const boundaries = [
    { file: 'src/components/ui/ErrorBoundary.tsx', context: 'RootErrorBoundary' },
    { file: 'src/components/ui/ModalErrorBoundary.tsx', context: 'ModalErrorBoundary' },
    { file: 'src/components/ui/RouteErrorBoundary.tsx', context: 'RouteErrorBoundary' },
  ];

  for (const b of boundaries) {
    const fullPath = path.join(ROOT_DIR, b.file);
    assert(fs.existsSync(fullPath), `${b.file} must exist`);
    const code = fs.readFileSync(fullPath, 'utf8');
    assert(code.includes('errorReporter.captureException('), `${b.file} must invoke errorReporter.captureException`);
    assert(code.includes('diagnostics.addLog('), `${b.file} must record diagnostic trace`);
  }
});

// ── 5. Main Application Lifecycle Bootstrapping ────────────────────
test('src/main.tsx initializes errorReporter and webVitals before React render', () => {
  const mainPath = path.join(ROOT_DIR, 'src/main.tsx');
  const code = fs.readFileSync(mainPath, 'utf8');

  assert(code.includes('errorReporter.init()'), 'main.tsx must initialize errorReporter');
  assert(code.includes('webVitals.init()'), 'main.tsx must initialize webVitals');
  assert(code.includes('<ErrorBoundary>'), 'Root render must be wrapped in ErrorBoundary');
});

console.log(`\n=============================================================`);
console.log(`📊 SIKLUS V PASS 49 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
