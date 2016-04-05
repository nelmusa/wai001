<?php
/**
 * Obtener informacion de sesion abierta por usuario
 *
 * http://www.wai-news.com/php/wai_sesion_por_username.php/?username=nmurillo
 * {"estado":"1","usuario":{"userid":"489","username":"nmurillo"}}
 */

require 'wai_function.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['username'])) {

        // Obtener parámetro username
        $parametro = $_GET['username'];

        // Tratar retorno
        $retorno = wai_function::SESByUSR($parametro);

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

