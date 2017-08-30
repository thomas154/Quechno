var qid=0;
var webSocketServer=require("websocket").server;
var server= require("http").createServer();
server.on("connection",function(socket){
	console.log("connection from: ",socket.address().address);});
var ws=new webSocketServer({
	httpServer :server,
	autoAcceptConnections: true
	});
console.log("quencho server listening to port 9999");
server.listen(9999);

var clients=[];
ws.on("connect" , connectHandler);
function connectHandler(conn){
	conn.nickname=conn.remoteAddress;
	conn.on("message", messageHandler);
	conn.on("close", closeHandler);
	clients.push(conn);
	console.log(conn.nickname + "entered the portal");
	broadcast(conn.nickname + "entered the portal");
}

function broadcast(data){
	clients.forEach(function(client){
		client.sendUTF(data);
});
}
function closeHandler(){
	var index=clients.indexOf(this);
	if(index>-1){
		clients.splice(index,1);
	}
		console.log(this.nickname + "left the chat");
		broadcast(this.nickname + "left the chat");
}

function messageHandler(message){
	var data=JSON.parse(message.utf8Data);
	//this.nickname=data[2];
	data.push(qid);
	quedata=JSON.stringify(data);
	console.log(this.nickname +"  "+quedata);
	qid+=1;
	broadcast(quedata);
}
