<?php
	session_start();
	$str = file_get_contents('php://input');
	$res = json_decode($str,true);
	$con=mysql_connect("localhost","root","");
	mysql_select_db("quechno",$con);
	mysql_query("INSERT INTO que VALUES('$res[4]','$res[3]','$res[0]','$res[2]','$res[1]')"); 
?>
