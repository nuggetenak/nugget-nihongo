const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  // Completely empty storage context on mobile viewport
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  console.log('🚀 Loading live site with 100% clean localStorage...');
  await page.goto('https://nugget-nihongo.pages.dev/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check what modal is open
  const modal = await page.locator('.fixed.inset-0').first();
  if (await modal.isVisible()) {
    console.log('📢 Modal detected on first open:');
    const modalText = await modal.innerText();
    console.log(modalText);
    await page.screenshot({ path: 'audit-fresh-modal.png' });

    // Click close
    const closeBtn = page.locator('button[aria-label="Tutup tur"]').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      console.log('👉 Closed modal');
    } else {
      await page.keyboard.press('Escape');
      console.log('👉 Pressed Escape');
    }
  } else {
    console.log('❌ No modal detected on first open!');
  }

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'audit-fresh-home.png' });

  // Test entering Lesson 1 from clean state
  const startBtn = page.locator('button:has-text("Mulai Belajar")').first();
  console.log('👉 Start Lesson button visible:', await startBtn.isVisible());
  if (await startBtn.isVisible()) {
    await startBtn.click();
    await page.waitForTimeout(1500);
    console.log('📍 Current URL:', page.url());
    const lessonText = await page.innerText('body');
    console.log('📖 Lesson 1 Screen snippet:');
    console.log(lessonText.slice(0, 1000));
  }

  await browser.close();
})();
