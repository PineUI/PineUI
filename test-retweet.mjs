import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Starting Chrome test...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen to console logs
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Intent not found') || text.includes('error') || text.includes('Error')) {
      console.log('❌ ERROR:', text);
    }
  });

  console.log('📄 Loading Twitter demo...');
  await page.goto('http://localhost:3000/?demo=twitter');

  // Wait for PineUI to load
  await page.waitForTimeout(2000);

  console.log('✅ Page loaded');

  // Take screenshot of initial state
  await page.screenshot({ path: '/tmp/twitter-1-initial.png' });
  console.log('📸 Screenshot 1: Initial state');

  // Find and click retweet button
  console.log('🔍 Looking for retweet button...');
  const retweetButton = await page.locator('button:has-text("🔁")').first();

  if (!retweetButton) {
    console.log('❌ Retweet button not found!');
    await browser.close();
    return;
  }

  console.log('🖱️  Clicking retweet button...');
  await retweetButton.click();
  await page.waitForTimeout(1000);

  // Take screenshot after click
  await page.screenshot({ path: '/tmp/twitter-2-after-click.png' });
  console.log('📸 Screenshot 2: After retweet click');

  // Check if dialog appeared
  const dialogVisible = await page.locator('text=Retweet this post?').isVisible().catch(() => false);

  if (dialogVisible) {
    console.log('✅ Dialog appeared!');

    // Click confirm button
    console.log('🖱️  Clicking Retweet confirm...');
    const confirmButton = await page.locator('button:has-text("Retweet")').last();
    await confirmButton.click();
    await page.waitForTimeout(500);

    // Take screenshot after confirm
    await page.screenshot({ path: '/tmp/twitter-3-after-confirm.png' });
    console.log('📸 Screenshot 3: After confirm');

    // Check if success alert appeared
    await page.waitForTimeout(500);
    const alertVisible = await page.locator('text=Retweeted!').isVisible().catch(() => false);

    if (alertVisible) {
      console.log('✅ SUCCESS ALERT APPEARED! 🎉');
      await page.screenshot({ path: '/tmp/twitter-4-success-alert.png' });
      console.log('📸 Screenshot 4: Success alert visible');
    } else {
      console.log('❌ Success alert NOT visible');
    }

    // Wait to see alert disappear
    console.log('⏳ Waiting 3 seconds for alert to disappear...');
    await page.waitForTimeout(3500);

    const alertStillVisible = await page.locator('text=Retweeted!').isVisible().catch(() => false);
    if (!alertStillVisible) {
      console.log('✅ Alert disappeared as expected');
    } else {
      console.log('⚠️  Alert still visible after 3 seconds');
    }

    await page.screenshot({ path: '/tmp/twitter-5-final.png' });
    console.log('📸 Screenshot 5: Final state');

  } else {
    console.log('❌ Dialog did NOT appear!');
  }

  console.log('\n📁 Screenshots saved to /tmp/twitter-*.png');
  console.log('⏳ Keeping browser open for 5 seconds...');
  await page.waitForTimeout(5000);

  await browser.close();
  console.log('✅ Test complete!');
})();
