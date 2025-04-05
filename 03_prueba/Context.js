export class Context {
    static clasesRegistradas = new Map();
    static registros = [];
    static elementosRegistrados = [];
    static max_id = 0;
    static selectedElement = null;
    
    // Añadir estas propiedades estáticas
    static menu = null;
    static panel = null;
    static dropZone = null;

    static init({ menu, panel, dropZone }) {
        Context.menu = menu;
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

        Context.menu.appendChild(div);
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
        
        if (elemento && elemento.getPropiedades) {
            const propiedadesUI = elemento.getPropiedades();
            Context.panel.appendChild(propiedadesUI);
        }
    }
}

export class Elementos {
    constructor() {
        this.id = `elemento-${Context.max_id + 1}`;
        this.hijos = [];
        Context.agregarElemento(this);
    }
}