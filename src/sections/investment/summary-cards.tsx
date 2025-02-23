import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Card, Typography, CardContent, useMediaQuery, useTheme } from '@mui/material';

import { calculateStockMetrics } from 'src/utils/calculate-metrics';

interface StockPrice {
  date: string;
  close: number;
}

interface StockSummaryCardsProps {
  prices: StockPrice[];
}

export default function StockSummaryCards({ prices }: StockSummaryCardsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    currentPrice,
  } = calculateStockMetrics(prices);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      gap={2}
      justifyContent="center"
      marginTop={3}
      alignItems="center"
    >
      {/* Last comparison between months */}
      <Card
        sx={{
          minWidth: 200,
          padding: 2,
          textAlign: 'center',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <CardContent>
          <Typography marginBottom={1}>Current Price: ${currentPrice}</Typography>
          <Typography variant="h6">Monthly Change</Typography>
          <Typography variant="h6">{`${currentMonth} vs ${lastMonth}`}</Typography>
          <Typography variant="h4" color={isPositiveChange ? 'green' : 'red'}>
            {isPositiveChange ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            {priceChangePercent.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>

      {/* Highest price */}
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          minWidth: 200,
          padding: 2,
          textAlign: 'center',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <CardContent>
          <Typography variant="h6">Highest Price</Typography>
          <Typography variant="h4">${highestPrice.toFixed(2)}</Typography>
          <Typography color={highestDiff > 0 ? 'green' : 'red'}>
            {highestDiff.toFixed(2)}% from current month
          </Typography>
        </CardContent>
      </Card>

      {/* Lowest price */}
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          minWidth: 200,
          padding: 2,
          textAlign: 'center',
          width: isMobile ? '100%' : 'auto',
        }}
      >
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
