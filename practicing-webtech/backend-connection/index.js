const controller = require('./controller.js');
const model = require('./model.js');
const express = require('express');
const app = express();

app.use(express.json());


// Preparing database
model.connect();
model.createDatabase();
model.createUserTable();

// Starting server
const PORT  = 1201; 
app.listen(PORT, () => controller.serverConnectionNotification(PORT));


app.get("/home", (req, res) => controller.handleGetRequestToHome(req,res));
app.post("/registration", (req, res) => controller.handlePostRequestToRegistration(req,res));
app.post("/login", (req, res) => controller.handlePostRequestToLogin(req,res));
app.get("/dashboard/:userid", (req, res) => controller.handleGetRequestToDashboard(req,res));

