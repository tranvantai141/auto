import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetValidateStateInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetValidateStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetBranchValidateSlice = createSlice({
  name: 'GetBranchValidateSlice',
  initialState,
  reducers: {
    onGetvalidateSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetValidateError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetValidateResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetvalidateSuccess, onGetValidateError, setLoading, resetValidateResponse } =
GetBranchValidateSlice.actions;

export default GetBranchValidateSlice.reducer;