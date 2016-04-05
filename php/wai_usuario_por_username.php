<?php
/**
 * Obtiene el detalle de un user especificada por
 * su identificador "username"
 *
 * http://www.wai-news.com/php/wai_usuario_por_username.php/?username=nmurillo
 * {"estado":"1","usuario":{"id":"489","username":"nmurillo",
 *  "name":"Nelson Murillo","email":"nel.mu.sa@gmail.com","lastvisitDate":"2015-12-08 18:42:49"}}
 */

require 'wai_function.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['username'])) {

        // Obtener parámetro username
        $parametro = $_GET['username'];

        // Tratar retorno
        $retorno = wai_function::USRgetById($parametro);


        if ($retorno) {

            $usuario["estado"] = "1";
            $usuario["usuario"] = $retorno;
            // Enviar objeto json del usuario
            print json_encode($usuario);
        } else {
            // Enviar respuesta de error general
            print json_encode(
                array(
                    'estado' => '2',
                    'mensaje' => 'No se obtuvo el registro'
                )
            );
        }

    } else {
        // Enviar respuesta de error
        print json_encode(
            array(
                'estado' => '3',
                'mensaje' => 'Se necesita un identificador'
            )
        );
    }
}

