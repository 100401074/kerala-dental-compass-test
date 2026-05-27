const { chromium } = require('playwright');
const path = require('path');

const PAGES = [
  { name: 'home', url: 'https://dental.kallada.me/' },
  { name: 'kochi', url: 'https://dental.kallada.me/kochi.html' },
  { name: 'clinic', url: 'https://dental.kallada.me/clinic-dentique.html' },
  { name: 'cost-guide', url: 'https://dental.kallada.me/cost-dental-implant.html' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      userAgent: 'Mozilla/5.0 (compatible; KDCScreenshot/1.0)',
    });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      try {
        await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(800); // let fonts/grain settle
        const file = path.join(__dirname, 'screenshots', `${p.name}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`OK ${p.name} ${vp.name} -> ${file}`);
      } catch (e) {
        console.log(`FAIL ${p.name} ${vp.name}: ${e.message}`);
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
