import { Context, Elementos } from "../Context.js";

export class SmartComponent extends Elementos {
    constructor() {
        super({
            layout: {
                label: 'Disposición',
                tipo: 'select',
                opciones: [
                    { valor: 'row', texto: 'Horizontal' },
                    { valor: 'column', texto: 'Vertical' }
                ]
            },
            spacing: {
                label: 'Espaciado',
                tipo: 'unidad',
                valorInicial: '1rem'
            },
            background: {
                label: 'Fondo',
                tipo: 'gradient'
            },
            typography: {
                label: 'Tipografía',
                tipo: 'font'
            },
            border: {
                label: 'Borde',
                tipo: 'border'
            },
            opacity: {
                label: 'Opacidad',
                tipo: 'range',
                min: 0,
                max: 1,
                step: 0.1
            }
        });
        
        this.estrcturaHTML = document.createElement('div');
        this.actualizarEstilos();
    }

    actualizarEstilos() {
        this.estrcturaHTML.style.cssText = `
            display: flex;
            flex-direction: ${this.propiedades.layout};
            gap: ${this.propiedades.spacing};
            background: ${this.propiedades.background};
            font: ${this.propiedades.typography};
            border: ${this.propiedades.border};
            opacity: ${this.propiedades.opacity};
        `;
    }
}