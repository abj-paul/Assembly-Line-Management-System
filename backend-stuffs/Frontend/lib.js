
function PING(userHash, endpoint){

    const LOGIN_PAGE_LINK = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/login.html";

    sessionStorage.clear();

    let data = {
        "operation": "ping",
        "userHash": userHash
    }
    let url = "http://192.168.31.249:1401/"+endpoint;


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
            if(data.Access!="OK") window.location.href = LOGIN_PAGE_LINK;
        })
        .catch((err)=>{
        console.log(err);
        });
}