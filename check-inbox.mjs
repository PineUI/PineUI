import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console
  page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
  page.on('pageerror', err => console.log(`[ERROR]:`, err.message));
  
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'inbox-demo.png', fullPage: true });
  console.log('\nScreenshot saved: inbox-demo.png');
  
  await browser.close();
})();
