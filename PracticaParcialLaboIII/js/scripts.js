import crearTabla from "./tabla.js";
import Persona from "./persona.js";


let listaPersona;
let proximoId;
let frmPersona;
let divTabla;
//obtenemos estos datos aca arriba porque son constantes que no cambian
const inputId = document.getElementById("txtId");//obtengo el id del input escondido.
const inputNombre = document.getElementById("txtNombre");
const inputApellido = document.getElementById("txtApellido");
const inputEmail = document.getElementById("txtEmail");
const inputGender = document.getElementsByName('gender');
const btnAlta = document.getElementById("btnAlta");
const btnBaja = document.getElementById("btnBaja");
const btnModificar = document.getElementById("btnModificar");
const btnTabla = document.getElementById("btnTabla");
let btnClear = document.getElementById('btnClear');
const spinner = document.getElementById('spinnerCircle');
const inputSearch = document.getElementById('inputSearch');
const btnBuscador = document.getElementById('btnBuscador');

btnClear.addEventListener('click',limpiarFormulario);


window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {

    //listaPersona = obtenerListaDePersonas();
    proximoId = obtenerId();

    divTabla = document.getElementById('divTabla');
    frmPersona = document.forms[0];

    //a cada boton le seteo un manejador!
    btnTabla.addEventListener("click", cargarTabla);
    btnAlta.addEventListener('click', darDeAltaNuevaPersona);
    btnBaja.addEventListener('click', darDeBajaPersona);
    btnModificar.addEventListener('click', modificarPersona);
    btnBuscador.addEventListener('click',cmbBuscardor);
}

function cargarTabla() {    
    listaPersona=obtenerListaDePersonas();
    actualizarDatos();    
}

function obtenerPosicionDePersona() {
    listaPersona = obtenerListaDePersonas();
    for (let i = 0; i < listaPersona.length; i++) {//recorro la lista con un FOR para saber la posicion de la persona
        if (listaPersona[i].id == inputId.value) {
            return i;
        }
    }
}

function modificarPersona(e) {
    e.preventDefault();//prevengo que actualice la pagina   
    let posicionPersona = obtenerPosicionDePersona();//me devuelve el indice donde esta la persona que me interesa

    listaPersona[posicionPersona].nombre = inputNombre.value;//set dato
    listaPersona[posicionPersona].apellido = inputApellido.value;//set dato
    listaPersona[posicionPersona].email = inputEmail.value;//set dato
    let esMasculino = inputGender[0].checked;
    !esMasculino ? listaPersona[posicionPersona].sexo = 'Femenino':listaPersona[posicionPersona].sexo = 'Masculino';

    limpiarFormulario();
    guardarDatos();//actualizo lista en localstorage
    actualizarDatos();//muestro lista actualizada
    //console.log("asdasd");

}

function darDeBajaPersona(e) {
    e.preventDefault();//prevengo que actualice la pagina
    let posicionPersona = obtenerPosicionDePersona();//me devuelve el indice donde esta la persona que me interesa
    if(posicionPersona!= null){
        listaPersona.splice(posicionPersona, 1);//borro el elemento de la lista indicando el indice(i) y cuantos elementos(1)
        limpiarFormulario();
    }
    guardarDatos();//actualizo lista en localstorage
    actualizarDatos();//muestro lista actualizada
}

function darDeAltaNuevaPersona(e) {
    e.preventDefault();
    const nuevaPersona = altaPersona();
    if (nuevaPersona) {
        listaPersona=obtenerListaDePersonas();
        listaPersona.push(nuevaPersona);
        proximoId++;
        guardarDatos();
        actualizarDatos();
    }
}

function altaPersona() {
    //console.log(inputNombre.value);
    if(inputNombre.value != "" && inputApellido.value != "" && inputEmail.value != ""){
     const nuevaPersona = new Persona(proximoId,
        document.querySelector("#txtNombre").value,
        document.querySelector("#txtApellido").value,
        document.querySelector("#txtEmail").value,
        frmPersona.gender.value);
        return nuevaPersona;
     }
    
    //listaPersona.push(nuevaPersona);
    
    alert("verifique hay campos vacios");
    return null;
}

function obtenerListaDePersonas() {
    return JSON.parse(localStorage.getItem('gente')) || [];
}

function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 0;
}
function guardarDatos() {
    localStorage.setItem('gente', JSON.stringify(listaPersona));
    localStorage.setItem('nextId', proximoId);

}

function actualizarDatos() {
    divTabla.innerHTML="";
    spinner.style.visibility = "visible";
    setTimeout(()=>{
        spinner.style.visibility = "hidden";
        divTabla.appendChild(crearTabla(listaPersona));

    },2000);
}

function limpiarFormulario(){
    inputNombre.value = "";
    inputApellido.value = "";
    inputEmail.value = "";
    btnAlta.disabled = false;
    inputSearch.value = "";
    divTabla.innerHTML="";
}

function buscardor(){
    listaPersona = obtenerListaDePersonas();
    let auxList = [];
    let textoABuscar = inputSearch.value.toLowerCase();
    listaPersona.forEach(persona => {
        if(persona.nombre.toLowerCase().includes(textoABuscar) || persona.apellido.toLowerCase().includes(textoABuscar)
        || persona.sexo.toLowerCase().includes(textoABuscar)){
            auxList.push(persona);
        }
    });
    listaPersona = auxList;
    actualizarDatos();
}

function cmbBuscardor(){
    listaPersona = obtenerListaDePersonas();
    let cmbSelect = document.getElementById('cmbSelect');
    let selectOption = cmbSelect.value;
    let auxList = [];
    let textoABuscar = inputSearch.value.toLowerCase();
    listaPersona.forEach(persona => {
        if(selectOption == 1){
            if(persona.nombre.toLowerCase().includes(textoABuscar)){
                auxList.push(persona);
            }
        }
        else if(selectOption == 2){
            if(persona.apellido.toLowerCase().includes(textoABuscar)){
                auxList.push(persona);
            }
        }
        else if(selectOption == 3){
            if(persona.sexo.toLowerCase().includes(textoABuscar)){
                auxList.push(persona);
            }
        }
    });
    listaPersona = auxList;
    actualizarDatos();
}


