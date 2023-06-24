import { dayNames } from "./data.js";
import { getDayOfMonth, getDaysCount } from "./utils.js";

export class Month {
  constructor(currentMonth, currentYear) {
    this.currentMonth = currentMonth;
    this.currentYear = currentYear;
    this.monthElement = document.createElement("div");
    this.maxRowCount = 6;
    this.maxColumnCount = 7;
    this.currentDate = null;
    this.selectedCell = null;

    this.renderMonthUI();
    this.handleDateClick();
  }

  handleDateClick() {
    this.monthElement.addEventListener("click", (e) => {
      this.selectedCell?.classList.remove("cell--selected");
      const cell = e.target;
      const value = cell.textContent;
      if (value && cell.classList.contains("cell")) {
        this.currentDate = value;
        cell.classList.add("cell--selected");
        this.selectedCell = cell;
      }
    });
  }

  renderColumnCell(value, isSunday) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value ? `${value}` : "";

    if (isSunday) cell.classList.add("sunday");
    return cell;
  }

  renderDayNames() {
    const dayName = document.createElement("div");
    const dayNameFragment = document.createDocumentFragment();
    dayName.classList.add("row");

    for (let i = 0; i < this.maxColumnCount; i++) {
      dayNameFragment.append(this.renderColumnCell(dayNames[i]));
    }

    dayName.appendChild(dayNameFragment);
    this.monthElement.append(dayName);
  }

  renderMonthUI() {
    const maxDaysCount = getDaysCount(this.currentMonth, this.currentYear);
    const startDayIndex = getDayOfMonth(this.currentMonth, this.currentYear);
    const monthFragment = document.createDocumentFragment();
    this.renderDayNames();

    // Appending day values
    let dayCount = 0;
    for (let i = 0; i < this.maxRowCount; i++) {
      if (dayCount === maxDaysCount) break;

      const rowFragment = document.createDocumentFragment();
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < this.maxColumnCount; j++) {
        let isSunday = false;
        if (i === 0 && j < startDayIndex) {
          rowFragment.append(this.renderColumnCell());
          continue;
        }

        if (j === 0) isSunday = true;

        dayCount++;
        rowFragment.append(this.renderColumnCell(dayCount, isSunday));

        if (dayCount === maxDaysCount) break;
      }

      row.appendChild(rowFragment);
      monthFragment.append(row);
    }

    this.monthElement.appendChild(monthFragment);
  }
}
