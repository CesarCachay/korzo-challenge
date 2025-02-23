import type { StockData, StockPrice } from 'src/api/getStocks';

import 'chart.js';
import { Line } from 'react-chartjs-2';

import { useTheme, Container, Typography, useMediaQuery } from '@mui/material';

import StockSummaryCards from '../summary-cards';

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
  maintainAspectRatio: false,
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

export function InvestmentView({ chartData }: InvestmentViewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <StockSummaryCards prices={chartData.prices} />

      <div
        style={{
          width: isMobile ? '100%' : '600px',
          margin: '40px auto 60px auto',
        }}
      >
        <Typography variant="h5" align="center">
          Stock Prices for {chartData.symbol}
        </Typography>
        <div style={{ height: isMobile ? '300px' : '400px' }}>
          <Line data={formattedChartData} options={chartOptions} />
        </div>
      </div>
    </Container>
  );
}
