const db_service = require("./DatabaseService.js");
const notification = require("./notification.js");

async function create_assembly_line_issues_report_table(){
    const sql_query = `
        CREATE TABLE IF NOT EXISTS assemblyLineIssuesReport(
            assemblyLineIssuesId int auto_increment primary key,
            userid int NOT NULL,
            productionId int,
            assemblyLineId int NOT NULL,
            machineId int NOT NULL,
            congestionIssueDetails varchar(50) NOT NULL,
            timeSent datetime DEFAULT CURRENT_TIMESTAMP,
            comment varchar(300),
            CONSTRAINT fk_production_assembly_line_issues_report FOREIGN KEY (productionId) REFERENCES production(productionId),
            CONSTRAINT fk_user_assembly_line_issues_report FOREIGN KEY (userid) REFERENCES user(userid)
            ON DELETE CASCADE
        )
    `;

    await db_service.executeQuery(sql_query);
    return true;
}

async function insert_assembly_line_issue(userId, productionId, assemblyLineId, machineId, congestionIssueDetails, comment){
    const sql_query = "INSERT INTO assemblyLineIssuesReport(userid, productionId, assemblyLineId, machineId, congestionIssueDetails, comment) VALUES("+userId+", "+productionId+", "+assemblyLineId+", "+machineId+", '"+congestionIssueDetails+"', '"+comment+"');";
    const insertId = await db_service.executeQuery(sql_query);

    db_service.executeQuery("SELECT * from user where role!='supervisor' AND role!='viewer';")
    .then((data)=>{
        for(let i=0; i<data.length; i++){
            notification.__notify(data[i].userid, "Supervisor has submitted an assembly line issue of "+congestionIssueDetails+"!")
        }
    })

    console.log("Inserted congestion issue report!");

    return insertId;
}

async function get_assembly_line_issues_list(){
    const sql_query = "SELECT * from assemblyLineIssuesReport";

    const data = await db_service.executeQuery(sql_query);
    return data;
}


module.exports = {create_assembly_line_issues_report_table, insert_assembly_line_issue,get_assembly_line_issues_list }