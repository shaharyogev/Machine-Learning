const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false}); // default is true
	const page = await browser.newPage();
	page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36')
	await page.goto('https://www.instagram.com/');
	//await page.screenshot({path: 'example.png'});
	
	// start the page script
	await page.evaluate(() => {
		document.querySelectorAll('input[name="emailOrPhone"]')[0].value ='user1@test.com';
		document.querySelectorAll('input[name="emailOrPhone"]')[0].value ='user1@test.com';
		document.querySelectorAll('button[type="submit"]')[0].click()

		

	});

  await browser.close();
})();