const constants = require("../constants.js");
const report = require("../report.js")
const admin = require("../admin.js");
const machine = require("../Model/machine.js");

function handlePostRequestToProductionManager(req, res){
    const body = req.body;
    const operationType = body.operation;


    if(operationType==constants.LOGIN){
        const username = body.username;
	    const password = body.password;

        admin.__getUserData(username, password)
        .then((data)=>{
            
            if(data==undefined) res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});
            else if(data[0].password==password)
                res.status(200).send({"authentication":"successful!", "nextPage":"pm/production-manager-dashboard.html", "userInfo":data[0]});
            else res.status(200).send({"authentication":"unsuccessful!", "nextPage":"none"});

        })  
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
    }
}

module.exports = {handlePostRequestToProductionManager}