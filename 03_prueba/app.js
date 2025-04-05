import { Context } from "./Context.js";
import { Contenedor } from './elementos/contenedor.js';
import { Titulo } from './elementos/titulo.js';

const app = document.getElementById('app');
app.innerHTML = `
    <div class="menu-panel">
        <h2>Elementos disponibles</h2>
        <div class="elements-menu"></div>
    </div>
    <div class="workspace">
    </div>
    <div class="properties-panel">
        <h2>Propiedades</h2>
    </div>
`;

Context.init({
    menu: document.querySelector('.elements-menu'),
    panel: document.querySelector('.properties-panel'),
    dropZone: document.querySelector('.workspace')
});

Context.registrarClase(Contenedor);
Context.registrarClase(Titulo);

new Contenedor().runApp();