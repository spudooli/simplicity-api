
const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME_SELECTOR = 'input[type=email]'
const PASSWORD_SELECTOR = 'input[type=password]'
const BUTTON_SELECTOR = 'div.ui.page-button > button'


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto('https://app.sharesies.nz/login');
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitFor(5*1000);

  const result = await page.evaluate(() => {
    let fundtotal = document.querySelector('text.fund-total').innerHTML;
    return fundtotal
    });

    console.log(result);

  browser.close();
}

run();

