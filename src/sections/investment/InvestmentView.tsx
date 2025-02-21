import type { StockData, StockPrice } from 'src/api';

import 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

import { fetchStockData } from 'src/api';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}

export default function InvestmentView() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [symbol, setSymbol] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStockData() {
      try {
        const data: StockData = await fetchStockData();
        setSymbol(data.symbol);

        const labels = data.prices.map((item: StockPrice) => item.date);
        const closePrices = data.prices.map((item: StockPrice) => item.close);

        const formattedChartData = {
          labels,
          datasets: [
            {
              label: 'Stock Close Price',
              data: closePrices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.1,
            },
          ],
        };

        setChartData(formattedChartData);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadStockData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!chartData) return null;

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2>Stock Prices for {symbol}</h2>
      <Line data={chartData} />
    </div>
  );
}
