import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/?demo=twitter');
  
  // Wait for page to load
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(1000);
  
  // Get width info BEFORE showing alert
  const beforeInfo = await page.evaluate(() => {
    const tweets = document.querySelectorAll('.pineui-collection__item .pineui-card');
    const tweet = tweets[0];
    
    return {
      tweetWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
      tweetParentClass: tweet?.parentElement?.className || 'not found',
    };
  });
  
  console.log('BEFORE ALERT:');
  console.log(JSON.stringify(beforeInfo, null, 2));
  
  // Click retweet button
  const retweetButtons = await page.locator('.pineui-button--icon').all();
  if (retweetButtons.length > 1) {
    await retweetButtons[1].click();
    await page.waitForTimeout(500);
    
    // Click confirm in dialog
    const confirmButton = await page.locator('.pineui-button--filled').first();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
      await page.waitForTimeout(1000);
      
      // Get width info AFTER alert appears
      const afterInfo = await page.evaluate(() => {
        const allCards = document.querySelectorAll('.pineui-card');
        const alert = allCards[0];
        const tweet = allCards[1];
        
        return {
          alertWidth: alert ? window.getComputedStyle(alert).width : 'not found',
          tweetWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
          alertParentClass: alert?.parentElement?.className || 'not found',
          tweetParentClass: tweet?.parentElement?.className || 'not found',
        };
      });
      
      console.log('\nAFTER ALERT:');
      console.log(JSON.stringify(afterInfo, null, 2));
    }
  }
  
  await browser.close();
})();
