
<?php
	$conexion = mysqli_connect("www.wai-news.com","nmurillo","NmurilLo438dyh","newsnwai_joom635");
	$registro = mysqli_query($conexion, "SELECT id,username,name,email,lastvisitDate FROM fce_users WHERE username = 'nmurillo'");

	if ($registro) {
		echo $registro;
	}

	// while ($reg = mysqli_fetch_array($registro)){
	// 	echo "<h2>".$reg['campo1']."</h2><br>";
	// 	echo $reg['campo2']."<br>";
	// 	echo "<hr>";
	// 	echo "<bd>";
	// }
?>
