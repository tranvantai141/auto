import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global/index';

export interface GetRegCustomerAccFormStateInterface {
  loading: boolean;
  response: string | undefined;
  error: undefined | API_ERROR;
}

const initialState: GetRegCustomerAccFormStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetRegAccFormSlice = createSlice({
  name: 'GetRegAccFormSlice',
  initialState,
  reducers: {
    onGetRegCustomerAccFormSuccess: (state, action: PayloadAction<string | undefined>) => {
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
} = GetRegAccFormSlice.actions;

export default GetRegAccFormSlice.reducer;
