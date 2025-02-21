import type { StockData, StockPrice } from 'src/api';

import 'chart.js';
import { Line } from 'react-chartjs-2';

import { Container, Typography } from '@mui/material';

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

interface InvestmentViewProps {
  chartData: StockData;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
});

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw;
          return `Stock Close Price: $${value.toFixed(2)}`;
        },
      },
    },
  },
};

export default function InvestmentView({ chartData }: InvestmentViewProps) {
  if (!chartData || !chartData.prices) {
    return <Typography style={{ color: 'red' }}>Error: No data available</Typography>;
  }

  const labels = chartData.prices.map((item: StockPrice) =>
    dateFormatter.format(new Date(item.date))
  );
  const closePrices = chartData.prices.map((item: StockPrice) => item.close);

  const formattedChartData: ChartData = {
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

  return (
    <Container>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <h2>Stock Prices for {chartData.symbol}</h2>
        <Line data={formattedChartData} options={chartOptions} />
      </div>
    </Container>
  );
}
