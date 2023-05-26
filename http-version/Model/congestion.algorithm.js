const congestion = require("./congestion.model.js");
const databaseService = require("./DatabaseService.js");
const assemblyLineLayout = require("./assembly-line-layoud.model.js")
const fetch = require("node-fetch");

const ip_addr = "http://127.0.0.1:8000/";


async function getCongestionStatusForWorkstations(assemblyLineId){
    let connection = await databaseService.getDBConnection();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = "select  distinct congestion.machineId, assemblyLineId, congestion.imageFileUrl, congestionStatus, markedStatus from congestion, assemblyLineLayout where assemblyLineLayout.machineId = congestion.machineId and assemblyLineLayout.assemblyLineId="+assemblyLineId;

        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            resolve(results);
        })
    });

}

// Get congestion status for machines from fastAPI
async function updateCongestionStatusForSingleWorkstation(assemblyLineId){

    // Get workstation list from assembly line layout
    await databaseService.getDBConnection();
    const sql_query = "select distinct machine.machineId, assemblyLineId, machine.otherInfo camera_link from assemblyLineLayout, machine where machine.machineId=assemblyLineLayout.machineId AND assemblyLineId="+assemblyLineId;
    const rows = await databaseService.getData(sql_query);
    const machine_list = []
    for(let i=0; i<rows.length; i++) machine_list.push(rows[i].machineId);
    const camera_list = []
    for(let i=0; i<rows.length; i++) camera_list.push(rows[i].camera_link);

    // Send workstation list to fastAPI to get their congestion status.
    let url = ip_addr + "congestion_status/line/image/";
    let data = {
        "machine_list": machine_list,
        "camera_list": camera_list,
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
        for(let i=0; i<resData.length; i++){
            congestion.updateCongestionStatusForMachine(machine_list[i], resData[i].congestionStatus, resData[i].imageFileUrl);
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