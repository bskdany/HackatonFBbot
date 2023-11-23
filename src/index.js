const {scrapeFB} = require('./FBscraper');

(async()=>{
    const url = "https://www.facebook.com/marketplace/item/359282306463205/";
    await scrapeFB(url)
})()