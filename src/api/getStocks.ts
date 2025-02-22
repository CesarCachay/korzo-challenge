export interface StockPrice {
  date: string;
  close: number;
}

export interface StockData {
  symbol: string;
  prices: StockPrice[];
}

export async function fetchStockData(): Promise<StockData> {
  const response = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/stocks`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
