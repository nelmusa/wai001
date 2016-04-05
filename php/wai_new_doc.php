<?php
/**
 * Obtiene la cantidad de documentos nuevos
 * a partir de un Id
 * 
 * http://www.wai-news.com/php/wai_new_doc.php/?ultId=0
 * {"estado":"1","documento":{"count":"2","max":"11"}}
 */

require 'wai_function.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['ultId'])) {

        // Obtener parámetro username
        $parametro = $_GET['ultId'];

        // Tratar retorno
        $retorno = wai_function::NewDoc($parametro);

        if ($retorno) {

            $usuario["estado"] = "1";
            $usuario["documento"] = $retorno;
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

