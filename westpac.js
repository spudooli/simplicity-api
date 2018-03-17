
const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = 'input#login-username'
const PASSWORD_SELECTOR = '#login-password'
const BUTTON_SELECTOR = '#action-login"]'

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  try {
    const page = await browser.newPage();

    await page.goto('https://bank.westpac.co.nz/one/app.html');

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.otherusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.otherpassword);
    
    await page.keyboard.press('Enter');

    await page.waitFor(2*1000);

    const result = await page.evaluate(() => {
      let value = document.querySelector('.account-balance').innerHTML;
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

