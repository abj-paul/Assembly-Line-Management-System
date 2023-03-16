const session = require("../Model/session.js");

async function createSession(userdata, endpoint){
    const time = new Date().toLocaleString();
    const data = userdata + time;
    const hashedData = hash(data);
    
    const userHash = await session.__insertDataIntoSessionTable(hashedData, endpoint);
    return userHash;
}

function deleteSession(userHash, endpoint){
    session.__deleteRowFromTable(userHash, endpoint)
    .then((result) => {
        console.log("Deleted session "+result);
    }).catch((err) => {
        console.log(err);
    });
}

/*
function checkSession(userHash, endpoint){
    session.__checkUserHashValidity(userHash, endpoint)
    .then((data)=>{
        if(data=="VALID_USER_HASH") 
    })
}
*/


function hash(data) {
    var hash = 0, i, chr;
    if (data.length === 0) return hash;
    for (i = 0; i < data.length; i++) {
        chr = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

module.exports = {createSession, deleteSession}