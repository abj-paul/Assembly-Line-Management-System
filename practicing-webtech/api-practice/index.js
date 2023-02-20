const controller = require("./controller.js");
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 8000

app.listen(PORT, () => controller.serverStartNotification(PORT));

app.get("/tshirt/view", (req, res) => controller.handleTshirtViewRequest(req, res));
app.post("/tshirt/view", (req, res) => controller.handleTshirtViewUserIdentification(req, res));
