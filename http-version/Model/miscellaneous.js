const db_service = require("./DatabaseService.js");

async function getProductionIdForAdmin(userId){
    return 1;
}

function getProductionIdForPM(pmUserId){
    return new Promise((resolve, reject)=>{
        const sql_query = " select distinct productionId from assemblyLine, assemblyLineLayout where assemblyLine.assemblyLineId = assemblyLineLayout.assemblyLineId AND assemblyLine.createdBy="+pmUserId;

        const connection = db_service.getDBConnection();

        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("DEBUG: Get pruductionID: "+results[0].productionId);
            resolve(results[0].productionId);
        });
    }
    );
}

async function getProductionIdForLC(lcUserId){
    return new Promise((resolve, reject)=>{
        const sql_query = " select distinct productionId from assemblyLine, assemblyLineLayout where assemblyLine.assemblyLineId = assemblyLineLayout.assemblyLineId AND assemblyLine.LCUserId="+lcUserId;

        console.log("DEBUG->get production id for lc  "+lcUserId);
        console.log(sql_query);

        const connection = db_service.getDBConnection();

        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("DEBUG: Get pruductionID: "+results[0].productionId);
            resolve(results[0].productionId);
        });
    }
    );
}

async function getProductionIdForSupervisor(supervisorUserId){
    return 1; // TODO
}

module.exports = {getProductionIdForPM, getProductionIdForLC}