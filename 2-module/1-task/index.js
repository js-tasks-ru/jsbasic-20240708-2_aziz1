"use strict";

function sumSalary(salaries) {

  let sum = 0;
  for (let elem in salaries) {
    if (typeof salaries[elem] == "number" && isFinite(salaries[elem])) {
      sum += salaries[elem];
    }
  }

  return sum;
}
