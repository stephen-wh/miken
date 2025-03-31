import { Context } from "./Context.js"

const IniciarDOM = () => {
  // Se define la estructura del DOM en el contenedor "app"
  document.getElementById("app").innerHTML = `
    <div id="elements_menu" class="deploy">
      <strong>Menú</strong>
      <div id="menu">
        <h1> Elementos del Menú </h1>
      </div>
    </div>
    <div id="zonadragable" class="deploy_z">
      <h1> Zona Dragable </h1>
    </div>
    <div id="panel" class="deploy">
      <h1> Panel </h1>
    </div>
  `;
  
  // Se capturan los elementos por su id
  menu = document.getElementById("menu");
  panel = document.getElementById("panel");
  zonadragable = document.getElementById("zonadragable");

  Context.agregarContexto({
    menu: menu,
    panel: panel,
    zona_draggable: zonadragable
  });
}

export default IniciarDOM;