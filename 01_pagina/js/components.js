// Componentes predefinidos y sus configuraciones base
export const components = {
    templates: {
        title: {
            type: 'title',
            content: 'Título Principal',
            styles: {
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#000000',
                margin: '10px',
                textAlign: 'left'
            }
        },
        text: {
            type: 'text',
            content: 'Texto de ejemplo...',
            styles: {
                fontSize: '16px',
                color: '#666666',
                margin: '10px',
                lineHeight: '1.5'
            }
        },
        image: {
            type: 'image',
            content: '<img src="https://via.placeholder.com/300x200" alt="Imagen" style="width:100%">',
            styles: {
                margin: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
            }
        },
        button: {
            type: 'button',
            content: 'Click aquí',
            styles: {
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
            }
        }
    },

    // Factory para crear nuevos componentes
    createComponent: function(type) {
        const template = this.templates[type];
        if (!template) return null;
        
        return {
            id: Date.now().toString() + Math.floor(Math.random() * 1000),
            type: template.type,
            content: template.content,
            styles: {...template.styles},
            classes: [],
            parent: null,
            children: []
        };
    },

    // Actualizar propiedades de un componente
    updateComponent: function(componentId, newProperties) {
        // Implementar lógica de actualización
    }
};