const report = require("./report.js");


function handlePostRequestToSupervisor(req, res){
    const body = req.body;
    const operationType = body.operation;

    if(operationType==constants.SUBMIT_HOURLY_PRODUCTION_REPORT){
        const userid = body.userid;
        const unit = body.unit;
        const productionAmount = body.productionAmount;
        const comment = body.comment;

        report.__insertProductionReportData(userid, unit, productionAmount, comment)
        .then((data)=>{
            res.status(200).send({"ReportId":data.insertId});
        })
        .catch((err)=>{
            throw err;
        });
    } 
}

module.exports = {handlePostRequestToSupervisor}