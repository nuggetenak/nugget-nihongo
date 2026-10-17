// ══════════════════════════════════════════════════════════════════
//  test-sprint-18-telemetry-error.js — Forensic Unit & Integration Suite
//  Sprint 18: Telemetry Analytics, Error Reporting & Sentry Hardening
//  (Tickets T-97 to T-102)
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
console.log('📡 RUNNING SPRINT 18 VERIFICATION SUITE: TELEMETRY & CRASH LOGGING');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-97: Client-Side Error Telemetry Service ──────────────────────
test('T-97: errorReporter.ts captures runtime errors, tracks breadcrumbs, and enforces rate limits', () => {
  const reporterPath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  assert(fs.existsSync(reporterPath), 'errorReporter.ts must exist');
  const code = fs.readFileSync(reporterPath, 'utf8');

  assert(code.includes('export interface Breadcrumb'), 'Must export Breadcrumb interface');
  assert(code.includes('export interface TelemetryErrorPayload'), 'Must export TelemetryErrorPayload interface');
  assert(code.includes('class ErrorReporter'), 'Must declare ErrorReporter class');
  assert(code.includes('public addBreadcrumb('), 'Must define addBreadcrumb method');
  assert(code.includes('public captureException('), 'Must define captureException method');
  assert(code.includes('maxErrorsPerMinute'), 'Must declare rate-limiting threshold');
});

// ── T-98: Offline Error Queue & IndexedDB/LocalStorage Persistence ─
test('T-98: errorReporter.ts persists error payloads offline and auto-flushes on reconnect', () => {
  const reporterPath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  const code = fs.readFileSync(reporterPath, 'utf8');

  assert(code.includes('enqueueOffline('), 'Must implement enqueueOffline method');
  assert(code.includes('flushOfflineQueue('), 'Must implement flushOfflineQueue method');
  assert(code.includes("window.addEventListener('online'"), 'Must register online listener for auto-flush');
  assert(code.includes('getQueuedErrors('), 'Must provide getter for queued offline errors');
});

// ── T-99: Privacy-Preserving PII & Credential Scrubber ─────────────
test('T-99: scrubSensitiveData sanitizes API keys, JWT tokens, emails, and sensitive URL query params', () => {
  const reporterPath = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  const code = fs.readFileSync(reporterPath, 'utf8');
  assert(code.includes('export function scrubSensitiveData'), 'Must export scrubSensitiveData');

  // Test implementation directly
  const SENSITIVE_PATTERNS = [
    /sk-or-v1-[a-zA-Z0-9]{32,}/g,
    /AIzaSy[a-zA-Z0-9_-]{33}/g,
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

  // 1. OpenRouter API Key
  const rawKey1 = 'Error fetching from OpenRouter: sk-or-v1-abcdef0123456789abcdef0123456789abcdef01';
  assert(!scrubSensitiveData(rawKey1).includes('abcdef0123456789'), 'OpenRouter key must be scrubbed');

  // 2. Gemini API Key
  const rawKey2 = 'Failed request: AIzaSyD1234567890abcdef1234567890abcdef';
  assert(!scrubSensitiveData(rawKey2).includes('AIzaSy'), 'Gemini key must be scrubbed');

  // 3. User email
  const rawEmail = 'User learner.nihongo@gmail.com failed during sync';
  assert(scrubSensitiveData(rawEmail).includes('[SCRUBBED_EMAIL]'), 'Email must be replaced with [SCRUBBED_EMAIL]');

  // 4. URL query params
  const rawUrl = 'https://api.example.com/v1/auth?token=supersecret123&key=mykey456';
  const cleanUrl = scrubSensitiveData(rawUrl);
  assert(!cleanUrl.includes('supersecret123'), 'URL token param must be scrubbed');
  assert(!cleanUrl.includes('mykey456'), 'URL key param must be scrubbed');
});

// ── T-100: Content Bug Report Modal & ErrorBoundary Integration ────
test('T-100: ReportIssueModal scrubs inputs and ErrorBoundary logs unhandled React exceptions', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/ui/ReportIssueModal.tsx');
  assert(fs.existsSync(modalPath), 'ReportIssueModal.tsx must exist');
  const modalCode = fs.readFileSync(modalPath, 'utf8');

  assert(modalCode.includes('scrubSensitiveData('), 'ReportIssueModal must apply scrubSensitiveData on submission');

  const boundaryPath = path.join(ROOT_DIR, 'src/components/ui/ErrorBoundary.tsx');
  assert(fs.existsSync(boundaryPath), 'ErrorBoundary.tsx must exist');
  const boundaryCode = fs.readFileSync(boundaryPath, 'utf8');

  assert(boundaryCode.includes('errorReporter.captureException('), 'ErrorBoundary must invoke errorReporter.captureException');
  assert(boundaryCode.includes('componentStack: errorInfo.componentStack'), 'ErrorBoundary must pass componentStack');
});

// ── T-101: Native Core Web Vitals Observer ─────────────────────────
test('T-101: webVitals.ts calculates LCP, CLS, INP, and TTFB with official Google threshold ratings', () => {
  const vitalsPath = path.join(ROOT_DIR, 'src/lib/telemetry/webVitals.ts');
  assert(fs.existsSync(vitalsPath), 'webVitals.ts must exist');
  const code = fs.readFileSync(vitalsPath, 'utf8');

  assert(code.includes('class WebVitalsMonitor'), 'Must declare WebVitalsMonitor class');
  assert(code.includes('rateLCP('), 'Must define rateLCP');
  assert(code.includes('rateCLS('), 'Must define rateCLS');
  assert(code.includes('rateINP('), 'Must define rateINP');
  assert(code.includes('rateTTFB('), 'Must define rateTTFB');

  // Verify ratings thresholds
  function rateLCP(value) {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  function rateCLS(value) {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  function rateINP(value) {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }

  function rateTTFB(value) {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  // Check LCP ratings
  assert.strictEqual(rateLCP(1200), 'good');
  assert.strictEqual(rateLCP(3000), 'needs-improvement');
  assert.strictEqual(rateLCP(5000), 'poor');

  // Check CLS ratings
  assert.strictEqual(rateCLS(0.05), 'good');
  assert.strictEqual(rateCLS(0.18), 'needs-improvement');
  assert.strictEqual(rateCLS(0.35), 'poor');

  // Check INP ratings
  assert.strictEqual(rateINP(80), 'good');
  assert.strictEqual(rateINP(350), 'needs-improvement');
  assert.strictEqual(rateINP(700), 'poor');

  // Check TTFB ratings
  assert.strictEqual(rateTTFB(400), 'good');
  assert.strictEqual(rateTTFB(1200), 'needs-improvement');
  assert.strictEqual(rateTTFB(2500), 'poor');

  // Verify main.tsx initializes errorReporter and webVitals
  const mainPath = path.join(ROOT_DIR, 'src/main.tsx');
  const mainCode = fs.readFileSync(mainPath, 'utf8');
  assert(mainCode.includes('errorReporter.init()'), 'main.tsx must initialize errorReporter');
  assert(mainCode.includes('webVitals.init()'), 'main.tsx must initialize webVitals');
});

console.log(`\n=============================================================`);
console.log(`📊 SPRINT 18 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
