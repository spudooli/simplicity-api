
const { Chromeless } = require('chromeless')

const sharesiesUsername = ""
const sharesiesPassword = ""
const chromeLauncher = require('chrome-launcher');
 
chromeLauncher.launch({
	  startingUrl: 'https://google.com',
	  chromeFlags: ['--headless', '--disable-gpu']
	  }).then (function(chrome){

async function run() {
	  const chromeless = new Chromeless()

	  const html = await chromeless
	    .goto('https://app.sharesies.nz/login')
	    .type(sharesiesUsername, 'input[type="email"]')
	    .type(sharesiesPassword, 'input[type="password"]')
	    .click('button[type="submit"]')
	    .wait(5000)
	    .html()
	    .evaluate(function() {
		var value =  document.querySelector('text.fund-total').innerHTML;
		return value
	    })
	

	  console.log(html)

	  await chromeless.end()

}
	  run().then (function(){chrome.kill()}).catch(console.error.bind(console))
});
	


