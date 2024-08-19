import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.renderContent();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);
    let productsGridInner = this.elem.querySelector(".products-grid__inner");
    this.products.forEach((element) => {
      let productCard = new ProductCard(element);
      productsGridInner.append(productCard.elem);
    });
  }

  renderContent() {
    let productsGridInner = this.elem.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = "";

    for (let product of this.products) {
      // console.log(this.filters);

      if (this.filters.noNuts && product.nuts) {
        continue;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }

      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }

      let card = new ProductCard(product);
      productsGridInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderContent();
  }
}
