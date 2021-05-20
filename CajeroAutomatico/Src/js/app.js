
document.addEventListener("DOMContentLoaded", function() {//Evento que se produce cuando el Dom se ha cargado
    iniciarApp(); //Función que manda llamar a otras funciones
    
});


function iniciarApp(){

    mostrarSecciones();

    validarPin();

    validarFormulario();
    

    

    
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
            auxiliar=1;
            mostrarAlerta("Debe rellenar todos los campos","error",1);
        }

    })


    //Validación para el formulario del cliente.
        const iniciarSesionCliente=document.querySelector('#iniciar-cliente');

    iniciarSesionCliente.addEventListener('click',e=>{
        e.preventDefault();
        const pin=document.querySelector('#pin');
        const passwordCliente=document.querySelector('#password-cliente');
    

        if(passwordCliente.value==='' || pin.value===''){
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
        }else{

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


    
