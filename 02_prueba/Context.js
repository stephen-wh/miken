export class ElementosContext {

    /** @type {HTMLElement} */
    static menu = null

    /** @type {HTMLElement} */
    static panel = null

    /** @type {HTMLElement} */
    static zona_draggable = null

    static registros = []; // Lista estática de todas los elementos
    static max_id = 0 // Se reconoce el ultimo id guardado

    constructor() {
        this.id = "miken_"+(ElementosContext.max_id + 1);
        this.hijos = [];
        this.padre = null;
        ElementosContext.registros.push(this); // Se registra automáticamente
        ElementosContext.max_id = ElementosContext.max_id + 1; // Se registra el id como el nuevo maximo
    }

    static agregarContexto({menu, panel, zona_draggable}){
        ElementosContext.menu = menu
        ElementosContext.panel = panel
        ElementosContext.zona_draggable = zona_draggable
    }

    // retorna codigo html para la getsion de estructura html de un menu
    static return_menu(codigoHTML){
        return( ElementosContext.menu.innerHTML += `
        <div draggable = true id="${this.id}">
            <h1>${codigoHTML}</h1>
        </div>
        ` )
    }

    // Obtener padre
    obtenerPadre() {
        if (this.padre){
            this.padre.saludar()
            return
        }
        console.log("No tengo padre")
        return
    }

    // Agregar hijo y asignar padres
    agregarHijo(elemento) {
        if (elemento instanceof ElementosContext) {
            // El negrito es el unico tuyo :c
            this.hijos.push(elemento);
            // Lu yo soy tu padre XD
            elemento.padre = this;

            // Si el que agrega es una clase titulo se condiciona
            // if (this instanceof ClassTitulo) {
                    //logica
            // }
        }
    }

    // (BETA) Método para transferir un elemento a un nuevo padre
    static transferirElemento(elementoInstancia, nuevoPadre) {
        if (elementoInstancia.padre) {
        // Elimina del arreglo de hijos del padre anterior
        const indice = elementoInstancia.padre.hijos.indexOf(elementoInstancia);
        if (indice > -1) {
            elementoInstancia.padre.hijos.splice(indice, 1);
        }
        }
        nuevoPadre.agregarHijo(elementoInstancia);
    }
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