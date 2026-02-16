import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  console.log('=== Testing inbox first message spacing ===');
  
  const spacing = await page.evaluate(() => {
    const header = Array.from(document.querySelectorAll('.pineui-text')).find(
      el => el.textContent.includes('MONDAY, OCTOBER 28TH')
    );
    const messages = document.querySelectorAll('.pineui-layout--row');
    let firstMessage = null;
    
    for (const msg of messages) {
      if (msg.textContent.includes('Robert Chen')) {
        firstMessage = msg;
        break;
      }
    }
    
    if (!header || !firstMessage) {
      return { error: 'Elements not found' };
    }
    
    const headerRect = header.getBoundingClientRect();
    const messageRect = firstMessage.getBoundingClientRect();
    
    return {
      headerBottom: headerRect.bottom,
      messageTop: messageRect.top,
      distance: messageRect.top - headerRect.bottom
    };
  });
  
  console.log('Header bottom:', spacing.headerBottom);
  console.log('Message top:', spacing.messageTop);
  console.log('Distance:', spacing.distance, 'px');
  
  await page.screenshot({ path: 'inbox-first-message-spacing.png', fullPage: true });
  console.log('\nScreenshot saved: inbox-first-message-spacing.png');
  
  await browser.close();
})();
