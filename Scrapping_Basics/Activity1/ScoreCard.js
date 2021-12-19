const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

function processScorecard(url){
    request(url, cb);
}

//Details to be fetched: venue, data, opponent, result, runs, balls, fours, sixes, sr
//homepage

function cb(err, response, html){
    if(err)
        console.log(err);
    else
        extractMatchDetail(html);
}

//function to extract team, player, runs, balls, fours, sixes,
// sr, opponent, venue date

// venue, data and result will be common for both teams
// so extract them first
function extractMatchDetail(html){
    let $ = cheerio.load(html);
    //for venue and date
    // .event .description
    // result-> .event.status - text

    let descElem = $(".header-info .description");
    let result = $(".event .status-text").text();
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    //console.log(`Venue: ${venue}, Date: ${date}, Result: ${result}`);

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlStrings = "";
    // for(let i=0; i<innings.length; i++){
    //     htmlStrings += $(innings[i]).html();
    // }
    // console.log(htmlStrings);

    //for teams, playerNames, runs, balls, fours, sizes, sr
    for(let i=0; i<innings.length; i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i==0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("h5").text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        let currInning = $(innings[i]);
        // console.log(`${venue}| ${date}| ${teamName}| ${opponentName}| ${result}`);
        let allRows = currInning.find(".table.batsman tbody tr");
        for(let j=0; j<allRows.length; j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if(isWorthy){
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
            }
        }
    }
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result){
    let teamPath = path.join(__dirname,"ipl",teamName);
    dirCreater(teamPath);

    let filePath = path.join(teamPath, playerName+".xlsx");
    let content = excelReader(filePath, playerName);

    let playerObj = {
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    }
    content.push(playerObj);
    excelWriter(filePath, content, playerName);
}

function dirCreater(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}

//WRITE

function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();

    let newWS = xlsx.utils.json_to_sheet(json);
    
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    
    xlsx.writeFile(newWB, filePath);
}


//READ
function excelReader(filePath, sheetname){
    if(fs.existsSync(filePath)){

        let wb = xlsx.readFile(filePath);

        let excelData = wb.Sheets[sheetname];

        let ans = xlsx.utils.sheet_to_json(excelData);

        // console.log(ans);
        return ans;
    }
    return [];
}


module.exports={
    ps:processScorecard
}