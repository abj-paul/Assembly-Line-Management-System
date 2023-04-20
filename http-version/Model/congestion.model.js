const mysql = require("mysql2");
const notification = require("./notification.js");
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
    CONSTRAINT fk_machine FOREIGN KEY (machineId) REFERENCES machine(machineId)
    );`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Machine Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function initializeCongestionStatusForMachines(machineIdArr){
    
}


async function updateCongestionStatusForMachine(machineId, congestionStatus, comments){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into congestion(machineId, congestionStatus, comments) values("+machineId+",'"+congestionStatus+"','"+comments+"');";
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

