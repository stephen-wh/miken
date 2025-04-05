import { Context, Elementos } from "../Context.js";
import { PropertyManager } from "../Propiedades.js";

export class Titulo extends Elementos {
    constructor() {
        super({
            texto: {
                label: 'Texto',
                tipo: PropertyManager.type.text,
                valorInicial: 'Nuevo Título'
            },
            tamaño: {
                label: 'Tamaño',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 24, unidad: 'px' }
            },
            color: {
                label: 'Color',
                tipo: PropertyManager.type.color,
                valorInicial: '#333'
            }
        });
        
        this.configurarEstilos();
        this.configurarEventos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('h2');
        this.estrcturaHTML.className = "elemento-titulo";
        this.actualizarEstilos();
    }

    actualizarEstilos() {
        // Acceso correcto al valor compuesto
        const tamaño = this.propiedades.tamaño 
        ? `${this.propiedades.tamaño.value}${this.propiedades.tamaño.unidad}`
        : '24px';
                
        Object.assign(this.estrcturaHTML.style, {
            fontSize: tamaño,
            color: this.propiedades.color,
            margin: '1rem 0',
            padding: '0.5rem'
        });
        
        this.estrcturaHTML.textContent = this.propiedades.texto;
    }

    configurarEventos() {
        this.estrcturaHTML.addEventListener('click', (e) => {
            e.stopPropagation();
            Context.actualizarPanel(this);
        });
    }
}