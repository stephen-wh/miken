import * as elements from './elements.js';

export class DnDApplication {
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.dropZones = Array.from(appContainer.querySelectorAll('.drop-zone'));
        this.draggedItem = null;
        this.currentDragElement = null;
        this.selectedElement = null;

        this.setupDragAndDrop();
        this.setupElementSelection();
    }

    setupDragAndDrop() {
        this.appContainer.addEventListener('dragstart', e => {
            const element = e.target.closest('[draggable="true"]');
            if (!element) return;

            this.draggedItem = element;
            this.currentDragElement = element.cloneNode(true);
            e.dataTransfer.setData('type', element.dataset.type);
            element.classList.add('dragging');
        });

        this.appContainer.addEventListener('dragover', e => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (!dropZone) return;

            const afterElement = this.getDragAfterElement(dropZone, e.clientY);
            const draggable = this.currentDragElement;
            
            if (afterElement) {
                dropZone.insertBefore(draggable, afterElement);
            } else {
                dropZone.appendChild(draggable);
            }
        });

        this.appContainer.addEventListener('drop', e => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            const ElementClass = Object.values(elements).find(el => el.type === type);
            const dropZone = e.target.closest('.drop-zone');
            
            if (ElementClass && dropZone) {
                let newElement;
                
                if (this.draggedItem.parentElement.classList.contains('elements-list')) {
                    newElement = ElementClass.render();
                } else {
                    newElement = this.draggedItem;
                    this.draggedItem.remove();
                }

                const afterElement = this.getDragAfterElement(dropZone, e.clientY);
                if (afterElement) {
                    dropZone.insertBefore(newElement, afterElement);
                } else {
                    dropZone.appendChild(newElement);
                }
            }
            
            this.cleanupDrag();
        });

        this.appContainer.addEventListener('dragend', () => this.cleanupDrag());
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.dropped-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            return offset < 0 && offset > closest.offset 
                ? { offset: offset, element: child }
                : closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    cleanupDrag() {
        this.draggedItem?.classList.remove('dragging');
        this.currentDragElement?.remove();
        this.draggedItem = null;
        this.currentDragElement = null;
    }

    setupElementSelection() {
        this.appContainer.addEventListener('click', e => {
            const element = e.target.closest('.dropped-item');
            
            this.selectedElement = element;
            this.updatePropertiesPanel(element);
        });
    }

    updatePropertiesPanel(element) {
        const type = element.dataset.type;
        const ElementClass = Object.values(elements).find(el => el.type === type);
        const formContainer = this.appContainer.querySelector('.properties-form');
        
        formContainer.innerHTML = ElementClass?.propertiesForm?.(element) || '';
        this.setupFormListeners(element);
    }

    setupFormListeners(element) {
        const formContainer = this.appContainer.querySelector('.properties-form');
        formContainer.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', e => {
                this.updateElementStyle(element, input.name, input.value);
            });
        });
    }

    updateElementStyle(element, property, value) {
        const styleProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        
        if (element.classList.contains('container-item')) {
            const containerContent = element.querySelector('.container-content');
            if (containerContent && ['flexDirection', 'gap', 'flexWrap'].includes(styleProperty)) {
                containerContent.style[styleProperty] = value;
            } else {
                element.style[styleProperty] = value;
            }
        } else {
            element.style[styleProperty] = value;
        }
    }

    clearPropertiesPanel() {
        this.appContainer.querySelector('.properties-form').innerHTML = '';
    }
}