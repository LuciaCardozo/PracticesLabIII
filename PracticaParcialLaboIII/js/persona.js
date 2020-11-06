export default class Persona{
    constructor(id,nombre,apellido,email,sexo){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.sexo = sexo;
    }

    set Sexo(sexo){
        this.sexo = sexo.toLowerCase();
    }
    get Sexo(){
        return this.sexo;
    }
    
}