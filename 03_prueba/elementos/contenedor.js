import { Context } from "../Context.js";

export class Contenedor extends Elementos {
  constructor() {
    super(); // Configuración del contenedor
    this.direccion = 0; // 0: horizontal, 1: vertical
    this.color_fondo = "#000";
    this.grap = 1;
  }

  render(){
    return(`
      <div id="${super.id}"> Suelta aquí los elementos </div>
    `)
  }

  new(){
    let nuevoContenedor = new Contenedor();
    return(nuevoContenedor)
  }
}

console.log("hola mundo")
// Registra la clase en el contexto
Context.registerElementClass(Contenedor);