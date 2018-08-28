
const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = 'label.input.email'
const PASSWORD_SELECTOR = 'label.input.password'
const BUTTON_SELECTOR = '.ng-touched.ng-dirty.ng-valid button[type=submit]'

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();

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

