const mysql = require("mysql2");
let connection = null;
const DEFAULT_ADMIN_PASSWORD = "stu458";

const notification = require("./Model/notification.js");
const machine = require("./Model/machine.js")

function startDatabase(){
    __startDatabase();
}

function viewRegisteredUsers(){
    __viewRegisteredUsers().then((data)=>{
        console.log(data[0]);
    })
}

async function __startDatabase(){
    await __connect();
    await __createDatabase();
    await __createUserTable();
    await notification.__createNotificationTable();
    await machine.__createMachineTable();

    await __createAdminUser();
}

async function __connect(){
    return new Promise((resolve, reject)=>{
        connection = mysql.createConnection({
            host: "localhost",
            user: "abhidb",
            password:"admin",
            database:"ALMS"
            });
        
            connection.connect();
            console.log("I have connected to database!");
            resolve(true);
    });
}

async function __createDatabase(){
    return new Promise( (resolve, reject) =>{
        if(connection==null){
            console.log("Connect to database first before creating database!");
            reject(false);
        }
        const sql_query = "CREATE DATABASE if not exists ALMS;";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            console.log("Successfully created the database!");
            resolve(true);
            }
        );
    }
    );
}

async function __createUserTable(){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists user(
    userid int auto_increment primary key,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    age int,
    role varchar(50) NOT NULL,
    general_info varchar(300));`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("user Table has been created successfully!");
            resolve(true);
        })
    });
    
}



async function __insertUserData(name, password, age, role, general_info){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into user(username, password, age, role, general_info) values('"+name+"', '"+password+"',"+age+", '"+role+"', '"+general_info+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("Done inserting data for user "+name);
            notification.__notify(results.insertId, "Your account has been created by Admin");
            resolve(results);
        });
    }
    );
}

async function __getUserData(name, password){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from user where username='"+name+"';";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}


async function __createAdminUser(){
    const adminIdPromise = await __insertUserData("Admin", DEFAULT_ADMIN_PASSWORD, 21, "Admin", "A daunty young man!");

    //console.log(adminIdPromise.insertId);
    //notification.__notify(adminIdPromise.insertId, "Admin account has been created!")
    return adminIdPromise.insertId;
}

function __viewRegisteredUsers(){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT * from user;";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            let users = [];
            console.log("Registered Users are:");
            for(let i=0; i<results.length; i++){
                //console.log(results[i].userid +": "+results[i].username);
                users.push([results[i].userid, results[i].username, results[i].role, results[i].general_info]);
            }
            resolve(users);
        });
    });
}


function __deleteTable(tableName){
    const sql_query = "drop table "+tableName;

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;

	console.log(tableName + " table has been dropped!");
    })
    return true;
}

function __viewAllTableData(){
    return new Promise((resolve, reject)=>{
        const sql_query = "select * from notification, user where notification.userid=user.userid;";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(results);
        });
    });
}

// Admin login, Register new user, view existing user, delete existing user, edit user data, view his notification
module.exports = {startDatabase, viewRegisteredUsers, __viewRegisteredUsers, __insertUserData, __deleteTable, __viewAllTableData, __getUserData}
