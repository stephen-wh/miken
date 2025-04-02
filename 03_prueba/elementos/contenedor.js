import { Context, Elementos } from "../Context.js";

export class Contenedor extends Elementos {
  constructor() {
    super(); // Configuración del contenedor
    this.direccion = 0; // 0: horizontal, 1: vertical
    this.color_fondo = "orange";
    this.grap = 1;
    this.width = "100%";
    this.height = "100%";
    this.margin = "1rem"
    
    this.estrcturaHTML = document.createElement('div');
    this.estrcturaHTML.id = this.id;
    this.estrcturaHTML.width = this.width;
    this.estrcturaHTML.height = this.height;
    this.estrcturaHTML.style.background = this.color_fondo;
    this.estrcturaHTML.innerHTML = '| contenedor |';

    this.estrcturaHTML.addEventListener('dragover', (e) => {
        // prevenimos accion por defecto
      e.preventDefault();
      // Indicamos que la operación es de copia
      e.dataTransfer.dropEffect = 'copy'; 
      // indicamos zona acesible cambiando de color
      this.estrcturaHTML.style.backgroundColor = '#d0ffd0'; 
    });
    //Elemento arrastrado sale del área de destino
    this.estrcturaHTML.addEventListener('dragleave', () => {
      //Restauramos el color de fondo cuando el 
      this.estrcturaHTML.style.backgroundColor = '#f0f0f0'; 
    });
    // Manejamos el evento al "soltar" el elemento en el área de destino
    this.estrcturaHTML.addEventListener('drop', (e) => {
      // Evita el comportamiento por defecto del navegador
      e.preventDefault(); 
      // Obtenemos el ID del elemento arrastrado (que basicamente es el className)
      const id_arrastrado = e.dataTransfer.getData('text/plain'); 
      // Buscamos la clase dntro de context
      const claseElemento = Context.buscarClaseById(id_arrastrado)
      // generemos un nuevo elemento con la clase
      const nueva_clase = claseElemento.new()
      // Agregamos la estructura html ala zona destino
      this.estrcturaHTML.appendChild(nueva_clase.estrcturaHTML);
      this.estrcturaHTML.style.backgroundColor = '#f0f0f0'; // Restauramos el color de fondo
    });
  }

  runApp(){
    Context.dropZone.appendChild(this.estrcturaHTML)
  }

  static new(){
    const nuevo_contenedor = new Contenedor();
    return(nuevo_contenedor)
  }
}

console.log("hola mundo")
// Registra la clase en el contexto