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

async function createTable(table_name, sql_query){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log(table_name+" Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function insertData(sql_query){
    return new Promise((resolve, reject)=>{
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getData(sql_query){
    return new Promise((resolve, reject)=>{
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }

            resolve(results); // results is an array of row-objects. e.g. results[i].machineModel         
        });
    }
    );
}

function getDBConnection(){
    if(connection==null) __connect();
    return connection;
}

module.exports = { getDBConnection, createTable, insertData, getData}