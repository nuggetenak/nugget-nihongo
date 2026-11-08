const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.addInitScript(() => {
    localStorage.setItem('nn_onboarding_completed', 'true');
  });

  await page.goto('https://nugget-nihongo.pages.dev/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Test Search Palette
  console.log('--- 1. Testing Search Palette ---');
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(1000);

  const searchDialog = page.locator('[role="dialog"]').first();
  console.log('Search dialog visible:', await searchDialog.isVisible());
  if (await searchDialog.isVisible()) {
    console.log('Search dialog content:');
    const text = await searchDialog.innerText();
    console.log(text.slice(0, 500));

    // Type a word
    const input = page.locator('input[placeholder*="Cari"]').first();
    await input.fill('watashi');
    await page.waitForTimeout(1000);
    const resultText = await searchDialog.innerText();
    console.log('Results for "watashi":');
    console.log(resultText.slice(0, 600));

    // Type nonexistent word
    await input.fill('xyznonexistentword123');
    await page.waitForTimeout(600);
    const emptyText = await searchDialog.innerText();
    console.log('Empty search state:');
    console.log(emptyText.slice(0, 400));

    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // 2. Test Track Switcher
  console.log('\n--- 2. Testing Track Switcher ---');
  const trackBtn = page.locator('button[aria-label*="Jalur aktif"]').first();
  await trackBtn.click();
  await page.waitForTimeout(800);
  const trackDialog = page.locator('[role="dialog"]').first();
  console.log('Track dialog visible:', await trackDialog.isVisible());
  if (await trackDialog.isVisible()) {
    const text = await trackDialog.innerText();
    console.log('Track dialog content:');
    console.log(text.slice(0, 600));

    // Click on Book track: Minna no Nihongo
    const bookTab = trackDialog.locator('button:has-text("Buku")').first();
    if (await bookTab.isVisible()) {
      await bookTab.click();
      await page.waitForTimeout(500);
      const minnaBtn = trackDialog.locator('button:has-text("Minna no Nihongo")').first();
      console.log('Minna button visible:', await minnaBtn.isVisible());
      if (await minnaBtn.isVisible()) {
        await minnaBtn.click();
        await page.waitForTimeout(1000);
        console.log('Switched to Minna track! Checking home screen...');
        const homeText = await page.innerText('body');
        console.log('Home screen after switching to Minna no Nihongo:');
        console.log(homeText.slice(0, 800));
      }
    }
  }

  await browser.close();
})();
