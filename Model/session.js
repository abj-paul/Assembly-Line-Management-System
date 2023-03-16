const mysql = require("mysql2");
const constants = require("../constants.js");
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
            console.log("yay, session.js have connected to database!");
            resolve(true);
    });
}

async function __createSessionTable(){
    await __connect();
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = `CREATE TABLE if not exists session(
        sessionId int auto_increment primary key,
        endpoint varchar(50) NOT NULL,
        startTime datetime DEFAULT CURRENT_TIMESTAMP,
        userHash varchar(300));`;
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                console.log("session Table has been created successfully!");
                resolve(results);
            })
    });
    
}

async function __insertDataIntoSessionTable(userHash, endpoint){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into session(endpoint, userHash) values('"+endpoint+"', '"+userHash+"');";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(userHash);
            console.log("Session has been created successfully fir user "+userHash);
        })
    })

}

async function __checkUserHashValidity(userHash, endpoint){

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = "select * from session where userhash='"+userHash+"' and endpoint='"+endpoint+"';"; 
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;

                if(results.length!=0) resolve(constants.VALID_USER_HASH);
                else resolve(constants.INVALID_USER_HASH);
            })
    });
    
}

async function __deleteRowFromTable(userHash, endpoint){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
        const sql_query = "delete from session where userhash='"+userHash+"' and endpoint='"+endpoint+"';"; 
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;

            if(results.length!=0) resolve("VALID_USER_HASH");
            else resolve("INVALID_USER_HASH");
        })
    });
    
}

module.exports = {__insertDataIntoSessionTable, __checkUserHashValidity, __createSessionTable, __deleteRowFromTable}