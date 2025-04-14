export class PropertyManager {
    static type = Object.freeze({
        media : 5,
        size: 4,
        color: 3,
        select: 2,
        text: 1,
        number: 0
    });
    
    static generarControles(schema, propiedades, onUpdate) {
        const container = document.createElement('div');
        container.className = 'propiedades-contenedor';
        
        Object.entries(schema).forEach(([key, config]) => {
            const grupo = document.createElement('div');
            grupo.className = 'propiedad-grupo';
            
            const label = document.createElement('label');
            label.textContent = config.label;
            
            let input;
            switch(config.tipo) {
                case PropertyManager.type.color:
                    input = document.createElement('input');
                    input.type = 'color';
                    input.value = propiedades[key] || '#000000';
                break;
                    
                case PropertyManager.type.select:
                    input = document.createElement('select');
                    config.opciones.forEach(opcion => {
                        const option = document.createElement('option');
                        option.value = opcion.valor;
                        option.textContent = opcion.texto;
                        input.appendChild(option);
                    });
                    input.value = propiedades[key] || config.opciones[0]?.valor;
                break;
                    
                case PropertyManager.type.size:
                    const sizeContainer = document.createElement('div');
                    sizeContainer.className = 'size-container';
                    
                    const numInput = document.createElement('input');
                    numInput.type = 'number';
                    numInput.value = propiedades[key]?.value || 0;
                    
                    const unitSelect = document.createElement('select');
                    ['px', '%', 'em', 'rem'].forEach(unit => {
                        const option = document.createElement('option');
                        option.value = unit;
                        option.textContent = unit;
                        unitSelect.appendChild(option);
                    });
                    unitSelect.value = propiedades[key]?.unidad || 'px';
                    
                    // Manejador de eventos local
                    const handleSizeChange = () => {
                        propiedades[key] = {
                            value: numInput.value,
                            unidad: unitSelect.value
                        };
                        onUpdate(key, propiedades[key]);
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
                                propiedades[key] = event.target.result; // Guardamos el DataURL
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
                    input.value = propiedades[key] || 0;
                break;
                    
                default: // text
                    input = document.createElement('input');
                    input.type = 'text';
                    input.value = propiedades[key] || '';
            }
            
            // Manejador genérico solo para tipos básicos
            if(config.tipo !== PropertyManager.type.size) {
                input.addEventListener('input', (e) => {
                    propiedades[key] = e.target.value;
                    onUpdate(key, e.target.value);
                });
            }
            
            grupo.append(label, input);
            container.appendChild(grupo);
        });
        
        return container;
    }
}