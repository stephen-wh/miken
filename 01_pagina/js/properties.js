export function initPropertiesPanel(app) {
    const panel = document.getElementById('properties-panel');

    document.addEventListener('click', e => {
        const component = e.target.closest('.component');
        if (component) {
            app.selectedComponent = app.components.find(c => c.id === component.dataset.id);
            updatePropertiesPanel(panel, app.selectedComponent);
        }
    });
}

function updatePropertiesPanel(panel, component) {
    panel.innerHTML = `
        <div class="mb-3">
            <label class="form-label">Contenido</label>
            <input type="text" class="form-control content-input" value="${component.content}">
        </div>
        <div class="mb-3">
            <label class="form-label">Color de texto</label>
            <input type="color" class="form-control color-input" value="${component.styles.color}">
        </div>
        <div class="mb-3">
            <label class="form-label">Tamaño de fuente</label>
            <input type="range" class="form-range fontSize-input" min="12" max="48" value="${parseInt(component.styles.fontSize)}">
        </div>
    `;

    // Event listeners para actualización en tiempo real
    panel.querySelector('.content-input').addEventListener('input', e => {
        component.content = e.target.value;
        updateComponentInDOM(component);
    });
    
    // Agregar más listeners para otras propiedades...
}

function updateComponentInDOM(component) {
    const element = document.querySelector(`[data-id="${component.id}"]`);
    if (element) {
        element.innerHTML = component.content;
        Object.entries(component.styles).forEach(([prop, value]) => {
            element.style[prop] = value;
        });
    }
}