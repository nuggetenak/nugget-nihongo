const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  console.log('🚀 Loading live site for Forensic Pass 3: Lesson Study Studio Engine...');
  // Dismiss onboarding modal explicitly
  await page.addInitScript(() => {
    localStorage.setItem('nn_onboarding_completed', 'true');
  });

  await page.goto('https://nugget-nihongo.pages.dev/#study?track=n5&unit=unit-n5-01&lesson=les-n5-u01-01&type=curriculum', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check errors
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  console.log('\n--- 1. AUDITING STAGE 1: DIALOGUE ---');
  let bodyText = await page.innerText('body');
  console.log('Dialogue Stage text snippet:');
  console.log(bodyText.slice(0, 800));

  // Check stage tabs / navigation
  const stageBtns = await page.locator('button:has-text("1. Dialog"), button:has-text("2. Bedah"), button:has-text("3. Cek"), button:has-text("4. Tantangan")').all();
  console.log('Stage buttons found:', stageBtns.length);

  // Click Stage 2: Bedah Materi
  console.log('\n--- 2. AUDITING STAGE 2: BEDAH MATERI (EXPLANATION) ---');
  const stage2Btn = page.locator('text=2. Bedah Materi').first();
  if (await stage2Btn.isVisible()) {
    await stage2Btn.click();
    await page.waitForTimeout(1000);
    bodyText = await page.innerText('body');
    console.log('Explanation Stage text snippet:');
    console.log(bodyText.slice(0, 1000));
  }

  // Click Stage 3: Cek Pemahaman
  console.log('\n--- 3. AUDITING STAGE 3: CEK PEMAHAMAN (MICRO DRILL) ---');
  const stage3Btn = page.locator('text=3. Cek Pemahaman').first();
  if (await stage3Btn.isVisible()) {
    await stage3Btn.click();
    await page.waitForTimeout(1000);
    bodyText = await page.innerText('body');
    console.log('Micro Drill Stage text snippet:');
    console.log(bodyText.slice(0, 1000));
  }

  // Click Stage 4: Tantangan Nyata
  console.log('\n--- 4. AUDITING STAGE 4: TANTANGAN NYATA (CAN-DO COMPLETION) ---');
  const stage4Btn = page.locator('text=4. Tantangan Nyata').first();
  if (await stage4Btn.isVisible()) {
    await stage4Btn.click();
    await page.waitForTimeout(1000);
    bodyText = await page.innerText('body');
    console.log('Can-Do Stage text snippet:');
    console.log(bodyText.slice(0, 1000));
  }

  console.log('\nConsole/Page Errors:', pageErrors);
  await browser.close();
})();
