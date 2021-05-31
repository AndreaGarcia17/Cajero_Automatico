<?php

function obtenerConsulta():array{
    try {

        //Se Importa la conexión con la base de datos
        require'../login/database.php';
        $db->set_charset("utf8"); 


    

        //Se escribe la consulta SQL
        $sql="SELECT * FROM cuenta LEFT JOIN cliente ON cuenta.clienteId=cliente.id;";

        $consulta=mysqli_query($db,$sql);

         //Arreglo vacio
        $cuenta=[];

        $i=0;


        //Se obtienen los resultados
        while($registro=mysqli_fetch_assoc($consulta)){
            
          
            //Tabla cuenta
            $cuenta[$i]['NumeroTarjeta']=$registro['NumeroTarjeta'];
            $cuenta[$i]['FechaExpiracion']=$registro['FechaExpiracion'];
            $cuenta[$i]['pin']=$registro['pin'];
            $cuenta[$i]['saldo']=$registro['saldo'];
            $cuenta[$i]['administradorId']=$registro['administradorId'];
            $cuenta[$i]['clienteId']=$registro['clienteId'];
            
            //Tabla cliente
            $cuenta[$i]['nombre']=$registro['nombre'];
            $cuenta[$i]['apellido_paterno']=$registro['apellido_paterno'];
            $cuenta[$i]['apellido_materno']=$registro['apellido_materno'];


        $i++;
       
        }

        return $cuenta;



    }catch (\Throwable $th) {
        
        var_dump($th);
    }

}

obtenerConsulta();