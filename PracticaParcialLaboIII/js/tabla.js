export default function crearTabla(lista) {
    
    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}

const inputNombre=document.getElementById("txtNombre");
const inputApellido=document.getElementById("txtApellido");
const inputEmail=document.getElementById("txtEmail");
const inputId=document.getElementById("txtId");

function crearCabecera(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const key in item) {
        const th = document.createElement('th');
        let txt = document.createTextNode(key); // key => id, nombre, apellido etc.
        th.appendChild(txt);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            const td = document.createElement('td');
            let txt = document.createTextNode(element[key]);
            td.appendChild(txt);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);

        }
        agregarManejadorTr(tr);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTr(tr) {
    if (tr) {
        tr.addEventListener('click', (e) => {
            let idPersonaSeleccionada = e.target.parentNode.dataset.id;
            let personas = JSON.parse(localStorage.getItem('gente')) || [];//obtengo la lista actualizada del local storage
            personas.forEach(persona => {
                if (idPersonaSeleccionada == persona.id) {//busco por id
                    cargarPersonaAlFormulario(persona);//cargo el formularios con la persona seleccionada
                    document.getElementById('btnAlta').disabled = true;
                }
            });
        });
    }
} 

function cargarPersonaAlFormulario(persona) {    
    inputNombre.value=persona.nombre;
    inputApellido.value=persona.apellido;
    inputEmail.value=persona.email;
    inputId.value=persona.id;
    
}