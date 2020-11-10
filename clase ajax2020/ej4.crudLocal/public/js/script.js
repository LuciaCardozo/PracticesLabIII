const ol = document.querySelector(".ol");//referencia a ese ol . por que es una class
const btnTraer = document.getElementById("btnTraer");
const spinner = document.getElementById("spinner");

btnTraer.addEventListener("click",(e)=>{
    //traerPersonas();
    //altaPersona();
    //modificarPersona();
    eliminarPersona();
});

function altaPersona(){

    let nuevaPersona = {
        "nombre":"Juan",
        "apellido":"Perez",
        "email":"juanitoPerez@utn.org"
        };
    const xhr = new XMLHttpRequest();

    ol.innerHTML ="";

    spinner.appendChild(crearSpinner());
    
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4){
            //hacemos algo y termino
            if(xhr.status >= 200 && xhr.status<300){
                //codigo cuando salio todo bien
                let datos = JSON.parse(xhr.responseText);
                //ol.appendChild(crearItems(datos));
                
                console.log(datos);//tiramos la funcion tabla
            }else{
                //console.log(xhr);
                let mensaje = xrh.statusText || "Se produjo un error";
                //console.log("Error: "+xhr.status+mensaje);
                console.log("Error: "+xhr.status+"-"+mensaje);
                //codigo cuando esta todo mal
            }
            spinner.innerHTML="";//se puede remover cada hijo(preguntar si tiene hijos e ir removiendolos)
        }
    });
    xhr.open('POST',"http://localhost:3000/personas");//method es POST,GET,PUT o DELETE (Por defecto es get) y url
    
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");

    xhr.send(JSON.stringify(nuevaPersona));
}

function modificarPersona(){

    let personaAModificar = {
        "nombre":"Jose",
        "apellido":"Perez",
        "email":"jPerez@utn.org"
        };
    const xhr = new XMLHttpRequest();

    ol.innerHTML ="";

    spinner.appendChild(crearSpinner());
    
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4){
            //hacemos algo y termino
            if(xhr.status >= 200 && xhr.status<300){
                //codigo cuando salio todo bien
                let datos = JSON.parse(xhr.responseText);
                //ol.appendChild(crearItems(datos));
                
                console.log(datos);//tiramos la funcion tabla
            }else{
                //console.log(xhr);
                let mensaje = xhr.statusText || "Se produjo un error";
                //console.log("Error: "+xhr.status+mensaje);
                console.log("Error: "+xhr.status+"-"+mensaje);
                //codigo cuando esta todo mal
            }
            spinner.innerHTML="";//se puede remover cada hijo(preguntar si tiene hijos e ir removiendolos)
        }
    });
    xhr.open('PUT',"http://localhost:3000/personas/"+21);//method es POST,GET,PUT o DELETE (Por defecto es get) y url
    
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");

    xhr.send(JSON.stringify(personaAModificar));
}

function eliminarPersona(){

    const xhr = new XMLHttpRequest();

    ol.innerHTML ="";

    spinner.appendChild(crearSpinner());
    
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4){
            //hacemos algo y termino
            if(xhr.status >= 200 && xhr.status<300){
                //codigo cuando salio todo bien
                let datos = JSON.parse(xhr.responseText);
                //ol.appendChild(crearItems(datos));
                
                console.log(datos);//tiramos la funcion tabla
            }else{
                //console.log(xhr);
                let mensaje = xhr.statusText || "Se produjo un error";
                //console.log("Error: "+xhr.status+mensaje);
                console.log("Error: "+xhr.status+"-"+mensaje);
                //codigo cuando esta todo mal
            }
            spinner.innerHTML="";//se puede remover cada hijo(preguntar si tiene hijos e ir removiendolos)
        }
    });
    xhr.open('DELETE',"http://localhost:3000/personas/"+21);//method es POST,GET,PUT o DELETE (Por defecto es get) y url
    
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");

    xhr.send();
}


function crearSpinner(){
    const img = document.createElement('img');
    img.setAttribute("src","./images/spinner.gif");
    img.setAttribute("alt","Imagen spinner");
    return img;
}

const crearItems = (data)=>{
    const fragmento = document.createDocumentFragment();
    data.forEach(element => {
        const item = document.createElement('li');
        item.textContent = `${element.nombre} ${element.apellido} ${element.email}`;
        fragmento.appendChild(item);
    });

    return fragmento;
}

function traerPersonas(){
    const xhr = new XMLHttpRequest();

    ol.innerHTML ="";

    spinner.appendChild(crearSpinner());
    
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4){
            //hacemos algo y termino
            if(xhr.status >= 200 && xhr.status<300){
                //codigo cuando salio todo bien
                let datos = JSON.parse(xhr.responseText);
                ol.appendChild(crearItems(datos));
                console.log(datos);//tiramos la funcion tabla
            }else{
                console.log(xhr);
                let mensaje = xrh.statusText || "Se produjo un error";
                console.log("Error: "+xhr.status+mensaje);
                //console.log("Error: "+xhr.status+"-"+xhr.statusText);
                //codigo cuando esta todo mal
            }
            spinner.innerHTML="";//se puede remover cada hijo(preguntar si tiene hijos e ir removiendolos)
        }
    });
    xhr.open('GET',"http://localhost:3000/personas");//method es POST,GET,PUT o DELETE (Por defecto es get) y url
    xhr.send();
}