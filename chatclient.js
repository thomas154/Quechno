var cid=0;
window.addEventListener("load",setupchat,false);
var wss;
//var name=prompt("enter your name");
function sendmsg(){
	var data=document.getElementById('global_input').value;
	if(data.charAt(0)=="" || data.charAt(0)==" "){
		alert("invalid spaces");
		return false;
	}
	if(/[<>]/.test(data)){
		alert("invalid <>");
		return false;
	}
	var jstr=JSON.stringify(data);
	wss.send(jstr);
	document.getElementById('global_input').value="";
}

function global_post(msg){
	var data=JSON.parse(msg);
	var chat_body=document.getElementById('chat-body');
	data=capitalizeFirstLetter(data);
	var global_chat=document.getElementById('global_chat');
	var msgdiv=document.createElement('div');
	var textdiv=document.createElement('div');
	textdiv.id=cid+""+"c";
	textdiv.className="ctext";
	msgdiv.className="global_msg";
	msgdiv.appendChild(textdiv);
	global_chat.appendChild(msgdiv);
	document.getElementById(cid+""+"c").innerHTML=data;
	cid+=1;
	chat_body.scrollTop=chat_body.scrollHeight;
}

function open_box(){
	var chat_body=document.getElementById('chat_body');
	var chat = document.getElementById('chat');
	var span = document.getElementsByClassName("close")[1];
	chat.style.display = "block";
	span.onclick = function() {
		chat.style.display = "none";
	}
}

function global_chat(){
	document.getElementById('global_chat').style.display="block";
	document.getElementById('people_online').style.display="none";
}

function people_online(){
	document.getElementById('people_online').style.display="block";
	document.getElementById('global_chat').style.display="none";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setupchat(){
	wss=new WebSocket("ws://127.0.0.1:9998/");
	setInput(wss);
	write("welcome to very simple chat");
	wss.addEventListener("open",function(){
		write("opened connection");
	},false);
	wss.addEventListener("message",function(e){
		global_post(e.data);
	},false);
	wss.addEventListener("close",function(){
		write("connection closed");
	},false);
}
function write(str){
	//var response = document.getElementById("response"),
	console.log(str);}

function setInput(wss){
		var input = document.getElementById("global_input");
		input.addEventListener("keydown",function(e){
			if(e.keyCode==13){
				sendmsg();
				this.value="";
				}
			});
}
