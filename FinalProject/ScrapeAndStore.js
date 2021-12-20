const request = require("request");     // <- install request module before running -> use command "npm install request"
const cheerio = require("cheerio");     // <- install cheerio module before running -> use command "npm install cheerio"
const fs = require("fs");               // <- this is an inbuilt module
const xlsx = require("xlsx");           // <- install xlsx module before running    -> use command "npm install xlsx"
const path = require("path");           // <- this is an inbuilt module
const get = require("./getHeadingAndContent");

function GotTheURL(url){
    request(url, cb);
}

function cb(err, repsonse, html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);

    // Getting the headings
    let contentArr = $(".mw-headline");

    let headingArr = get.getHeading(contentArr, $);

    // Getting the content under the headings
    contentArr = $("div.vector-body>div.mw-body-content.mw-content-ltr>div.mw-parser-output>p");

    let finalContentArr = get.getContent(contentArr, $);



    console.log("````````````````````CONTENT SCRAPED````````````````````");
    // Output the data, and store it in an excel file
    let filePath = path.join(__dirname, "P_Data_On_Wikipedia.xlsx");
    let data = excelReader(filePath);
    for(let i=0; i<4; i++){
        let currObj = {
            "Heading" : headingArr[i],
            "Content" : finalContentArr[i]
        };
        data.push(currObj);
        console.log('\x1b[36m%s\x1b[0m', headingArr[i] + ": ")
        console.log(finalContentArr[i]);
    }
    
    excelWriter(filePath, data);
}

//WRITE TO EXCEL FILE

function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();

    let newWS = xlsx.utils.json_to_sheet(json);
    
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    
    xlsx.writeFile(newWB, filePath);
}


//READ FROM EXCEL FILE

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

module.exports = {
    JustGiveMeURL: GotTheURL
}