import type { StockPrice } from 'src/api/getStocks';

interface StockMetrics {
  currentPrice: number;
  lastMonthPrice: number;
  priceChangePercent: number;
  isPositiveChange: boolean;
  highestPrice: number;
  highestDiff: number;
  lowestPrice: number;
  lowestDiff: number;
  currentMonth: string;
  lastMonth: string;
}

export const calculateStockMetrics = (prices: StockPrice[]): StockMetrics => {
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const currentPrice = sortedPrices[sortedPrices.length - 1].close;
  const lastMonthPrice =
    sortedPrices.length > 1 ? sortedPrices[sortedPrices.length - 2].close : currentPrice;

  const priceChange = currentPrice - lastMonthPrice;
  const priceChangePercent = (priceChange / lastMonthPrice) * 100;
  const isPositiveChange = priceChange > 0;

  const highestPrice = Math.max(...prices.map((item) => item.close));
  const highestDiff = ((highestPrice - currentPrice) / currentPrice) * 100;

  const lowestPrice = Math.min(...prices.map((item) => item.close));
  const lowestDiff = ((currentPrice - lowestPrice) / currentPrice) * 100;

  const formatMonthYear = (dateString: string) =>
    new Date(dateString).toLocaleString('en-US', { month: 'short', year: 'numeric' });

  const currentMonth = formatMonthYear(sortedPrices[sortedPrices.length - 1].date);
  const lastMonth =
    sortedPrices.length > 1 ? formatMonthYear(sortedPrices[sortedPrices.length - 2].date) : 'N/A';

  return {
    currentPrice,
    lastMonthPrice,
    priceChangePercent,
    isPositiveChange,
    highestPrice,
    highestDiff,
    lowestPrice,
    lowestDiff,
    currentMonth,
    lastMonth,
  };
};
