import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetRegDebitAccFormStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetRegDebitAccFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetRegDebitAccFormSlice = createSlice({
  name: 'GetRegDebitAccFormSlice',
  initialState,
  reducers: {
    onGetRegDebitAccFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetRegDebitAccFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetRegDebitAccFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetRegDebitAccFormSuccess,
  onGetRegDebitAccFormError,
  setLoading,
  resetGetRegDebitAccFormResponse,
} = GetRegDebitAccFormSlice.actions;

export default GetRegDebitAccFormSlice.reducer;
