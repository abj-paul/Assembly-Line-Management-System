const admin = require("./admin.js");
const constants = require("./constants.js");
const editUserData = require("./Model/edit-user-data.js");
const notification = require("./Model/notification.js");
const session = require("./Model/session.js");
const userHashLib = require("./Controller/userHash.js"); 
const production = require("./Model/production.model.js");


function handlePostRequestToAdmin(req, res){
    const body = req.body;
    const userHash = body.userHash;
    const operationType = body.operation;

    if(operationType!=constants.LOGIN){
       session.__checkUserHashValidity(userHash, constants.ADMIN_ENDPOINT)
        .then((data)=>{
            console.log("Access Control - "+data);
            if(data==constants.VALID_USER_HASH) __serveRequest(req,res);
            else res.send({"Authentication":constants.INVALID_USER_HASH});
        })
    }

    else __serveRequest(req, res);
}

function __serveRequest(req, res){
    const body = req.body;
    const operationType = body.operation;

    if(operationType==constants.VIEW_REGISTERED_USERS){
        admin.viewRegisteredUsers();
        admin.__viewRegisteredUsers().then((data)=>{
            res.status(200).send({"Status":data})
        });
    } else if(operationType==constants.REGISTER_NEW_USER){
        const username = body.username;
        const password = body.password;
        const age = body.age;
        const role = body.role;
	const pic = body.pic;
        const generalInfo = body.generalInfo;

        console.log("DEBUG------------"+username+password+age+generalInfo);

        admin.__insertUserData(username, password, age, role, pic, generalInfo)
        .then((data)=>{
            res.status(200).send({"RegisteredUserId":data.insertId});
            notification.__notify(data.insertId, "Your account has been created!");
        })
        .catch((err)=>{
            throw err;
        })
    } else if(operationType==constants.GET_ALL_DATABASE_DATA){
        admin.__viewAllTableData()
        .then((data)=>{
            res.status(200).send({"Datasets":data});
        })
        .catch((err)=>{
            throw err;
        })
    } else if(operationType == constants.LOGIN){
        login(req, res);
    }else if(operationType == constants.EDIT_USER_INFO){
        const userid = body.userid;
        const username = body.username;
        const password = body.password;
        const age = body.age;
        const role = body.role;
        const general_info = body.generalInfo;

        console.log("DEBUG: Edit user info occuring.");

        editUserData.__connect()
        .then((data)=>{console.log("Model:EditUserInfo.js has connected to database");})
        .catch((err)=>{console.log(err);});

        editUserData.updateUserData(userid, username, password, age, role, general_info)
        .then((data)=>{
            res.status(200).send({"DataUpdateStatus":"Successful!"});
        })
        .catch((err)=>{console.log(err);});
    } else if(operationType==constants.GET_NOTIFICATIONS){
        const userid = body.userid;
        notification.getNotifications(userid)
        .then((data)=>{
            //console.log(req,res,data);
            res.status(200).send({"notifications":data});
        })
        .catch((err)=>{console.log(err);})
    }else if(operationType==constants.LOGOUT){
        const userHash = body.userHash;
        userHashLib.deleteSession(userHash, constants.ADMIN_ENDPOINT);
        res.status(200).send({"SessionDelete":true});
    }else if(operationType==constants.DELETE_USER){
	const userid = body.userid;
	admin.__deleteEntry(userid)
	    .then((data)=>{
		if(data==true) res.status(200).send({"Status": "Delete successful"});
		else res.send({"Status": "Delete unsuccessful"});
	    });
    }else if(operationType==constants.SET_VIEWER_INFO){
        const productionId = body.productionId;
        const viewerInfo = body.viewerInfo;

        production.setViewerInfo(productionId, viewerInfo)
        .then((data)=>{
            console.log("DEBUG: ");
            console.log(data);
            res.status(200).send({"Status": "Successfully set viewer info"});
        })
    }else if(operationType==constants.DELETE_NOTIFICATION){
        const notificationId = body.notificationId;
        notification.delete_notification(notificationId)
        .then((data)=>{
            res.status(200).send({"Status":"Deleted notification "+notificationId});
        })
    }
}

async function login(req, res){
    const body = req.body;
    const username = body.username;
	    const password = body.password;

        const data = await admin.__getUserData(username, password)

        if(data==undefined) res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
        else if(data[0].password==password){
            const x = await userHashLib.createSession(username+password, constants.ADMIN_ENDPOINT);

            console.log("DEbug: hash="+x);
            res.status(200).send({"userHash": x, "authentication":"successful!", "nextPage":"admin-dashboard.html", "userInfo":data[0]});
        }
        else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
 
}


module.exports = { handlePostRequestToAdmin}
