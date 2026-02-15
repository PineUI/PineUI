import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=simple');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'simple-demo.png', fullPage: true });
  console.log('Screenshot saved: simple-demo.png');
  
  // Get page text content
  const textContent = await page.evaluate(() => {
    return document.body.innerText;
  });
  
  console.log('\n=== PAGE CONTENT ===');
  console.log(textContent);
  
  await browser.close();
})();
