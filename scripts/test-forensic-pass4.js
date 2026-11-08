const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  console.log('🚀 Loading live site for Forensic Pass 4: Search, Modals, Track Switcher & Tools...');
  await page.addInitScript(() => {
    localStorage.setItem('nn_onboarding_completed', 'true');
  });

  await page.goto('https://nugget-nihongo.pages.dev/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  // 1. Audit Search Palette (⌘K)
  console.log('\n--- 1. AUDITING SEARCH PALETTE (⌘K) ---');
  const searchBtn = page.locator('button[aria-label*="Pencarian Global"]').first();
  console.log('Search button visible:', await searchBtn.isVisible());
  if (await searchBtn.isVisible()) {
    await searchBtn.click();
    await page.waitForTimeout(800);
    const searchModalText = await page.innerText('body');
    console.log('Search Palette snippet:');
    console.log(searchModalText.slice(0, 600));

    // Try typing "watashi"
    const searchInput = page.locator('input[placeholder*="Cari kosakata"], input[type="search"], input[type="text"]').last();
    if (await searchInput.isVisible()) {
      await searchInput.fill('watashi');
      await page.waitForTimeout(600);
      const resultsText = await page.innerText('body');
      console.log('Search results for "watashi" snippet:');
      console.log(resultsText.slice(0, 800));
    }

    // Close search
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // 2. Audit Active Track Switcher (Header Dropdown)
  console.log('\n--- 2. AUDITING TRACK SWITCHER (HEADER) ---');
  const trackBtn = page.locator('button[aria-label*="Jalur aktif"]').first();
  console.log('Track button visible:', await trackBtn.isVisible());
  if (await trackBtn.isVisible()) {
    await trackBtn.click();
    await page.waitForTimeout(800);
    const trackMenuText = await page.innerText('body');
    console.log('Track switcher drawer snippet:');
    console.log(trackMenuText.slice(0, 1000));

    // Close track switcher
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // 3. Audit Kana Chart Modal
  console.log('\n--- 3. AUDITING KANA CHART MODAL ---');
  await page.goto('https://nugget-nihongo.pages.dev/#home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const kanaBtn = page.locator('button:has-text("Bagan Kana")').first();
  if (await kanaBtn.isVisible()) {
    await kanaBtn.click();
    await page.waitForTimeout(800);
    const kanaText = await page.innerText('body');
    console.log('Kana Chart snippet:');
    console.log(kanaText.slice(0, 800));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  console.log('\nConsole/Page Errors:', pageErrors);
  await browser.close();
})();
