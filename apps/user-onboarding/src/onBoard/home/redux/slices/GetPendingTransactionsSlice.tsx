import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetPendingTransactionsStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetPendingTransactionsStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetPendingTransactionsSlice = createSlice({
  name: 'GetPendingTransactionsSlice',
  initialState,
  reducers: {
    onGetPendingTransactionsSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetPendingTransactionsError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetPendingTransactionsResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetPendingTransactionsSuccess,
  onGetPendingTransactionsError,
  setLoading,
  resetGetPendingTransactionsResponse,
} = GetPendingTransactionsSlice.actions;

export default GetPendingTransactionsSlice.reducer;
