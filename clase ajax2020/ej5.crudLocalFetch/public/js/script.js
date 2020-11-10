const ol = document.querySelector(".ol");//referencia a ese ol . por que es una class
const btnTraer = document.getElementById("btnTraer");
const spinner = document.getElementById("spinner");



const urlAccess = "https://jsonplaceholder.typicode.com/users";


btnTraer.addEventListener("click", (e) => {

    traerPersonas();
    //altaPersona();


});

function crearSpinner(){
    const img = document.createElement('img');
    img.setAttribute("src","./images/spinner.gif");
    img.setAttribute("alt","Imagen spinner");
    return img;
}

//funcion expresada
const crearItems = (data) => {
    const fragmento = document.createDocumentFragment();
    data.forEach(element => {
        const item = document.createElement('li');
        item.textContent = `${element.nombre} ${element.apellido}`;
        fragmento.appendChild(item);
        });
    return fragmento;
}


function traerPersonas(){
    ol.innerHTML = "";
    spinner.appendChild(crearSpinner());


    fetch('http://localhost:3000/personas')
        .then(res => {
            if (!res.ok) return Promise.reject(res);

            return res.json();
        })
        .then(data => {
            ol.appendChild(crearItems(data));
            console.log("Personas Obtenidas con éxito");
        })
        .catch(err => {
            console.error(err.status);
        })
        .finally(() => {
            spinner.innerHTML = "";
        });
}

function altaPersona() {

    let nuevaPersona = {
        "nombre": "Juana",
        "apellido": "Gomez",
        "email": "jgomez@utn.com"
    };


    ol.innerHTML = "";
    spinner.appendChild(crearSpinner());

    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevaPersona)
    };

    fetch('http://localhost:3000/personas', config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);

            return res.json();
        })
        .then(personaAgregada => {
            console.log("alta exitosa", personaAgregada);
        })
        .catch(err => {
            console.error(err.status);
        })
        .finally(() => {
            spinner.innerHTML = "";
        });
}

function modificar(){
    const p={
        "nombre":"jose",
        "apellido":"perez",
        "email":"jperez@utn.com"
    };

    delete(p.id);

    ol.innerHTML = "";
    spinner.appendClild(crearSpinner());

    const config = {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevaPersona)
    };
    fetch('http://localhost:3000/personas'+id)
    .then(res => {
        if (!res.ok) return Promise.reject(res);

        return res.json();
    })
    .then(personaAgregada => {
        console.log("alta exitosa", personaAgregada);
    })
    .catch(err => {
        console.error(err.status);
    })
    .finally(() => {
        spinner.innerHTML = "";
    });
}