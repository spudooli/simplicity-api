
const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = 'input[type="text"]'
const PASSWORD_SELECTOR = 'input[type="password"]'
const BUTTON_SELECTOR = 'input[type="submit"]'


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  
  try {
    const page = await browser.newPage();

    await page.goto('https://secure.kiwiwealth.co.nz/Login.aspx?');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.kiwiwealthusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.kiwiwealthpassword);

    await page.click(BUTTON_SELECTOR);

    await page.waitFor(15*1000);

    const result = await page.evaluate(() => {
      let value = document.querySelector('td.value').innerHTML;
      return value
      });

    console.log(result);
    
        browser.close();
  }
  
  catch (e) {
    browser.close();
    }
}

run();

