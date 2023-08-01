import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetRegDigibankAccFormStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetRegDigibankAccFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetRegEBankFormToPrintSlice = createSlice({
  name: 'GetRegEBankFormToPrintSlice',
  initialState,
  reducers: {
    onGetRegDigibankAccFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetRegDigibankAccFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetRegDigibankAccFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetRegDigibankAccFormSuccess,
  onGetRegDigibankAccFormError,
  setLoading,
  resetGetRegDigibankAccFormResponse,
} = GetRegEBankFormToPrintSlice.actions;

export default GetRegEBankFormToPrintSlice.reducer;
