import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Track if "No schema provided" appears
  let noSchemaAppeared = false;
  
  page.on('console', msg => {
    const text = msg.text();
    console.log(`[BROWSER]:`, text);
  });
  
  // Monitor DOM changes
  await page.goto('http://localhost:3000/?demo=twitter', { waitUntil: 'domcontentloaded' });
  
  // Check immediately if "No schema provided" appears
  const checkInterval = setInterval(async () => {
    try {
      const hasNoSchema = await page.evaluate(() => {
        return document.body.textContent?.includes('No schema provided') || false;
      });
      
      if (hasNoSchema) {
        noSchemaAppeared = true;
        console.log('❌ FOUND: "No schema provided" appeared!');
        clearInterval(checkInterval);
      }
    } catch (e) {
      // Page might be closed
      clearInterval(checkInterval);
    }
  }, 50);
  
  // Wait for page to fully load
  await page.waitForTimeout(3000);
  clearInterval(checkInterval);
  
  // Check final state
  const finalText = await page.evaluate(() => document.body.textContent);
  const isLoaded = finalText?.includes('Twitter') || false;
  
  console.log('\n=== RESULT ===');
  console.log('"No schema provided" appeared:', noSchemaAppeared ? '❌ YES (BAD)' : '✅ NO (GOOD)');
  console.log('Page loaded correctly:', isLoaded ? '✅ YES' : '❌ NO');
  
  await browser.close();
})();
