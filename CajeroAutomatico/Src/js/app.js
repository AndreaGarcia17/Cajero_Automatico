
//Variables globales
let usuario;
let contraseña;





document.addEventListener("DOMContentLoaded", function() {//Evento que se produce cuando el Dom se ha cargado
    iniciarApp(); //Función que manda llamar a otras funciones
    
});


function iniciarApp(){

    mostrarSecciones();
    validarFormulario();
    validarPin();
    login();
    consultarSaldo();
    retirar();
    cerrarSesion();
    regresar();
    RegresarRetirar()

    
}

//Muestra el formulario de ingreso de seción del cliente o administrativo en función de la opción seleccionada

function mostrarSecciones(){
   
   const buttonCliente=document.querySelector('#ingresar-cliente');
   const seccionAdministrativo=document.querySelector('#administrativo');

    const seccionCliente=document.querySelector('#cliente');

   buttonCliente.addEventListener('click',function(e){
        e.preventDefault();
        
     
        const seccionPrevia=document.querySelector('.ocultar-seccion');
        
            seccionPrevia.classList.remove('ocultar-seccion'); 
            seccionAdministrativo.classList.add('ocultar-seccion');

   });

  
   

}



//Rectifica que los campos de los formularios hayan sido llenados.
function validarFormulario(){

   //Validación para el formulario del administrador
    const iniciarSesionAdministrativo=document.querySelector('#iniciar-administrativo');

    iniciarSesionAdministrativo.addEventListener('click',e=>{
        e.preventDefault();
        const nombreUsuario=document.querySelector('#cuenta');
        const passwordCuenta=document.querySelector('#password-administrativo');

     
        if( passwordCuenta.value==='' || nombreUsuario.value===''){
            mostrarAlerta("Debe rellenar todos los campos","error",1);
        }

    })


    //Validación para el formulario del cliente.
        const iniciarSesion=document.querySelector('#iniciar-sesion');

    iniciarSesion.addEventListener('click',e=>{
        e.preventDefault();
        const usuario=document.querySelector('#numero-tarjeta');
        const pin=document.querySelector('#pin');
    

        if(usuario.value==='' || pin.value===''){
            mostrarAlerta("Debe rellenar todos los campos","error",0);
        }

    
        
        
    })

}
//Valida que la extensión del pin no sea mayor a 4 digítos

function validarPin(){
    const pin=document.querySelector('#pin');
    pin.addEventListener('input',e=>{
        if(e.target.value.length>4 || e.target.value.length<4 ){
            mostrarAlerta("El tamaño del pin debe de ser de 4 digítos","error",0);
        }
        
    });
}

//Muestra mensaje de alerta al introducir algún valor no válido en el formulario

    function mostrarAlerta(mensaje, tipo,auxiliar){

        //Si hay una alerta previa, no se define otra
        const alertaPrevia=document.querySelector('.alerta');
    
        if(alertaPrevia){
            return; //frena la ejecución de la función al detectar un div alerta ya definido
        }
        
       
        const alerta=document.createElement('DIV');
        alerta.textContent=mensaje;
        alerta.classList.add('alerta');
    
        if(tipo==='error'){
            alerta.classList.add('error');

        }
    
        //Insertar en el Html


        if(auxiliar==1){
            const formulario=document.querySelector('#formulario-alerta');
            formulario.appendChild(alerta);

        }else{
            const formulario=document.querySelector('#formulario-alerta2');
            formulario.appendChild(alerta);
        }
       
    
        //Eliminar la alerta del Html 
        setTimeout(()=>{
            alerta.remove();
        },3000)
    
    }



    //---------------------------------Login de la cuenta de Cliente via AJAX---------------------------------------------------------------------------

    function login(){
        document.querySelector('#iniciar-sesion').addEventListener('click',function(e){
            //Se obtienen los valores de los campos de nuestro formulario
            usuario=document.querySelector('#numero-tarjeta').value;
            pin=document.querySelector('#pin').value;
            
        
            ConectarAjaxCuenta();
        })
     

    }
 
    

    
    //Login del formulario del cliente via Comunicacion AJAX con la base de datos(Tabla cuenta)
    function ConectarAjaxCuenta(){
        
        const xhtpp=new XMLHttpRequest;
        
     //Se abre conexión con el servidor para el intercambio de información con la base de datos.
     xhtpp.open('GET','Controlador/login/cuenta.php',true);
 
 
     //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
     xhtpp.onreadystatechange=function(){ 
         if(this.readyState == 4 && this.status == 200){ 
 
            const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
             arreglo.forEach(cuenta => {
                 
                
                if(cuenta.pin==pin && cuenta.NumeroTarjeta==usuario){

                   const seccion=document.querySelector('#cliente');
                   seccion.classList.add('ocultar-seccion');
        
                   const menu=document.querySelector('#contenedor-menu');
                   menu.classList.remove('ocultar-seccion');
        
                   const heading=document.querySelector('#heading');
                   heading.classList.add('ocultar-seccion');
                    
        
                }else{
                   mostrarAlerta('Error en la autentificación','error',0);
                }
                   
        
            });
         }
         
     }
     
 
     //Se envia la petición al servidor
     xhtpp.send();

     


    }


    
    //Función que cierra sesión de una cuenta
    function cerrarSesion(){
        
        const cerrarSesion=document.querySelector('#cerrar-sesion');
        cerrarSesion.addEventListener('click',function(){
            const seccion=document.querySelector('#administrativo');
            seccion.classList.remove('ocultar-seccion');

            const menu=document.querySelector('#contenedor-menu');
            menu.classList.add('ocultar-seccion');

            const heading=document.querySelector('#heading');
            heading.classList.remove('ocultar-seccion');

        })

    }

 //---------------------------------Fin login-------------------------------------------------------    


    


//----------------------------Consulta de Saldo Via AJAX--------------------------------------------------------------

    function consultarSaldo(){
        const consultarSaldo=document.querySelector('#consultar-saldo');
        consultarSaldo.addEventListener('click',function(){
            ConectarAjaxCuentaConsulta();
        })

    }


    //----------------------------Conexión via AJAX con las tablas de la base de datos(Cuenta,Cliente,Tarjeta)-------------------------------------------

    //Conexión con Cuenta

    function ConectarAjaxCuentaConsulta(){
        
        const xhtpp=new XMLHttpRequest;
        
     //Se abre conexión con el servidor para el intercambio de información con la base de datos.
     xhtpp.open('GET','Controlador/consultaSaldo/consulta.php',true);
 
 
     //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
     xhtpp.onreadystatechange=function(){ 
         if(this.readyState == 4 && this.status == 200){ 
 
            const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
            console.log(arreglo);
             arreglo.forEach(cuenta => {
                 if(cuenta.pin==pin && cuenta.NumeroTarjeta==usuario){

                    const seccionConsultar=document.querySelector('#seccion-consultar');
                    seccionConsultar.classList.remove('ocultar-seccion');

                   const menu=document.querySelector('#contenedor-menu');
                   menu.classList.add('ocultar-seccion');
        
                   const heading=document.querySelector('#heading');
                   heading.classList.add('ocultar-seccion');

                   const boton=document.querySelector('#contenedor-bottonRegresar');
                   boton.classList.remove('ocultar-seccion');

                    
                     
                     const nombre=cuenta.nombre;
                     const apellidoPaterno=cuenta.apellido_paterno;
                     const apellidoMaterno=cuenta.apellido_materno;
                     const fechaExpiracion=cuenta.FechaExpiracion;
                     const saldo=cuenta.saldo;

                     const parrafo=document.createElement('P');
                     const parrafo2=document.createElement('P');
                     const parrafo3=document.createElement('P')
                     
                    const consultaPrevia=document.querySelector('.contenedor-consulta');

                 
    
                    if(consultaPrevia){
                        consultaPrevia.remove();
   
                    }
                

                     const div=document.createElement('DIV');
                     div.classList.add('contenedor-consulta');


                     parrafo.innerHTML=`Buen día ${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
                     div.appendChild(parrafo);
                     
                     parrafo2.innerHTML=` Su saldo es de <span> $ ${saldo}</span>`;
                     div.appendChild(parrafo2);

            
                     parrafo3.innerHTML=`Le recordamos que su tarjeta  <span>${usuario}</span> expira el <span>${fechaExpiracion}</span>`;
                     div.appendChild(parrafo3);

                     seccionConsultar.appendChild(div);
                     
                    
                 }
                 
                
             
        
            });
         }
         
     }
     
 
     //Se envia la petición al servidor
     xhtpp.send();


    }


    //Función que retorna al menu principal de operaciones
    function regresar(){
        
        const regresar=document.querySelector('#regresar');
        regresar.addEventListener('click',function(){

            const menu=document.querySelector('#contenedor-menu');
            menu.classList.remove('ocultar-seccion');

            const seccionConsultar=document.querySelector('#seccion-consultar');
            seccionConsultar.classList.add('ocultar-seccion');

            const boton=document.querySelector('#contenedor-bottonRegresar');
                   boton.classList.add('ocultar-seccion');

        })

    }

   //--------------Fin funcionalidad de consultar Saldo--------------------------------------------------------------------
   

    


    //-----------------------Función para realizar retiros en una cuenta  Via Ajax-----------------------------------------

    function retirar(){ 
        const retirar=document.querySelector('#retirar');
        retirar.addEventListener('click',function(){
            ConectarAjaxRetirar();
        })

    }


//----------------------------Conexión via Ajax con la tabla de cuenta-----------------------------------------------------------


function ConectarAjaxRetirar(){
        
    const xhtpp=new XMLHttpRequest;

    
 //Se abre conexión con el servidor para el intercambio de información con la base de datos.
 xhtpp.open('GET','Controlador/retirar/retirar.php',true);


 //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
 xhtpp.onreadystatechange=function(){ 
     if(this.readyState == 4 && this.status == 200){ 

        const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de retirar.php a un arreglo de javaScript
        console.log(arreglo);
         arreglo.forEach(cuenta => {
             if(cuenta.pin==pin && cuenta.NumeroTarjeta==usuario){



               const menu=document.querySelector('#contenedor-menu');
               menu.classList.add('ocultar-seccion');
    
               const heading=document.querySelector('#heading');
               heading.classList.add('ocultar-seccion');

               const boton=document.querySelector('#contenedor-bottonRetirar');
               boton.classList.remove('ocultar-seccion');

               const seccionRetirar=document.querySelector('#contenedor-retirar');
               seccionRetirar.classList.remove('ocultar-seccion');

                const aceptar=document.querySelector('#contenedor-aceptar');
                aceptar.classList.remove('ocultar-seccion');

                const saldo=cuenta.saldo;
                let saldoRetirar;
                const cantidad=document.querySelector('#menu-retirar');
               
                cantidad.addEventListener('click',e=>{
                    const opcion=e.target;
                    console.log(opcion);
                    saldoRetirar=e.target.value;
                
                    const Aceptar=document.querySelector('#aceptar-retiro');
                    Aceptar.addEventListener('click',()=>{
                        if(saldo>=saldoRetirar){
                            let nuevoSaldo=saldo-saldoRetirar;
                            console.log(nuevoSaldo);
                        }else{
                            console.log("No tienes fondos suficientes");
                        }
                        
                    })
                  
                })

                
                
                

                


                 
                const consultaPrevia=document.querySelector('.contenedor-consulta');

             

                if(consultaPrevia){
                    consultaPrevia.remove();

                }
            

                 const div=document.createElement('DIV');
                 div.classList.add('contenedor-consulta');


                 parrafo.innerHTML=`Buen día ${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
                 div.appendChild(parrafo);
                 
                 parrafo2.innerHTML=` Su saldo es de <span> $ ${saldo}</span>`;
                 div.appendChild(parrafo2);

        
                 parrafo3.innerHTML=`Le recordamos que su tarjeta  <span>${numeroTarjeta}</span> expira el <span>${fechaExpiracion}</span>`;
                 div.appendChild(parrafo3);

                 seccionConsultar.appendChild(div);
                 
                
            }
    
        });
     }
     
 }
 

 //Se envia la petición al servidor
 xhtpp.send();


}
   
//Regresar al menu principal
function RegresarRetirar(){
    const regresar=document.querySelector("#contenedor-bottonRetirar");
    regresar.addEventListener('click',function(){

        const boton=document.querySelector('#contenedor-bottonRetirar');
        boton.classList.add('ocultar-seccion');
        

        const menuOperaciones=document.querySelector('#contenedor-menu');
        menuOperaciones.classList.remove('ocultar-seccion');

        const seccionRetirar=document.querySelector('#contenedor-retirar');
        seccionRetirar.classList.add('ocultar-seccion');

        const aceptar=document.querySelector('#contenedor-aceptar');
        aceptar.classList.add('ocultar-seccion');
    })
}
    
