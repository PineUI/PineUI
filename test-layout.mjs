import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(1500);
  
  // Check if layout looks ok
  const layoutInfo = await page.evaluate(() => {
    const tweets = document.querySelectorAll('.pineui-collection__item .pineui-card');
    const tweet = tweets[0];
    const tweetText = tweet ? tweet.querySelector('.pineui-text--bodyMedium') : null;
    
    return {
      tweetWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
      textDisplay: tweetText ? window.getComputedStyle(tweetText).display : 'not found',
      textWidth: tweetText ? window.getComputedStyle(tweetText).width : 'not found',
    };
  });
  
  console.log('=== LAYOUT CHECK ===');
  console.log('Tweet card width:', layoutInfo.tweetWidth);
  console.log('Text display:', layoutInfo.textDisplay);
  console.log('Text width:', layoutInfo.textWidth);
  
  // Take screenshot
  await page.screenshot({ path: 'layout-check.png', fullPage: false });
  console.log('\nScreenshot saved: layout-check.png');
  
  await browser.close();
})();
