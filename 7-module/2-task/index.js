import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.body = document.querySelector("body");
    this.modal = createElement(`<div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
        </div>
      </div>

    </div>`);
    this.modalInner = this.modal.querySelector(".modal__inner");
    this.closeModal();
  }
  open() {
    this.body.append(this.modal);
    this.body.classList.add("is-modal-open");
    console.log(this.modal);
  }

  setTitle(title) {
    let modalHeader = this.modal.querySelector(".modal__header");
    let modalTitle = document.createElement("h3");
    modalTitle.classList.add("modal__title");
    modalTitle.textContent = title;
    modalHeader.append(modalTitle);
  }

  setBody(modalB) {
    let modalBody = document.createElement("div");
    modalBody.classList.add("modal__body");
    modalBody.append(modalB);
    this.modalInner.append(modalBody);
  }

  close() {
    this.modal.remove();
    this.body.classList.remove("is-modal-open");
  }

  closeModal() {
    const closeModalFunc = (e) => {
      if (e.code === "Escape" || e.target.closest(".modal__close")) {
        this.close();
        document.removeEventListener("keydown", closeModalFunc);
      }
    };

    this.modal.addEventListener("click", closeModalFunc);

    document.addEventListener("keydown", closeModalFunc);
  }
}
