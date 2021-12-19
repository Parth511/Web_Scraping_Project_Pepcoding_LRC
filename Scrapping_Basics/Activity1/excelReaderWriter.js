const fs = require("fs");
const xlsx = require("xlsx");

// // let buffer = fs.readFileSync("./example.json");

let data = require("./example.json");
// // console.log(buffer);
// console.log("``````````````````````````````````````````````````````````")
// // let data = JSON.parse(buffer);
// console.log(data);


// data.push(
//     {
//         "name":"Parth",
//         "last Name":"Rogers",
//         "isAvenger": true,
//         "friends": ["Bruce", "Peter", "Natasha"],
//         "Age": 45,
//         "address": {
//             "city": "New York",
//             "State": "Manhattan"
//         }
//     }
// );

// let stringData = JSON.stringify(data);
// fs.writeFileSync("./example.json", stringData);

// console.log(data);


// workbook -> filePath, worksheet->name, json data

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