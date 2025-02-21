import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import { CONFIG } from 'src/config-global';

import InvestmentView from 'src/sections/investment/InvestmentView';

import { fetchStockData } from '../api';

export default function InvestmentPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stockData'],
    queryFn: fetchStockData,
  });

  if (isLoading) {
    return <div>Loading data ...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log('data', data);

  return (
    <>
      <Helmet>
        <title> {`Investments - ${CONFIG.appName}`}</title>
      </Helmet>

      <InvestmentView />
    </>
  );
}
