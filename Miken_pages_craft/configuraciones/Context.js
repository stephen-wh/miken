// configuraciones/Context.js
import {PropertyManager} from "./Propiedades.js"

export class Context {
    static clasesRegistradas = new Map();
    static registros = [];
    static elementosRegistrados = [];
    static max_id = 0;
    static selectedElement = null;
    
    // Añadir estas propiedades estáticas
    static catalogo = null;
    static estructura = null;
    static panel = null;
    static dropZone = null;

    //variable para tener n paginas
    static paginas = null;

    static init({ panel, dropZone, catalogo, estructura }) {
        Context.catalogo = catalogo;
        Context.estructura = estructura;
        Context.panel = panel;
        Context.dropZone = dropZone;
    }

    static registrarClase(ElementClass) {
        const div = document.createElement('div');
        div.className = "element-item";
        div.draggable = true;
        div.id = ElementClass.name;
        div.innerHTML = `<h4>${ElementClass.name}</h4>`;

        div.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', ElementClass.name);
            e.target.classList.add('dragging');
        });

        div.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });

        Context.catalogo.appendChild(div);
        Context.clasesRegistradas.set(ElementClass.name, ElementClass);
    }

    static buscarClaseById(nombre_clase) {
        return Context.clasesRegistradas.get(nombre_clase);
    }

    static agregarElemento(elemento) {
        Context.registros.push(elemento);
        Context.max_id += 1;
    }

    static buscarElementoById(id) {
        return Context.registros.find(e => e.id === id) || null;
    }

    static actualizarPanel(elemento) {
        // Limpiar selección anterior
        Context.registros.forEach(el => {
            if(el.estrcturaHTML) el.estrcturaHTML.classList.remove('selected');
        });
        
        Context.selectedElement = elemento;
        Context.panel.innerHTML = ''; // Limpiar panel
        
        if (elemento && elemento.Propiedades_genararContraoles) {
            const propiedadesUI = elemento.Propiedades_genararContraoles();
            Context.panel.appendChild(propiedadesUI);
        }
    }

    static mostrarLista(){
        console.log("Clases registradas:", Array.from(Context.clasesRegistradas.keys()));
        console.log("Registros:", Context.registros);
    }
    
    static eliminarElemento(elemento) {
        console.log("entro a context con ", elemento)
        if (elemento.id=="elemento-1"){ return }
        // Remover de registros
        Context.registros = Context.registros.filter(el => el.id !== elemento.id);
        
        // Remover del DOM
        if(elemento.estrcturaHTML && elemento.estrcturaHTML.parentNode) {
            elemento.estrcturaHTML.parentNode.removeChild(elemento.estrcturaHTML);
        }
        
        // Limpiar selección
        Context.selectedElement = null;
        Context.actualizarPanel(null);
        
        console.log(`Elemento ${elemento.id} eliminado`);
    }
}

export class Elementos extends PropertyManager{
    constructor() {
        super();
        this.id = `elemento-${Context.max_id + 1}`;
        this.hijos = [];
        this.propiedades;
        Context.agregarElemento(this);
    }

    aplicar_debbugin(){
        this.estrcturaHTML.style.position = "relative"
        this.titulo = document.createElement('h3');
        this.titulo.innerText = this.constructor.name
        Object.assign(this.titulo.style, {
            position: "absolute",
            top: "0",
            right: "0",
            color: "red",
            display: "none"
        });
        this.estrcturaHTML.appendChild(this.titulo);
        this.interaccion_debbug()
    }

    interaccion_debbug(){
        //tecnicamente si esta en produccion esto de debe quitar
        const MauseEntry = (e) => {
            e.target.style.border = "2px solid red"
            this.titulo.style.display = "block"
        };
        const MauseExit = (e) => {
            e.target.style.border = "0px solid red"
            this.titulo.style.display = "none"
        };
        this.estrcturaHTML.addEventListener('mouseenter', MauseEntry);
        this.estrcturaHTML.addEventListener('mouseleave', MauseExit);        
    }
}