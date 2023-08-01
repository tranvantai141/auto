import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionModel } from '@screens/transactionDetail/typings';
import { API_ERROR } from 'src/typings/global';

export type GetTransactionDetailState = {
  isLoading: boolean;
  response: TransactionModel | null;
  error: API_ERROR | null;
  modalErrorMessage: string | null;
};

const initialState: GetTransactionDetailState = {
  isLoading: false,
  response: null,
  error: null,
  modalErrorMessage: null,
};

export const getTransactionDetailSlice = createSlice({
  name: 'getTransactionDetailSlice',
  initialState,
  reducers: {
    onGetTransactionDetailRequestSuccess(state, action: PayloadAction<TransactionModel>) {
      state.isLoading = false;
      state.response = action.payload;
      state.error = null;
    },
    onGetTransactionDetailRequestError(state, action: PayloadAction<API_ERROR>) {
      state.isLoading = false;
      state.response = null;
      state.error = action.payload;
    },
    onRetrySuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      if (action.payload?.chainErrorMessage) {
        const rawMessage = action.payload?.chainErrorMessage;
        const message = rawMessage?.split('&').join('\n');
        state.modalErrorMessage = message;
        state.error = null;
        return;
      }
      if (
        action.payload?.errorCode === '501501' ||
        action.payload?.errorCode === 'cifNumberExisting'
      ) {
        state.modalErrorMessage = 'Số CIF đã tồn tại';
      } else {
        state.modalErrorMessage = null;
      }
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setModalErrorMessage(state, action: PayloadAction<string | null>) {
      state.modalErrorMessage = action.payload;
    },
    resetGetTransactionDetailState() {
      return initialState;
    },
  },
});

export const {
  onGetTransactionDetailRequestSuccess,
  onGetTransactionDetailRequestError,
  setLoading,
  resetGetTransactionDetailState,
  setModalErrorMessage,
  onRetrySuccess,
} = getTransactionDetailSlice.actions;

export default getTransactionDetailSlice.reducer;
