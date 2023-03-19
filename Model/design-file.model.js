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

async function __createDesignTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists production(
    pieceId int auto_increment primary key,
    productionId int,
    pieceName varchar(300),
    machineTypeRequired varchar(300),
    numOfMachinesRequired int,
    CONSTRAINT fk_production FOREIGN KEY (productionId) REFERENCES production(productionId)
    );`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Machine Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function uploadProductDesign(productionId, pieceName, machineTypeRequired, numOfMachinesRequired){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into design(productionId, pieceName, machineTypeRequired, numOfMachinesRequired) values("+productionId+",'"+pieceName+"','"+machineTypeRequired+"',"+numOfMachinesRequired+");";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getProductDesign(){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from design;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

module.exports = { __createDesignTable, uploadProductDesign, getProductDesign}