import IniciarDOM from "./init.js"
import { Titulo } from "./elementos/titulo.js"
import { Contenedor } from "./elementos/contenedor.js";

//iniciamos el dom para cargar los elmentos necesarios
IniciarDOM();

// Inicializamos los elementos existentes dentro de menu de elemntos
Titulo.return_menu()

// Creamos una nueva instancia de Contenedor
const contenedor = new Contenedor();
contenedor.return_menu();
contenedor.return_panel();
contenedor.return_zona_dragable();