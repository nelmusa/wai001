<?php
$emailenviado = $_GET['correo'];

$resultados = array();

$conexion = mysqli_connect("localhost","newsnwai_frekoqu","8Ik]uFy^K05*","newsnwai_joom635");
if (!$conexion) {
	$resultados["mensaje"] = "Connection failed: " . mysqli_connect_error();
	$resultados["validacion"] = "error-1";
} else {
	$sql = "SELECT `id`, `name` FROM `fce_users` WHERE `email` = '$emailenviado'";
	$res = mysqli_query($conexion, $sql);
	if (mysqli_num_rows($res) > 0) {
		while($row = mysqli_fetch_assoc($res)) {
			$resultados["mensaje"] = "Validacion Correcta";
			$resultados["validacion"] = "ok";
			$resultados["id"] = $row["id"];
			$resultados["name"] = $row["name"];
		}
	} else {
		$resultados["mensaje"] = "Wrong Email " . $emailenviado . " " . $row["email"];
		$resultados["validacion"] = "error-2";
	}
}
$resultadosJson = json_encode($resultados);
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
?>