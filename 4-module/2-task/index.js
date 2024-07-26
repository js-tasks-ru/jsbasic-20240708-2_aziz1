"use strict";
function makeDiagonalRed(table) {
  // ваш код...
  let row = table.rows;
  for (let i = 0; i < row.length; i++) {
    row[i].cells[i].style.backgroundColor = "red";
  }

  return row;
}
