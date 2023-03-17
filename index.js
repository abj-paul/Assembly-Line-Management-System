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
const report = require("./report.js");
const pmcontroller = require("./Controller/productionManager.js");
const session = require("./Model/session.js");
const assemblyLine = require("./Model/assembly-line-layoud.model.js");
const layoutController = require("./Controller/assembly-line-layout.controller.js");


admin.startDatabase();
//admin.__deleteTable("user"); 
//admin.__deleteTable("notification");
//admin.__deleteTable("machine");
//admin.__deleteTable("session");

session.__createSessionTable();
report.__connect();
report.__createProductionReportTable();
assemblyLine.__createAssemblyLineTable();
assemblyLine.__createAssemblyLineLayoutTable();
//admin.__deleteTable("productionReport");


app.listen(PORT, ()=>misc.serverHasStartedNotification(PORT));
app.post("/admin", (req, res) => controller.handlePostRequestToAdmin(req,res));
app.post("/supervisor", (req, res) => controller.handlePostRequestToSupervisor(req,res));
app.post("/productionManager", (req, res) => pmcontroller.handlePostRequestToProductionManager(req,res));
app.post("/layout", (req, res) => layoutController.handlePostRequestToLayoutViaPM(req,res));


//app.get("/dashboard/:userid", (req, res) => controller.handleGetRequestToDashboard(req,res));


function testAdmin(){
    admin.viewRegisteredUsers();
    admin.viewNotifications(1);
}


