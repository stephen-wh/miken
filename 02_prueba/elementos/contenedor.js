import { ElementosContext } from "../Context.js";

export class Contenedor extends ElementosContext {
  constructor() {
    super();
    // Configuración del contenedor
    this.direccion = 0; // 0: horizontal, 1: vertical
    this.color_fondo = "#000";
    this.grap = 1;
    this.class_draggable = "Contenedor";
  }

  // Método para agregar el contenedor al menú
  return_menu() {
    const html = `
      <div draggable="true" class="${this.class_draggable}" id="${this.id}">
        <h2>Contenedor</h2>
      </div>
    `;
    // Se agrega el HTML al menú
    ElementosContext.menu.innerHTML += html;
    // Configuramos el drag & drop sobre este contenedor (por ID)
    this.reconocer_draggable();
  }

  // Método para retornar una estructura de panel
  return_panel() {
    const html = `
      <div id="${this.id}_panel" style="border:1px solid #ccc; padding:10px; margin:5px;">
        Panel del Contenedor
      </div>
    `;
    ElementosContext.panel.innerHTML += html;
  }

  // Método para retornar la zona dragable propia del contenedor
  return_zona_dragable() {
    const html = `
      <div id="${this.id}_zona" class="zona-draggable" style="border:1px dashed #ccc; padding:10px; margin:5px;">
        Zona Dragable del Contenedor
      </div>
    `;
    ElementosContext.zona_draggable.innerHTML += html;
    // Configuramos el drop en la zona específica del contenedor
    this.configurarDropEnZona(this.id + "_zona");
  }

  // Configura los eventos de drag & drop para el elemento actual (por su ID)
  reconocer_draggable() {
    const elemento = document.getElementById(this.id);
    if (!elemento) return;
    
    // Drag start: se establece la data con el id del elemento
    elemento.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "copy";
      elemento.style.opacity = "0.5";
    });
    
    // Drag end: restauramos la opacidad
    elemento.addEventListener("dragend", (e) => {
      elemento.style.opacity = "1";
    });
    
    // Configuramos el drop para la zona global si aún no lo tiene
    this.configurarDropEnZona("zonadragable");
  }

  // Configurar eventos drop en una zona específica (puede ser global o de contenedor)
  configurarDropEnZona(zonaId) {
    const zona = document.getElementById(zonaId);
    if (!zona) return;
    
    zona.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      zona.style.backgroundColor = "#d0ffd0";
    });
    
    zona.addEventListener("dragleave", () => {
      zona.style.backgroundColor = "#f0f0f0";
    });
    
    zona.addEventListener("drop", (e) => {
      e.preventDefault();
      zona.style.backgroundColor = "#f0f0f0";
      
      const idElemento = e.dataTransfer.getData("text/plain");
      const elementoOrigen = document.getElementById(idElemento);
      
      if (elementoOrigen) {
        // Si el drop ocurre en la zona global (del menú), clonamos y registramos al contenedor
        if (zonaId === "zonadragable") {
          const clon = elementoOrigen.cloneNode(true);
          clon.id = idElemento + "-clon-" + new Date().getTime();
          zona.appendChild(clon);
          
          // Se le asignan nuevamente los eventos de drag para el clon
          clon.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", clon.id);
            e.dataTransfer.effectAllowed = "copy";
            clon.style.opacity = "0.5";
          });
          clon.addEventListener("dragend", (e) => {
            clon.style.opacity = "1";
          });
          
          // Buscar la instancia correspondiente al elemento origen y agregar el clon como hijo
          const instanciaOrigen = ElementosContext.registros.find(
            (inst) => inst.id === idElemento
          );
          if (instanciaOrigen) {
            // Aquí se podría crear una nueva instancia (o si se prefiere mover la misma instancia)
            // En este ejemplo asumimos que se crea un clon de la instancia:
            const nuevaInstancia = Object.assign(
              Object.create(Object.getPrototypeOf(instanciaOrigen)),
              instanciaOrigen
            );
            // Registrar como hijo del contenedor actual
            this.agregarHijo(nuevaInstancia);
          }
        }
        // Si el drop ocurre en una zona propia de un contenedor,
        // se transfiere el elemento (moviendo la instancia) al nuevo contenedor
        else if (zonaId.endsWith("_zona")) {
          zona.appendChild(elementoOrigen);
          // Buscamos la instancia y realizamos la transferencia:
          const instanciaOrigen = ElementosContext.registros.find(
            (inst) => inst.id === idElemento
          );
          if (instanciaOrigen) {
            // Transferimos el elemento desde su padre actual al contenedor dueño de esta zona
            ElementosContext.transferirElemento(instanciaOrigen, this);
          }
        }
      }
    });
  }
}
