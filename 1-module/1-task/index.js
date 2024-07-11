"use strict";

function factorial(n) {
  let result = 1;
  while (n) {
    result *= n--;
  }
  return result;
}
