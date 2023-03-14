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
            console.log("yay, Report.js have connected to database!");
            resolve(true);
    });
}

async function updateUserData(userid, username, password, age, role, general_info){

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = "UPDATE user SET username = '"+ username +"',password = '"+password+"', age = "+age+", role = '"+role+"', general_info = '"+general_info+"' WHERE userid = "+userid+";"; 
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log("User Data has been updated successfully!");
                notification.__notify(userid, "Your account information has been updated by admin.")
                resolve(true);
            })
    });
    
}

module.exports = {updateUserData, __connect}