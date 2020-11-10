const ol = document.querySelector(".ol");//referencia a ese ol . por que es una class
const btnTraer = document.getElementById("btnTraer");
const spinner = document.getElementById("spinner");

btnTraer.addEventListener("click",(e)=>{
    fetch("http://jsonplaceholder.typicode.com/users")//fetch ya esta programado con response, etc
    .then((res)=>{
        return !res.ok ? Promise.reject() : res.json();// los : es o
        //return res.json()//method asincronico(se demora un poco y cuando esta listo lo devuelve)devuelve una promesa
        //console.log(res);
        //res.blob()//es para imagen o video
    })
    .then((data)=>{
        ol.appendChild(crearItems(data));
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{

    })//es parecido al bloque try,catch,finally pero estos eson metodos
});


/*btnTraer.addEventListener("click",(e)=>{
    const xhr = new XMLHttpRequest();

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
    xhr.open('GET',"http://jsonplaceholder.typicode.com/users");//method es POST,GET,PUT o DELETE (Por defecto es get) y url
    xhr.send();
});*/

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
        item.textContent = `${element.name} ${element.email}`;
        fragmento.appendChild(item);
    });

    return fragmento;
}