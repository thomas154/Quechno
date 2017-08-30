<!DOCTYPE html>
<html>
<head>
	<title>Data</title>
</head>
<body>

<?php
	session_start();
//	$str = file_get_contents('php://input');
	//$res = json_decode($str,true);
//	echo $res[0];
	$id=$_GET['id'];
	$name=$_GET['name'];
	$nm="'".$name."'";
	$img=$_GET['img'];
	echo "$id $img $nm";

?>
<button onclick="xyz(<?php echo $id; ?>,<?php echo $nm; ?>);"></button>
</body>
</html>
