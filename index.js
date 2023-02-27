const express = require("express");
const app = express();
const PORT = 1201;
const DEFAULT_ADMIN_PASSWORD = "stu458";

const mysql = require("mysql2");
let connection = null;

function serverHasStartedNotification(port){
    console.log("My server has started running in "+port);
}

// Log in:
// create database
// create user table
// create authenticate function

function connect(){
    connection = mysql.createConnection({
	host: "localhost",
	user: "abhidb",
	password:"admin",
	database:"userdb"
    });

    connection.connect();
    console.log("I have connected to database!");
}

function createDatabase(){
    if(connection==null){
	console.log("Connect to database first before creating database!");
	return false;
    }
    const sql_query = "CREATE DATABASE if not exists ALMS;";
    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;
	//console.log(results);
	console.log("Successfully created the database!");
    });
    return true;
}

function createUserTable(){
    if(connection==null){
	console.log("Connect to databse first!");
	return false;
    }

    const sql_query = `CREATE TABLE if not exists user(
userid int auto_increment primary key,
username varchar(50) NOT NULL,
password varchar(50) NOT NULL,
age int,
general_info varchar(300));`;

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;
	//console.log(results);
	console.log("user Table has been created successfully!");
    })

    return true;
}

function createNotificationTable(){
    if(connection==null){
	console.log("Connect to databse first!");
	return false;
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
    })

    return true;
}


function createAdminUser(){
    insertUserData("Admin", DEFAULT_ADMIN_PASSWORD, 21, "A daunty young man!");
}

function insertUserData(name, password, age, general_info){
    const sql_query = "INSERT into user(username, password, age, general_info) values('"+name+"', '"+password+"',"+age+", '"+general_info+"');";
    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;
	//console.log(results);
	console.log("Done inserting data for user "+name);
    });
}

function login(username, password){
    const mysql_query = "select username, password from user";
    let isValidCredential = false;

    connection.query(mysql_query, (err, results, fields)=>{
	if(err) throw err;
	for(let i=0; i<results.length; i++){
	    if(results[i].username===username && results[i].password===password){
		console.log(username+" successfully logged in!");
		isValidCredential = true;
		break;
	    }
	}
    });
    return isValidCredential;
}

function addUser(name, password, age, general_info){
    const sql_query = "INSERT into user(username, password, age, general_info) values('"+name+"', '"+password+"',"+age+", '"+general_info+"');";

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;

	//console.log(results);
	console.log("Admin has successfully added user "+name);
    })

    return 23; // return userId
}

function notify(userid, msg){
     const sql_query = "INSERT into notification(userid, message) values("+userid+", '"+msg+"');";

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;

	console.log("Notification has been sent successfully to user "+userid);
    })

    return true;
}

function viewRegisteredUsers(){
    const sql_query = "SELECT userid, username from user;";

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;

	console.log("Registered Users are:");
	for(let i=0; i<results.length; i++){
	    console.log(results[i].userid +": "+results[i].username);
	}
    });
    return true;
}

function deleteTable(tableName){
    const sql_query = "drop table "+tableName;

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;

	console.log(tableName + " table has been dropped!");
    })
    return true;
}

function viewNotifications(userid){
    const sql_query = "select message from notification where userid="+userid;

    connection.query(sql_query, (err, results, fields)=>{
	if(err) throw err;
	console.log("Notifications for user "+userid+":");
	console.log(results);
    });
    return true;
}


connect();
createDatabase();
deleteTable("user");
createUserTable();
createAdminUser(); 
let loginVal = login("Admin", "stu458"); // Two problems!
console.log("loginVal = "+loginVal);

addUser("Rahim Bakht", "123asd", 32, "A dead man.");
deleteTable("notification");
createNotificationTable();
viewRegisteredUsers();
notify(1, "Your account has been created!")
viewNotifications(1)
//editUserInfo();


// Assembly line
//createResourceTable()
//registerResource()
//viewRegisterResource()

//registerAssemblyLine()
//setLayout()
//useResource()
//removeResource()
//getLayout()


app.listen(1201, ()=>serverHasStartedNotification(PORT));
