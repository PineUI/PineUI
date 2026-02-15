import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console messages
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type()}]:`, msg.text());
  });
  
  // Listen to errors
  page.on('pageerror', error => {
    console.log('[BROWSER ERROR]:', error.message);
  });
  
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(2000);
  
  console.log('\n=== Clicking retweet button ===');
  const retweetButtons = await page.locator('.pineui-button--icon').all();
  console.log('Found', retweetButtons.length, 'icon buttons');
  
  if (retweetButtons.length > 1) {
    await retweetButtons[1].click();
    await page.waitForTimeout(2000);
  }
  
  await browser.close();
})();
