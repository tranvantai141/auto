import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface CancelTransactionStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: CancelTransactionStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const CancelTransactionSlice = createSlice({
  name: 'cancelTransactionSlice',
  initialState,
  reducers: {
    onCancelTransactionSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onCancelTransactionError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCancelTransactionResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onCancelTransactionSuccess,
  onCancelTransactionError,
  setLoading,
  resetCancelTransactionResponse,
} = CancelTransactionSlice.actions;

export default CancelTransactionSlice.reducer;
