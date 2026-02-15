import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Capture all console messages
  const logs = [];
  page.on('console', msg => {
    logs.push(msg.text());
    console.log('[CONSOLE]', msg.text());
  });

  console.log('Loading page...');
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForTimeout(3000);

  // Check if component was loaded
  const schema = await page.evaluate(() => {
    return window.__PINEUI_SCHEMA__;
  });

  console.log('\n=== ANALYSIS ===');
  console.log('Errors in console:', logs.filter(l => l.includes('error') || l.includes('Error') || l.includes('Failed')));

  await page.waitForTimeout(2000);
  await browser.close();
})();
