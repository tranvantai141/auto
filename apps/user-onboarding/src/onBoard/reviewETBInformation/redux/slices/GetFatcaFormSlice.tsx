import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetFatcaInfoFormStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetFatcaInfoFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetFatcaFormSlice = createSlice({
  name: 'GetFatcaFormSlice',
  initialState,
  reducers: {
    onGetFatcaInfoFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetFatcaInfoFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetFatcaInfoFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetFatcaInfoFormSuccess,
  onGetFatcaInfoFormError,
  setLoading,
  resetGetFatcaInfoFormResponse,
} = GetFatcaFormSlice.actions;

export default GetFatcaFormSlice.reducer;
