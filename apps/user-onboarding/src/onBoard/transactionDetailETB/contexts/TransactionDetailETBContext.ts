import { createContext, useContext } from 'react';
import { TransactionDetailETBContextData } from '../types';

function emptyImp() {
  // do nothing
}

export const TransactionDetailETBContext = createContext<TransactionDetailETBContextData>({
  isMuntipleCif: false,
  compliancRequest: true,
  setIsUpdatedInfo: () => emptyImp(),
  setIsUpdatedProductAndService: () => emptyImp(),
  setIsMuntipleCif: () => emptyImp(),
  setComplicanceRequest: () => emptyImp(),
  setCustomerInfoErrorCount: () => emptyImp(),
  setProductAndServiceErrorCount: () => emptyImp(),
});

export const TransactionDetailETBProvider = TransactionDetailETBContext.Provider;

export function useTransactionDetailETBContext() {
  return useContext(TransactionDetailETBContext);
}
