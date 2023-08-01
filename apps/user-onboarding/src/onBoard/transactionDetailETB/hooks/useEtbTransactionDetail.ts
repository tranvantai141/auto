import { useCallback } from 'react';
import { getTransactionDetailSummary } from '../apis/getTransactionDetailSummary';
import { useQuery } from '@tanstack/react-query';
import { TransactionDetailSummaryResultDTO } from '../types';

export type ProcessDataResult =
  | {
      flow: 'NTB';
    }
  | {
      flow: 'ETB';
      summaryResult: TransactionDetailSummaryResultDTO;
    };

export function useEtbTransactionDetail(transactionId: string) {
  const processFetchData = useCallback<() => Promise<ProcessDataResult>>(async () => {
    const { result: summaryResult } = await getTransactionDetailSummary(transactionId);
    if (summaryResult.type === 'NTB') {
      return {
        flow: 'NTB',
      };
    }
    return {
      flow: 'ETB',
      summaryResult,
    };
  }, [transactionId]);

  const { data } = useQuery({
    queryKey: ['transactionDetailSummary', transactionId],
    queryFn: processFetchData,
    suspense: true,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });

  return data;
}
