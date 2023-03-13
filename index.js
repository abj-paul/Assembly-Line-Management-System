const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
const PORT = 1401;

const admin = require("./admin.js");
const misc = require("./misc.js");
const controller = require("./controller.js");
const report = require("./report.js");


admin.startDatabase();
admin.__deleteTable("user"); 
admin.__deleteTable("notification");
report.__connect();
report.__createProductionReportTable();
//admin.__deleteTable("productionReport");


app.listen(PORT, ()=>misc.serverHasStartedNotification(PORT));
app.get("/home", (req, res) => controller.handleGetRequestToHome(req,res));
app.post("/registration", (req, res) => controller.handlePostRequestToRegistration(req,res));
app.post("/login", (req, res) => controller.handlePostRequestToLogin(req,res));
app.post("/admin", (req, res) => controller.handlePostRequestToAdmin(req,res));
app.post("/supervisor", (req, res) => controller.handlePostRequestToSupervisor(req,res));
app.post("/productionManager", (req, res) => controller.handlePostRequestToPM(req,res));

//app.get("/dashboard/:userid", (req, res) => controller.handleGetRequestToDashboard(req,res));


function testAdmin(){
    admin.viewRegisteredUsers();
    admin.viewNotifications(1);
}

