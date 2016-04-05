<?php
/**
 * Obtiene todos los usuarios de la base de datos
 *
 * http://www.wai-news.com/php/wai_usuarios.php
 * 
 */

require 'wai_function.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Manejar petición GET
    $usuarios = wai_function::USRgetAll();

    if ($usuarios) {

        $datos["estado"] = 1;
        $datos["usuarios"] = $usuarios;

        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "Ha ocurrido un error"
        ));
    }
}

?>