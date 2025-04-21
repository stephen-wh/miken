import { Context } from "./Context.js"

export class EventosManager {
    Event_On_click(){
        this.estrcturaHTML.addEventListener('click', (e) => {
            e.stopPropagation();
            Context.actualizarPanel(this.elemento);
        });
    }

    Event_Adress_element(){
        const handleDragOver = (e) => {
            if (e.target === this.estrcturaHTML) {
                e.preventDefault();
                e.stopPropagation();
                this.estrcturaHTML.classList.add('drop-zone--active');
            }
        };
    
        const handleDragLeave = (e) => {
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
            }
        };
    
        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const idArrastrado = e.dataTransfer.getData('text/plain');
            const ClaseElemento = Context.buscarClaseById(idArrastrado);
            
            if (ClaseElemento) {
                const nuevoElemento = new ClaseElemento();
                this.estrcturaHTML.appendChild(nuevoElemento.estrcturaHTML);
            }
            
            this.estrcturaHTML.classList.remove('drop-zone--active');
        };
    
        this.estrcturaHTML.addEventListener('click', (e) => {
            if (e.target === this.estrcturaHTML) {
                Context.actualizarPanel(this);
                this.estrcturaHTML.classList.add('selected');
            }
        });
        this.estrcturaHTML.addEventListener('dragover', handleDragOver);
        this.estrcturaHTML.addEventListener('dragleave', handleDragLeave);
        this.estrcturaHTML.addEventListener('drop', handleDrop);
    }
    
}
