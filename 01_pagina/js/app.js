import { initDragAndDrop } from './dragdrop.js';
import { initPropertiesPanel } from './properties.js';
import { initCodeGenerator } from './codeGenerator.js';
import { components } from './components.js';

class App {
    constructor() {
        this.components = [];
        this.selectedComponent = null;
        
        // Inicializar con componentes base si es necesario
        this.components.push(components.createComponent('title'));
        
        initDragAndDrop(this);
        initPropertiesPanel(this);
        initCodeGenerator(this);
    }
}

// Inicializar la aplicación
new App();