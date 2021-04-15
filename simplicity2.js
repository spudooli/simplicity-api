
const puppeteer = require('puppeteer');
const CREDS = require('./.86c1ad205367bdb892b6d700f2e89ae2dd980518');
const USERNAME_SELECTOR = '#email'
const PASSWORD_SELECTOR = '#password'
const BUTTON_SELECTOR = 'button'


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();

    await page.goto('https://app.simplicity.kiwi/login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.simplicityusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.simplicitypassword);

    await page.click(BUTTON_SELECTOR);

    await page.waitFor(10*1000);

    const result = await page.evaluate(() => {
      let value = document.getElementsByTagName('h6')[1].innerText
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

