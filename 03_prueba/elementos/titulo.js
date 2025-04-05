import { Context, Elementos } from "../Context.js";

export class Titulo extends Elementos {
    constructor() {
        super();
        this.propiedades = {
            texto: "Nuevo Título",
            tamaño: "1.5rem",
            color: "#333"
        };
        this.configurarEstilos();
        this.configurarEventos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('h2');
        this.estrcturaHTML.className = "elemento-titulo";
        this.estrcturaHTML.contentEditable = true;
        
        Object.assign(this.estrcturaHTML.style, {
            fontSize: this.propiedades.tamaño,
            color: this.propiedades.color,
            margin: "0.5rem 0"
        });
        
        this.actualizarTexto();
    }

    actualizarTexto() {
        this.estrcturaHTML.textContent = this.propiedades.texto;
    }

    getPropiedades() {
        const container = document.createElement('div');
        container.className = 'propiedades-contenedor';
        
        const titulo = document.createElement('h3');
        titulo.textContent = 'Propiedades del Título';
        
        // Campo de texto
        const textoLabel = document.createElement('label');
        textoLabel.textContent = 'Texto:';
        const textoInput = document.createElement('input');
        textoInput.type = 'text';
        textoInput.value = this.propiedades.texto;
        
        // Tamaño de fuente
        const tamañoLabel = document.createElement('label');
        tamañoLabel.textContent = 'Tamaño:';
        const tamañoInput = document.createElement('input');
        tamañoInput.type = 'text';
        tamañoInput.value = this.propiedades.tamaño;
        
        // Color
        const colorLabel = document.createElement('label');
        colorLabel.textContent = 'Color:';
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = this.propiedades.color;
        
        // Eventos
        textoInput.addEventListener('input', (e) => {
            this.propiedades.texto = e.target.value;
            this.actualizarTexto();
        });
        
        tamañoInput.addEventListener('input', (e) => {
            this.propiedades.tamaño = e.target.value;
            this.estrcturaHTML.style.fontSize = e.target.value;
        });
        
        colorInput.addEventListener('input', (e) => {
            this.propiedades.color = e.target.value;
            this.estrcturaHTML.style.color = e.target.value;
        });
        
        container.append(
            titulo,
            textoLabel,
            textoInput,
            tamañoLabel,
            tamañoInput,
            colorLabel,
            colorInput
        );
        
        return container;
    }

    configurarEventos() {
        this.estrcturaHTML.addEventListener('click', (e) => {
            e.stopPropagation();
            Context.actualizarPanel(this);
            this.estrcturaHTML.classList.add('selected');
        });
    }

}