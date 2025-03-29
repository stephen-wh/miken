import { ElementosContext } from "../Context.js";

// Clase para definir estilos o configuración de títulos (se puede ampliar)
export class Titulo extends ElementosContext{
  constructor() {
    super()
    this.color = "#000";
    this.text_size = "16px";
    this.align = "center"; // Puede ser 'start', 'center', 'end'
  }
  // Métodos para obtener información podrían definirse aquí
  static return_menu() {
    let codigoHTML = `Elemento titulo`
    super.return_menu(codigoHTML)
  }
  return_panel() { return ""; }
  return_zona_dragable() { return ""; }
}