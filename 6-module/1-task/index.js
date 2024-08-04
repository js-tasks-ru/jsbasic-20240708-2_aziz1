"use strict";
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *    rows [  {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      } ]
 *
 */
export default class UserTable {
  #elem;
  static tables = [];
  constructor(rows) {
    this.rows = rows;
    this.#elem = document.createElement("table");
    this.tableHtml();

    this.#elem.dataset.tindex = UserTable.tables.length;
    UserTable.tables.push(this);
  }

  get elem() {
    return this.#elem;
  }

  tableHtml() {
    let tableInner =
      `<thead>
    <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
    </tr>
</thead>
<tbody>` +
      this.rows
        .map(
          (elem) => `<tr>
<td>${elem.name}</td>
<td>${elem.age}</td>
<td>${elem.salary}</td>
<td>${elem.city}</td>
<td><button>X</button></td>
</tr>`
        )
        .join("") +
      `
</tbody>`;

    this.#elem.innerHTML = tableInner;
    for (let btn of this.#elem.querySelectorAll("button"))
      btn.addEventListener("click", UserTable.handler);
  }

  static handler() {
    let row = this.parentElement.parentElement;
    let that =
      UserTable.tables[+row.parentElement.parentElement.dataset.tindex];
    that.rows.splice(row.rowIndex - 1, 1);
    row.remove();
  }
}
