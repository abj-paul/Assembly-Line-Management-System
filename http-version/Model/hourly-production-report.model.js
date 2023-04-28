const mysql = require("mysql2");

let connection = null;

//admin.startDatabase();

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

async function __createProductionReportTable(){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = `CREATE TABLE if not exists productionReport(
        reportId int auto_increment primary key,
        userid int NOT NULL,
        productionId int,
        productionAmount int NOT NULL,
        unit varchar(50) NOT NULL,
        timeSent datetime DEFAULT CURRENT_TIMESTAMP,
        comment varchar(300),
        CONSTRAINT fk_production FOREIGN KEY (productionId) REFERENCES production(productionId),
        CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES user(userid)
        ON DELETE CASCADE
        );`; // Find username through relational query
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log("productionReport Table has been created successfully!");
                resolve(true);
            })
    });
    
}

async function __insertProductionReportData(userid, unit, productionAmount, comment){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into productionReport(userid, unit, productionAmount, comment) values('"+userid+"', '"+unit+"',"+productionAmount+", '"+comment+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("Done inserting production report by user "+userid);
            resolve(results);
        });
    }
    );
}

function __viewProductionReport(){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT *  from productionReport;";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            let reports = [];
            for(let i=0; i<results.length; i++){
                //console.log(results[i].userid +": "+results[i].username);
                reports.push([results[i].reportId, results[i].timeSent, results[i].productionAmount, results[i].unit, results[i].comment]);
            }
            resolve(reports);
        });
    });
}


module.exports = {__createProductionReportTable, __insertProductionReportData, __viewProductionReport, __connect}
