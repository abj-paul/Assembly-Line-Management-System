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

    //await __createAdminUser();
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
    pic varchar(100),
    general_info varchar(300))
    ;`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("user Table has been created successfully!");
            resolve(true);
        })
    });
    
}


async function __insertUserData(name, password, age, role, pic, general_info){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into user(username, password, age, role, pic, general_info) values('"+name+"', '"+password+"',"+age+", '"+role+"', '"+pic+"', '"+general_info+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }else{
		console.log("Done registering data for user "+name+". His image data is +"+pic);
		notification.__notify(results.insertId, "Your account has been created by Admin");
		resolve(results);
	    }
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

async function saveProfilePicture(userId, imageName){
    console.log("DEBUG save image name: "+userId +", "+imageName);
    return new Promise((resolve, reject)=>{
        const sql_query = "UPDATE user SET pic='"+imageName+"' where userId="+userId;
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function getProfilePicture(userId){
    return new Promise((resolve, reject)=>{
        const sql_query = "select pic from user where userId="+userId;
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
    await __createUserTable();

    const adminIdPromise = await __insertUserData("Admin", DEFAULT_ADMIN_PASSWORD, 21, "Admin", "1684754460520.jpeg", "The admin of ALMS system!");

    //console.log(adminIdPromise.insertId);
    //.__notify(adminIdPromise.insertId, "Admin account has been created!")
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
                users.push([results[i].userid, results[i].username, results[i].role, results[i].general_info, results[i].age, results[i].pic]);
            }
            resolve(users);
        });
    });
}

function __deleteEntry(userid){
    return new Promise((resolve, reject)=>{
        const sql_query = "DELETE from user where userid="+userid;

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
	    console.log(userid+" userid has been deleted!");
            resolve(true);
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
        const sql_query = "select distinct * from production, productionReport, assemblyLineLayout, machine, congestion,  assemblyLine, supervisorLineRelationship, user, notification where production.productionId=productionReport.productionId AND assemblyLineLayout.productionId=production.productionId AND machine.machineId=assemblyLineLayout.machineId AND congestion.machineId=machine.machineId AND assemblyLine.assemblyLineId=assemblyLineLayout.assemblyLineId AND supervisorLineRelationship.assemblyLineId=assemblyLine.assemblyLineId AND user.userId=supervisorLineRelationship.userId AND notification.userId=user.userId;";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(results);
        });
    });
}

function saveImage(req, res){
    console.log("File saved:", req.file);
    console.log("Extra data:", req.body.userId);
  
    // save image in db
    saveProfilePicture(req.body.userId, req.file.filename);
    res.status(200).json({ message: "Image uploaded successfully" });
}

function getImage(req, res){
    getProfilePicture(req.body.userId)
    .then((picName)=>{
        console.log("DEBUG image: " +picName[0].pic);
        res.status(200).send({ "ProfilePictureName" : picName[0].pic });
    })
}

async function getAvailableLineChiefs(){
    return new Promise((resolve, reject)=>{
        const sql_query = "select userId, username from user where userid not in (select LCUserId from assemblyLine) AND role='lineChief';";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(results);
        });
    });
}

// Admin login, Register new user, view existing user, delete existing user, edit user data, view his notification
module.exports = {startDatabase, viewRegisteredUsers, __viewRegisteredUsers, __insertUserData, __deleteTable, __viewAllTableData, __getUserData, __deleteEntry , __createAdminUser, saveProfilePicture, getProfilePicture, saveImage, getImage, getAvailableLineChiefs}
