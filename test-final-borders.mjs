import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  const borderInfo = await page.evaluate(() => {
    const items = document.querySelectorAll('.pineui-collection__item');
    
    return Array.from(items).map((item, i) => ({
      index: i,
      isLast: i === items.length - 1,
      borderBottom: window.getComputedStyle(item).borderBottom,
      text: item.textContent.substring(0, 40)
    }));
  });
  
  console.log('=== Collection Items Borders ===');
  borderInfo.forEach(info => {
    console.log(`\nItem ${info.index}${info.isLast ? ' (LAST)' : ''}:`);
    console.log(`  Text: ${info.text}...`);
    console.log(`  Border: ${info.borderBottom}`);
    console.log(`  Status: ${info.borderBottom.includes('none') ? '✅ NO BORDER' : '📏 HAS BORDER'}`);
  });
  
  const lastHasBorder = borderInfo[borderInfo.length - 1]?.borderBottom.includes('solid');
  console.log('\n=== Result ===');
  console.log('Last item has border:', lastHasBorder ? '❌ YES (BAD)' : '✅ NO (GOOD)');
  
  await page.screenshot({ path: 'inbox-borders-final.png', fullPage: true });
  console.log('\nScreenshot: inbox-borders-final.png');
  
  await browser.close();
})();
