const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');

const BASE_URL = 'http://localhost:5173';

function isServerRunning(url) {
  return new Promise((resolve) => {
    const req = http.get(url, () => resolve(true));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function capture() {
  let serverProcess = null;
  const running = await isServerRunning(BASE_URL);
  if (!running) {
    console.log(`⚡ Preview server not detected. Starting on ${BASE_URL}...`);
    serverProcess = spawn('npx', ['vite', 'preview', '--port', '5173'], {
      shell: true,
      cwd: path.join(__dirname, '..'),
      stdio: 'ignore',
    });
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 500));
      if (await isServerRunning(BASE_URL)) {
        console.log(`✅ Server is up and listening on ${BASE_URL}\n`);
        break;
      }
    }
  }

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const shotDir = path.join(__dirname, '../.playwright-cli/screenshots');
  if (!fs.existsSync(shotDir)) {
    fs.mkdirSync(shotDir, { recursive: true });
  }

  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('nn_onboarding_completed', 'true');
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });

    // 1. Home
    await page.screenshot({ path: path.join(shotDir, 'mobile-1-beranda.png') });
    console.log('✓ mobile-1-beranda.png');

    // 2. Materi Hub
    const materiBtn = page.locator('nav.fixed button:has-text("Materi")');
    await materiBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'mobile-2-materi.png') });
    console.log('✓ mobile-2-materi.png');

    // 3. Kuis
    const kuisBtn = page.locator('nav.fixed button:has-text("Kuis")');
    await kuisBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'mobile-3-kuis.png') });
    console.log('✓ mobile-3-kuis.png');

    // 4. Kebun
    const kebunBtn = page.locator('nav.fixed button:has-text("Kebun")');
    await kebunBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'mobile-4-kebun.png') });
    console.log('✓ mobile-4-kebun.png');

    // 5. Tentang
    const tentangBtn = page.locator('nav.fixed button:has-text("Tentang")');
    await tentangBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'mobile-5-tentang.png') });
    console.log('✓ mobile-5-tentang.png');

    // 6. Setelan
    const setelanBtn = page.locator('nav.fixed button:has-text("Setelan")');
    await setelanBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'mobile-6-setelan.png') });
    console.log('✓ mobile-6-setelan.png');

    console.log('\n🌟 All 6 mobile screenshots captured successfully!');
  } finally {
    if (serverProcess) serverProcess.kill();
    await browser.close();
  }
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
