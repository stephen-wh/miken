

export class EventosManager {
    static evento = Object.freeze({
        media : 5,
        size: 4,
        handleDrop: (e) => {
            e.preventDefault();
            e.stopPropagation();
            const idArrastrado = e.dataTransfer.getData('text/plain');
            const ClaseElemento = Context.buscarClaseById(idArrastrado);
            if (ClaseElemento) {
                const nuevoElemento = new ClaseElemento();
                this.estrcturaHTML.appendChild(nuevoElemento.estrcturaHTML);
            }
            this.estrcturaHTML.classList.remove('drop-zone--active');
        },
        handleDrop: (e) => {
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
            }
        },
        handleDragLeave: (e) => {
            if (e.target === this.estrcturaHTML) {
                this.estrcturaHTML.classList.remove('drop-zone--active');
            }
        },
        handleDragOver: (e) => {
            if (e.target === this.estrcturaHTML) {
                e.preventDefault();
                e.stopPropagation();
                this.estrcturaHTML.classList.add('drop-zone--active');
            }
        },
    });
}
