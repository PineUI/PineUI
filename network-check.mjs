import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Intercept network requests
  page.on('request', request => {
    if (request.url().includes('alert') || request.url().includes('component')) {
      console.log('→ REQUEST:', request.url());
    }
  });

  page.on('response', response => {
    if (response.url().includes('alert') || response.url().includes('component')) {
      console.log('← RESPONSE:', response.status(), response.url());
    }
  });

  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForTimeout(4000);

  await browser.close();
})();
