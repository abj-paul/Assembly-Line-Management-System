function getReportList(){
    let url = "http://192.168.31.249:1401/productionManager";
    let data = {"operation":"vhpr"};
    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then((resolve)=>{
        console.log("View Report Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data);
        for(let i=0; i<data.ProductionReport.length; i++){
            let row = document.createElement('tr');
    
            let cell1 = document.createElement('td');
            cell1.innerText = data.ProductionReport[i][1];
            let cell2 = document.createElement('td');
            cell2.innerText = data.ProductionReport[i][0];
            let cell3 = document.createElement('td');
            cell3.innerText = data.ProductionReport[i][2];
            let cell4 = document.createElement('td');
            cell4.innerText = data.ProductionReport[i][3];
            let cell5 = document.createElement('td');
            cell5.innerText = data.ProductionReport[i][4];
    
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cell5);

    
            document.getElementsByTagName("tbody")[0].appendChild(row);
        }
        })
        .catch((err)=>{
        console.log(err);
        });
    }