import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';

export default function ChartSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box
        width={isMobile ? '85%' : '100%'}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box width={isMobile ? '100%' : 600} alignContent="center" marginBottom="10px">
          <Skeleton variant="text" width={isMobile ? 240 : 280} height={60} />
        </Box>
        <Skeleton
          variant="rectangular"
          width={isMobile ? '100%' : 600}
          height={isMobile ? 300 : 400}
        />
      </Box>
    </Box>
  );
}
