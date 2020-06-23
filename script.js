const fs = require("fs");


fs.readFile('leaderboard.json', 'utf-8', (err, data) => { 
    if (err) throw err;
    let stringData = JSON.parse(data);
    let arr = []
    for (let i = 0; i < stringData.length; i++) {
        let tPoints = {
            totalpoints: Number(stringData[i].totalpoints)
        }
        arr.push(tPoints);
    }

    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return -1;    
            } else if (a[prop] < b[prop]) {    
                return 1;    
            }    
            return 0;    
        }    
    }

    arr.sort(GetSortOrder("totalpoints"));

    console.log(arr);  

    function generateTableHead(table, data) {
      let thead = table.createTHead();
      let row = thead.insertRow();
      for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }
    }
    
    function generateTable(table, data) {
      for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
    }
    
    let table = document.querySelector("table");
    let data = Object.keys(stringData[i]); //for statement here
    generateTable(table, stringData);
    generateTableHead(table, data);
})
