async function searchProducts(searchQuery) {
  const url = searchQuery
    ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=5`
    : "https://dummyjson.com/products?limit=5";
  let response = await fetch(url);
  response = await response.json();
  if (response.products.length > 0) {
    return response.products.map(({ id, title }) => ({ id, title }));
  }
  return response.products;
}

export function debouncedSearchProducts(onSuccess, delay) {
  // to improve callback's call
  let timeoutId = null;
  return (searchQuery) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      const products = await searchProducts(searchQuery);
      onSuccess(products);
    }, delay);
  };
}
