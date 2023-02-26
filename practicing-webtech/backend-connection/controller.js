const model = require("./model.js");

//module.exports = { createUserTable, connect, insertData, getDataForUser, authenticate }

function handleGetRequestToHome(req, res){
	res.status(200).send("This is home");
}

function handlePostRequestToRegistration(req, res){
	const data = req.body;
	console.log(data);
	const name = data["name"];
	const password = data["password"];
	const age = data["age"];
	model.insertData(name, age, password)
	res.status(200).send({"Status":"Successfully registered user "+name});

}

function handlePostRequestToLogin(req, res){
	const data = req.body;
	console.log(data);
	const name = data["name"];
	const password = data["password"];
	
	let result = model.authenticate(name, password)
	res.status(200).send({"Status":result});
}

function handleGetRequestToDashboard(req, res){
	const userid = req.params["userid"];
	const userdata = model.getDataForUser(userid);
	console.log("Found data for user "+userid+" with data "+ JSON.stringify(userdata));
	res.status(200).send(JSON.stringify(userdata));
}

function serverConnectionNotification(port){
	console.log("My server has started running on port "+port);
}

function handleGetRequestFromAdmin(req, res){
	model.createUserTable();
}

module.exports = {handleGetRequestToHome, serverConnectionNotification, handlePostRequestToLogin, handlePostRequestToRegistration, handleGetRequestToDashboard }
