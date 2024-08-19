import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.renderSlider();
    this.changingSliderValue();
    this.segments = this.steps - 1;
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.changeValueMouse();
  }

  // верстка компонента слайдера
  renderSlider() {
    this.elem = createElement(`<div class="slider">
      <div class="slider__thumb" style="left: 75%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 75%;"></div>
      <div class="slider__steps"></div>
    </div>`);
    const sliderSteps = this.elem.querySelector(".slider__steps");
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement("span");
      sliderSteps.append(span);
    }

    let sliderStepActive = this.elem.querySelectorAll(".slider__steps span");
    sliderStepActive[0].classList.add("slider__step-active");
  }

  // изменения визуала слайдера и отслежования слайдера по шагам
  changingSliderValue() {
    this.elem.addEventListener("slider-change", (e) => {
      console.log(e.detail);
    });

    this.elem.addEventListener("click", (e) => {
      // отслежование шага в слайдере и рисовка слайдера
      let left = e.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      let approximateValue = leftRelative * this.segments;

      this.value = Math.round(approximateValue);
      this.valuePercents = (this.value / this.segments) * 100;

      // измененния положения ползунка

      this.thumb.style.left = `${this.valuePercents}%`;
      this.progress.style.width = `${this.valuePercents}%`;

      // отображение тикущего значения шага слайдера
      let sliderValue = this.elem.querySelector(
        ".slider__thumb .slider__value"
      );
      sliderValue.textContent = this.value;

      // выделение шага на слайдере
      let sliderStepActive = this.elem.querySelectorAll(".slider__steps span");
      sliderStepActive.forEach((element, index) => {
        element.classList.remove("slider__step-active");
        if (index === this.value) {
          element.classList.add("slider__step-active");
        }
      });

      // всплытие и отслежования слайдера по значениям шага
      if (e.target.closest(".slider")) {
        const event = new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(event);
      }
    });
  }

  onMouseMove = (mouseMoveEvent) => {
    const left =
      mouseMoveEvent.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    let approximateValue = leftRelative * this.segments;

    this.value = Math.round(approximateValue);

    let sliderValue = this.elem.querySelector(".slider__thumb .slider__value");
    sliderValue.textContent = this.value;

    // выделение шага на слайдере
    let sliderStepActive = this.elem.querySelectorAll(".slider__steps span");
    sliderStepActive.forEach((element, index) => {
      element.classList.remove("slider__step-active");
      if (index === this.value) {
        element.classList.add("slider__step-active");
      }
    });
  };

  offMouseMove = () => {
    let valuePercents = (this.value / this.segments) * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    let event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
    document.removeEventListener("pointermove", this.onMouseMove);
    this.thumb.removeEventListener("pointerup", this.offMouseMove);
  };

  changeValueMouse() {
    this.thumb.ondragstart = () => false;
    this.thumb.style.touchAction = "none";
    this.thumb.addEventListener("pointerdown", () => {
      this.elem.classList.add("slider_dragging");
      this.thumb.style.position = "absolute";

      document.addEventListener("pointermove", this.onMouseMove);
      document.addEventListener("pointerup", this.offMouseMove);
    });
  }
}
