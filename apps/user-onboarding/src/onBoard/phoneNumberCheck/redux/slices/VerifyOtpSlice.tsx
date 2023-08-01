import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface VerifyOtpStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | AxiosError;
}

const initialState: VerifyOtpStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const VerifyOtpSlice = createSlice({
  name: 'VerifyOtpSlice',
  initialState,
  reducers: {
    onOtpVerified: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onVerifyOtpError: (state, action: PayloadAction<AxiosError | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
      console.log('error', state.error);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetVerifyOtpResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onOtpVerified, onVerifyOtpError, setLoading, resetVerifyOtpResponse } =
  VerifyOtpSlice.actions;

export default VerifyOtpSlice.reducer;
