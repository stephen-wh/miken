export class Context {
    static clasesRegistradas = new Map();

    static registros = []

    /** @type {HTMLElement} */
    static menu = null;
     /** @type {HTMLElement} */
    static panel = null;
     /** @type {HTMLElement} */
    static dropZone = null;

    static document = null

    static elemntosRegistrados = []; // Lista de instancias de elementos
    static max_id = 0; // ID autoincremental

    static init({menu, panel, dropZone}){
        Context.menu =  menu;
        Context.panel= panel;
        Context.dropZone= dropZone;
    };

    static registrarClase(ElementClass) {
        //se agraga a egoistros y si sau nombre de la clase en el manu 
        Context.clasesRegistradas.set(ElementClass.name, ElementClass);
        Context.menu.innerHTML += `
        <div draggable=true class="Contenedor" id="${ElementClass.name}">
            <h1>${ElementClass.name}</h1>
        </div>`
        //se busca el elemnto creado y se declara logica de draggin
        let elemento = document.getElementById(ElementClass.name)
        elemento.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', ElementClass.name);
            e.target.classList.add('dragging');
        });
        elemento.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });
    }

    static buscarClaseById(nombre_clase) {
        return Context.clasesRegistradas.get(nombre_clase);
    }

    static agregarContexto({menu, panel, dropZone}) {
        Context.menu = menu;
        Context.panel = panel;
        Context.dropZone = dropZone;
    }

    static agregarElemento(elemento) {
        Context.registros.push(elemento);
        Context.max_id += 1;
    }

    static buscarElementoById(Id) {
        return Context.registros.find(elemento => elemento.id === Id) || null;
    }
}


export class Elementos {

    constructor() {
        this.id = "miken_element"+(Context.max_id + 1);
        this.hijos = [];
        Context.agregarElemento(this)
    }

    render() {
        StartZonaDraggableById(this.id)
    }

}

// Funcion para inicializar la zona dragable de un objeto
const StartZonaDraggableById=(id, elemento)=>{
    // Seleccionamos el área de destino
    const zonaDestino = document.getElementById(id);
  
    // Evitamos el comportamiento por defecto en 'dragover' para permitir soltar el elemento
    zonaDestino.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necesario para permitir el 'drop'
        e.dataTransfer.dropEffect = 'copy'; // Indicamos que la operación es de copia
        zonaDestino.style.backgroundColor = '#d0ffd0'; // Cambiamos el color de fondo al pasar sobre el área de destino
    });
  
    // Restauramos el color de fondo cuando el elemento arrastrado sale del área de destino
    zonaDestino.addEventListener('dragleave', () => {
        zonaDestino.style.backgroundColor = '#f0f0f0';
    });
  
    // Manejamos el evento 'drop' para soltar el elemento en el área de destino
    zonaDestino.addEventListener('drop', (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del navegador
        const idElemento = e.dataTransfer.getData('text/plain'); // Obtenemos el ID del elemento arrastrado
        const elementoOriginal = document.getElementById(idElemento); // Seleccionamos el elemento original
        const clase_elemnto = buscarClaseById(idElemento)
        const elementoClonado = clase_elemnto.new(); //inicializamos una nuecva instancia de la clase
        // los elemntos deben tener una funcion render
        // de lo contraroio no funcionara pero toidas deben tener una funcion render
  
        // Asignamos un nuevo ID al clon para evitar conflictos en el DOM
        elementoClonado.id = idElemento + '-clon-' + new Date().getTime(); 
  
        // Agregamos el clon al área de destino
        zonaDestino.appendChild(elementoClonado);
        zonaDestino.style.backgroundColor = '#f0f0f0'; // Restauramos el color de fondo
  
        // Añadimos los eventos de arrastrar al clon para que también sea draggable
        elementoClonado.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'copy';
            e.target.style.opacity = '0.5';
        });
  
        elementoClonado.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
        });
    });
  }


// class Titulo extends ElementosContext {
//     constructor(contenido) {
//         super();
//         this.contenido = contenido
//     }
// }

// class Contenedor extends ElementosContext {
//     constructor() {
//         super();
//     }
//     saludar(){
//         console.log("yo soy el padre de" + ElementosContext.key)
//     }
// }

// // Creando la genealogía
// let context = new ElementosContext()
// context.agregarKey("hola :D")

// let porros = new Titulo("los Porros de la unam");
// let pajaros = new Titulo("los Pajaros de la mañana");

// let noticia = new Contenedor();
// noticia.agregarHijo(pajaros); // ahora es noticia pajaros

// // Pruebas
// pajaros.obtenerPadre();
// porros.obtenerPadre();