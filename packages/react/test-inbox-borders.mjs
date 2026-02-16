import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  // Check message borders
  const borderInfo = await page.evaluate(() => {
    const messages = Array.from(document.querySelectorAll('.pineui-layout--row')).filter(el => 
      el.textContent.includes('Robert Chen') || 
      el.textContent.includes('Kristin Watson') ||
      el.textContent.includes('David Kim')
    );
    
    return messages.map((msg, i) => ({
      index: i,
      text: msg.textContent.substring(0, 50),
      borderBottom: window.getComputedStyle(msg).borderBottom,
      isLast: i === messages.length - 1
    }));
  });
  
  console.log('=== Message Borders ===');
  borderInfo.forEach(info => {
    console.log(`\nMessage ${info.index}${info.isLast ? ' (LAST)' : ''}:`);
    console.log(`  Text: ${info.text}...`);
    console.log(`  Border: ${info.borderBottom}`);
  });
  
  await page.screenshot({ path: 'inbox-borders-check.png', fullPage: true });
  console.log('\nScreenshot saved: inbox-borders-check.png');
  
  await browser.close();
})();
