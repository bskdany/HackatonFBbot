const fs = require('fs')

function createEnties(text){
    // const text = JSON.parse(fs.readFileSync('./data.txt'))

    let cleanText = [];
    let counter = 0;
    for(value of text){
        // console.log(`${counter} ${value}`)
        // cleanText.push(value.replaceAll("\n",""))
        counter+=1
        cleanText.push(value)
    }

    var cleanData = {};
    cleanData["title"] = cleanText[0];
    cleanData["price"] = cleanText[1];
    cleanData["location"] = cleanText[3]; 
    cleanData["listedOn"] = cleanText[4];

    counter = 4
    while(cleanText[counter]!="Unit Details"){
        counter+=1
    }
    
    cleanData["unitdetails"] = []
    while(cleanText[counter]!="Rental Location"){
        cleanData["unitdetails"].push(cleanText[counter])
        counter+=1
    }
    
    cleanData["description"] = []
    while(cleanText[counter]!="Description"){
        counter+=1
    }
    dirtyDescription = cleanText[counter+=1].split('\n')
    for(descriptionLine of dirtyDescription){
        if(descriptionLine.length>0){
            cleanData["description"].push(descriptionLine.trim())
        }
    }

    while(cleanText[counter]!="Getting Around"){
        counter+=1
    }
    cleanData["walkscore"] = [cleanText[counter+=3] , cleanText[counter+=1]]
    cleanData["transitscore"] = [cleanText[counter+=2] , cleanText[counter+=1]]
    cleanData["bikescore"] = [cleanText[counter+=2] , cleanText[counter+=1]]
    cleanData["nearbytransit"] = [[cleanText[counter+=3], cleanText[counter+=1], cleanText[counter+=1]],
                                [cleanText[counter+=1], cleanText[counter+=1], cleanText[counter+=1]],
                                [cleanText[counter+=1], cleanText[counter+=1], cleanText[counter+=1]]]
    cleanData["sellername"] = cleanText[counter+=3]
    cleanData["whenjoined"] = cleanText[counter+=1] + " " + cleanText[counter+=1]

    finalData = JSON.stringify(cleanData, null, 2)
    // fs.writeFileSync("./data/data.json",JSON.stringify(cleanData, null, 2))
    return finalData
}

module.exports = {createEnties}