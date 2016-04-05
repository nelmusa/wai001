<?php

/**
 * Representa el la estructura de las metas
 * almacenadas en la base de datos
 */
require 'wai_database.php';

class wai_function
{
    function __construct()
    {
    }

    /** OK-NMS
     * Retorna datos de todos los usuarios
     *
     * @param $username Identificador del registro
     * @return array Datos del registro
     */
    public static function USRgetAll()
    {
        $consulta = "SELECT * FROM fce_users";
        try {
            // Preparar sentencia
            $comando = wai_database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute();

            return $comando->fetchAll(PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            return false;
        }
    }

    /** OK-NMS
     * Obtiene los datos de un usuario con un identificador
     * determinado
     *
     * @param $username Identificador de usuario
     * @return mixed
     */
    public static function USRgetById($username)
    {
        // Consulta de la meta
        $consulta = "SELECT id,
                            username,
                            name,
                            email,
                            lastvisitDate
                            FROM fce_users
                            WHERE username = ?";

        try {
            // Preparar sentencia
            $comando = wai_database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($username));
            // Capturar primera fila del resultado
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;

        } catch (PDOException $e) {
            // Aquí puedes clasificar el error dependiendo de la excepción
            // para presentarlo en la respuesta Json
            return -1;
        }
    }

    /** OK-NMS
     * Obtiene datos de sesion por usuario
     *
     * @param $username Identificador de usuario
     * @return mixed
     */
    public static function SESByUSR($username)
    {
        // Consulta de la meta
        $consulta = "SELECT userid,
                            username
                            FROM fce_session
                            WHERE username = ?";

        try {
            // Preparar sentencia
            $comando = wai_database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($username));
            // Capturar primera fila del resultado
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;

        } catch (PDOException $e) {
            // Aquí puedes clasificar el error dependiendo de la excepción
            // para presentarlo en la respuesta Json
            return -1;
        }
    }

    /** OK-NMS
     * Obtiene cantidad de nuevos documentos
     *
     * @param $ultId Ultimo Id contado
     * @return mixed
     */
    public static function NewDoc($ultId)
    {
        // Consulta 
        $consulta = "SELECT count(id) as count,
                            max(id) as max
                            FROM fce_edocman_documents
                            WHERE id > ?";

        try {
            // Preparar sentencia
            $comando = wai_database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($ultId));
            // Capturar primera fila del resultado
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;

        } catch (PDOException $e) {
            // Aquí puedes clasificar el error dependiendo de la excepción
            // para presentarlo en la respuesta Json
            return -1;
        }
    }


    /**
     * Obtiene cantidad de nuevos documentos
     *
     * @param $ultId Ultimo Id contado
     * @return mixed
     */
    public static function LogIn($username, $password)
    {
        
        echo "( 2 )";
        echo $username;
        echo $password;

        // Consulta 
        $consulta = "SELECT id,
                            username,
                            name,
                            email,
                            lastvisitDate
                            FROM fce_users
                            WHERE username = ?";
        try {
            // Preparar sentencia
            $comando = wai_database::getInstance()->getDb10($username, $password)->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($username));
            // Capturar primera fila del resultado
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;

        } catch (PDOException $e) {
            // Aquí puedes clasificar el error dependiendo de la excepción
            // para presentarlo en la respuesta Json
            return -1;
        }
    }







    /**
     * Actualiza un registro de la bases de datos basado
     * en los nuevos valores relacionados con un identificador
     *
     * @param $username      identificador
     * @param $titulo      nuevo titulo
     * @param $descripcion nueva descripcion
     * @param $fechaLim    nueva fecha limite de cumplimiento
     * @param $categoria   nueva categoria
     * @param $prioridad   nueva prioridad
     */
    public static function update(
        $username,
        $titulo,
        $descripcion,
        $fechaLim,
        $categoria,
        $prioridad
    )
    {
        // Creando consulta UPDATE
        $consulta = "UPDATE meta" .
            " SET titulo=?, descripcion=?, fechaLim=?, categoria=?, prioridad=? " .
            "WHERE username=?";

        // Preparar la sentencia
        $cmd = wai_database::getInstance()->getDb()->prepare($consulta);

        // Relacionar y ejecutar la sentencia
        $cmd->execute(array($titulo, $descripcion, $fechaLim, $categoria, $prioridad, $username));

        return $cmd;
    }

    /**
     * Insertar una nueva meta
     *
     * @param $titulo      titulo del nuevo registro
     * @param $descripcion descripción del nuevo registro
     * @param $fechaLim    fecha limite del nuevo registro
     * @param $categoria   categoria del nuevo registro
     * @param $prioridad   prioridad del nuevo registro
     * @return PDOStatement
     */
    public static function insert(
        $titulo,
        $descripcion,
        $fechaLim,
        $categoria,
        $prioridad
    )
    {
        // Sentencia INSERT
        $comando = "INSERT INTO meta ( " .
            "titulo," .
            " descripcion," .
            " fechaLim," .
            " categoria," .
            " prioridad)" .
            " VALUES( ?,?,?,?,?)";

        // Preparar la sentencia
        $sentencia = wai_database::getInstance()->getDb()->prepare($comando);

        return $sentencia->execute(
            array(
                $titulo,
                $descripcion,
                $fechaLim,
                $categoria,
                $prioridad
            )
        );

    }

    /**
     * Eliminar el registro con el identificador especificado
     *
     * @param $username identificador de la meta
     * @return bool Respuesta de la eliminación
     */
    public static function delete($username)
    {
        // Sentencia DELETE
        $comando = "DELETE FROM meta WHERE username=?";

        // Preparar la sentencia
        $sentencia = wai_database::getInstance()->getDb()->prepare($comando);

        return $sentencia->execute(array($username));
    }
}

?>