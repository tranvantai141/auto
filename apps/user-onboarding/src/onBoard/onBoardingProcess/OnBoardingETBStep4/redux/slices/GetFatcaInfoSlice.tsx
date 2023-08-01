import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetFatcaInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetFatcaInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const getFatcaInfoSlice = createSlice({
  name: 'GetFatcaInfoSlice',
  initialState,
  reducers: {
    onGetFatcaInfoSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetFatcaInfoError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetFatcaInfoResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetFatcaInfoSuccess, onGetFatcaInfoError, setLoading, resetGetFatcaInfoResponse } =
  getFatcaInfoSlice.actions;

export default getFatcaInfoSlice.reducer;
