import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface SendOtpStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
}

const initialState: SendOtpStateInterface = {
  loading: false,
  response: '654321',
  error: undefined,
};

export const SendOtpSlice = createSlice({
  name: 'SendOtpSlice',
  initialState,
  reducers: {
    onSendOtpSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onSendOtpError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
      console.log('error', state.error);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetOtpResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onSendOtpSuccess, onSendOtpError, setLoading, resetOtpResponse } =
  SendOtpSlice.actions;

export default SendOtpSlice.reducer;
