import { debouncedSearchProducts } from "./server.js";
import { getElementFromHtml } from "./utils.js";

/*
1. Search API improvement
2. Network Call should be fired only when datalist is empty
3. Datalist should be visible on initial focus
4. Datalist should be visible when clearing characters in search box

Learnings:
Datalist Issues: Behaviour (open, close, hide) cannot be controlled easily using datalist. Styling & event handling inside datalist is difficult. 
Styling Datalist is difficult, so don't use it interviews.
Before using any new HTML element, please verify cross browser behaviour & support, flexibility in styling, event handling & controls.

After migrating to unordered list, complete following tasks.
5. Improve datalist CSS to look like autocomplete suggestions
6. Keyboard accessibility of datalist options
7. Highlight matching text in suggested options
8. Discuss Caching results on UI & document tradeoffs between different approaches.
*/

export class Input {
  constructor() {
    const inputHtml = `<input type="text" id="search-input" placeholder="Search here" list="autocomplete-options" autocomplete="on" />`;
    this.inputElement = getElementFromHtml(inputHtml);
    this.handleInputChange();
    this.onFocus();
    const constructProductsDataList = this.constructProductsDataList.bind(this);
    const dataListHtml = `<datalist id="autocomplete-options"></datalist>`;
    this.dataListElement = getElementFromHtml(dataListHtml);
    this.inputElement.append(this.dataListElement);
    this.searchWithDelay = debouncedSearchProducts(
      constructProductsDataList,
      1000
    );
  }

  constructProductsDataList(products) {
    console.log({ products });
    if (!this.inputElement.value) {
      this.dataListElement.innerHTML = "";
      this.dataListElement.style.display = "none";
      return;
    }
    if (products.length > 0) {
      let optionHtml = "";
      products.forEach(({ title }) => {
        optionHtml += `<option value="${title}"></option>`;
      });
      this.dataListElement.innerHTML = optionHtml;
    }
  }

  handleInputChange() {
    this.inputElement.addEventListener("input", (e) => {
      const value = e.target.value;
      this.searchWithDelay(value);
    });
  }

  onFocus() {
    this.inputElement.addEventListener("focus", () => {
      // this.searchWithDelay();
    });
  }
}
