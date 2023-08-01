import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetRegCustomerAccFormStateInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetRegCustomerAccFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetRegAccFormToPrintSlice = createSlice({
  name: 'GetRegAccFormToPrintSlice',
  initialState,
  reducers: {
    onGetRegCustomerAccFormSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetRegCustomerAccFormError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetGetRegCustomerAccFormResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  onGetRegCustomerAccFormSuccess,
  onGetRegCustomerAccFormError,
  setLoading,
  resetGetRegCustomerAccFormResponse,
} = GetRegAccFormToPrintSlice.actions;

export default GetRegAccFormToPrintSlice.reducer;
