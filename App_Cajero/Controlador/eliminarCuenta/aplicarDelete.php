 <?php
 
 try {

        //Se Importa la conexión con la base de datos
         require'../login/database.php';
        $db->set_charset("utf8"); 

        
        //Se escribe la consulta SQL para insertar registros en la tabla de operación
        $sql="DELETE FROM cliente WHERE id=".$_GET['clienteId'].";";

        //Se aplica la consulta en la base de datos
        mysqli_query($db,$sql);




        



    }catch (\Throwable $th) {
        
        var_dump($th);
    }



