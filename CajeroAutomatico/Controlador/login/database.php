<?php

//Conexión con la base de datos
$db=mysqli_connect("localhost","root","root","appcajero");

//Condicional empleado para corroborar de que se hata conectado correctamente a esta.
if(!$db){
    echo "Error en la conexión";
    exit;
}
    //echo "conexion correcta";

    