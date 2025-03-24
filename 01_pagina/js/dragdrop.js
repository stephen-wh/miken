import { components } from './components.js';

export function initDragAndDrop(app) {
    const draggables = document.querySelectorAll('.draggable-component');
    const canvas = document.getElementById('canvas');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
        });
    });

    canvas.addEventListener('dragover', e => {
        e.preventDefault();
        canvas.classList.add('dragover');
    });

    canvas.addEventListener('dragleave', () => {
        canvas.classList.remove('dragover');
    });

    canvas.addEventListener('drop', e => {
        e.preventDefault();
        canvas.classList.remove('dragover');
        
        const type = e.dataTransfer.getData('text/plain');
        const newComponent = createComponent(type);
        app.components.push(newComponent);
        renderComponent(newComponent, canvas);
    });
}

// Reemplazar la función createComponent existente con:
function createComponent(type) {
    return components.createComponent(type);
}

function renderComponent(component, parent) {
    const element = document.createElement('div');
    element.className = 'component mb-3 p-2 border';
    element.draggable = true;
    element.innerHTML = component.content;
    
    // Aplicar estilos
    Object.entries(component.styles).forEach(([prop, value]) => {
        element.style[prop] = value;
    });

    parent.appendChild(element);
}