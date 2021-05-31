<?php


    try {

        //Se Importa la conexión con la base de datos
         require'../login/database.php';
        $db->set_charset("utf8"); 

    
        
        //-----------------------------Se escribe la consulta SQL para obtener los id de la tabla operación---------------------------------------------------

        $sql="SELECT * FROM operacion ORDER BY id DESC LIMIT ".$_GET['numeroAcciones'].";";

        //Se aplica la consulta en la base de datos
        $consulta=mysqli_query($db,$sql);


         //Arreglo vacio
         $arreglo=[];

         $i=0;
 
 
         //Se obtienen los id de la consulta de la tabla operación
         while($operacion=mysqli_fetch_assoc($consulta)){
            
                $arreglo[$i]=$operacion['id'];
 
         $i++;
        
         }

        //------------------------------------Se escribe la consulta para llenar la tabla pivote de cuentaoperacion---------------------------------

         $j=0;
         while($j<count($arreglo)){

             //Operación que inserta valores en la tabla cuentaoperacion
             $sql2="INSERT INTO cuentaoperacion (operacionId,cuentaId) VALUES (".$arreglo[$j].",".$_GET['usuario'].");";
            
             //Se aplica en la base de datos
            mysqli_query($db,$sql2);

            $j++;
         }



    }catch (\Throwable $th) {
        
        var_dump($th);
    }
