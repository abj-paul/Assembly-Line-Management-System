const mysql = require("mysql2");
let connection = null;
const DEFAULT_ADMIN_PASSWORD = "stu458";

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
    await __createNotificationTable();

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

async function __createNotificationTable(){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = `CREATE TABLE if not exists notification(
        notificationId int auto_increment primary key,
        userid varchar(50) NOT NULL,
        timeSent datetime DEFAULT CURRENT_TIMESTAMP,
        message varchar(300));`; // Find username through relational query
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log("notification Table has been created successfully!");
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
    const adminIdPromise = await __insertUserData("Mr Rahim", DEFAULT_ADMIN_PASSWORD, 21, "Admin", "A daunty young man!");

    //console.log(adminIdPromise.insertId);
    __notify(adminIdPromise.insertId, "Admin account has been created!")
    return adminIdPromise.insertId;
}

function __notify(userid, msg){
    const sql_query = "INSERT into notification(userid, message) values("+userid+", '"+msg+"');";

    connection.query(sql_query, (err, results, fields)=>{
        if(err) throw err;
        console.log("Notification has been sent successfully to user "+userid);
    })
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


function __viewNotifications(userid){
    return new Promise((resolve, reject)=>{
        const sql_query = "select message from notification where userid="+userid;

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(results);
        });
    });
}

function viewNotifications(userid){
    __viewNotifications(userid)
    .then((data)=>{
        console.log("Notifications for user "+userid+":");
        console.log(data);
    })
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
module.exports = {startDatabase, viewRegisteredUsers, viewNotifications, __viewRegisteredUsers, __insertUserData, __deleteTable, __viewAllTableData, __notify, __getUserData}
