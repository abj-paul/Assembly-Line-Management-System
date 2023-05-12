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
            console.log("yay, resource.js have connected to database!");
            resolve(true);
    });
}

async function __createMachineTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists machine(
    machineId int auto_increment primary key,
    machineModel varchar(50) NOT NULL,
    machineType varchar(50) NOT NULL,
    perHourProduction int NOT NULL,
    otherInfo varchar(300)
    );`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Machine Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function registerMachine(machineModel, machineType, otherInfo, perHourProduction){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into machine(machineModel, machineType, otherInfo, perHourProduction) values('"+machineModel+"', '"+machineType+"', '"+otherInfo+"', "+perHourProduction+");";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            //TODO: Notify Supervisor,LC on new machine addition.
            //notification.__notify(, "");
            resolve(results);
        });
    }
    );
}

async function getMachineList(machineModel, machineType, otherInfo){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from machine;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            let machines = []
            for(let i=0; i<results.length; i++){
                machines.push([results[i].machineModel, results[i].machineType, results[i].otherInfo, results[i].perHourProduction, results[i].machineId])
            }
            resolve(machines);
        });
    }
    );
}

async function update_machine_info(machineId, machineModel, machineType, otherInfo, perHourProduction){
    return new Promise((resolve, reject)=>{
        const sql_query = "UPDATE machine SET machineModel='"+machineModel+"', machineType='"+machineType+"', otherInfo='"+otherInfo+"', perHourProduction="+perHourProduction+" where machineId="+machineId+";";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function delete_machine(machineId){
    return new Promise((resolve, reject)=>{
        const sql_query = "DELETE FROM machine where machineId="+machineId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}


module.exports = { __createMachineTable, registerMachine, getMachineList, update_machine_info, delete_machine}