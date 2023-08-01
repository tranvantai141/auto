import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetPrintFormStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetPrintFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetContractFormSlice = createSlice({
  name: 'GetContractFormSlice',
  initialState,
  reducers: {
    onGetContractFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetContractFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetContractFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetContractFormSuccess,
    onGetContractFormError,
  setLoading,
  resetGetContractFormResponse,
} = GetContractFormSlice.actions;

export default GetContractFormSlice.reducer