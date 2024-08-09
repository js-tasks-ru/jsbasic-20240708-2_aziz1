import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.renderCarousel();
    this.initCarousel();

    this.getSlideBtnId();
  }
  // отрисовка компонентов
  renderCarousel() {
    this.elem = createElement(` <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner"></div>
    </div>`);

    const carouselInner = this.elem.querySelector(".carousel__inner");
    this.slides.forEach((elem) => {
      const carouselSlide = document.createElement("div");
      carouselSlide.classList.add("carousel__slide");
      carouselSlide.dataset.id = elem.id;
      carouselSlide.innerHTML = `<img src="/assets/images/carousel/${
        elem.image
      }" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${elem.price.toFixed(2)}</span>
              <div class="carousel__title">${elem.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>`;
      carouselInner.append(carouselSlide);
    });
  }
  // функция карусель
  initCarousel() {
    let rightButton = this.elem.querySelector(".carousel__arrow_right");
    let leftButton = this.elem.querySelector(".carousel__arrow_left");
    let carouselSlide = this.elem.querySelectorAll(".carousel__slide");
    let carouselInner = this.elem.querySelector(".carousel__inner");
    let currentSlideIndex = 0;

    leftButton.style.display = "none";
    let width = 0;

    function nextSlide() {
      width = carouselSlide[0].offsetWidth;
      currentSlideIndex++;
      if (currentSlideIndex >= carouselSlide.length - 1) {
        rightButton.style.display = "none";
      } else {
        leftButton.style.display = "flex";
      }

      carouselInner.style.transform = `translateX(${
        -width * currentSlideIndex
      }px)`;
    }

    function prevSlide() {
      currentSlideIndex--;
      if (currentSlideIndex === 0) {
        leftButton.style.display = "none";
      } else {
        rightButton.style.display = "flex";
      }

      carouselInner.style.transform = `translateX(${
        -width * currentSlideIndex
      }px)`;
    }

    leftButton.addEventListener("click", prevSlide);
    rightButton.addEventListener("click", nextSlide);
  }

  // функиця отлежования всплытья по id и добавления продукта в корзину.
  getSlideBtnId() {
    this.elem.addEventListener("product-add", (e) => {
      console.log("Продукт добавлен по ID: ", e.detail);
    });

    this.elem.addEventListener("click", (e) => {
      let slideBtnId = e.target.closest(".carousel__button");

      if (slideBtnId) {
        let getId = slideBtnId.closest(".carousel__slide").dataset.id;
        let idCard = new CustomEvent("product-add", {
          detail: getId,
          bubbles: true,
        });
        this.elem.dispatchEvent(idCard);
      }
    });
  }
}

