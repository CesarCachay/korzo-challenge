import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Card, Typography, CardContent } from '@mui/material';

import { calculateStockMetrics } from 'src/utils/calculate-metrics';

interface StockPrice {
  date: string;
  close: number;
}

interface StockSummaryCardsProps {
  prices: StockPrice[];
}

export default function StockSummaryCards({ prices }: StockSummaryCardsProps) {
  if (!prices || prices.length === 0) {
    return <Typography style={{ color: 'red' }}>Error: No data available</Typography>;
  }

  const {
    priceChangePercent,
    isPositiveChange,
    highestPrice,
    highestDiff,
    lowestPrice,
    lowestDiff,
    currentMonth,
    lastMonth,
  } = calculateStockMetrics(prices);

  return (
    <Box display="flex" gap={2} justifyContent="center" marginTop={3}>
      {/* Last comparison between months */}
      <Card sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h6">Monthly Change</Typography>
          <Typography variant="h6">{`${currentMonth} vs ${lastMonth}`}</Typography>
          <Typography variant="h4" color={isPositiveChange ? 'green' : 'red'}>
            {isPositiveChange ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            {priceChangePercent.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>

      {/* Highest pice */}
      <Card sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h6">Highest Price</Typography>
          <Typography variant="h4">${highestPrice.toFixed(2)}</Typography>
          <Typography color={highestDiff > 0 ? 'green' : 'red'}>
            {highestDiff.toFixed(2)}% from current month
          </Typography>
        </CardContent>
      </Card>

      {/* Lowest price */}
      <Card sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h6">Lowest Price</Typography>
          <Typography variant="h4">${lowestPrice.toFixed(2)}</Typography>
          <Typography color={lowestDiff > 0 ? 'green' : 'red'}>
            {lowestDiff.toFixed(2)}% from current month
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
