const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors());
app.options('*', cors());

app.use(express.json());
const PORT = 1401;

const admin = require("./admin.js");
const misc = require("./misc.js");
const controller = require("./controller.js");
const report = require("./Model/hourly-production-report.model.js");
const pmcontroller = require("./Controller/productionManager.js");
const session = require("./Model/session.js");
const assemblyLine = require("./Model/assembly-line-layoud.model.js");
const layoutController = require("./Controller/assembly-line-layout.controller.js");
const machine = require("./Model/machine.js");
const lineChiefController = require("./Controller/line-chief.controller.js");
const supervisorController = require("./Controller/supervisor.controller.js");
const production = require("./Model/production.model.js");


admin.startDatabase();
/*admin.__deleteTable("user"); 
admin.__deleteTable("notification");
admin.__deleteTable("assemblyLineLayout");
admin.__deleteTable("machine");
admin.__deleteTable("assemblyLine");
admin.__deleteTable("session");
admin.__deleteTable("productionReport");*/


session.__createSessionTable();
report.__connect();
machine.__createMachineTable();
production.__createProductionTable();
assemblyLine.__createAssemblyLineTable();
assemblyLine.__createAssemblyLineLayoutTable();
report.__createProductionReportTable();



app.listen(PORT, ()=>misc.serverHasStartedNotification(PORT));
app.post("/admin", (req, res) => controller.handlePostRequestToAdmin(req,res));
app.post("/supervisor", (req, res) => supervisorController.handlePostRequestToSupervisor(req,res));
app.post("/productionManager", (req, res) => pmcontroller.handlePostRequestToProductionManager(req,res));
app.post("/lineChief", (req, res) => lineChiefController.handlePostRequestToLineChief(req,res));
app.post("/layout", (req, res) => layoutController.handlePostRequestToLayoutViaPM(req,res));


//app.get("/dashboard/:userid", (req, res) => controller.handleGetRequestToDashboard(req,res));


function testAdmin(){
    admin.viewRegisteredUsers();
    admin.viewNotifications(1);
}


