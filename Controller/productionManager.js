const constants = require("../constants.js");
const report = require("../report.js")
const admin = require("../admin.js");
const machine = require("../Model/machine.js");
const session = require("../Model/session.js");
const userHashLib = require("../Controller/userHash.js");
const notification = require("../Model/notification.js");

function handlePostRequestToProductionManager(req, res){
    const body = req.body;
    const userHash = body.userHash;
    const operationType = body.operation;

    if(operationType!=constants.LOGIN){
       session.__checkUserHashValidity(userHash, constants.PM_ENDPOINT)
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


    if(operationType==constants.LOGIN){
        login(req, res);
    }
    else if(operationType==constants.VIEW_HOURLY_PRODUCTION_REPORT){
        report.__viewProductionReport()
        .then((data)=>{
            res.status(200).send({"ProductionReport":data});
        })
        .catch((err)=>{
            throw err;
        });
    }else if(operationType==constants.REGISTER_MACHINE){
        const machineModel = body.machineModel;
	    const machineType = body.machineType;
        const otherInfo = body.otherInfo;
        const perHourProduction = body.perHourProduction;

        machine.registerMachine(machineModel, machineType, otherInfo, perHourProduction)
        .then((data)=>{
            res.status(200).send({"MachineRegistration":"successful", "MachineId":data.insertId});
        })
    }else if(operationType==constants.GET_MACHINE_LIST){
        machine.getMachineList()
        .then((data)=>{
            res.status(200).send({"MachineList":data});
        })
    } else if(operationType==constants.GET_NOTIFICATIONS){
        const userid = body.userid;
        notification.getNotifications(userid)
        .then((data)=>{
            //console.log(req,res,data);
            res.status(200).send({"notifications":data});
        })
        .catch((err)=>{console.log(err);})
    }
}

async function login(req, res){
    const body = req.body;
    const username = body.username;
	const password = body.password;

    const data = await admin.__getUserData(username, password)

    if(data==undefined) res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
    else if(data[0].password==password){
        const x = await userHashLib.createSession(username+password, constants.PM_ENDPOINT);

        console.log("DEbug: hash="+x);
        res.status(200).send({"userHash": x, "authentication":"successful!", "nextPage":"production-manager-dashboard.html", "userInfo":data[0]});
    }
    else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
 
}

module.exports = {handlePostRequestToProductionManager}