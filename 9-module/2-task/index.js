import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    let body = document.querySelector("body");
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    let config = {
      steps: 5,
      value: 3,
    };
    this.stepSlider = new StepSlider(config);
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    const response = await fetch("products.json");
    this.products = await response.json();
    this.productsGrid = new ProductsGrid(this.products);

    let holderCarousel = document.querySelector("[data-carousel-holder]");
    let holderRibbonMenu = document.querySelector("[data-ribbon-holder]");
    let holderStepSlider = document.querySelector("[data-slider-holder]");
    let holderCartIcon = document.querySelector("[data-cart-icon-holder]");
    let holderProductsGrid = document.querySelector(
      "[data-products-grid-holder]"
    );

    holderCarousel.append(this.carousel.elem);
    holderRibbonMenu.append(this.ribbonMenu.elem);
    holderStepSlider.append(this.stepSlider.elem);
    holderCartIcon.append(this.cartIcon.elem);
    holderProductsGrid.innerHTML = "";
    holderProductsGrid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    holderProductsGrid.innerHTML = "";
    holderProductsGrid.append(this.productsGrid.elem);

    body.addEventListener("product-add", (e) => {
      let product = this.productsGrid.products.find(
        (item) => item.id === e.detail
      );
      this.cart.addProduct(product);
    });

    body.addEventListener("slider-change", (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail,
      });

      holderProductsGrid.innerHTML = "";
      holderProductsGrid.append(this.productsGrid.elem);
    });

    body.addEventListener("ribbon-select", (e) => {
      this.productsGrid.updateFilter({
        category: e.detail,
      });

      holderProductsGrid.innerHTML = "";
      holderProductsGrid.append(this.productsGrid.elem);
    });

    let nuts = document.getElementById("nuts-checkbox");
    nuts.addEventListener("change", (e) => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked,
      });

      holderProductsGrid.innerHTML = "";
      holderProductsGrid.append(this.productsGrid.elem);
    });

    let vegeterian = document.getElementById("vegeterian-checkbox");
    vegeterian.addEventListener("change", (e) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked,
      });
    });

    holderProductsGrid.innerHTML = "";
    holderProductsGrid.append(this.productsGrid.elem);
  }
}
