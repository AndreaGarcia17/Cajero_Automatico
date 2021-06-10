<?php


    try {

        //Se Importa la conexión con la base de datos
         require'../login/database.php';
        $db->set_charset("utf8"); 

        
        //Se escribe la consulta SQL para insertar registros en la tabla de operación
        $sql="INSERT INTO operacion (accion,nuevoSaldo)  VALUES (".$_GET["accion"].",".$_GET["nuevoSaldo"].");";

        //Se aplica la consulta en la base de datos
        mysqli_query($db,$sql);




        



    }catch (\Throwable $th) {
        
        var_dump($th);
    }



