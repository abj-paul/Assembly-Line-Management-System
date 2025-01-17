const constants = require("../constants.js");
const viewer = require("../Model/viewer.model.js");
const session = require("../Model/session.js");
const userHashLib = require("../Controller/userHash.js");
const admin = require("../admin.js");
const report = require("../Model/hourly-production-report.model.js");




function handlePostRequestToViewer(req, res){
    const body = req.body;
    const userHash = body.userHash;
    const operationType = body.operation;

    
    if(operationType!=constants.LOGIN){
       session.__checkEndpointIndependentSessionValidity(userHash)
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
    else if(operationType==constants.GET_GENERAL_PRODUCTION_INFO){
        viewer.getGeneralProductionInfo()
        .then((data)=>{
            res.status(200).send({"GeneralProductionInfo":data});
        })
    }else if(operationType == constants.GET_ASSEMBLY_LINE_LIST){
        const productionId = body.productionId;
        viewer.getLineListForProduction(productionId)
        .then((data)=>{
            res.status(200).send({"AssemblyLineList":data});
        })
    }else if(operationType == constants.GET_LAYOUT_FOR_GIVEN_LINEID){
        const lineId = body.lineId;
        viewer.getLineLayout(lineId)
        .then((data)=>{
            res.status(200).send({"LineLayout":data});
        })
    }else if(operationType==constants.GENERATE_PRODUCTION_REPORT){
        viewer.generate_production_report()
        .then((generatedPdfFileName)=>{
            res.status(200).send({"GeneratedPdfFileName":generatedPdfFileName});
        })
    }else if(operationType==constants.LOGOUT){
        const userHash = body.userHash;
        userHashLib.deleteSession(userHash, constants.LC_ENDPOINT);
        res.status(200).send({"SessionDelete":true});
    }else if(operationType==constants.GENERATE_SYSTEM_START_MEMO){
        const generatedPdfFileName = viewer.generate_system_start_memo();
        res.status(200).send({"GeneratedPdfFileName":generatedPdfFileName});
    }else if(operationType==constants.GET_QUALITY_REPORTS){

        viewer.getQualityReports()
        .then((data)=>{
            res.send({"QualityReports":data});
        })
    }else if(operationType==constants.VIEW_HOURLY_PRODUCTION_REPORT){
        report.__viewProductionReport()
        .then((data)=>{
            res.status(200).send({"ProductionReport":data});
        })
        .catch((err)=>{
            throw err;
        });
    }else if(operationType == constants.VIEW_ASSEMBLY_LINE_ISSUES_REPORT){

        viewer.getCongestionIssuesReports()
        .then((data)=>{
            res.send({"CongestionIssues":data});
        })
    }else if(operationType == constants.GENERATE_QUALITY_REPORT){
        viewer.generate_quality_report()
        .then((data)=>{
            res.status(200).send({"GeneratedPdfFileName":data});
        })
    }else if(operationType == constants.GENERATE_ISSUES_REPORT){
        viewer.generate_assembly_line_issues_report()
        .then((data)=>{
            res.status(200).send({"GeneratedPdfFileName":data});
        })
    }else if(operationType == constants.GENERATE_SINGLE_HOURLY_PRODUCTION_MEMO){
        const reportId = body.reportId;
        viewer.generate_single_hourly_production_report(reportId)
        .then((data)=>{
            res.status(200).send({"GeneratedPdfFileName":data});
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
        res.status(200).send({"userHash": x, "authentication":"successful!", "nextPage":"viewer", "userInfo":data[0]});
    }
    else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
 
}

module.exports = { handlePostRequestToViewer }