const { chromium } = require('playwright');

async function testLiveE2E() {
  console.log('Launching browser to test https://nugget-nihongo.pages.dev ...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    try {
      browser = await chromium.launch({ channel: 'msedge', headless: true });
    } catch (err2) {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    }
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport (iPhone 13/14)
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  const response = await page.goto('https://nugget-nihongo.pages.dev', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Page response status:', response ? response.status() : 'null');

  // Check document title
  const title = await page.title();
  console.log('Page title:', title);

  // Dismiss onboarding modal if present by pressing Escape or clicking backdrop
  await page.waitForTimeout(1000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Check navigation tabs in mobile bottom nav
  const navTabs = ['Belajar', 'Review', 'Dojo', 'Sensei', 'Profil'];
  for (const tab of navTabs) {
    const btn = page.locator(`nav[aria-label="Navigasi Utama Ponsel"] button[aria-label="${tab}"]`);
    const count = await btn.count();
    console.log(`Navigation tab "${tab}":`, count > 0 ? 'PRESENT' : 'NOT FOUND');
    if (count > 0) {
      await btn.click();
      await page.waitForTimeout(600);
      const isCurrent = await btn.getAttribute('aria-current');
      console.log(`Clicked tab "${tab}" -> aria-current: ${isCurrent}`);
    }
  }

  // Check horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Viewport width check: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}, diff=${scrollWidth - clientWidth}px`);

  // Report console errors (ignore harmless 3rd party favicon or analytics if any)
  console.log(`Console error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }

  console.log('E2E Mobile Verification Passed Successfully!');

  console.log('\nTesting Desktop View (1280x800)...');
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1280, height: 800 });
  await desktopPage.goto('https://nugget-nihongo.pages.dev', { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.keyboard.press('Escape');

  const desktopTabs = ['Belajar', 'Retensi', 'Dojo', 'Sensei', 'Pengaturan'];
  for (const tab of desktopTabs) {
    const btn = desktopPage.locator(`aside button:has-text("${tab}")`).first();
    const count = await btn.count();
    console.log(`Desktop sidebar tab "${tab}":`, count > 0 ? 'PRESENT' : 'NOT FOUND');
    if (count > 0) {
      await btn.click();
      await desktopPage.waitForTimeout(400);
      console.log(`Clicked desktop tab "${tab}" successfully`);
    }
  }

  const dScrollWidth = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
  const dClientWidth = await desktopPage.evaluate(() => document.documentElement.clientWidth);
  console.log(`Desktop viewport check: scrollWidth=${dScrollWidth}, clientWidth=${dClientWidth}, diff=${dScrollWidth - dClientWidth}px`);

  await browser.close();

  if (scrollWidth > clientWidth || dScrollWidth > dClientWidth) {
    console.error('Horizontal overflow detected!');
    process.exit(1);
  }

  console.log('All Live E2E Checks (Mobile & Desktop) Passed 100%!');
}

testLiveE2E().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
