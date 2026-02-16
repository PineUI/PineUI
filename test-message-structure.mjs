import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });
  
  await page.goto('http://localhost:3000/?demo=inbox');
  await page.waitForTimeout(3000);
  
  // Get the actual message items from collection
  const structure = await page.evaluate(() => {
    const collection = document.querySelector('[data-collection-id]');
    if (!collection) return { error: 'No collection found' };
    
    const items = collection.querySelectorAll('.pineui-collection__item');
    
    return Array.from(items).map((item, i) => {
      const rows = item.querySelectorAll('.pineui-layout--row');
      const firstRow = rows[0];
      
      return {
        index: i,
        totalRows: rows.length,
        firstRowBorder: firstRow ? window.getComputedStyle(firstRow).borderBottom : 'not found',
        text: item.textContent.substring(0, 60)
      };
    });
  });
  
  console.log('=== Message Structure ===');
  structure.forEach(item => {
    console.log(`\nItem ${item.index}:`);
    console.log(`  Text: ${item.text}...`);
    console.log(`  Total rows: ${item.totalRows}`);
    console.log(`  First row border: ${item.firstRowBorder}`);
  });
  
  await browser.close();
})();
