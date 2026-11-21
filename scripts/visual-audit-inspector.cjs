const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = (process.env.TEST_URL || 'http://127.0.0.1:4173').trim();

const VIEWPORTS = [
  { name: 'iphone-se', width: 375, height: 667, isMobile: true, label: 'iPhone SE (375x667)' },
  { name: 'android-390', width: 390, height: 844, isMobile: true, label: 'Modern Mobile (390x844)' },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, label: 'Desktop Wide (1440x900)' },
];

const ROUTES = [
  { name: 'home', hash: '#home', title: 'Home Cockpit' },
  { name: 'kebun', hash: '#kebun', title: 'Kebun Retensi FSRS' },
  { name: 'dojo', hash: '#dojo', title: 'Dojo & Materi Hub' },
  { name: 'quiz', hash: '#quiz', title: 'Quiz CBT Arena' },
  { name: 'sensei', hash: '#sensei', title: 'Sensei AI Studio' },
  { name: 'settings', hash: '#settings', title: 'Pengaturan & Profil' },
  { name: 'choukai', hash: '#choukai', title: 'Choukai Listening' },
];

async function runVisualAudit() {
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║   NUGGET NIHONGO — PLAYWRIGHT VISUAL CLUTTER & UX AUDITOR        ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  const baseScreenshotDir = path.join(__dirname, '../.playwright-cli/screenshots');
  if (!fs.existsSync(baseScreenshotDir)) {
    fs.mkdirSync(baseScreenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const report = {};

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n📱 Inspecting Viewport: ${vp.label}...`);
      const vpDir = path.join(baseScreenshotDir, vp.name);
      if (!fs.existsSync(vpDir)) fs.mkdirSync(vpDir, { recursive: true });

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();

      // Pre-seed local storage so modal overlays do not block inspection
      await page.addInitScript(() => {
        localStorage.setItem('nn_onboarding_completed', 'true');
        localStorage.setItem('nn_theme', 'light');
      });

      report[vp.name] = { label: vp.label, pages: {}, modals: {} };

      // 1. Audit each major route
      for (const route of ROUTES) {
        process.stdout.write(`   └─ Scanning ${route.title} (${route.hash})... `);
        await page.goto(`${BASE_URL}/${route.hash}`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(600);

        // Anti-leakage / overflow check
        const metrics = await page.evaluate(() => {
          const docEl = document.documentElement;
          const overflow = docEl.scrollWidth - window.innerWidth;

          // Count cards & bordered boxes
          const cards = document.querySelectorAll('.rounded-2xl, .rounded-xl.border, [class*="bg-surface"][class*="border"]');
          const nestedCards = [];
          cards.forEach((c) => {
            if (c.parentElement && c.parentElement.closest('.rounded-2xl, .rounded-xl.border')) {
              nestedCards.push(c);
            }
          });

          // Small fonts (< 12px)
          const allTextNodes = Array.from(document.querySelectorAll('p, span, div, button, label'));
          const tinyTexts = allTextNodes.filter((el) => {
            const fs = parseFloat(window.getComputedStyle(el).fontSize);
            return fs > 0 && fs < 11.5 && el.textContent.trim().length > 0;
          });

          // Touch target sizes (< 40px)
          const interactives = Array.from(document.querySelectorAll('button, a, input, select, [role="button"]'));
          const smallTouchTargets = interactives.filter((el) => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && (rect.width < 38 || rect.height < 38);
          });

          // Headings
          const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim());
          const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());

          return {
            overflow,
            totalCards: cards.length,
            nestedCardsCount: nestedCards.length,
            tinyTextCount: tinyTexts.length,
            smallTouchCount: smallTouchTargets.length,
            h1s,
            h2s: h2s.slice(0, 5),
            scrollHeight: docEl.scrollHeight,
          };
        });

        // Save screenshot
        const screenshotPath = path.join(vpDir, `${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        report[vp.name].pages[route.name] = {
          ...metrics,
          screenshot: path.relative(path.join(__dirname, '..'), screenshotPath),
        };

        console.log(`✓ [Cards: ${metrics.totalCards}, Nested: ${metrics.nestedCardsCount}, Overflow: ${metrics.overflow}px]`);
      }

      // 2. Audit Key Modals on Mobile
      if (vp.isMobile) {
        console.log(`   └─ Scanning Modals (TrackPickerModal & QuickActionSheet)... `);
        
        // TrackPickerModal
        await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);

        // Click track picker trigger
        const trackTrigger = page.locator('button[aria-label="Pilih Jalur Kurikulum"], button:has-text("JLPT"), header button:has-text("N5")').first();
        if (await trackTrigger.count() > 0) {
          await trackTrigger.click().catch(() => {});
          await page.waitForTimeout(500);
          const modalShot = path.join(vpDir, 'modal-track-picker.png');
          await page.screenshot({ path: modalShot });
          report[vp.name].modals['track-picker'] = path.relative(path.join(__dirname, '..'), modalShot);
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }

        // QuickActionSheet (Fab or menu)
        const fabBtn = page.locator('button[aria-label="Aksi Cepat"], button:has-text("⚡"), button[title="Aksi Cepat"]').first();
        if (await fabBtn.count() > 0) {
          await fabBtn.click().catch(() => {});
          await page.waitForTimeout(500);
          const fabShot = path.join(vpDir, 'modal-quick-actions.png');
          await page.screenshot({ path: fabShot });
          report[vp.name].modals['quick-actions'] = path.relative(path.join(__dirname, '..'), fabShot);
          await page.keyboard.press('Escape');
        }
      }

      await context.close();
    }

    const reportPath = path.join(__dirname, '../.playwright-cli/visual-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📊 Visual audit complete! Report saved to ${reportPath}`);

  } finally {
    await browser.close();
  }
}

runVisualAudit().catch((err) => {
  console.error('\n❌ Visual audit failed:', err);
  process.exit(1);
});
