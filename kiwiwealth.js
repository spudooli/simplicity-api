
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
	    .goto('https://secure.kiwiwealth.co.nz/Login.aspx?')
	    .type(simplicityUsername, 'input[type="text"]')
	    .type(simplicityPassword, 'input[type="password"]')
	    .click('input[type="submit"]')
	    .wait(4000)
	    .html()
	    .evaluate(function() {
		var value =  document.querySelector('td.value').innerHTML;
		return value
	    })
	
	  .goto('https://secure.kiwiwealth.co.nz/logout.aspx')

	  console.log(html)

	  await chromeless.end()

}
	  run().then (function(){chrome.kill()}).catch(console.error.bind(console))
});
	


