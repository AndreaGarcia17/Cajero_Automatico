<?php


    try {

        //Se Importa la conexión con la base de datos
         require'../login/database.php';
        $db->set_charset("utf8"); 

        
        //Se escribe la consulta SQL para insertar registros en la tabla de operación
        $sql="INSERT INTO operacion (accion,Nombre_T,ApellidoP_T,ApellidoM_T,CuentaTransferir,folio,nuevoSaldo,saldoDepositar)  VALUES(".$_GET["accion"].","
        .$_GET["Nombre_T"].",".$_GET['ApellidoP_T'].",".$_GET['ApellidoM_T'].",".$_GET['CuentaTransferir'].",".$_GET["folio"].$_GET["nuevoSaldo"].$_GET['saldoTransferir'].");";

        //Se aplica la consulta en la base de datos
        mysqli_query($db,$sql);




        



    }catch (\Throwable $th) {
        
        var_dump($th);
    }
