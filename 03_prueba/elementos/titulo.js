import { Elementos } from "../Context.js";

export class Titulo extends Elementos {
    constructor() {
        super();
        this.configurarEstilos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('div');
        this.estrcturaHTML.className = "contenedor elemento";
        this.estrcturaHTML.id = this.id;
        this.estrcturaHTML.innerHTML = '| Titulo |';
        
        // Configuración de estilos en línea
        Object.assign(this.estrcturaHTML.style, {
            background: "gray",
            width: "100%",
            //minHeight: "10rem",
            padding: "1rem",
        });
    }

    static new() {
        return new Contenedor();
    }
}