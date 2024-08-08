"use stict";

function initCarousel() {
  let rightButton = document.querySelector(".carousel__arrow_right");
  let leftButton = document.querySelector(".carousel__arrow_left");
  let carouselSlide = document.querySelectorAll(".carousel__slide");
  let carouselInner = document.querySelector(".carousel__inner");
  let carouselArrow = document.querySelectorAll(".carousel__arrow");
  let currentSlideIndex = 0;
  let width = carouselSlide[0].offsetWidth;
  carouselArrow[1].style.display = "none";
 

  function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= carouselSlide.length - 1) {
      carouselArrow[0].style.display = "none";
    } else {
      carouselArrow[1].style.display = "flex";
    }

    carouselInner.style.transform = `translateX(${
      -width * currentSlideIndex
    }px)`;
  }

  function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex === 0) {
      carouselArrow[1].style.display = "none";
    } else {
      carouselArrow[0].style.display = "flex";
    }

    carouselInner.style.transform = `translateX(${
      -width * currentSlideIndex
    }px)`;
  }

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);
}
