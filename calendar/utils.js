import { monthToDaysMapping } from "./data.js";

export const getDaysCount = (month, year) => {
  if (month === 1) {
    return new Date(year, month + 1, 0).getDate();
  }
  return monthToDaysMapping[month];
};

export const getDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};
