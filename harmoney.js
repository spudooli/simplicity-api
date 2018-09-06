
const puppeteer = require('puppeteer');
const CREDS = require('./.creds');
const USERNAME_SELECTOR = 'label.input.email'
const PASSWORD_SELECTOR = 'label.input.password'
const BUTTON_SELECTOR = '.ng-touched.ng-dirty.ng-valid button[type=submit]'

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');

    await page.goto('https://www.harmoney.co.nz/sign-in');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.harmoneyusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.harmoneypassword);
    await page.waitFor(5*1000);
    await page.click(BUTTON_SELECTOR);

    await page.waitFor(10*1000);

    const result = await page.evaluate(() => {
      let fundsavailable = document.querySelector('#main-section > section > cash-position-summary > hmy-dashboard-balance > div > p').innerHTML;
      let principal = document.querySelector('#main-section > section > principal-position-summary > hmy-dashboard-balance > div > p').innerHTML;

      return fundsavailable + ":" + principal
    });

    console.log(result);
      
          browser.close();
        }
    
  catch (e) {
    browser.close();
    }
  }

run();

