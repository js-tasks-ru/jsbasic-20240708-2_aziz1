"use strict ";

function hideSelf() {
  let btn = document.querySelector(".hide-self-button");
  btn.addEventListener("click", function () {
    return (btn.hidden = true);
  });
}
