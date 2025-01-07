const ip_addr = "http://127.0.0.1:1401/";
let currentUserId = sessionStorage.getItem("userid");
let userHash = sessionStorage.getItem("userHash");
console.log("Cache: "+currentUserId);
console.log("userHash: "+userHash);

const LOGIN_PAGE_LINK = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/login.html";

function getUserList(){
let url = ip_addr + "admin";
let data = {"operation":"vru", "userHash": userHash};
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
	console.log("View User Request has been resolved!");
	return resolve.json()
    })
    .then((data)=>{
        console.log(data);
	for(let i=0; i<data.Status.length; i++){
	    let row = document.createElement('tr');

	    let cell1 = document.createElement('td');
	    cell1.innerText = data.Status[i][0];
	    let cell2 = document.createElement('td');
	    cell2.innerText = data.Status[i][1];
        let cell3 = document.createElement('td');
	    cell3.innerText = data.Status[i][2];
        let cell4 = document.createElement('td');
	    cell4.innerText = data.Status[i][3];

	    row.appendChild(cell1);
	    row.appendChild(cell2);
        row.appendChild(cell3);
	    row.appendChild(cell4);

	    document.getElementsByTagName("table")[0].appendChild(row);
	}
    })
    .catch((err)=>{
	console.log(err);
    });
}


function registerUser(){
    const username = document.getElementById("userNameId").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const generalInfo = document.getElementById("generalInfoId").value;
    const role = document.getElementById("role").value;


    let url = ip_addr + "admin";
    let data = {
        "operation":"rnu",
        "username": username,
        "password": password,
        "age": age,
        "generalInfo": generalInfo,
        "role": role,
        "userHash": userHash
    }

    console.log(data);

    
    //{"operation":"rnu", "username":username, "password":password, "age":age, "generalInfo":generalInfo};
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
        console.log("Registration Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        //document.write("It worked!");
        document.getElementById("status").innerText = "User Id for registered user: "+data.RegisteredUserId;
    })
    .catch((err)=>{
    console.log(err);
    });
}

function downloadDatabase(){
    var csv = 'a,b,c\n1,2,3\n';

    let url = ip_addr + "admin";
    let data = {
        "operation":"gadd",
        "userHash": userHash
    }
    
    //{"operation":"rnu", "username":username, "password":password, "age":age, "generalInfo":generalInfo};
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
        console.log("Download Data Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log(data);
        let content = new Blob([JSON.stringify(data.Datasets)]);
        let a = document.getElementById('downloadDataLink');
        a.href = URL.createObjectURL(content);
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

function editUserInfo(){
    const userid = document.getElementById("euserId").value;
    const username = document.getElementById("euserNameId").value;
    const password = document.getElementById("epassword").value;
    const age = document.getElementById("eage").value;
    const generalInfo = document.getElementById("egeneralInfoId").value;
    const role = document.getElementById("erole").value;

    //console.log(userid, username, password, age, generalInfo, role);
    let url = ip_addr + "admin";
    data={
        "operation":"eui",
        "username": username,
        "password": password,
        "age": age,
        "generalInfo": generalInfo,
        "role": role,
        "userid": userid,
        "userHash": userHash
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
        console.log("Edit User Info Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        //document.write("It worked!");
        document.getElementById("editInfoStatus").innerText += data.DataUpdateStatus;
    })
    .catch((err)=>{
    console.log(err);
    });
}

function getNotifications(){

    let url = ip_addr + "admin";
    data={
        "operation":"gn",
        "userid": currentUserId,
        "userHash": userHash
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

function setViewerInfo(){
    
}

function logout(){
    let data = {
        "operation": "logout",
        "userHash": userHash
    }
    let url = ip_addr + "admin";


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
        console.log("Logout Resource Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data);
            sessionStorage.clear();
            window.location.href = LOGIN_PAGE_LINK;
        })
        .catch((err)=>{
        console.log(err);
        });
}

