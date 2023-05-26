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

async function getCongestionIssuesReports(){
    const sql_query = "SELECT distinct * FROM assemblyLineIssuesReport A, production where production.productionId=A.productionId;";

    const rows = await db_service.executeQuery(sql_query);
    return rows;
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

async function generate_production_report(){
    productionData = await getGeneralProductionInfo();

    tableData = "Product Name  |  Production Target   |   Production Reached\n";

    for (let i = 0; i < productionData.length; i++) {
      tableData +=
        productionData[i].productName.padEnd(30, ' ') +"|" +
        productionData[i].productionTarget.toString().padEnd(30, ' ') +"|" +
        productionData[i].productionReached.toString().padEnd(30, ' ') +
        "\n";
    }
    

    const outputPath = './data/pdf/production-report.pdf';
    memoService.generatePDF(tableData, outputPath);
    return "production-report.pdf";

}

async function getQualityReports(){
    const sql_query = "SELECT distinct * from assemblyLineIssuesReport, production where production.productionId=assemblyLineIssuesReport.productionId;";

    const rows = await db_service.executeQuery(sql_query);
    return rows;
}

function test_report(){
    const outputPath = './data/pdf/memo.pdf';
    memoService.generatePDF(memoService.testContent, outputPath);
    return "memo.pdf";
}

function generate_system_start_memo(){
    let systemStartMemoContent = `
    Memorandum

    To: Versatile Garments Ltd Management
    From: Admin
    Date: 29th May, 2023
    Subject: On the start of an Assembly Line Management System

    This memo is to inform you of the following:

    The Assembly Line Management System, developed by Abhijit Paul and Mashiat Amin Farin has been deployed and has started functioning from 9:00AM, today. It is with great pleasure that we notice the benefits of automated congestion detection within just an hour.

    Please let me know if you have any questions.

    Thank you,
    Admin
    `;

    const outputPath = './data/pdf/system-start-memo.pdf';
    memoService.generatePDF(systemStartMemoContent, outputPath);
    return "system-start-memo.pdf";
}

module.exports = {getGeneralProductionInfo, getLineLayout, getLineListForProduction, generate_production_report, generate_system_start_memo, getQualityReports, getCongestionIssuesReports}