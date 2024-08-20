import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.renderRibbonMenu();
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    this.getRibbonSelectId();
    this.scrollRight();
    this.scrollLeft();
    this.showButton();
  }

  renderRibbonMenu() {
    this.elem = createElement(`<!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.categories.forEach((element, index) => {
      let a = document.createElement("a");
      a.href = "#";
      a.classList.add("ribbon__item");
      a.dataset.id = element.id;
      a.textContent = element.name;
      index === 0
        ? a.classList.add("ribbon__item_active")
        : a.classList.remove("ribbon__item_active");
      ribbonInner.append(a);
    });
  }

  getRibbonSelectId() {
    this.ribbonInner.addEventListener("ribbon-select", (e) => {
      console.log("Продукт добавлен по ID: ", e.detail);
    });

    this.ribbonInner.addEventListener("click", (e) => {
      e.preventDefault();

      const linkMenu = this.ribbonInner.querySelectorAll(".ribbon__item");
      this.categoryId = e.target.closest(".ribbon__item").dataset.id;

      if (this.categoryId === "" || this.categoryId) {
        let getRibbonItemId = new CustomEvent("ribbon-select", {
          detail: this.categoryId,
          bubbles: true,
        });
        this.ribbonInner.dispatchEvent(getRibbonItemId);
      }


      linkMenu.forEach((element) => {
        element.classList.remove("ribbon__item_active");
        if (element.dataset.id === this.categoryId) {
          element.classList.add("ribbon__item_active");
        }
      });
    });
  }

  scrollLeft() {
    this.ribbonArrowLeft.addEventListener("click", (e) => {
      if (e.target.closest(".ribbon__arrow_left")) {
        this.ribbonInner.scrollBy(-350, 0);
      }
    });
    this.ribbonInner.addEventListener("scroll", () => {
      this.showButton();
    });
  }

  scrollRight() {
    this.ribbonArrowRight.addEventListener("click", (e) => {
      if (e.target.closest(".ribbon__arrow_right")) {
        this.ribbonInner.scrollBy(350, 0);
      }
    });
    this.ribbonInner.addEventListener("scroll", () => {
      this.showButton();
    });
  }

  showButton() {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft === 0) {
      this.ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      this.ribbonArrowRight.classList.add("ribbon__arrow_visible");
    } else if (scrollRight < 1) {
      this.ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      this.ribbonArrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      this.ribbonArrowRight.classList.add("ribbon__arrow_visible");
    }
  }
}
