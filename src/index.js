const {scrapeFB} = require('./FBscraper');
const express = require('express');
var app = express();

// // Define a route that handles the ID and returns the URL
// app.get('/fb', async (req, res) => {
//     const url = req.query.url;
//     // console.log(`Requested page with id ${pageId}`)
//     // const contextPort = await getContext(pageId);
//     // console.log(`For page id ${pageId} got context port ${contextPort.urlPort}`)
//     console.log(url)
//     const data = await scrapeFB(url)
//     console.log(data)
//     res.send(data);
// });


app.get('/ping', (req, res) => {
  res.send("Server Online")
})


app.get('/fb', async (req, res) => {
  const url = req.query.url;
  // console.log(`Requested page with id ${pageId}`)
  // const contextPort = await getContext(pageId);
  // console.log(`For page id ${pageId} got context port ${contextPort.urlPort}`)
  // console.log(url)
  // const data = await scrapeFB(url)
  data = JSON.parse("../data/data.json")
  console.log(data)
  res.send(data);
});


// Set the port for the server to listen on
const PORT = 10002;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// (async()=>{
//     const url = "https://www.facebook.com/marketplace/item/359181193445836";
//     const url1 = "https://www.facebook.com/marketplace/item/891242245701249";
//     const url2 = "https://www.facebook.com/marketplace/item/359282306463205/";
//     await scrapeFB(url2)
// })()