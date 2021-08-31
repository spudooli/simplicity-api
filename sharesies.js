
const puppeteer = require('puppeteer');
const CREDS = require('./creds.js');
const USERNAME_SELECTOR = 'input[type=email]'
const PASSWORD_SELECTOR = 'input[type=password]'
const BUTTON_SELECTOR = 'button[type=submit]'


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  
  try {
    const page = await browser.newPage();

    await page.setViewport({
            width: 1200,
            height: 800
        });

    await page.goto('https://app.sharesies.nz/login', {waitUntil: 'networkidle0'});
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    //await page.click(BUTTON_SELECTOR);
    //await page.click('[type="submit"]')
    //await page.waitForNavigation({ waitUntil: ['networkidle2'] })
    await page.keyboard.press('Enter');
    await page.waitFor(4*1000);

    const result = await page.evaluate(() => {
      let fundtotal = document.querySelector('span.NumberElements__dollarValue__1ijaB').innerText.split(" ");
      return fundtotal[0]
      });

      console.log(result);

    browser.close();
  }

  catch (e) {
    browser.close();
  }
}

run();

