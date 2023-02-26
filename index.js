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
	console.log(results);
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
	console.log(results);
	console.log("user Table has been created successfully!");
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
	console.log(results);
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

	return isValidCredential;
    });
}

connect();
createDatabase();
createUserTable();
createAdminUser(); 
let loginVal = login("Admin", "stu458"); // Two problems!
console.log("loginVal = "+loginVal);
app.listen(1201, ()=>serverHasStartedNotification(PORT));
