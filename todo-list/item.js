import { getElementFromHtml } from "./utils.js";

export class Item {
  constructor(title) {
    // store all selectable elements inside a single elements object, this.elements = {}
    this.id = Date.now().toString();
    this.title = title;
    const itemHTML = `<li class="list__item">
      <span>${title}</span>
      <button id="edit">Edit</button>
      <button id="delete">Delete</button>
    </li>`;
    this.itemElement = getElementFromHtml(itemHTML);
    this.editButton = this.itemElement.querySelector("#edit");
    this.deleteButton = this.itemElement.querySelector("#delete");
    this.editItem();
    this.deleteItem();
  }

  deleteItem() {
    this.deleteButton.addEventListener("click", () => {
      this.itemElement.remove();
    });
  }

  editItem() {
    // show edit input with save & cancel CTA & update the DOM
    this.editButton.addEventListener("click", () => {});
  }
}
