const controller = require('./controller.js');
const express = require('express');
const app = express();

const PORT  = 1201; 
app.listen(PORT, () => controller.serverConnectionNotification(PORT));


app.get("/home", (req, res) => controller.handleGetRequestToHome(req,res));
app.get("/registration", (req, res) => controller.handleGetRequestToRegistration(req,res));
app.get("/login", (req, res) => controller.handleGetRequestToLogin(req,res));
app.get("/dashboard", (req, res) => controller.handleGetRequestToDashboard(req,res));


