import { useQuery } from '@tanstack/react-query';
import { getTransactionDetailAutoFillForm } from '../apis/getTransactionDetailAutoFillForm';
import { useCallback } from 'react';

export interface AutoFillFormsInterface {
  transactionId: string;
  title?: string;
  file?: string;
  key?: string;
  errorMessage?: string;
  status?: string;
  formNo?: string;
  errorCode?: string;
}
export interface AutoFillFormInterface {
  numberOfError?: number;
  autoFillFormRequested?: boolean;
  autoFillForms?: Array<AutoFillFormsInterface>;
  transactionId?: string;
}
export function useEtbTransactionDetailAutoFillForm(transactionId: string) {
  const fetchData = useCallback<() => Promise<any>>(async () => {
    const result: AutoFillFormInterface = await getTransactionDetailAutoFillForm(transactionId);
    return result;
  }, [transactionId]);

  const { data } = useQuery({
    queryKey: ['getTransactionDetailAutoFillForms', transactionId],
    queryFn: fetchData,
    suspense: true,
    enabled: !!transactionId,
    staleTime: 0,
    cacheTime: 2 * 1000,
  });
  // statleTime + cacheTime for testing purpose

  return data;
}
