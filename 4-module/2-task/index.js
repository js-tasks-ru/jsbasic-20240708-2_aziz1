"use strict";
function makeDiagonalRed(table) {
  let row = table.rows;
  for (let i = 0; i < row.length; i++) {
    row[i].cells[i].style.backgroundColor = "red";
  }

  return row;
}
