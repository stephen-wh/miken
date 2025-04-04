import { Context, Elementos } from "../Context.js";

export class Contenedor extends Elementos {
    constructor() {
        super();
        this.propiedades = {
            background: "gray",
            width: "100%",
            minHeight: "10rem",
            padding: "1rem",
            direccion: "horizontal",
        };
        this.configurarEstilos();
        this.configurarEventos();
    }

    configurarEstilos() {
        this.estrcturaHTML = document.createElement('div');
        this.estrcturaHTML.className = "drop-zone contenedor";
        this.estrcturaHTML.id = this.id;
        this.estrcturaHTML.innerHTML = '| Contenedor |';
        
        // Configuración de estilos en línea
        Object.assign(this.estrcturaHTML.style, {
            background: this.propiedades.background,
            width: this.propiedades.width,
            minHeight: this.propiedades.minHeight,
            padding: this.propiedades.padding,
        });
    }

    getPropiedades() {
        const container = document.createElement('div');
        container.className = 'propiedades-contenedor';
        
        // Titulo
        const titulo = document.createElement('h3');
        titulo.textContent = 'Propiedades del Contenedor';
        
        // Color de fondo
        const colorLabel = document.createElement('label');
        colorLabel.textContent = 'Color de fondo:';
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = this.propiedades.background;
        
        // Ancho
        const widthLabel = document.createElement('label');
        widthLabel.textContent = 'Ancho:';
        const widthInput = document.createElement('input');
        widthInput.type = 'text';
        widthInput.value = this.propiedades.width;
        
        // Altura mínima
        const minHeightLabel = document.createElement('label');
        minHeightLabel.textContent = 'Altura mínima:';
        const minHeightInput = document.createElement('input');
        minHeightInput.type = 'text';
        minHeightInput.value = this.propiedades.minHeight;
        
        // Dirección
        const direccionLabel = document.createElement('label');
        direccionLabel.textContent = 'Dirección:';
        const direccionSelect = document.createElement('select');
        direccionSelect.innerHTML = `
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
        `;
        direccionSelect.value = this.propiedades.direccion;
        
        // Padding
        const paddingLabel = document.createElement('label');
        paddingLabel.textContent = 'Padding:';
        const paddingInput = document.createElement('input');
        paddingInput.type = 'text';
        paddingInput.value = this.propiedades.padding;
    
        // Agregar elementos al container
        container.append(
            titulo,
            colorLabel,
            colorInput,
            widthLabel,
            widthInput,
            minHeightLabel,
            minHeightInput,
            direccionLabel,
            direccionSelect,
            paddingLabel,
            paddingInput
        );
    
        // Event Listeners
        colorInput.addEventListener('input', (e) => {
            this.propiedades.background = e.target.value;
            this.estrcturaHTML.style.background = e.target.value;
        });

        widthInput.addEventListener('input', (e) => {
            this.propiedades.width = e.target.value;
            this.estrcturaHTML.style.width = e.target.value;
        });

        minHeightInput.addEventListener('input', (e) => {
            this.propiedades.minHeight = e.target.value;
            this.estrcturaHTML.style.minHeight = e.target.value;
        });
    
        direccionSelect.addEventListener('change', (e) => {
            this.propiedades.direccion = e.target.value;
            this.estrcturaHTML.style.flexDirection = 
                e.target.value === "horizontal" ? "row" : "column";
        });
    
        paddingInput.addEventListener('input', (e) => {
            this.propiedades.padding = e.target.value;
            this.estrcturaHTML.style.padding = e.target.value;
        });
    
        return container;
    }

    configurarEventos() {
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

    runApp() {
        Context.dropZone.appendChild(this.estrcturaHTML);
    }

    static new() {
        return new Contenedor();
    }
}