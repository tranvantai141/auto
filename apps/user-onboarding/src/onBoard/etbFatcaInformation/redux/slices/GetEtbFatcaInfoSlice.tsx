import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetFatcaInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
  isInit: boolean;
}

const initialState: GetFatcaInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
  isInit: false,
};

export const getEtbFatcaInfoSlice = createSlice({
  name: 'getEtbFatcaInfoSlice',
  initialState,
  reducers: {
    onGetEtbFatcaInfoSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetEtbFatcaInfoError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIsInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    resetGetEtbFatcaInfoResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetEtbFatcaInfoSuccess,
  onGetEtbFatcaInfoError,
  setLoading,
  resetGetEtbFatcaInfoResponse,
  setIsInit,
} = getEtbFatcaInfoSlice.actions;

export default getEtbFatcaInfoSlice.reducer;
