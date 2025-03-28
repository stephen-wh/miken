// Clase para definir estilos o configuración de títulos (se puede ampliar)
export class ElemTitulo {
  constructor() {
    this.color = "#000";
    this.text_size = "16px";
    this.align = "center"; // Puede ser 'start', 'center', 'end'
  }
  // Métodos para obtener información podrían definirse aquí
  return_menu() { return "este es un titulo"; }
  return_panel() { return ""; }
  return_zona_dragable() { return ""; }
}