var qid=-1;
var qidc=100;
var ws;
window.addEventListener("load",setup,false);
//var name=prompt("enter your name");
function sendques()
			{
				var data=document.getElementById('usr').value;
				var li=data.lastIndexOf("?");
				if(data.charAt(0)=="" || data.charAt(0)==" "){
					alert("invalid spaces");
					return false;
				}
				if(/[<>]/.test(data)){
					alert("invalid <>");
					return false;
				}
				if(data[li]!="?"){
					data=data+"?";
				}
				var fdata=[name,img,email,data];
				var jstr=JSON.stringify(fdata);
				ws.send(jstr);
				document.getElementById('usr').value="";
			}

function post(question){
	var data=JSON.parse(question);
	var qdata=capitalizeFirstLetter(data[3]);
	qid=data[4];
	//var jstr=JSON.stringify([qid,qdata]);
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","storedb.php",true);
	xmlhttp.send(question);
	var outerdiv= document.getElementById('outbody');
	var iDiv = document.createElement('div');
	var imgdiv=document.createElement('img');
	var postedby=document.createElement('div');
	postedby.className='postedbytext';
	postedby.id='postedbytext';
	imgdiv.src=data[1];
	imgdiv.className='imgclass';
	iDiv.className='container';
	iDiv.id = qidc+'';
	var innerDiv = document.createElement('div');
	innerDiv.id = qid+'';
	innerDiv.className='widget';
	iDiv.appendChild(imgdiv);
	iDiv.appendChild(innerDiv);
	iDiv.appendChild(postedby);
	outerdiv.insertBefore(iDiv,outerdiv.childNodes[0]);
	document.getElementById(qid+'').innerHTML=qdata;
	document.getElementById('postedbytext').innerHTML='Posted by: '+data[0];
	var ansbutton=document.createElement('input');
	ansbutton.id=qid+"";
	var upvotebutton=document.createElement('input');
	var viewansbutton=document.createElement('input');
	viewansbutton.id=qid+"";

	ansbutton.setAttribute("type","button");
	ansbutton.setAttribute("value","Answer");
	ansbutton.setAttribute("onclick","testingcase(this);");
	upvotebutton.setAttribute("type","button");
	upvotebutton.setAttribute("value","Upvote");
	viewansbutton.setAttribute("type","button");
	viewansbutton.setAttribute("value","View Answer");
	viewansbutton.setAttribute("onclick","sendans(this);");
	//ansbutton.id= qid+'';
	ansbutton.className='ansbutton';
	upvotebutton.className='upvotebutton';
	viewansbutton.className='viewansbutton';

	//ansbutton.va='Answer';
	iDiv.appendChild(ansbutton);
	iDiv.appendChild(upvotebutton);
	iDiv.appendChild(viewansbutton);
	qid+=1;
	//qidc+=1;
}
function testingcase(ob){
	var modal = document.getElementById('myModal');
	//var btn = document.getElementById(qid+"");
	var span = document.getElementsByClassName("close")[0];
	var mb = document.getElementById('modal-body');
	textbox=document.getElementById('textarea');
	var ans=document.getElementById('button')
	textbox.id=ob.id+"";
	ans.id=ob.id+"";
	//alert(textbox.id+"       "+ob.id);
	$.post('getid.php',{ansid:ans.id},function(data){
	});
	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
		textbox.id='textarea';
		ans.id='button';
	}
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setup(){
	ws=new WebSocket("ws://127.0.0.1:9999/");
	setupInput(ws);
	write("welcome to very simple chat");
	ws.addEventListener("open",function(){
		write("opened connection");
	},false);
	ws.addEventListener("message",function(e){
		post(e.data);
	},false);
	ws.addEventListener("close",function(){
		write("connection closed");
	},false);
}
function write(str){
	//var response = document.getElementById("response"),
	console.log(str);}

function setupInput(ws){
		var input = document.getElementById("usr");
		input.addEventListener("keydown",function(e){
			if(e.keyCode==13){
				sendques();
				this.value="";
				}
			});
}
function sendans(ob){
	$.post('vid.php',{viewansid:ob.id},function(data){
  window.location="viewans.php";
	});
}
