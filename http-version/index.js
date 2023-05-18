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
const assemblyLine = require("./Model/assembly-line-layoud.model.js");
const layoutController = require("./Controller/assembly-line-layout.controller.js");
const machine = require("./Model/machine.js");
const lineChiefController = require("./Controller/line-chief.controller.js");
const supervisorController = require("./Controller/supervisor.controller.js");
const production = require("./Model/production.model.js");
const session = require("./Model/session.js");
const fastAPIConnection = require("./Model/congestion.algorithm.js");
const floor = require("./Model/floor.model.js")
const congestion = require("./Model/congestion.model.js");


normal_start_database();
//clearDatabases();

// IMAGE SUPPORT START---------------------------------------------------------------------
const IMAGE_DIR = "./data/profile/";
const multer = require("multer");
const path = require("path");


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, IMAGE_DIR));
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

console.log("dEBUG: "+path.join(__dirname, IMAGE_DIR));

// Create multer upload instance
const upload = multer({ storage });

app.use(express.json()); 
app.use("/profile", express.static(path.join(__dirname, IMAGE_DIR))); //http://localhost:1401/profile/1684422440449.png

// Handle POST request for image upload
app.use(upload.single("profile"));
app.post("/uploadImage", (req, res) => admin.saveImage(req, res));
app.get("/getProfilePicture", (req, res) => admin.getImage(req, res));

// IMAGE SUPPORT END-----------------------------------------------------------------------

app.listen(PORT, ()=>misc.serverHasStartedNotification(PORT));
app.post("/admin", (req, res) => controller.handlePostRequestToAdmin(req,res));
app.post("/supervisor", (req, res) => supervisorController.handlePostRequestToSupervisor(req,res));
app.post("/productionManager", (req, res) => pmcontroller.handlePostRequestToProductionManager(req,res));
app.post("/lineChief", (req, res) => lineChiefController.handlePostRequestToLineChief(req,res));
app.post("/layout", (req, res) => layoutController.handlePostRequestToLayoutViaPM(req,res));


//app.get("/dashboard/:userid", (req, res) => controller.handleGetRequestToDashboard(req,res));
//wait(7000)
//fastAPIConnection.testFastAPIConnection()

function testAdmin(){
    admin.viewRegisteredUsers();
    admin.viewNotifications(1);
}

/*
setInterval(function() {
  fastAPIConnection.updateCongestionStatusForWorkstations()
}, 5 * 1000); // 10 * 10000 milsec = 10s
*/


function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

async function clearDatabases(){
  admin.startDatabase();

await admin.__deleteTable("congestion");
await admin.__deleteTable("notification");
await admin.__deleteTable("assemblyLineLayout");
await admin.__deleteTable("assemblyLine");
await admin.__deleteTable("productionReport");
await admin.__deleteTable("user"); 
await admin.__deleteTable("machine");
await admin.__deleteTable("session");

console.log("Done deleting all databases!---------------------");

await admin.startDatabase();
await admin.__createAdminUser();

await session.__createSessionTable();
await machine.__createMachineTable();
await report.__connect();
await production.__createProductionTable();
await assemblyLine.__createAssemblyLineTable();
await assemblyLine.__createAssemblyLineLayoutTable();
await report.__createProductionReportTable();

await congestion.initializeCongestionStatusForMachines();
//await floor.create_floor_table();

}


async function normal_start_database(){
    await admin.startDatabase();
    
    await session.__createSessionTable();
    await machine.__createMachineTable();
    await report.__connect();
    await production.__createProductionTable();
    await assemblyLine.__createAssemblyLineTable();
    await assemblyLine.__createAssemblyLineLayoutTable();
    await report.__createProductionReportTable();
    await congestion.initializeCongestionStatusForMachines();
}
