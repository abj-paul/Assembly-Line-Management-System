//let currentUserId = sessionStorage.getItem("userid"); //TODO: Some error happening here. So we will use default userId instead
let currentUserId = 2;
console.log("Current User Id: "+currentUserId);

function getHourlyProductionReport(){
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

    
            document.getElementById("hourlyProductionReportTable").appendChild(row);
        }
        })
        .catch((err)=>{
        console.log(err);
        });
    }

function getProfileInfo(){
    const profileInfo = document.getElementById("profile").children[1].children[0];//.div.div.h1
    const role = profileInfo.children[0];  
    const name = profileInfo.children[1];
    const age = profileInfo.children[2];
    const general_info = profileInfo.children[3];
    const userId = profileInfo.children[4];

    role.innerText += sessionStorage.getItem("role");
    name.innerText += sessionStorage.getItem("username");
    age.innerText += sessionStorage.getItem("age");
    general_info.innerText += sessionStorage.getItem("general_info");

    userId.innerText += currentUserId;
}

function getNotifications(){

    let url = "http://192.168.31.249:1401/admin"; //TODO: /productionManager
    data={
        "operation":"gn",
        "userid": currentUserId
    }

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
        console.log("Get Notification Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("DEBUG: notifications-"+data);
        for(let i=0; i<data.notifications.length; i++){
            let row = document.createElement('tr');
    
            let cell1 = document.createElement('td');
            cell1.innerText = data.notifications[i][0];
            let cell2 = document.createElement('td');
            cell2.innerText = data.notifications[i][1];
            let cell3 = document.createElement('td');
            let btn = document.createElement("button");
            btn.innerHTML = "Click!"
            cell3.appendChild(btn);

    
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
    
            document.getElementById("notificationTable").appendChild(row);
        }
    })
    .catch((err)=>{
    console.log(err);
    });
}

function registerResouce(){
    const machineModel = document.getElementById("machineModelId").value;
    const machineType = document.getElementById("machineType").value;
    const otherInfo = document.getElementById("otherInfo").value;
    const perHourProduction = document.getElementById("perHourProduction").value;

    let data = {
        "operation": "rm",
        "machineModel": machineModel,
        "machineType": machineType,
        "otherInfo": otherInfo,
        "perHourProduction": perHourProduction
    }
    let url = "http://192.168.31.249:1401/productionManager";


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
        console.log("Register Resource Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
        console.log(err);
        });
}

function registerTotalProductionTarge(){
    
}