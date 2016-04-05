<?php
/**
 * Obtiene todos los usuarios de la base de datos
 *
 * http://www.wai-news.com/php/wai_usuarios.php
 * 
 * Login de usuarios y creacion de sesiones con PHP y MySQL
 * [Tutorial]Crear un sistema de Login con PHP y MySQL
 */

require 'wai_function.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // sent from form
    $username = $_POST['username'];
    $password = $_POST['password'];

    echo "( 1 )";
    echo $username;
    echo $password;

    $usuarios = wai_function::LogIn($username, $password);

    echo "( 4 )";
    echo $usuarios;

    if ($usuarios) {
   
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['start'] = time();
        $_SESSION['expire'] = $_SESSION['start'] + (5 * 60) ;
   
        echo "<br> Bienvenido! " . $_SESSION['username'];
        // echo "<script>location.href='http://localhost/www/index.en.html'</script>";

    } else {
        echo '<script>alert("Username o Password estan incorrectos.")</script> ';
        // echo "<br/>Username o Password estan incorrectos.<br>";
        echo "<a href='javascript:history.back()'>Volver a Intentarlo</a>";
        // echo "<script>javascript:history.back()</script>";
  }
}
?>