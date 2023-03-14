
function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    console.log(username + password + role);

    let url = "http://192.168.31.249:1401/admin";
    let data = {
	"operation":"login",
	"username": username,
	"password": password
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
            console.log("Authentication has been done!");
            return resolve.json()
        })
        .then((data)=>{
            console.log(data.authentication);
            sessionStorage.setItem("userid", data.userInfo.userid);
            sessionStorage.setItem("username", data.userInfo.username);
            sessionStorage.setItem("password", data.userInfo.password);
            sessionStorage.setItem("age", data.userInfo.age);
            sessionStorage.setItem("role", data.userInfo.role);
            sessionStorage.setItem("general_info", data.userInfo.general_info);

            //console.log(data.userInfo);
	        if(data.nextPage!="none") window.location.href = data.nextPage;
        })
        .catch((err)=>{
            console.log(err);
        });

}
