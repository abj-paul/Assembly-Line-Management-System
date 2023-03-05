function getUserList(){
let url = "http://192.168.31.249:1401/admin";
let data = {"operation":"vru"};
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
	for(let i=0; i<data.Status.length; i++){
	    let row = document.createElement('tr');

	    let cell1 = document.createElement('td');
	    cell1.innerText = data.Status[i][0];
	    let cell2 = document.createElement('td');
	    cell2.innerText = data.Status[i][1];

	    row.appendChild(cell1);
	    row.appendChild(cell2);

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

    let url = "http://192.168.31.249:1401/admin";
    let data = {
        "operation":"rnu",
        "username": username,
        "password": password,
        "age": age,
        "generalInfo": generalInfo
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

    let url = "http://192.168.31.249:1401/admin";
    let data = {
        "operation":"gadd"
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
        var content = new Blob([JSON.stringify(data.Datasets)]);
        var a = document.getElementById('downloadData');
        a.href = URL.createObjectURL(content);
    })
    .catch((err)=>{
    console.log(err);
    });
}