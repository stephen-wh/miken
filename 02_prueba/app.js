import IniciarDOM from "./init.js"
import {ElemnrtContainer} from "./elementos/contenedor.js"
import {ElemTitulo} from "./elementos/titulo.js"
//iniciamos el dom para cargar los elmentos necesarios
const { menu, panel, zonadragable } = IniciarDOM();

// Inicializamos los elementos existentes dentro de menu de elemntos

menu.innerHTML = new ElemTitulo().return_menu()
menu.innerHTML += new ElemnrtContainer().return_menu()

class PackElementos {
    constructor() {
      this.elements = [];
    }
    // Ejemplo de método para inicializar y extraer la información del menú
    init_elements(elemContainer) {
      // Se extrae la estructura del menú desde la instancia de ElemnrtContainer
      menu = elemContainer;
      menu.innerHTML = menuContent;
    }
}

const pack = new PackElementos();

// Ejemplo de uso de las clases para extraer información y actualizar el contenido
const contenedor = new ElemnrtContainer();

// Extraemos la estructura del menú a través del método de la clase PackElementos
pack.init_elements(contenedor);