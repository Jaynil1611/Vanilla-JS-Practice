import { KanbanAPI } from "./KanbanAPI.js";

export class Item {
  constructor(columnId, id, content) {
    this.id = id;
    this.columnId = columnId;
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.root.textContent = content;
    this.elements.root.dataset.id = id;

    this.handleItemEdit();
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <li class="task__column-input" contenteditable></li>
    `).children[0];
  }

  handleItemEdit() {
    this.elements.root.addEventListener("blur", (e) => {
      KanbanAPI.updateTask(this.columnId, {
        id: this.id,
        content: e.target.textContent,
      });
    });
  }
}
