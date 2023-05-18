const mysql = require("mysql2");
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
            console.log("yay, notification.js have connected to database!");
            resolve(true);
    });
}

async function getNotifications(userid){

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = "select * from notification where userid="+userid; 
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                let notifications = []
                for(let i=0; i<results.length; i++){
                    notifications.push([results[i].timeSent, results[i].message])
                }
                resolve(notifications);
            })
    });
    
}

async function __notify(userid, msg){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
        const sql_query = "INSERT into notification(userid, message) values("+userid+", '"+msg+"');";
        
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            console.log("Notification has been sent successfully to user "+userid);
        })
    });
}

async function __createNotificationTable(){
    await __connect();
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = `CREATE TABLE if not exists notification(
        notificationId int auto_increment primary key,
        userid int NOT NULL,
        timeSent datetime DEFAULT CURRENT_TIMESTAMP,
        message varchar(300),
        CONSTRAINT fk_user_notification FOREIGN KEY (userid) REFERENCES user(userid)
        ON DELETE CASCADE
        );`; // Find username through relational query
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log("notification Table has been created successfully!");
                resolve(true);
            })
    });
    
}

module.exports = {getNotifications, __connect, __createNotificationTable, __notify}
