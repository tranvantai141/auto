import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionListResponse } from '@screens/transactionList/typings';

export interface GetTransactionListStateInterface {
  loading: boolean;
  response: TransactionListResponse | null;
  error: any | null;
  selectedPage: number | null;
}

const initialState: GetTransactionListStateInterface = {
  loading: false,
  response: null,
  error: null,
  selectedPage: null,
};

const getTransactionListSlice = createSlice({
  name: 'getTransactionList',
  initialState,
  reducers: {
    onGetTransactionsSuccess: (state, action: PayloadAction<TransactionListResponse>) => {
      state.loading = false;
      state.response = action.payload;
      state.error = null;
    },
    onGetTransactionsError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.selectedPage = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { onGetTransactionsSuccess, onGetTransactionsError, setLoading, resetState } =
  getTransactionListSlice.actions;

export default getTransactionListSlice.reducer;
