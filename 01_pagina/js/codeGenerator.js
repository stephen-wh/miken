export function initCodeGenerator(app) {
    // Lógica para generar código...
    function generateCode() {
        let html = '<!DOCTYPE html><html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></head><body>';
        
        app.components.forEach(component => {
            html += `
                <div style="${Object.entries(component.styles)
                    .map(([k, v]) => `${k}:${v}`)
                    .join(';')}">
                    ${component.content}
                </div>
            `;
        });
        
        html += '</body></html>';
        return html;
    }

    // Ejemplo de implementación de exportación
    console.log(generateCode());
}