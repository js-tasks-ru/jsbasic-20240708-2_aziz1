"use strict";

function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  let arr = friends.map((friend) => friend.firstName + " " + friend.lastName);
  for (let elem of arr) {
    let li = document.createElement("li");
    li.innerHTML = elem;
    ul.append(li);
  }
  return ul;
}
