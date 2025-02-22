import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import { CONFIG } from 'src/config-global';
import { fetchStockData } from 'src/api/getStocks';

import ChartSkeleton from 'src/sections/investment/chart-skeleton';
import { InvestmentView } from 'src/sections/investment/view/investment-view';
import StockSummaryCardsSkeleton from 'src/sections/investment/summary-cards-skeleton';

export default function InvestmentPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stockData'],
    queryFn: fetchStockData,
  });

  if (isLoading) {
    return (
      <div>
        <StockSummaryCardsSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title> {`Investments - ${CONFIG.appName}`}</title>
      </Helmet>

      <Suspense fallback={<ChartSkeleton />}>
        {data && <InvestmentView chartData={data} />}
      </Suspense>
    </>
  );
}
