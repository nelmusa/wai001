<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true)
{

}
else
{
	echo "<br/>" . "Esta pagina es solo para usuarios registrados." . "<br/>";
	echo "<br/>" . "<a href='main_login.html'>Login Here!</a>";

	exit;
}
$now = time(); // checking the time now when home page starts

if($now > $_SESSION['expire'])
{
	session_destroy();
	echo "<br/><br />" . "Su sesion a terminado, <a href='main_login.html'> Necesita Hacer Login</a>";
	exit;
}
?>