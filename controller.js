const admin = require("./admin.js");
const constants = require("./constants.js");
const report = require("./report.js");
const editUserData = require("./Model/edit-user-data.js");
const notification = require("./Model/notification.js");


function handleGetRequestToHome(req, res){

}

function handlePostRequestToRegistration(req, res){

}

function handlePostRequestToLogin(req, res){

}

function handlePostRequestToAdmin(req, res){
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
        const generalInfo = body.generalInfo;

        console.log("DEBUG------------"+username+password+age+generalInfo);

        admin.__insertUserData(username, password, age, role, generalInfo)
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
	const username = body.username;
	const password = body.password;

	admin.__getUserData(username, password)
	    .then((data)=>{
            
            if(data==undefined) res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
            else if(data[0].password==password)
		        res.status(200).send({"authentication":"successful!", "nextPage":"admin-dashboard.html", "userInfo":data[0]});
            else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});

	    })
    }else if(operationType == constants.EDIT_USER_INFO){
        const userid = body.userid;
        const username = body.username;
        const password = body.password;
        const age = body.age;
        const role = body.role;
        const general_info = body.generalInfo;

        console.log("DEBUG: Edit user info occuring.");

        editUserData.__connect().then((data)=>{console.log("Model:EditUserInfo.js has connected to database");}).catch((err)=>{console.log(err);});

        editUserData.updateUserData(userid, username, password, age, role, general_info)
        .then((data)=>{
            res.status(200).send({"DataUpdateStatus":"Successful!"});
        })
        .catch((err)=>{console.log(err);});
    } else if(operationType==constants.GET_NOTIFICATIONS){
        const userid = body.userid;
        notification.getNotifications(userid)
        .then((data)=>{
            console.log(data);
            res.status(200).send({"notifications":data});
        })
        .catch((err)=>{console.log(err);})
    }
}

function handlePostRequestToSupervisor(req, res){
    const body = req.body;
    const operationType = body.operation;

    if(operationType==constants.SUBMIT_HOURLY_PRODUCTION_REPORT){
        const userid = body.userid;
        const unit = body.unit;
        const productionAmount = body.productionAmount;
        const comment = body.comment;

        report.__insertProductionReportData(userid, unit, productionAmount, comment)
        .then((data)=>{
            res.status(200).send({"ReportId":data.insertId});
        })
        .catch((err)=>{
            throw err;
        });
    } 
}


module.exports = {handleGetRequestToHome, handlePostRequestToRegistration, handlePostRequestToLogin, handlePostRequestToAdmin, handlePostRequestToSupervisor}
