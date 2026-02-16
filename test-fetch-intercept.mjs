import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Inject fetch interceptor
  await page.addInitScript(() => {
    window.fetchResults = [];
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const result = await originalFetch.apply(this, args);
      const clonedResult = result.clone();
      try {
        const json = await clonedResult.json();
        if (args[0] && args[0].includes('/api/inbox/profile')) {
          window.fetchResults.push({
            url: args[0],
            data: json
          });
        }
      } catch (e) {
        // ignore
      }
      return result;
    };
  });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(2000);
  
  console.log('=== Clicking Michael Brown ===');
  const michaelConv = await page.locator('text=Michael Brown').first();
  await michaelConv.click();
  
  await page.waitForTimeout(2000);
  
  const results = await page.evaluate(() => window.fetchResults);
  
  console.log('\n=== Fetch Results ===');
  results.forEach((resp, i) => {
    console.log(`\nResult ${i+1}:`);
    console.log('URL:', resp.url);
    console.log('Data keys:', Object.keys(resp.data));
    console.log('Data.data type:', typeof resp.data.data);
    console.log('Is Array:', Array.isArray(resp.data.data));
    console.log('Full data:', JSON.stringify(resp.data, null, 2).substring(0, 500));
  });
  
  await browser.close();
})();
