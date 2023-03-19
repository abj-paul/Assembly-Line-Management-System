const userHash = sessionStorage.getItem("userHash");
let currentUserId = sessionStorage.getItem("userid");
const LOGIN_PAGE_LINK = "file:///home/abhijit/Assembly-Line-Management-System/Frontend/login.html";


function setHourlyProductionAmount(){
    const userid = 4;//document.getElementById("userid").value;
    const productionAmount = document.getElementById("hourlyTargetId").value;
    const unit = document.getElementById("hourlyProductionUnitId").value;
    const comment = document.getElementById("commentOnHourlyProductionId").value;

    let url = "http://192.168.31.249:1401/supervisor";
    let data = {
        "operation":"shpr",
        "userid": userid,
        "unit": unit,
        "productionAmount": productionAmount,
        "comment": comment,
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
        console.log("Production Report Submission Request has been resolved!");
        return resolve.json()
        })
        .then((data)=>{
            console.log(data.ReportId);
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
        let url = "http://192.168.31.249:1401/supervisor";
    
    
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
            console.log("Logout has been resolved!");
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