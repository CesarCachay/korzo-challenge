import { Box, Card, Skeleton, Typography, CardContent } from '@mui/material';

export default function StockSummaryCardsSkeleton() {
  return (
    <Box display="flex" gap={2} justifyContent="center" marginTop={3}>
      {[1, 2, 3].map((index) => (
        <Card key={index} sx={{ minWidth: 200, padding: 2, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">
              <Skeleton width="80%" />
            </Typography>
            <Typography variant="h4">
              <Skeleton width="60%" />
            </Typography>
            <Typography>
              <Skeleton width="40%" />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
