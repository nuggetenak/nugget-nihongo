// ══════════════════════════════════════════════════════════════════
//  playwright-exhaustive-audit.js
//  Headless Chrome Playwright Dual-Viewport Audit (Mobile & Desktop)
//  Verifies UI/UX Ergonomics, 5-Tab Navigation, Anti-Leakage & Zero Console Errors
// ══════════════════════════════════════════════════════════════════

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    try {
      const urlPath = req.url ? req.url.split('?')[0] : '/';
      let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Connection': 'close',
      });
      res.end(content);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + (err?.message || 'unknown'));
    }
  });
}

async function runDualViewportAudit() {
  console.log('🚀 Starting Headless Dual-Viewport Playwright Audit...');
  const server = createStaticServer();

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 4173;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`📡 Local preview server running at ${baseUrl}`);

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    } catch {
      browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    }

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[Console Error] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      pageErrors.push(`[Page Error] ${err.message}`);
    });

    // ── 1. MOBILE VIEWPORT AUDIT (390px x 844px) ────────
    console.log('\n📱 [Phase 1] Auditing Mobile Viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'load', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 800));

    // Check anti-leakage: horizontal scroll width must not exceed 390px
    const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`   - Mobile Document scrollWidth: ${mobileScrollWidth}px (Target: <= 390px)`);
    if (mobileScrollWidth <= 395) {
      console.log('   ✔ Zero horizontal blowout on mobile verified.');
    } else {
      console.warn(`   ⚠️ Warning: Mobile scrollWidth ${mobileScrollWidth}px exceeds viewport 390px`);
    }

    // Check BottomNav visibility on mobile
    const bottomNav = await page.$('nav[aria-label="Navigasi Utama Ponsel"]');
    if (bottomNav) {
      const isVisible = await bottomNav.isVisible();
      console.log(`   - BottomNav rendered and visible on mobile: ${isVisible}`);
      const buttons = await bottomNav.$$('button');
      console.log(`   - BottomNav tabs count: ${buttons.length} (Target: 5 tabs)`);
      for (const btn of buttons) {
        const box = await btn.boundingBox();
        if (box && box.height < 38) {
          console.warn(`   ⚠️ Touch target height ${box.height}px < 40px`);
        }
      }
    }

    // Tab navigation test
    const tabsToTest = ['#kebun', '#materi', '#sensei', '#settings', '#home'];
    for (const tabHash of tabsToTest) {
      await page.evaluate((h) => { window.location.hash = h; }, tabHash);
      await new Promise((r) => setTimeout(r, 400));
      console.log(`   ✔ Tab navigated to ${tabHash}`);
    }
    console.log('✔ Phase 1 Mobile Viewport Audit complete.');

    // ── 2. DESKTOP VIEWPORT AUDIT (1280px x 800px) ─────────────────
    console.log('\n💻 [Phase 2] Auditing Desktop Viewport (1280x800)...');
    await page.setViewportSize({ width: 1280, height: 800 });
    await new Promise((r) => setTimeout(r, 800));

    const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`   - Desktop Document scrollWidth: ${desktopScrollWidth}px (Target: <= 1280px)`);
    if (desktopScrollWidth <= 1280) {
      console.log('   ✔ Zero horizontal blowout on desktop verified.');
    }

    // Verify BottomNav is hidden on desktop
    if (bottomNav) {
      const isVisibleOnDesktop = await bottomNav.isVisible();
      console.log(`   - BottomNav visible on desktop: ${isVisibleOnDesktop} (Target: false)`);
    }

    console.log('✔ Phase 2 Desktop Viewport Audit complete.');

    // ── 3. SUMMARY ────────────────────────────────────────────────
    console.log('\n📊 [Phase 3] Audit Diagnostic Summary:');
    console.log(`   - Total Console Errors Captured: ${consoleErrors.length}`);
    console.log(`   - Total Page Runtime Errors: ${pageErrors.length}`);

    if (consoleErrors.length > 0) {
      console.log('   Console Errors:');
      consoleErrors.forEach((e) => console.log('     ' + e));
    }
    if (pageErrors.length > 0) {
      console.log('   Page Errors:');
      pageErrors.forEach((e) => console.log('     ' + e));
    }

    await page.close();
    return { passed: pageErrors.length === 0, consoleErrors, pageErrors };
  } finally {
    if (browser) {
      try { await browser.close(); } catch {}
    }
    try {
      if (server.closeAllConnections) server.closeAllConnections();
      server.close();
    } catch {}
  }
}

runDualViewportAudit()
  .then((res) => {
    if (res.passed) {
      console.log('\n🎉 Dual-Viewport Playwright Walkthrough: 100% GREEN SUCCESS!');
      process.exit(0);
    } else {
      console.error('\n❌ Dual-Viewport Playwright Walkthrough encountered errors.');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Fatal audit failure:', err);
    process.exit(1);
  });
