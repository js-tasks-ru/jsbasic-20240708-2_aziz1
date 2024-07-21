"use strict";
function showSalary(users, age) {
  let fileredUsers = users.filter((user) => user.age <= age);
  const str = fileredUsers.reduce(
    (acc, user, i, arr) =>
      (acc += `${user.name}, ${user.balance}${
        i === arr.length - 1 ? "" : "\n"
      }`),
    ""
  );
  return str;
}
