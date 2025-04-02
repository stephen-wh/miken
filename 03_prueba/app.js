// app.js
import { Context, Elementos } from "./Context.js";
import { Contenedor } from './elementos/contenedor.js'; // Auto-registra las clases

const app = document.getElementById('app');

app.innerHTML = `
    <div class="menu-panel">
        <h2>Elementos disponibles</h2>
        <div class="elements-menu"></div>
    </div>
    <div class="workspace">
        <div class="drop-zone"></div>
    </div>
    <div class="properties-panel">
        <h2>Propiedades</h2>
    </div>
`;

Context.init({
    menu: document.querySelector('.elements-menu'),
    panel: document.querySelector('.properties-panel'),
    dropZone: document.querySelector('.drop-zone'),
});

Context.registrarClase(Contenedor);
new Contenedor().runApp()
