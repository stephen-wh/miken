import { Context } from "./Context.js";

const IniciarDOM = () => {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div id="elements_menu" class="deploy">
            <strong>Menú</strong>
            <div id="menu">
                <h1>Elementos del Menú</h1>
            </div>
        </div>
        <div id="zonadragable" class="deploy_z visor">
            <h1>Zona Dragable</h1>
        </div>
        <div id="panel" class="deploy panel">
            <h1>Panel</h1>
        </div>
    `;

    const menu = document.getElementById("menu");
    const panel = document.getElementById("panel");
    const zonadragable = document.getElementById("zonadragable");

    Context.init({ menu, panel, dropZone: zonadragable });
}

export default IniciarDOM;