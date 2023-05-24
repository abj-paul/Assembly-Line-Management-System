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
            if(results.length>0){
                console.log("DEBUG: Get pruductionID: "+results[0].productionId);
                resolve(results[0].productionId);
            }else resolve([{"productionId":1}]);
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
 return new Promise((resolve, reject)=>{
        const sql_query = " select distinct productionId from assemblyLineLayout, supervisorLineRelationship where assemblyLineLayout.assemblyLineId=supervisorLineRelationship.assemblyLineId and supervisorLineRelationship.userId="+supervisorUserId;

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
    );}

async function assignSupervisorToLine(userId, assemblyLineId){
    let sql_query = `CREATE TABLE IF NOT EXISTS supervisorLineRelationship(
        pkId int AUTO_INCREMENT PRIMARY KEY,
        assemblyLineId int,
        userId int,
        comments varchar(300),
        CONSTRAINT fk_user_relationship_userId FOREIGN KEY (userid) REFERENCES user(userid),
        CONSTRAINT fk_assemblyLine_relationship_assemblyLineId FOREIGN KEY (assemblyLineId) REFERENCES assemblyLine(assemblyLineId)
        ON DELETE CASCADE
    )`;

    await db_service.executeQuery(sql_query);

    sql_query = "INSERT INTO supervisorLineRelationship(assemblyLineId, userId) values("+assemblyLineId+", "+userId+");";
    await db_service.executeQuery(sql_query);
    return "blah";
}

async function handleWorkstationMarking(machineId, markStatus){
    const sql_query = "UPDATE congestion SET markedStatus="+markStatus+" where machineId="+machineId;
    await db_service.executeQuery(sql_query);
}

module.exports = {getProductionIdForPM, getProductionIdForLC, assignSupervisorToLine, getProductionIdForSupervisor, handleWorkstationMarking}