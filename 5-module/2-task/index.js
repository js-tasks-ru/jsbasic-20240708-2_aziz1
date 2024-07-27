"use strict";
function toggleText() {
  let btn = document.querySelector(".toggle-text-button");
  let text = document.getElementById("text");
  btn.addEventListener("click", function () {
    if (text.hidden === false) {
      return (text.hidden = true);
    }
    return (text.hidden = false);
  });
}
