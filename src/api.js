export async function fetchStockData() {
  const response = await fetch(import.meta.env.VITE_STOCK_API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
