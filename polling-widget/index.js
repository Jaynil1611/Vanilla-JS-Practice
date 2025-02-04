/**
 * Asked in uber screening round
 * Design a polling widget where there are 4 options & on click of any option the inner height changes in 
 * percentages based on the frequency of click of each option
 * Initially all options are at 0%. 
 * Additionally, add a throttling loader to restrict multiple button clicks
 * 
 * e.g. 1st click on option 1 -> 100%, 0%, 0%, 0%
 *      2nd click on option 2 -> 50%, 50%, 0%, 0%
 *      3nd click on option 3 -> 33%, 33%, 33%, 0%
 *      4th click on option 4 -> 25%, 25%, 25%, 25%
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
