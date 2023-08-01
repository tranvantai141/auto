import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetTransactionResultStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetTransactionResultStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetTransactionResultSlice = createSlice({
  name: 'GetTransactionResultSlice',
  initialState,
  reducers: {
    onGetTransactionResultSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetTransactionResultError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetTransactionResultResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetTransactionResultSuccess,
  onGetTransactionResultError,
  setLoading,
  resetGetTransactionResultResponse,
} = GetTransactionResultSlice.actions;

export default GetTransactionResultSlice.reducer;
