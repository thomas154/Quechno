<!DOCTYPE html>
<html lang="en">
<head>
	<title>Quechno</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="qu.css">
	<link rel="stylesheet" href="chat.css">
	<script type="text/javascript" src="mainjs.js"></script>
	<script type="text/javascript" src="chatclient.js"></script>
	<script src="jquery-3.1.0.min.js"></script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<meta name="google-signin-client_id" content="1092317785933-go9f32crkuu4945800qha3gi5h3ekras.apps.googleusercontent.com">
	<script>
	var id,name,img,email;
	function onSignIn(googleUser) {

				var profile = googleUser.getBasicProfile();

				id=profile.getId();

				name=profile.getName();

				img=profile.getImageUrl();

				email=profile.getEmail();

				console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

				console.log('Name: ' + profile.getName());

				console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail());
			//window.location="verify.php?id="+id+"&name="+name+"&img="+img+"&email="+email;
			//data=JSON.stringify(data);
			//re=new XMLHttpRequest();
			//re.open("POST","verify.php",true);
			//re.send(data);
			//window.location="index.php";
		}
	</script>

</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
	  <div class="container-fluid">
	     <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
				<div class="navbar-header">
	      <a class="navbar-brand" href="#">Quencho</a>
				<input type="text" class="form" placeholder="Post Question" id="usr">
				<button class="btn btn-default" id="srbtn" type="button" style="left:540%;" onclick="sendques();">Post!</button>
				<div class="g-signin2" data-onsuccess="onSignIn" style="float:left;padding:8px"></div>
			 </div>
			<div class="collapse navbar-collapse" id="myNavbar">
	      <ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="#">Home</a></li>
					<li><a href="#">Feeds</a></li>
	        <li><a href="video/main.php">Video call</a></li>
	        <li><a href="#">About Us</a></li>
	        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>

	<div id="myModal" class="modal">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">×</span>
				<h2>Post your answer Here......</h2>
			</div>
		<form action="main.php" method="POST">
			<div class="modal-body" id="modal-body">
				<textarea id="textarea" class="anstext" name="anstxt" style="min-width:200%;min-height:300px;border:none;max-width:200%;"></textarea>
			</div>
			<div class="modal-footer">
				<input type="submit" id="button" value="Answer" class="ansbutton" name="ansbtn">
			</div>
		</form>
		</div>
	</div>

	<?php
		 	session_start();
			//$_SESSION['id']=echo ""
			$con=mysqli_connect('localhost','root',"",'quechno');
			mysqli_select_db($con,'quechno');
		    $res = mysqli_query($con,"SELECT * FROM que order By q_id DESC");
			echo "<div class='dbody' id='outbody'>";
			while($row=mysqli_fetch_array($res)){
			echo "<div class='container' id='100'>
						<img src=".$row['img']." class='imgclass'>
						<div id=".$row['q_id']. " class='widget'>".$row['question']."</div>
						<div class='postedbytext' id='postedbytext'>"."Posted by: ".$row['name']."</div>
						<input type='button' id=".$row['q_id']. " class='ansbutton' value='Answer' onclick='testingcase(this);'>
						<input type='button' id=".$row['q_id']. " class='upvotebutton' value='Upvote'>
						<input type='button' id=".$row['q_id']. " class='viewansbutton' onclick='sendans(this);' value='View Answer'>
						</div>";

			}
			echo "</div>";
		?>

	<div class="slideopen">
		<img src="slideopen.png" width="30px" height="50px" onclick="open_box();">
	</div>


	<div class="chat-content" id="chat">
		<div class="black_bar">
		<span class="close" style="font-family:none;">x</span>
		<p>Messenger<p>
		</div>
		<div class="chat-header">
			<ul class="tab">
				<li><a href="#" class="tablinks" onclick="global_chat();">Global</a></li>
				<li><a href="#" class="tablinks" onclick="people_online();">People Online</a></li>
			</ul>
		</div>
		<div class="chat-body" id="chat-body">
			<div class="global_chat" id="global_chat">

			</div>
			<div class="people_online" id="people_online">
				<h2>people_online</h2>
			</div>
		</div>
		<div class="chat-footer">
			<input type="text" id="global_input" class="textbox" placeholder="Type a message"></input>
		</div>
	</div>
</body>
</html>
