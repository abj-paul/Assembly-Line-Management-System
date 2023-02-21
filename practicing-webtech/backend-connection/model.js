// Connecting Database
const mysql = require("mysql2");

let connection = null;

function createDatabase(){
	if(connection==null) return {"status":"Connect to mysql service first!"};
	query = "CREATE DATABASE if not exists userdb";
	connection.query(query, (err, result, fields)=>{
		if(err) throw err;
		console.log("Successfully created the database.");
	});
}

function connect(){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'abhidb',
		password: 'admin',
		database: 'userdb'
	});
	connection.connect();
	console.log("I have successfully connected to database!");
}


function testConnection(){
	const query = "SELECT 1+1 AS solution";
	connection.query(query, (err, result, fields)=>{
		if(err) throw err;
		console.log("The solution is: ",result[0].solution);
	});
}


function createUserTable(){
	query = `create table if not exists User (
		userid int auto_increment primary key,
		username varchar(50) NOT null,
		password varchar(50) NOT null,
		age int
	);`
	connection.query(query, (err, result, fields) => {
		if(err) throw err;
		console.log(result);
	});
	console.log("User table has been created!");
}


function insertData(name, age, password){
	query = "INSERT INTO User (username, age, password) values ('"+name+"',"+age+",'"+password+"')";
	connection.query(query, (err, result, fields) => {
		if(err) throw err;
		console.log(result);
	});
	console.log("Successfully inserted data for user "+name);
}

function getDataForUser(userid){
	query = "select * from User where userid="+userid;
	connection.query(query, (err, result, fields) => {
		if(err) throw err;
		console.log(result);
	});
	console.log("Successfully fetched data for user "+userid);
	return result;
}

function authenticate(name, password){
	var ok = false;
	query = "select * from User;";
	connection.query(query, (err, result, fields) => {
		if(err) throw err;

		for(let i=0; i<result.length; i++){
			if (result[i].username==name && result[i].password==password){
				console.log("Valid credentials for user "+result[i].userid);
				//return result[i];
				ok = true;
				break;
			}
		}

		if(!ok)console.log("Invalid credentials! ");
	});
	return ok;
}

module.exports = { createUserTable, connect, insertData, getDataForUser, authenticate, createDatabase }
