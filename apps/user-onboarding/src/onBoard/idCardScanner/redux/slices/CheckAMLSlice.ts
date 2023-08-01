import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface CheckAMLInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: CheckAMLInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const CheckAMLSlice = createSlice({
  name: 'CheckAMLSlice',
  initialState,
  reducers: {
    onCheckAMLSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onCheckAMLError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCheckAMLResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onCheckAMLSuccess, onCheckAMLError, setLoading, resetCheckAMLResponse } =
  CheckAMLSlice.actions;

export default CheckAMLSlice.reducer;
