const constants = require("../constants.js");
const report = require("../Model/hourly-production-report.model.js")
const admin = require("../admin.js");
const machine = require("../Model/machine.js");
const session = require("../Model/session.js");
const userHashLib = require("../Controller/userHash.js");
const notification = require("../Model/notification.js");
const assemblyLine = require("../Model/assembly-line-layoud.model.js");
const miscDb = require("../Model/miscellaneous.js");
const combinationQuery = require("../Model/combinations.query.js");
const qualityService = require("../Model/quality-report.model.js");



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
        const productionId = body.productionId;

        console.log("DEBUG->Supervisor->hourlyreport: "+productionId);

        report.__insertProductionReportData(userid, productionId, unit, productionAmount, comment)
        .then((data)=>{
            notification.__notify(3, "Hourly production report has been submitted");

            res.status(200).send({"ReportId":data.insertId});
        })
        .catch((err)=>{
            throw err;
        });
    }else if(operationType == constants.GET_PRODUCTION_ID_FOR_USER){
        const userId = body.userId;
        console.log("DEBUG: GPIFU triggered!");
        miscDb.getProductionIdForSupervisor(userId)
        .then((data)=>{
            res.status(200).send({"ProductionId": data});
        })    
    }else if(operationType==constants.GET_ASSIGNED_LINE_ID){
        const userId = body.userid;
        combinationQuery.getAssignedLineIdForSupervisor(userId)
        .then((data)=>{
            console.log("DEBUG: AssignedAssemblyLineId to Supervisor: ");
            //console.log(data[0].assemblyLineId);
            res.status(200).send({"AssignedAssemblyLineId": data[0].assemblyLineId});
        })
    }else if(operationType==constants.GET_LAYOUT_FOR_GIVEN_LINEID){
        const lineId = body.lineId;
        combinationQuery.get_assembly_line_layout_for_given_line_id(lineId)
        .then((data)=>{
            console.log("DEBUG: Layout for "+lineId);
            console.log(data);
            res.status(200).send({"Layout": data});
        })
    }else if(operationType==constants.MARK_WORK_STATION){
        const machineId = body.machineId;
        const markStatus = body.markStatus;

        miscDb.handleWorkstationMarking(machineId, markStatus)
        .then((data)=>{
            res.status(200).send({"Status": "Successfully marked machine "+machineId});
        })
    }else if(operationType==constants.SUBMIT_QUALITY_REPORT){
        const userid = body.userid;
        const unit = body.unit;
        const defectedProductCount = body.DefectedProductCount;
        const goodProductCount = body.TotalProductCount - defectedProductCount;
        const comment = body.comment;
        
        qualityService.__insertQualityReportData(userid, unit, defectedProductCount, goodProductCount, comment)
        .then((data)=>{
            res.send({"Status":data.insertId});
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
        const x = await userHashLib.createSession(username+password, constants.SUPERVISOR_ENDPOINT);

        console.log("DEbug: hash="+x);
        res.status(200).send({"userHash": x, "authentication":"successful!", "nextPage":"supervisor-dashboard.html", "userInfo":data[0]});
    }
    else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
 
}

module.exports = { handlePostRequestToSupervisor }