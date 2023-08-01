import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface GetDepartmentStateInterface {
  loading: boolean;
  response: any | undefined;
  error: API_ERROR | undefined;
}

const initialState: GetDepartmentStateInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const GetDepartmentSlice = createSlice({
  name: 'GetDepartmentSlice',
  initialState,
  reducers: {
    onGetDepartmentSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onGetDepartmentError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetDepartmentResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onGetDepartmentSuccess, onGetDepartmentError, setLoading, resetDepartmentResponse } =
GetDepartmentSlice.actions;

export default GetDepartmentSlice.reducer;

