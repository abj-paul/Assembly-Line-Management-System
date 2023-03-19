const constants = require("../constants.js");
const report = require("../Model/hourly-production-report.model.js")
const admin = require("../admin.js");
const machine = require("../Model/machine.js");
const session = require("../Model/session.js");
const userHashLib = require("../Controller/userHash.js");
const notification = require("../Model/notification.js");
const assemblyLine = require("../Model/assembly-line-layoud.model.js");

function handlePostRequestToSupervisor(req, res){
    const body = req.body;
    const userHash = body.userHash;
    const operationType = body.operation;

    if(operationType!=constants.LOGIN){
       session.__checkUserHashValidity(userHash, constants.SUPERVISOR_ENDPOINT)
        .then((data)=>{
            //console.log("Access Control - "+data);
            if(data==constants.VALID_USER_HASH) __serveRequest(req,res);
            else res.send({"Authentication":constants.INVALID_USER_HASH});
        })
    }

    else __serveRequest(req, res);
}


function __serveRequest(req, res){
    const body = req.body;
    const operationType = body.operation;


    if(operationType==constants.LOGIN) login(req, res);
    else if(operationType==constants.VIEW_HOURLY_PRODUCTION_REPORT){
        report.__viewProductionReport()
        .then((data)=>{
            res.status(200).send({"ProductionReport":data});
        })
        .catch((err)=>{
            throw err;
        })
    } else if(operationType==constants.GET_NOTIFICATIONS){
        const userid = body.userid;
        notification.getNotifications(userid)
        .then((data)=>{
            //console.log(req,res,data);
            res.status(200).send({"notifications":data});
        })
        .catch((err)=>{console.log(err);})
    } else if(operationType==constants.LOGOUT){
        const userHash = body.userHash;
        userHashLib.deleteSession(userHash, constants.LC_ENDPOINT);
        res.status(200).send({"SessionDelete":true});
    }
    else if(operationType==constants.SUBMIT_HOURLY_PRODUCTION_REPORT){
        const userid = body.userid;
        const unit = body.unit;
        const productionAmount = body.productionAmount;
        const comment = body.comment;

        report.__insertProductionReportData(userid, unit, productionAmount, comment)
        .then((data)=>{
            notification.__notify(3, "Hourly production report has been submitted");
            notification.__notify(4, "Hourly production report has been submitted");

            res.status(200).send({"ReportId":data.insertId});
        })
        .catch((err)=>{
            throw err;
        });
    } 
}

async function login(req, res){
    const body = req.body;
    const username = body.username;
	const password = body.password;

    const data = await admin.__getUserData(username, password)

    if(data==undefined) res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
    else if(data[0].password==password){
        const x = await userHashLib.createSession(username+password, constants.SUPERVISOR_ENDPOINT);

        console.log("DEbug: hash="+x);
        res.status(200).send({"userHash": x, "authentication":"successful!", "nextPage":"supervisor-dashboard.html", "userInfo":data[0]});
    }
    else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
 
}

module.exports = {handlePostRequestToSupervisor}