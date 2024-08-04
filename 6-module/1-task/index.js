import createElement from "../../assets/lib/create-element.js";

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
  constructor(rows) {
    this.rows = rows;
    this.renderTable();
    this.deletUser();
  }
  renderTable() {
    this.elem = createElement(`<table>
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>


    </tbody>
</table>`);

    const bodyTable = this.elem.querySelector(`tbody`);
    this.rows.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.salary}</td>
      <td>${element.city}</td>
      <td><button>X</button></td>`;
      bodyTable.append(tr);
    });
  }

  deletUser() {
    this.elem.addEventListener("click", (e) => {
      if (e.target.closest("button")) e.target.closest("tr").remove();
    });
  }
}

