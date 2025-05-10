// Paso 0: Configuraciones y utilidades
const getById = (id) => /** @type {HTMLElement} */ (document.getElementById(id));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Version en px
 const getPosition = (el) => {
     const rect = el.getBoundingClientRect();
     return {
         left: rect.left,
         top: rect.top,
         width: rect.width,
         height: rect.height,
         right:  rect.right,
         bottom: (rect.bottom)*-1,
     };
 };

// Version en %
// const getPosition = (el) => {
//     const rect = el.getBoundingClientRect();
//     const viewportWidth = window.innerWidth;
//     const viewportHeight = window.innerHeight;

//     return {
//         left: (rect.left / viewportWidth) * 100,
//         top: (rect.top / viewportHeight) * 100,
//         width: (rect.width / viewportWidth) * 100,
//         height: (rect.height / viewportHeight) * 100,
//         right: (rect.right / viewportWidth) * 100,
//         bottom: ((rect.bottom -rect.height) / viewportHeight) * 100,
//     };
// };


// Paso 1: Clase para animación de escritura
class TypeWriter {
    constructor(element) {
        this.element = element;
        this.currentAnimation = null;
    }

    async typeText(text, speed = 50) {
        return new Promise(resolve => {
            this.stop(); // Cancelar cualquier animación previa

            let index = 0;
            this.element.textContent = '';

            const type = () => {
                if (index < text.length) {
                    this.element.textContent += text.charAt(index);
                    index++;
                    this.currentAnimation = setTimeout(type, speed);
                } else {
                    resolve();
                }
            };

            type();
        });
    }

    stop() {
        clearTimeout(this.currentAnimation);
        this.currentAnimation = null;
    }
}

// Paso 2: Clase para manejar las secciones de la cámara
class Camara {
    constructor(cantidad) {
        this.cantidad = cantidad;
        this.data = [];
        this.coordenadas = [];
        this.HTML_Camara = getById("Camara");
        this.time_animated
        this._resetStructure();
    }

    async _resetStructure() {
        this.time_animated = 1
        for (const section of this.data) {
            section.writing_titulo?.stop();
            section.writing_info?.stop();
        }
        this.data = [];
        this.HTML_Camara.innerHTML = "";

        for (let i = 0; i < this.cantidad; i++) {
            const nuevaSeccion = document.createElement('div');
            nuevaSeccion.id = "item" + i;
            nuevaSeccion.className = "item";

            const nuevoTitulo = document.createElement('h1');
            nuevoTitulo.id = "titulo" + i;
            const nuevoInfo = document.createElement('h2');
            nuevoInfo.id = "info" + i;
            const nuevaImagen = document.createElement('img');
            nuevaImagen.id = "imagen" + i;

            nuevaSeccion.appendChild(nuevoTitulo);
            nuevaSeccion.appendChild(nuevoInfo);
            nuevaSeccion.appendChild(nuevaImagen);
            nuevaSeccion.style.transition = `${this.time_animated}s ease`

            this.HTML_Camara.appendChild(nuevaSeccion);

            this.data.push({
                item: nuevaSeccion,
                titulo_1: nuevoTitulo,
                info_1: nuevoInfo,
                imagen_1: nuevaImagen,
                writing_titulo: new TypeWriter(nuevoTitulo),
                writing_info: new TypeWriter(nuevoInfo),
            });

            await delay(20); // Para dar tiempo de construcción si se necesita visualmente
            this.coordenadas.push(getPosition(nuevaSeccion));
        }
    }

    async clean_all() {
        this.data.forEach(obj => {
            obj.item.style.transition = "opacity 1s ease";
            obj.item.style.opacity = "0";
        });

        await delay(1000);

        await this._resetStructure();

        this.data.forEach(obj => {
            obj.item.style.transition = "opacity 1s ease";
            obj.item.style.opacity = "1";
        });
    }

    async add_time_animated (seconds=1) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].item.style.transition = `${seconds}s ease`
        }
        this.time_animated = seconds
        await delay(20);
    }

    async delay_animate(){
        await delay(this.time_animated*1000)
    }

    async ordening_change(nuevos_indices) {
        for (let indice_anterior = 0; indice_anterior < this.coordenadas.length; indice_anterior++) {
            if (nuevos_indices[indice_anterior] !== undefined) {
                const indice_nuevo = nuevos_indices[indice_anterior];
                const coordenadas_enteriores =  this.coordenadas[indice_anterior];
                const coordenadas_nuevas = this.coordenadas[indice_nuevo];

                const deltaX =  coordenadas_nuevas.left - coordenadas_enteriores.left;
                const deltaY =  coordenadas_enteriores.bottom - coordenadas_nuevas.bottom ;
                this.data[indice_anterior].item.style.transform = `translate(${deltaX}px, ${deltaY}px )`;
            }
        }
    }
}

// Paso 3: Clase para manejar la película y los eventos
class Pelicula {
    constructor(no_secciones_camara) {
        this.actos = null;
        this.camara = new Camara(no_secciones_camara);
        this.carril = getById("Carril");
        this.dominio = getById("Pelicula");
        this.token_task_actual = 0;
        this.no_acto = -1
    }

    iniciar(actos) {
        this.actos = actos;
        this.generar_Escenarios();
    }

    handleIntersection = (entries) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                this.Disparador(entry.target);
            }
        }
    };

    Disparador = async (target) => {
        const token = this.token_task_actual + 1;
        this.token_task_actual = token;
        await delay(500);
        if (this.token_task_actual !== token) return; // cambio de acto en menos de 1/2s
        this.updateHeaderContent(target);
    };

    updateHeaderContent = async (target) => {
        // es el mismo acto no debemos limpiar nada 
        if (this.no_acto == target.dataset.numero ) return
        await this.camara.clean_all()

        // guardamos que acto somos
        const no_escena = target.dataset.numero;
        this.no_acto = no_escena

        try {
            const actos_actuales = this.actos[no_escena];
            for (const paso of actos_actuales) {
                await paso();
                // matar siguientes animaciones
                if(no_escena != this.no_acto) return
            }
        } finally {
            this.no_acto = -1
        }
    };

    generar_Escenarios() {
        this.observer = new IntersectionObserver(this.handleIntersection, {
            threshold: 0.8,
            rootMargin: '0px 0px 0% 0px'
        });

        for (let i = 0; i < this.actos.length; i++) {
            const escenario = document.createElement("div");
            escenario.classList.add("contendor");
            escenario.dataset.numero = i;
            this.carril.appendChild(escenario);
            this.observer.observe(escenario);
        }
    }
}

// Instancia y uso
const pelicula = new Pelicula(4);

pelicula.iniciar([
    [
        async () => { 
            await pelicula.camara.add_time_animated(1);
            pelicula.camara.ordening_change([2, 3, 0, 1]);
            pelicula.camara.data[0].item.style.background = "white";
            pelicula.camara.data[0].item.style.width = "100%";
            pelicula.camara.data[0].item.style.maxWidth = "100%";
            pelicula.camara.data[0].item.style.minWidth = "100%";
            pelicula.camara.data[3].imagen_1.src = "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png";
            await pelicula.camara.delay_animate();
        },
        async () => {
            pelicula.camara.data[3].item.style.background = "green";
            await pelicula.camara.data[3].writing_titulo.typeText("Título Dinámico 1", 150);
            pelicula.camara.data[3].titulo_1.style.color = "#000"
            await pelicula.camara.data[2].writing_titulo.typeText("Título Dinámico 2", 150);
        },
    ],
    [
        async () => {
            await pelicula.camara.add_time_animated(1);
            pelicula.camara.data[3].item.style.background = "green";
            pelicula.camara.ordening_change([2, 3, 0, 1]);
            await pelicula.camara.delay_animate();
            await pelicula.camara.data[0].writing_titulo.typeText("Título Dinámico 0", 150);
        }
    ]
]);
