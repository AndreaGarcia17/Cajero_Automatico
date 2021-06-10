
//Variables globales
let usuario;
let pin;
let saldo;
let accion="";//Variable que almacena la acción ejecutada por el usuario.
let numeroAcciones=0;//Variable que almacena el número de operaciones que efectua un usuario durante su sesión.





document.addEventListener("DOMContentLoaded", function() {//Evento que se produce cuando el Dom se ha cargado
    iniciarApp(); //Función que manda llamar a otras funciones
    
});


function iniciarApp(){
//Funcionalidades del lado del usuario.
    mostrarSeccionesCuadro();    
    mostrarSecciones();

    validarFormulario();
    login();

    consultarSaldo();

    retirar();
    SolicitarCantidadRetirar();
    aceptarRetiro();

    depositar();
    SolicitarCantidadDepositar();
    aceptarDeposito();

    transferirCuenta();
    loginTransferir();
    SolicitarCantidadTransferir();
    aceptarTransferencia();

    cambiarPin();
    loginCambiarPin();

    ImprimirEstadoCuenta();
    
   

    cerrarSesion();
    regresar();
    RegresarRetirar();
    RegresarDepositar();
    regresarTransferir();
    regresarTransferirLogin();
    regresarLoginCambiarPin();
    regresarCambiarPin();
    regresarEstadoCuenta();


//Funcionalidades del lado del administrativo
    mostrarSeccionesAdmi();
    loginAdministrador();

    crearCuenta();
    validarInputs();

    eliminarCuenta();
    validarEliminar();

    modificarCuenta();
    validarCuentaModificar();
    validarModificar();
  
    

    cerrarSesionAdministrador();
    regresarCrear();
    aceptarCuentaCreada();

    regresarEliminar();
    aceptarCuentaEliminada();

    regresarModificar1();
    regresarModificar();
    aceptarCuentaModificada();
    
}



//--------------------------------------------------Inicio definición funcionalidades del lado del cliente----------------------------------

//Muestra el formulario de ingreso de sesión del cliente o administrativo en función de la opción seleccionada
function mostrarSeccionesCuadro(){
    const buttonCliente=document.querySelector('#botton-cliente');
  

    buttonCliente.addEventListener('click',function(e){
         e.preventDefault();
         

             const seccionCuadroOperaciones=document.querySelector('#header')
 
             const seccionCliente=document.querySelector('#cliente');
         
             seccionCliente.classList.remove('ocultar-seccion');
             seccionCuadroOperaciones.classList.add('ocultar-seccion');
 
            
 
 
    });


    const buttonAdministrativo=document.querySelector('#botton-administrativo');
  

    buttonAdministrativo.addEventListener('click',function(e){
         e.preventDefault();
         
             const seccionCuadro=document.querySelector('#header');
 
             const seccionAdministrativo=document.querySelector('#administrativo');
         
             seccionCuadro.classList.add('ocultar-seccion'); 
             seccionAdministrativo.classList.remove('ocultar-seccion');
 
            
 
 
    });
 
}

function mostrarSecciones(){
   
   const buttonCliente=document.querySelector('#ingresar-cliente');
  

   buttonCliente.addEventListener('click',function(e){
        e.preventDefault();
        
            const seccionAdministrativo=document.querySelector('#administrativo');

            const seccionCliente=document.querySelector('#cliente');
        
            seccionAdministrativo.classList.add('ocultar-seccion'); 
            seccionCliente.classList.remove('ocultar-seccion');

            document.querySelector('#cuenta').value=null;
            document.querySelector('#password-administrativo').value=null;


   });

   const buttonAdministrativo=document.querySelector('#seccion-admi');
  

   buttonAdministrativo.addEventListener('click',function(e){
        e.preventDefault();
        
            const seccionAdministrativo=document.querySelector('#administrativo');

            const seccionCliente=document.querySelector('#cliente');
        
            seccionCliente.classList.add('ocultar-seccion'); 
            seccionAdministrativo.classList.remove('ocultar-seccion');

            document.querySelector('#numero-tarjeta').value=null;
            document.querySelector('#pin').value=null;


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

        if(usuario.value.length<9||usuario.value.length>9){
            mostrarAlerta("El numero de tarjeta debe ser de 9 dígitos","error",0);
        }

        if(pin.value.length>4 || pin.value.length<4 ){
            mostrarAlerta("El tamaño del pin debe de ser de 4 digítos","error",0);
        }

    
        
        
    })

}




//Muestra mensaje de alerta al introducir algún valor no válido en el formulario

    function mostrarAlerta(mensaje,tipo,auxiliar){

        //Si hay una alerta previa, no se define otra
        const alertaPrevia=document.querySelector('.alerta');
    
        if(alertaPrevia){
            return; //frena la ejecución de la función al detectar un div alerta ya definido
        }
        
       
        const alerta=document.createElement('DIV');
        alerta.textContent=mensaje;
        alerta.classList.add('alerta');

        if(tipo=="error"){
            alerta.classList.add('error');

        }
        
    
    
    

        
    
        //Insertar en el Html


        if(auxiliar==1){
            const formulario=document.querySelector('#formulario-alerta');
            formulario.appendChild(alerta);

        }else if(auxiliar==2){
            const formulario=document.querySelector('#formulario-transferir');
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

                    saldo=cuenta.saldo;
                    
                   const seccion=document.querySelector('#cliente');
                   seccion.classList.add('ocultar-seccion');
        
                   const menu=document.querySelector('#contenedor-menu');
                   menu.classList.remove('ocultar-seccion');
        
                   const heading=document.querySelector('#heading');
                   heading.classList.add('ocultar-seccion');

                   if(cuenta.NumeroTarjeta==usuarioTransferir){
                        console.log("El usuario que recibe la transferencia es:"+usuarioTransferir)

                       conectarAjaxCliente();
                      
                   }
                    
        
                }else{
                   mostrarAlerta('Error en la autentificación','error',0);
                }
                   
        
            });
         }
         
     }
     
 
     //Se envia la petición al servidor
     xhtpp.send();

     


    }


    //Función que conecta con la tabla de cliente
    function conectarAjaxCliente(){
        console.log("hechoooo perro")
        console.log(usuarioTransfiere);
        

    const xhtpp=new XMLHttpRequest;


        
    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/consultaSaldo/consulta.php',true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
       if(this.readyState == 4 && this.status == 200){ 
            arreglo=JSON.parse(this.responseText);

            console.log("hechooooo")

            arreglo.forEach(elemento=>{
                if(elemento.NumeroTarjeta==usuarioTransferir){
                    accion="'Recibe transferencia'";
                     let Nombre_T=elemento.nombre;
                     let ApellidoP_T=elemento.apellido_paterno;
                     let ApellidoM_T=elemento.apellido_materno;
                     let saldo_T=elemento.saldo;
                     Nombre_T=`'${Nombre_T}'`;
                     ApellidoP_T=`'${ApellidoP_T}'`;
                     ApellidoM_T=`'${ApellidoM_T}'`;
                        console.log(Nombre_T)
                        console.log(ApellidoP_T);
                        console.log(ApellidoM_T);
                        console.log(saldo_T);
                        saldoTransferir=saldoTransferir.toString();

                        console.log(saldoTransferir);
                        
                     almacenarTransferenciaRecibida(Nombre_T,ApellidoP_T,ApellidoM_T,saldoTransferir,saldo_T);

                }
            })

                   
       }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();

       
    }





    
    //Función que cierra sesión de una cuenta
    function cerrarSesion(){
        
        const cerrarSesion=document.querySelector('#cerrar-sesion');
        cerrarSesion.addEventListener('click',function(){
          

            const menu=document.querySelector('#contenedor-menu');
            menu.classList.add('ocultar-seccion');

            const heading=document.querySelector('#heading');
            heading.classList.remove('ocultar-seccion');

            const contenedorOperaciones=document.querySelector('#header');
            contenedorOperaciones.classList.remove('ocultar-seccion');

            document.querySelector('#numero-tarjeta').value=null;
            document.querySelector('#pin').value=null;
            document.querySelector('#cuenta').value=null;

            //Se resetea el número de acciones ejecutadas por el usuario y se almacenan las ya efectuadas.
            console.log(numeroAcciones);
            if(numeroAcciones==0){
                return;
            }else{
                tablaPivote();
                numeroAcciones=0;
            }
            

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
                     saldo=cuenta.saldo;

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

                      
                     //Añade la acción efectuada en la tabla operación
                     accion="'Efectuó una consulta de saldo'";
                     añadirAccionConsulta(saldo);

                    //Se aumenta en 1 el número de acciones
                    numeroAcciones++;
                     
                    
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

               
            const menu=document.querySelector('#contenedor-menu');
            menu.classList.add('ocultar-seccion');
 
            const heading=document.querySelector('#heading');
            heading.classList.add('ocultar-seccion');

            const boton=document.querySelector('#contenedor-bottonRetirar');
            boton.classList.remove('ocultar-seccion');

            const seccionRetirar=document.querySelector('#contenedor-retirar');
            seccionRetirar.classList.remove('ocultar-seccion');

             const aceptar=document.querySelector('#contenedor-aceptar');
             aceptar.classList.remove('ocultar-seccion')

             const mensaje=document.querySelector('#contenedor-mensajeRetirar');
             mensaje.classList.remove('ocultar-seccion');


            


        })

    }


let saldoRetirar;//Variable global para almacenar el sado a retirar por le usuario
let pintarCuadro=document.querySelector('#menu-retirar');// Variable global empleada para aludir el cuadro de la cantidad seleccionada
let otraCantidad=document.querySelector('#OtraCantidad-retirar');//Alude al cuadro con el input de otra cantidad

function SolicitarCantidadRetirar(){

    const cantidad=document.querySelector('#menu-retirar');
            
    cantidad.addEventListener('click',e=>{
       if(pintarCuadro.classList.contains('pintar-cuadro')){
           pintarCuadro.classList.remove('pintar-cuadro');
           
       }

       if(pintarCuadro.id!='OtraCantidad-retirar'){
            document.querySelector('#OtraCantidad-retirar').value=null;
       }

       if(pintarCuadro.id=='menu-retirar'){
            pintarCuadro.classList.add('pintar-negro');
       }
     
        console.log(e.target.id);
       
        pintarCuadro=document.querySelector("#"+e.target.id);
      
        pintarCuadro.classList.add('pintar-cuadro');
      
        saldoRetirar=parseInt(e.target.value);
        console.log(saldoRetirar);

             
     })
}
            

let tipoRetiro="Exitoso";//Bandera para definir el mensaje de salida en función si el usuario en custión cuenta con saldo para realizar un retiro o no
let operacion="";//Bandera para definir los parámetro a utilizar al llamar la fución de cosultar saldo, cuando se hace un deposito o retiro
//Función aceptar retiro
function aceptarRetiro(){
    const Aceptar=document.querySelector('#aceptar-retiro');
    Aceptar.addEventListener('click',()=>{

        
        pintarCuadro.classList.remove('pintar-cuadro');
        console.log("El saldo es:"+saldo);

        if(saldo>=saldoRetirar){
            tipoRetiro="Exitoso";
            operacion="retiro";
            const nuevoSaldo=saldo-saldoRetirar;
            console.log(nuevoSaldo);
            actualizarSaldo(nuevoSaldo);


             //Añade la acción efectuada en la tabla operación
             accion="'Efectuó un retiro a su cuenta'";
             añadirAccionRetiro(saldoRetirar,nuevoSaldo);

             //Se aumenta en 1 el número de acciones
             numeroAcciones++;
        }else{
            tipoRetiro="error";
            mensajeRetirar();   
            
        }

                        
    })
}


//Función que actualiza el retiro de la tabla de cuenta via Ajax
function actualizarSaldo(nuevoSaldo){
    xhtpp=new XMLHttpRequest;


    usuario=parseInt(usuario);
    xhtpp.open('GET','Controlador/actualizarSaldo/actualizarSaldo.php?nuevoSaldo='+nuevoSaldo+"&usuario="+usuario,true);

    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
            const arreglo=JSON.parse(this.responseText);
            saldo=parseInt(arreglo[0]['saldo']);  

            document.querySelector('#OtraCantidad-retirar').value=null;
            document.querySelector('#OtraCantidad-depositar').value=null;
       
            if(operacion=="retiro"){
                mensajeRetirar();   
                
 
            }else{
              
                mensajeDepositar();
            }
            
            otraCantidad.value=NaN;

        }

    }


    xhtpp.send();
}


//Mostrar mensaje de exito al retirar

function mensajeRetirar(){
    
    console.log("hecho")
    const mensaje=document.querySelector('#contenedor-mensajeRetirar');
    const parrafo=document.createElement('P');
    let texto="";
        console.log(tipoRetiro);
        if(tipoRetiro=='error'){
            texto="No cuenta con fondos suficientes para efectuar esa operacion";
            parrafo.classList.add('mensajeNoRetirar');
        }else{
            
            texto="Su retiro se ha realizado correctamente, su nuevo saldo es: "+saldo;
            parrafo.classList.add('mensajeRetirar');
        }

        parrafo.textContent=texto;
        mensaje.appendChild(parrafo);

    setTimeout(()=>{
        parrafo.remove();
    },3000)

   


}


//Regresar al menu principal
function RegresarRetirar(){
    const regresar=document.querySelector("#contenedor-bottonRetirar");
    regresar.addEventListener('click',function(){

        document.querySelector('#OtraCantidad-retirar').value=NaN;

        pintarCuadro.classList.remove('pintar-cuadro');

        const boton=document.querySelector('#contenedor-bottonRetirar');
        boton.classList.add('ocultar-seccion');
        

        const menuOperaciones=document.querySelector('#contenedor-menu');
        menuOperaciones.classList.remove('ocultar-seccion');

        const seccionRetirar=document.querySelector('#contenedor-retirar');
        seccionRetirar.classList.add('ocultar-seccion');

        const aceptar=document.querySelector('#contenedor-aceptar');
        aceptar.classList.add('ocultar-seccion');

        const mensaje=document.querySelector('#contenedor-mensajeRetirar');
        mensaje.classList.add('ocultar-seccion');


    })
}
//------------------------------------Fin funcionalidad de retirar Saldo-----------------------------------------------------------


//------------------------------------Inicio funcionalidad de depositar Saldo-----------------------------------------------------------

//Muestra la sección depositar al dar click a esa opción en el menu de operaciones

function depositar(){

    const depositar=document.querySelector('#depositar');
     depositar.addEventListener('click',function(){

    const menu=document.querySelector('#contenedor-menu');
    menu.classList.add('ocultar-seccion');

    const heading=document.querySelector('#heading');
    heading.classList.add('ocultar-seccion');

    const boton=document.querySelector('#contenedor-bottonDepositar');
    boton.classList.remove('ocultar-seccion');

    const seccionRetirar=document.querySelector('#contenedor-depositar');
    seccionRetirar.classList.remove('ocultar-seccion');

     const aceptar=document.querySelector('#contenedor-aceptarDeposito');
     aceptar.classList.remove('ocultar-seccion')

     const mensaje=document.querySelector('#contenedor-mensajeDepositar');
     mensaje.classList.remove('ocultar-seccion');



})

}


let saldoDepositar;//Variable global
pintarCuadro=document.querySelector('#menu-depositar');
otraCantidad=document.querySelector('#OtraCantidad-depositar');

function SolicitarCantidadDepositar(){

    const cantidad=document.querySelector('#menu-depositar');
            
    cantidad.addEventListener('click',e=>{
       if(pintarCuadro.classList.contains('pintar-cuadro')){
           pintarCuadro.classList.remove('pintar-cuadro');
           
       }

       if(pintarCuadro.id!='OtraCantidad-depositar'){
            document.querySelector('#OtraCantidad-depositar').value=null;
       }


       if(pintarCuadro.id=='menu-depositar'){
            pintarCuadro.classList.add('pintar-negro');
       }
     
        console.log(e.target.id);
       
        pintarCuadro=document.querySelector("#"+e.target.id);
      
        pintarCuadro.classList.add('pintar-cuadro');
      
        saldoDepositar=parseInt(e.target.value);
        console.log(saldoDepositar);

             
     })
}


//Función aceptar retiro
function aceptarDeposito(){
    const Aceptar=document.querySelector('#aceptar-deposito');
    Aceptar.addEventListener('click',()=>{

        
        pintarCuadro.classList.remove('pintar-cuadro');
        saldo=parseInt(saldo);
        console.log("El saldo es:"+saldo);


            const nuevoSaldo=saldo+saldoDepositar;
            console.log(nuevoSaldo);
            operacion="deposito";
            actualizarSaldo(nuevoSaldo);

             //Añade la acción efectuada en la tabla operación
             accion="'Efectuó un deposito a su cuenta'";
             añadirAccionDeposito(saldoDepositar,nuevoSaldo);

             //Se aumenta en 1 el número de acciones
             numeroAcciones++;
 

                        
    })
}

//Mostrar mensaje de exito al depositar

function mensajeDepositar(){
    
    console.log("hecho")
    const mensaje=document.querySelector('#contenedor-mensajeDepositar');
    const parrafo=document.createElement('P');
    
        
            
    const texto="Su deposito se ha realizado correctamente, su nuevo saldo es: "+saldo;
    parrafo.classList.add('mensajeDepositar');

    parrafo.textContent=texto;
    mensaje.appendChild(parrafo);

    setTimeout(()=>{
        parrafo.remove();
    },3000)


}

//Regresar al menu principal
function RegresarDepositar(){
    const regresar=document.querySelector("#contenedor-bottonDepositar");
    regresar.addEventListener('click',function(){

        document.querySelector('#OtraCantidad-depositar').value=null;
        pintarCuadro.classList.remove('pintar-cuadro');

        const boton=document.querySelector('#contenedor-bottonDepositar');
        boton.classList.add('ocultar-seccion');
        

        const menuOperaciones=document.querySelector('#contenedor-menu');
        menuOperaciones.classList.remove('ocultar-seccion');

        const seccionRetirar=document.querySelector('#contenedor-depositar');
        seccionRetirar.classList.add('ocultar-seccion');

        const aceptar=document.querySelector('#contenedor-aceptarDeposito');
        aceptar.classList.add('ocultar-seccion');

        const mensaje=document.querySelector('#contenedor-mensajeDepositar');
        mensaje.classList.add('ocultar-seccion');


    })
}


//---------------------------------------------------Fin funcionalidad de depositar saldo---------------------------------------------

//-------------------------------------------------Inicio funcionalidad de transferir a una cuenta-----------------------------------
       
//Función muestra la sección transferir cuenta, al momento de dar click a esa opción en el menu de operaciones
function transferirCuenta(){
    const transferirCuenta=document.querySelector('#transferir-cuenta');

    transferirCuenta.addEventListener('click',()=>{
        const menu=document.querySelector('#contenedor-menu');
        menu.classList.add('ocultar-seccion');

        const heading=document.querySelector('#heading');
        heading.classList.add('ocultar-seccion');

        const formularioTransferir=document.querySelector('#formulario-transferir');
        formularioTransferir.classList.remove('ocultar-seccion');



    })

}

function regresarTransferir(){
    const regresar=document.querySelector('#regresar-transferir');

    regresar.addEventListener('click',function(){
        console.log("hecho")
        const menu=document.querySelector('#contenedor-menu');
        menu.classList.remove('ocultar-seccion');


        const formularioTransferir=document.querySelector('#formulario-transferir');
        formularioTransferir.classList.add('ocultar-seccion');

        document.querySelector('#numero-tarjetaTransferir').value=null;
        
    

    })
}
let usuarioTransferir; //Variable global que almacena el número de cuenta introducido por el usuario.
let saldoCuentaTransferir;//Variable global que almacena el saldo actual de la cuenta a transferir

//Función que valida que la cuenta ingresada exista en la base de datos.
function loginTransferir(){

    
    const aceptarTransferencia=document.querySelector('#aceptar-transferencia');

    

    aceptarTransferencia.addEventListener('click',function(e){

        e.preventDefault();

        usuarioTransferir=document.querySelector('#numero-tarjetaTransferir').value;
        

        const xhtpp=new XMLHttpRequest;
        
        //Se abre conexión con el servidor para el intercambio de información con la base de datos.
        xhtpp.open('GET','Controlador/transferir/transferirCuenta.php',true);

         //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
         xhtpp.onreadystatechange=function(){ 
            if(this.readyState == 4 && this.status == 200){ 
                
               const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
               console.log(arreglo)
                arreglo.forEach(cuenta => {

                   
                   if(cuenta.NumeroTarjeta==usuarioTransferir && cuenta.NumeroTarjeta!=usuario){
                        
            

                        saldoCuentaTransferir=cuenta.saldo;
    
                        const seccion=document.querySelector('#formulario-transferir');
                        seccion.classList.add('ocultar-seccion');
           
                        const menu=document.querySelector('#contenedor-transferir');
                        menu.classList.remove('ocultar-seccion');

            
                        const mensajeTransferencia=document.querySelector('#contenedor-mensajeTransferir');
                        mensajeTransferencia.classList.remove('ocultar-seccion');

                         const aceptarTransferenciaMenu=document.querySelector('#contenedor-aceptarTransferencia');
                         aceptarTransferenciaMenu.classList.remove('ocultar-seccion');

                        const regresarTransferir=document.querySelector('#contenedor-bottonRegresarTransferir');
                        regresarTransferir.classList.remove('ocultar-seccion');
                                
           
                   }else{
                      mostrarAlerta('Error en la autentificación','error',2);
                   }
                      
           
               });
            }
            
        }
        
        //Se envia la petición al servidor
        xhtpp.send();

    })
        
    
}



 
let saldoTransferir;//Variable global que almacena la cantidad a transferir
pintarCuadro=document.querySelector('#menu-transferir');
otraCantidad=document.querySelector('#OtraCantidad-transferir');

function SolicitarCantidadTransferir(){
    
    const cantidad=document.querySelector('#menu-transferir');
            
    cantidad.addEventListener('click',e=>{

        
       if(pintarCuadro.classList.contains('pintar-cuadro')){
           pintarCuadro.classList.remove('pintar-cuadro');
           
       }

       if(pintarCuadro.id!='OtraCantidad-transferir'){
            otraCantidad.value=null;
       }

       if(pintarCuadro.id=='menu-transferir'){
            pintarCuadro.classList.add('pintar-negro');
       }
     
        console.log(e.target.id);
       
        pintarCuadro=document.querySelector("#"+e.target.id);
      
        pintarCuadro.classList.add('pintar-cuadro');
      
        saldoTransferir=parseInt(e.target.value);
        console.log(saldoTransferir);

             
     })
}

let tipoTransferencia=""; //Variable global que denota cuando la transferencia no puede realizarse
let numeroSeguimiento;
let usuarioTransfiere;
//Función aceptar transferencia
function aceptarTransferencia(){
    const Aceptar=document.querySelector('#aceptar-transferenciaMenu');
    Aceptar.addEventListener('click',()=>{

        tipoTransferencia="reseteo";
        pintarCuadro.classList.remove('pintar-cuadro');
        saldoCuentaTransferir=parseInt(saldoCuentaTransferir);

        if(saldo>=saldoTransferir){

            let nuevoSaldo=saldo-saldoTransferir;   //Nuevo saldo de la cuenta que efectuó la transferencia
            let nuevoSaldo2=saldoCuentaTransferir+saldoTransferir;   //Nuevo saldo de la cuenta a la que se le transfiere  

            nuevoSaldo=parseInt(nuevoSaldo);
            nuevoSaldo2=parseInt(nuevoSaldo2);     


            operacion="transferencia";
            actualizarSaldoTransferencia(nuevoSaldo2);
            actualizarSaldo(nuevoSaldo);

            usuarioTransfiere=usuario;

            //Añade la acción efectuada en la tabla operación
            accion="'Realizó una transferencia'";
            numeroSeguimiento= Math.random().toString(36).substring(0,11);
            numeroSeguimiento=`'${numeroSeguimiento}'`;
            añadirAccionTransferir(nuevoSaldo,saldoTransferir,usuarioTransferir,numeroSeguimiento);

            //Se aumenta en 1 el número de acciones
            numeroAcciones++;

          
        }else{
            tipoTransferencia="error";
            mensajeTransferir();  
            
        }
            

                        
    })
}


//Función que actualiza el nuevo saldo de la cuenta a la que se realizo la transferencia
function actualizarSaldoTransferencia(nuevoSaldo2){
    xhtpp=new XMLHttpRequest;


    usuarioTransferir=parseInt(usuarioTransferir);
    xhtpp.open('GET','Controlador/actualizarSaldo/actualizarSaldo.php?nuevoSaldo='+nuevoSaldo2+"&usuario="+usuarioTransferir,true);

    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
            const arreglo=JSON.parse(this.responseText);
            saldoCuentaTransferir=parseInt(arreglo[0]['saldo']);  
            if(operacion=="retiro"){
                mensajeRetirar();   
            }else if(operacion=="deposito"){
                mensajeDepositar();
            }else if(operacion=="transferencia"){
                mensajeTransferir();
            }
            
            otraCantidad.value=NaN;

        }

    }


    xhtpp.send();
}

        
function mensajeTransferir(){

    const mensaje=document.querySelector('#contenedor-mensajeTransferir');
    const parrafo=document.createElement('P');
    let texto="";

    if(tipoTransferencia=="error"){
        texto="No cuenta con fondos suficientes para efectuar esa operacion";
        parrafo.classList.add('mensajeNoTransferir');
    }

    else{
        texto="Su transferencia se ha realizado correctamente";
        parrafo.classList.add('mensajeTransferir');
    }

    
    
    

    parrafo.textContent=texto;
    mensaje.appendChild(parrafo);

    setTimeout(()=>{
        parrafo.remove();
    },3000)


}


//Regresa a la pantalla de login de la cuenta a transferir
function regresarTransferirLogin(){
    const regresar=document.querySelector("#contenedor-bottonRegresarTransferir");
    regresar.addEventListener('click',function(){

        otraCantidad.value=NaN;
        pintarCuadro.classList.remove('pintar-cuadro');

        const boton=document.querySelector('#contenedor-bottonRegresarTransferir');
        boton.classList.add('ocultar-seccion');
        

        const menuOperaciones=document.querySelector('#formulario-transferir');
        menuOperaciones.classList.remove('ocultar-seccion');

        const seccionRetirar=document.querySelector('#contenedor-transferir');
        seccionRetirar.classList.add('ocultar-seccion');

        const aceptar=document.querySelector('#contenedor-aceptarTransferencia');
        aceptar.classList.add('ocultar-seccion');

        const mensaje=document.querySelector('#contenedor-mensajeTransferir');
        mensaje.classList.add('ocultar-seccion');

        document.querySelector('#OtraCantidad-transferir').value=null;
        document.querySelector('#numero-tarjetaTransferir').value=null;
        


    })
}

//----------------------------------------------------Fin funcionalidad de transferir a una cuenta-------------------------------------

//----------------------------------------------------Inicio funcionalidad de cambiar pin mediante el usuario------------------------------------------------
function cambiarPin(){
    const cambiarPin=document.querySelector('#cambiar-pin');
    cambiarPin.addEventListener('click',function(){
       
            const menu=document.querySelector('#contenedor-menu');
            menu.classList.add('ocultar-seccion');
    
            const heading=document.querySelector('#heading');
            heading.classList.add('ocultar-seccion');
    
            const formularioPin=document.querySelector('#formulario-pin');
            formularioPin.classList.remove('ocultar-seccion');
        


        })
}

let pin2;
let tipoCambio="";
//Se corrobora que el pin pertenezca a tu cuenta.
function loginCambiarPin(){

        

        document.querySelector('#aceptar-cambio-pin').addEventListener('click',function(e){
                e.preventDefault();
                pin2=document.querySelector('#numero-pin').value;

                if(pin==pin2){
                    
    
                    const formularioPin=document.querySelector('#formulario-pin');
                    formularioPin.classList.add('ocultar-seccion');

                    const formularioPin2=document.querySelector('#formulario-pin-2');
                    formularioPin2.classList.remove('ocultar-seccion');

                    
                    document.querySelector('#aceptar-cambio-pin-2').addEventListener('click',function(e){
                        e.preventDefault();
                        const nuevoPin=document.querySelector("#numero-pin-2").value;
                        if(nuevoPin.length<4 || nuevoPin.length>4){
                            tipoCambio="tamaño"
                            mensajeCambiarPin();
                        }else{
                            //Añade la acción realizada en la tabla operación
                            accion="'Cambio de PIN'";
                            añadirAccionPin(pin,nuevoPin);

                            //Se aumenta en 1 el número de acciones
                            numeroAcciones++;

                            ConectarAjaxCambiarPin(nuevoPin);
                        }

                        
                    })

                    
                    
                }else{
                    tipoCambio="error";
                    mensajeCambiarPin();

                }
          
        
     

    });

}


function mensajeCambiarPin(){


    const parrafo=document.createElement('P');

    let texto="";

    if(tipoCambio=="error"){
        const mensaje=document.querySelector('#contenedor-mensajeCambiarPin');
        texto="El PIN introducido es incorrecto";
        parrafo.classList.add('mensajeNoCambiarPin');
        parrafo.textContent=texto;
        mensaje.appendChild(parrafo);


      
    }else if(tipoCambio=="exitoso"){
        const mensaje=document.querySelector('#contenedor-mensajeCambiarPin2');
        texto="Su PIN ha sido modificado correctamente, su nuevo pin es: "+pin;
        parrafo.classList.add("mensajeCambiarPin");
        parrafo.textContent=texto;
        mensaje.appendChild(parrafo);
    }else{
        const mensaje=document.querySelector('#contenedor-mensajeCambiarPin2');
        texto="El tamaño del pin debe ser de 4 digítos";
        parrafo.classList.add("mensajeNoCambiarPin");
        parrafo.textContent=texto;
        mensaje.appendChild(parrafo);


    }

    

    setTimeout(()=>{
        parrafo.remove();
    },3000)



}

function ConectarAjaxCambiarPin(nuevoPin){
        
    const xhtpp=new XMLHttpRequest;


    
 //Se abre conexión con el servidor para el intercambio de información con la base de datos.
 xhtpp.open('GET','Controlador/cambiarPin/actualizarPin.php?nuevoPin='+nuevoPin+'&usuario='+usuario,true);


 //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
 xhtpp.onreadystatechange=function(){ 
     if(this.readyState == 4 && this.status == 200){ 

        const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
        console.log(arreglo)
        pin=parseInt(arreglo[0]['pin']);  
        tipoCambio="exitoso";
        
        document.querySelector("#numero-pin-2").value=null;
        
        mensajeCambiarPin();
               
               
    
        
     }
     
 }
 

 //Se envia la petición al servidor
 xhtpp.send();

 


}


//Regresa a la pantalla de login del pin
function regresarLoginCambiarPin(){
    const regresar=document.querySelector("#regresar-pin-2");
    regresar.addEventListener('click',function(){

        const form=document.querySelector('#formulario-pin-2');
        form.classList.add('ocultar-seccion');
        
        const formulario=document.querySelector('#formulario-pin');
        formulario.classList.remove('ocultar-seccion');

        document.querySelector('#numero-pin').value=null;


    })
}



function regresarCambiarPin(){
    const regresar=document.querySelector("#regresar-pin");
    regresar.addEventListener('click',function(){


        const formulario=document.querySelector('#formulario-pin');
        formulario.classList.add('ocultar-seccion');
      

        
        const menu=document.querySelector('#contenedor-menu')
        menu.classList.remove('ocultar-seccion');

        document.querySelector('#numero-pin').value=null;
        


    })
}

//-----------------------------------------Fin funcionalidad de cambiar Pin mediante el usuario---------------------------------------------------

//-----------------------------------------Inicio funcionalidad de imprimir estado de cuenta-----------------------------------

function ImprimirEstadoCuenta(){

    const ImprimirEstado=document.querySelector('#imprimir-estado');

    ImprimirEstado.addEventListener('click',function(e){
        e.preventDefault();

        const menu=document.querySelector('#contenedor-menu');
        menu.classList.add('ocultar-seccion');

        const heading=document.querySelector('#heading');
        heading.classList.add('ocultar-seccion');

        const seccionEstado=document.querySelector('#estado-cuenta');
        seccionEstado.classList.remove('ocultar-seccion');

        //Se añade la acción ejecutada por el usuario en sesión
        accion="'Consultó su estado de cuenta'";
        añadirAccion();

         //Se aumenta en 1 el número de acciones
         numeroAcciones++;

         console.log(numeroAcciones);

         //Se crea la tabla Pivote
        tablaPivote();

        numeroAcciones=0;


        //Se unen las tablas a partir de la Pivote
        joinTablas();


     
          


        
    })

}

//Retorna al menu principal desde la sección de imprimir estado de cuenta.
function regresarEstadoCuenta(){

         const regresar=document.querySelector("#regresar-estado");
        regresar.addEventListener('click',function(){


        const estadoCuenta=document.querySelector('#estado-cuenta');
        estadoCuenta.classList.add('ocultar-seccion');
      

        
        const menu=document.querySelector('#contenedor-menu')
        menu.classList.remove('ocultar-seccion');
        


    })

}

//Añade la acción de imprimir estado de cuenta
function añadirAccion(){
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida");

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarConsultaCuenta.php?accion='+accion,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();
   
    
    

}




//Añade la acción de consulta de saldo con el saldo pertinente en el momento de realizar la consulta
function añadirAccionConsulta(saldoNuevo){
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida");

    saldoNuevo=saldoNuevo.toString();

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarConsultaSaldo.php?accion='+accion+"&nuevoSaldo="+saldoNuevo,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();

}


//Añade la acción de retiro con los valores de saldo a retirar y saldo nuevo
function añadirAccionRetiro(saldoRetirar,nuevoSaldo){
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida de retiro");

    saldoRetirar=saldoRetirar.toString();
    nuevoSaldo=nuevoSaldo.toString();
    let folio= Math.random().toString(36).substring(0,11);
    folio=`'${folio}'`;
    console.log(folio)
   

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarRetiroSaldo.php?accion='+accion+"&nuevoSaldo="+nuevoSaldo+"&saldoRetirar="+saldoRetirar
    +"&folio="+folio,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();

}



//Añade la acción de deposito con los valores de saldo a depositar y saldo nuevo
function añadirAccionDeposito(saldoDepositar,nuevoSaldo){

    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida de deposito");

    saldoDepositar=saldoDepositar.toString();
    nuevoSaldo=nuevoSaldo.toString();
    let folio= Math.random().toString(36).substring(0,11);
    folio=`'${folio}'`;

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarDepositoSaldo.php?accion='+accion+"&nuevoSaldo="+nuevoSaldo+"&saldoDepositar="+saldoDepositar
    +"&folio="+folio,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();


}


//Añadir acción de cambio de pin
function añadirAccionPin(pin,nuevoPin){
    
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida de cambio de pin");

  

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarCambioPin.php?accion='+accion+"&pinAnterior="+pin+"&pinNuevo="+nuevoPin,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();

}

//Añadir acción de transferir a cuenta
function añadirAccionTransferir(nuevoSaldo,saldoTransferir,usuarioTransferir,numeroSeguimiento){
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida realizar transferencia");

    
    saldoTransferir=saldoTransferir.toString();
    nuevoSaldo=nuevoSaldo.toString();
    usuarioTransferir=usuarioTransferir.toString();
  

    console.log(accion);
    console.log(nuevoSaldo);
    console.log(saldoTransferir);
    console.log(numeroSeguimiento);
    console.log(usuarioTransferir)
  

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/almacenarTransferencia.php?accion='+accion+"&nuevoSaldo="+nuevoSaldo+"&saldoTransferir="+saldoTransferir
    +"&usuarioTransferir="+usuarioTransferir+"&folio="+numeroSeguimiento,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();


}

function almacenarTransferenciaRecibida(Nombre_T,ApellidoP_T,ApellidoM_T,saldoTransferir,saldo_T){
    const xhtpp=new XMLHttpRequest;
    console.log("Accion añadida almacenar transferencia");

   usuarioTransfiere=usuarioTransfiere.toString()

   console.log(Nombre_T);
   console.log(ApellidoP_T);
   console.log(ApellidoM_T);
   console.log(accion);
   console.log(saldo_T);
   console.log(saldoTransferir);
   console.log(usuarioTransfiere);
   console.log(numeroSeguimiento);


    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
   xhtpp.open('GET','Controlador/estadoCuenta/almacenarCuentaTransferir.php?accion='+accion+"&nuevoSaldo="+saldo_T+"&saldoTransferir="+saldoTransferir
    +"&CuentaTransferir="+usuarioTransfiere+"&folio="+numeroSeguimiento+'&Nombre_T='+Nombre_T+'&ApellidoP_T='+ApellidoP_T+
    '&ApellidoM_T='+ApellidoM_T,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
      if(this.readyState == 4 && this.status == 200){ 
            
                   
      }
        
   }
    
   
    //Se envia la petición al servidor
    xhtpp.send();


}

//Función que crea la tabla intermediaría entre la tabla cuenta y operación
function tablaPivote(){
    const xhtpp=new XMLHttpRequest;
    console.log("Se crea tabla Pivote");


    let folio= Math.random().toString(36).substring(0,11);
    folio=`'${folio}'`;

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/tablaPivote.php?usuario='+usuario+"&numeroAcciones="+numeroAcciones,true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
   
     
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();
   

}


//Función que une la tabla de cuenta con la de operación e imprime el historial de operaciones del usuario en cuestión.
function joinTablas(){
    

    

    const xhtpp=new XMLHttpRequest;
    console.log("Se unen tablas");

    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/estadoCuenta/joinTablas.php',true);
   
   
    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
            const arreglo=JSON.parse(this.responseText);
          
            
                arreglo.forEach(elemento=>{
                    if(elemento.NumeroTarjeta==usuario){
                         console.log(elemento.accion)
    
                        
                       const consultaPrevia=document.querySelector('.contenedor-consulta');
    
    
       
                       if(consultaPrevia){
                           consultaPrevia.remove();
      
                       }
    
        
    
                            const nombre=elemento.nombre;
                            const apellidoPaterno=elemento.apellido_paterno;
                            const apellidoMaterno=elemento.apellido_materno;
                            const fechaExpiracion=elemento.FechaExpiracion;
     
                            const parrafo=document.createElement('P');
                            const parrafo2=document.createElement('P');
                    
     
                            const div=document.createElement('DIV');
                             div.classList.add('contenedor-consulta');
     
     
                             parrafo.innerHTML=`Buen día ${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
                            div.appendChild(parrafo);
     
                            parrafo2.innerHTML=`Le recordamos que su tarjeta  <span>${usuario}</span> expira el <span>${fechaExpiracion}</span>`;
                            div.appendChild(parrafo2);

                            const seccionEstadoCuenta=document.querySelector('#seccion-cuenta-consultar')
                            seccionEstadoCuenta.appendChild(div);   
                            
                            
                    
                            const contenedorOperaciones=document.createElement('UL');
                            contenedorOperaciones.classList.add('contenedor-operaciones');
        
                            const operacion=document.createElement('LI');

                            if(elemento.accion=="Consultó su estado de cuenta"){

                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion;

                                operacion.onclick=function(){
                                    console.log("Ha dado click en cosultó estado cuenta");
                                }
                            }else if(elemento.accion=="Efectuó una consulta de saldo"){

                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "<br> Su saldo actual es->"+elemento.nuevoSaldo;

                                operacion.onclick=function(){
                                    console.log("Ha dado click en cosulta de saldo");
                                }
                            }else if(elemento.accion=="Efectuó un deposito a su cuenta"){

                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "<br> <span> El saldo depositado fue-> </span>"+elemento.saldoDepositar+" <span> <br>Su saldo actual es-></span>"+elemento.nuevoSaldo+
                                "<span> <br>con folio -></span>"+elemento.folio;

                                operacion.onclick=function(){
                                    console.log("Ha dado click en deposito de saldo");
                                }
                            }else if(elemento.accion=="Efectuó un retiro a su cuenta"){

                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "<span><br>El saldo retirado fue-></span>"+elemento.saldoRetirar+"<span><br>Su saldo actual es-></span>"+elemento.nuevoSaldo
                                +"<span><br>con folio -></span>"+elemento.folio;

                                operacion.onclick=function(){
                                    console.log("Ha dado click en retiro de saldo");
                                }

                            }else if(elemento.accion=="Cambio de PIN"){

                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "<span><br>Su PIN anterior es-></span>"+elemento.pinAnterior+"<span><br>Su PIN actual es-></span>"+elemento.pinNuevo;
                                

                                operacion.onclick=function(){
                                    console.log("Ha dado click en cambio de PIN");
                                }
                            }else if(elemento.accion=="Realizó una transferencia"){
                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "<span><br>A la cuenta -></span>"+elemento.CuentaTransferir+"<span><br>con folio -></span>"+elemento.folio+"<span><br>con un monto de -></span>"+elemento.saldoRetirar+
                                "<span><br>Su nuevo saldo es -></span>"+elemento.nuevoSaldo;
                                

                                operacion.onclick=function(){
                                    console.log("Ha dado click en realizar transferencia");
                                }

                            }else if(elemento.accion=="Recibe transferencia"){
                                operacion.innerHTML="<span class='fecha'>"+elemento.fecha+"</span> -> "+elemento.accion+
                                "Recibió una transferencia de la cuenta ->"+elemento.CuentaTransferir+"con el numéro de seguimiento ->"+elemento.folio+" con un monto de ->"+elemento.saldoDepositar+
                                "Su nuevo saldo es ->"+elemento.nuevoSaldo;
                                

                                operacion.onclick=function(){
                                    console.log("Ha dado click en recibe transferencia");
                                }

                            }
                        
                           
                           
        
                            contenedorOperaciones.appendChild(operacion);
        
                            const contenedor=document.querySelector('#acciones');
        
                            contenedor.appendChild(contenedorOperaciones);
                        
                            
                            document.querySelector('#regresar-estado').addEventListener('click',()=>{
                                contenedorOperaciones.remove();
                            })
                            
                        
                            
                    }
                })
         

            
            
                   
        }
        
    }
    
   
    //Se envia la petición al servidor
    xhtpp.send();


    
}

//-----------------------------------------------------Fin funcionalidad Imprimir estado de cuenta----------------------------------

//-----------------------------------------------------Fin funcionalidades del lado del cliente--------------------------------------

//-----------------------------------------------------Inicio funcionalidades del lado del administrador------------------------------

//Función que muestra la seccion de administrativo

function mostrarSeccionesAdmi(){
    const botonAdmi=document.querySelector('#seccion-admi');
    botonAdmi.addEventListener('click',function(e){
        e.preventDefault();

        const seccionCliente=document.querySelector('#cliente');
        seccionCliente.classList.add("ocultar-seccion");

        const seccionAdmi=document.querySelector('#administrativo');
        seccionAdmi.classList.remove("ocultar-seccion");


    })
}

//--------------------------------------------Inicio funcionalidad que logea la cuenta del administrador------------------------------

let usuarioAdministrativo;
let password;
let administradorId;

function loginAdministrador(){
 
    const iniciarSesion=document.querySelector('#iniciar-administrativo');
    iniciarSesion.addEventListener('click',e=>{

        usuarioAdministrativo=document.querySelector('#cuenta').value;
        password=document.querySelector('#password-administrativo').value;

        ConectarAjaxAdministrador();
    })


}


function ConectarAjaxAdministrador(){
        
    const xhtpp=new XMLHttpRequest;
    
 //Se abre conexión con el servidor para el intercambio de información con la base de datos.
 xhtpp.open('GET','Controlador/loginAdministrador/loginAdministrador.php',true);


 //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
 xhtpp.onreadystatechange=function(){ 
     if(this.readyState == 4 && this.status == 200){ 

        const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
         arreglo.forEach(cuenta => {
             
            
            if(cuenta.password==password && cuenta.nombre==usuarioAdministrativo){

               administradorId=cuenta.id;

               const seccion=document.querySelector('#administrativo');
               seccion.classList.add('ocultar-seccion');
    
               const menu=document.querySelector('#operaciones-administrativo');
               menu.classList.remove('ocultar-seccion');
    
               const heading=document.querySelector('#heading');
               heading.classList.add('ocultar-seccion');

               const button=document.querySelector('#contenedor-botton');
               button.classList.remove('ocultar-seccion');
                
    
            }else{
               mostrarAlerta('Error en la autentificación','error',1);
            }
               
    
        });
     }
     
 }
 

 //Se envia la petición al servidor
 xhtpp.send();


}

function cerrarSesionAdministrador(){
    const cerrarSesionAdministrador=document.querySelector("#contenedor-botton");

    cerrarSesionAdministrador.addEventListener('click',e=>{
        console.log("listo")
        e.preventDefault();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.add('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.add('ocultar-seccion');

        const heading=document.querySelector('#heading');
         heading.classList.remove('ocultar-seccion');

        const contenedorOperaciones=document.querySelector('#header');
        contenedorOperaciones.classList.remove('ocultar-seccion');

        document.querySelector('#cuenta').value=null;
        document.querySelector('#password-administrativo').value=null;
    })

}

//------------------------------------------------------Fin funcionalidad que logea la cuenta del administrador----------------------

//------------------------------------------------------Inicio funcionalidad que crea cuenta del cliente-----------------------------

function crearCuenta(){

    const crearCuenta=document.querySelector('#crear');
    crearCuenta.addEventListener('click',function(){
        

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.add('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.add('ocultar-seccion');

        const seccionCrear=document.querySelector('#contenedor-crear');
        seccionCrear.classList.remove('ocultar-seccion');
    })
}


let tipomensaje="";//Variable global que denota el tipo de mensaje a mostrar en la sección de crear cuenta.
let tipoErrorCrear="";//Variable global que denota el tipo de error presentado al crear la cuenta.
let numeroTarjetaCrear;
let nombre;
let apellidoPaternoCrear;
let apellidoMaternoCrear;
let fechaExpiracionCrear;
let pinCrear;
let saldoCrear;
let clienteId;

let contenedorCrear;//Variable global que almacena el mensaje de cuenta creada.

function validarInputs(){
    const botonCrear=document.querySelector('#aceptar-crear');
    botonCrear.addEventListener('click',e=>{
        e.preventDefault();
        console.log("listo");

        nombre=document.querySelector('#nombre-crear').value;
        apellidoPaternoCrear=document.querySelector('#apellidoP-crear').value;
        apellidoMaternoCrear=document.querySelector('#apellidoM-crear').value;

        numeroTarjetaCrear=document.querySelector('#numero-tarjeta-crear').value;
        fechaExpiracionCrear=document.querySelector('#fecha-crear').value;
        pinCrear=document.querySelector('#pin-crear').value;
        saldoCrear=document.querySelector('#saldo-crear').value;

        obtenerClienteId();






        if(nombre=='' || apellidoPaternoCrear=='' || apellidoMaternoCrear=='' || numeroTarjetaCrear=='' ||
            fechaExpiracionCrear=='' || pinCrear=='' || saldoCrear==""){

                tipomensaje="error";
                tipoErrorCrear="campos";
                alertaInputs();

            }else if(pinCrear.length>4||pinCrear.length<4){
                tipomensaje="error";
                tipoErrorCrear="pin";
                alertaInputs();

            }else if(numeroTarjetaCrear.length<9 || numeroTarjetaCrear.length>9){
                tipomensaje="error";
                tipoErrorCrear="numero-tarjeta";
                alertaInputs();
            }else if(tipoErrorCrear!=="numero-repetido"){
                
                conectarAjaxValidarNumero();

                if(tipoErrorCrear!=="numero-repetido"){

                    llenarTablas();

                    const seccionCrear=document.querySelector('#contenedor-crear');
                    seccionCrear.classList.add('ocultar-seccion');

                    const seccionCuentaCreada=document.querySelector('#cuenta-creada');
                    seccionCuentaCreada.classList.remove("ocultar-seccion");

                    const contenedorParrafo=document.querySelector('#contenedor-parrafo-cuenta');

                    contenedorCrear=document.createElement('DIV');

                    const parrafo=document.createElement('P');

                    const idCliente=clienteId.toString();

                    parrafo.innerHTML=`Para el clienteId -> ${idCliente} <br> Se ha creado exitosamente la cuenta ->
                                    <span>${nombre} ${apellidoPaternoCrear} ${apellidoMaternoCrear}</span> <br> 
                                    con numero  -> <span>${numeroTarjetaCrear}</span>, 
                                    fecha de expiración-><span>${fechaExpiracionCrear}</span>
                                    <br> y un saldo inicial -> $${saldoCrear}`;

                    contenedorCrear.appendChild(parrafo);
                    contenedorParrafo.appendChild(contenedorCrear);

                   



                    
                }

            }

            tipoErrorCrear="";

            


    })

}


//Función que conecta via AJAX con la tabla de cliente para obtener su id pertinente.
function obtenerClienteId(){
    const xhtpp=new XMLHttpRequest;
        
     //Se abre conexión con el servidor para el intercambio de información con la base de datos.
     xhtpp.open('GET','Controlador/crearCuenta/obtenerClienteId.php',false);
 
 
     //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
     xhtpp.onreadystatechange=function(){ 
         if(this.readyState == 4 && this.status == 200){ 
 
            const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
        
            clienteId=arreglo[arreglo.length-1].id;
            clienteId=parseInt(clienteId)+1;

            console.log(clienteId);
                
         
        
     
        }
    }
     //Se envia la petición al servidor
     xhtpp.send();


}



//Función que muestra un mensaje de alerta cuando alguno de los inputs este vacio.
function alertaInputs(){

   
    const contenedorMensaje=document.createElement('DIV')
    contenedorMensaje.classList.add('contenedor-mensaje')
    const mensaje=document.createElement('P');

    if(tipomensaje=="error" && tipoErrorCrear=="campos"){
        mensaje.textContent="Debe rellenar todos los campos";
        mensaje.classList.add('no-crear');


    }else if(tipomensaje=="error" && tipoErrorCrear=="pin"){
        mensaje.textContent="El pin debe de ser de 4 dígitos";
        mensaje.classList.add('no-crear');

    }else if(tipomensaje=="error" && tipoErrorCrear=="numero-tarjeta"){
        mensaje.textContent="El número de tarjeta debe de ser de 9 dígitos";
        mensaje.classList.add('no-crear');
    }else if(tipomensaje=="error"&&tipoErrorCrear=="numero-repetido"){
        mensaje.textContent="Ese número de tarjeta ya existe";
        mensaje.classList.add('no-crear');
    }

    
    contenedorMensaje.appendChild(mensaje);

    const contenedor=document.querySelector("#mensaje-crear");
    contenedor.appendChild(contenedorMensaje);

    setTimeout(() => {
        contenedorMensaje.remove();
    }, 3000);


}

//Función que conecta con la base de datos via AJAX, para corroborar de que no haya un número de tarjeta repetido
function conectarAjaxValidarNumero(){

    const xhtpp=new XMLHttpRequest;
        
     //Se abre conexión con el servidor para el intercambio de información con la base de datos.
     xhtpp.open('GET','Controlador/crearCuenta/validarNumero.php',false);
 
 
     //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
     xhtpp.onreadystatechange=function(){ 
         if(this.readyState == 4 && this.status == 200){ 
 
            const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
            console.log(arreglo);
             arreglo.forEach(cuenta => {
                if(cuenta.NumeroTarjeta==numeroTarjetaCrear){
                    tipomensaje="error";
                    tipoErrorCrear="numero-repetido";
                    tipoErrorModificar="numero-repetido";
                    alertaInputs();
                    alertaModificar();
                }
         
        })
     
        }
    }
     //Se envia la petición al servidor
     xhtpp.send();

}

//Función que envia los datos via AJAX de la nueva cuenta creada por el administrador.

function llenarTablas(){

    nombre=`'${nombre}'`;
    apellidoPaternoCrear=`'${apellidoPaternoCrear}'`;
    apellidoMaternoCrear=`'${apellidoMaternoCrear}'`;

    for(let i=0;i<2;i++)
        fechaExpiracionCrear=fechaExpiracionCrear.replace('-','/');
    fechaExpiracionCrear=`'${fechaExpiracionCrear}'`;

    console.log(fechaExpiracionCrear);
    clienteId=clienteId.toString();
    console.log(clienteId);
   
    console.log(administradorId);
    console.log(numeroTarjetaCrear);
    console.log(pinCrear);
    console.log(saldoCrear);
    

    const xhtpp=new XMLHttpRequest;
        
    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/crearCuenta/crearCuenta.php?NumeroTarjeta='+numeroTarjetaCrear+"&pin="+pinCrear
    +"&FechaExpiracion="+fechaExpiracionCrear+"&saldo="+saldoCrear+"&clienteId="+clienteId+"&administradorId="+administradorId
    +"&nombre="+nombre+"&apellido_paterno="+apellidoPaternoCrear+"&apellido_materno="+apellidoMaternoCrear,true);


    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            console.log("Datos enviados")
            alert("La cuenta ha sido creada");
        
           
        
    
       }
   }
    //Se envia la petición al servidor
    xhtpp.send();


    
}


//Funciones que retornan al menu de operaciones

function aceptarCuentaCreada(){
    const aceptar=document.querySelector('#botton-aceptar');
    aceptar.addEventListener('click',e=>{
        e.preventDefault();
        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#cuenta-creada');
        seccion.classList.add('ocultar-seccion');

        contenedorCrear.remove();


    
        
        document.querySelector('#numero-tarjeta-crear').value=null;
        document.querySelector('#nombre-crear').value=null;
        document.querySelector('#apellidoP-crear').value=null;
        document.querySelector('#apellidoM-crear').value=null;
        document.querySelector('#pin-crear').value=null;
        document.querySelector('#saldo-crear').value=null;
        document.querySelector('#fecha-crear').value=null;

    })

}

function regresarCrear(){

    const regresar=document.querySelector('#regresar-menuCrear');
    regresar.addEventListener('click',e=>{
        e.preventDefault();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#contenedor-crear');
        seccion.classList.add('ocultar-seccion');

        document.querySelector('#numero-tarjeta-crear').value=null;
        document.querySelector('#nombre-crear').value=null;
        document.querySelector('#apellidoP-crear').value=null;
        document.querySelector('#apellidoM-crear').value=null;
        document.querySelector('#pin-crear').value=null;
        document.querySelector('#saldo-crear').value=null;
        document.querySelector('#fecha-crear').value=null;
    })

}


//-------------------------------------------------Fin funcionalidad Crear cuenta--------------------------------------------------------

//-------------------------------------------------Inicio funcionalidad de Eliminar cuenta-----------------------------------------------

//Función que muestra la sección de eliminar cuenta
function eliminarCuenta( ){
    const eliminarCuenta=document.querySelector('#eliminar');
    eliminarCuenta.addEventListener('click',function(){
        

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.add('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.add('ocultar-seccion');

        const seccionEliminar=document.querySelector('#contenedor-eliminar');
        seccionEliminar.classList.remove('ocultar-seccion');
    })

}

//Función que valida la cuenta a eliminar

let usuarioEliminar;
let nombreEliminar;
let apellidoPaternoEliminar;
let apellidoMaternoEliminar;

let tipoEliminar="";
let mensajeEliminar;
let clienteIdEliminar;
let contenedorCuentaEliminada;
let correcto="";

function validarEliminar(){


    const eliminar=document.querySelector('#aceptar-eliminar');
    
    eliminar.addEventListener('click',e=>{
        
        e.preventDefault();
        usuarioEliminar=document.querySelector('#numero-tarjeta-eliminar').value;
        nombreEliminar=document.querySelector('#nombre-eliminar').value;
        apellidoPaternoEliminar=document.querySelector('#apellidoP-eliminar').value;
        apellidoMaternoEliminar=document.querySelector('#apellidoM-eliminar').value;

        if(nombreEliminar=='' || apellidoPaternoEliminar=='' || apellidoMaternoEliminar=='' || usuarioEliminar==''){

                tipoEliminar="vacios";
                alertaEliminar();

        }else if(usuarioEliminar.length<9 || usuarioEliminar.length>9){
               
                tipoEliminar="numero-tarjeta";
                alertaEliminar();
        }else if(tipoEliminar!="datos" && tipoEliminar!="administrador"){

            ConectarAjaxValidarEliminar();

            if(correcto=="exito"){
                        
                        console.log("Todo bien")

                        const seccionCuentaEliminada=document.querySelector('#cuenta-eliminada');
                        seccionCuentaEliminada.classList.remove('ocultar-seccion');

                        const seccionEliminar=document.querySelector('#contenedor-eliminar');
                        seccionEliminar.classList.add('ocultar-seccion');


                        const contenedorParrafo=document.querySelector('#contenedor-parrafo-cuentaEliminada');

                        
                        contenedorCuentaEliminada=document.createElement('DIV');

                        const idCliente=clienteId.toString();

                        const parrafo=document.createElement('P');

                        parrafo.innerHTML=`Para el clienteId -> ${idCliente} <br> 
                                        <span> ${nombreEliminar} ${apellidoPaternoEliminar} ${apellidoMaternoEliminar}</span> <br> 
                                        con numero  -> <span>${usuarioEliminar}</span><br><br>
                                            <span class="resaltar">¿Desea Eliminar la cuenta? </span>`;
    
                        contenedorCuentaEliminada.appendChild(parrafo);
                        contenedorParrafo.appendChild(contenedorCuentaEliminada);




            }else{
                alertaEliminar();
            }



        }

        tipoEliminar="";
        correcto="";

        

    })





}

//Función que conecta con la base de datos para validar los inputs de la cuenta a eliminar
function ConectarAjaxValidarEliminar(){

    const xhtpp=new XMLHttpRequest;
        
    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/eliminarCuenta/validarCuenta.php',false);


    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            
            console.log("Conecta con base de datos");
            const arreglo=JSON.parse(this.responseText);

            arreglo.forEach(cuenta => {
                
                if(usuarioEliminar == cuenta.NumeroTarjeta &&  nombreEliminar == cuenta.nombre 
                    && apellidoPaternoEliminar == cuenta.apellido_paterno && apellidoMaternoEliminar == cuenta.apellido_materno){
                        
                       correcto="exito";
                       clienteId=cuenta.clienteId;

                    }else if(usuarioEliminar != cuenta.NumeroTarjeta ||  nombreEliminar != cuenta.nombre 
                        || apellidoPaternoEliminar != cuenta.apellido_paterno || apellidoMaternoEliminar != cuenta.apellido_materno){
                       
                        tipoEliminar="datos";
                    
                    }else if(cuenta.admnistradorId != administradorId){
                       
                        tipoEliminar="administrador";
                        

                    }

            });
           
        
    
       }
   }
    //Se envia la petición al servidor
    xhtpp.send();


}


//Función que manda mensaje de alerta al introducir inputs erroneos de la cuenta a eliminar
function alertaEliminar(){

    const contenedorMensaje=document.createElement('DIV')
    contenedorMensaje.classList.add('contenedor-mensaje')
    const mensaje=document.createElement('P');

    if(tipoEliminar=="vacios"){
        mensaje.textContent="Debe rellenar todos los campos";
        mensaje.classList.add('no-crear');


    }else if(tipoEliminar=="numero-tarjeta"){
        mensaje.textContent="El número de tarjeta debe de ser de 9 dígitos";
        mensaje.classList.add('no-crear');
    }else if(tipoEliminar=="datos"){
        mensaje.textContent="Los datos ingresado no pertenecen a ninguna cuenta";
        mensaje.classList.add('no-crear');
    }else if(tipoEliminar=="administrador"){
        mensaje.textContent="El administrador no tiene permiso de eliminar esa cuenta";
        mensaje.classList.add('no-crear');
    }

    
    contenedorMensaje.appendChild(mensaje);

    const contenedor=document.querySelector("#mensaje-eliminar");
    contenedor.appendChild(contenedorMensaje);

    setTimeout(() => {
        contenedorMensaje.remove();
    }, 3000);


}

//Funciones que retornan al menu de operaciones

function aceptarCuentaEliminada(){
    const aceptar=document.querySelector('#botton-aceptarEliminar');
    aceptar.addEventListener('click',e=>{
        e.preventDefault();

        aplicarDelete();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#cuenta-eliminada');
        seccion.classList.add('ocultar-seccion');

        contenedorCuentaEliminada.remove();


    
        
        document.querySelector('#numero-tarjeta-eliminar').value=null;
        document.querySelector('#nombre-eliminar').value=null;
        document.querySelector('#apellidoP-eliminar').value=null;
        document.querySelector('#apellidoM-eliminar').value=null;

    })

}

function regresarEliminar(){

    const regresar=document.querySelector('#regresar-menu-eliminar');
    regresar.addEventListener('click',e=>{
        e.preventDefault();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#contenedor-eliminar');
        seccion.classList.add('ocultar-seccion');

        document.querySelector('#numero-tarjeta-eliminar').value=null;
        document.querySelector('#nombre-eliminar').value=null;
        document.querySelector('#apellidoP-eliminar').value=null;
        document.querySelector('#apellidoM-eliminar').value=null;

     
    })

}

function aplicarDelete(){
    
    const xhtpp=new XMLHttpRequest;
        
    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/eliminarCuenta/aplicarDelete.php?clienteId='+clienteId,true);


    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            alert("La cuenta ha sido eliminada");
        
           
       }
   }
    //Se envia la petición al servidor
    xhtpp.send();


}

//----------------------------------------------Fin funcionalidad de eliminar cuenta------------------------------------------------

//----------------------------------------------Inicio funcionalidad de modificar cuenta---------------------------------------------

function modificarCuenta(){
    const modificarCuenta=document.querySelector('#modificar');
    
    modificarCuenta.addEventListener('click',e=>{
        e.preventDefault();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.add('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.add('ocultar-seccion');

        const seccionModificar=document.querySelector('#seccion-modificar1');
        seccionModificar.classList.remove('ocultar-seccion');


    })


}

function regresarModificar1(){

    const regresar=document.querySelector('#regresar-menuModificar1');
    regresar.addEventListener('click',e=>{
        e.preventDefault();

        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#seccion-modificar1');
        seccion.classList.add('ocultar-seccion');

        document.querySelector('#numero-tarjeta-modificar1').value=null;
        document.querySelector('#pin-modificar1').value=null;
       
    })

}

let numeroTarjetaModificar1;
let pinModificar1;
let tipomensajeModificar1;
let tipoErrorModificar1;

function validarCuentaModificar(){
    const botonModificar=document.querySelector('#aceptar-modificar1');
    botonModificar.addEventListener('click',e=>{
        e.preventDefault();
        console.log("listo");


        numeroTarjetaModificar1=document.querySelector('#numero-tarjeta-modificar1').value;
        pinModificar1=document.querySelector('#pin-modificar1').value;

        //obtenerClienteId();




        if( numeroTarjetaModificar1=='' ||  pinModificar1==''){

                tipomensajeModificar1="error";
                tipoErrorModificar1="campos";
                alertaModificar1();

            }else if(pinModificar1.length>4||pinModificar1.length<4){
                tipomensajeModificar1="error";
                tipoErrorModificar1="pin";
                alertaModificar1();

            }else if(numeroTarjetaModificar1.length<9 || numeroTarjetaModificar1.length>9){
                tipomensajeModificar1="error";
                tipoErrorModificar1="numero-tarjeta";
                alertaModificar1();
            }else{
                conectarAjaxValidarNumero1();
                if(tipoErrorModificar1!=="numero-repetido"){
                    alertaModificar1();
                }
               
                if(tipoErrorModificar1=="numero-repetido"){

                    

                    const seccionModificar=document.querySelector('#seccion-modificar1');
                    seccionModificar.classList.add('ocultar-seccion');

                    const seccionCuentaModificada=document.querySelector('#seccion-modificar');
                    seccionCuentaModificada.classList.remove("ocultar-seccion");

                    
                }

            }

            tipoErrorModificar1="";

            


    })

}

function conectarAjaxValidarNumero1(){

    const xhtpp=new XMLHttpRequest;
        
     //Se abre conexión con el servidor para el intercambio de información con la base de datos.
     xhtpp.open('GET','Controlador/crearCuenta/validarNumero.php',false);
 
 
     //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
     xhtpp.onreadystatechange=function(){ 
         if(this.readyState == 4 && this.status == 200){ 
 
            const arreglo=JSON.parse(this.responseText);//Convierte el archivo Json devuelto por el servicio de cuenta.php a un arreglo de javaScript
            console.log(arreglo);
             arreglo.forEach(cuenta => {
                if(cuenta.NumeroTarjeta==numeroTarjetaModificar1&&cuenta.pin==pinModificar1){
                   
                    tipoErrorModificar1="numero-repetido";
                    clienteId=cuenta.clienteId;
                    
                }
         
        })
     
        }
    }
     //Se envia la petición al servidor
     xhtpp.send();

}




function alertaModificar1(){

   
    const contenedorMensaje=document.createElement('DIV')
    contenedorMensaje.classList.add('contenedor-mensaje')
    const mensaje=document.createElement('P');

    if(tipomensajeModificar1=="error" && tipoErrorModificar1=="campos"){
        mensaje.textContent="Debe rellenar todos los campos";
        mensaje.classList.add('no-crear');


    }else if(tipomensajeModificar1=="error" && tipoErrorModificar1=="pin"){
        mensaje.textContent="El pin debe de ser de 4 dígitos";
        mensaje.classList.add('no-crear');

    }else if(tipomensajeModificar1=="error" && tipoErrorModificar1=="numero-tarjeta"){
        mensaje.textContent="El número de tarjeta debe de ser de 9 dígitos";
        mensaje.classList.add('no-crear');
    }else if(tipomensajeModificar1=="error"&&tipoErrorModificar1!="numero-repetido"){
        mensaje.textContent="Esa cuenta no existe";
        mensaje.classList.add('no-crear');
    }

    
    contenedorMensaje.appendChild(mensaje);

    const contenedor=document.querySelector("#mensaje-modificar1");
    contenedor.appendChild(contenedorMensaje);

    setTimeout(() => {
        contenedorMensaje.remove();
    }, 3000);


}









let tipomensajeModificar="";//Variable global que denota el tipo de mensaje a mostrar en la sección de modificar cuenta.
let tipoErrorModificar="";//Variable global que denota el tipo de error presentado al modificar la cuenta.
let numeroTarjetaModificar;
let nombreModificar;
let apellidoPaternoModificar;
let apellidoMaternoModificar;
let fechaExpiracionModificar;
let pinModificar;
let saldoModificar;


let contenedorModificar;//Variable global que almacena el mensaje de la cuenta modificada.

function validarModificar(){
    const botonModificar=document.querySelector('#aceptar-modificar');
    botonModificar.addEventListener('click',e=>{
        e.preventDefault();
        console.log("listo");

        nombreModificar=document.querySelector('#nombre-modificar').value;
        apellidoPaternoModificar=document.querySelector('#apellidoP-modificar').value;
        apellidoMaternoModificar=document.querySelector('#apellidoM-modificar').value;

        numeroTarjetaModificar=document.querySelector('#numero-tarjeta-modificar').value;
        fechaExpiracionModificar=document.querySelector('#fecha-modificar').value;
        pinModificar=document.querySelector('#pin-modificar').value;
        saldoModificar=document.querySelector('#saldo-modificar').value;






        if(nombreModificar=='' || apellidoPaternoModificar=='' || apellidoMaternoModificar=='' || numeroTarjetaModificar=='' ||
            fechaExpiracionModificar=='' || pinModificar=='' || saldoModificar==""){

                tipomensajeModificar="error";
                tipoErrorModificar="campos";
                alertaModificar();

            }else if(pinModificar.length>4||pinModificar.length<4){
                tipomensajeModificar="error";
                tipoErrorModificar="pin";
                alertaModificar();

            }else if(numeroTarjetaModificar.length<9 || numeroTarjetaModificar.length>9){
                tipomensajeModificar="error";
                tipoErrorModificar="numero-tarjeta";
                alertaModificar();
            }else if(tipoErrorModificar!=="numero-repetido"){
                
                conectarAjaxValidarNumero();

                if(tipoErrorModificar!=="numero-repetido"){

                    modificarTablas();

                    const seccionModificar=document.querySelector('#seccion-modificar');
                    seccionModificar.classList.add('ocultar-seccion');

                    const seccionCuentaModificada=document.querySelector('#cuenta-modificada');
                    seccionCuentaModificada.classList.remove("ocultar-seccion");

                    const contenedorParrafo=document.querySelector('#contenedor-parrafo-cuentaModificada');

                    contenedorModificar=document.createElement('DIV');

                    const parrafo=document.createElement('P');

                   const idCliente=clienteId.toString();

                    parrafo.innerHTML=`Para el clienteId -> ${idCliente} <br> Se ha modificado exitosamente la cuenta con valores ->
                                    <span>${nombreModificar} ${apellidoPaternoModificar} ${apellidoMaternoModificar}</span> <br> 
                                    con numero  -> <span>${numeroTarjetaModificar}</span>, 
                                    fecha de expiración-><span>${fechaExpiracionModificar}</span>
                                    <br> y un saldo inicial -> $${saldoModificar}`;

                    contenedorModificar.appendChild(parrafo);
                    contenedorParrafo.appendChild(contenedorModificar);



                    
                }

            }

            tipoErrorModificar="";

            


    })

}



//Función que muestra un mensaje de alerta cuando alguno de los inputs este vacio.
function alertaModificar(){

   
    const contenedorMensaje=document.createElement('DIV')
    contenedorMensaje.classList.add('contenedor-mensaje')
    const mensaje=document.createElement('P');

    if(tipomensajeModificar=="error" && tipoErrorModificar=="campos"){
        mensaje.textContent="Debe rellenar todos los campos";
        mensaje.classList.add('no-crear');


    }else if(tipomensajeModificar=="error" && tipoErrorModificar=="pin"){
        mensaje.textContent="El pin debe de ser de 4 dígitos";
        mensaje.classList.add('no-crear');

    }else if(tipomensajeModificar=="error" && tipoErrorModificar=="numero-tarjeta"){
        mensaje.textContent="El número de tarjeta debe de ser de 9 dígitos";
        mensaje.classList.add('no-crear');
    }else if(tipomensajeModificar=="error"&&tipoErrorModificar=="numero-repetido"){
        mensaje.textContent="Ese número de tarjeta ya existe";
        mensaje.classList.add('no-crear');
    }

    
    contenedorMensaje.appendChild(mensaje);

    const contenedor=document.querySelector("#mensaje-modificar");
    contenedor.appendChild(contenedorMensaje);

    setTimeout(() => {
        contenedorMensaje.remove();
    }, 3000);


}

function modificarTablas(){

    nombreModificar=`'${nombreModificar}'`;
    apellidoPaternoModificar=`'${apellidoPaternoModificar}'`;
    apellidoMaternoModificar=`'${apellidoMaternoModificar}'`;

    for(let i=0;i<2;i++)
        fechaExpiracionModificar=fechaExpiracionModificar.replace('-','/');
    fechaExpiracionModificar=`'${fechaExpiracionModificar}'`;

    console.log(fechaExpiracionModificar);
    clienteId=clienteId.toString();
    console.log(clienteId);
   
    

    const xhtpp=new XMLHttpRequest;
        
    //Se abre conexión con el servidor para el intercambio de información con la base de datos.
    xhtpp.open('GET','Controlador/modificarCuenta/modificarCuenta.php?NumeroTarjeta='+numeroTarjetaModificar+"&pin="+pinModificar
    +"&FechaExpiracion="+fechaExpiracionModificar+"&saldo="+saldoModificar+"&clienteId="+clienteId+"&administradorId="+administradorId
    +"&nombre="+nombreModificar+"&apellido_paterno="+apellidoPaternoModificar+"&apellido_materno="+apellidoMaternoModificar,true);


    //Evento de xhtpp empleado para corroborar que el servicio esta procesando correctamente las peticiones.
    xhtpp.onreadystatechange=function(){ 
        if(this.readyState == 4 && this.status == 200){ 
            console.log("Datos enviados")
           
        
    
       }
   }
    //Se envia la petición al servidor
    xhtpp.send();


    
}


//Funciones que retornan al menu de operaciones

function aceptarCuentaModificada(){
    const aceptar=document.querySelector('#botton-aceptarModificar');
    aceptar.addEventListener('click',e=>{
        e.preventDefault();
        const seccionAdmi=document.querySelector('#operaciones-administrativo');
        seccionAdmi.classList.remove('ocultar-seccion');

        const botton=document.querySelector('#contenedor-botton');
        botton.classList.remove('ocultar-seccion');

        const seccion=document.querySelector('#cuenta-modificada');
        seccion.classList.add('ocultar-seccion');

        contenedorModificar.remove();

        
        document.querySelector('#numero-tarjeta-modificar').value=null;
        document.querySelector('#nombre-modificar').value=null;
        document.querySelector('#apellidoP-modificar').value=null;
        document.querySelector('#apellidoM-modificar').value=null;
        document.querySelector('#pin-modificar').value=null;
        document.querySelector('#saldo-modificar').value=null;
        document.querySelector('#fecha-modificar').value=null;
        document.querySelector('#numero-tarjeta-modificar1').value=null;
        document.querySelector('#pin-modificar1').value=null;

    
      

    })

}

function regresarModificar(){

    const regresar=document.querySelector('#regresar-menuModificar');
    regresar.addEventListener('click',e=>{
        e.preventDefault();

        const seccionAdmi=document.querySelector('#seccion-modificar1');
        seccionAdmi.classList.remove('ocultar-seccion');


        const seccion=document.querySelector('#seccion-modificar');
        seccion.classList.add('ocultar-seccion');

        document.querySelector('#numero-tarjeta-modificar1').value=null;
        document.querySelector('#pin-modificar1').value=null;
        
    })

}




