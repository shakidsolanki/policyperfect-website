import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  try {
    await page.goto('https://policyperfect.vercel.app', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully');
  } catch (e) {
    console.error('Failed to load:', e);
  }
  
  await browser.close();
})();
