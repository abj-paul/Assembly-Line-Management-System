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

async function __createProductionTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists production(
    productionId int auto_increment primary key,
    timeSent datetime DEFAULT CURRENT_TIMESTAMP,
    totalProductionTarget int NOT NULL,
    productName varchar(300) NOT NULL,
    viewerInfo varchar(300));`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Machine Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function startNewProduction(productName, totalProductionTarget){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into production(productName, totalProductionTarget) values('"+productName+"',"+totalProductionTarget+");";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("DEBUG: Start new production, after insertion:\n"+results);
            notification.__notify(2, "New Production for the product ");
            resolve(results);
        });
    }
    );
}

async function getProductionInfo(){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from production;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function setViewerInfo(productionId, viewerInfo){
    const sql_query = "UPDATE production SET viewerInfo = '"+ viewerInfo +"' WHERE productionId = "+productionId; 
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from production;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

module.exports = { __createProductionTable, getProductionInfo, startNewProduction, setViewerInfo}