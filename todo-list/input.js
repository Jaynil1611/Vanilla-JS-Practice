import { getElementFromHtml } from "./utils.js";

export class Input {
  constructor(onSuccess) {
    this.value = "";
    const inputHTML = `<input type="text" id="input"></input>`;
    this.inputElement = getElementFromHtml(inputHTML);
    this.addSubmitEvent(onSuccess);
  }

  addSubmitEvent(onSuccess) {
    this.inputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.value = e.target.value;
        this.inputElement.value = "";
        onSuccess?.(this.value);
      }
    });
  }
}
