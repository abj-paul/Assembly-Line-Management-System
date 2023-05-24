const db_service = require("./DatabaseService.js");
const connection = db_service.getDBConnection();

async function getLCAndTheirLines(){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT * FROM user LEFT JOIN assemblyLine on user.userid = assemblyLine.LCUserId where user.role = 'lineChief';";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getMachineAndAssemblyLineItIsAddedTo(){
    return new Promise((resolve, reject)=>{
        const sql_query = `
        SELECT distinct machine.machineId, machine.machineType, machine.machineModel, machine.otherInfo, machine.perHourProduction, assemblyLineLayout.assemblyLineId, assemblyLine.name FROM machine 
        LEFT OUTER JOIN assemblyLineLayout on machine.machineId = assemblyLineLayout.machineId
        LEFT OUTER JOIN assemblyLine on assemblyLineLayout.assemblyLineId = assemblyLine.assemblyLineId
        ;`;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getUnusedMachineList(){
    return new Promise((resolve, reject)=>{
        const sql_query = `
        select * from machine 
        where machineId not in (
            SELECT distinct machine.machineId from machine, assemblyLineLayout where machine.machineId = assemblyLineLayout.machineId
        );
        `;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getAssignedLineIdForLineChief(userId){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT * FROM user, assemblyLine WHERE user.userid = assemblyLine.LCUserId and user.userid="+userId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function get_assembly_line_layout_for_given_line_id(lineId){
    return new Promise((resolve, reject)=>{
        const sql_query = " SELECT distinct * FROM assemblyLineLayout, assemblyLine, machine where assemblyLine.assemblyLineId = assemblyLineLayout.assemblyLineId and machine.machineId = assemblyLineLayout.machineId and assemblyLine.assemblyLineId="+lineId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function request_resource(LCUserId, lineId, machineType, requestedMachineCount){
    const productionManagerUserId = await db_service.executeQuery("SELECT createdBy from assemblyLine where assemblyLineId="+lineId);
    const lineChiefName = await db_service.executeQuery("SELECT username from user where userId="+LCUserId);
    console.log("DEBUG->line chief name:");
    const lineNAme = await db_service.executeQuery("SELECT name from assemblyLine where assemblyLineId="+lineId);
    console.log("DEBUG->lineName:");
    let message = lineChiefName[0].username + " has requested "+requestedMachineCount + " " + machineType + " for "+lineNAme[0].name+" assembly line";

    console.log("DEBUG->Request Resource Msg: "+message);


    const sql_query = "INSERT INTO notification(userId, message) values("+productionManagerUserId[0].createdBy+",'"+message+"');";
    await db_service.executeQuery(sql_query);
}

async function setHourlyProductionTarget(productionId, lineId, hourlyProductionTarget){
    const sql_query = "UPDATE assemblyLineLayout SET hourlyTarget="+hourlyProductionTarget+" WHERE productionId="+productionId+" and assemblyLineId="+lineId;
    const reply = await db_service.executeQuery(sql_query);
    console.log("DEBUG->Hourly Production Target:");
    console.log(sql_query);
    console.log(reply);
    return "blah";
}

module.exports = {getLCAndTheirLines, getMachineAndAssemblyLineItIsAddedTo, getUnusedMachineList, getAssignedLineIdForLineChief, get_assembly_line_layout_for_given_line_id, request_resource, setHourlyProductionTarget}