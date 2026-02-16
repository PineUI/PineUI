import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console
  page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
  
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/?demo=simple');
  await page.waitForTimeout(2000);
  
  console.log('\n=== Clicking "Mostrar Alert" button ===');
  
  // Find and click the "Mostrar Alert" button
  const alertButton = await page.locator('text=Mostrar Alert').first();
  await alertButton.click();
  
  console.log('Button clicked, waiting for alert...');
  await page.waitForTimeout(1000);
  
  // Check if alert appeared
  const alertVisible = await page.evaluate(() => {
    const alerts = document.querySelectorAll('.pineui-layout--row');
    for (const alert of alerts) {
      if (alert.textContent.includes('Sucesso!')) {
        return true;
      }
    }
    return false;
  });
  
  console.log('Alert visible:', alertVisible ? '✅ YES' : '❌ NO');
  
  await page.screenshot({ path: 'simple-alert-test.png' });
  console.log('\nScreenshot saved: simple-alert-test.png');
  
  // Wait to see if it disappears
  console.log('\nWaiting 3 seconds to see if alert disappears...');
  await page.waitForTimeout(3500);
  
  const alertStillVisible = await page.evaluate(() => {
    const alerts = document.querySelectorAll('.pineui-layout--row');
    for (const alert of alerts) {
      if (alert.textContent.includes('Sucesso!')) {
        return true;
      }
    }
    return false;
  });
  
  console.log('Alert still visible:', alertStillVisible ? '❌ YES (should be hidden)' : '✅ NO (correctly hidden)');
  
  await browser.close();
})();
