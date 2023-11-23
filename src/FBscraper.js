const {chromium} = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
const fs = require('fs');

async function scrapeFB(url){
    const context = await chromium.launchPersistentContext("./chrome-files",{
        headless: true,
    })
    const page = await context.newPage()
    await page.goto(url)
    await page.getByRole('button', { name: 'See more' }).click();

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
    await page.screenshot({path:"./data/screenshot.png"})
    await context.close()

    let cleanText = [];
    for(value of text){
        cleanText.push(value.replaceAll("\n",""))
    }

    var cleanData = {};
    cleanData["Title"] = cleanText[0];
    cleanData["Price"] = cleanText[1];
    cleanData["Location"] = cleanText[3]; 
    cleanData["ListedOn"] = cleanText[4];
    cleanData["UnitDetails"] = [cleanText[12],cleanText[13],cleanText[14],cleanText[15],cleanText[16]]
    cleanData["Description"] = cleanText[21]
    cleanData["WalkScore"] = [cleanText[26] , cleanText[27]]
    cleanData["TransitScore"] = [cleanText[29] , cleanText[30]]
    cleanData["BikeScore"] = [cleanText[32] , cleanText[33]]
    cleanData["NearByTransit"] = [cleanText[36], cleanText[37], cleanText[38]],
                                 [cleanText[39], cleanText[40], cleanText[41]],
                                 [cleanText[42], cleanText[43], cleanText[44]]
    cleanData["SellerName"] = cleanText[47]
    cleanData["WhenJoined"] = cleanText[49]
    fs.writeFileSync("./data/data.json",JSON.stringify(cleanData, null, 2))
}


module.exports = {scrapeFB}