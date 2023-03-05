const admin = require("./admin.js");
const constants = require("./constants.js");
const report = require("./report.js");

function handleGetRequestToHome(req, res){

}

function handlePostRequestToRegistration(req, res){

}

function handlePostRequestToLogin(req, res){

}

function handleGetRequestToAdmin(req, res){
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
        const generalInfo = body.generalInfo;

        console.log("DEBUG------------"+username+password+age+generalInfo);

        admin.__insertUserData(username, password, age, generalInfo)
        .then((data)=>{
            res.status(200).send({"RegisteredUserId":data.insertId});
            admin.__notify(data.insertId, "Your account has been created!");
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

function handlePostRequestToPM(req, res){
    const body = req.body;
    const operationType = body.operation;

    if(operationType==constants.VIEW_HOURLY_PRODUCTION_REPORT){
        report.__viewProductionReport()
        .then((data)=>{
            res.status(200).send({"ProductionReport":data});
        })
        .catch((err)=>{
            throw err;
        });
    }
}

module.exports = {handleGetRequestToHome, handlePostRequestToRegistration, handlePostRequestToLogin, handleGetRequestToAdmin, handlePostRequestToSupervisor, handlePostRequestToPM}
