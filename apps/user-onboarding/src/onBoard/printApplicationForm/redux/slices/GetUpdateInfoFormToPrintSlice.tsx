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

export const GetUpdateInfoFormToPrintSlice = createSlice({
  name: 'GetUpdateInfoFormToPrintSlice',
  initialState,
  reducers: {
    onGetUpdateInfoFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetUpdateInfoFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetUpdateInfoFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetUpdateInfoFormSuccess,
  onGetUpdateInfoFormError,
  setLoading,
  resetGetUpdateInfoFormResponse,
} = GetUpdateInfoFormToPrintSlice.actions;

export default GetUpdateInfoFormToPrintSlice.reducer;
