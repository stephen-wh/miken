// elementos / contenedor.js

import { Context, Elementos } from "../configuraciones/Context.js";
import { PropertyManager } from "../configuraciones/Propiedades.js";
import { EventosManager } from "../configuraciones/eventos.js";

export class Contenedor extends Elementos {
    constructor() {
        super()
        this.propiedades = {
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
        }
        this.Propiedades_genararContraoles();
        this.configurarEstilos();
        this.Event_Adress_element();
        this.Event_Click_Reload_Panel();
        this.Event_SUPRIM();
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
        ? `${this.propiedades.width.valorInicial.value}${this.propiedades.width.valorInicial.unidad}`
        : '24px';

        const minHeight = this.propiedades.minHeight
        ? `${this.propiedades.minHeight.valorInicial.value}${this.propiedades.minHeight.valorInicial.unidad}`
        : '24px';

        const padding = this.propiedades.padding 
        ? `${this.propiedades.padding.valorInicial.value}${this.propiedades.padding.valorInicial.unidad}`
        : '24px';

        Object.assign(this.estrcturaHTML.style, {
            width: width,
            minHeight: minHeight,
            padding: padding,
            backgroundColor: this.propiedades.background.valorInicial,
            display: 'flex',
            flexDirection: this.propiedades.direccion.valorInicial,
            justifyContent: this.propiedades.alineacionPrincipal.valorInicial,
            alignItems: this.propiedades.alineacionSecundaria.valorInicial,
            gap: '1rem', // Espacio entre elementos hijos
            overflow: 'auto'
        });

    }

    runApp() {
        Context.dropZone.appendChild(this.estrcturaHTML);
    }

    static new() {
        return new Contenedor();
    }
}