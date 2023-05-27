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

async function __createQualityReportTable(){
    await __connect();
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = `CREATE TABLE if not exists qualityReport(
        qualityReportId int auto_increment primary key,
        userid int NOT NULL,
        productionId int,
        defectedProductCount int NOT NULL,
        goodProductCount int NOT NULL,
        unit varchar(50) NOT NULL,
        timeSent datetime DEFAULT CURRENT_TIMESTAMP,
        comment varchar(300),
        CONSTRAINT fk_production_quality_report FOREIGN KEY (productionId) REFERENCES production(productionId),
        CONSTRAINT fk_user_quality_report FOREIGN KEY (userid) REFERENCES user(userid)
        ON DELETE CASCADE
        );`; // Find username through relational query
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log("qualityReport Table has been created successfully!");
                resolve(true);
            })
    });
    
}

async function __insertQualityReportData(userid,productionId, unit, defectedProductCount,goodProductCount, comment){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into qualityReport(userid,productionId, unit, defectedProductCount,goodProductCount, comment) values("+userid+", "+productionId+", '"+unit+"',"+defectedProductCount+","+goodProductCount+",'"+comment+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            console.log("Done inserting quality report by user "+userid);
            resolve(results);
        });
    }
    );
}

function __viewAllQualitynReport(){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT *  from qualityReport;";

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            resolve(results);
        });
    });
}


module.exports = {__createQualityReportTable, __insertQualityReportData, __viewAllQualitynReport, __connect}
