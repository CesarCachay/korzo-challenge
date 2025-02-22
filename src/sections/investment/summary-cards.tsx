import { Box, Card, Typography, CardContent } from '@mui/material';

// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
  const highestDiff = ((currentPrice - highestPrice) / highestPrice) * 100;

  const lowestPrice = Math.min(...prices.map((item) => item.close));
  const lowestDiff = ((currentPrice - lowestPrice) / lowestPrice) * 100;

  return (
    <Box display="flex" gap={2} justifyContent="center" marginTop={3}>
      {/* Last comparison between months */}
      <Card sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h6">Monthly Change</Typography>
          <Typography variant="h4" color={isPositiveChange ? 'green' : 'red'}>
            {/* {isPositiveChange ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} */}
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
            {highestDiff.toFixed(2)}% from current
          </Typography>
        </CardContent>
      </Card>

      {/* Lowest price */}
      <Card sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h6">Lowest Price</Typography>
          <Typography variant="h4">${lowestPrice.toFixed(2)}</Typography>
          <Typography color={lowestDiff > 0 ? 'green' : 'red'}>
            {lowestDiff.toFixed(2)}% from current
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
