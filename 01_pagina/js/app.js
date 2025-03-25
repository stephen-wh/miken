import { DnDApplication } from './dnd-app.js';
import * as elements from './elements.js';

class AppInitializer {
    static init() {
        const appContainer = document.getElementById('app');

        appContainer.innerHTML = `
            <div class="container">
                <div id="drag-panel" class="panel">
                    <h3><i class="fas fa-shapes"></i> Componentes</h3>
                    <div class="elements-list"></div>
                </div>
                
                <div id="drop-zone" class="panel drop-zone">
                    <h3><i class="fas fa-layer-group"></i> Área de Trabajo</h3>
                </div>

                <div id="properties-panel" class="panel">
                    <h3><i class="fas fa-sliders-h"></i> Propiedades</h3>
                    <div class="properties-form"></div>
                </div>
            </div>
        `;

        const elementsList = appContainer.querySelector('.elements-list');
        Object.values(elements)
            .filter(el => el !== elements.ElementoBase)
            .forEach(ElementClass => {
                elementsList.appendChild(ElementClass.menuRender());
            });

        new DnDApplication(appContainer);
    }
}

document.addEventListener('DOMContentLoaded', AppInitializer.init);