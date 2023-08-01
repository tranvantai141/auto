import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API_ERROR } from 'src/typings/global';

export interface RejectAMLInterface {
  loading: boolean;
  response: any | undefined;
  error: undefined | API_ERROR;
}

const initialState: RejectAMLInterface = {
  loading: false,
  response: undefined,
  error: undefined,
};

export const RejectAMLSlice = createSlice({
  name: 'RejectAMLSlice',
  initialState,
  reducers: {
    onRejectAMLSuccess: (state, action: PayloadAction<any | undefined>) => {
      state.response = action.payload;
      state.error = undefined;
    },
    onRejectAMLError: (state, action: PayloadAction<API_ERROR | undefined>) => {
      state.response = undefined;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRejectAMLResponse: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { onRejectAMLSuccess, onRejectAMLError, setLoading, resetRejectAMLResponse } =
  RejectAMLSlice.actions;

export default RejectAMLSlice.reducer;
