"use strict";
function isEmpty(obj) {
  let empty = true;
  for (let key in obj) {
    return (empty = false);
  }
  if (empty) {
    return true;
  } else {
    return false;
  }
}
