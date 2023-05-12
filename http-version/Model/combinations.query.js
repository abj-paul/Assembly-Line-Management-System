const db_service = require("./DatabaseService.js");
const connection = db_service.getDBConnection();

async function getLCAndTheirLines(){
    return new Promise((resolve, reject)=>{
        const sql_query = "SELECT * FROM user LEFT JOIN assemblyLine on user.userid = assemblyLine.LCUserId where user.role = 'lineChief';";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

module.exports = {getLCAndTheirLines}