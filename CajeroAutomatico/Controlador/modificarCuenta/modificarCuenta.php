<?php


try {

    //Se Importa la conexión con la base de datos
    require'../login/database.php';
    $db->set_charset("utf8"); 



     //Consulta que añade un registro en la tabla cliente
     $sql="UPDATE  cliente SET nombre=".$_GET['nombre']." WHERE id=".$_GET['clienteId'];
     $sql2="UPDATE  cliente SET apellido_paterno=".$_GET['apellido_paterno']." WHERE id=".$_GET['clienteId'];
     $sql3="UPDATE  cliente SET apellido_materno=".$_GET['apellido_materno']." WHERE id=".$_GET['clienteId'];

     $sql4="UPDATE  cuenta SET NumeroTarjeta=".$_GET['NumeroTarjeta']." WHERE clienteId=".$_GET['clienteId'];
     $sql5="UPDATE  cuenta SET pin=".$_GET['pin']." WHERE clienteId=".$_GET['clienteId'];
     $sql6="UPDATE  cuenta SET saldo=".$_GET['saldo']." WHERE clienteId=".$_GET['clienteId'];
     $sql7="UPDATE  cuenta SET FechaExpiracion=".$_GET['FechaExpiracion']." WHERE clienteId=".$_GET['clienteId'];
     
     mysqli_query($db,$sql);
     mysqli_query($db,$sql2);
     mysqli_query($db,$sql3);
     mysqli_query($db,$sql4);
     mysqli_query($db,$sql5);
     mysqli_query($db,$sql6);
     mysqli_query($db,$sql7);
   




    //Se escribe la consulta sql para añadir un registro en la tabla cuenta
    $sql2="INSERT INTO  cuenta (NumeroTarjeta,pin,FechaExpiracion,saldo,clienteId,administradorId) VALUES (".$_GET['NumeroTarjeta'].","
    .$_GET['pin'].",".$_GET['FechaExpiracion'].",".$_GET['saldo'].",".$_GET['clienteId'].",".$_GET['administradorId'].");";

    mysqli_query($db,$sql2);

  


  

  


}catch (\Throwable $th) {
    
    var_dump($th);
}

