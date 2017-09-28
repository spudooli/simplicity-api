
const { Chromeless } = require('chromeless')

const simplicityUsername = ""
const simplicityPassword = ""
const chromeLauncher = require('chrome-launcher');
 
chromeLauncher.launch({
	  startingUrl: 'https://google.com',
	  chromeFlags: ['--headless', '--disable-gpu']
	  }).then (function(chrome){

async function run() {
	  const chromeless = new Chromeless()

	  const html = await chromeless
	    .goto('https://apisimplicity.mmcnz.co.nz/User/LogOn')
	    .type(simplicityUsername, '#Username')
	    .type(simplicityPassword, '#Password')
	    .click('input[type="submit"]')
	    .wait(15000)
	    .html()
	    .evaluate(function() {
		var value =  document.querySelector('span.counter').innerHTML;
		return value
	    })
	
	  .goto('https://app.simplicity.kiwi//login/logout')

	  console.log(html)

	  await chromeless.end()

	  }
	  run().then (function(){chrome.kill()}).catch(console.error.bind(console))
});
	


