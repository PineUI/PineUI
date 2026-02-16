import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`[BROWSER]:`, msg.text()));
  
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  console.log('\n=== Clicking on second conversation (Carlos Ramirez) ===');
  
  // Click on Carlos Ramirez conversation
  const conversations = await page.locator('.pineui-layout--row').all();
  let carlosConversation = null;
  
  for (const conv of conversations) {
    const text = await conv.textContent();
    if (text && text.includes('Carlos Ramirez')) {
      carlosConversation = conv;
      break;
    }
  }
  
  if (carlosConversation) {
    await carlosConversation.click();
    console.log('Clicked on Carlos Ramirez conversation');
    await page.waitForTimeout(2000);
    
    // Check if profile loaded
    const profileLoaded = await page.evaluate(() => {
      return document.body.textContent.includes('user_carlos') || 
             document.body.textContent.includes('Profile');
    });
    
    console.log('Profile loaded:', profileLoaded ? '✅ YES' : '❌ NO');
    
    await page.screenshot({ path: 'inbox-profile-load-test.png', fullPage: true });
    console.log('\nScreenshot saved: inbox-profile-load-test.png');
  } else {
    console.log('❌ Could not find Carlos Ramirez conversation');
  }
  
  await browser.close();
})();
