import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.renderSlider();
    this.changingSliderValue();
    this.value = value;
    this.getCurrentValue();
    this.getCurrentStep();
  }

  // верстка компонента слайдера
  renderSlider() {
    this.elem = createElement(`<div class="slider">
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress" style="width: 0%;"></div>

      <div class="slider__steps">
      </div>
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
    this.elem.addEventListener("click", (e) => {
      // отслежование шага в слайдере и рисовка слайдера
      let left = e.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = (this.value / segments) * 100;

      // измененния положения ползунка
      let thumb = this.elem.querySelector(".slider__thumb");
      let progress = this.elem.querySelector(".slider__progress");
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
    });
  }

  // отображение тикущего значения шага слайдера
  getCurrentValue() {
    this.elem.addEventListener("click", (e) => {
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
    });
  }

  // всплытие и отслежования слайдера по значениям шага
  getCurrentStep() {
    this.elem.addEventListener("slider-change", (e) => {
      console.log("Текущее значение шага слайдера: ", e.detail);
    });

    this.elem.addEventListener("click", (e) => {
      if (e.target.closest(".slider")) {
        let currentStep = new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        });
        this.elem.dispatchEvent(currentStep);
      }
    });
  }
}
