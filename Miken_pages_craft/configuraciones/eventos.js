// configuraciones/eventos.js
import { Context } from "./Context.js"

export class EventosManager {
    Event_Click_Reload_Panel(){
        const click_add_panel = (e) => {
            if (e.target === this.estrcturaHTML) {
                e.stopPropagation();
                Context.actualizarPanel(this);
                this.estrcturaHTML.classList.add('selected');
            }
        };
        this.estrcturaHTML.addEventListener('click', click_add_panel);
    }
    // Método estático para manejar teclado global
    Event_SUPRIM(){
        this.estrcturaHTML.setAttribute('tabindex', '0');
        const delete_s = (e) => {
            if (e.key === 'Delete' && Context.selectedElement) {
                Context.eliminarElemento(Context.selectedElement);
            }
        };
        this.estrcturaHTML.addEventListener('keydown', delete_s);
    }

    Event_desc(){
        //Inicializamos a un elemento para arrastrar
        div.addEventListener('dragstart', e => {
            //enviamos nuestro nombre identificadior context en texto plano
            e.dataTransfer.setData('text/plain', ElementClass.name);
            e.target.classList.add('dragging');
        });
        //Soltamos el elemento
        div.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });
    }

    Event_Adress_element(){
        //cuando un elemento entra por arrastre a una zona dragable
        const handleDragOver = (e) => {
            if (e.target === this.estrcturaHTML) {
                e.preventDefault();
                e.stopPropagation();
                this.estrcturaHTML.classList.add('drop-zone--active');
            }
        };
        //cuando un elemento sale por arrastre a una zona dragable
        const handleDragLeave = (e) => {
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
            }
        };
        //cuando un elemento se suelta por arrastre a una zona dragable
        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            //se opctiene el texto plano nombre identificador contxet el elemento arrastrado.
            const idArrastrado = e.dataTransfer.getData('text/plain');
            const ClaseElemento = Context.buscarClaseById(idArrastrado);
            
            if (ClaseElemento) {
                const nuevoElemento = new ClaseElemento();
                this.estrcturaHTML.appendChild(nuevoElemento.estrcturaHTML);
            }
            
            this.estrcturaHTML.classList.remove('drop-zone--active');
        };

        this.estrcturaHTML.addEventListener('dragover', handleDragOver);
        this.estrcturaHTML.addEventListener('dragleave', handleDragLeave);
        this.estrcturaHTML.addEventListener('drop', handleDrop);
    }
    
}
