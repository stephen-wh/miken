// elementos/imagen.js
import { Context, Elementos } from "../configuraciones/Context.js";
import { PropertyManager } from "../configuraciones/Propiedades.js";

export class Imagen extends Elementos {
    constructor() {
        super()
        this.propiedades ={
            imagen: {
                label: 'Imagen',
                tipo: PropertyManager.type.media,
                valorInicial: '' // DataURL de la imagen
            },
            width: { // Reutilizamos el control size existente
                label: 'with',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 100, unidad: '%' }
            },
            height: { // Reutilizamos el control size existente
                label: 'height',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 50, unidad: 'rem' }
            },
            ajuste: {
                label: 'Ajuste de imagen',
                tipo: PropertyManager.type.select,
                opciones: [
                    { valor: 'contain', texto: 'Contain' },
                    { valor: 'cover', texto: 'Cover' },
                    { valor: 'fill', texto: 'Fill' },
                    { valor: 'none', texto: 'None' },
                    { valor: 'scale-down', texto: 'Scale Down' }
                ],
                valorInicial: 'cover'
            },
        };
        this.Propiedades_genararContraoles();
        this.configurarEstilos();
        this.Event_Click_Reload_Panel();
        this.Event_SUPRIM();;
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('img');
        this.estrcturaHTML.className = "elemento-imagen";
        //super.aplicar_debbugin();
        this.actualizarEstilos();
    }

    actualizarEstilos() {
        // Valores compuestos
        const width = this.propiedades.width 
        ? `${this.propiedades.width.valorInicial.value}${this.propiedades.width.valorInicial.unidad}`
        : '24px';

        const height = this.propiedades.height 
        ? `${this.propiedades.height.valorInicial.value}${this.propiedades.height.valorInicial.unidad}`
        : '24px';
        
        // Aplicar estilos al contenedor padre
        Object.assign(this.estrcturaHTML.style, {
            borderRadius: '4px',
            width: width,
            height: height,
            margin :"0",
            padding:"0",
            objectFit: this.propiedades.ajuste.valorInicial,
        
        });
        
        // Asignar fuente de imagen
        this.estrcturaHTML.src = this.propiedades.imagen.valorInicial || '';
    }
}