/**
 * Asked in uber screening round
 */
const optionFrequency = { option1: 0, option2: 0, option3: 0, option4: 0 };

const throttle = (func, delay) => {
  let flag = false;
  return function (...args) {
    if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
      }, delay);
      return func.call(this, ...args);
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const allOptions = document.querySelectorAll(".innerOption");

  const section = document.querySelector(".container");

  // throttled listener
  const throttledListener = throttle((e) => {
    const id = e.target.id;
    if (id) {
      optionFrequency[id]++;
    }
    updateCellHeights(allOptions);
  }, 500);

  section.addEventListener("click", throttledListener);

  function updateCellHeights(options) {
    const optionArray = Object.entries(optionFrequency);
    const length = optionArray.length;
    let totalClicks = 0;
    optionArray.forEach((option) => {
      totalClicks += option[1];
    });
    console.log(totalClicks);
    Array.from(options).forEach((option, index) => {
      option.style.height = `${(optionArray[index][1] / totalClicks) * 100}px`;
    });
  }
});
