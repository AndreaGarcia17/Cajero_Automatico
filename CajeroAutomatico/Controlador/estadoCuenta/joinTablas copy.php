<?php


    try {



           //Se Importa la conexión con la base de datos
           require'../login/database.php';
           $db->set_charset("utf8"); 



         //-----------------------------------Consulta para unir las tablas y acceder conjuntamente a la información-----------------------

         $sql="SELECT * FROM cuentaoperacion 
         LEFT JOIN operacion ON cuentaoperacion.operacionId=operacion.id 
         LEFT JOIN cuenta ON cuentaoperacion.cuentaId=cuenta.NumeroTarjeta
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
              $cuenta[$w]['FechaExpiracion']=$registro['FechaExpiracion'];
              $cuenta[$w]['pin']=$registro['pin'];
              $cuenta[$w]['saldo']=$registro['saldo'];
              $cuenta[$w]['administradorId']=$registro['administradorId'];
              $cuenta[$w]['clienteId']=$registro['clienteId'];
              
              //Tabla cliente
              $cuenta[$w]['nombre']=$registro['nombre'];
              $cuenta[$w]['apellido_paterno']=$registro['apellido_paterno'];
              $cuenta[$w]['apellido_materno']=$registro['apellido_materno'];
 
              //Tabla operacion
              $cuenta[$w]['fecha']=$registro['fecha'];
              $cuenta[$w]['accion']=$registro['accion'];
              $cuenta[$w]['nuevoSaldo']=$registro['nuevoSaldo'];
              $cuenta[$w]['saldoRetirar']=$registro['saldoRetirar'];
              $cuenta[$w]['saldoDepositar']=$registro['saldoDepositar'];
              $cuenta[$w]['Nombre_T']=$registro['Nombre_T'];
              $cuenta[$w]['ApellidoP_T']=$registro['ApellidoP_T'];
              $cuenta[$w]['ApellidoM_T']=$registro['ApellidoM_T'];
              $cuenta[$w]['Fecha_T']=$registro['Fecha_T'];
              $cuenta[$w]['pinAnterior']=$registro['pinAnterior'];
              $cuenta[$w]['pinNuevo']=$registro['pinNuevo'];
              $cuenta[$w]['folio']=$registro['folio'];
 
        $w++;
       
        } 
        
 
       echo json_encode($cuenta);
 





    }catch (\Throwable $th) {
        
        var_dump($th);
    }