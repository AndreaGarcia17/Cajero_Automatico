<?php


    try {

        //Se Importa la conexión con la base de datos
        require'../login/database.php';
        $db->set_charset("utf8"); 


    

        //Se escribe la consulta SQL para actualizar los registros de la tabla con el nuevo saldo
        $sql="UPDATE cuenta  SET saldo=".$_GET["nuevoSaldo"]." WHERE NumeroTarjeta=".$_GET['usuario'].";";

        //Se aplica la consulta en la base de datos
        mysqli_query($db,$sql);



        //Consulta para acceder a la información de los datos actualizados 
        $sql2="SELECT * FROM cuenta WHERE NumeroTarjeta=".$_GET['usuario'].";";

        $consulta=mysqli_query($db,$sql2);

        //Arreglo vacio
       $cuenta=[];

       $i=0;


       //Se obtienen los resultados
       while($registro=mysqli_fetch_assoc($consulta)){

           //Tabla cuenta
           $cuenta[$i]['NumeroTarjeta']=$registro['NumeroTarjeta'];
           $cuenta[$i]['pin']=$registro['pin'];
           $cuenta[$i]['saldo']=$registro['saldo'];



       $i++;
      
       }


       echo json_encode($cuenta);




    }catch (\Throwable $th) {
        
        var_dump($th);
    }



