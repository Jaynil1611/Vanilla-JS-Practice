// Use .js file extension while importing
import { Input } from "./input.js";
import { Item } from "./item.js";

const itemContainer = document.querySelector(".item__container");

const newTodoInput = new Input(addNewItem);

itemContainer.before(newTodoInput.inputElement);

function addNewItem(updatedValue) {
  // performance optimisation: only change updated/or newly added item
  const itemInstance = new Item(updatedValue);
  itemContainer.append(itemInstance.itemElement);
}
