import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(1000);
  
  console.log('=== BEFORE ALERT ===');
  const beforeInfo = await page.evaluate(() => {
    const tweets = document.querySelectorAll('.pineui-collection__item .pineui-card');
    const tweet = tweets[0];
    
    return {
      tweetWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
    };
  });
  console.log('Tweet width:', beforeInfo.tweetWidth);
  
  // Click retweet button
  const retweetButtons = await page.locator('.pineui-button--icon').all();
  if (retweetButtons.length > 1) {
    console.log('\nClicking retweet button...');
    await retweetButtons[1].click();
    await page.waitForTimeout(500);
    
    // Check if dialog appeared
    const dialogVisible = await page.locator('.pineui-modal').isVisible();
    console.log('Dialog visible:', dialogVisible);
    
    if (dialogVisible) {
      // Click confirm
      console.log('Clicking confirm button...');
      const confirmButton = await page.locator('.pineui-button--filled').first();
      await confirmButton.click();
      await page.waitForTimeout(1000);
      
      console.log('\n=== AFTER ALERT ===');
      const afterInfo = await page.evaluate(() => {
        const allCards = document.querySelectorAll('.pineui-card');
        const alert = allCards[0];
        const tweet = allCards[1];
        
        return {
          alertWidth: alert ? window.getComputedStyle(alert).width : 'not found',
          tweetWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
          alertParentClass: alert?.parentElement?.className || 'not found',
          tweetParentClass: tweet?.parentElement?.className || 'not found',
          widthsMatch: alert && tweet ? window.getComputedStyle(alert).width === window.getComputedStyle(tweet).width : false,
        };
      });
      
      console.log('Alert width:', afterInfo.alertWidth);
      console.log('Tweet width:', afterInfo.tweetWidth);
      console.log('Alert parent class:', afterInfo.alertParentClass);
      console.log('Tweet parent class:', afterInfo.tweetParentClass);
      console.log('Widths match:', afterInfo.widthsMatch ? '✅ YES' : '❌ NO');
      
      // Take screenshot
      await page.screenshot({ path: 'alert-width-test.png', fullPage: false });
      console.log('\nScreenshot saved: alert-width-test.png');
    }
  }
  
  await browser.close();
})();
