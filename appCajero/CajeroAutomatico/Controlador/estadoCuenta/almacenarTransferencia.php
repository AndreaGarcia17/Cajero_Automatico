<?php


    try {

        //Se Importa la conexión con la base de datos
         require'../login/database.php';
        $db->set_charset("utf8"); 

        
        //Se escribe la consulta SQL para insertar registros en la tabla de operación
        $sql="INSERT INTO operacion (accion,CuentaTransferir,nuevoSaldo,saldoRetirar,folio)  VALUES (".$_GET["accion"].","
        .$_GET["usuarioTransferir"].",".$_GET['nuevoSaldo'].",".$_GET['saldoTransferir'].",".$_GET['folio'].");";

        //Se aplica la consulta en la base de datos
        mysqli_query($db,$sql);




        



    }catch (\Throwable $th) {
        
        var_dump($th);
    }
