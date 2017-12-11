
const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = '#Username'
const PASSWORD_SELECTOR = '#Password'
const BUTTON_SELECTOR = 'input[type="submit"]'


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();

    await page.goto('https://apisimplicity.mmcnz.co.nz/User/LogOn');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.simplicityusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.simplicitypassword);

    await page.click(BUTTON_SELECTOR);

    await page.waitFor(15*1000);

    const result = await page.evaluate(() => {
      let value = document.querySelector('span.counter').innerHTML;
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

