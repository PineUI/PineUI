import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', err => {
    errors.push(err.message);
    console.log('[ERROR]:', err.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('[CONSOLE ERROR]:', msg.text());
    }
  });
  
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  console.log('\n=== Clicking on Michael Brown conversation ===');
  
  const michaelConv = await page.locator('text=Michael Brown').first();
  await michaelConv.click();
  
  await page.waitForTimeout(2000);
  
  console.log('\n=== Errors ===');
  if (errors.length === 0) {
    console.log('✅ No errors!');
  } else {
    console.log('❌ Errors found:', errors.length);
    errors.forEach(err => console.log('  -', err));
  }
  
  await page.screenshot({ path: 'profile-error-test.png' });
  console.log('\nScreenshot: profile-error-test.png');
  
  await browser.close();
})();
