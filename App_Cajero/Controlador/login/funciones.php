<?php

function obtenerServicios():array{
    try {

        //Se Importa la conexión con la base de datos
        require'database.php';
        $db->set_charset("utf8"); 

    

        //Se escribe la consulta SQL
        $sql="SELECT * FROM cuenta;";
        $consulta=mysqli_query($db,$sql);

         //Arreglo vacio
        $cuenta=[];

        $i=0;


        //Se obtienen los resultados
       while($registro=mysqli_fetch_assoc($consulta)){
            $cuenta[$i]['pin']=$registro['pin'];
            $cuenta[$i]['NumeroTarjeta']=$registro['NumeroTarjeta'];
            $cuenta[$i]['saldo']=$registro['saldo'];
            $cuenta[$i]['administradorId']=$registro['administradorId'];
            $cuenta[$i]['clienteId']=$registro['clienteId'];

        $i++;

       }
       return $cuenta;



    }catch (\Throwable $th) {
        
        var_dump($th);
    }

}

obtenerServicios();