
const puppeteer = require('puppeteer');
const CREDS = require('creds);
const USERNAME_SELECTOR = '#email'
const PASSWORD_SELECTOR = '#password'
const BUTTON_SELECTOR = 'button'

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  try {
    const page = await browser.newPage();

    await page.goto('https://app.simplicity.kiwi/login');
    
    await page.keyboard.press('Tab');
    //await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.kiwiwealthusername);
    await page.keyboard.press('Tab');

    //await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.kiwiwealthpassword);

    //await page.click(BUTTON_SELECTOR);
    await page.keyboard.press('Enter');
    await page.waitForNavigation()
    await page.waitForSelector('h6')
    //await page.waitForTimeout(10*1000);


    const result = await page.evaluate(() => {
      let value = document.querySelectorAll('h6')[1].innerText
      return value
      });

      console.log(result);
      
          browser.close();
        }
    
  catch (e) {
    console.log(e)
    browser.close();
    }
  }

run();
