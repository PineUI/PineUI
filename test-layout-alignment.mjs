import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForSelector('.pineui-card', { timeout: 10000 });
  await page.waitForTimeout(1500);
  
  // Check layout alignment
  const layoutInfo = await page.evaluate(() => {
    const bodyLayout = document.querySelector('.pineui-scaffold__body > .pineui-layout--column');
    const tweets = document.querySelectorAll('.pineui-collection__item');
    const tweet = tweets[0];
    const tweetCard = tweet ? tweet.querySelector('.pineui-card') : null;
    
    return {
      bodyLayoutAlignItems: bodyLayout ? window.getComputedStyle(bodyLayout).alignItems : 'not found',
      bodyLayoutWidth: bodyLayout ? window.getComputedStyle(bodyLayout).width : 'not found',
      tweetItemWidth: tweet ? window.getComputedStyle(tweet).width : 'not found',
      tweetCardWidth: tweetCard ? window.getComputedStyle(tweetCard).width : 'not found',
    };
  });
  
  console.log('=== LAYOUT ALIGNMENT ===');
  console.log('Body layout alignItems:', layoutInfo.bodyLayoutAlignItems);
  console.log('Body layout width:', layoutInfo.bodyLayoutWidth);
  console.log('Tweet item width:', layoutInfo.tweetItemWidth);
  console.log('Tweet card width:', layoutInfo.tweetCardWidth);
  
  await page.screenshot({ path: 'layout-alignment.png', fullPage: false });
  console.log('\nScreenshot saved: layout-alignment.png');
  
  await browser.close();
})();
