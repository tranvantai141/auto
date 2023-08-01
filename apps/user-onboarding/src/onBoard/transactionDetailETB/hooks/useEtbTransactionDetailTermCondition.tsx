import { getTransactionDetailTermCondition } from '@screens/transactionDetailETB/apis/getTransactionDetailTermCondition';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export interface TermAndConditionFile {
  name?: string;
  fileName?: string;
}
export interface TermAndCondition {
  termAndConditionRequested?: boolean;
  termAndConditions?: Array<TermAndConditionFile>;
}
export function useEtbTransactionDetailTermCondition(transactionId: string) {
  const fetchData = useCallback<() => Promise<any>>(async () => {
    const result: TermAndCondition = await getTransactionDetailTermCondition(transactionId);
    return result;
  }, [transactionId]);

  const { data } = useQuery({
    queryKey: ['getTransactionDetailTermCondition', transactionId],
    queryFn: fetchData,
    suspense: true,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });
  // statleTime + cacheTime for testing purpose

  return data;
}
