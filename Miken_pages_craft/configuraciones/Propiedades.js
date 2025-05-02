// configuraciones/Propiedades.js
import { EventosManager } from "./eventos.js"

export class PropertyManager extends EventosManager {
    constructor(){
        super()
    }

    static type = Object.freeze({
        media : 5,
        size: 4,
        color: 3,
        select: 2,
        text: 1,
        number: 0
    });
    
    Propiedades_genararContraoles(){
        const container = document.createElement('div');
        container.className = 'propiedades-contenedor';
        const onUpdate = () => { if(this.actualizarEstilos) this.actualizarEstilos(); }
        Object.entries(this.propiedades).forEach(([key, config]) => {
            const grupo = document.createElement('div');
            grupo.className = 'propiedad-grupo';
            
            const label = document.createElement('label');
            label.textContent = config.label;
            
            let input;
            switch(config.tipo) {
                case PropertyManager.type.color:
                    input = document.createElement('input');
                    input.type = 'color';
                    input.value = this.propiedades[key].valorInicial || '#000000';
                break;
                    
                case PropertyManager.type.select:
                    input = document.createElement('select');
                    config.opciones.forEach(opcion => {
                        const option = document.createElement('option');
                        option.value = opcion.valor;
                        option.textContent = opcion.texto;
                        input.appendChild(option);
                    });
                    input.value = this.propiedades[key].valorInicial || config.opciones[0]?.valor;
                break;
                    
                case PropertyManager.type.size:
                    const sizeContainer = document.createElement('div');
                    sizeContainer.className = 'size-container';
                    
                    const numInput = document.createElement('input');
                    numInput.type = 'number';
                    numInput.value = this.propiedades[key].valorInicial?.value || 0;
                    
                    const unitSelect = document.createElement('select');
                    ['px', '%', 'em', 'rem'].forEach(unit => {
                        const option = document.createElement('option');
                        option.value = unit;
                        option.textContent = unit;
                        unitSelect.appendChild(option);
                    });
                    unitSelect.value = this.propiedades[key].valorInicial?.unidad || 'px';
                    
                    // Manejador de eventos local
                    const handleSizeChange = () => {
                        this.propiedades[key].valorInicial = {
                            value: numInput.value,
                            unidad: unitSelect.value
                        };
                        if(this.actualizarEstilos) this.actualizarEstilos();
                    };
                    numInput.addEventListener('input', handleSizeChange);
                    unitSelect.addEventListener('change', handleSizeChange);
                    sizeContainer.append(numInput, unitSelect);
                    input = sizeContainer;
                break;
                
                // En Propiedades.js
                case PropertyManager.type.media:
                    const container = document.createElement('div');
                    container.className = 'media-control';
                    
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    
                    fileInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                this.propiedades[key].valorInicial = event.target.result; // Guardamos el DataURL
                                onUpdate(key, event.target.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    
                    container.appendChild(fileInput);
                    input = container;
                break;
                    
                case PropertyManager.type.number:
                    input = document.createElement('input');
                    input.type = 'number';
                    input.value = this.propiedades[key].valorInicial || 0;
                break;
                    
                default: // text
                    input = document.createElement('input');
                    input.type = 'text';
                    input.value = this.propiedades[key].valorInicial || '';
            }
            
            // Manejador genérico solo para tipos básicos
            if(config.tipo !== PropertyManager.type.size) {
                input.addEventListener('input', (e) => {
                    this.propiedades[key].valorInicial = e.target.value;
                    onUpdate(key, e.target.value);
                });
            }
            
            grupo.append(label, input);
            container.appendChild(grupo);
        });
        
        return container;
    }
}