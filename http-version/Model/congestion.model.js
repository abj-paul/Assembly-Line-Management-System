const mysql = require("mysql2");
const notification = require("./notification.js");
const machine = require("./machine.js");
let connection = null;

async function __connect(){
    return new Promise((resolve, reject)=>{
        connection = mysql.createConnection({
            host: "localhost",
            user: "abhidb",
            password:"admin",
            database:"ALMS"
            });
        
            connection.connect();
            console.log("yay, production.model.js have connected to database!");
            resolve(true);
    });
}

async function __createCongestionTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists congestion(
    congestionId int auto_increment primary key,
    machineId int,
    timeRecorded datetime DEFAULT CURRENT_TIMESTAMP,
    congestionStatus varchar(300),
    comments varchar(300),
    CONSTRAINT fk_congestion_machine_machineId FOREIGN KEY (machineId) REFERENCES machine(machineId)
    );`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Congestion Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function initializeCongestionStatusForMachines(){
    await __createCongestionTable();

    let row = await getAllCongestionStatus();
    if(row.length==0){
        machine.getMachineIdArr()
        .then((machineIdArr)=>{
            for(let i=0; i<machineIdArr.length; i++) __insertCongestionData(machineIdArr[i], '0', 'No comments on machine '+machineIdArr[i]);
        })
    }
}

async function __insertCongestionData(machineId, congestionStatus, comments){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT INTO congestion(machineId, congestionStatus, comments) values (+"+machineId+", '"+congestionStatus+"', '"+comments+"');";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function updateCongestionStatusForMachine(machineId, congestionStatus, comments){
    return new Promise((resolve, reject)=>{
        const sql_query = "UPDATE congestion SET congestionStatus='"+congestionStatus+"', comments='"+comments+"' where machineId="+machineId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getCongestionStatusForMachine(machineId){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from congestion where machineId="+machineId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getAllCongestionStatus(){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from congestion;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function checkAndNotifyCongestion(){

}

module.exports = { initializeCongestionStatusForMachines, updateCongestionStatusForMachine, getAllCongestionStatus, getCongestionStatusForMachine, checkAndNotifyCongestion}