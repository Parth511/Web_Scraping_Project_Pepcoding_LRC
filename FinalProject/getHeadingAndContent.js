// PLEASE INSTALL THE FOLLOWING MODULES BEFORE RUNNING THIS SCRIPT
// 1. REQUEST
// 2. CHEERIO
// 3. XLSX
// USE THE COMMAND npm install <module-name> 
// where the module name is any of the above mentioned modules but in lowercase.

const cheerio = require("cheerio");


function getHeading(contentArr, $){
    let allHeadingsArr = [];
    for(let i=0; i<contentArr.length; i++){
        let data = $(contentArr[i]).text();
        // console.log(data);
        allHeadingsArr.push(data);
    }
    // console.log(allHeadingsArr);

    let headingArr= [];
    headingArr.push(allHeadingsArr[0]);
    headingArr.push(allHeadingsArr[1]);
    headingArr.push(allHeadingsArr[2]);
    headingArr.push(allHeadingsArr[3]);
    return headingArr;
}

function getContent(contentArr, $){
    for(let i=0; i<contentArr.length; i++){
        contentArr[i] = $(contentArr[i]).text();
        // console.log(i + " " + data);
    }
    let finalContentArr = [];
    finalContentArr.push(contentArr[2]);
    finalContentArr.push(contentArr[3] + contentArr[4] + contentArr[5] + contentArr[6] + contentArr[7]);
    finalContentArr.push(contentArr[8]);
    finalContentArr.push(contentArr[9]);
    return finalContentArr;
}

module.exports = {
    getHeading : getHeading,
    getContent : getContent
}