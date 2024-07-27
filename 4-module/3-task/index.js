"use strict";
function highlight(table) {
  let row = table.rows;

  for (let i = 1; i < row.length; i++) {
    if (row[i].cells[3].dataset.available === "true") {
      row[i].classList.add("available");
    } else if (row[i].cells[3].dataset.available === "false") {
      row[i].classList.add("unavailable");
    } else {
      row[i].hidden = true;
    }
    if (row[i].cells[2].textContent === "m") {
      row[i].classList.add("male");
    } else if (row[i].cells[2].textContent === "f") {
      row[i].classList.add("female");
    }
    if (+row[i].cells[1].textContent < 18) {
      row[i].style = "text-decoration: line-through";
    }
  }
  return row;
}
