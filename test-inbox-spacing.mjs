import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  console.log('=== Checking message spacing ===');
  
  await page.screenshot({ path: 'inbox-spacing-test.png', fullPage: true });
  console.log('Screenshot saved: inbox-spacing-test.png');
  
  await browser.close();
})();
