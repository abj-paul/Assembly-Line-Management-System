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




module.exports = {getLCAndTheirLines, getMachineAndAssemblyLineItIsAddedTo, getUnusedMachineList, getAssignedLineIdForLineChief, get_assembly_line_layout_for_given_line_id}