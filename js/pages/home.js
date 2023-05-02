export const carrousel = () => {
    // Seleccionamos los elementos HTML del carrusel
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.slide');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    // Configuramos los parámetros del carrusel
    const interval = 5000; // Duración de cada slide en milisegundos
    let slideIndex = 0; // Índice del slide actual
    let timer = null; // Identificador del temporizador

    // Función para mostrar el slide correspondiente
    function showSlide() {
        // Ocultamos todos los slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        // Mostramos el slide actual
        slides[slideIndex].classList.add('active');
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide();
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide();
    }

    // Configuramos los botones para avanzar o retroceder
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Mostramos el primer slide y empezamos el temporizador
    showSlide();
    timer = setInterval(nextSlide, interval);
}