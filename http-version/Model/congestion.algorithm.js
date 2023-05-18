const congestion = require("./congestion.model.js");
const databaseService = require("./DatabaseService.js");
const assemblyLineLayout = require("./assembly-line-layoud.model.js")
const fetch = require("node-fetch");

const ip_addr = "http://127.0.0.1:8000/";
let congestion_statuses = []

async function getCongestionStatusForWorkstations(){
    return congestion_statuses;
}

// Get congestion status for machines from fastAPI
async function updateCongestionStatusForSingleWorkstation(assemblyLineId){

    // Get workstation list from assembly line layout
    await databaseService.getDBConnection();
    const sql_query = "select * from assemblyLineLayout where assemblyLineId="+assemblyLineId;
    const rows = await databaseService.getData(sql_query);
    const machine_list = []
    for(let i=0; i<rows.length; i++) machine_list.push(rows[i].machineId);

    // Send workstation list to fastAPI to get their congestion status.
    let url = ip_addr + "congestion_status/line/";
    let data = {
        "machine_list": machine_list,
        "line_id": assemblyLineId
    }


    await fetch(url, {
        method: "POST", 
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    })
    .then((resolve)=>{
        console.log("Request Resolved!");
        return resolve.json()
    })
    .then((resData)=>{
        //congestion_statuses = resData;
        console.log("DEBUG: reply from fastapi: "+resData);
        // Save in Congestion database
        for(let i=0; i<resData; i++){
            congestion.updateCongestionStatusForMachine(machine_list[i], resData[i], "uwu machine "+machine_list[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}

async function updateCongestionStatusForWorkstations(){
    await databaseService.getDBConnection();
    const sql_query = "select distinct * from assemblyLine;";
    const rows = await databaseService.getData(sql_query);
    console.log("DEBUG Congestion: ");
    console.log(rows);
    const assemblyLineList = []
    for(let i=0; i<rows.length; i++) assemblyLineList.push(rows[i].assemblyLineId);

    // Get congestion status for the assembly line and save it in db
    for(let i=0; i<assemblyLineList.length; i++) updateCongestionStatusForSingleWorkstation(assemblyLineList[i]);
}

function testFastAPIConnection(){
    assemblyLineLayout.registerAssemblyLine("test assembly line", 10, "other info nai hehe");
    assemblyLineLayout.__saveAssemblyLineLayoutEntry(1,1,0,"machin1 otherinfo");
    assemblyLineLayout.__saveAssemblyLineLayoutEntry(1,2,2,"machin2 otherinfo");
    assemblyLineLayout.__saveAssemblyLineLayoutEntry(1,3,4,"machin3 otherinfo");
    assemblyLineLayout.__saveAssemblyLineLayoutEntry(1,4,5,"machin4 otherinfo");
    assemblyLineLayout.__saveAssemblyLineLayoutEntry(1,5,8,"machin5 otherinfo");

    getCongestionStatusForWorkstations();
    console.log("DEBUG: Congestion Status -"+congestion_statuses)
}


module.exports = {getCongestionStatusForWorkstations, testFastAPIConnection, updateCongestionStatusForWorkstations}