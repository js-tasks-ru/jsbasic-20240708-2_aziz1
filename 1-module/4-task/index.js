"use strict";

function checkSpam(str) {
  let result = str.toLowerCase();
  if (result.includes("x") || result.includes("viagra")) {
    return true;
  } else {
    return false;
  }
}
