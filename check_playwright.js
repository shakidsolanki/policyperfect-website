import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  
  page.on('response', response => {
    if (response.request().resourceType() === 'script') {
      console.log('SCRIPT RESPONSE:', response.url(), response.status(), response.headers()['content-type']);
    }
  });

  try {
    await page.goto('https://policyperfect.co.in', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully.');
    await page.waitForTimeout(3000);
  } catch (e) {
    console.error('Failed to load:', e);
  }
  
  await browser.close();
})();
