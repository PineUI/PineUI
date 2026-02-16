import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const states = [];
  
  // Monitor page content changes
  page.on('load', async () => {
    const checkState = async () => {
      const state = await page.evaluate(() => {
        const body = document.body.textContent || '';
        if (body.includes('Loading PineUI')) return 'loading';
        if (body.includes('No schema provided')) return 'no-schema';
        if (body.includes('Twitter') || body.includes('Simple')) return 'loaded';
        return 'unknown';
      });
      return state;
    };
    
    for (let i = 0; i < 10; i++) {
      const state = await checkState();
      states.push({ time: i * 100, state });
      await page.waitForTimeout(100);
    }
  });
  
  await page.goto('http://localhost:3000/?demo=twitter');
  await page.waitForTimeout(3000);
  
  console.log('=== Page States Timeline ===');
  let prevState = null;
  states.forEach(s => {
    if (s.state !== prevState) {
      console.log(`${s.time}ms: ${s.state}`);
      prevState = s.state;
    }
  });
  
  const hasNoSchemaError = states.some(s => s.state === 'no-schema');
  console.log('\n=== Result ===');
  console.log('"No schema provided" appeared:', hasNoSchemaError ? '❌ YES (BAD)' : '✅ NO (GOOD)');
  
  await browser.close();
})();
