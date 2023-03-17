let currentUserId = sessionStorage.getItem("userid");
let userHash = sessionStorage.getItem("userHash");
console.log("Current User Id: "+currentUserId);
console.log("userHash: "+userHash);

let assemblyLines = null;


const LOGIN_PAGE_LINK = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/login.html";


function getHourlyProductionReport(){
    let url = "http://192.168.31.249:1401/productionManager";
    let data = {
        "operation":"vhpr",
        "userHash": userHash
    };
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

    let url = "http://192.168.31.249:1401/productionManager";
    data={
        "operation":"gn",
        "userid": currentUserId,
        "userHash":userHash
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
        "perHourProduction": perHourProduction,
        "userHash":userHash
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
            document.getElementById("resourceRegistrationStatus").innerText = "Status: Successfully machine "+data.MachineId;
        })
        .catch((err)=>{
        console.log(err);
        });
}

function logout(){
    sessionStorage.clear();

    let data = {
        "operation": "logout",
        "userHash": userHash
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
            window.location.href = LOGIN_PAGE_LINK;
        })
        .catch((err)=>{
        console.log(err);
        });

}

function registerAssemblyLine(){
    const name = document.getElementById("nameAssemblyLine").value;
    const otherInfo = document.getElementById("otherInfo").value;
    const capacity = document.getElementById("capacity").value;

    let data = {
        "operation": "ral",
        "name": name,
        "capacity": capacity,
        "otherInfo": otherInfo,
        "userHash":userHash
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
            console.log("Assembly Line Register Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            document.getElementById("assemblyLineRegistrationStatus").innerText = "Status: Assembly Line Registration Successful."
        })
        .catch((err)=>{
        console.log(err);
        });
}

function populateAssemblyLineList(){

    let data = {
        "operation":"gallist",
        "userHash":userHash
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
            console.log("Assembly Line View List Request has been resolved!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            assemblyLines = data.AssemblyLineList;

            // <input type="checkbox" name="assemblyLine" value="1" /> <label>Select Assembly Line</label>
            for(let i=0; i<assemblyLines.length; i++){

                let div = document.createElement("div");
                div.setAttribute("class", "form-check");

                let label = document.createElement("label");
                label.innerHTML = assemblyLines[i].name;
                label.setAttribute("class", "form-check-label");
                label.setAttribute("for", "checkbox"+i);

                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox"); 
                checkbox.setAttribute("name", "assemblyLineCheckbox");
                checkbox.setAttribute("value", assemblyLines[i].assemblyLineId);
                checkbox.setAttribute("class", "form-check-input");
                checkbox.setAttribute("id", "checkbox"+i);

                div.appendChild(checkbox);
                div.appendChild(label);

                document.getElementById("assemblyLinesForProduction").appendChild(div);
            }
        })
        .catch((err)=>{
        console.log(err);
        });

    
}

function __registerTotalProductionTarget(){
    var checkboxes = document.getElementsByName("assemblyLineCheckbox");
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          checkboxesChecked.push({"name": checkboxes[i].nextSibling.innerText, "id": checkboxes[i].value, "capacity": assemblyLines[i].capacity});
       }
    }

    sessionStorage.setItem("selectedAssemblyLines", JSON.stringify(checkboxesChecked));
    //console.log(JSON.parse(sessionStorage.getItem("selectedAssemblyLines")));

    let totalProductionTarget = document.getElementById("totalProductionTarget").value;
    sessionStorage.setItem("totalProductionTarget", totalProductionTarget);
}

function loadLayoutPage(){
    __registerTotalProductionTarget();
    window.location.href = "layout.html";
}

function saveProductionRegistrationInDatabase(){

}