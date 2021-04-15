
const puppeteer = require('puppeteer');
const CREDS = require('./.creds');
const USERNAME_SELECTOR = 'label.input.email'
const PASSWORD_SELECTOR = 'label.input.password'
const BUTTON_SELECTOR = 'body > section > div > hmy-container > hmy-content > hmy-sign-in-form > hmy-embedded-sign-in-form > hmy-sign-in-form > section > form > button'

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');

    await page.goto('https://www.harmoney.co.nz/sign-in', {waitUntil: 'networkidle2'});
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.harmoneyusername);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.harmoneypassword);
    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const result = await page.evaluate(() => {
      let fundsavailable = document.querySelector('#highlight-section > hmy-dashboard-summary > section > div:nth-child(1) > hmy-summary-value:nth-child(1) > div.value > span').innerHTML;
      //let principal = document.querySelector('#highlight-section > hmy-dashboard-summary > section > div:nth-child(1) > hmy-summary-value:nth-child(4) > div.value > span').innerHTML;
      let principal = document.querySelector('#main-section > section > principal-position-summary > hmy-dashboard-balance > div > p').innerHTML;
      let interest = document.querySelector('#highlight-section > hmy-dashboard-summary > section > div:nth-child(1) > hmy-summary-value:nth-child(4) > div.value').innerHTML;
      let interestreceived = document.querySelector('#highlight-section > hmy-dashboard-summary > section > div:nth-child(1) > hmy-summary-value:nth-child(3) > div.value > span').innerHTML;

      return fundsavailable + ":" + principal + ":" + interest + ":" + interestreceived
      //return fundsavailable + ":" + principal 
    });

    console.log(result);
      
          browser.close();
        }
    
  catch (e) {
    browser.close();
    }
  }

run();

