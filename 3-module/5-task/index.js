"use strict";

function getMinMax(str) {
  let arr = str
    .split(" ")
    .filter((element) => /\d+$/.test(element))
    .map(Number);

  let result = {
    min: Math.min.apply(null, arr),
    max: Math.max.apply(null, arr),
  };



  return result;
}
