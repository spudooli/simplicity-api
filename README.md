## Simplicity-api
Simplicity Kiwisaver (https://simplicity.kiwi/) doesn't have an API so I'll get at my own data another way using Google Puppeteer

## Sharesies-api
Sharesies (https://www.sharesies.co.nz) don't have an API either, but we need our balance every hour for the dashboard and database and tweets of humour (https://twitter.com/spudooli_house, so we'll go get it, thanks. 

## Westpac NZ API
Westpac NZ also doesn't have an API that allows us to get our balances automatically every 60 minutes for the kitchen Dashboard, so we'll go get them the old fashioned way, by scraping the page

## Harmoney API
Harmoney, of course, doesn't have an API that allows us to lending balances automatically every 60 minutes for the kitchen Dashboard, so Puppeteer to the rescue again.

```apt-get install nodejs```

```npm install puppeteer```


Still need to find a suitable was to secure the credentials, that'll be tomorrow's job


