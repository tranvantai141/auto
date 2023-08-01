import { useQuery } from '@tanstack/react-query';
import { getEtbTransactionDetailComplianceInfo } from '../apis/getTransactionDetailComplianceInfo';
import { useCallback } from 'react';
import { useTransactionDetailETBContext } from '../contexts/TransactionDetailETBContext';

export interface ComplianceInfoList {
  name?: string;
  type?: string;
  value?: string;
  data?: {
    visaNumber?: string;
    authorityName?: string;
  };
}
export interface ComplianceInfoInterface {
  complianceRequested?: boolean;
  complianceInfo?: Array<ComplianceInfoList>;
}
export function useEtbTransactionDetailComplianceInfo(transactionId: string) {
  const { setComplicanceRequest } = useTransactionDetailETBContext();
  const fetchData = useCallback<() => Promise<any>>(async () => {
    const result: ComplianceInfoInterface = await getEtbTransactionDetailComplianceInfo(
      transactionId
    );
    setComplicanceRequest(result.complianceRequested ?? false);
    return result;
  }, [setComplicanceRequest, transactionId]);

  const { data } = useQuery({
    queryKey: ['getTransactionDetailComplianceInfo', transactionId],
    queryFn: fetchData,
    suspense: true,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });
  // statleTime + cacheTime for testing purpose

  return data;
}

////
