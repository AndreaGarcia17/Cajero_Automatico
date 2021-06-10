<?php


    try {

        //Se Importa la conexión con la base de datos
        require'../login/database.php';
        $db->set_charset("utf8"); 



         //Consulta que añade un registro en la tabla cliente
         $sql="INSERT INTO  cliente (id,nombre,apellido_paterno,apellido_materno) VALUES (".$_GET['clienteId'].","
         .$_GET['nombre'].",".$_GET['apellido_paterno'].",".$_GET['apellido_materno'].");";
 
         mysqli_query($db,$sql);

    

        //Se escribe la consulta sql para añadir un registro en la tabla cuenta
        $sql2="INSERT INTO  cuenta (NumeroTarjeta,pin,FechaExpiracion,saldo,clienteId,administradorId) VALUES (".$_GET['NumeroTarjeta'].","
        .$_GET['pin'].",".$_GET['FechaExpiracion'].",".$_GET['saldo'].",".$_GET['clienteId'].",".$_GET['administradorId'].");";

        mysqli_query($db,$sql2);

      


      

      


    }catch (\Throwable $th) {
        
        var_dump($th);
    }

