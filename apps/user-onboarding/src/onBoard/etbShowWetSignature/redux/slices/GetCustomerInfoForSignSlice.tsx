import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface cutomerInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: cutomerInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetCustomerInfoForSignSlice = createSlice({
  name: 'GetCustomerInfoForSignSlice',
  initialState,
  reducers: {
    onGetCustomerInfoSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetCustomerInfoError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetCustomerInfo: () => initialState,
  },
});

export const { onGetCustomerInfoSuccess, onGetCustomerInfoError, setLoading, resetGetCustomerInfo } =
  GetCustomerInfoForSignSlice.actions;
export default GetCustomerInfoForSignSlice.reducer;
