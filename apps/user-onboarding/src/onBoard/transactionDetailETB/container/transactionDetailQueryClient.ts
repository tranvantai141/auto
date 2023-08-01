import { QueryClient } from '@tanstack/react-query';

export const transactionDetailQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

export function resetTransactionDetailQueryClient() {
  transactionDetailQueryClient.resetQueries();
}
