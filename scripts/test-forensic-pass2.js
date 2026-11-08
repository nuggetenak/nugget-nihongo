const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  console.log('🚀 Loading live site for Forensic Pass 2...');
  await page.goto('https://nugget-nihongo.pages.dev/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // 1. Audit Tab Kuis (QuizPage)
  console.log('\n══════════════════════════════════════════');
  console.log('AUDITING TAB 2: ARENA KUIS / CBT');
  console.log('══════════════════════════════════════════');
  await page.goto('https://nugget-nihongo.pages.dev/#quiz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const quizText = await page.innerText('body');
  console.log('Quiz page snippet for fresh user:');
  console.log(quizText.slice(0, 1200));

  // 2. Audit Tab Dojo (MateriHubPage)
  console.log('\n══════════════════════════════════════════');
  console.log('AUDITING TAB 3: DOJO & PUSTAKA');
  console.log('══════════════════════════════════════════');
  await page.goto('https://nugget-nihongo.pages.dev/#materi', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const dojoText = await page.innerText('body');
  console.log('Dojo page snippet for fresh user:');
  console.log(dojoText.slice(0, 1200));

  // 3. Audit Tab Sensei (SenseiPage)
  console.log('\n══════════════════════════════════════════');
  console.log('AUDITING TAB 4: SENSEI AI');
  console.log('══════════════════════════════════════════');
  await page.goto('https://nugget-nihongo.pages.dev/#sensei', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const senseiText = await page.innerText('body');
  console.log('Sensei page snippet for fresh user:');
  console.log(senseiText.slice(0, 1200));

  // 4. Audit Tab Profil & Pengaturan (SettingsPage)
  console.log('\n══════════════════════════════════════════');
  console.log('AUDITING TAB 5: PROFIL & PENGATURAN');
  console.log('══════════════════════════════════════════');
  await page.goto('https://nugget-nihongo.pages.dev/#settings', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const settingsText = await page.innerText('body');
  console.log('Settings page snippet for fresh user:');
  console.log(settingsText.slice(0, 1500));

  await browser.close();
})();
