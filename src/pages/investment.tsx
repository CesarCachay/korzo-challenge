import { useQuery } from '@tanstack/react-query';

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

  console.log(data);
  return (
    <div>
      <div>My APPLE Stocks!</div>
    </div>
  );
}
