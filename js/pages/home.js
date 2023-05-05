import { card } from "../utils/card.js"

export const carrousel = () => {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.slide');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const interval = 5000;
    let slideIndex = 0;
    let timer = null;
    function showSlide() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        slides[slideIndex].classList.add('active');
    }
    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide();
    }
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide();
    }
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    showSlide();
    timer = setInterval(nextSlide, interval);
}

export const viewFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.sort((a, b) => b.cantidad - a.cantidad);
    const cardContainer = $('.card-container');
    console.log(favorites);
    console.log(cardContainer);
    if (favorites.length === 0) {
        const h2 = $('<h2>').text('Todavia no probaste nuestras recetas???');
        const img = $('<img>').attr('src', '../Imagenes/boySorprendido.jpg');
        cardContainer.append(h2, img);
    } else {
        favorites.slice(0, 3).forEach(favorite => {
            var cardHome = card(favorite.image, "alt" + favorite.id, favorite.meal, "instru", favorite.id);
            cardContainer.append(cardHome);
        });
    }
}
