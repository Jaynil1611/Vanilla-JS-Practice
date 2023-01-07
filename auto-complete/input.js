import { debouncedSearchProducts } from "./server.js";
import { getElementFromHtml } from "./utils.js";

/*
1. Search API improvement
2. Network Call should be fired only when datalist is empty
3. Datalist should be visible on initial focus
4. Datalist should be visible when clearing characters in search box
5. Improve datalist CSS to look like autocomplete suggestions
6. Keyboard accessibility of datalist options
7. Discuss Caching results on UI
*/

export class Input {
  constructor() {
    const inputHtml = `<input type="text" id="search-input" placeholder="Search here" list="autocomplete-options" />`;
    this.inputElement = getElementFromHtml(inputHtml);
    this.handleInputChange();
    this.onFocus();
    const constructProductsDataList = this.constructProductsDataList.bind(this);
    this.searchWithDelay = debouncedSearchProducts(
      constructProductsDataList,
      1000
    );
  }

  constructProductsDataList(products) {
    this.dataListElement?.remove();
    if (products.length > 0) {
      let dataListHtml = `<datalist id="autocomplete-options">`;
      products.forEach(({ title }) => {
        dataListHtml += `<option value="${title}"></option>`;
      });
      dataListHtml += `</datalist>`;
      const dataElement = getElementFromHtml(dataListHtml);
      this.dataListElement = dataElement;
      this.inputElement.append(dataElement);
    }
  }

  handleInputChange() {
    this.inputElement.addEventListener("input", (e) => {
      const value = e.target.value;
      this.searchWithDelay(value);
    });
  }

  onFocus() {
    this.inputElement.addEventListener("focus", (e) => {
      this.searchWithDelay(e.target.value);
    });
  }
}
