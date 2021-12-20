// PLEASE INSTALL THE FOLLOWING MODULES BEFORE RUNNING THIS SCRIPT
// 1. REQUEST
// 2. CHEERIO
// 3. XLSX
// USE THE COMMAND npm install <module-name> 
// where the module name is any of the above mentioned modules but in lowercase.

const request = require("request");
const cheerio = require("cheerio");
const WorkAfterGettingURL = require("./ScrapeAndStore");

const url = "https://www.wikipedia.org/";

request(url, cb);

function cb(err, response, html){
    if(err)
        console.log(err);
    else
        extractLink(html);
}

function extractLink(html){
    let $ = cheerio.load(html);
    let content = $("a[id='js-link-box-en']");
    let link1 = $(content).attr("href");
    let fullLink1 = "https:" + link1;
    console.log("Link1: ", fullLink1);
    request(fullLink1, cb2);
}

function cb2(err, response, html){
    if(err)
        console.log(err);
    else{
        extractLink2(html);
    }
}

function extractLink2(html){
    let $ = cheerio.load(html);
    let content2 = $("a[title='Wikipedia:Contents/Portals']");
    let link2 = $(content2).attr("href");
    let fullLink2 = "https://en.wikipedia.org/" + link2;
    console.log("Link2: ", fullLink2);
    request(fullLink2, cb3);
}

function cb3(err, response, html){
    if(err)
        console.log(err);
    else
        extractLink3(html);
}

function extractLink3(html){
    let $ = cheerio.load(html);
    let content3 = $("a[title='Wikipedia:Contents/A–Z index']");
    let link3 = $(content3[0]).attr("href");
    let fullLink3 = "https://en.wikipedia.org/" + link3;
    console.log("Link3: ", fullLink3);
    request(fullLink3, cb4);
}

function cb4(err, response, html){
    if(err)
        console.log(err);
    else
        extractLink4(html);
}

function extractLink4(html){
    let $ = cheerio.load(html);
    let content4 = $("a[title='Special:AllPages/P']");
    let link4 = $(content4).attr("href");
    let fullLink4 = "https://en.wikipedia.org/" + link4;
    console.log("Link4: ", fullLink4);
    request(fullLink4, cb5);
}

function cb5(err, response, html){
    if(err)
        console.log(err);
    else{
        extractLink5(html);
    }
}

function extractLink5(html){
    let $ = cheerio.load(html);
    let content5 = $("a[title='P']");
    let link5 = $(content5).attr("href");
    let fullLink5 = "https://en.wikipedia.org/" + link5;
    console.log("Link5: ", fullLink5);
    WorkAfterGettingURL.JustGiveMeURL(fullLink5);
}
