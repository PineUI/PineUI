import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(1500);
  
  // Check current layout
  const info = await page.evaluate(() => {
    const scaffold = document.querySelector('.pineui-scaffold__body');
    const tweets = document.querySelectorAll('.pineui-collection__item .pineui-card');
    const tweet = tweets[0];
    
    return {
      scaffoldWidth: scaffold ? window.getComputedStyle(scaffold).width : 'not found',
      tweetCardWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
    };
  });
  
  console.log('=== CURRENT LAYOUT ===');
  console.log('Scaffold width:', info.scaffoldWidth);
  console.log('Tweet card width:', info.tweetCardWidth);
  
  await page.screenshot({ path: 'current-layout.png', fullPage: false });
  console.log('\nScreenshot: current-layout.png');
  
  await browser.close();
})();
