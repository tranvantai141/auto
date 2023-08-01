import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {  supplementalInformation } from '@screens/productServices/assets/dummyData/Index';
import { API_ERROR } from 'src/typings/global';

interface GetAccountListInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetAccountListInterface = {
  loading: false,
  response: supplementalInformation,
  error: undefined,
};

export const SupplementaryDetailSlice = createSlice({
  name: 'getSupplementaryDetail',
  initialState,
  reducers: {
    getSupplementaryDetailRequest(state) {
      state.loading = true;
    },
    getSupplementaryDetailSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.response = action.payload;
    },
    getSupplementaryDetailError(state, action: PayloadAction<API_ERROR>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSupplementaryDetailRequest, getSupplementaryDetailSuccess, getSupplementaryDetailError } =
SupplementaryDetailSlice.actions;

export default SupplementaryDetailSlice.reducer;
