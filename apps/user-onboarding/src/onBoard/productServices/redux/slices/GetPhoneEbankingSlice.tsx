import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GetPhoneEBankingStateInterface {
  loading: boolean;
  errorCode: number | undefined;
  errorMess: any | undefined;
  response: any | undefined;
  error: boolean;
}

const initialState: GetPhoneEBankingStateInterface = {
  loading: false,
  response: undefined,
  errorCode: undefined,
  errorMess: undefined,
  error: false,
};

export const GetPhoneEBankingSlice = createSlice({
  name: 'GetPhoneEBankingSlice',
  initialState,
  reducers: {
    onGetPhoneEBankingSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = '';
      state.error = false;
    },
    onGetPhoneEBankingError: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload?.response;
      state.error = true;
    },

    onGetPhoneEBankingErrorCode: (state, action: PayloadAction<any | undefined>) => {
      state.errorCode = action.payload?.errorCode;
      state.errorMess = action.payload?.errorMess;
      state.error = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetPhoneEBankingResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetPhoneEBankingSuccess,
  onGetPhoneEBankingError,
  onGetPhoneEBankingErrorCode,
  setLoading,
  resetGetPhoneEBankingResponse,
} = GetPhoneEBankingSlice.actions;

export default GetPhoneEBankingSlice.reducer;
