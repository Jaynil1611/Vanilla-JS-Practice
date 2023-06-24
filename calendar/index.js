import { Month } from "./Month.js";

const calendar = document.querySelector("#calendar");

const month = new Month(5, 2023);

calendar.appendChild(month.monthElement);
