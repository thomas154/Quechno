
var webSocketServer=require("websocket").server;
var server= require("http").createServer();
server.on("connection",function(socket){
	console.log("connection from: ",socket.address().address);});
var ws=new webSocketServer({
	httpServer :server,
	autoAcceptConnections: true
	});
console.log("chat server listening to port 9998");
server.listen(9998);

var clients=[];
ws.on("connect" , chatconnectHandler);
function chatconnectHandler(conn){
	conn.nickname=conn.remoteAddress;
	conn.on("message", chatmessageHandler);
	conn.on("close", chatcloseHandler);
	clients.push(conn);
	console.log(conn.nickname + "entered the chat");
}

function chatbroadcast(data){
	clients.forEach(function(client){
		client.sendUTF(data);
	});
}
function chatcloseHandler(){
	var index=clients.indexOf(this);
	if(index>-1){
		clients.splice(index,1);
	}
		console.log(this.nickname + "left the chat");
}

function chatmessageHandler(message){
	var data=JSON.parse(message.utf8Data);
	//this.nickname=data[2];
	data=JSON.stringify(data);
	this.nickname=
	console.log(this.nickname +"  "+data);
	chatbroadcast(data);
}
