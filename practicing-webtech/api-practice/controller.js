function serverStartNotification(port){
    console.log("My very own server has started running on "+port+"! YaY~~");
}

function handleTshirtViewRequest(req, res){
    console.log("User is viewing our TShirts now.")
    res.status(200).send(
	{
	    message:"We have 4 sizes of TShirt with us.",
	    count: 4,
	    color: ["Red","Blue","Green"],
	    itemName: "TShirt"
	}
    );
}

function handleTshirtViewUserIdentification(req, res){
    const body = req.body;

    //console.log(req);
    console.log(body);

    let user_id = 0;
    for(const key in body){
	console.log(key, body[key])
	if(key=="id") user_id = body[key];
    }

    res.status(238).send(
	{
	    message:"Successfully received the data for user "+user_id+"!"
	}
    )
}

module.exports = {serverStartNotification, handleTshirtViewRequest, handleTshirtViewUserIdentification}
