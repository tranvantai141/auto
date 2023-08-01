import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetSupplementaryDetailStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetSupplementaryDetailStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetSupplementaryDetailSlice = createSlice({
  name: 'GetSupplementaryDetailSlice',
  initialState,
  reducers: {
    onGetsupplementaryDetailSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetSupplementaryDetailError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetSupplementaryDetailResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    onGetsupplementaryDetailSuccess,
  onGetSupplementaryDetailError,
  setLoading,
  resetGetSupplementaryDetailResponse,
} = GetSupplementaryDetailSlice.actions;

export default GetSupplementaryDetailSlice.reducer;
