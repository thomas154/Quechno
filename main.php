<?php
	session_start();
	$ans = $_POST['anstxt'];
	$id = $_SESSION['ansid'];
	$name=$_SESSION['name'];
	$img=$_SESSION['img'];
	$email=$_SESSION['email'];
	$con=mysql_connect("localhost","root","");
	mysql_select_db("quechno",$con);
	mysql_query("INSERT INTO ans VALUES('$id','$ans','$name','$img','$email')");
	header('location:index.php');
?>
