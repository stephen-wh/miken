// Optimización de carga
document.addEventListener('DOMContentLoaded', () => {
    presentation();
    createSlides();
});

// Pantalla de carga mejorada
function presentation() {
    const telon = document.getElementById("telon");
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            telon.style.opacity = '0';
            setTimeout(() => {
                telon.style.display = "none";
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    });
}

// Configuración de observador
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
    rootMargin: '0px 0px -25% 0px'
});

// Manejo de intersecciones
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateHeaderContent(entry.target);
        }
    });
}

// Actualización de contenido del header
function updateHeaderContent(target) {
    const title = document.getElementById('title');
    const info = document.getElementById('info');
    const image = document.getElementById('image');
    
    title.textContent = target.dataset.title;
    image.alt = `Ilustración: ${target.dataset.title}`;
    
    if (typedInstance) typedInstance.destroy();
    
    typedInstance = new Typed(info, {
        strings: [target.dataset.info],
        typeSpeed: 30,
        backSpeed: 0,
        showCursor: false,
        onComplete: () => {
            target.classList.add('active-section');
            preloadNextImage(target);
        }
    });
    
    image.style.opacity = 0;
    setTimeout(() => {
        image.src = target.dataset.imageUrl;
        image.style.opacity = 1;
    }, 300);
}

// Precarga de imágenes
function preloadNextImage(currentTarget) {
    const nextIndex = slidesData.indexOf(currentTarget.dataset) + 1;
    if (nextIndex < slidesData.length) {
        const img = new Image();
        img.src = slidesData[nextIndex].imageUrl;
    }
}

// Datos de las secciones
const slidesData = [
    {
        title: "Defensa Jurídica Cancún",
        info: "Expertos en derecho familiar y laboral - Soluciones legales efectivas",
        imageUrl: "../img/publicacion1.png"
    },
    {
        title: "Divorcios y Custodias",
        info: "Asesoría integral en procesos de divorcio y acuerdos de custodia",
        imageUrl: "../img/publicacion2.png"
    },
    {
        title: "Derecho Laboral",
        info: "Defensa de derechos laborales y liquidaciones",
        imageUrl: "../img/publicacion3.png"
    }
];

// Creación de secciones
function createSlides() {
    const template = document.getElementById('slide-template');
    const container = document.getElementById('slides-container');
    
    slidesData.forEach((data, index) => {
        const clone = template.content.cloneNode(true);
        const slide = clone.querySelector('.slide');
        slide.dataset.title = data.title;
        slide.dataset.info = data.info;
        slide.dataset.imageUrl = data.imageUrl;
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${data.imageUrl})`;
        container.appendChild(clone);
        observer.observe(slide);
    });
}