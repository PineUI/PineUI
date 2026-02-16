import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(2000);
  
  // Intercept API calls
  const apiResponses = [];
  page.on('response', async response => {
    if (response.url().includes('/api/inbox/profile')) {
      try {
        const json = await response.json();
        apiResponses.push({ url: response.url(), data: json });
      } catch (e) {
        // ignore
      }
    }
  });
  
  console.log('=== Clicking Michael Brown ===');
  const michaelConv = await page.locator('text=Michael Brown').first();
  await michaelConv.click();
  
  await page.waitForTimeout(2000);
  
  console.log('\n=== API Responses ===');
  apiResponses.forEach((resp, i) => {
    console.log(`\nResponse ${i+1}:`);
    console.log('URL:', resp.url);
    console.log('Data type:', typeof resp.data);
    console.log('Is Array:', Array.isArray(resp.data));
    console.log('Data:', JSON.stringify(resp.data, null, 2));
  });
  
  await browser.close();
})();
