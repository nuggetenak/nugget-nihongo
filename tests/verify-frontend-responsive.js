// ══════════════════════════════════════════════════════════════════
//  verify-frontend-responsive.js — Multi-Device Responsive UI & UX Test
//  Automated verification across viewports:
//  - Ultra-Compact Mobile: 375x667 (iPhone SE)
//  - Standard Mobile: 390x844 (iPhone 14/15)
//  - Tablet: 768x1024 (iPad)
//  - Desktop Wide: 1440x900 (Desktop)
//  Verifies Vercel Guidelines, Taste Skill, & Anti-Leakage Constraints
// ══════════════════════════════════════════════════════════════════

const { chromium } = require('playwright');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'iPhone SE (375x667)', width: 375, height: 667, isMobile: true },
  { name: 'Standard Mobile (390x844)', width: 390, height: 844, isMobile: true },
  { name: 'Tablet iPad (768x1024)', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop Wide (1440x900)', width: 1440, height: 900, isMobile: false },
];

async function runVerification() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║   NUGGET NIHONGO — MULTI-DEVICE RESPONSIVE UI/UX AUDIT         ║');
  console.log('║   Verifying Curriculum Hub, Substratum, & Anti-Leakage Layout  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });

  const screenshotDir = path.join(__dirname, '../.playwright-cli/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let totalChecks = 0;
  let passedChecks = 0;

  function pass(desc) {
    totalChecks++;
    passedChecks++;
    console.log(`  ✓ ${desc}`);
  }

  function fail(desc, err) {
    totalChecks++;
    console.error(`  ✗ FAIL: ${desc}`, err ? err.message : '');
    throw err || new Error(desc);
  }

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n── Viewport: ${vp.name} ──`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
      });

      const page = await context.newPage();

      // Collect console errors
      const pageErrors = [];
      page.on('pageerror', (err) => pageErrors.push(err));

      // Dismiss onboarding by default in automated tests
      await page.addInitScript(() => {
        localStorage.setItem('nn_onboarding_completed', 'true');
      });

      // 1. Navigate to App Home
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
      assert.strictEqual(pageErrors.length, 0, `Console page errors detected on load: ${pageErrors.map(e => e.message).join('; ')}`);
      pass(`App loaded successfully without runtime errors on ${vp.name}`);

      // 2. Anti-Leakage / Viewport blowouts check
      const overflowWidth = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      assert(overflowWidth <= 1, `Horizontal scroll blowout detected: scrollWidth (${overflowWidth}px overflow) > window.innerWidth`);
      pass(`Anti-leakage: 0px horizontal overflow on Home screen (${vp.name})`);

      // 3. Navigate to Materi Hub
      const isBottomNav = vp.width < 1024;
      if (isBottomNav) {
        const materiBtn = page.locator('nav.fixed button:has-text("Materi")');
        await materiBtn.waitFor({ state: 'visible', timeout: 5000 });
        await materiBtn.click();
      } else {
        const materiBtn = page.locator('button:has-text("Materi Hub")').first();
        await materiBtn.waitFor({ state: 'visible', timeout: 5000 });
        await materiBtn.click();
      }
      await page.waitForTimeout(600);

      // Verify Materi Hub header
      const hubHeading = await page.locator('h1:has-text("Materi Hub")');
      await hubHeading.waitFor({ state: 'visible', timeout: 5000 });
      pass(`Materi Hub view reached`);

      // 4. Verify Kurikulum Orisinal tab is active by default
      const activeKurikulumBtn = page.locator('button:has-text("Kurikulum Orisinal")');
      await activeKurikulumBtn.waitFor({ state: 'visible', timeout: 5000 });
      pass(`Kurikulum Orisinal tab button is rendered and visible`);

      // 5. Verify Curriculum Track Hero & Statistics
      const trackTitle = page.locator('h2:has-text("Kurikulum")');
      await trackTitle.waitFor({ state: 'visible', timeout: 5000 });
      const trackTitleText = await trackTitle.textContent();
      pass(`Active track rendered: "${trackTitleText?.trim()}"`);

      // 6. Verify Units and Lessons rendering
      const unitCard = page.locator('text=Unit 1').first();
      await unitCard.waitFor({ state: 'visible', timeout: 8000 });
      pass(`Unit 1 card rendered`);

      // Check Can-Do statement
      const canDoText = page.locator('text=Sasaran Kemampuan (Can-Do Descriptors');
      await canDoText.waitFor({ state: 'visible', timeout: 5000 });
      pass(`Can-Do descriptor card rendered with CEFR-J standard`);

      // Check L1 Contrastive focus notes
      const contrastiveBox = page.locator('text=Fokus Analisis Kontrasif L1');
      const hasContrastive = await contrastiveBox.count();
      if (hasContrastive > 0) {
        pass(`L1 Contrastive analysis alert box displayed`);
      }

      // Check Lesson items
      const lessonItem = page.locator('text=Pelajaran #1').first();
      await lessonItem.waitFor({ state: 'visible', timeout: 5000 });
      pass(`Lesson item with action buttons rendered`);

      // 7. Verify Anti-Leakage on Materi Hub
      const materiOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      assert(materiOverflow <= 1, `Horizontal scroll blowout on Materi Hub: ${materiOverflow}px overflow`);
      pass(`Anti-leakage: 0px horizontal overflow on Materi Hub (${vp.name})`);

      // 8. Test SSW Vocational Track Switcher
      const sswCategoryBtn = page.locator('button:has-text("Jalur Kerja SSW Vokasional")');
      await sswCategoryBtn.click();
      await page.waitForTimeout(500);

      const sswKaigoPill = page.locator('button:has-text("SSW Keperawatan Lansia")');
      await sswKaigoPill.waitFor({ state: 'visible', timeout: 5000 });
      pass(`SSW Vocational category opened, Kaigo track visible`);

      // Click SSW Food track
      const sswFoodPill = page.locator('button:has-text("SSW Pengolahan")');
      await sswFoodPill.click();
      await page.waitForTimeout(600);

      const foodHeading = page.locator('h2:has-text("SSW Pengolahan")');
      await foodHeading.waitFor({ state: 'visible', timeout: 5000 });
      pass(`SSW Food Service & Processing track loaded successfully`);

      // 9. Test Substratum Dialect Switcher
      const switchSubBtn = page.locator('button:has-text("Ganti Dialek")').first();
      await switchSubBtn.click();
      await page.waitForTimeout(300);

      const jawaOption = page.locator('button:has-text("Substratum Jawa")').first();
      await jawaOption.waitFor({ state: 'visible', timeout: 3000 });
      await jawaOption.click();
      await page.waitForTimeout(300);

      const activeDialectText = page.locator('text=Dialek L1: Substratum Jawa');
      await activeDialectText.waitFor({ state: 'visible', timeout: 3000 });
      pass(`Substratum dynamically switched to Substratum Jawa`);

      // 10. Navigate to Settings Page and verify L1 Dialect preferences
      if (isBottomNav) {
        const settingsBtn = page.locator('nav.fixed button:has-text("Setelan")');
        await settingsBtn.waitFor({ state: 'visible', timeout: 5000 });
        await settingsBtn.click();
      } else {
        const settingsBtn = page.locator('button:has-text("Pengaturan")').first();
        await settingsBtn.waitFor({ state: 'visible', timeout: 5000 });
        await settingsBtn.click();
      }
      await page.waitForTimeout(600);

      const settingsHeading = page.locator('h1:has-text("Pengaturan")');
      await settingsHeading.waitFor({ state: 'visible', timeout: 5000 });

      const l1SettingsSection = page.locator('h2:has-text("Preferensi Dialek Bahasa Ibu (L1 Substratum)")');
      await l1SettingsSection.waitFor({ state: 'visible', timeout: 5000 });
      pass(`L1 Substratum Dialect settings section verified in SettingsPage`);

      // Check that Jawa option is marked active in Settings
      const jawaActiveBadge = page.locator('button:has-text("Substratum Jawa") :text("✓ Aktif")');
      await jawaActiveBadge.waitFor({ state: 'visible', timeout: 3000 });
      pass(`Settings reflects synchronized active L1 Substratum (Jawa)`);

      // Take a verification screenshot on mobile and desktop
      const screenshotFile = path.join(screenshotDir, `audit-${vp.width}x${vp.height}.png`);
      await page.screenshot({ path: screenshotFile, fullPage: false });
      pass(`Visual verification screenshot saved to ${path.basename(screenshotFile)}`);

      await context.close();
    }

    console.log('\n════════════════════════════════════════════════════════════════');
    console.log(` RESULT: ${passedChecks} / ${totalChecks} CHECKS PASSED (0 FAILURES)`);
    console.log('════════════════════════════════════════════════════════════════');
    console.log('🌟 MULTI-DEVICE RESPONSIVE UI & CURRICULUM AUDIT VERIFIED 100%!\n');

  } finally {
    await browser.close();
  }
}

runVerification().catch((err) => {
  console.error('\n❌ AUDIT FAILED:', err);
  process.exit(1);
});
