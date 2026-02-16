import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture screenshots during load
  let screenshots = [];
  
  page.on('framenavigated', async () => {
    try {
      const text = await page.evaluate(() => document.body.textContent);
      screenshots.push(text.substring(0, 100));
    } catch (e) {
      // ignore
    }
  });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForTimeout(3000);
  
  const finalText = await page.evaluate(() => document.body.textContent);
  
  console.log('=== Page Load Snapshots ===');
  screenshots.forEach((snap, i) => console.log(`${i}: ${snap}...`));
  
  console.log('\n=== Final State ===');
  console.log('Has "No schema provided":', finalText.includes('No schema provided') ? '❌ YES' : '✅ NO');
  console.log('Has "Loading PineUI":', finalText.includes('Loading PineUI') ? '❌ YES' : '✅ NO');
  console.log('Loaded correctly:', finalText.includes('Twitter') ? '✅ YES' : '❌ NO');
  
  await browser.close();
})();
