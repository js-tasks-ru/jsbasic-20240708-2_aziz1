import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  // свойства и методы конструктора
  constructor(product) {
    this.product = product;
    this.renderCard();
    this.getCardBtnId();
  }

  //функция отрисовки компонента
  renderCard() {
    this.elem = createElement(` <div class="card">
    <div class="card__top">
      <img src="/assets/images/products/${
        this.product.image
      }" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
      </div>
  </div>`);
  }

  // функиця отлежования всплытья и добавления продукта в корзину.
  getCardBtnId() {
    this.elem.addEventListener("product-add", (e) => {
      e.detail;
    });

    this.elem.addEventListener("click", (e) => {
      let cardBtnId = e.target.closest(".card__button");
      if (cardBtnId) {
        let idCard = new CustomEvent("product-add", {
          detail: this.product.id,
          bubbles: true,
        });
        this.elem.dispatchEvent(idCard);
      }
    });
  }
}
