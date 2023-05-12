const constants = require("../constants.js");
const assemblyLine = require("../Model/assembly-line-layoud.model.js");
const notifications = require("../Model/notification.js");

function handlePostRequestToLayoutViaPM(req, res){
     __serveRequest(req, res);
}

function __serveRequest(req, res){
    const body = req.body;
    const operationType = body.operation;


    if(operationType==constants.GET_ASSEMBLY_LINE_LAYOUT){
        const assemblyLineId = body.assemblyLineId;
        assemblyLine.getAssemblyLineLayout(assemblyLineId)
        .then((data)=>{
            console.log("DEBUG: Layout="+data);
            res.status(200).send({"Layout": data});
        })
        .catch((err)=>{console.log(err);});

    }else if(operationType==constants.SAVE_ASSEMBLY_LINE_LAYOUT){
        const assemblyLineId = body.assemblyLineId;
        const layoutArr = body.layoutArr;

        assemblyLine.assignLC(assemblyLineId, body.LCUserId);
        assemblyLine.saveAssemblyLineLayout(assemblyLineId, layoutArr)
        .then((data)=>{
            console.log("DEBUG: After saving assembly line-"+data);
            res.status(200).send({"SaveOperation": data});
            notifications.__notify(body.LCUserId, "PM has set the layout for assembly line "+assemblyLineId);
        });
    }else if(operationType==constants.GET_ASSEMBLY_LINE_LIST_FOR_PRODUCTIONID){
        
    }
}


module.exports = {handlePostRequestToLayoutViaPM}