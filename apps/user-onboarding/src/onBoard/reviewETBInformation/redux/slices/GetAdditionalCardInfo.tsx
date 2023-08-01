import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetAdditionalCardInfoStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetAdditionalCardInfoStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetAdditionalCardInfoSlice = createSlice({
  name: 'GetAdditionalCardInfoSlice',
  initialState,
  reducers: {
    onGetAdditionalCardInfoSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetAdditionalCardInfoError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetAdditionalCardInfoResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetAdditionalCardInfoSuccess,
  onGetAdditionalCardInfoError,
  setLoading,
  resetGetAdditionalCardInfoResponse,
} = GetAdditionalCardInfoSlice.actions;

export default GetAdditionalCardInfoSlice.reducer;
