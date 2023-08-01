import React, { useContext } from 'react';

export const TransactionListContext = React.createContext({
  query: ''
});

export const TransactionListProvider = TransactionListContext.Provider;

export function useTransactionListContext() {
  return useContext(TransactionListContext);
}