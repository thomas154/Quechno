<?php
	session_start();
    $vid = $_POST['viewansid'];
	$_SESSION['viewansid']=$vid; // this code will again gp back to the script from where it is called (main.js)
?>
