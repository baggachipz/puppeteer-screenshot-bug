const connect = require('connect');
const serveStatic = require('serve-static');
const puppeteer = require('puppeteer');

(async () => {
    // start a server
    await connect()
     .use(serveStatic(`${__dirname}/static`))
     .listen(8080);

    // go to the index page and do screenshots
    const url = 'http://localhost:8080/index.html';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const imageDiv = await page.$('#source-img img');

    // screenshot the entire image
    await imageDiv.screenshot({
        path: './happycat-full.jpg',
    })

    // screenshot of the top half of the image
    await imageDiv.screenshot({
        path: './happycat-half.jpg',
        clip: { x: 0, y: 0, width: 273, height: 200 }
    });

    process.exit(0);
})();


