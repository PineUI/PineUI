import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let flashDetected = false;
  let loadingDetected = false;
  
  page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
  
  // Monitor for any error messages appearing
  const observer = page.evaluate(() => {
    const results = { flash: false, loading: false };
    const observer = new MutationObserver(() => {
      const text = document.body.textContent || '';
      if (text.includes('No schema provided')) {
        results.flash = true;
      }
      if (text.includes('Loading PineUI')) {
        results.loading = true;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return new Promise(resolve => {
      setTimeout(() => {
        observer.disconnect();
        resolve(results);
      }, 2000);
    });
  });
  
  await page.goto('http://localhost:3000/?demo=twitter', { waitUntil: 'domcontentloaded' });
  
  const results = await observer;
  
  await page.waitForTimeout(1000);
  
  const finalText = await page.evaluate(() => document.body.textContent);
  const isLoaded = finalText?.includes('Twitter') || false;
  
  console.log('\n=== RESULT ===');
  console.log('Error flash detected:', results.flash ? '❌ YES' : '✅ NO');
  console.log('Loading message detected:', results.loading ? '⚠️  YES' : '✅ NO');
  console.log('Page loaded correctly:', isLoaded ? '✅ YES' : '❌ NO');
  
  await browser.close();
})();
