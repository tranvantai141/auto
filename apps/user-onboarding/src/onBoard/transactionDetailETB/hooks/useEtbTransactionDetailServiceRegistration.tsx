import { useQuery } from '@tanstack/react-query';
import { ProductServicesRegistrationInterface } from '../types';
import { getTransactionDetailServiceRegistration } from '../apis/getTransactionDetailServiceRegistration';
import { useCallback } from 'react';

export function useEtbTransactionDetailServiceRegistration(transactionId: string) {
  const fetchData = useCallback<() => Promise<any>>(async () => {
    const result: ProductServicesRegistrationInterface =
      await getTransactionDetailServiceRegistration(transactionId);
    return result;
  }, [transactionId]);

  const { data } = useQuery({
    queryKey: ['getTransactionDetailServiceRegistration', transactionId],
    queryFn: fetchData,
    suspense: true,
    enabled: !!transactionId,
    staleTime: 0,
    cacheTime: 2 * 1000,
  });
  // statleTime + cacheTime for testing purpose

  return data;
}
