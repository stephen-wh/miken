import { settings } from '../settings.js';

export class ElementoBase {
    static type = 'base';
    static label = 'Elemento Base';

    static menuRender() {
        const div = document.createElement('div');
        div.className = 'element-item';
        div.draggable = true;
        div.dataset.type = this.type;
        div.innerHTML = `
            <i class="${this.icon}"></i>
            <span>${this.label}</span>
        `;
        return div;
    }

    static render() {
        const element = document.createElement('div');
        element.className = 'dropped-item';
        element.draggable = true;
        element.dataset.type = this.type;
        return element;
    }

    static propertiesForm(element) {
        return `
            <div class="form-group">
                <label>Color de Fondo</label>
                <input type="color" name="background-color" 
                    value="${element.style.backgroundColor || ''}">
            </div>
            <div class="form-group">
                <label>Ancho</label>
                <input type="text" name="width" 
                    value="${element.style.width || ''}" placeholder="ej: 100%">
            </div>
            <div class="form-group">
                <label>Altura</label>
                <input type="text" name="height" 
                    value="${element.style.height || ''}" placeholder="ej: 200px">
            </div>
            <div class="form-group">
                <label>Margen</label>
                <input type="text" name="margin" 
                    value="${element.style.margin || ''}" placeholder="ej: 10px">
            </div>
            <div class="form-group">
                <label>Relleno</label>
                <input type="text" name="padding" 
                    value="${element.style.padding || ''}" placeholder="ej: 10px">
            </div>
        `;
    }
}

export class ElementoTitulo extends ElementoBase {
    static type = 'titulo';
    static label = 'Título';
    static icon = 'fas fa-heading';

    static render() {
        const element = super.render();
        element.contentEditable = false;
        element.innerHTML = `
            <h3 style="font-size: ${settings.typography.titleSize};
                       color: ${settings.colors.text};
                       margin: 0;">
                Título Editable
            </h3>
        `;
        return element;
    }
}

export class ElementoSubtitulo extends ElementoBase {
    static type = 'subtitulo';
    static label = 'Subtítulo';
    static icon = 'fas fa-heading fa-sm';

    static render() {
        const element = super.render();
        element.contentEditable = true;
        element.innerHTML = `
            <h4 style="font-size: ${settings.typography.subtitleSize};
                       color: ${settings.colors.text};
                       margin: 0;">
                Subtítulo Editable
            </h4>
        `;
        return element;
    }
}

export class ElementoContenedor extends ElementoBase {
    static type = 'contenedor';
    static label = 'Contenedor';
    static icon = 'fas fa-box-open';

    static render() {
        const element = super.render();
        element.className += ' container-item';
        element.style.cssText = `
            padding: ${settings.spacing.panelPadding};
            border: 2px dashed ${settings.colors.border};
            background: ${settings.colors.background};
            border-radius: ${settings.spacing.borderRadius};
            min-height: 150px;
        `;
        
        element.innerHTML = `
            <div class="container-header">
                <i class="fas fa-box"></i>
                <span>Contenedor</span>
            </div>
            <div class="container-content drop-zone"></div>
        `;

        return element;
    }

    static propertiesForm(element) {
        const containerContent = element.querySelector('.container-content');
        return `
            ${super.propertiesForm(element)}
            <div class="form-group">
                <label>Dirección</label>
                <select name="flex-direction">
                    <option value="row" ${containerContent.style.flexDirection === 'row' ? 'selected' : ''}>Horizontal</option>
                    <option value="column" ${containerContent.style.flexDirection === 'column' ? 'selected' : ''}>Vertical</option>
                </select>
            </div>
            <div class="form-group">
                <label>Ajuste</label>
                <select name="flex-wrap">
                    <option value="nowrap" ${containerContent.style.flexWrap === 'nowrap' ? 'selected' : ''}>No ajustar</option>
                    <option value="wrap" ${containerContent.style.flexWrap === 'wrap' ? 'selected' : ''}>Ajustar</option>
                </select>
            </div>
            <div class="form-group">
                <label>Espacio (gap)</label>
                <input type="text" name="gap" 
                    value="${containerContent.style.gap || ''}" placeholder="ej: 10px">
            </div>
        `;
    }
}