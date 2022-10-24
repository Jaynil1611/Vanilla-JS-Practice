const parentTable = document.querySelector("#table-info");
const loadCSVInput = document.querySelector("#load-csv");
const searchInput = document.querySelector("#table-search");

/*
[
  {col0: '', col1: ''}
]
*/

let tableData = {};
let headers = [];

function renderHeaders(headers) {
  const tableHeader = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    tableHeaderRow.append(th);
  });
  tableHeader.append(tableHeaderRow);
  parentTable.append(tableHeader);
}

function populateTableData(tableData, renderHeaders = true) {
  const parentElement = document.createDocumentFragment();

  let rowItems = Object.keys(tableData);
  if (renderHeaders) {
    rowItems = rowItems.slice(1);
  }

  const tableBody = document.createElement("tbody");
  rowItems.forEach((row) => {
    const tableRow = document.createElement("tr");
    tableData[row].forEach((col) => {
      const tableCol = document.createElement("td");
      tableCol.innerText = col;
      tableRow.append(tableCol);
    });
    tableBody.append(tableRow);
  });
  parentElement.append(tableBody);
  parentTable.append(parentElement);
}

function transformCSV(fileContent) {
  if (fileContent) {
    parentTable.innerHTML = "";
    const lines = fileContent.split("\n");
    tableData = lines.reduce((result, line, index) => {
      if (line) {
        const cols = line.split(",");
        result[`row${index}`] = cols;
      }
      return result;
    }, {});
    let rowItems = Object.keys(tableData);
    headers = tableData[rowItems[0]];
    renderHeaders(headers);
    populateTableData(tableData);
  }
}

function searchInTable(searchQuery) {
  const tableBodyTag = document.querySelector("tbody");
  tableBodyTag?.remove();
  const searchResult = Object.keys(tableData).reduce((searchResult, row) => {
    if (tableData[row].includes(searchQuery.toLowerCase())) {
      searchResult[row] = [].concat(tableData[row]);
    }
    return searchResult;
  }, {});
  populateTableData(searchResult, false);
}

loadCSVInput.addEventListener("change", (e) => {
  searchInput.value = "";
  const fileReader = new FileReader();
  const file = e.target.files[0];
  fileReader.readAsText(file, "utf-8");
  fileReader.addEventListener("load", () => transformCSV(fileReader.result));
});

searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value;
  searchInTable(searchQuery);
});
