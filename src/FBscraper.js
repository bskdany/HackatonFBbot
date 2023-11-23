const {chromium} = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const {createEnties} = require('./sanitize')
const fs = require('fs');
const { setTimeout } = require("timers/promises");

async function scrapeFB(url){
    const context = await chromium.launchPersistentContext("./chrome-files",{
        headless: true,
    })
    // await context.setDefaultTimeout(10000)
    const page = await context.newPage()
    await page.goto(url)

    try{
        await page.getByRole('button', { name: 'See more' }).click();
    }
    catch(e){
        //bruh
    }
    await setTimeout(4000)
    await page.screenshot({path:"./data/screenshot.png"})


    const text = await page.evaluate(()=>{
        function extractTextFromObject(obj) {
            let textArray = [];

            function traverseChildren(element) {
                if (element.nodeType === 3 && element.textContent.trim() !== '') {
                    textArray.push(element.textContent.trim());
                }

                for (let i = 0; i < element.childNodes.length; i++) {
                    traverseChildren(element.childNodes[i]);
                }
            }

            traverseChildren(obj);

            return textArray;
        }

        const sampleObject = document.querySelector('div[data-pagelet="MainFeed"]'); // Replace with your actual object ID
        const textArrayResult = extractTextFromObject(sampleObject);
        // console.log(textArrayResult);
        return textArrayResult
    })
    await context.close()
    fs.writeFileSync('./data.txt', JSON.stringify(text))
    return createEnties(text)
}


module.exports = {scrapeFB}