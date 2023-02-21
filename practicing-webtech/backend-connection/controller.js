function handleGetRequestToHome(req, res){
	res.status(200).send("This is home");
}
function handleGetRequestToRegistration(req, res){
	res.status(200).send("This is the endpoint for registration.");
}
function handleGetRequestToLogin(req, res){
	res.status(200).send("This is the endpoint for login.");
}
function handleGetRequestToDashboard(req, res){
	res.status(200).send("This is the endpoint for Dashboard.");
}

function serverConnectionNotification(port){
	console.log("My server has started running on port "+port);
}

module.exports = {handleGetRequestToHome,handleGetRequestToRegistration, handleGetRequestToDashboard, handleGetRequestToLogin, serverConnectionNotification }
