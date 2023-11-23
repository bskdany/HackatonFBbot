const {scrapeFB} = require('./FBscraper');

(async()=>{
    const url = "https://www.facebook.com/marketplace/item/359181193445836";
    const url1 = "https://www.facebook.com/marketplace/item/891242245701249";
    await scrapeFB(url1)
})()