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
    cleanData["Title"] = cleanText[0];
    cleanData["Price"] = cleanText[1];
    cleanData["Location"] = cleanText[3]; 
    cleanData["ListedOn"] = cleanText[4];

    counter = 4
    while(cleanText[counter]!="Unit Details"){
        counter+=1
    }
    
    cleanData["UnitDetails"] = []
    while(cleanText[counter]!="Rental Location"){
        cleanData["UnitDetails"].push(cleanText[counter])
        counter+=1
    }
    
    cleanData["Description"] = []
    while(cleanText[counter]!="Description"){
        counter+=1
    }
    dirtyDescription = cleanText[counter+=1].split('\n')
    for(descriptionLine of dirtyDescription){
        if(descriptionLine.length>0){
            cleanData["Description"].push(descriptionLine.trim())
        }
    }

    while(cleanText[counter]!="Getting Around"){
        counter+=1
    }
    cleanData["WalkScore"] = [cleanText[counter+=3] , cleanText[counter+=1]]
    cleanData["TransitScore"] = [cleanText[counter+=2] , cleanText[counter+=1]]
    cleanData["BikeScore"] = [cleanText[counter+=2] , cleanText[counter+=1]]
    cleanData["NearByTransit"] = [[cleanText[counter+=3], cleanText[counter+=1], cleanText[counter+=1]],
                                [cleanText[counter+=1], cleanText[counter+=1], cleanText[counter+=1]],
                                [cleanText[counter+=1], cleanText[counter+=1], cleanText[counter+=1]]]
    cleanData["SellerName"] = cleanText[counter+=3]
    cleanData["WhenJoined"] = cleanText[counter+=1] + " " + cleanText[counter+=1]
    fs.writeFileSync("./data/data.json",JSON.stringify(cleanData, null, 2))

}

module.exports = {createEnties}

// createEnties()