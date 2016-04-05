<?php  
	$accion = $_GET['ac'];
	if(isset($_POST['email'])){
		$email = $_POST['email'];
	} 
	if(isset($_POST['ubica'])){
		$ubica = $_POST['ubica'];
	} 



	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
	} else {
		$username = '';
		$password = '';
	}

	$conexion = mysqli_connect("localhost","newsnwai_frekoqu","8Ik]uFy^K05*","newsnwai_joom635");
	// Check connection
	if (!$conexion) {
	    die("Connection failed: " . mysqli_connect_error());
	}

	switch ($accion) {
		case '1':
			$sql = "SELECT `id`, `name` FROM `fce_users` WHERE `email` = '$email'";
			$res = mysqli_query($conexion, $sql);
			if (mysqli_num_rows($res) > 0) {
				while($row = mysqli_fetch_assoc($res)) {
        			echo "id: " . $row["id"]. " - Name: " . $row["name"]."<br>";
        			
				}
			} else {
				echo "0 results";
			}
			echo $ubica;
			header("Location: $ubica");
			break;
		case '2':
	        // $consulta = "SELECT count(id) as count, max(id) as max FROM fce_edocman_documents WHERE id > ?";
    	    $registros = mysqli_query($conexion, "select count(id) as count, max(id) as max FROM fce_edocman_documents");
    	    while ($reg = mysqli_a ($registros)){
    	    	return ($reg);
    	    }

			break;
		case '3':
			break;
		default:
			# code...
			break;
	}



	mysqli_close($conexion);
?>