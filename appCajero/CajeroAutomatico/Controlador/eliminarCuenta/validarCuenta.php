<?php

 try {



    //Se Importa la conexión con la base de datos
    require'../login/database.php';
    $db->set_charset("utf8"); 



  //-----------------------------------Consulta para unir las tablas y acceder conjuntamente a la información-----------------------

  $sql="SELECT * FROM cuenta 
  LEFT JOIN cliente ON cuenta.clienteId=cliente.id;";

  $consulta=mysqli_query($db,$sql);



 //Se obtienen los resultados

  //Arreglo vacio
  $cuenta=[];

  $w=0;
  
 while($registro=mysqli_fetch_assoc($consulta)){

     $cuenta[$w]['id']=$registro['id'];

       //Tabla cuenta
       $cuenta[$w]['NumeroTarjeta']=$registro['NumeroTarjeta'];
       $cuenta[$w]['administradorId']=$registro['administradorId'];
       $cuenta[$w]['clienteId']=$registro['clienteId'];
       
       //Tabla cliente
       $cuenta[$w]['nombre']=$registro['nombre'];
       $cuenta[$w]['apellido_paterno']=$registro['apellido_paterno'];
       $cuenta[$w]['apellido_materno']=$registro['apellido_materno'];

    
       


 $w++;

 } 



echo json_encode($cuenta);






}catch (\Throwable $th) {
 
 var_dump($th);
}