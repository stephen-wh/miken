import { Context, Elementos } from "../configuraciones/Context.js";
import { PropertyManager } from "../configuraciones/Propiedades.js";

export class Titulo extends Elementos {
    constructor() {
        super()
        this.propiedades ={
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
        }
        this.Propiedades_genararContraoles();
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
        const tamaño = this.propiedades.tamaño.valorInicial 
        ? `${this.propiedades.tamaño.valorInicial.value}${this.propiedades.tamaño.valorInicial.unidad}`
        : '24px';
                
        Object.assign(this.estrcturaHTML.style, {
            fontSize: tamaño,
            color: this.propiedades.color.valorInicial,
            margin: '1rem 0',
            padding: '0.5rem'
        });
        
        this.estrcturaHTML.textContent = this.propiedades.texto.valorInicial;
    }

    configurarEventos() {
        this.estrcturaHTML.addEventListener('click', (e) => {
            e.stopPropagation();
            Context.actualizarPanel(this);
        });
    }
}