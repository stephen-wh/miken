import { Context, Elementos } from "../configuraciones/Context.js";
import { PropertyManager } from "../configuraciones/Propiedades.js";
import { EventosManager } from "../configuraciones/eventos.js";

export class Contenedor extends Elementos {
    constructor() {
        super({
            background:{
                label: "background",
                tipo: PropertyManager.type.color,
                valorInicial: "#1E1E1E"
            },
            width: { // Reutilizamos el control size existente
                label: 'with',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 100, unidad: '%' }
            },
            minHeight: { // Reutilizamos el control size existente
                label: 'height',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 50, unidad: 'rem' }
            },
            padding: { 
                label: 'padding',
                tipo: PropertyManager.type.size,
                valorInicial: { value: 1, unidad: 'rem' }
            },
            direccion: {
                label: 'Dirección',
                tipo: PropertyManager.type.select,
                opciones: [
                    { valor: 'row', texto: 'Horizontal' },
                    { valor: 'column', texto: 'Vertical' }
                ],
                valorInicial: 'column'
            },
            alineacionPrincipal: {
                label: 'Alineación Principal',
                tipo: PropertyManager.type.select,
                opciones: [
                    { valor: 'flex-start', texto: 'Inicio' },
                    { valor: 'center', texto: 'Centro' },
                    { valor: 'flex-end', texto: 'Final' },
                    { valor: 'space-between', texto: 'Espaciado entre' },
                    { valor: 'space-around', texto: 'Espaciado alrededor' }
                ],
                valorInicial: 'flex-start'
            },
            alineacionSecundaria: {
                label: 'Alineación Secundaria',
                tipo: PropertyManager.type.select,
                opciones: [
                    { valor: 'flex-start', texto: 'Inicio' },
                    { valor: 'center', texto: 'Centro' },
                    { valor: 'flex-end', texto: 'Final' },
                    { valor: 'stretch', texto: 'Estirar' }
                ],
                valorInicial: 'stretch'
            }
        });
        this.configurarEstilos();
        this.configurarEventos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('div');
        this.estrcturaHTML.className = "drop-zone contenedor";
        this.estrcturaHTML.id = this.id;
        //super.aplicar_debbugin();
        this.actualizarEstilos();
    }

    actualizarEstilos() {
        // Valores compuestos
        const width = this.propiedades.width 
        ? `${this.propiedades.width.value}${this.propiedades.width.unidad}`
        : '24px';

        const minHeight = this.propiedades.minHeight 
        ? `${this.propiedades.minHeight.value}${this.propiedades.minHeight.unidad}`
        : '24px';

        const padding = this.propiedades.padding 
        ? `${this.propiedades.padding.value}${this.propiedades.padding.unidad}`
        : '24px';

        Object.assign(this.estrcturaHTML.style, {
            width: width,
            minHeight: minHeight,
            padding: padding,
            backgroundColor: this.propiedades.background, // Sin .value
            display: 'flex',
            flexDirection: this.propiedades.direccion,
            justifyContent: this.propiedades.alineacionPrincipal,
            alignItems: this.propiedades.alineacionSecundaria,
            gap: '1rem', // Espacio entre elementos hijos
            overflow: 'auto'
        });

    }


    configurarEventos() {
        const handleDragOver = (e) => {
            if (e.target === this.estrcturaHTML) {
                e.preventDefault();
                e.stopPropagation();
                this.estrcturaHTML.classList.add('drop-zone--active');
            }
        };

        const handleDragLeave = (e) => {
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
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
        };

        this.estrcturaHTML.addEventListener('click', (e) => {
            if (e.target === this.estrcturaHTML) {
                Context.actualizarPanel(this);
                this.estrcturaHTML.classList.add('selected');
            }
        });
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