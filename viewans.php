<html>
<link rel="stylesheet" href="qu.css">
<body>
<?php
	session_start();
    $vid = $_SESSION['viewansid'];
	$con=mysqli_connect('localhost','root',"",'quechno');
	mysqli_select_db($con,'quechno');
    $res = mysqli_query($con,"SELECT * FROM que WHERE q_id = '$vid'");
	$rans= mysqli_query($con,"SELECT * FROM ans WHERE ans_id = '$vid'");
	$row=mysqli_fetch_array($res);
	echo "<div class='ans_container' id='ansbox'>";
	echo "<div class='qubox' id='100'>
					<span class='close' style='float:right;'>x</span>
					<img src=".$row['img']." class='imgclass'>
					<div>".$row['question']."</div>
					<div class='postedbytext' id='postedbytext' style='margin-top:10%;'>"."Posted by: ".$row['name']."</div>
				<div style='font-size:21px;margin-top:10%;'>Answers</div>
				</div>";
	echo "<div class='scroll_ans' id='100'>";
	while($ro=mysqli_fetch_array($rans)){
			echo "<img class='imgclass' src=".$ro['img'].">
				<div id='postedbytext' style='float:right'>"."Posted by: ".$ro['name']."</div>
				 <div class='ansbox'>".$ro['answer']."</div>";

	}
	echo "</div>";
	echo "</div>";
?>
</body>
</html>
