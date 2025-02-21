import { Box, Skeleton } from '@mui/material';

export default function ChartSkeleton() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width={600} alignContent="start">
        <Skeleton variant="text" width={280} height={60} />
      </Box>
      <Skeleton variant="rectangular" width={600} height={400} />
    </Box>
  );
}
