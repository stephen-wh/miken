import { Context, Elementos } from "../Context.js";

export class Contenedor extends Elementos {
  constructor() {
    super(); // Configuración del contenedor
    this.direccion = 0; // 0: horizontal, 1: vertical
    this.color_fondo = "#000";
    this.grap = 1;
  }

  runApp(){
    Context.dropZone.innerHTML +=`
    <div id="${this.id}"> Render </div>
    `
    let zonaDestino = document.getElementById(this.id)
    //Agregamos evento escucha del arrastre
    zonaDestino.addEventListener('dragover', (e) => {
       // prevenimos accion por defecto
      e.preventDefault();
      // Indicamos que la operación es de copia
      e.dataTransfer.dropEffect = 'copy'; 
      // indicamos zona acesible cambiando de color
      zonaDestino.style.backgroundColor = '#d0ffd0'; 
    });
    //Elemento arrastrado sale del área de destino
    zonaDestino.addEventListener('dragleave', () => {
      //Restauramos el color de fondo cuando el 
      zonaDestino.style.backgroundColor = '#f0f0f0'; 
    });
    // Manejamos el evento al "soltar" el elemento en el área de destino
    zonaDestino.addEventListener('drop', (e) => {
      // Evita el comportamiento por defecto del navegador
      e.preventDefault(); 
      // Obtenemos el ID del elemento arrastrado (que basicamente es el className)
      const id_arrastrado = e.dataTransfer.getData('text/plain'); 
      // Buscamos la clase dntro de context
      const claseElemento = Context.buscarClaseById(id_arrastrado)
      console.log(id_arrastrado)
      console.log(claseElemento)
      // generemos un nuevo elemento con la clase
      const HTML = claseElemento.new()
      console.log(HTML)
      // Agregamos la estructura html ala zona destino
      zonaDestino.appendChild(HTML);
      zonaDestino.style.backgroundColor = '#f0f0f0'; // Restauramos el color de fondo
    });
  }

  static new(){
    let nuevoDiv = document.createElement('div');
    nuevoDiv.id = 'miNuevoDiv';
    nuevoDiv.innerHTML = '¡Hola, soy un div!';
    return(nuevoDiv)
  }
}

console.log("hola mundo")
// Registra la clase en el contexto