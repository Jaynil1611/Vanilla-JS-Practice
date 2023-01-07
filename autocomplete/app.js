import { Input } from "./input.js";

const searchSection = document.querySelector("#search-section");
const newInputInstance = new Input();

searchSection.append(newInputInstance.inputElement);
