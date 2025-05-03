// app.js
import { Context } from "./configuraciones/Context.js";
import { Contenedor } from './elementos/contenedor.js';
import { Titulo } from './elementos/titulo.js';
import { Imagen } from './elementos/imagen.js';

const app = document.getElementById('app');
app.innerHTML = `
    <div class="menu-panel">
        <h2>Elementos disponibles</h2>
        <div class="elements-menu">
            <div class="elements-catalogo"></div>
            <div class="elements-estructura"></div>
        </div>
        
    </div>
    <div class="workspace">
    </div>
    <div class="properties-panel">
        <h2>Propiedades</h2>
    </div>
`;

Context.init({
    panel: document.querySelector('.properties-panel'),
    dropZone: document.querySelector('.workspace'),
    catalogo: document.querySelector('.elements-catalogo'),
    estructura: document.querySelector('.elements-estructura'),
});

Context.registrarClase(Contenedor);
Context.registrarClase(Titulo);
Context.registrarClase(Imagen);

new Contenedor().runApp();