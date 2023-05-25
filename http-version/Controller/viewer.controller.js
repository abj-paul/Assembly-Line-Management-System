const constants = require("../constants.js");
const viewer = require("../Model/viewer.model.js");
const session = require("../Model/session.js");
const userHashLib = require("../Controller/userHash.js");
const admin = require("../admin.js");




function handlePostRequestToViewer(req, res){
    const body = req.body;
    const userHash = body.userHash;
    const operationType = body.operation;

    /*
    if(operationType!=constants.LOGIN){
       session.__checkUserHashValidity(userHash, constants.SUPERVISOR_ENDPOINT)
        .then((data)=>{
            //console.log("Access Control - "+data);
            if(data==constants.VALID_USER_HASH) __serveRequest(req,res);
            else res.send({"Authentication":constants.INVALID_USER_HASH});
        })
    }

    else*/ __serveRequest(req, res);
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