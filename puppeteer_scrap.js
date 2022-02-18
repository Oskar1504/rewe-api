const puppeteer = require('puppeteer');
const fs = require("fs");


(async () => {
    let args = Object.fromEntries(
        process.argv.slice(2).map(elm =>{
            return elm.split(":")
        })
    )
    console.group("Puppeteer rewe PDP product. Args: ", args)

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(`https://shop.rewe.de/p/${args.productId}`);

    try {
        const element = await page.waitForSelector(".pdr-service-error", {timeout: 5000})
        let value = await element.evaluate(el => el.innerText.replace((/\n/g), ""))
        console.log({status: 404, data: value})
        console.groupEnd()

        fs.writeFileSync(`${__dirname}/scraped/products/${args.productId}.json`, JSON.stringify(value))

        await browser.close();
    } catch (error) {
        const element = await page.waitForSelector('script[id*=\'pdpr-propstore\']');
        let value = await element.evaluate(el => el.innerHTML);
        value = JSON.parse(value).productData

        fs.writeFileSync(`${__dirname}/scraped/products/${args.productId}.json`, JSON.stringify(value))

        console.log("Puppeteer procces wrote data to file")
        console.groupEnd()
        await browser.close();
    }

})();