import { Context, Elementos } from "../Context.js";

export class Contenedor extends Elementos {
    constructor() {
        super();
        this.configurarEstilos();
        this.configurarEventos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('div');
        this.estrcturaHTML.className = "drop-zone contenedor";
        this.estrcturaHTML.id = this.id;
        this.estrcturaHTML.innerHTML = '| Contenedor |';
        
        // Configuración de estilos en línea
        Object.assign(this.estrcturaHTML.style, {
            background: "gray",
            width: "100%",
            //height: "10rem",
            minHeight: "10rem",
            padding: "1rem",
        });
    }

    configurarEventos() {
        const handleDragOver = (e) => {
            // Solo activar si el objetivo es el contenedor mismo
            if (e.target === this.estrcturaHTML) {
                e.preventDefault();
                e.stopPropagation();
                this.estrcturaHTML.classList.add('drop-zone--active');
            }
        };

        const handleDragLeave = (e) => {
            // Solo desactivar si sale del contenedor principal
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
                this.estrcturaHTML.style.zIndex = "1";  // Restaurar z-index
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const idArrastrado = e.dataTransfer.getData('text/plain');
            const ClaseElemento = Context.buscarClaseById(idArrastrado);
            
            if (ClaseElemento) {
                const nuevoElemento = new ClaseElemento();
                this.estrcturaHTML.appendChild(nuevoElemento.estrcturaHTML);
            }
            
            this.estrcturaHTML.classList.remove('drop-zone--active');
            this.estrcturaHTML.style.zIndex = "1";
        };

        // Asignar eventos
        this.estrcturaHTML.addEventListener('dragover', handleDragOver);
        this.estrcturaHTML.addEventListener('dragleave', handleDragLeave);
        this.estrcturaHTML.addEventListener('drop', handleDrop);
    }

    runApp() {
        Context.dropZone.appendChild(this.estrcturaHTML);
    }

    static new() {
        return new Contenedor();
    }
}