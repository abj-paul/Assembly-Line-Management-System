const db_service = require("./DatabaseService.js");
const memoService =  require("../pdf-generation/memo.js");

async function estimateTotalProduction(productionId){ // returns a single value
    const totalProduction = await db_service.executeQuery("SELECT sum(productionAmount) ProductionReached from productionReport where productionId="+productionId);
    console.log("DEBUG");
    console.log(totalProduction);
    return totalProduction;
}

async function hourlyTargetVsReachedProduction(productionId){ // Returns an array [50,40]
    const hourlyProductions = await db_service.executeQuery("SELECT productionAmount from productionReport;");
    //const hourlyTargets = 
}

/*
//TEsting
estimateTotalProduction(1)
.then((data)=>{
    console.log(data[0].ProductionReached);
})
*/

async function perLineProductionFor(productionId){
    const sql_query = "SELECT name, sum(productionAmount) TotalProduction FROM supervisorLineRelationship as A, productionReport as B, assemblyLine as C WHERE A.userId = B.userId AND A.assemblyLineId=C.assemblyLineId AND productionId="+productionId+" GROUP BY A.assemblyLineId";

    const lineProductions = await db_service.executeQuery(sql_query);
    return lineProductions;
}   

async function getGeneralProductionInfo(){
    const productionInfoList = await db_service.executeQuery("SELECT * from production;");
    
    productionMetadata = []; 
    for(let i=0; i<productionInfoList.length; i++){
        let productionReachedVar = await estimateTotalProduction(productionInfoList[i].productionId);
        let assemblyLineList = await getLineListForProduction(productionInfoList[i].productionId);
        let lineProductions = await perLineProductionFor(productionInfoList[i].productionId);
        productionMetadata.push(
            {
                "productionId": productionInfoList[i].productionId,
                "productName": productionInfoList[i].productName,
                "viewerInfo": productionInfoList[i].viewerInfo,
                "productionTarget": productionInfoList[i].totalProductionTarget,
                "productionReached": productionReachedVar[0].ProductionReached,
                "assemblyLineList": assemblyLineList,
                "lineProductions": lineProductions
            }
        )
    }
    return productionMetadata;
}

async function getLineListForProduction(productionId){
    const sql_query = "select distinct name, A.assemblyLineId, capacity, hourlyTarget, A.otherInfo from assemblyLine as A,assemblyLineLayout as B where A.assemblyLineId=B.assemblyLineId and productionId="+productionId;

    const lineList = await db_service.executeQuery(sql_query);
    return lineList;
}

async function getLineLayout(lineId){
    const sql_query = "select distinct A.machineId, machineModel, machineType, perHourProduction, position, congestionStatus, markedStatus, machine.otherInfo camera_link from machine, assemblyLineLayout A, congestion B where machine.machineId=A.machineId and A.machineId=B.machineId and assemblyLineId="+lineId;

    const lineLayout = await db_service.executeQuery(sql_query);
    return lineLayout;
}

/*
//Testing
getGeneralProductionInfo()
.then((data)=>{
    console.log(data);
    for(let i=0; i<data.length; i++){
        console.log(data[i].productName);
        for(let j=0; j<data[i].assemblyLineList.length; j++) console.log(data[i].assemblyLineList[j].name);
    }
})
*/

function generate_production_report(){
    const outputPath = './data/pdf/memo.pdf';
    memoService.generatePDF(memoService.testContent, outputPath);
    return "memo.pdf";
}

module.exports = {getGeneralProductionInfo, getLineLayout, getLineListForProduction, generate_production_report}