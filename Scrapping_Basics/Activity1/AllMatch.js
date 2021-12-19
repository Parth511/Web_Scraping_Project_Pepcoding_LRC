const request = require("request");
const cheerio = require("cheerio");
const ScoreCardObj = require("./ScoreCard");

function getAllMatchesLink(url){
    request(url, function(err, response, html){
        if(err) console.log(err);
        else    extractAllLinks(html);
    });
}

function extractAllLinks(html){
    let $ = cheerio.load(html);
    let scorecardElements = $("a[data-hover='Scorecard']");
    for(let i=0; i<scorecardElements.length; i++){
        let link = $(scorecardElements[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        console.log(fullLink);
        ScoreCardObj.ps(fullLink)
    }
}

module.exports = {
    getAllMatches: getAllMatchesLink
}