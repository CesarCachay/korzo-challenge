import {
  Box,
  Card,
  Skeleton,
  useTheme,
  Typography,
  CardContent,
  useMediaQuery,
} from '@mui/material';

export default function StockSummaryCardsSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      gap={2}
      justifyContent="center"
      marginTop={3}
      alignItems="center"
      marginBottom={6}
    >
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          sx={{ minWidth: 200, padding: 2, textAlign: 'center', width: isMobile ? '90%' : 'auto' }}
        >
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
